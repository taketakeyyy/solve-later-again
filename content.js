(function(){
    // 即時関数で囲む
    'use strict';
    //alert("Hello Kenkoooo!");

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
        var root_div = document.getElementById('root');

        var target_div= root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
        console.log(target_div);
        var insert_html = make_base_html();
        target_div.insertBefore(insert_html, target_div.firstChild);
    });

    function make_base_html(){
        /* Aolve Later Again セクションの基本的なHTMLを作成する */
        var html = document.createElement("div");
        html.classList.add("row");
        
        var h2 = document.createElement("h2");
        h2.textContent = "Solve Later Again";
        html.appendChild(h2);
        
        var div_react_bs_table_container = document.createElement("div");
        div_react_bs_table_container.classList.add("react-bs-table-container");
        html.appendChild(div_react_bs_table_container);

        var div_react_bs_table = document.createElement("div");
        div_react_bs_table.classList.add("react-bs-table");
        div_react_bs_table.classList.add("react-bs-table-bordered");
        div_react_bs_table_container.appendChild(div_react_bs_table);

        var div_s_alert_wrapper = document.createElement("div");
        div_s_alert_wrapper.classList.add("s-alert-wrapper");
        div_react_bs_table_container.appendChild(div_s_alert_wrapper);

        var div_react_bs_container_header = document.createElement("div");
        div_react_bs_container_header.classList.add("react-bs-container-header");
        div_react_bs_container_header.classList.add("table-header-wrapper");
        div_react_bs_table.appendChild(div_react_bs_container_header);

        var div_react_bs_container_body = document.createElement("div");
        div_react_bs_container_body.classList.add("react-bs-container-body");
        div_react_bs_table.appendChild(div_react_bs_container_body);

        var table_container_header = document.createElement("table");
        table_container_header.classList.add("table");
        table_container_header.classList.add("table-hover");
        table_container_header.classList.add("table-bordered");
        div_react_bs_container_header.appendChild(table_container_header);

        var table_container_body = document.createElement("table");
        table_container_body.classList.add("table");
        table_container_body.classList.add("table-bordered");
        div_react_bs_container_body.appendChild(table_container_body);
        
        var colgroup_container_header = document.createElement("colgroup");
        table_container_header.appendChild(colgroup_container_header);

        var colgroup_container_body = document.createElement("colgroup");
        table_container_body.appendChild(colgroup_container_body);

        var col_header1 = document.createElement("col");
        var col_header2 = document.createElement("col");
        colgroup_container_header.appendChild(col_header1);
        colgroup_container_header.appendChild(col_header2);

        var col_body1 = document.createElement("col");
        var col_body2 = document.createElement("col");
        colgroup_container_body.appendChild(col_body1);
        colgroup_container_body.appendChild(col_body2);

        var thead = document.createElement("thead");
        table_container_header.appendChild(thead);

        var tr_thead = document.createElement("tr");
        thead.appendChild(tr_thead);

        var th_problem = document.createElement("th");
        th_problem.textContent = "Problem";
        tr_thead.appendChild(th_problem);

        var th_solved1 = document.createElement("th");
        th_solved1.textContent = "Solved 1";
        tr_thead.appendChild(th_solved1);

        var th_solved2 = document.createElement("th");
        th_solved2.textContent = "Solved 2 (7 Days Later)";
        tr_thead.appendChild(th_solved2);

        var th_solved3 = document.createElement("th");
        th_solved3.textContent = "Solved 3 (30 Days Later)";
        tr_thead.appendChild(th_solved3);

        var th_delete = document.createElement("th");
        th_delete.textContent = "Delete";
        tr_thead.appendChild(th_delete);

        var tbody = document.createElement("tbody");
        table_container_body.appendChild(tbody);


        return html;
    }

})();

