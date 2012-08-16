// project.js

modit("purejstodoist.project", ['util'], function(u) {
  // Secuence to create projects
  var id_sequence = 1;

  // Template for rendering a project.
  var html_template = '<span class="project" id="project_#{id}">#{name}</span>';
  // Template for the create project form
  var html_create_template = 
    '<span class="new_project">'
    + '<label>Add New Project: </label>'
    + '<input type="text" class="purejstodoist_project_name"/>'
    + '<input type="button" class="purejstodoist_project_button" value="Create!!" />'
    +'</span>';

  function Project(p_data) {
    var data = p_data || {};
    this.id = data.id || id_sequence++;
    this.name = data.name || this.name;

    this.dom = null;
    this.createElementDOM = null;
  };
  Project.prototype = {
    id : null,
    name : '',
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
          item_dom.appendChild(item.getDom());
          list_templ.appendChild(item_dom);
        });
        this.createElementDOM = item_templ.cloneNode(true);
        this.createElementDOM.appendChild(Project.getDOMForCreate(function(new_project) {this_.appendProject(new_project);}));
        list_templ.appendChild(this.createElementDOM);
        this.dom = list_templ;
      }
      return this.dom;
    },
    appendProject : function(new_project) {
      this.items.push(new_project);

      var item_templ = u.htmlToDom(html_list_item_template);
      item_templ.appendChild(new_project.getDom());
      this.dom.insertBefore(item_templ, this.createElementDOM);
    }
  };
  this.exports(ListView);
});
