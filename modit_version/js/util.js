/* util.js
 *
 * Utilities.
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
