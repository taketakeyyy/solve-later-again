'use strict';
// Content Scriptからメッセージを受け取った時の処理をchrome.runtime.onMessage.addListenerで書く
// コールバック関数でメッセージを受け取った時の処理を書けばOK
chrome.runtime.onMessage.addListener(
    function(message, sender, callback){
        // 第一引数は受け取ったメッセージ
        // 第二引数はそれを送ってきたオブジェクト
        // 第三引数は受け取った後に実行したいコールバック関数を指定することができる

        return true;
    }
);


// タブに変更があったとき（初めてページを開いたときも発火する）
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
    // [TODO] Unchecked runtime.lastError: The message port closed before a response was received.はこのへんがあやしい

    if(changeInfo.status !== "complete"){ return false; }

    chrome.tabs.getSelected(null, function(tab){
        // Tableページのみ処理する
        var pattern = /^https?:\/\/kenkoooo\.com\/atcoder\/\?user=.*#\/table\/.*/g;
        var result = tab.url.match(pattern);
        if(result === null){
            // Tableページでないならば
            return false;
        }
        
        // Tableページならば
        // アクティブタブにメッセージを送信する
        var queryInfo = {
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
        };

        chrome.tabs.query(queryInfo, function(result){
            // 配列の先頭に現在のタブが入っている
            var currentTab = result.shift();
            var message = {};
            chrome.tabs.sendMessage(currentTab.id, message, function(){});
        });
        return true;
    });

    return true;
});

