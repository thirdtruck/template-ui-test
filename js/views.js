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

  initialize: function() {
    var view = this;
  },

  render: function() {
    var view = this;

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
      "start": function() { console.log("Started!"); }, /* Start dragging. */
      "drag": function() { console.log("Dragging!"); },
      "stop": function() { console.log("Stopped!"); }, /* Stop dragging. */
      revert: true,
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
