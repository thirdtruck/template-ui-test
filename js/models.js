var models;

(function() {

var Toolbox = Backbone.Model.extend({
  
  defaults: {
    widgetSelectors: { }
  }

});

var Preview = Backbone.Model.extend({
  
  defaults: {
    widgets: [ ],
    widgetConstructors: { },
    widgetViewConstructors: { },
  },

  addWidget: function(widgetType, relativePosition, relativeToWidget) {
    var model = this;

    var widgets = model.get('widgets');
    var widgetConstructors = model.get('widgetConstructors');

    var WidgetConstructor = widgetConstructors[widgetType];
    
    var newWidget = new WidgetConstructor();

    var widgetIndex = _.findIndex(widgets, relativeToWidget);
    
    if (widgetIndex === -1) {
      /* No widget found. We're likely adding our first one, so skip all the index math. */
      widgets.push(newWidget);

      return { widget: newWidget, index: 0 };
    }

    var newWidgetIndex = relativePosition === 'above' ? widgetIndex : widgetIndex + 1;

    widgets.splice(newWidgetIndex, newWidgetIndex, newWidget);

    return { widget: newWidget, index: newWidgetIndex };
  },

});

var Widget = Backbone.Model.extend({
  
  defaults: {
    type: "Widget"
  }

});

var TextWidget = Widget.extend({
  
  defaults: {
    type: "Text",
    text: "No text provided",
  }

});

var WidgetSelector = Backbone.Model.extend({
  
  defaults: { }

});

var TextWidgetSelector = WidgetSelector.extend({
  
  defaults: { }

});

models = {
  Toolbox: Toolbox,
  Preview: Preview,
  Widget: Widget,
  TextWidget: TextWidget,
  WidgetSelector: WidgetSelector,
  TextWidgetSelector: TextWidgetSelector,
};

})();
