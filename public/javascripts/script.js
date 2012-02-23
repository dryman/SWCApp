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
        document.onkeypress = function(e){ };
      }
      else {
        document.onkeydown = function(e){ };
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
    /*
    if ((te.getTime() - ts.getTime()) < 5000){
      alert('您文章看得太快了，請照一般閱讀速度閱讀');
      return;
    }
    */
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
    $('html,body').animate({scrollTop: 0}, 1000);
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
    $('#title > h1').html('驗證瀏覽效果');
    $('#content').empty();
    $('#content').append('<p>請勾選您有印象看過的片段，我們會依此作為發送批幣之參考，以防止隨意瀏覽作答的投機客。</p><hr/>');
    $('#content').append('<form id="snippet_form" action="/submit" method="post"><table id="snippet_table"><tbody></tbody></table></form>');
    var i;
    for (i=0; i < 5; i++){
      $('#snippet_table').append('<tr><td>'+snippets[i]+'</td><td class="box"><input type="checkbox" name="checkbox'+i+'"/></td></tr')
    }
    $('#snippet_table').append('<tr><td><textarea name="comments" rows=20>請在此填入您的寶貴意見</textarea></td><td><input type="submit" name="submit" value="submit" /></td></tr>');
    $('html,body').animate({scrollTop: 0}, 1000);
      
    $('#snippet_form').submit(function(event){
      event.preventDefault();
      var $form = $(this);
      var user_answers = new Array();
      $('input[type=checkbox]').each(function(){user_answers.push(this.checked? 1: 0);});
      $.post('/submit',
        { 
          pttid: pttid, 
          records: JSON.stringify(records),
          user_answer: JSON.stringify(user_answers),
          answer: JSON.stringify(answers),
          comment: $('textarea').val()
        },
        function(json){
          $('#title > h1').html(json.title);
          $('#content').html(json.content);
          $('#sidebar').remove();
        },"json");
    });
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
        var parsePtt = /^[A-Za-z][0-9A-Za-z]+$/;
        pttid = $term;
        if (! parsePtt.test($term)){
          alert("請填入合法的ptt id!");
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
