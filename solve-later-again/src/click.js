'use strict';

import {
    make_new_tr_sla,
    unhilight_problem,
    initialize_problem_status,
} from "./dom_operations.js";
const consts = require("./consts.js");


// [START function]
export function click_again_btn_sla(e){
    /* Againボタンをクリックしたときの処理 

    * SLAのテーブルのこの問題を初期状態に戻す

    Args:
        e(event): クリックされたボタンのイベント
    */

    const problem_name = e.target.getAttribute("id").slice(consts.ID_AGAIN_BTN_SLA_.length);

    initialize_problem_status(problem_name);
    for(let i=1; i<consts.SOLVED_MAX+1; i++){
        unhilight_problem(problem_name, i);
    }
    save_solve_later_again(problem_name);
}
// [END function]

// [START function]
export function click_del_btn_sla(e){
    /* Deleteボタンをクリックしたときの処理 

    * SLAのテーブルからこの問題を削除する
    * この問題のチェックボックスのチェックを外す

    Args:
        e(event): クリックされたボタンのイベント
    */

    const problem_name = e.target.getAttribute("id").slice(consts.ID_DEL_BTN_SLA_.length);

    // SLAのテーブルからこの問題を削除する
    const del_tr = document.getElementById(consts.ID_TR_SLA_+problem_name);
    del_tr.parentNode.removeChild(del_tr);

    // この問題のチェックボックスのチェックを外す
    const chkbox = document.getElementById(consts.ID_CHKBOX_SLA_+problem_name);
    chkbox.checked = false;

    // 現在のテーブル状態を保存する
    save_solve_later_again(problem_name);
}
// [END function]

// [START function]
export function click_chkbox_sla(e){
    /* 問題のチェックボックスがクリックされたときの処理
    Args:
        e(event): クリックされたチェックボックスのイベント
    */

    const problem_name = e.target.getAttribute("id").slice(consts.ID_CHKBOX_SLA_.length);

    if(e.target.checked){
        // SLAテーブルにこの問題を追加する
        const a_tag = e.target.parentNode.getElementsByTagName("a")[0].cloneNode(true);
        make_new_tr_sla(problem_name, a_tag);
    }
    else{
        // SLAテーブルからこの問題を削除する
        const elem_del = document.getElementById(consts.ID_TR_SLA_+problem_name);
        elem_del.parentNode.removeChild(elem_del);
    }

    // 現在のテーブル状態を保存する
    save_solve_later_again(problem_name);
}
// [END function]

// [START function]
function save_solve_later_again(problem_name){
    /*
    SLAテーブルの状態を保存する

    Args:
        problem_name(str): コンテスト名 (abc131_a)

    Notes:
        保存形式は、以下のような感じ。
            - チェックボックスのとき、null
            - 日付が入ってる場合、それをstr型で保存
        例
        {sla_abc131_a: {"solved1": "2019/4/21(Sun)"}, {"solved2": null}, {"solved3": null}}

    Refs:
        https://dackdive.hateblo.jp/entry/2017/07/27/100000
        https://github.com/taketakeyyy/my-practice/blob/master/dotinstall/MyExtensions/04_OptionsUI/options.js
    */
    const sla_id = "sla_" + problem_name;

    if(document.getElementById(consts.ID_TR_SLA_+problem_name) === null){
        // SLAテーブルに要素が存在しないなら、データを削除する
        chrome.storage.sync.remove(sla_id);
        return true;
    }

    // SLAテーブルに要素が存在するなら、現在の状態を保存する
    let saving_data = {};
    saving_data[sla_id] = {};
    for(let i=1; i<=consts.SOLVED_MAX; i++){
        const chkbox = document.getElementById("chkbox_solved"+String(i)+"_"+sla_id);
        if(chkbox === null){
            const div = document.getElementById("date_solved"+String(i)+"_"+sla_id);
            saving_data[sla_id]["solved"+String(i)] = div.innerText;
            continue;
        }
        saving_data[sla_id]["solved"+String(i)] = null;
    }

    chrome.storage.sync.set(saving_data);
}
// [END function]

// [START function]
export function click_chkbox_solved_sla(e){
    /* Solved Later Againテーブルの Solved のチェックボックスをクリックしたときの処理
    
    * Solved1のチェックが入ったら、クリックされた年月日をいれて、Solved2をクリック可能にする
    * Solved2のチェックが入ったら、クリックされた年月日をいれて、Solved3をクリック可能にする
    * Solved3のチェックが入ったら、クリックされた年月日をいれる

    Args:
        e(event): クリックされたチェックボックスのイベント
    */

    // このチェックボックスのidは、"chkbox_solved*_sla_project_problem"
    const problem_name = e.target.getAttribute("id").slice(consts.ID_CHKBOX_SOLVED1_SLA_.length);
    const solved_num = parseInt(e.target.getAttribute("id")["chkbox_solved".length], 10);

    const func = (solved_num) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const wday = now.getDay();
        const td = e.target.parentNode;
        td.innerText = "";
        const div = document.createElement("div");
        div.setAttribute("id", "date_solved"+String(solved_num)+"_sla_"+problem_name);
        div.innerText = year + "/" + (month+1) + "/" + day + "(" + consts.WDAYS[wday] + ")";
        td.appendChild(div);

        if(solved_num < consts.SOLVED_MAX){
            const chkbox_solved_next = document.getElementById("chkbox_solved"+(solved_num+1)+"_sla_"+problem_name);
            chkbox_solved_next.disabled = false;
        }
    }

    func(solved_num);

    unhilight_problem(problem_name, solved_num);

    // 現在のテーブル状態を保存する
    save_solve_later_again(problem_name);
}
// [END function]
