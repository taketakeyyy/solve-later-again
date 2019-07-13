'use strict';

export const SOLVED_MAX = 3;  // Solved3 まで

export const ABC_COL_NUM = 7;  // ABCの列数
export const ARC_COL_NUM = 5;  // ARCの列数
export const AGC_COL_NUM = 8;  // AGCの列数

export const ID_SLA_ROOT = "sla_root"  // Solve Later Again(SLA)テーブルのdivのid
export const ID_TR_SLA_ = "tr_sla_"  // SLAテーブルのtr要素のidのprefix (tr_sla_abc131_a)
export const ID_CHKBOX_SOLVED1_SLA_ = "chkbox_solved1_sla_"  // SLAテーブルのSolved1列のチェックボックスのIDのprefix (chkbox_solved1_sla_abc131_a)
export const ID_CHKBOX_SOLVED2_SLA_ = "chkbox_solved2_sla_"  // SLAテーブルのSolved2列のチェックボックスのIDのprefix (chkbox_solved2_sla_abc131_a)
export const ID_CHKBOX_SOLVED3_SLA_ = "chkbox_solved3_sla_"  // SLAテーブルのSolved3列のチェックボックスのIDのprefix (chkbox_solved3_sla_abc131_a)
export const ID_DEL_BTN_SLA_ = "del_btn_sla_"  // SLAテーブルのDeleteボタンのIDのprefix (del_btn_sla_abc131_a)
export const ID_AGAIN_BTN_SLA_ = "again_btn_sla_"  // SLAテーブルのAgainボタンのIDのprefix (again_btn_sla_abc131_a)
export const ID_DATE_SOLVED1_SLA_ = "date_solved1_sla_"  // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved1_sla_abc131_a)
export const ID_DATE_SOLVED2_SLA_ = "date_solved2_sla_"  // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved2_sla_abc131_a)
export const ID_DATE_SOLVED3_SLA_ = "date_solved3_sla_"  // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved3_sla_abc131_a)

export const ID_CHKBOX_SLA_ = "chkbox_sla_"  // 各問題のチェックボックスのIDのprefix (chkbox_sla_abc131_a)

export const SOLVED2_DAYS = 0;   // Solved2 はX日後に解き直す
export const SOLVED3_DAYS = 3;  // Solved3 はX日後に解き直す

export const WDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const HILIGHT_CLR_TR = "#f5b88791";
export const HILIGHT_CLR_TD = "#f7964891";

export const CAN_MAKE_CHKBOX_WAIT_MSEC = 1000;  // ページのDOMが構成されるのを待つミリ秒
export const CAN_MAKE_CHKBOX_RETRY_COUNT = 60;  // ページのDOMが構成されるのを待つリトライ回数
