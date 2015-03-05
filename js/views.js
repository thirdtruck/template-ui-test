var views;

(function() {

var ToolboxView = Backbone.View.extend({

  //template: _.template($('#template-toolbox').text()),

  initialize: function(options) {
    var view = this;

    view.widgetSelectorViews = options.widgetSelectorViews || { };
  },

  render: function() {
    var view = this;

    _.each(view.widgetSelectorViews, function(widgetSelectorView) {
      widgetSelectorView.render();
    });

    return view;
  }

});

var PreviewView = Backbone.View.extend({

  //template: _.template($('#template-toolbox').text()),

  widgetViews: [],

  widgetContainerViews: [],

  initialize: function(options) {
    var view = this;

    view.widgetViewConstructors = options.widgetViewConstructors || { };

    view.$el.droppable({
      greedy: true, /* Prevent propagation. */
      drop: function(event, ui) {
        var $draggable = ui.draggable; /* The dropped widget. */
    
        var newWidgetType = $draggable.data('widget-type');

        view.addWidget(newWidgetType);
      },
    });
  },

  _buildWidgetView: function(newWidget, widgetType) {
    var view = this;

    var WidgetViewConstructor = view.widgetViewConstructors[widgetType];
    
    var newWidgetView = new WidgetViewConstructor({
      model: newWidget,
    });

    newWidgetView.render();

    return newWidgetView;
  },

  _buildWidgetContainerView: function(innerWidget) {
    var view = this;

    var widgetContainerView = new ContainerWidgetView({
      innerWidget: innerWidget,
      onAddWidget: function() { view.addWidget.apply(view, arguments); },
    });

    widgetContainerView.render();

    return widgetContainerView;
  },

  addWidget: function(widgetType, relativePosition, relativeToWidget) {
    var view = this;

    var veryStartingTexts = _(view.widgetViews).map(function(widgetView) {
      return widgetView.model.attributes.text;
    });

    var additionResults = view.model.addWidget(widgetType, relativePosition, relativeToWidget);
    var newWidget = additionResults.widget;
    var newWidgetIndex = additionResults.index;

    var newWidgetView = view._buildWidgetView(newWidget, widgetType);

    var newWidgetContainerView = view._buildWidgetContainerView(newWidgetView);

    var startingTexts = _(view.widgetViews).map(function(widgetView) {
      return widgetView.model.attributes.text;
    });

    view.widgetViews.splice(newWidgetIndex, 0, newWidgetView);
    view.widgetContainerViews.splice(newWidgetIndex, 0, newWidgetContainerView);

    var allTexts = _(view.widgetViews).map(function(widgetView) {
      return widgetView.model.attributes.text;
    });

    view.render();
  },

  render: function() {
    var view = this;

    /* Remove all the containers temporarily. */
    _(view.widgetContainerViews).each(function(containerView) {
      if ($.contains(view.$el, containerView.$el)) {
        view.$el.detach(containerView.$el);
      }
    });

    /* Add all the (pre-sorted) containers back, including ones added to the array but 
     * not yet to the DOM. */
    _(view.widgetContainerViews).each(function(containerView) {
      view.$el.append(containerView.$el);
    });

    return this;
  }

});

var WidgetView = Backbone.View.extend({

  template: '',

  initialize: function() {
    var view = this;
  },

  render: function() {
    var view = this;

    view.$el.html(view.template(view.model && view.model.attributes));

    return view;
  }

});

var DropPointView = Backbone.View.extend({

  template: _.template($('#template-drop-point').text()),

  initialize: function(options) {
    var view = this;

    view.position = options.position;

    view.onAddWidget = options.onAddWidget;
  },
  
  render: function() {
    var view = this;

    view.$el.html(view.template(view.model && view.model.attributes));

    view.$el.droppable({
      greedy: true, /* Prevent propagation. */
      drop: function(event, ui) {
        var $draggable = ui.draggable; /* The dropped widget. */
    
        var newWidgetType = $draggable.data('widget-type');

        view.onAddWidget(newWidgetType, view.position, view.model);
      },
    });

    view.$el.on('mouseenter', function() {
      view.$el.addClass('show');
    });
    
    view.$el.on('mouseleave', function() {
      view.$el.removeClass('show');
    });

    return view;
  }

});

var ContainerWidgetView = WidgetView.extend({

  template: _.template($('#template-widget-container').text()),

  initialize: function(options) {
    var view = this;

    view.innerWidget = options.innerWidget;

    view.onAddWidget = options.onAddWidget;
  },

  render: function() {
    var view = this;

    WidgetView.prototype.render.apply(view, arguments);

    view.$innerWidget = view.$el.find('.inner-widget');
    view.$innerWidget.replaceWith(view.innerWidget.$el);

    view.$dropPointAbove = view.$el.find('.drop-point.above');
    view.$dropPointBelow = view.$el.find('.drop-point.below');

    view.dropPointAboveView = new DropPointView({
                                    model: view.innerWidget.model,
                                    el: view.$dropPointAbove,
                                    position: 'above',
                                    onAddWidget: view.onAddWidget,
                                  });

    view.dropPointBelowView = new DropPointView({
                                    model: view.innerWidget.model,
                                    el: view.$dropPointBelow,
                                    position: 'below',
                                    onAddWidget: view.onAddWidget,
                                  });

    view.dropPointAboveView.render();
    view.dropPointBelowView.render();

    return view;
  }

});

var TextWidgetView = WidgetView.extend({

  template: _.template($('#template-widget-text').text()),

  initialize: function() {
    var view = this;

    var widgetText = prompt("Text to go in the widget:");

    view.model.set({ text: widgetText });
  },

  render: function() {
    var view = this;

    WidgetView.prototype.render.apply(view, arguments);

    return view;
  }

});

var WidgetSelectorView = Backbone.View.extend({

  //template: _.template($('#template-toolbox').text()),

  initialize: function() {
    var view = this;
  },

  render: function() {
    var view = this;

    var dragOptions =  {
      "start": $.noop, /* Start dragging. */
      "drag": $.noop,
      "stop": $.noop, /* Stop dragging. */
      helper: "clone",
    };

    view.$el.draggable(dragOptions);

    return this;
  }

});

var TextWidgetSelectorView = WidgetSelectorView.extend({

  //template: _.template($('#template-toolbox').text()),

  initialize: function() {
    var view = this;

    view.parent = WidgetSelectorView.prototype;

    view.parent.initialize.apply(view, arguments);
  },

  render: function() {
    var view = this;

    view.parent.render.apply(view, arguments);

    return view;
  }

});

views = {
  ToolboxView: ToolboxView,
  PreviewView: PreviewView,
  WidgetView: WidgetView,
  TextWidgetView: TextWidgetView,
  WidgetSelectorView: WidgetSelectorView,
  TextWidgetSelectorView: TextWidgetSelectorView,
};

})();
