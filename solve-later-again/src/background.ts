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

    chrome.tabs.query(
        {
            active: true,
            lastFocusedWindow: true
        },
        function(tabs) {
            // Tableページのみ処理する
            // https://kenkoooo.com/atcoder#/table/username
            // https://kenkoooo.com/atcoder/#/table/username
            // https://kenkoooo.com/atcoder/?user=username#/table/username/
            const pattern = /^https?:\/\/kenkoooo\.com\/atcoder.*#\/table\/.*/g;
            const active_tab = tabs[0];
            if (active_tab == null) { return false; }
            if (active_tab.url == null) { return false; }
            if (active_tab.id == null ) { return false; }

            const result = active_tab.url.match(pattern);
            if(result === null){
                // Tableページでないならば
                return false;
            }

            // Tableページならば
            // アクティブタブにメッセージを送信する
            chrome.tabs.sendMessage(active_tab.id, {}, function(){});
            return true;
        }
    );

    return true;
});

