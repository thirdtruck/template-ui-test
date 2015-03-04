var models;

(function() {

var Toolbox = Backbone.Model.extend({
  
  defaults: {
    widgetSelectors: { }
  }

});

var Preview = Backbone.Model.extend({
  
  defaults: { }

});

var Widget = Backbone.Model.extend({
  
  defaults: { }

});

var TextWidget = Widget.extend({
  
  defaults: { }

});

var WidgetSelector = Backbone.Model.extend({
  
  defaults: { }

});

models = {
  Toolbox: Toolbox,
  Preview: Preview,
  Widget: Widget,
  TextWidget: TextWidget,
  WidgetSelector: WidgetSelector,
};

})();
