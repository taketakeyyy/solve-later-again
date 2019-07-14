'use strict';

import { 
    click_chkbox_sla,
    click_chkbox_solved_sla,
    click_del_btn_sla,
    click_again_btn_sla,
} from "./click.js";
const consts = require("./consts.js");

//[START function]
function _append_checkboxes(elem_h2, col_num){
    /* ABC, ARC, AGCの各問題にチェックボックス要素を追加する
    Args:
        elem_h2: テーブルのh2要素
        col_num(int): テーブルの列数
    */
    const root_div = elem_h2.parentNode;
    const tbody = root_div.getElementsByTagName("tbody")[0];
    const tds = tbody.getElementsByTagName("td");
    let now_contest_name = "";
    
    for(let i=0; i<tds.length; i++){
        if(!tds[i].hasAttribute("tabindex")){
            continue;
        }

        if(typeof tds[i].getElementsByTagName("a")[0] === "undefined"){
            // 問題が存在しないとき、チェックボックスは入れない
            continue;
        }

        const tabindex = parseInt(tds[i].getAttribute("tabindex"));
        if(tabindex%col_num === 1){
            // contest の列なので、チェックボックスは入れない
            now_contest_name = tds[i].getElementsByTagName("a")[0].innerText.toLowerCase();
            continue;
        }

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = false;
        checkbox.addEventListener("click", click_chkbox_sla);
        if(col_num === consts.ABC_COL_NUM){
            // ABCのとき
            if(tabindex%col_num === 2){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"a"); }
            else if(tabindex%col_num === 3){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"b"); }
            else if(tabindex%col_num === 4){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"c"); }
            else if(tabindex%col_num === 5){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"d"); }
            else if(tabindex%col_num === 6){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"e"); }
            else if(tabindex%col_num === 0){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"f"); }
            tds[i].insertBefore(checkbox, tds[i].firstChild);
            continue;
        }
        else if(col_num === consts.ARC_COL_NUM){
            // ARCのとき
            if(tabindex%col_num === 2){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"a"); }
            else if(tabindex%col_num === 3){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"b"); }
            else if(tabindex%col_num === 4){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"c"); }
            else if(tabindex%col_num === 0){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"d"); }
            tds[i].insertBefore(checkbox, tds[i].firstChild);
            continue;
        }
        else if(col_num === consts.AGC_COL_NUM){
            // AGCのとき
            if(tabindex%col_num === 2){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"a"); }
            else if(tabindex%col_num === 3){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"b"); }
            else if(tabindex%col_num === 4){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"c"); }
            else if(tabindex%col_num === 5){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"d"); }
            else if(tabindex%col_num === 6){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"e"); }
            else if(tabindex%col_num === 7){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"f"); }
            else if(tabindex%col_num === 0){ checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+now_contest_name+"_"+"f2"); }
            tds[i].insertBefore(checkbox, tds[i].firstChild);
            continue;
        }
    }
}
//[END function]

//[START function]
function _append_checkboxes_other_contests(){
    /* Other Contests(企業コン)の各問題にチェックボックス要素を追加する */
    const divs = document.getElementsByClassName("table-responsive");
    for(let i=0; i<divs.length; i++){
        const target_tbody = divs[i].getElementsByTagName("tbody")[0];
        const target_tr = target_tbody.getElementsByTagName("tr")[0];
        const tds = target_tr.getElementsByTagName("td");
        for(let j=0; j<tds.length; j++){
            const a = tds[j].getElementsByTagName("a")[0];
            const href_texts = a.getAttribute("href").split("/");
            const problem_name = href_texts[href_texts.length-1];

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.checked = false;
            checkbox.addEventListener("click", click_chkbox_sla);
            checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_+problem_name);
            tds[j].insertBefore(checkbox, tds[j].firstChild);
        }
    }
}
//[END function]

//[START function]
export function make_checkboxes(){
    /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成する */
    const h2s = document.getElementsByTagName("h2");
    for(let i = 0; i < h2s.length; i++){
        if(h2s[i].innerText == "AtCoder Beginner Contest"){
            _append_checkboxes(h2s[i], consts.ABC_COL_NUM);
        }
        else if(h2s[i].innerText == "AtCoder Regular Contest"){
            _append_checkboxes(h2s[i], consts.ARC_COL_NUM);
        }
        else if(h2s[i].innerText == "AtCoder Grand Contest"){
            _append_checkboxes(h2s[i], consts.AGC_COL_NUM);
        }
    }
    _append_checkboxes_other_contests();
}
//[END function]

//[START function]
export function make_base_html(){
    /* Solve Later Again セクションの基本的なHTMLを作成する */
    const html = document.createElement("div");
    html.setAttribute("id", consts.ID_SLA_ROOT);
    html.classList.add("row");
    
    const h2 = document.createElement("h2");
    h2.textContent = "Solve Later Again";
    html.appendChild(h2);
    
    const div_react_bs_table_container = document.createElement("div");
    div_react_bs_table_container.classList.add("react-bs-table-container");
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
    th_buttons.colSpan = "2";
    tr_thead.appendChild(th_buttons);

    const tbody = document.createElement("tbody");
    table_container_body.appendChild(tbody);

    return html;
}
//[END function]

//[START function]
export function make_new_tr_sla(problem_name, a_tag){
    // SLAテーブルの新しいtr要素を作成する
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
    const root_div = document.getElementById(consts.ID_SLA_ROOT);
    const tbody = root_div.getElementsByTagName("tbody")[0];
    tbody.appendChild(tr);

    initialize_problem_status(problem_name);
}
//[END function]

//[START function]
export function initialize_problem_status(problem_name){
    /* SLAテーブルの指定の問題の状態を初期化する */
    const target_tr = document.getElementById(consts.ID_TR_SLA_+problem_name);
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
//[END function]

//[START function]
function strdate2date(dt_str){
    /* 文字列の日付をDate型に変換して返す 
    (例) dt_str = "2019/6/27(Thu)"
    */
    dt_str = dt_str.split('(')[0];
    const dts = dt_str.split('/');
    let dt = new Date;
    dt.setFullYear(Number(dts[0]));
    dt.setMonth(Number(dts[1])-1);
    dt.setDate(Number(dts[2]));
    return dt;
}
//[END function]

//[START function]
export function hilight_problems(){
    /* 規定の日数を経過したSLAテーブルの問題をハイライトする */
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    
    // SLAテーブルの各問題を走査する
    const root_div = document.getElementById(consts.ID_SLA_ROOT);
    const tbody = root_div.getElementsByTagName("tbody")[0];
    const trs = tbody.getElementsByTagName("tr");
    for(let i=0; i<trs.length; i++){
        const problem_name = trs[i].getAttribute("id").slice(consts.ID_TR_SLA_.length);
        const tds = trs[i].getElementsByTagName("td");
        // Solved 1をチェックする
        const chkbox = document.getElementById(consts.ID_CHKBOX_SOLVED1_SLA_+problem_name);
        if(chkbox !== null && chkbox.disabled === false){
            // Soved1をまだチェックしていないので、何もしない
            continue;
        }

        const hilight_if_needed = (solved_num, need_msec) => {
            /* SLAテーブルの問題を、日数が経過していればハイライトする */
            const chkbox = document.getElementById("chkbox_solved"+String(solved_num)+"_sla_"+problem_name);
            if(chkbox !== null && chkbox.disabled === false){
                // このSovedをまだチェックしていないので、前のSolvedの日付と比較する
                const dt_str = document.getElementById("date_solved"+String(solved_num-1)+"_sla_"+problem_name).innerText;
                const dt = strdate2date(dt_str);
                //const dt = strdate2date("2019/6/1(Hoge)");  // テスト用
                if(today-dt >= need_msec){
                    // 経過しているのでハイライト
                    const target_tr = document.getElementById(consts.ID_TR_SLA_+problem_name);
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
//[END function]

//[START function]
export function unhilight_problem(problem_name, solved_num){
    /* SLAテーブルの指定の問題のハイライトを解除する */
    const target_tr = document.getElementById(consts.ID_TR_SLA_+problem_name);
    target_tr.style.backgroundColor = "";

    const tds = target_tr.getElementsByTagName("td");
    tds[solved_num].style.backgroundColor = "";
}
//[END function]
