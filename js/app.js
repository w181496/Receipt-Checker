'use strict';

(function(exports) {


  var ReceiptChecker = function() {

  };

  ReceiptChecker.prototype = {

     start() {

       $('#about').click(function(event) {
          $('#title_text').text("關於");
          $('#main').hide();
          $('#div_ref').hide();
          $('#div_setting').hide();
          $('#div_contact').hide();
          $('#div_about').show();
          closeMenu();
       });

       $('#check').click(function(event) {
          $('#title_text').text("對發票");
          $('#div_about').hide();
          $('#div_ref').hide();
          $('#div_setting').hide();
          $('#div_contact').hide();
          $('#main').show();
          closeMenu();
       });

       $('#reference').click(function(event) {
          $('#title_text').text("參考資料");
          $('#div_about').hide();
          $('#div_setting').hide();
          $('#div_contact').hide();
          $('#main').hide();
          $('#div_ref').show();
          closeMenu();
       });

       $('#setting').click(function(event) {
          $('#title_text').text("設定");
          $('#div_about').hide();
          $('#div_contact').hide();
          $('#main').hide();
          $('#div_ref').hide();
          $('#div_setting').show();
          closeMenu();
       });

       $('#contact').click(function(event) {
          $('#title_text').text("聯絡我們");
          $('#div_about').hide();
          $('#main').hide();
          $('#div_ref').hide();
          $('#div_setting').hide();
          $('#div_contact').show();
          closeMenu();
       });

       $.ajaxSetup( {
          xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
       });

       // get/set the select value and other info
       $.ajax({
          url: "http://w181496.twbbs.org/api/crawler.php",
          data: $('#sendRequest').serialize(),
          type:"POST",
          dataType:'text',

          success: function(msg) {
              var receipt_arr = jQuery.parseJSON(msg);
             // Todo: error detect
              $.each(receipt_arr, function(index, obj) {
                  $('#month')
                     .append($("<option></option>")
                     .attr("value", obj.url)
                     .text(obj.year + "年" + obj.month_from + "-" + obj.month_to + "月"));
              });
          },

          error: function(xhr, ajaxOptions, thrownError){
              alert(xhr.status);
              alert(thrownError);
          }

       });

       var sendBtn = document.getElementById('sendBtn');
       sendBtn.addEventListener('click', function(event) {

          $.ajax({
             url: "http://w181496.twbbs.org/api/check.php",
             data: $('#sendRequest').serialize(),
             type:"POST",
             dataType:'text',

             success: function(msg) {
                //alert(msg);
                console.log(msg);
                if(msg == "12") result("可能中特別獎，請輸入完整號碼!", 1);
                else if(msg == "11") result("可能中特獎，請輸入完整號碼!", 1);
                else if(msg == "10") result("可能中頭獎，請輸入完整號碼!", 1);
                else if(msg == "9") result("恭喜中特別獎!", 1);
                else if(msg == "8") result("恭喜中特獎!", 1);
                else if(msg == "7") result("恭喜中增開六獎!", 1);
                else if(msg == "6") result("恭喜中六獎!", 1);
                else if(msg == "5") result("恭喜中五獎!", 1);
                else if(msg == "4") result("恭喜中四獎!", 1);
                else if(msg == "3") result("恭喜中三獎!", 1);
                else if(msg == "2") result("恭喜中二獎!", 1);
                else if(msg == "1") result("恭喜中頭獎!", 1);
                else if(msg == "-1") result("輸入格式錯誤!", 0);
                else result("沒中G_G", 1);
             },

             error:function(xhr, ajaxOptions, thrownError){
                alert(xhr.status);
                alert(thrownError);
             }
          });

       });
    },

    result(str, type) {
       if(type == 0) {
          $("#num").attr("class","ui input fluid error");
       } else {
          $("#num").attr("class","ui input fluid");
       }
       alert(str);
    }

  };

  exports.ReceiptChecker = ReceiptChecker;

}) (window);
