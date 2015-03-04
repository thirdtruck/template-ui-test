$(document).ready(function() {

_.extend(window, models);
_.extend(window, views);

function initialize() {

  var toolbox = new Toolbox({
    widgetSelectors: {
      text: new TextWidget()
    }
  });

  var preview = new Preview();

  var toolboxView = new ToolboxView({
    model: toolbox,
    el: $('.toolbox')
  });

  var previewView = new PreviewView({
    model: preview,
    el: $('.preview')
  });

}

initialize();

});

