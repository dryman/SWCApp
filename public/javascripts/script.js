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

var swc = function SWCModule(){
  var count;
  var records = new Array()
  var ajax_content;
  var snippets;
  var answers;
  var articles;
  var pttid;
  var ts;
  var te;
  var storeRecord = function (option) {
    te = new Date();
    var article = articles[count];
    records.push({
      id: article.id,
      cluster: article.cluster,
      msec: ts.getTime(),
      diff: te.getTime() - ts.getTime(),
      option: option
    });
    count++;
    if (count >= articles.length){
      key_manager.clearKeys();
      renderSnippet();
    }
    else {
      renderArticle();
    }
  };
  var renderArticle = function () {
    var article = articles[count];
    $('#title > h1').html(article.title);
    $('#content').html(article.content);
    console.log("renderArticle "+ article.title +" count = " + count);
    ts = new Date();
    key_manager.registerKey(function(e){
      switch(e){
        case 48: storeRecord(0); break;
        case 49: storeRecord(1); break;
        case 50: storeRecord(2); break;
        case 51: storeRecord(3); break;
        case 52: storeRecord(4); break;
        case 53: storeRecord(5); break;
        case 54: storeRecord(6); break;
        case 55: storeRecord(7); break;
        case 56: storeRecord(8); break;
        case 57: storeRecord(9); break;
        case 78: storeRecord(-1); break; // n
      }
    });
  };
  var renderSnippet = function () {
    console.log("renderSnippet");
    $('#title > h1').html('驗證');
    $('#content').empty();
    $('#content').append('<form id="snippet_form" action="/finish" method="post"><table id="snippet_table"><tbody></tbody></table></form>');
    var i;
    for (i=0; i < 5; i++){
      $('#snippet_table').append('<tr><td>'+snippets[i]+'</td><td class="box"><input type="checkbox" name="checkbox'+i+'"/></td></tr')
    }
    $('#snippet_table').append('<tr><td></td><td><input type="submit" name="submit" value="submit" /></td></tr>');
      
    // render it
    // wait post, do post
    /*
    $('#snippet').submit(function(ev){
      ev.preventDevault();
      var $form = $(this);
      $.post('/upload',{
        // our records
      },function(json){
        renderThankyou();
      },"json");
    });
    */
  };
  var renderThankyou = function () {
    // render it
  };
  return {
    init_post: function (){
      $("#pttID_form").submit(function(event){
        event.preventDefault();
        var $form = $(this);
        var $term = $form.find('input[name="pttid"]').val()
        if ($term === '') {
          alert("請填入您的ptt id！");
          return false;
        }
        $.post('/ajax', {pttid: $term},
          function(json){
            if (json.success) {
              articles = json.articles;
              snippets = json.snippets;
              answers = json.answers;
              count = 0;
              $("#pttID_form").remove();
              renderArticle();
            }
            else {
              console.log("failed");
            }
          },"json");
      });
    },
    ajax_content: ajax_content,
    snippets: snippets,
    answers: answers,
    articles: articles,
    pttid: pttid
  };
}();

$(function(){
  swc.init_post();
});
