(function(){
    // スコープの汚染を防ぐため、即時関数で囲む
    'use strict';
    const dom_ope = require("./dom_operations.js");
    const consts = require("./consts.js");
    const clickjs = require("./click.js");

    let g_semaph_can_make_chkbox = true;  // 問題のチェックボックスを作成可能かどうかのセマフォ


    // [START function]
    /* ABC, ARC, AGCの各問題のDOMが構築されているかをチェックする
    *   Args:
    *       elem_h2: テーブルのh2要素
    *
    *   Notes:
    *       DOMが作成される判定は、「ABC001」のtr要素のような最後のtr要素が作成されるまで待ったほうが良い。
    *
    */
    function _exist_doms(elem_h2){
        const root_div = elem_h2.parentNode;
        const tbody = root_div.getElementsByTagName("tbody")[0];
        const trs = tbody.getElementsByTagName("tr");

        if(trs.length === 1){
            // DOMがまだ構成されていない場合
            return false;
        }

        // 最後のtr要素（ABC001の要素）が作成され、その中のtd要素の長さが十分に作成されているならOKとする
        const last_tr = trs[trs.length-1];
        const last_tr_tds = last_tr.getElementsByTagName("td");
        if(last_tr_tds.length < 2){
            return false;
        }

        return true;
    }
    // [END function]

    // [START function]
    function _can_make_checkboxes(){
        /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成するための準備ができているか？
        DOMが構成されているかのチェックをする
        */
        const h2s = document.getElementsByTagName("h2");
        let is_success = true;
        for(let i = 0; i < h2s.length; i++){
            if(h2s[i].innerText == "AtCoder Beginner Contest"){
                is_success &= _exist_doms(h2s[i]);
            }
            else if(h2s[i].innerText == "AtCoder Regular Contest"){
                is_success &= _exist_doms(h2s[i]);
            }
            else if(h2s[i].innerText == "AtCoder Grand Contest"){
                is_success &= _exist_doms(h2s[i]);
            }
        }
        if(!is_success){ return false; }
        return true;
    }
    // [END function]

    // [START function]
    function async_load_storage(){
        return new Promise(function (resolve, reject) {
            chrome.storage.sync.get(null, function(loaded_data){
                for(let sla_id in loaded_data){
                    if (sla_id === "show_sla_table") {
                        const chkbox_show_sla_table = document.getElementById(consts.ID_CHKBOX_SHOW_SLA_TABLE);
                        chkbox_show_sla_table.checked = loaded_data["show_sla_table"];
                        clickjs.on_click_show_sla_table_sla(loaded_data["show_sla_table"], false);
                        continue;
                    }

                    // SLAテーブルにtr要素を作成する
                    const target_chkbox = document.getElementById("chkbox_"+sla_id);
                    const a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
                    dom_ope.make_new_tr_sla(sla_id.slice(4), a_tag);

                    // tr要素のSolved列が年月日の場合はそれに変更する
                    for(let i=1; i<=consts.SOLVED_MAX; i++){
                        const solved_date = loaded_data[sla_id]["solved"+String(i)];
                        if(solved_date === null){ continue; }
                        const parent_td = document.getElementById("chkbox_solved"+String(i)+"_"+sla_id).parentNode;
                        parent_td.innerText = "";
                        const div = document.createElement("div");
                        div.setAttribute("id", "date_solved"+String(i)+"_"+sla_id);
                        div.innerText = solved_date;
                        parent_td.appendChild(div);
                    }

                    // tr要素のSolved列のチェックボックスの中で、クリック可能にするものを決定する
                    for(let i=1; i<=consts.SOLVED_MAX; i++){
                        const chkbox = document.getElementById("chkbox_solved"+String(i)+"_"+sla_id);
                        if(chkbox === null){ continue; }
                        chkbox.disabled = false;
                        break;
                    }

                    // 問題のチェックボックスにチェックを入れる
                    target_chkbox.checked = true;
                }
                resolve();
                return;
            });
        });
    }
    // [END function]

    // [START function]
    function on_fullfilled_can_make_checkboxes() {
        // make_checkboxes()が正常に成功した or リトライ回数を超えたら、しょうがないので諦めてそのまま次の処理へ。
        // 各ABC, ARC, AGC等の問題にチェックボックスをつける
        return Promise.resolve()
            .then(() => {
                dom_ope.make_checkboxes();
            })
            .then(
                async_load_storage
            ).then(
                dom_ope.hilight_problems
            ).then(
                make_table_tab_tag
            ).then(() => {
                g_semaph_can_make_chkbox = true;
            });
    }
    // [END function]

    // [START function]
    function on_rejected_can_make_checkboxes(try_count) {
        // make_checkboxes()に失敗したときの処理
        setTimeout(function () {
            async_can_make_checkboxes(try_count).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
        }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
    };
    // [END function]

    // [START function]
    function async_can_make_checkboxes(try_count) {
        /* ページのDOMが構築されるまで処理を待つ */
        return new Promise(function (resolve, reject) {
            if (!g_semaph_can_make_chkbox) return;
            g_semaph_can_make_chkbox = false;

            const is_success = _can_make_checkboxes();
            if(is_success || try_count === 0){
                resolve();
                return;
            }
            reject(--try_count);
            return;
        });
    };
    // [END function]

    // [START function]
    function async_can_remake_checkboxes(try_count) {
        /* ページのDOMが構築されるまで処理を待つ */
        return new Promise(function (resolve, reject) {
            const is_success = _can_make_checkboxes();
            if(is_success || try_count === 0){
                resolve();
                return;
            }
            reject(--try_count);
            return;
        });
    };
    // [END function]

    // [START function]
    function on_fullfilled_can_remake_checkboxes() {
        // make_checkboxes()が正常に成功した or リトライ回数を超えたら、しょうがないので諦めてそのまま次の処理へ。
        // 各ABC, ARC, AGC等の問題にチェックボックスをつける
        return Promise.resolve()
            .then(() => {
                dom_ope.make_checkboxes();
            })
            .then(() => {
                g_semaph_can_make_chkbox = true;
            });
    }
    // [END function]

    // [START function]
    function on_rejected_can_remake_checkboxes(try_count) {
        // make_checkboxes()に失敗したときの処理
        setTimeout(function () {
            async_can_remake_checkboxes(try_count).then(on_fullfilled_can_remake_checkboxes, on_rejected_can_remake_checkboxes);
        }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
    };
    // [END function]

    //[START function]
    function remake_chkboxes() {
        if (!g_semaph_can_make_chkbox) return;
        g_semaph_can_make_chkbox = false;
        setTimeout(function () {
            async_can_remake_checkboxes(consts.CAN_MAKE_CHKBOX_RETRY_COUNT).then(on_fullfilled_can_remake_checkboxes, on_rejected_can_remake_checkboxes)
        }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
    }
    // [END function]

    //[START function]
    function make_table_tab_tag(){
        /* table tabにクリックイベントを追加する */
        const divs = document.getElementsByTagName("div");

        /* table tagのdiv要素を探す */
        let target_div;  // table tagのdiv要素
        for (let i=0; i<divs.length; i++) {
            if (!divs[i].hasAttribute("role") || divs[i].firstChild===null || divs[i].firstChild.innerText!=="ABC") continue;
            target_div = divs[i];
        }

        /* table tagの各子要素にクリックイベントを追加する */
        for (let i=0; i<target_div.children.length; i++) {
            target_div.children[i].addEventListener("click", remake_chkboxes);
        }
    }
    // [END function]

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        if(document.getElementById(consts.ID_SLA_ROOT) !== null){ return false; }
        const root_div = document.getElementById('root');

        const target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        const insert_html = dom_ope.make_base_html();
        target_div.insertBefore(insert_html, target_div.firstChild);

        async_can_make_checkboxes(consts.CAN_MAKE_CHKBOX_RETRY_COUNT).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
    });

})();

