window.addEventListener("load", function() {
  console.log("Hello World!");
  start();
});

function start() {

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
         url: "http://w181496.twbbs.org/api/index.php",
         data: $('#sendRequest').serialize(),
         type:"POST",
         dataType:'text',

         success: function(msg) {
            var output = document.getElementById('output');
            output.innerHTML = "";
            //alert(msg);
            if(msg == "12") alert("可能中特別獎，請輸入完整號碼!");
            else if(msg == "11") alert("可能中特獎，請輸入完整號碼!");
            else if(msg == "10") alert("可能中頭獎，請輸入完整號碼!");
            else if(msg == "9") alert("恭喜中特別獎!");
            else if(msg == "8") alert("恭喜中特獎!");
            else if(msg == "7") alert("恭喜中增開六獎!");
            else if(msg == "6") alert("恭喜中六獎!");
            else if(msg == "5") alert("恭喜中五獎!");
            else if(msg == "4") alert("恭喜中四獎!");
            else if(msg == "3") alert("恭喜中三獎!");
            else if(msg == "2") alert("恭喜中二獎!");
            else if(msg == "1") alert("恭喜中頭獎!");
            else if(msg == "-1") alert("輸入格式錯誤!");
            else output.innerHTML = "沒中G_G";
         },

         error:function(xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
         }
      });

   });
}

