'use strict';

window.addEventListener("load", function() {
  var receiptChecker = new ReceiptChecker();
  receiptChecker.start();
  receiptChecker.setMenuEvent();
  
  // 設定Setting部分的CSS style
  receiptChecker.setStyle();
  receiptChecker.setChangeStyle();
  receiptChecker.setImg();
  receiptChecker.setChangeImg();
});


