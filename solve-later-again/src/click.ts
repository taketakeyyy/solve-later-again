'use strict';

import {
    make_new_tr_sla,
    unhilight_problem,
    initialize_problem_status,
    get_active_table_tab,
    make_checkboxes,
} from "./dom_operations";
const consts = require("./consts");


/**
 * Againボタンをクリックしたときの処理
 *
 * @remarks SLAのテーブルのこの問題を初期状態に戻す
 *
 * @param e クリックされたボタンのイベント
 */
export function click_again_btn_sla(e: Event) {
    const again_btn: HTMLInputElement = <HTMLInputElement>e.target;
    const problem_name = again_btn.getAttribute("id")!.slice(consts.ID_AGAIN_BTN_SLA_.length);

    initialize_problem_status(problem_name);
    for (let i=1; i<consts.SOLVED_MAX+1; i++) {
        unhilight_problem(problem_name, i);
    }
    save_solve_later_again(problem_name);
}


/**
 * Deleteボタンをクリックしたときの処理
 *
 * @remarks
 *
 * * SLAのテーブルからこの問題を削除する
 *
 * * この問題のチェックボックスのチェックを外す
 *
 * @param e クリックされたボタンのイベント
 */
export function click_del_btn_sla(e: Event) {
    const del_btn: HTMLInputElement = <HTMLInputElement>e.target;
    const problem_name = del_btn.getAttribute("id")!.slice(consts.ID_DEL_BTN_SLA_.length);

    // SLAのテーブルからこの問題を削除する
    const del_tr: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById(consts.ID_TR_SLA_+problem_name);
    del_tr.parentNode!.removeChild(del_tr);

    // この問題のチェックボックスのチェックを外す
    const chkbox: HTMLInputElement = <HTMLInputElement>document.getElementById(consts.ID_CHKBOX_SLA_+problem_name);
    if (chkbox !== null) {
        chkbox.checked = false;
    }

    // 現在のテーブル状態を保存する
    save_solve_later_again(problem_name);
}

/**
 * 問題のチェックボックスがクリックされたときの処理
 *
 * @param e クリックされたチェックボックスのイベント
 */
export function click_chkbox_sla(e: Event) {
    const chkbox: HTMLInputElement = <HTMLInputElement>e.target;
    const problem_name = chkbox.getAttribute("id")!.slice(consts.ID_CHKBOX_SLA_.length);

    if(chkbox.checked) {
        // SLAテーブルにこの問題を追加する
        const target_td: HTMLTableCellElement = <HTMLTableCellElement>chkbox.parentNode;
        const a_tag: HTMLAnchorElement = <HTMLAnchorElement>target_td.getElementsByTagName("a")[0].cloneNode(true);
        make_new_tr_sla(problem_name, a_tag);
    }
    else{
        // SLAテーブルからこの問題を削除する
        const elem_del: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById(consts.ID_TR_SLA_+problem_name);
        elem_del.parentNode!.removeChild(elem_del);
    }

    // 現在のテーブル状態を保存する
    save_solve_later_again(problem_name);
}

/**
 * SLAテーブルの状態を保存する
 *
 * @remarks
 * * 保存形式は、以下のような感じ。
 *     - チェックボックスのとき、null
 *     - 日付が入ってる場合、それをstr型で保存
 *
 * * 例
 *     - {sla_abc131_a: {"solved1": "2019/4/21(Sun)"}, {"solved2": null}, {"solved3": null}}
 *
 * {@link https://dackdive.hateblo.jp/entry/2017/07/27/100000}
 * {@link https://github.com/taketakeyyy/my-practice/blob/master/dotinstall/MyExtensions/04_OptionsUI/options.js}
 *
 * @param problem_name コンテスト名 (abc131_a)
 */
function save_solve_later_again(problem_name: string) {
    const sla_id = "sla_" + problem_name;

    if(document.getElementById(consts.ID_TR_SLA_+problem_name) === null) {
        // SLAテーブルに要素が存在しないなら、データを削除する
        chrome.storage.sync.remove(sla_id);
        return true;
    }

    // SLAテーブルに要素が存在するなら、現在の状態を保存する
    let saving_data: any = {};
    saving_data[sla_id] = {};

    // problem_nameやurlやdifficultyなどの属性を保存する
    const target_tr: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById("tr_"+sla_id);
    const a_tag: HTMLAnchorElement = <HTMLAnchorElement>target_tr.getElementsByTagName("a")[0];
    saving_data[sla_id][consts.STORAGE_KEY_PROBLEM_NAME] = a_tag.innerText;
    saving_data[sla_id][consts.STORAGE_KEY_URL] = a_tag.href;
    saving_data[sla_id][consts.STORAGE_KEY_DIFFICULTY] = a_tag.className;

    // solvedチェックボックスの状態を保存する
    for(let i=1; i<=consts.SOLVED_MAX; i++) {
        const chkbox = document.getElementById("chkbox_solved"+String(i)+"_"+sla_id);
        if(chkbox === null){
            const div: HTMLDivElement = <HTMLDivElement>document.getElementById("date_solved"+String(i)+"_"+sla_id);
            saving_data[sla_id]["solved"+String(i)] = div.innerText;
            continue;
        }
        saving_data[sla_id]["solved"+String(i)] = null;
    }

    chrome.storage.sync.set(saving_data);
}


/**
 * Solved Later Againテーブルの Solved のチェックボックスをクリックしたときの処理
 *
 * @remarks
 *
 * 1. Solved1のチェックが入ったら、クリックされた年月日をいれて、Solved2をクリック可能にする
 * 2. Solved2のチェックが入ったら、クリックされた年月日をいれて、Solved3をクリック可能にする
 * 3. Solved3のチェックが入ったら、クリックされた年月日をいれる
 *
 * @param e クリックされたチェックボックスのイベント
 */
export function click_chkbox_solved_sla(e: Event) {

    // このチェックボックスのidは、"chkbox_solved*_sla_project_problem"
    const chkbox: HTMLInputElement = <HTMLInputElement>e.target;
    const problem_name = chkbox.getAttribute("id")!.slice(consts.ID_CHKBOX_SOLVED1_SLA_.length);
    const solved_num = parseInt(chkbox.getAttribute("id")!["chkbox_solved".length], 10);

    const func = (solved_num: number) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const wday = now.getDay();
        const td: HTMLTableCellElement = <HTMLTableCellElement>chkbox.parentNode;
        td.innerText = "";
        const div: HTMLDivElement = document.createElement("div");
        div.setAttribute("id", "date_solved"+String(solved_num)+"_sla_"+problem_name);
        div.innerText = year + "/" + (month+1) + "/" + day + "(" + consts.WDAYS[wday] + ")";
        td.appendChild(div);

        if(solved_num < consts.SOLVED_MAX) {
            const chkbox_solved_next: HTMLInputElement = <HTMLInputElement>document.getElementById("chkbox_solved"+(solved_num+1)+"_sla_"+problem_name);
            chkbox_solved_next.disabled = false;
        }
    }

    func(solved_num);

    unhilight_problem(problem_name, solved_num);

    // 現在のテーブル状態を保存する
    save_solve_later_again(problem_name);
}


/**
 * Show SLA Table のチェックボックスをクリックしたときのクリックイベント処理
 *
 * @param e クリックされたチェックボックスのイベント
 */
export function click_show_sla_table_sla(e: Event) {
    const chkbox: HTMLInputElement = <HTMLInputElement>e.target;
    on_click_show_sla_table_sla(chkbox.checked, true);
}


/**
 * Show SLA Table のチェックボックスをクリックしたときの実際の処理
 *
 * @param is_checked チェックボックスがチェック状態かどうか
 * @param do_save 状態を保存するかどうか
 *
 */
export function on_click_show_sla_table_sla(is_checked: boolean, do_save: boolean) {
    const div_sla_table_container: HTMLDivElement = <HTMLDivElement>document.getElementById(consts.DIV_SLA_TABLE_CONTAINER);

    if (is_checked) {
        div_sla_table_container.setAttribute("style", "display: block");
    }
    else{
        div_sla_table_container.setAttribute("style", "display: none");
    }

    if (do_save) {
        _save_show_sla_table(is_checked);
    }

}


/**
 * Show SLA Tableの状態を保存する
 *
 * @param is_checked チェックあり(true)/チェックなし(false)
 */
function _save_show_sla_table(is_checked: boolean) {
    let save_data: any = {};
    save_data["show_sla_table"] = is_checked;

    chrome.storage.sync.set(save_data);
}


/**
 * ストレージを読み込んで、各問題のチェックボックスにチェックを入れる
 */
export const check_checkboxes = async (): Promise<void> => {
    chrome.storage.sync.get(null, function(loaded_data) {
        // console.log(loaded_data)
        for(let sla_id in loaded_data) {
            const target_chkbox: HTMLInputElement = <HTMLInputElement>document.getElementById("chkbox_"+sla_id);
            if (target_chkbox === null) continue;

            if (sla_id === "show_sla_table") {
                target_chkbox.checked = loaded_data[sla_id];
                continue;
            }

            target_chkbox.checked = true;  // 問題のチェックボックスにチェックを入れる
        }
        return;
    });
}


/**
 * チェックボックスを作り直す
 */
export const click_remake_chkboxes = async (e: Event) => {
    const pre_active_tab = get_active_table_tab();
    if (e.target === pre_active_tab) {
        // 移動先のタブと、現在のアクティブタブが同じなら何もしない
        return;
    }

    // 各問題にチェックボックスをつける
    await make_checkboxes();
    await check_checkboxes();
}