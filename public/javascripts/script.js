/* Author: Felix Chern
 * all rights reserved
 * GPL 2.1 license
 */

var key_manager = function () {
  return {
    registerKey: function(callBack) {
      if ($.browser.mozilla) {
        document.onkeypress = function(e){
          callBack(e.which); 
        };
      } else {
        document.onkeydown = function(e){
          var key_code = $.browser.ie ? e.KeyCode : e.which;
          callBack(key_code);
        };
      }
    },
    clearKeys: function() {
      if ($.browser.mozilla){
        document.onkeypress = function(e){
          console.log("keypress cleared");
        };
      }
      else {
        document.onkeydown = function(e){
          console.log("keydown cleared");
        };
      }
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
  "nine": 57,
  "n": 78
}

console.log("hello world");
var ajax_content;
var count=0;
var post_content;

function loadArticle () {
  $.get('/test',
    function(json){
      ajax_content=json;
    }, 'json');
}

$(function(){
  loadArticle();
  // $.cookie("article","foo");
   
   key_manager.registerKey(function(k){
    switch(k){
      case keycode.n: 
        $('#title > h1').html(ajax_content.articles[count].title);
        $('#content').html(ajax_content.articles[count].content);
        if (count < ajax_content.articles.length-1) count++;
        console.log("called registerkey");
        break;
      default: break;
    }
  });
  // key_manager.clearKeys();
  $("#postForm").submit(function(event){
    console.log("submit");
    event.preventDefault();
    var $form = $(this);
    var term = $form.find('input[name="abc"]').val();
    var url = $form.attr('action');
    $.post(url, {abc: term},
      function(json){
        $("#title > h1").html(ajax.abc);
      },"json");
  });
});
