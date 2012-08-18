// project.js

modit("purejstodoist.project", ['util', 'purejstodoist.task.TaskList'], function(u, TaskList) {
  "use strict";
  // Secuence to create projects
  var id_sequence = 1,

  // Template for rendering a project.
  html_template = '<span class="project" id="project_#{id}">#{name}</span>',
  // Template for the create project form
  html_create_template = 
    '<span class="new_project">'
    + '<label>Add New Project: </label>'
    + '<input type="text" class="purejstodoist_project_name"/>'
    + '<input type="button" class="purejstodoist_project_button" value="Create!!" />'
    +'</span>';

  function Project(p_data) {
    var data = p_data || {};
    this.id = data.id || id_sequence++;
    this.name = data.name || this.name;

    this.task_list = new TaskList();

    this.dom = null;
    this.createElementDOM = null;
  }
  Project.prototype = {
    id : null,
    name : '',
    task_list : null,
    toHtml : function() {
      /** @return HTML with project name, without its task list. */
      return u.substitute(html_template, this);
    },
    getDom : function() {
      /** @return DOM with project name, without its task list. */
      if (!this.dom) {
        this.dom = u.htmlToDom(this.toHtml());
      }
      return this.dom;
    },
    addTask : function(new_task) {
      this.task_list.appendItem(new_task);
    }
  };
  Project.getDOMForCreate = function(callback) {
    /**
     * @param callback Function to be called when a project is created.
     *  It will receive the created project.
     * @returns DOM with form for creating a project.
     */
    var dom = u.htmlToDom(html_create_template);
    dom.getElementsByClassName('purejstodoist_project_button')[0].onclick = function() {
      var new_project = new Project({'name': dom.getElementsByClassName('purejstodoist_project_name')[0].value});
      callback(new_project);
    };

    return dom;
  }
  this.exports(Project);

  var html_list_template = '<ul id="projects">Projects:</ul>';
  var html_list_item_template = '<li></li>';
  function ListView(p_data) {
    var data = p_data || {};
    this.items = data.items || [];
    this.desc = data.desc || '';
    this.container = data.container || {show: function(){}};

    this.dom = null;
  };
  ListView.prototype = {
    toHtml : function() {
      return this.getDom().outerHTML;
    },
    getDom : function() {
      if (!this.dom) {
        var this_ = this;
        var item_templ = u.htmlToDom(html_list_item_template);
        var list_templ = u.htmlToDom(html_list_template);
        var data = _.each(this.items, function(item) {
          var item_dom = item_templ.cloneNode(true);
          item_dom.appendChild(item.getDom()).onclick = _.bind(this_.showTaskList, this_, [item]);
          //item_dom.onclick = _.bind(this_.showTaskList, this_);
          list_templ.appendChild(item_dom);
        });
        this.createElementDOM = item_templ.cloneNode(true);
        var appendProject = _.bind(this_.appendProject, this_);
        this.createElementDOM.appendChild(Project.getDOMForCreate(appendProject));
        list_templ.appendChild(this.createElementDOM);
        this.dom = list_templ;
      }
      return this.dom;
    },
    appendProject : function(new_project) {
      this.items.push(new_project);

      if (this.dom) {
        var item_templ = u.htmlToDom(html_list_item_template);
        item_templ.appendChild(new_project.getDom()).onclick = _.bind(this.showTaskList, this);
        this.dom.insertBefore(item_templ, this.createElementDOM);
      }
    }, showTaskList : function(project) {
      if(this.dom && project) {
        var TaskList = purejstodoist.task.TaskList,
          task_list = new TaskList({items: project.task_list});
        this.dom.parentElement.replaceChild(task_list.getDom(), this.dom);
      }
    }
  };
  this.exports(ListView);
});

