(function(){
    // 即時関数で囲む
    'use strict';
    //alert("Hello Kenkoooo!");

    // Content Scriptからchrome.runtime.sendMessage()を使ってメッセージを投げる
    // 第一引数にはメッセージのキーと値を指定する
    // 第二引数はうまくいったときのコールバック関数
    /*
    chrome.runtime.sendMessage(
        {},
        function(response){
            console.log(response);
            console.log("message sent!");
        }    
    );
    */

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        var root_div = document.getElementById('root');

        var target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        console.log(target_div);
        var insert_html = make_html();
        target_div.insertBefore(insert_html, target_div.firstChild);
    });

    function make_html(){
        var html = document.createElement("div");
        html.classList.add("row");
        var h2 = document.createElement("h2");
        h2.textContent = "Solve Later Again";
        html.insertBefore(h2, html.firstChild);
        return html;
    }

})();

