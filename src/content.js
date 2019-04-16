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
        const root_div = document.getElementById('root');

        const target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        const insert_html = make_base_html();
        target_div.insertBefore(insert_html, target_div.firstChild);

        make_checkboxes();
    });

    function make_base_html(){
        /* Solve Later Again セクションの基本的なHTMLを作成する */
        const html = document.createElement("div");
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
        /* 各問題に、「あとで解く」に追加する用のチェックボックスを作成する */

    }

})();

