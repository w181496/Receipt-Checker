'use strict';

(function(exports) {


  var ReceiptChecker = function() {
  };

  ReceiptChecker.prototype = {

     start() {
        
       // 設定ajax
       $.ajaxSetup( {
          xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
       });

       // 取的並設定Select中的選項為後端爬下來的年月
       $.ajax({
          url: "http://w181496.twbbs.org/api/crawler.php",
          data: $('#sendRequest').serialize(),
          type:"POST",
          dataType:'text',

          success: function(msg) {
              var receipt_arr = jQuery.parseJSON(msg);
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

       // 設定按鈕事件去後端查詢驗證
       var sendBtn = document.getElementById('sendBtn');
       sendBtn.addEventListener('click', function(event) {
          $.ajax({
             url: "http://w181496.twbbs.org/api/check.php",
             data: $('#sendRequest').serialize(),
             type:"POST",
             dataType:'text',

             // 根據回傳回來的flag，產生對應的結果
             success: function(msg) {
                  (function(){
                      if(msg == "12") this.result("可能中特別獎，請輸入完整號碼!", 1);
                      else if(msg == "11") this.result("可能中特獎，請輸入完整號碼!", 1);
                      else if(msg == "10") this.result("可能中頭獎，請輸入完整號碼!", 1);
                      else if(msg == "9") this.result("恭喜中特別獎!", 1);
                      else if(msg == "8") this.result("恭喜中特獎!", 1);
                      else if(msg == "7") this.result("恭喜中增開六獎!", 1);
                      else if(msg == "6") this.result("恭喜中六獎!", 1);
                      else if(msg == "5") this.result("恭喜中五獎!", 1);
                      else if(msg == "4") this.result("恭喜中四獎!", 1);
                      else if(msg == "3") this.result("恭喜中三獎!", 1);
                      else if(msg == "2") this.result("恭喜中二獎!", 1);
                      else if(msg == "1") this.result("恭喜中頭獎!", 1);
                      else if(msg == "-1") this.result("輸入格式錯誤!", 0);
                      else this.result("沒中G_G", 1);
                  }).bind(ReceiptChecker.prototype)();
             },

             error:function(xhr, ajaxOptions, thrownError){
                alert(xhr.status);
                alert(thrownError);
             }
          });

       });
    },

    // 設定Menu上各個按鈕的事件
    setMenuEvent() {
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
    },

    // 輸入錯誤和正確時有不同的input class
    result(str, type) {
       if(type == 0) {
          $("#num").attr("class","ui input fluid error");
       } else {
          $("#num").attr("class","ui input fluid");
       }
       exports.alert(str);
    },
     
    // 設定主題色三個按鈕的click事件，並用localStorage保存狀態
    setChangeStyle() {
       $('#changeShit').click(function(event) {
           localStorage.setItem("type", 3);
           ReceiptChecker.prototype.setStyle();
       });
       
       $('#changePink').click(function(event) {
           localStorage.setItem("type", 2);
           ReceiptChecker.prototype.setStyle();
       });
       
       $('#changeDefault').click(function(event) {
           localStorage.setItem("type", 1);
           ReceiptChecker.prototype.setStyle();
       });
    },
     
    // 設定Menu背景圖片兩個按鈕的click事件，並用localStorage保存狀態
    setChangeImg() {
        $('#change101').click(function(event) {
            localStorage.setItem("img", 1);
            ReceiptChecker.prototype.setImg();
        });
       
        $('#changeWoods').click(function(event) {
            localStorage.setItem("img", 2);
            ReceiptChecker.prototype.setImg();
        });
    },
     
    // 根據localStorage更改主題CSS樣式
    setStyle() {
       var type = localStorage.getItem("type");
       if(type == 1) {
          $('div.screen').css('background-color', '#31558a');
          $('span.content_text').css('color', '#1C0D86');
          $('#sendBtn').attr('class', 'ui blue button fluid');
       } else if(type == 2){
          $('div.screen').css('background-color', 'pink');
          $('span.content_text').css('color', 'rgb(233, 96, 202)');
          $('#sendBtn').attr('class', 'ui pink button fluid');
       } else if(type == 3) {
          $('div.screen').css('background-color', 'rgb(158, 114, 10)');
          $('span.content_text').css('color', 'rgb(186, 160, 16)');
          $('#sendBtn').attr('class', 'ui yellow button fluid');
       }
    },
    
    // 根據localStorage更改Menu背景圖片
    setImg() {
       var img = localStorage.getItem("img");
       if(img == 1) {
          $('#menu-bg').attr('src', 'img/background.jpg');
       } else if(img == 2){
          $('#menu-bg').attr('src', 'img/background2.jpg');
       }
    }

  };

  exports.ReceiptChecker = ReceiptChecker;

}) (window);
