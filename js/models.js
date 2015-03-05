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
    widgetViews: [ ],
    widgetConstructors: { },
    widgetViewConstructors: { },
  },

  addWidget: function(widgetType) {
    var model = this;

    var widgets = model.get('widgets');
    var widgetConstructors = model.get('widgetConstructors');

    var WidgetConstructor = widgetConstructors[widgetType];
    
    var newWidget = new WidgetConstructor();
     
    widgets.push(newWidget);

    return model;
  },

});

var Widget = Backbone.Model.extend({
  
  defaults: {
    type: "Widget"
  }

});

var TextWidget = Widget.extend({
  
  defaults: {
    type: "Text"
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
