'use strict';

const dom_ope = require("./dom_operations");
const consts = require("./consts");
const clickjs = require("./click");
const utils = require("./utils");

import "./scss/sla.scss";


/**
 * ページ読み込み時の処理
 */
export const run_solve_later_again = async () => {
    if(document.getElementById(consts.ID_SLA_ROOT) !== null){ return false; }
    const root_div = document.getElementById('root');

    const target_div = root_div!.firstElementChild!.getElementsByClassName("container")[0].firstElementChild!;
    const insert_html = dom_ope.make_base_html();
    target_div.insertBefore(insert_html, target_div.firstChild);

    await dom_ope.make_sla_table();
    await dom_ope.make_checkboxes();
    await clickjs.check_checkboxes();
    await dom_ope.hilight_problems();
    await dom_ope.make_table_tab_tag();
}
