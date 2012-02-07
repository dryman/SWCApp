/* Author: Felix Chern
 * all rights reserved
 * GPL 2.1 license
 */

var key_manager = function () {
  return {
    registerKey: function(callBack) {
      if ($.browser.mozilla) {
        $(document).keypress(function(e) { callBack(e.which); });
      } else {
        $(document).keydown(function(e) {
          var key_code = $.browser.ie ? e.KeyCode : e.which;
          callBack(key_code);
        });
      }
    },
    clearKeys: function() {
      $.browser.mozilla ?
        $(document).keypress(function(){}):
        $(document).keydown(function(){});
    }
  }
}();

var keycode = { 
  "right": 39, 
  "left": 37, 
  "whiteSpace": 32, 
  "zero": 48, 
  "one": 49, 
  "two": 50, 
  "three": 51, 
  "four": 52, 
  "five": 53, 
  "six": 54, 
  "seven": 55, 
  "eight": 56, 
  "nine": 57
}

console.log("hello world");

function loadArticle () {
  $.get('/example',
    function(json){
      $.cookie("article",JSON.stringify(json));
    }, 'json');
}

$(function(){
  loadArticle();
  // $.cookie("article","foo");
  key_manager.registerKey(function(k){
    switch(k){
      case keycode.right: 
        $('#title > h1').html(JSON.parse($.cookie("article")).hello);
        break;
      default: break;
    }
  });
});
