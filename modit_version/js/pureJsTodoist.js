/* pureJsTodoist.js
 *
 * Main file. Loads the application.
 */

modit('util', function() {
  "use strict";
  var doc = window.document;

  function debug(msg) {
    if (console && console.debug) { console.debug(msg); }
  }
  function loadScript(src, callback) {
    var script = doc.createElement('script');
    script.type = "text/javascript";
    if (callback) { script.onload = callback; }
    script.src = src;
    doc.getElementsByTagName('head')[0].appendChild(script);
    debug('Loading script ' + src + '...');
  }
  function loadScripts(scripts, callback) {
    var loadScr = function(i) {
      if (scripts[i]) {
        loadScript(scripts[i], function() {
          loadScr(++i);
        });
      } else if (callback) {callback(); }
    };
    loadScr(0);
  }
  function substitute(template, obj) {
      return template.replace(/\#\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(match, key){
          return obj[key];
      });
  }
  function htmlToDom(html) {
    var d = doc.createElement('div');
    d.innerHTML = html;
    return d.firstChild;
  }
  this.exports(loadScript, loadScripts, debug, substitute, htmlToDom);
});

modit('purejstodoist', ['util'], function(u) {
  "use strict";
  var doc = window.document,
    dependencies = ['js/purejstist/task.js', 
      'js/purejstist/project.js', 
      'js/purejstist/label.js'],
    container = {
      dom: doc.getElementById('main'),
      show: function(dom_to_show) {
        this.dom.replaceChild(this.dom.firstChild, dom_to_show);
      }
    };
  this.exports(container);

  function init() {
    u.loadScripts(dependencies, function() {
      u.debug("initialized");
      if (doc.getElementById('main')) {
        var ListView = purejstodoist.project.ListView,
          TaskListView = purejstodoist.task.TaskList,
          list_view = new ListView(),
          task_list_view = new TaskListView();
        doc.getElementById('main').appendChild(list_view.getDom());
        doc.getElementById('main').appendChild(task_list_view.getDom());
      }
    });
  }
  init();
});
