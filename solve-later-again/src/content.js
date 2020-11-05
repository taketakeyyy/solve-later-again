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
    function _exist_doms(elem_h2) {
        const root_div = elem_h2.parentNode;
        const tbody = root_div.getElementsByTagName("tbody")[0];
        const trs = tbody.getElementsByTagName("tr");

        if(trs.length === 1) {
            // DOMがまだ構成されていない場合
            return false;
        }

        // 最後のtr要素（ABC001の要素）が作成され、その中のtd要素の長さが十分に作成されているならOKとする
        const last_tr = trs[trs.length-1];
        const last_tr_tds = last_tr.getElementsByTagName("td");
        if (last_tr_tds.length < 2) {
            return false;
        }
        return true;
    }
    // [END function]

    // [START function]
    /* Other Contest系の各問題のDOMが構築されているかをチェックする
    *   Args:
    *       elem_h2: テーブルのh2要素
    *
    *   Notes:
    *       DOMが作成される判定は、最後のdiv要素（Other Contestsの「UTPC 2011」が最後の要素）が作成されるまで待ったほうが良い。
    *
    */
   function _exist_doms_other_contests(elem_h2) {
        const parent_div = elem_h2.parentNode;  // 親の要素
        const target_div = parent_div.nextElementSibling;  // 次の兄弟要素
        const divs = target_div.children;
        const last_div = divs[divs.length-1];
        const tbody = last_div.getElementsByTagName("tbody")[0];
        const tds = tbody.getElementsByTagName("td");

        switch (elem_h2.innerText) {
            // 最後のdiv要素のコンテストが表示されていたらOKとする
            case "AGC-Like":
            case "AGC-Like Contest":
                if (last_div.getElementsByTagName("a")[0].innerText === "CODE FESTIVAL 2016 qual A" &&
                    tds[tds.length-1].getElementsByTagName("a")[0].innerText === "E. LRU パズル / LRU Puzzle"
                ) {
                    return true;
                }
                break;
            case "PAST":
                if (last_div.getElementsByTagName("a")[0].innerText === "第一回 アルゴリズム実技検定 過去問" &&
                    tds[tds.length-1].getElementsByTagName("a")[0].innerText === "O. 持久戦 / Endurance"
                ) {
                    return true;
                }
                break;
            case "JOI":
                if (last_div.getElementsByTagName("a")[0].innerText === "第５回日本情報オリンピック 予選（オンライン）" &&
                    tds[tds.length-1].getElementsByTagName("a")[0].innerText === "E. JOI 2006 予選 問題5"
                ) {
                    return true;
                }
                break;
            case "JAG":
                if (last_div.getElementsByTagName("a")[0].innerText === "JAG Practice Contest for ACM-ICPC Asia Regional 2012" &&
                    tds[tds.length-1].getElementsByTagName("a")[0].innerText === "J. Ancient Scrolls"
                ) {
                    return true;
                }
                break;
            case "Marathon":
                if (last_div.getElementsByTagName("a")[0].innerText === "Chokudai Contest 001" &&
                    tds[tds.length-1].getElementsByTagName("a")[0].innerText === "A. 高橋君の山崩しゲーム"
                ) {
                    return true;
                }
                break;
            case "Other Contests":
                if (last_div.getElementsByTagName("a")[0].innerText === "UTPC 2011" &&
                    tds[tds.length-1].getElementsByTagName("a")[0].innerText === "L. L番目の数字"
                ) {
                    return true;
                }
                break;
            }
        return false;
    }
    // [END function]

    // [START function]
    function _can_make_checkboxes() {
        /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成するための準備ができているか？
        DOMが構成されているかのチェックをする
        */
        const h2s = document.getElementsByTagName("h2");

        for(let i=0; i<h2s.length; i++){
            if ([
                "AtCoder Beginner Contest",
                "AtCoder Regular Contest",
                "AtCoder Grand Contest",
                "ABC-Like Contest",
                "ARC-Like Contest"
                ].includes(h2s[i].innerText))
            {
                return _exist_doms(h2s[i]);
            }
            else if([
                "AGC-Like Contest",
                "AGC-Like",
                "PAST",
                "JOI",
                "JAG",
                "Marathon",
                "Other Contests"
                ].includes(h2s[i].innerText))
            {
                return _exist_doms_other_contests(h2s[i]);
            }
        }
        return false;
    }
    // [END function]

    // [START function]
    function async_make_sla_table() {
        return new Promise(function (resolve, refect) {
            chrome.storage.sync.get(null, function(loaded_data) {
                for (let sla_id in loaded_data) {
                    if (sla_id === "show_sla_table") {
                        const chkbox_show_sla_table = document.getElementById(consts.ID_CHKBOX_SHOW_SLA_TABLE);
                        chkbox_show_sla_table.checked = loaded_data["show_sla_table"];
                        clickjs.on_click_show_sla_table_sla(loaded_data["show_sla_table"], false);
                        continue;
                    }

                    // SLAテーブルにtr要素を作成する
                    // const target_chkbox = document.getElementById("chkbox_"+sla_id);

                    // TODO ABCタグを開いている状態で、Other Contestsの保存したチェックボックスを参照しようとしてエラーが出ている
                    // const a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
                    let a_tag;
                    if (loaded_data[sla_id]["problem_name"] !== undefined) {
                        a_tag = document.createElement("a");
                        a_tag.setAttribute("target", "_blank");
                        a_tag.setAttribute("rel", "noopener");
                        a_tag.innerText = loaded_data[sla_id][consts.STORAGE_KEY_PROBLEM_NAME];
                        a_tag.setAttribute("href", loaded_data[sla_id][consts.STORAGE_KEY_URL]);
                        a_tag.setAttribute("class", loaded_data[sla_id][consts.STORAGE_KEY_DIFFICULTY]);
                    }
                    else {
                        // ABCタグを開いている状態で、Other Contestsの保存したチェックボックスを参照しようとするとエラーが出るが、後方互換性を保つためにできるだけ実行する
                        const target_chkbox = document.getElementById("chkbox_"+sla_id);
                        try {
                            a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
                        }
                        catch (e) {
                            continue;
                        }
                    }
                    dom_ope.make_new_tr_sla(sla_id.slice(4), a_tag);

                    // tr要素のSolved列が年月日の場合はそれに変更する
                    for (let i=1; i<=consts.SOLVED_MAX; i++) {
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
                    for (let i=1; i<=consts.SOLVED_MAX; i++) {
                        const chkbox = document.getElementById("chkbox_solved"+String(i)+"_"+sla_id);
                        if(chkbox === null){ continue; }
                        chkbox.disabled = false;
                        break;
                    }
                }
                resolve();
                return;
            });
        });
    }
    // [END function]

    // [START function]
    function async_check_checkboxes(){
        /* ストレージを読み込んで、各問題のチェックボックスにチェックを入れる */
        return new Promise(function (resolve, reject) {
            chrome.storage.sync.get(null, function(loaded_data) {
                // console.log(loaded_data);
                for(let sla_id in loaded_data) {
                    const target_chkbox = document.getElementById("chkbox_"+sla_id);
                    if (target_chkbox === null) continue;
                    target_chkbox.checked = true;  // 問題のチェックボックスにチェックを入れる
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
                return async_make_sla_table();
            })
            .then(() => {
                return dom_ope.make_checkboxes();
            })
            .then(() => {
                return async_check_checkboxes();
            })
            .then(() => {
                return dom_ope.hilight_problems();
            })
            .then(() => {
                return make_table_tab_tag();
            })
            .then(() => {
                g_semaph_can_make_chkbox = true;
            });
    }
    // [END function]

    // [START function]
    function on_rejected_can_make_checkboxes(try_count) {
        // make_checkboxes()に失敗したときの処理
        setTimeout(() => {
            async_can_make_checkboxes(try_count).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
        }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
    };
    // [END function]

    // [START function]
    function async_can_make_checkboxes(try_count) {
        /* ページのDOMが構築されるまで処理を待つ */
        return new Promise(function (resolve, reject) {
            if (try_count === 0) {
                // しょうがないので処理を進める
                resolve();
                return;
            }

            const is_success = _can_make_checkboxes();
            if(is_success){
                resolve();
                return;
            }

            // g_semaph_can_make_chkbox = true;
            reject(--try_count);
            return;
        });
    };
    // [END function]

    // [START function]
    function async_can_remake_checkboxes(try_count, pre_active_tab) {
        /* ページのDOMが構築されるまで処理を待つ */
        return new Promise(function (resolve, reject) {
            // アクティブタブが切り替わったか？
            if (pre_active_tab === dom_ope.get_active_table_tab()) {
                reject(0, pre_active_tab);
                return;
            }

            const is_success = _can_make_checkboxes();
            if(is_success || try_count === 0){
                resolve();
                return;
            }
            reject(--try_count, pre_active_tab);
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
                return dom_ope.make_checkboxes();
            })
            .then(() => {
                return async_check_checkboxes();
            })
            .then(() => {
                g_semaph_can_make_chkbox = true;
            });
    }
    // [END function]

    // [START function]
    function on_rejected_can_remake_checkboxes(try_count, pre_active_tab) {
        // make_checkboxes()に失敗したときの処理
        setTimeout(function () {
            async_can_remake_checkboxes(try_count, pre_active_tab).then(on_fullfilled_can_remake_checkboxes, on_rejected_can_remake_checkboxes);
        }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
    };
    // [END function]

    //[START function]
    function click_remake_chkboxes(e) {
        const pre_active_tab = dom_ope.get_active_table_tab();
        if (e.target === pre_active_tab) {
            // 移動先のタブと、現在のアクティブタブが同じなら何もしない
            return;
        }
        if (!g_semaph_can_make_chkbox) {
            return;
        }
        g_semaph_can_make_chkbox = false;

        async_can_remake_checkboxes(consts.CAN_MAKE_CHKBOX_RETRY_COUNT, pre_active_tab).then(on_fullfilled_can_remake_checkboxes, on_rejected_can_remake_checkboxes)
        // setTimeout(function () {
        //     async_can_remake_checkboxes(consts.CAN_MAKE_CHKBOX_RETRY_COUNT).then(on_fullfilled_can_remake_checkboxes, on_rejected_can_remake_checkboxes)
        // }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
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
            target_div.children[i].addEventListener("click", click_remake_chkboxes);
        }
    }
    // [END function]

    // [START Entry Point]
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        if(document.getElementById(consts.ID_SLA_ROOT) !== null){ return false; }
        const root_div = document.getElementById('root');

        const target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        const insert_html = dom_ope.make_base_html();
        target_div.insertBefore(insert_html, target_div.firstChild);

        if (g_semaph_can_make_chkbox) {
            g_semaph_can_make_chkbox = false;
            async_can_make_checkboxes(consts.CAN_MAKE_CHKBOX_RETRY_COUNT).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
        }
    });
    // [END Entry Point]

})();

