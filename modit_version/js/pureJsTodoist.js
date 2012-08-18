/* pureJsTodoist.js
 *
 * Main file. Loads the application.
 */

modit('purejstodoist', ['util'], function(u) {
  "use strict";
  var doc = window.document,
    dependencies = ['js/purejstist/task.js', 
      'js/purejstist/project.js', 
      'js/purejstist/label.js', 
      'js/Container.js'],
      containers = [];

  function load() {
    u.loadScripts(dependencies, function() {
      u.debug("Module PureJsTodoist loaded");
      var container = new purejstodoist.Container({id: 'main'});
      containers.push(container);
      /*if (doc.getElementById('main')) {
        var ListView = purejstodoist.project.ListView,
          TaskListView = purejstodoist.task.TaskList,
          list_view = new ListView(),
          task_list_view = new TaskListView();
        doc.getElementById('main').appendChild(list_view.getDom());
        doc.getElementById('main').appendChild(task_list_view.getDom());
      }*/
    });
  }
  this.exports(load);
  load();
});
