(function(){
    // スコープの汚染を防ぐため、即時関数で囲む
    'use strict';

    // Content Scriptからchrome.runtime.sendMessage()を使ってメッセージを投げる
    // 第一引数にはメッセージのキーと値を指定する
    // 第二引数はうまくいったときのコールバック関数
    /*
    chrome.runtime.sendMessage(
        {},
        function(response){
            console.log(response);
            console.log("message sent!");
        }    
    );
    */

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        if(document.getElementById("sla_root") !== null){ return false; }

        const root_div = document.getElementById('root');

        const target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        const insert_html = make_base_html();
        target_div.insertBefore(insert_html, target_div.firstChild);

        // ここのmake_checkboxes()が正常に成功したあと、その下のload_storage()を実行してほしいので、
        // Promiseで書きなおそう。
        make_checkboxes();

        // 保存データを取得して、状態を反映させる
        load_storage();
    });

    function make_base_html(){
        /* Solve Later Again セクションの基本的なHTMLを作成する */
        const html = document.createElement("div");
        html.setAttribute("id", "sla_root");
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
        th_solved2.textContent = "Solved 2 (7 Days Later)";
        tr_thead.appendChild(th_solved2);

        const th_solved3 = document.createElement("th");
        th_solved3.textContent = "Solved 3 (30 Days Later)";
        tr_thead.appendChild(th_solved3);

        const th_delete = document.createElement("th");
        th_delete.textContent = "Delete";
        tr_thead.appendChild(th_delete);

        const tbody = document.createElement("tbody");
        table_container_body.appendChild(tbody);


        return html;
    }


    function make_checkboxes(){
        /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成する */
        const h2s = document.getElementsByTagName("h2");
        for(let i = 0; i < h2s.length; i++){
            if(h2s[i].innerText == "AtCoder Beginner Contest"){
                append_checkboxes(h2s[i], 7, 0);
            }
            else if(h2s[i].innerText == "AtCoder Regular Contest"){
                append_checkboxes(h2s[i], 5, 0);
            }
            else if(h2s[i].innerText == "AtCoder Grand Contest"){
                append_checkboxes(h2s[i], 8, 0);
            }
        }
    }


    function append_checkboxes(elem_h2, row_num, try_count){
        /* ABC, ARC, AGCの各問題にチェックボックス要素を追加する
        Args:
            elem_h2: テーブルのh2要素
            row_num(int): テーブルの列数
        */
        const WAIT_TIME = 500
        const TRY_LIMIT = 20
        if(try_count >= TRY_LIMIT){ return false; }

        const root_div = elem_h2.parentNode;
        const tbody = root_div.getElementsByTagName("tbody")[0];
        const tds = tbody.getElementsByTagName("td");
        let now_contest_name = "";

        if(tds.length === 1){
            // DOMが構成されていないときに実行されることがある場合、非同期処理で少し待って、再度実行させる
            // Promiseで書きなおそう。
            setTimeout(() => {
                append_checkboxes(elem_h2, row_num, try_count+1);                
            }, WAIT_TIME);
            return false;
        }
        
        for(let i=0; i<tds.length; i++){
            if(!tds[i].hasAttribute("tabindex")){
                continue;
            }
            
            if(typeof tds[i].getElementsByTagName("a")[0] === "undefined"){
                // 問題が存在しないとき、チェックボックスは入れない
                continue;
            }

            const tabindex = parseInt(tds[i].getAttribute("tabindex"));
            if(tabindex%row_num === 1){
                // contest の列なので、チェックボックスは入れない
                now_contest_name = tds[i].getElementsByTagName("a")[0].innerText.toLowerCase();
                continue;
            }

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.checked = false;
            checkbox.addEventListener("click", click_chkbox_sla);
            if(row_num === 7){
                // ABCのとき
                if(tabindex%row_num === 2){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"a"); }
                else if(tabindex%row_num === 3){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"b"); }
                else if(tabindex%row_num === 4){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"c"); }
                else if(tabindex%row_num === 5){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"d"); }
                else if(tabindex%row_num === 6){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"e"); }
                else if(tabindex%row_num === 0){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"f"); }
                tds[i].insertBefore(checkbox, tds[i].firstChild);
                continue;
            }
            else if(row_num === 5){
                // ARCのとき
                if(tabindex%row_num === 2){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"a"); }
                else if(tabindex%row_num === 3){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"b"); }
                else if(tabindex%row_num === 4){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"c"); }
                else if(tabindex%row_num === 0){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"d"); }
                tds[i].insertBefore(checkbox, tds[i].firstChild);
                continue;
            }
            else if(row_num === 8){
                // AGCのとき
                if(tabindex%row_num === 2){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"a"); }
                else if(tabindex%row_num === 3){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"b"); }
                else if(tabindex%row_num === 4){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"c"); }
                else if(tabindex%row_num === 5){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"d"); }
                else if(tabindex%row_num === 6){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"e"); }
                else if(tabindex%row_num === 7){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"f"); }
                else if(tabindex%row_num === 0){ checkbox.setAttribute("id", "chkbox_sla_"+now_contest_name+"_"+"f2"); }
                tds[i].insertBefore(checkbox, tds[i].firstChild);
                continue;
            }
        }
    }

    function make_new_tr_sla(base_id, a_tag){
        // SLAテーブルの新しいtr要素を作成する
        const tr = document.createElement("tr");
        // idを、"tr_sla_[contest_name]_[problem]" にする
        tr.setAttribute("id", "tr_"+base_id);

        const td1 = document.createElement("td");
        td1.appendChild(a_tag);

        const td2 = document.createElement("td");
        const checkbox2 = document.createElement("input");
        checkbox2.setAttribute("type", "checkbox");
        checkbox2.setAttribute("id", "chkbox_solved1_"+base_id);
        checkbox2.addEventListener("click", click_chkbox_solved_sla);
        checkbox2.checked = false;
        checkbox2.disabled = false;
        td2.appendChild(checkbox2);

        const td3 = document.createElement("td");
        const checkbox3 = document.createElement("input");
        checkbox3.setAttribute("type", "checkbox");
        checkbox3.setAttribute("id", "chkbox_solved2_"+base_id);
        checkbox3.addEventListener("click", click_chkbox_solved_sla);
        checkbox3.checked = false;
        checkbox3.disabled = true;
        td3.appendChild(checkbox3);

        const td4 = document.createElement("td");
        const checkbox4 = document.createElement("input");
        checkbox4.setAttribute("type", "checkbox");
        checkbox4.setAttribute("id", "chkbox_solved3_"+base_id);
        checkbox4.addEventListener("click", click_chkbox_solved_sla);
        checkbox4.checked = false;
        checkbox4.disabled = true;
        td4.appendChild(checkbox4);

        const td5 = document.createElement("td");
        td5.classList.add("td-sla-delete");
        const button_del = document.createElement("input");
        button_del.setAttribute("type", "button");
        button_del.setAttribute("value", "Delete");
        button_del.setAttribute("id", "del_btn_"+base_id);
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
        const sla_root = document.getElementById("sla_root");
        const tbody = sla_root.getElementsByTagName("tbody")[0];
        tbody.appendChild(tr);
    }

    function click_chkbox_sla(e){
        /* 問題のチェックボックスがクリックされたときの処理
        Args:
            e(event): クリックされたチェックボックスのイベント
        */

        // checkboxのidは、"chkbox_sla_[contest_name]_[promlem]"
        const base_id = e.target.getAttribute("id").slice(7);

        if(e.target.checked){
            // Solve Later Againテーブルにこの問題を追加する
            const a_tag = e.target.parentNode.getElementsByTagName("a")[0].a_elem.cloneNode(true);
            make_new_tr_sla(base_id, a_tag);
        }
        else{
            // Solve Later Againテーブルからこの問題を削除する
            const elem_del = document.getElementById("tr_"+base_id);
            elem_del.parentNode.removeChild(elem_del);
        }

        // 現在のテーブル状態を保存する
        save_solve_later_again(base_id);
    }

    function click_del_btn_sla(e){
        /* Deleteボタンをクリックしたときの処理 

        * Solve Later Againのテーブルからこの問題を削除する
        * この問題のチェックボックスのチェックを外す

        Args:
            e(event): クリックされたボタンのイベント
        */
    
        // Deleteボタンのidは、"del_btn_sla_project_problem"
        const base_id = e.target.getAttribute("id").slice(8);

        // Solve Later Againのテーブルからこの問題を削除する
        const del_tr = document.getElementById("tr_"+base_id);
        del_tr.parentNode.removeChild(del_tr);

        // この問題のチェックボックスのチェックを外す
        const chkbox = document.getElementById("chkbox_"+base_id);
        chkbox.checked = false;

        // 現在のテーブル状態を保存する
        save_solve_later_again(base_id);
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
        const base_id = e.target.getAttribute("id").slice(15);
        const solved_num = parseInt(e.target.getAttribute("id")[13], 10);

        const func = (solved_num) => {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const day = now.getDate();
            const wday = now.getDay();
            const wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            const td = e.target.parentNode;
            td.innerText = "";
            const div = document.createElement("div");
            div.setAttribute("id", "date_solved" + String(solved_num) + "_" + base_id);
            div.innerText = year + "/" + (month+1) + "/" + day + "(" + wdays[wday] + ")";
            td.appendChild(div);

            if(solved_num < 3){
                const chkbox_solved_next = document.getElementById("chkbox_solved"+(solved_num+1)+"_"+base_id);
                chkbox_solved_next.disabled = false;
            }
        }

        func(solved_num);

        // 現在のテーブル状態を保存する
        save_solve_later_again(base_id);
    }

    
    function save_solve_later_again(base_id){
        /*
        Solved Later Again(SLA)テーブルの状態を保存する

        Args:
            base_id(str): 保存したい要素のbase_id

        Notes:
            保存形式は、以下のような感じ。
              - チェックボックスのとき、null
              - 日付が入ってる場合、それをstr型で保存
            例
            {base_id: {"solved1": "2019/4/21(Sun)"}, {"solved2": null}, {"solved3": null}}

        Refs:
            https://dackdive.hateblo.jp/entry/2017/07/27/100000
            https://github.com/taketakeyyy/my-practice/blob/master/dotinstall/MyExtensions/04_OptionsUI/options.js
        */
        if(document.getElementById("tr_"+base_id) === null){
            // SLAテーブルに要素が存在しないなら、データを削除する
            chrome.storage.sync.remove(base_id);
            return true;
        }

        // SLAテーブルに要素が存在するなら、現在の状態を保存する
        let saving_data = {};
        saving_data[base_id] = {};
        for(let i=1; i<=3; i++){
            const chkbox = document.getElementById("chkbox_solved"+String(i)+"_"+base_id);
            if(chkbox === null){
                const div = document.getElementById("date_solved"+String(i)+"_"+base_id);
                saving_data[base_id]["solved"+String(i)] = div.innerText;
                continue;
            }
            saving_data[base_id]["solved"+String(i)] = null;
        }

        chrome.storage.sync.set(saving_data);
    }


    function load_storage(){
        chrome.stor
        /age.sync.get(null, function(loaded_data){
            for(let base_id in loaded_data){
                // SLAテーブルにtr要素を作成する
                const target_chkbox = document.getElementById("chkbox_"+base_id);
                const a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
                make_new_tr_sla(base_id, a_tag);

                // tr要素のSolved列が年月日の場合はそれに変更する
                for(let i=1; i<=3; i++){
                    const solved_date = loaded_data[base_id]["solved"+String(i)];
                    if(solved_date === null){ continue; }
                    const parent_td = document.getElementById("chkbox_solved"+String(i)+"_"+base_id).parentNode;
                    parent_td.innerText = "";
                    const div = document.createElement("div");
                    div.setAttribute("id", "date_solved"+String(i)+"_"+base_id);
                    div.innerText = solved_date;
                    parent_td.appendChild(div);
                }
            }
        });
    }
})();

