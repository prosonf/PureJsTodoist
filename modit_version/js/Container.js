/* Container.js
 *
 * Container refers to the HTML DOM that holds within and renders the module.
 */

modit('purejstodoist', ['util'], function(util) {
  "use strict";
  var doc = document;

  function Container(p_data) {
    var data = p_data || {},
      ListView = purejstodoist.project.ListView;

    if (data.dom) {
      this.dom = data.dom;
    } else {
      this.dom = data.id ? 
          doc.getElementById(data.id) : doc.getElementsByTagName('body')[0];
    }
    this.list_view = data.list_view || new ListView({container: this});
    this.list_view.container = this;
    this.init();
  }

  Container.prototype = {
    show: function(component) {
      this.dom.replaceChild(component.getDom ? component.getDom() : component, this.dom.firstChild);
    },
    init: function() {
      if (this.dom) {
        this.dom.appendChild(this.list_view.getDom());
      }
    }
  };

  this.exports(Container);
});
