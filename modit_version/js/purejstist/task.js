// task.js

modit("purejstodoist.task", ['util'], function(util) {
  var id_sequence = 1;

  // Template for rendering a project.
  var html_template = '<span class="task" id="task_#{id}">#{text}</span>';
  // Template for the create task form
  var html_create_template = 
    '<span class="new_task">'
    + '<label>Add New Task: </label>'
    + '<input type="text" class="purejstodoist_task_text"/>'
    + '<input type="button" class="purejstodoist_task_button" value="Add!!" />'
    +'</span>';

  function Task(p_data) {
    var data = p_data || {};
    this.id = data.id || id_sequence++;
    this.text = data.text || '';

    this.project = data.project;
  };

  Task.prototype = {
    toHtml : function() {
      /** @return HTML with task text. */
      return util.substitute(html_template, this);
    },
    getDom : function() {
      /** @return DOM with task text. */
      if (!this.dom) {
        this.dom = util.htmlToDom(this.toHtml());
      }
      return this.dom;

    }
  };
  Task.getDOMForCreate = function(callback) {
    /**
     * @param callback Function to be called when a task is created.
     *  It will receive the created task.
     * @returns DOM with form for creating a task.
     */
    var dom = util.htmlToDom(html_create_template);
    dom.getElementsByClassName('purejstodoist_task_button')[0].onclick = function() {
      var new_task = new Task({'text': dom.getElementsByClassName('purejstodoist_task_text')[0].value});
      callback(new_task);
    };

    return dom;
  }
  this.exports(Task);

  var html_list_template = '<ul id="tasks">#{name}\'s Tasks:</ul>';
  var html_list_item_template = '<li></li>';
  function ListView(p_data) {
    var data = p_data || {};
    this.items = data.items || [];

    this.dom = null;
  };
  ListView.prototype = {
    toHtml : function() {
      return this.getDom().outerHTML;
    },
    getDom : function() {
      if (!this.dom) {
        var this_ = this;
        var item_templ = util.htmlToDom(html_list_item_template);
        var list_templ = util.htmlToDom(html_list_template);
        var data = _.each(this.items, function(item) {
          var item_dom = item_templ.cloneNode(true);
          item_dom.appendChild(item.getDom());
          list_templ.appendChild(item_dom);
        });
        this.createElementDOM = item_templ.cloneNode(true);
        this.createElementDOM.appendChild(Task.getDOMForCreate(function(new_item) {this_.appendItem(new_item);}));
        list_templ.appendChild(this.createElementDOM);
        this.dom = list_templ;
      }
      return this.dom;
    },
    appendItem : function(new_item) {
      this.items.push(new_item);

      var item_templ = util.htmlToDom(html_list_item_template);
      item_templ.appendChild(new_item.getDom());
      this.dom.insertBefore(item_templ, this.createElementDOM);
    }
  };
  this.exports(ListView);

});
