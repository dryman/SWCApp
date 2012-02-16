/* Author: Felix Chern
 * all rights reserved
 * GPL 2.1 license
 */

var key_manager = function () {
  var eventPool = new Array ();
  var registerToBrowser = function () {
    if ($.browser.mozilla) {
      document.onkeypress = function(e){
        var ev;
        for (ev in eventPool) {
          if (ev.keycode === e.which) { ev.callback() }
        }
      };
    } 
    else {
      document.onkeydown = function(e){
        var key_code = $.browser.ie ? e.KeyCode : e.which;
        var ev;
        for (ev in eventPool) {
          if (ev.keycode === key_code) { ev.callback() }
        }
      };
    }
  };
  return {
    registerKey: function(ev) {
      eventPool.push(ev); // ev = {keycode: code, callback: cb};
    },
    clearKeys: function() {
      eventPool = new Array();
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
var fsm = function () {
  var registerKey = function(state) {
    var obj;
    var eventArray = statePool[state];
    for (obj in eventArray) {
      if (obj.keycode) {
        key_manager.registerKey({
          keycode: obj.keycode,
          callback: function (){
            var transition = obj.callback();
            if (transition) {
              // change state and unregister key?
            }
          }
        })
      }
      else {
        if (obj.callback()){
          // do transition and unrigister key
        }
      }
  };
  var currentState;
  var statePool;
  return {
    createStates: function(){
      var arg;
      for (arg in arguments){
        statePool[arg] = new Array();
      }
      currentState = arguments[0]; // init state to first argument
    },
    setTransition: function(input){
      statePool[input.from].push({
        keycode: input.keycode,
        callback: input.callback,
        dest: input.to
      });
    },
    startFSM: function(){}
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
var records = new Array();
var ajax_content;

function loadArticle () {
  $.get('/test', function(json){ ajax_content=json; }, 'json');
  var count=0;
  var currentDate = new Date();
  $('#title > h1').html(ajax_content.articles[count].title);
  $('#content').html(ajax_content.articles[count].content);

  key_manager.registerKey(function(k){
    switch(k){
      case keycode.n: 
        $('#title > h1').html(ajax_content.articles[count].title);
        $('#content').html(ajax_content.articles[count].content);
        count++;
        console.log("called registerKey");
        if (count >= ajax_content.articles.length) key_manager.clearKeys();
        break;
      case keycode.one:
        break;
      case keycode.two:
      case keycode.three:
      case keycode.four:
      case keycode.five:
      case keycode.six:
      case keycode.seven:
      case keycode.eight:
      case keycode.nine:
      case keycode.zero:
      default: break;
    }
  });
}
function run(article) {
  $('#title > h1').html(article.title);
  $('#cotent').html(article.title);
  var currentDate = new Date();
  records.push({
    id: article.id,
    cluster: article.cluster,
    msec: 0,
    diff: 0,
    option: 1
  });
}

$(function(){
  loadArticle();
  // $.cookie("article","foo");
   
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
