'use strict';

import {
    click_chkbox_sla,
    click_chkbox_solved_sla,
    click_del_btn_sla,
    click_again_btn_sla,
    click_show_sla_table_sla,
    on_click_show_sla_table_sla,
    click_remake_chkboxes,
} from "./click";
import { do_sleep, strdate2date } from "./utils";
const consts = require("./consts");

/**
 * SLA テーブルを作成する
 *
 * @remarks
 *
 * SLA テーブルとは、 「Solve Later Again」を h2 要素に持つブロックのこと。
 */
export const make_sla_table = async (): Promise<void> => {
    chrome.storage.sync.get(null, function(loaded_data: any) {
        for (let sla_id in loaded_data) {
            if (sla_id === "show_sla_table") {
                const chkbox_show_sla_table: HTMLInputElement = <HTMLInputElement>document.getElementById(consts.ID_CHKBOX_SHOW_SLA_TABLE);
                chkbox_show_sla_table.checked = loaded_data["show_sla_table"];
                on_click_show_sla_table_sla(loaded_data["show_sla_table"], false);
                continue;
            }

            // SLAテーブルにtr要素を作成する
            // const target_chkbox = document.getElementById("chkbox_"+sla_id);

            // TODO ABCタグを開いている状態で、Other Contestsの保存したチェックボックスを参照しようとしてエラーが出ている
            // const a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
            let a_tag: HTMLAnchorElement|null = null;
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
                const target_chkbox: HTMLInputElement = <HTMLInputElement>document.getElementById("chkbox_"+sla_id);
                try {
                    const td: HTMLTableCellElement = <HTMLTableCellElement>target_chkbox.parentNode;
                    a_tag = <HTMLAnchorElement>td.getElementsByTagName("a")[0].cloneNode(true);
                }
                catch (e) {
                    continue;
                }
            }
            if (a_tag != null) {
                make_new_tr_sla(sla_id.slice(4), a_tag);
            }

            // tr要素のSolved列が年月日の場合はそれに変更する
            for (let i=1; i<=consts.SOLVED_MAX; i++) {
                const solved_date = loaded_data[sla_id]["solved"+String(i)];
                if(solved_date === null){ continue; }
                const parent_td: HTMLTableCellElement = <HTMLTableCellElement>document.getElementById("chkbox_solved"+String(i)+"_"+sla_id)!.parentNode;
                parent_td.innerText = "";
                const div = document.createElement("div");
                div.setAttribute("id", "date_solved"+String(i)+"_"+sla_id);
                div.innerText = solved_date;
                parent_td.appendChild(div);
            }

            // tr要素のSolved列のチェックボックスの中で、クリック可能にするものを決定する
            for (let i=1; i<=consts.SOLVED_MAX; i++) {
                const chkbox: HTMLInputElement = <HTMLInputElement>document.getElementById("chkbox_solved"+String(i)+"_"+sla_id);
                if(chkbox === null){ continue; }
                chkbox.disabled = false;
                break;
            }
        }
        return;
    });
}


/**
 * 問題のチェックボックスを作成する
 *
 * @param problem_name id 作成に必要な問題名
 */
 const new_checkbox_element = (problem_name: string): HTMLInputElement => {
    const new_chkbox = document.createElement("input");
    new_chkbox.setAttribute("type", "checkbox");
    new_chkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + problem_name);
    new_chkbox.setAttribute("class", consts.CLASS_CHKBOX_SLA);
    new_chkbox.checked = false;
    new_chkbox.addEventListener("click", click_chkbox_sla);
    return new_chkbox;
}


/**
 * 各問題の td 要素にチェックボックスを作成する。
 *
 * @remarks
 *
 * class="react-bs-table-container" があり、class="sla-table-container"を持たない div 要素を取得する。
 * その中の class に "table-problem" を持ち、 "table-problem-empty" を持たない td 要素にチェックボックスを追加する。
 * チェックボックスの id は、id="chkbox_sla_abc255_a" のようになる。
 *
 * @returns 追加したチェックボックスの数
 *
 */
const _append_checkboxes = async (): Promise<number> => {
    // ターゲットとなる td 要素を探す
    const tds = document.getElementsByClassName("table-problem");

    let append_num = 0;
    for(let i=0; i<tds.length; i++) {
        // 対象の td 要素かどうか判定
        const target_td = <HTMLTableCellElement>tds[i];
        if (target_td.classList.contains("table-problem-empty")) { continue; }

        // すでにチェックボックスが存在していればスキップ
        const inputs: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>target_td.getElementsByTagName("input");
        let is_exist_chkbox = false;
        for(let i=0; i<inputs.length; i++) {
            if (inputs[i].classList.contains(consts.CLASS_CHKBOX_SLA)) {
                is_exist_chkbox = true;
                break;
            }
        }
        if (is_exist_chkbox) { continue; }

        // チェックボックスの id のための情報を取得
        const a_tag: HTMLAnchorElement = <HTMLAnchorElement>target_td.getElementsByTagName("a")[0];
        const href_texts: string[] = a_tag.href.split("/");
        const problem_name: string = href_texts[href_texts.length-1];

        // チェックボックス作成・追加
        const new_chkbox = new_checkbox_element(problem_name);
        target_td.insertBefore(new_chkbox, target_td.firstChild);
        append_num++;
    }

    return append_num;
}


/**
 * 各問題にチェックボックスを作る。
 *
 * @remarks
 *
 * 各問題にチェックボックスを作成するとき、以下のステップで進める。
 *
 *   1. 1個も作成できなかったとき、少し時間を置いてリトライする。1個以上作成できたら 2 へ。
 *   2. 1個以上作成できたとき、少し時間を置いてリトライする。1個も作成できなくなったら、終了。
 */
export const make_checkboxes = async () => {
    let first_success = false;  // 1個以上作成できたかどうか

    for(let i=0; i<consts.CAN_MAKE_CHKBOX_RETRY_COUNT; i++) {
        let append_num = 0;
        try {
            append_num = await _append_checkboxes();
        }
        catch {
            break;
        }

        if (!first_success) {
            if (append_num > 0) { first_success = true; }
            await do_sleep(consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
            continue;
        }
        else {
            if (append_num > 0) {
                // まだ作成できる余地があるので、再度実行
                await do_sleep(consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
            }
            else {
                // すべて作成し終わったみなし、終了
                break;
            }
        }
    }
}

/**
 * Solve Later Again セクションの基本的なHTMLを作成する
 */
export function make_base_html(){
    const html = document.createElement("div");
    html.setAttribute("id", consts.ID_SLA_ROOT);
    html.classList.add("row");

    const h2 = document.createElement("h2");
    h2.textContent = "Solve Later Again";
    h2.setAttribute("class", "sla-h2");
    html.appendChild(h2);

    html.appendChild(_make_show_sla_table_chkbox());

    const div_react_bs_table_container = document.createElement("div");
    div_react_bs_table_container.classList.add("react-bs-table-container");
    div_react_bs_table_container.classList.add("sla-table-container");
    div_react_bs_table_container.setAttribute("id", consts.DIV_SLA_TABLE_CONTAINER);
    html.appendChild(div_react_bs_table_container);

    const div_react_bs_table = document.createElement("div");
    div_react_bs_table.classList.add("react-bs-table");
    div_react_bs_table.classList.add("react-bs-table-bordered");
    div_react_bs_table_container.appendChild(div_react_bs_table);

    const div_s_alert_wrapper = document.createElement("div");
    div_s_alert_wrapper.classList.add("s-alert-wrapper");
    div_react_bs_table_container.appendChild(div_s_alert_wrapper);

    const div_react_bs_container_header = document.createElement("div");
    div_react_bs_container_header.classList.add("react-bs-container-header");
    div_react_bs_container_header.classList.add("table-header-wrapper");
    div_react_bs_table.appendChild(div_react_bs_container_header);

    const div_react_bs_container_body = document.createElement("div");
    div_react_bs_container_body.classList.add("react-bs-container-body");
    div_react_bs_table.appendChild(div_react_bs_container_body);

    const table_container_header = document.createElement("table");
    table_container_header.classList.add("table");
    table_container_header.classList.add("table-hover");
    table_container_header.classList.add("table-bordered");
    div_react_bs_container_header.appendChild(table_container_header);

    const table_container_body = document.createElement("table");
    table_container_body.classList.add("table");
    table_container_body.classList.add("table-bordered");
    div_react_bs_container_body.appendChild(table_container_body);

    const colgroup_container_header = document.createElement("colgroup");
    table_container_header.appendChild(colgroup_container_header);

    const colgroup_container_body = document.createElement("colgroup");
    table_container_body.appendChild(colgroup_container_body);

    const col_header1 = document.createElement("col");
    const col_header2 = document.createElement("col");
    const col_header3 = document.createElement("col");
    const col_header4 = document.createElement("col");
    const col_header5 = document.createElement("col");
    colgroup_container_header.appendChild(col_header1);
    colgroup_container_header.appendChild(col_header2);
    colgroup_container_header.appendChild(col_header3);
    colgroup_container_header.appendChild(col_header4);
    colgroup_container_header.appendChild(col_header5);

    const col_body1 = document.createElement("col");
    const col_body2 = document.createElement("col");
    const col_body3 = document.createElement("col");
    const col_body4 = document.createElement("col");
    const col_body5 = document.createElement("col");
    colgroup_container_body.appendChild(col_body1);
    colgroup_container_body.appendChild(col_body2);
    colgroup_container_body.appendChild(col_body3);
    colgroup_container_body.appendChild(col_body4);
    colgroup_container_body.appendChild(col_body5);

    const thead = document.createElement("thead");
    table_container_header.appendChild(thead);

    const tr_thead = document.createElement("tr");
    thead.appendChild(tr_thead);

    const th_problem = document.createElement("th");
    th_problem.textContent = "Problem";
    tr_thead.appendChild(th_problem);

    const th_solved1 = document.createElement("th");
    th_solved1.textContent = "Solved 1";
    tr_thead.appendChild(th_solved1);

    const th_solved2 = document.createElement("th");
    th_solved2.textContent = "Solved 2 ("+String(consts.SOLVED2_DAYS)+" Days Later)";
    tr_thead.appendChild(th_solved2);

    const th_solved3 = document.createElement("th");
    th_solved3.textContent = "Solved 3 ("+String(consts.SOLVED3_DAYS)+" Days Later)";
    tr_thead.appendChild(th_solved3);

    const th_buttons = document.createElement("th");
    th_buttons.textContent = "Buttons";
    th_buttons.colSpan = 2;
    tr_thead.appendChild(th_buttons);

    const tbody = document.createElement("tbody");
    table_container_body.appendChild(tbody);

    return html;
}


/** SLAテーブルの新しいtr要素を作成する */
export function make_new_tr_sla(problem_name: string, a_tag: HTMLAnchorElement){
    const tr = document.createElement("tr");
    tr.setAttribute("id", consts.ID_TR_SLA_+problem_name);

    const td1 = document.createElement("td");
    td1.appendChild(a_tag);

    // Solved1, 2, 3の td要素。あとで初期化する
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    const td5 = document.createElement("td");
    td5.classList.add("td-sla-again");
    const btn_again = document.createElement("input");
    btn_again.setAttribute("type", "button");
    btn_again.setAttribute("value", "ReAgain");
    btn_again.setAttribute("id", consts.ID_AGAIN_BTN_SLA_+problem_name);
    btn_again.classList.add("btn");
    //btn_again.classList.add("btn-secondary");
    btn_again.classList.add("btn-sla-again");
    btn_again.addEventListener("click", click_again_btn_sla);
    td5.appendChild(btn_again);

    const td6 = document.createElement("td");
    td6.classList.add("td-sla-delete");
    const btn_del = document.createElement("input");
    btn_del.setAttribute("type", "button");
    btn_del.setAttribute("value", "Delete");
    btn_del.setAttribute("id", consts.ID_DEL_BTN_SLA_+problem_name);
    btn_del.classList.add("btn");
    btn_del.classList.add("btn-secondary");
    btn_del.classList.add("btn-sla-delete");
    btn_del.addEventListener("click", click_del_btn_sla);
    td6.appendChild(btn_del);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    // Solve Later Againのtbodyに、tr要素を追加する
    const root_div: HTMLDivElement = <HTMLDivElement>document.getElementById(consts.ID_SLA_ROOT);
    const tbody: HTMLTableSectionElement = <HTMLTableSectionElement>root_div!.getElementsByTagName("tbody")[0];
    tbody.appendChild(tr);

    initialize_problem_status(problem_name);
}


/** SLAテーブルの指定の問題の状態を初期化する */
export function initialize_problem_status(problem_name: string){
    const target_tr: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById(consts.ID_TR_SLA_+problem_name);
    const tds = target_tr.getElementsByTagName("td");

    // solved1
    tds[1].textContent = null;  // 子要素を全て削除
    const chkbox1 = document.createElement("input");
    chkbox1.setAttribute("type", "checkbox");
    chkbox1.setAttribute("id", consts.ID_CHKBOX_SOLVED1_SLA_+problem_name);
    chkbox1.addEventListener("click", click_chkbox_solved_sla);
    tds[1].appendChild(chkbox1);
    chkbox1.checked = false;
    chkbox1.disabled = false;

    // solved2
    tds[2].textContent = null;
    const chkbox2 = document.createElement("input");
    chkbox2.setAttribute("type", "checkbox");
    chkbox2.setAttribute("id", consts.ID_CHKBOX_SOLVED2_SLA_+problem_name);
    chkbox2.addEventListener("click", click_chkbox_solved_sla);
    tds[2].appendChild(chkbox2);
    chkbox2.checked = false;
    chkbox2.disabled = true;

    // solved3
    tds[3].textContent = null;
    const chkbox3 = document.createElement("input");
    chkbox3.setAttribute("type", "checkbox");
    chkbox3.setAttribute("id", consts.ID_CHKBOX_SOLVED3_SLA_+problem_name);
    chkbox3.addEventListener("click", click_chkbox_solved_sla);
    tds[3].appendChild(chkbox3);
    chkbox3.checked = false;
    chkbox3.disabled = true;
}


/** 規定の日数を経過したSLAテーブルの問題をハイライトする */
export const hilight_problems = async () => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);

    // SLAテーブルの各問題を走査する
    const root_div: HTMLDivElement = <HTMLDivElement>document.getElementById(consts.ID_SLA_ROOT);
    const tbody = root_div.getElementsByTagName("tbody")[0];
    const trs = tbody.getElementsByTagName("tr");
    for(let i=0; i<trs.length; i++) {
        const problem_name = trs[i].getAttribute("id")!.slice(consts.ID_TR_SLA_.length);
        const tds = trs[i].getElementsByTagName("td");
        // Solved 1をチェックする
        const chkbox: HTMLInputElement = <HTMLInputElement>document.getElementById(consts.ID_CHKBOX_SOLVED1_SLA_+problem_name);
        if(chkbox !== null && chkbox.disabled === false){
            // Soved1をまだチェックしていないので、何もしない
            continue;
        }

        const hilight_if_needed = (solved_num: number, need_msec: number) => {
            /* SLAテーブルの問題を、日数が経過していればハイライトする */
            const chkbox: HTMLInputElement = <HTMLInputElement>document.getElementById("chkbox_solved"+String(solved_num)+"_sla_"+problem_name);
            if(chkbox !== null && chkbox.disabled === false){
                // このSovedをまだチェックしていないので、前のSolvedの日付と比較する
                const dt_str = document.getElementById("date_solved"+String(solved_num-1)+"_sla_"+problem_name)!.innerText;
                const dt = strdate2date(dt_str);
                // const dt = strdate2date("2019/6/1(Hoge)");  // テスト用
                const elapsed_msec: number = today.getTime() - dt.getTime();
                if(elapsed_msec >= need_msec){
                    // 経過しているのでハイライト
                    const target_tr: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById(consts.ID_TR_SLA_+problem_name);
                    target_tr.style.backgroundColor = consts.HILIGHT_CLR_TR;
                    tds[solved_num].style.backgroundColor = consts.HILIGHT_CLR_TD;
                    return true;
                }
                return false;
            }
        }

        // Solved 2をチェックする
        let result = hilight_if_needed(2, 60*60*24*consts.SOLVED2_DAYS*1000);
        if(result){ continue; }

        // Solved 3をチェックする
        result = hilight_if_needed(3, 60*60*24*consts.SOLVED3_DAYS*1000);
        if(result){ continue; }
    }
}


/**
 * SLAテーブルの指定の問題のハイライトを解除する
 *
 * @param problem_name 問題名
 *
 * @param solved_num solved 番号
 */
export function unhilight_problem(problem_name: string, solved_num: number){
    const target_tr: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById(consts.ID_TR_SLA_+problem_name);
    target_tr.style.backgroundColor = "";

    const tds = target_tr.getElementsByTagName("td");
    tds[solved_num].style.backgroundColor = "";
}


/** Show SLA Table のチェックボックスを作成する */
function _make_show_sla_table_chkbox(){

    const show_sla_table_chkbox = document.createElement("input");
    show_sla_table_chkbox.setAttribute("type", "checkbox");
    show_sla_table_chkbox.setAttribute("class", "form-check-input");
    show_sla_table_chkbox.setAttribute("id", consts.ID_CHKBOX_SHOW_SLA_TABLE);
    show_sla_table_chkbox.addEventListener("click", click_show_sla_table_sla);

    const show_sla_table_label = document.createElement("label");
    show_sla_table_label.setAttribute("class", "form-check-label");
    show_sla_table_label.innerText = "Show SLA Table";
    show_sla_table_label.insertBefore(show_sla_table_chkbox, show_sla_table_label.firstChild);

    const show_sla_table_div = document.createElement("div");
    show_sla_table_div.setAttribute("class", "form-check form-check-inline");
    show_sla_table_div.insertBefore(show_sla_table_label, show_sla_table_div.firstChild);

    const base_div = document.createElement("div");
    base_div.setAttribute("class", "");
    base_div.insertBefore(show_sla_table_div, base_div.firstChild);

    return base_div;
}


/**
 * table-tab にクリックイベントを追加する
 *
 * @remarks
 *
 * table-tab とは、 class="table-tab" の div 要素。
 *
 * ABC や ARC に問題ページを切り替えるボタンのこと。
 */
export const make_table_tab_tag = async (): Promise<void> => {
    const divs = document.getElementsByTagName("div");

    /* table-tabのdiv要素を探す */
    let target_div: HTMLDivElement|null = null;  // table tabのdiv要素
    for (let i=0; i<divs.length; i++) {
        const btn: HTMLButtonElement = <HTMLButtonElement>divs[i].firstChild;
        if (!divs[i].hasAttribute("role") || divs[i].firstChild===null || btn.innerText!=="ABC") continue;
        target_div = divs[i];
        break;
    }

    if (target_div == null) { return; }

    /* table-tabの各子要素にクリックイベントを追加する */
    for (let i=0; i<target_div.children.length; i++) {
        target_div.children[i].addEventListener("click", click_remake_chkboxes);
    }
}


/** 現在のtable_tabでアクティブになっているものを返す */
export function get_active_table_tab() {
    const table_tab = document.getElementsByClassName("table-tab btn-group")[0];
    return table_tab.getElementsByClassName("active")[0];
}