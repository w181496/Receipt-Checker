var rc = new ReceiptChecker();
describe('Test Receipt Checker', function(){
    $("body").append("<input id=\"num\">");
    $("body").append("<input id=\"about\">");
    $("body").append("<input id=\"check\">");
    $("body").append("<input id=\"reference\">");
    $("body").append("<input id=\"setting\">");
    $("body").append("<input id=\"contact\">");
    $("body").append("<p id=\"title_text\"></p>");
 
    describe('Test input class', function(){
        it("Test Successful Input", function(){
            rc.result('Just test', 1);
            assert.equal($('#num').attr('class'), 'ui input fluid');
        });

        it("Test Error Input", function(){
            rc.result('Just test2', 0);
            assert.equal($('#num').attr('class'), 'ui input fluid error');
        });
    });

    describe('Test Menu', function(){
        rc.setMenuEvent();

        it("Test about text of Menu", function(){
            $('#about').click();
            assert.equal($('#title_text').text(), '關於');
        });

        it("Test check text of Menu", function(){
            $('#check').click();
            assert.equal($('#title_text').text(), '對發票');
        });

        it("Test reference text of Menu", function(){
            $('#reference').click();
            assert.equal($('#title_text').text(), '參考資料');
        });

        it("Test setting text of Menu", function(){
            $('#setting').click();
            assert.equal($('#title_text').text(), '設定');
        });

        it("Test contact text of Menu", function(){
            $('#contact').click();
            assert.equal($('#title_text').text(), '聯絡我們');
        });


    });
});
