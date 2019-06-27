(function(){
    // スコープの汚染を防ぐため、即時関数で囲む
    'use strict';

    const SOLVED_MAX = 3;  // Solved3 まで

    const CAN_MAKE_CHKBOX_WAIT_MSEC = 1000;  // ページのDOMが構成されるのを待つミリ秒
    const CAN_MAKE_CHKBOX_RETRY_COUNT = 60;  // ページのDOMが構成されるのを待つリトライ回数

    const ABC_COL_NUM = 7;  // ABCの列数
    const ARC_COL_NUM = 5;  // ARCの列数
    const AGC_COL_NUM = 8;  // AGCの列数

    const ID_SLA_ROOT = "sla_root"  // Solve Later Again(SLA)テーブルのdivのid
    const ID_TR_SLA_ = "tr_sla_"  // SLAテーブルのtr要素のidのprefix (tr_sla_abc131_a)
    const ID_CHKBOX_SOLVED1_SLA_ = "chkbox_solved1_sla_"  // SLAテーブルのSolved1列のチェックボックスのIDのprefix (chkbox_solved1_sla_abc131_a)
    const ID_CHKBOX_SOLVED2_SLA_ = "chkbox_solved2_sla_"  // SLAテーブルのSolved2列のチェックボックスのIDのprefix (chkbox_solved2_sla_abc131_a)
    const ID_CHKBOX_SOLVED3_SLA_ = "chkbox_solved3_sla_"  // SLAテーブルのSolved3列のチェックボックスのIDのprefix (chkbox_solved3_sla_abc131_a)
    const ID_DEL_BTN_SLA_ = "del_btn_sla_"  // SLAテーブルのDeleteボタンのIDのprefix (del_btn_sla_abc131_a)
    const ID_DATE_SOLVED1_SLA_ = "date_solved1_sla_"  // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved1_sla_abc131_a)
    const ID_DATE_SOLVED2_SLA_ = "date_solved2_sla_"  // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved2_sla_abc131_a)
    const ID_DATE_SOLVED3_SLA_ = "date_solved3_sla_"  // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved3_sla_abc131_a)

    const ID_CHKBOX_SLA_ = "chkbox_sla_"  // 各問題のチェックボックスのIDのprefix (chkbox_sla_abc131_a)

    const SOLVED2_DAYS = 7;   // Solved2 はX日後に解き直す
    const SOLVED3_DAYS = 30;  // Solved3 はX日後に解き直す

    const WDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const HILIGHT_CLR_TR = "#f5b88791";
    const HILIGHT_CLR_TD = "#f7964891";


    function on_fullfilled_can_make_checkboxes(){
        // make_checkboxes()が正常に成功した or リトライ回数を超えたら、しょうがないので諦めてそのまま次の処理へ。
        // 各ABC, ARC, AGC等の問題にチェックボックスをつける
        make_checkboxes();

        // 保存データを取得して、状態を反映させる
        async_load_storage().then(hilight_problems);
    }

    function on_rejected_can_make_checkboxes(try_count){
        // make_checkboxes()に失敗したときの処理
        setTimeout(function () {
            async_can_make_checkboxes(try_count).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
        }, CAN_MAKE_CHKBOX_WAIT_MSEC);
    }

    function async_can_make_checkboxes(try_count) {
        /* ページのDOMが構築されるまで処理を待つ */
        return new Promise(function (resolve, reject) {
            const is_success = can_make_checkboxes();
            if(is_success || try_count === 0){
                resolve();
                return;
            }
            reject(--try_count);
            return;
        });
    }

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        if(document.getElementById(ID_SLA_ROOT) !== null){ return false; }

        const root_div = document.getElementById('root');

        const target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        const insert_html = make_base_html();
        target_div.insertBefore(insert_html, target_div.firstChild);

        async_can_make_checkboxes(CAN_MAKE_CHKBOX_RETRY_COUNT).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
    });

    function make_base_html(){
        /* Solve Later Again セクションの基本的なHTMLを作成する */
        const html = document.createElement("div");
        html.setAttribute("id", ID_SLA_ROOT);
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
        th_solved2.textContent = "Solved 2 ("+String(SOLVED2_DAYS)+" Days Later)";
        tr_thead.appendChild(th_solved2);

        const th_solved3 = document.createElement("th");
        th_solved3.textContent = "Solved 3 ("+String(SOLVED3_DAYS)+" Days Later)";
        tr_thead.appendChild(th_solved3);

        const th_delete = document.createElement("th");
        th_delete.textContent = "Delete";
        tr_thead.appendChild(th_delete);

        const tbody = document.createElement("tbody");
        table_container_body.appendChild(tbody);


        return html;
    }


    function can_make_checkboxes(){
        /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成するための準備ができているか？
        DOMが構成されているかのチェックをする
        */
        const h2s = document.getElementsByTagName("h2");
        let is_success = true;
        for(let i = 0; i < h2s.length; i++){
            if(h2s[i].innerText == "AtCoder Beginner Contest"){
                is_success &= exist_doms(h2s[i]);
            }
            else if(h2s[i].innerText == "AtCoder Regular Contest"){
                is_success &= exist_doms(h2s[i]);
            }
            else if(h2s[i].innerText == "AtCoder Grand Contest"){
                is_success &= exist_doms(h2s[i]);
            }
        }
        if(!is_success){ return false; }
        return true;
    }

    function exist_doms(elem_h2){
        /* ABC, ARC, AGCの各問題のDOMが構築されているかをチェックする
        Args:
            elem_h2: テーブルのh2要素
        */
       const root_div = elem_h2.parentNode;
       const tbody = root_div.getElementsByTagName("tbody")[0];
       const tds = tbody.getElementsByTagName("td");

       if(tds.length === 1){
           // DOMがまだ構成されていない場合
           return false;
       }
       return true;
    }

    function make_checkboxes(){
        /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成する */
        const h2s = document.getElementsByTagName("h2");
        for(let i = 0; i < h2s.length; i++){
            if(h2s[i].innerText == "AtCoder Beginner Contest"){
                append_checkboxes(h2s[i], ABC_COL_NUM);
            }
            else if(h2s[i].innerText == "AtCoder Regular Contest"){
                append_checkboxes(h2s[i], ARC_COL_NUM);
            }
            else if(h2s[i].innerText == "AtCoder Grand Contest"){
                append_checkboxes(h2s[i], AGC_COL_NUM);
            }
        }
    }

    function append_checkboxes(elem_h2, col_num){
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
            if(col_num === ABC_COL_NUM){
                // ABCのとき
                if(tabindex%col_num === 2){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"a"); }
                else if(tabindex%col_num === 3){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"b"); }
                else if(tabindex%col_num === 4){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"c"); }
                else if(tabindex%col_num === 5){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"d"); }
                else if(tabindex%col_num === 6){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"e"); }
                else if(tabindex%col_num === 0){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"f"); }
                tds[i].insertBefore(checkbox, tds[i].firstChild);
                continue;
            }
            else if(col_num === ARC_COL_NUM){
                // ARCのとき
                if(tabindex%col_num === 2){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"a"); }
                else if(tabindex%col_num === 3){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"b"); }
                else if(tabindex%col_num === 4){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"c"); }
                else if(tabindex%col_num === 0){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"d"); }
                tds[i].insertBefore(checkbox, tds[i].firstChild);
                continue;
            }
            else if(col_num === AGC_COL_NUM){
                // AGCのとき
                if(tabindex%col_num === 2){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"a"); }
                else if(tabindex%col_num === 3){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"b"); }
                else if(tabindex%col_num === 4){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"c"); }
                else if(tabindex%col_num === 5){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"d"); }
                else if(tabindex%col_num === 6){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"e"); }
                else if(tabindex%col_num === 7){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"f"); }
                else if(tabindex%col_num === 0){ checkbox.setAttribute("id", ID_CHKBOX_SLA_+now_contest_name+"_"+"f2"); }
                tds[i].insertBefore(checkbox, tds[i].firstChild);
                continue;
            }
        }
    }

    function make_new_tr_sla(problem_name, a_tag){
        // SLAテーブルの新しいtr要素を作成する
        const tr = document.createElement("tr");
        tr.setAttribute("id", ID_TR_SLA_+problem_name);

        const td1 = document.createElement("td");
        td1.appendChild(a_tag);

        const td2 = document.createElement("td");
        const checkbox2 = document.createElement("input");
        checkbox2.setAttribute("type", "checkbox");
        checkbox2.setAttribute("id", ID_CHKBOX_SOLVED1_SLA_+problem_name);
        checkbox2.addEventListener("click", click_chkbox_solved_sla);
        checkbox2.checked = false;
        checkbox2.disabled = false;
        td2.appendChild(checkbox2);

        const td3 = document.createElement("td");
        const checkbox3 = document.createElement("input");
        checkbox3.setAttribute("type", "checkbox");
        checkbox3.setAttribute("id", ID_CHKBOX_SOLVED2_SLA_+problem_name);
        checkbox3.addEventListener("click", click_chkbox_solved_sla);
        checkbox3.checked = false;
        checkbox3.disabled = true;
        td3.appendChild(checkbox3);

        const td4 = document.createElement("td");
        const checkbox4 = document.createElement("input");
        checkbox4.setAttribute("type", "checkbox");
        checkbox4.setAttribute("id", ID_CHKBOX_SOLVED3_SLA_+problem_name);
        checkbox4.addEventListener("click", click_chkbox_solved_sla);
        checkbox4.checked = false;
        checkbox4.disabled = true;
        td4.appendChild(checkbox4);

        const td5 = document.createElement("td");
        td5.classList.add("td-sla-delete");
        const button_del = document.createElement("input");
        button_del.setAttribute("type", "button");
        button_del.setAttribute("value", "Delete");
        button_del.setAttribute("id", ID_DEL_BTN_SLA_+problem_name);
        button_del.classList.add("btn");
        button_del.classList.add("btn-secondary");
        button_del.classList.add("btn-sla-delete");
        button_del.addEventListener("click", click_del_btn_sla);
        td5.appendChild(button_del);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        // Solve Later Againのtbodyに、tr要素を追加する
        const root_div = document.getElementById(ID_SLA_ROOT);
        const tbody = root_div.getElementsByTagName("tbody")[0];
        tbody.appendChild(tr);
    }

    function click_chkbox_sla(e){
        /* 問題のチェックボックスがクリックされたときの処理
        Args:
            e(event): クリックされたチェックボックスのイベント
        */

        const problem_name = e.target.getAttribute("id").slice(ID_CHKBOX_SLA_.length);

        if(e.target.checked){
            // SLAテーブルにこの問題を追加する
            const a_tag = e.target.parentNode.getElementsByTagName("a")[0].cloneNode(true);
            make_new_tr_sla(problem_name, a_tag);
        }
        else{
            // SLAテーブルからこの問題を削除する
            const elem_del = document.getElementById(ID_TR_SLA_+problem_name);
            elem_del.parentNode.removeChild(elem_del);
        }

        // 現在のテーブル状態を保存する
        save_solve_later_again(problem_name);
    }

    function click_del_btn_sla(e){
        /* Deleteボタンをクリックしたときの処理 

        * SLAのテーブルからこの問題を削除する
        * この問題のチェックボックスのチェックを外す

        Args:
            e(event): クリックされたボタンのイベント
        */
    
        const problem_name = e.target.getAttribute("id").slice(ID_DEL_BTN_SLA_.length);

        // SLAのテーブルからこの問題を削除する
        const del_tr = document.getElementById(ID_TR_SLA_+problem_name);
        del_tr.parentNode.removeChild(del_tr);

        // この問題のチェックボックスのチェックを外す
        const chkbox = document.getElementById(ID_CHKBOX_SLA_+problem_name);
        chkbox.checked = false;

        // 現在のテーブル状態を保存する
        save_solve_later_again(problem_name);
    }


    function click_chkbox_solved_sla(e){
        /* Solved Later Againテーブルの Solved のチェックボックスをクリックしたときの処理
        
        * Solved1のチェックが入ったら、クリックされた年月日をいれて、Solved2をクリック可能にする
        * Solved2のチェックが入ったら、クリックされた年月日をいれて、Solved3をクリック可能にする
        * Solved3のチェックが入ったら、クリックされた年月日をいれる

        Args:
            e(event): クリックされたチェックボックスのイベント
        */

        // このチェックボックスのidは、"chkbox_solved*_sla_project_problem"
        const problem_name = e.target.getAttribute("id").slice(ID_CHKBOX_SOLVED1_SLA_.length);
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
            div.innerText = year + "/" + (month+1) + "/" + day + "(" + WDAYS[wday] + ")";
            td.appendChild(div);

            if(solved_num < SOLVED_MAX){
                const chkbox_solved_next = document.getElementById("chkbox_solved"+(solved_num+1)+"_sla_"+problem_name);
                chkbox_solved_next.disabled = false;
            }
        }

        func(solved_num);

        // 現在のテーブル状態を保存する
        save_solve_later_again(problem_name);
    }

    
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

        if(document.getElementById(ID_TR_SLA_+problem_name) === null){
            // SLAテーブルに要素が存在しないなら、データを削除する
            chrome.storage.sync.remove(sla_id);
            return true;
        }

        // SLAテーブルに要素が存在するなら、現在の状態を保存する
        let saving_data = {};
        saving_data[sla_id] = {};
        for(let i=1; i<=SOLVED_MAX; i++){
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


    function async_load_storage(){
        return new Promise(function (resolve, reject) {
            chrome.storage.sync.get(null, function(loaded_data){
                for(let sla_id in loaded_data){
                    // SLAテーブルにtr要素を作成する
                    const target_chkbox = document.getElementById("chkbox_"+sla_id);
                    const a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
                    make_new_tr_sla(sla_id.slice(4), a_tag);
    
                    // tr要素のSolved列が年月日の場合はそれに変更する
                    for(let i=1; i<=SOLVED_MAX; i++){
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
                    for(let i=1; i<=SOLVED_MAX; i++){
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


    function hilight_problems(){
        /* 7日経過したSLAテーブルの問題をハイライトする */
        const today = new Date();
        today.setFullYear(2020);  // テスト用
        
        // SLAテーブルの各問題を走査する
        const root_div = document.getElementById(ID_SLA_ROOT);
        const tbody = root_div.getElementsByTagName("tbody")[0];
        const trs = tbody.getElementsByTagName("tr");
        for(let i=0; i<trs.length; i++){
            const problem_name = trs[i].getAttribute("id").slice(ID_TR_SLA_.length);
            const tds = trs[i].getElementsByTagName("td");
            // Solved 1をチェックする
            const chkbox = document.getElementById(ID_CHKBOX_SOLVED1_SLA_+problem_name);
            if(chkbox !== null && chkbox.disabled === false){
                // Soved1をまだチェックしていないので、何もしない
                continue;
            }

            const hilight_if_needed = (solved_num, elapse_msec) => {
                /* SLAテーブルの問題を、日数が経過していればハイライトする */
                const chkbox = document.getElementById("chkbox_solved"+String(solved_num)+"_sla_"+problem_name);
                if(chkbox !== null && chkbox.disabled === false){
                    // このSovedをまだチェックしていないので、前のSolvedの日付と比較する
                    const dt_str = document.getElementById("date_solved"+String(solved_num-1)+"_sla_"+problem_name).innerText;
                    const dt = strdate2date(dt_str);
                    if(today-dt >= elapse_msec){
                        // 経過しているのでハイライト
                        const target_tr = document.getElementById(ID_TR_SLA_+problem_name);
                        target_tr.style.backgroundColor = HILIGHT_CLR_TR;
                        tds[solved_num].style.backgroundColor = HILIGHT_CLR_TD;
                            return true;
                    }
                    return false;
                }
            }
                
            // Solved 2をチェックする
            let result = hilight_if_needed(2, 60*60*24*SOLVED2_DAYS*1000);
            if(result){ continue; }

            // Solved 3をチェックする
            result = hilight_if_needed(3, 60*60*24*SOLVED3_DAYS*1000);
            if(result){ continue; }
        }
    }

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

})();

