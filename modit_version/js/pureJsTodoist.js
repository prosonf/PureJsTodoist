/* pureJsTodoist.js
 *
 * Main file. Loads the application.
 */

modit('util', function() {

  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (callback) script.onload = callback;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
    debug('Loading script ' + src + '...');
  };
  function debug(msg) {
    if (console && console.debug) console.debug(msg);
  };
  function substitute(template, obj) {
      return template.replace(/\#\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(match, key){
          return obj[key];
      });
  };
  function htmlToDom(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.firstChild;
  };
  this.exports(loadScript, debug, substitute, htmlToDom);
});

modit('purejstodoist', ['util'], function(u) {
  var dependencies = ['js/purejstist/project.js', 
    'js/purejstist/task.js', 
    'js/purejstist/label.js'];

  function loadDependencies(dependencies, callback) {
    var loadDep = function(i) {
      if (dependencies[i])
        u.loadScript(dependencies[i], function() {
          loadDep(++i);
        });
      else if (callback) callback();
    };
    loadDep(0);
  }

  function init() {
    loadDependencies(dependencies, function() {
      u.debug("initialized");
      var ListView = purejstodoist.project.ListView;
      this.list_view = new ListView();
      document.getElementById('main').appendChild(this.list_view.getDom());
      var TaskListView = purejstodoist.task.ListView;
      this.task_list_view = new TaskListView();
      document.getElementById('main').appendChild(this.task_list_view.getDom());
    });
  };
  init();
});
