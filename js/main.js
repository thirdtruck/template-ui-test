$(document).ready(function() {

_.extend(window, models);
_.extend(window, views);

function initialize() {

  var toolbox = new Toolbox();

  var toolboxView = new ToolboxView({
    model: toolbox,
    widgetSelectorViews: {
      text: new TextWidgetSelectorView({
        el: $('.toolbox .text.widget-selector'),
        model: new TextWidgetSelector()
      })
    },
    el: $('.toolbox')
  });

  var preview = new Preview({
    widgetConstructors: {
      text: TextWidget
    },
  });

  var previewView = new PreviewView({
    model: preview,
    el: $('.preview'),
    widgetViewConstructors: {
      text: TextWidgetView
    },
  });

  toolboxView.render();
  previewView.render();

}

initialize();

});

