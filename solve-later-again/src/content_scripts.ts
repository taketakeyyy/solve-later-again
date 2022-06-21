(function(){
    // スコープの汚染を防ぐため、即時関数で囲む
    'use strict';
    const sla = require("./sla");

    // [START Entry Point]
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        sla.run_solve_later_again();
    });
    // [END Entry Point]

})();

