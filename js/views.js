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

  addWidget: function(widgetType) {
    var view = this;
    
    var $widgetEl = $('<div class="widget-container" />');

    var widgetViews = view.model.get('widgetViews');

    var WidgetViewConstructor = view.widgetViewConstructors[widgetType];
    
    var newWidgetView = new WidgetViewConstructor({
      el: $widgetEl
    });

    widgetViews.push(newWidgetView);
  },

  render: function() {
    var view = this;

    view.$el.empty();

    var widgetViews = view.model.get('widgetViews');

    return this;
  }

});

var WidgetView = Backbone.View.extend({

  //template: _.template($('#template-widget').text()),

  initialize: function() {
    var view = this;
  },

  render: function() {
    var view = this;

    return this;
  }

});

var TextWidgetView = WidgetView.extend({

  template: _.template($('#template-widget-text').text()),

  initialize: function() {
    var view = this;
  },

  render: function() {
    var view = this;

    return this;
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
