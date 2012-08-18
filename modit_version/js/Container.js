/* Container.js
 *
 * Container refers to the HTML DOM that holds within and renders the module.
 */

modit('purejstodoist', ['util'], function(util) {
  "use strict";
  var doc = document;

  function Container(p_data) {
    var data = p_data || {};
    this.dom = data.id ? 
        doc.getElementById(data.id) : doc.getElementsByTagName('body')[0];
    this.init();
  }

  Container.prototype = {
    show: function(dom_to_show) {
      this.dom.replaceChild(dom_to_show, this.dom.firstChild);
    },
    init: function() {
      if (this.dom) {
        var ListView = purejstodoist.project.ListView,
          list_view = new ListView();
        this.dom.appendChild(list_view.getDom());
      }
    }
  };

  this.exports(Container);
});
