/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/click.js":
/*!**********************!*\
  !*** ./src/click.js ***!
  \**********************/
/*! exports provided: click_again_btn_sla, click_del_btn_sla, click_chkbox_sla, click_chkbox_solved_sla */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "click_again_btn_sla", function() { return click_again_btn_sla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "click_del_btn_sla", function() { return click_del_btn_sla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "click_chkbox_sla", function() { return click_chkbox_sla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "click_chkbox_solved_sla", function() { return click_chkbox_solved_sla; });
/* harmony import */ var _dom_operations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_operations.js */ "./src/dom_operations.js");




var consts = __webpack_require__(/*! ./consts.js */ "./src/consts.js"); // [START function]


function click_again_btn_sla(e) {
  /* Againボタンをクリックしたときの処理 
    * SLAのテーブルのこの問題を初期状態に戻す
    Args:
      e(event): クリックされたボタンのイベント
  */
  var problem_name = e.target.getAttribute("id").slice(consts.ID_AGAIN_BTN_SLA_.length);
  Object(_dom_operations_js__WEBPACK_IMPORTED_MODULE_0__["initialize_problem_status"])(problem_name);

  for (var i = 1; i < consts.SOLVED_MAX + 1; i++) {
    Object(_dom_operations_js__WEBPACK_IMPORTED_MODULE_0__["unhilight_problem"])(problem_name, i);
  }

  save_solve_later_again(problem_name);
} // [END function]
// [START function]

function click_del_btn_sla(e) {
  /* Deleteボタンをクリックしたときの処理 
    * SLAのテーブルからこの問題を削除する
  * この問題のチェックボックスのチェックを外す
    Args:
      e(event): クリックされたボタンのイベント
  */
  var problem_name = e.target.getAttribute("id").slice(consts.ID_DEL_BTN_SLA_.length); // SLAのテーブルからこの問題を削除する

  var del_tr = document.getElementById(consts.ID_TR_SLA_ + problem_name);
  del_tr.parentNode.removeChild(del_tr); // この問題のチェックボックスのチェックを外す

  var chkbox = document.getElementById(consts.ID_CHKBOX_SLA_ + problem_name);
  chkbox.checked = false; // 現在のテーブル状態を保存する

  save_solve_later_again(problem_name);
} // [END function]
// [START function]

function click_chkbox_sla(e) {
  /* 問題のチェックボックスがクリックされたときの処理
  Args:
      e(event): クリックされたチェックボックスのイベント
  */
  var problem_name = e.target.getAttribute("id").slice(consts.ID_CHKBOX_SLA_.length);

  if (e.target.checked) {
    // SLAテーブルにこの問題を追加する
    var a_tag = e.target.parentNode.getElementsByTagName("a")[0].cloneNode(true);
    Object(_dom_operations_js__WEBPACK_IMPORTED_MODULE_0__["make_new_tr_sla"])(problem_name, a_tag);
  } else {
    // SLAテーブルからこの問題を削除する
    var elem_del = document.getElementById(consts.ID_TR_SLA_ + problem_name);
    elem_del.parentNode.removeChild(elem_del);
  } // 現在のテーブル状態を保存する


  save_solve_later_again(problem_name);
} // [END function]
// [START function]

function save_solve_later_again(problem_name) {
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
  var sla_id = "sla_" + problem_name;

  if (document.getElementById(consts.ID_TR_SLA_ + problem_name) === null) {
    // SLAテーブルに要素が存在しないなら、データを削除する
    chrome.storage.sync.remove(sla_id);
    return true;
  } // SLAテーブルに要素が存在するなら、現在の状態を保存する


  var saving_data = {};
  saving_data[sla_id] = {};

  for (var i = 1; i <= consts.SOLVED_MAX; i++) {
    var chkbox = document.getElementById("chkbox_solved" + String(i) + "_" + sla_id);

    if (chkbox === null) {
      var div = document.getElementById("date_solved" + String(i) + "_" + sla_id);
      saving_data[sla_id]["solved" + String(i)] = div.innerText;
      continue;
    }

    saving_data[sla_id]["solved" + String(i)] = null;
  }

  chrome.storage.sync.set(saving_data);
} // [END function]
// [START function]


function click_chkbox_solved_sla(e) {
  /* Solved Later Againテーブルの Solved のチェックボックスをクリックしたときの処理
  
  * Solved1のチェックが入ったら、クリックされた年月日をいれて、Solved2をクリック可能にする
  * Solved2のチェックが入ったら、クリックされた年月日をいれて、Solved3をクリック可能にする
  * Solved3のチェックが入ったら、クリックされた年月日をいれる
    Args:
      e(event): クリックされたチェックボックスのイベント
  */
  // このチェックボックスのidは、"chkbox_solved*_sla_project_problem"
  var problem_name = e.target.getAttribute("id").slice(consts.ID_CHKBOX_SOLVED1_SLA_.length);
  var solved_num = parseInt(e.target.getAttribute("id")["chkbox_solved".length], 10);

  var func = function func(solved_num) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var wday = now.getDay();
    var td = e.target.parentNode;
    td.innerText = "";
    var div = document.createElement("div");
    div.setAttribute("id", "date_solved" + String(solved_num) + "_sla_" + problem_name);
    div.innerText = year + "/" + (month + 1) + "/" + day + "(" + consts.WDAYS[wday] + ")";
    td.appendChild(div);

    if (solved_num < consts.SOLVED_MAX) {
      var chkbox_solved_next = document.getElementById("chkbox_solved" + (solved_num + 1) + "_sla_" + problem_name);
      chkbox_solved_next.disabled = false;
    }
  };

  func(solved_num);
  Object(_dom_operations_js__WEBPACK_IMPORTED_MODULE_0__["unhilight_problem"])(problem_name, solved_num); // 現在のテーブル状態を保存する

  save_solve_later_again(problem_name);
} // [END function]

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: SOLVED_MAX, ABC_COL_NUM, ARC_COL_NUM, AGC_COL_NUM, ID_SLA_ROOT, ID_TR_SLA_, ID_CHKBOX_SOLVED1_SLA_, ID_CHKBOX_SOLVED2_SLA_, ID_CHKBOX_SOLVED3_SLA_, ID_DEL_BTN_SLA_, ID_AGAIN_BTN_SLA_, ID_DATE_SOLVED1_SLA_, ID_DATE_SOLVED2_SLA_, ID_DATE_SOLVED3_SLA_, ID_CHKBOX_SLA_, SOLVED2_DAYS, SOLVED3_DAYS, WDAYS, HILIGHT_CLR_TR, HILIGHT_CLR_TD, CAN_MAKE_CHKBOX_WAIT_MSEC, CAN_MAKE_CHKBOX_RETRY_COUNT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOLVED_MAX", function() { return SOLVED_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ABC_COL_NUM", function() { return ABC_COL_NUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARC_COL_NUM", function() { return ARC_COL_NUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AGC_COL_NUM", function() { return AGC_COL_NUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_SLA_ROOT", function() { return ID_SLA_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_TR_SLA_", function() { return ID_TR_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_CHKBOX_SOLVED1_SLA_", function() { return ID_CHKBOX_SOLVED1_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_CHKBOX_SOLVED2_SLA_", function() { return ID_CHKBOX_SOLVED2_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_CHKBOX_SOLVED3_SLA_", function() { return ID_CHKBOX_SOLVED3_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_DEL_BTN_SLA_", function() { return ID_DEL_BTN_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_AGAIN_BTN_SLA_", function() { return ID_AGAIN_BTN_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_DATE_SOLVED1_SLA_", function() { return ID_DATE_SOLVED1_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_DATE_SOLVED2_SLA_", function() { return ID_DATE_SOLVED2_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_DATE_SOLVED3_SLA_", function() { return ID_DATE_SOLVED3_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID_CHKBOX_SLA_", function() { return ID_CHKBOX_SLA_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOLVED2_DAYS", function() { return SOLVED2_DAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOLVED3_DAYS", function() { return SOLVED3_DAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WDAYS", function() { return WDAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HILIGHT_CLR_TR", function() { return HILIGHT_CLR_TR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HILIGHT_CLR_TD", function() { return HILIGHT_CLR_TD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAN_MAKE_CHKBOX_WAIT_MSEC", function() { return CAN_MAKE_CHKBOX_WAIT_MSEC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAN_MAKE_CHKBOX_RETRY_COUNT", function() { return CAN_MAKE_CHKBOX_RETRY_COUNT; });


var SOLVED_MAX = 3; // Solved3 まで

var ABC_COL_NUM = 7; // ABCの列数

var ARC_COL_NUM = 5; // ARCの列数

var AGC_COL_NUM = 8; // AGCの列数

var ID_SLA_ROOT = "sla_root"; // Solve Later Again(SLA)テーブルのdivのid

var ID_TR_SLA_ = "tr_sla_"; // SLAテーブルのtr要素のidのprefix (tr_sla_abc131_a)

var ID_CHKBOX_SOLVED1_SLA_ = "chkbox_solved1_sla_"; // SLAテーブルのSolved1列のチェックボックスのIDのprefix (chkbox_solved1_sla_abc131_a)

var ID_CHKBOX_SOLVED2_SLA_ = "chkbox_solved2_sla_"; // SLAテーブルのSolved2列のチェックボックスのIDのprefix (chkbox_solved2_sla_abc131_a)

var ID_CHKBOX_SOLVED3_SLA_ = "chkbox_solved3_sla_"; // SLAテーブルのSolved3列のチェックボックスのIDのprefix (chkbox_solved3_sla_abc131_a)

var ID_DEL_BTN_SLA_ = "del_btn_sla_"; // SLAテーブルのDeleteボタンのIDのprefix (del_btn_sla_abc131_a)

var ID_AGAIN_BTN_SLA_ = "again_btn_sla_"; // SLAテーブルのAgainボタンのIDのprefix (again_btn_sla_abc131_a)

var ID_DATE_SOLVED1_SLA_ = "date_solved1_sla_"; // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved1_sla_abc131_a)

var ID_DATE_SOLVED2_SLA_ = "date_solved2_sla_"; // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved2_sla_abc131_a)

var ID_DATE_SOLVED3_SLA_ = "date_solved3_sla_"; // SLAテーブルの問題を解いたときの年月日のdivのidのprefix (date_solved3_sla_abc131_a)

var ID_CHKBOX_SLA_ = "chkbox_sla_"; // 各問題のチェックボックスのIDのprefix (chkbox_sla_abc131_a)

var SOLVED2_DAYS = 0; // Solved2 はX日後に解き直す

var SOLVED3_DAYS = 3; // Solved3 はX日後に解き直す

var WDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var HILIGHT_CLR_TR = "#f5b88791";
var HILIGHT_CLR_TD = "#f7964891";
var CAN_MAKE_CHKBOX_WAIT_MSEC = 1000; // ページのDOMが構成されるのを待つミリ秒

var CAN_MAKE_CHKBOX_RETRY_COUNT = 60; // ページのDOMが構成されるのを待つリトライ回数

/***/ }),

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  // スコープの汚染を防ぐため、即時関数で囲む
  'use strict';

  var dom_ope = __webpack_require__(/*! ./dom_operations.js */ "./src/dom_operations.js");

  var consts = __webpack_require__(/*! ./consts.js */ "./src/consts.js"); // [START function]

  /* ABC, ARC, AGCの各問題のDOMが構築されているかをチェックする
  *   Args:
  *       elem_h2: テーブルのh2要素
  */


  function _exist_doms(elem_h2) {
    var root_div = elem_h2.parentNode;
    var tbody = root_div.getElementsByTagName("tbody")[0];
    var tds = tbody.getElementsByTagName("td");

    if (tds.length === 1) {
      // DOMがまだ構成されていない場合
      return false;
    }

    return true;
  } // [END function]
  // [START function]


  function _can_make_checkboxes() {
    /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成するための準備ができているか？
    DOMが構成されているかのチェックをする
    */
    var h2s = document.getElementsByTagName("h2");
    var is_success = true;

    for (var i = 0; i < h2s.length; i++) {
      if (h2s[i].innerText == "AtCoder Beginner Contest") {
        is_success &= _exist_doms(h2s[i]);
      } else if (h2s[i].innerText == "AtCoder Regular Contest") {
        is_success &= _exist_doms(h2s[i]);
      } else if (h2s[i].innerText == "AtCoder Grand Contest") {
        is_success &= _exist_doms(h2s[i]);
      }
    }

    if (!is_success) {
      return false;
    }

    return true;
  } // [END function]
  // [START function]


  function async_load_storage() {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get(null, function (loaded_data) {
        for (var sla_id in loaded_data) {
          // SLAテーブルにtr要素を作成する
          var target_chkbox = document.getElementById("chkbox_" + sla_id);
          var a_tag = target_chkbox.parentNode.getElementsByTagName("a")[0].cloneNode(true);
          dom_ope.make_new_tr_sla(sla_id.slice(4), a_tag); // tr要素のSolved列が年月日の場合はそれに変更する

          for (var i = 1; i <= consts.SOLVED_MAX; i++) {
            var solved_date = loaded_data[sla_id]["solved" + String(i)];

            if (solved_date === null) {
              continue;
            }

            var parent_td = document.getElementById("chkbox_solved" + String(i) + "_" + sla_id).parentNode;
            parent_td.innerText = "";
            var div = document.createElement("div");
            div.setAttribute("id", "date_solved" + String(i) + "_" + sla_id);
            div.innerText = solved_date;
            parent_td.appendChild(div);
          } // tr要素のSolved列のチェックボックスの中で、クリック可能にするものを決定する


          for (var _i = 1; _i <= consts.SOLVED_MAX; _i++) {
            var chkbox = document.getElementById("chkbox_solved" + String(_i) + "_" + sla_id);

            if (chkbox === null) {
              continue;
            }

            chkbox.disabled = false;
            break;
          } // 問題のチェックボックスにチェックを入れる


          target_chkbox.checked = true;
        }

        resolve();
        return;
      });
    });
  } // [END function]
  // [START function]


  function on_fullfilled_can_make_checkboxes() {
    // make_checkboxes()が正常に成功した or リトライ回数を超えたら、しょうがないので諦めてそのまま次の処理へ。
    // 各ABC, ARC, AGC等の問題にチェックボックスをつける
    return Promise.resolve().then(function () {
      dom_ope.make_checkboxes();
    }).then(async_load_storage).then(dom_ope.hilight_problems);
  } // [END function]
  // [START function]


  function on_rejected_can_make_checkboxes(try_count) {
    // make_checkboxes()に失敗したときの処理
    setTimeout(function () {
      async_can_make_checkboxes(try_count).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
    }, consts.CAN_MAKE_CHKBOX_WAIT_MSEC);
  }

  ; // [END function]
  // [START function]

  function async_can_make_checkboxes(try_count) {
    /* ページのDOMが構築されるまで処理を待つ */
    return new Promise(function (resolve, reject) {
      var is_success = _can_make_checkboxes();

      if (is_success || try_count === 0) {
        resolve();
        return;
      }

      reject(--try_count);
      return;
    });
  }

  ; // [END function]

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (document.getElementById(consts.ID_SLA_ROOT) !== null) {
      return false;
    }

    var root_div = document.getElementById('root');
    var target_div = root_div.firstElementChild.getElementsByClassName("container")[0].firstElementChild;
    var insert_html = dom_ope.make_base_html();
    target_div.insertBefore(insert_html, target_div.firstChild);
    async_can_make_checkboxes(consts.CAN_MAKE_CHKBOX_RETRY_COUNT).then(on_fullfilled_can_make_checkboxes, on_rejected_can_make_checkboxes);
  });
})();

/***/ }),

/***/ "./src/dom_operations.js":
/*!*******************************!*\
  !*** ./src/dom_operations.js ***!
  \*******************************/
/*! exports provided: make_checkboxes, make_base_html, make_new_tr_sla, initialize_problem_status, hilight_problems, unhilight_problem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make_checkboxes", function() { return make_checkboxes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make_base_html", function() { return make_base_html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make_new_tr_sla", function() { return make_new_tr_sla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize_problem_status", function() { return initialize_problem_status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hilight_problems", function() { return hilight_problems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unhilight_problem", function() { return unhilight_problem; });
/* harmony import */ var _click_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./click.js */ "./src/click.js");




var consts = __webpack_require__(/*! ./consts.js */ "./src/consts.js");

function _append_checkboxes(elem_h2, col_num) {
  /* ABC, ARC, AGCの各問題にチェックボックス要素を追加する
  Args:
      elem_h2: テーブルのh2要素
      col_num(int): テーブルの列数
  */
  var root_div = elem_h2.parentNode;
  var tbody = root_div.getElementsByTagName("tbody")[0];
  var tds = tbody.getElementsByTagName("td");
  var now_contest_name = "";

  for (var i = 0; i < tds.length; i++) {
    if (!tds[i].hasAttribute("tabindex")) {
      continue;
    }

    if (typeof tds[i].getElementsByTagName("a")[0] === "undefined") {
      // 問題が存在しないとき、チェックボックスは入れない
      continue;
    }

    var tabindex = parseInt(tds[i].getAttribute("tabindex"));

    if (tabindex % col_num === 1) {
      // contest の列なので、チェックボックスは入れない
      now_contest_name = tds[i].getElementsByTagName("a")[0].innerText.toLowerCase();
      continue;
    }

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = false;
    checkbox.addEventListener("click", _click_js__WEBPACK_IMPORTED_MODULE_0__["click_chkbox_sla"]);

    if (col_num === consts.ABC_COL_NUM) {
      // ABCのとき
      if (tabindex % col_num === 2) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "a");
      } else if (tabindex % col_num === 3) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "b");
      } else if (tabindex % col_num === 4) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "c");
      } else if (tabindex % col_num === 5) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "d");
      } else if (tabindex % col_num === 6) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "e");
      } else if (tabindex % col_num === 0) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "f");
      }

      tds[i].insertBefore(checkbox, tds[i].firstChild);
      continue;
    } else if (col_num === consts.ARC_COL_NUM) {
      // ARCのとき
      if (tabindex % col_num === 2) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "a");
      } else if (tabindex % col_num === 3) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "b");
      } else if (tabindex % col_num === 4) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "c");
      } else if (tabindex % col_num === 0) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "d");
      }

      tds[i].insertBefore(checkbox, tds[i].firstChild);
      continue;
    } else if (col_num === consts.AGC_COL_NUM) {
      // AGCのとき
      if (tabindex % col_num === 2) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "a");
      } else if (tabindex % col_num === 3) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "b");
      } else if (tabindex % col_num === 4) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "c");
      } else if (tabindex % col_num === 5) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "d");
      } else if (tabindex % col_num === 6) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "e");
      } else if (tabindex % col_num === 7) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "f");
      } else if (tabindex % col_num === 0) {
        checkbox.setAttribute("id", consts.ID_CHKBOX_SLA_ + now_contest_name + "_" + "f2");
      }

      tds[i].insertBefore(checkbox, tds[i].firstChild);
      continue;
    }
  }
}

function make_checkboxes() {
  /* 各問題に、Solve Later Againテーブルに問題を追加するためのチェックボックス要素を作成する */
  var h2s = document.getElementsByTagName("h2");

  for (var i = 0; i < h2s.length; i++) {
    if (h2s[i].innerText == "AtCoder Beginner Contest") {
      _append_checkboxes(h2s[i], consts.ABC_COL_NUM);
    } else if (h2s[i].innerText == "AtCoder Regular Contest") {
      _append_checkboxes(h2s[i], consts.ARC_COL_NUM);
    } else if (h2s[i].innerText == "AtCoder Grand Contest") {
      _append_checkboxes(h2s[i], consts.AGC_COL_NUM);
    }
  }
}
function make_base_html() {
  /* Solve Later Again セクションの基本的なHTMLを作成する */
  var html = document.createElement("div");
  html.setAttribute("id", consts.ID_SLA_ROOT);
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
  var col_header3 = document.createElement("col");
  var col_header4 = document.createElement("col");
  var col_header5 = document.createElement("col");
  colgroup_container_header.appendChild(col_header1);
  colgroup_container_header.appendChild(col_header2);
  colgroup_container_header.appendChild(col_header3);
  colgroup_container_header.appendChild(col_header4);
  colgroup_container_header.appendChild(col_header5);
  var col_body1 = document.createElement("col");
  var col_body2 = document.createElement("col");
  var col_body3 = document.createElement("col");
  var col_body4 = document.createElement("col");
  var col_body5 = document.createElement("col");
  colgroup_container_body.appendChild(col_body1);
  colgroup_container_body.appendChild(col_body2);
  colgroup_container_body.appendChild(col_body3);
  colgroup_container_body.appendChild(col_body4);
  colgroup_container_body.appendChild(col_body5);
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
  th_solved2.textContent = "Solved 2 (" + String(consts.SOLVED2_DAYS) + " Days Later)";
  tr_thead.appendChild(th_solved2);
  var th_solved3 = document.createElement("th");
  th_solved3.textContent = "Solved 3 (" + String(consts.SOLVED3_DAYS) + " Days Later)";
  tr_thead.appendChild(th_solved3);
  var th_buttons = document.createElement("th");
  th_buttons.textContent = "Buttons";
  th_buttons.colSpan = "2";
  tr_thead.appendChild(th_buttons);
  var tbody = document.createElement("tbody");
  table_container_body.appendChild(tbody);
  return html;
} //[START function]

function make_new_tr_sla(problem_name, a_tag) {
  // SLAテーブルの新しいtr要素を作成する
  var tr = document.createElement("tr");
  tr.setAttribute("id", consts.ID_TR_SLA_ + problem_name);
  var td1 = document.createElement("td");
  td1.appendChild(a_tag); // Solved1, 2, 3の td要素。あとで初期化する

  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  td5.classList.add("td-sla-again");
  var btn_again = document.createElement("input");
  btn_again.setAttribute("type", "button");
  btn_again.setAttribute("value", "ReAgain");
  btn_again.setAttribute("id", consts.ID_AGAIN_BTN_SLA_ + problem_name);
  btn_again.classList.add("btn"); //btn_again.classList.add("btn-secondary");

  btn_again.classList.add("btn-sla-again");
  btn_again.addEventListener("click", _click_js__WEBPACK_IMPORTED_MODULE_0__["click_again_btn_sla"]);
  td5.appendChild(btn_again);
  var td6 = document.createElement("td");
  td6.classList.add("td-sla-delete");
  var btn_del = document.createElement("input");
  btn_del.setAttribute("type", "button");
  btn_del.setAttribute("value", "Delete");
  btn_del.setAttribute("id", consts.ID_DEL_BTN_SLA_ + problem_name);
  btn_del.classList.add("btn");
  btn_del.classList.add("btn-secondary");
  btn_del.classList.add("btn-sla-delete");
  btn_del.addEventListener("click", _click_js__WEBPACK_IMPORTED_MODULE_0__["click_del_btn_sla"]);
  td6.appendChild(btn_del);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6); // Solve Later Againのtbodyに、tr要素を追加する

  var root_div = document.getElementById(consts.ID_SLA_ROOT);
  var tbody = root_div.getElementsByTagName("tbody")[0];
  tbody.appendChild(tr);
  initialize_problem_status(problem_name);
} //[END function]
//[START function]

function initialize_problem_status(problem_name) {
  /* SLAテーブルの指定の問題の状態を初期化する */
  var target_tr = document.getElementById(consts.ID_TR_SLA_ + problem_name);
  var tds = target_tr.getElementsByTagName("td"); // solved1

  tds[1].textContent = null; // 子要素を全て削除

  var chkbox1 = document.createElement("input");
  chkbox1.setAttribute("type", "checkbox");
  chkbox1.setAttribute("id", consts.ID_CHKBOX_SOLVED1_SLA_ + problem_name);
  chkbox1.addEventListener("click", _click_js__WEBPACK_IMPORTED_MODULE_0__["click_chkbox_solved_sla"]);
  tds[1].appendChild(chkbox1);
  chkbox1.checked = false;
  chkbox1.disabled = false; // solved2

  tds[2].textContent = null;
  var chkbox2 = document.createElement("input");
  chkbox2.setAttribute("type", "checkbox");
  chkbox2.setAttribute("id", consts.ID_CHKBOX_SOLVED2_SLA_ + problem_name);
  chkbox2.addEventListener("click", _click_js__WEBPACK_IMPORTED_MODULE_0__["click_chkbox_solved_sla"]);
  tds[2].appendChild(chkbox2);
  chkbox2.checked = false;
  chkbox2.disabled = true; // solved3

  tds[3].textContent = null;
  var chkbox3 = document.createElement("input");
  chkbox3.setAttribute("type", "checkbox");
  chkbox3.setAttribute("id", consts.ID_CHKBOX_SOLVED3_SLA_ + problem_name);
  chkbox3.addEventListener("click", _click_js__WEBPACK_IMPORTED_MODULE_0__["click_chkbox_solved_sla"]);
  tds[3].appendChild(chkbox3);
  chkbox3.checked = false;
  chkbox3.disabled = true;
} //[END function]
//[START function]

function strdate2date(dt_str) {
  /* 文字列の日付をDate型に変換して返す 
  (例) dt_str = "2019/6/27(Thu)"
  */
  dt_str = dt_str.split('(')[0];
  var dts = dt_str.split('/');
  var dt = new Date();
  dt.setFullYear(Number(dts[0]));
  dt.setMonth(Number(dts[1]) - 1);
  dt.setDate(Number(dts[2]));
  return dt;
} //[END function]
//[START function]


function hilight_problems() {
  /* 規定の日数を経過したSLAテーブルの問題をハイライトする */
  var today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59); // SLAテーブルの各問題を走査する

  var root_div = document.getElementById(consts.ID_SLA_ROOT);
  var tbody = root_div.getElementsByTagName("tbody")[0];
  var trs = tbody.getElementsByTagName("tr");

  var _loop = function _loop(i) {
    var problem_name = trs[i].getAttribute("id").slice(consts.ID_TR_SLA_.length);
    var tds = trs[i].getElementsByTagName("td"); // Solved 1をチェックする

    var chkbox = document.getElementById(consts.ID_CHKBOX_SOLVED1_SLA_ + problem_name);

    if (chkbox !== null && chkbox.disabled === false) {
      // Soved1をまだチェックしていないので、何もしない
      return "continue";
    }

    var hilight_if_needed = function hilight_if_needed(solved_num, need_msec) {
      /* SLAテーブルの問題を、日数が経過していればハイライトする */
      var chkbox = document.getElementById("chkbox_solved" + String(solved_num) + "_sla_" + problem_name);

      if (chkbox !== null && chkbox.disabled === false) {
        // このSovedをまだチェックしていないので、前のSolvedの日付と比較する
        var dt_str = document.getElementById("date_solved" + String(solved_num - 1) + "_sla_" + problem_name).innerText;
        var dt = strdate2date(dt_str); //const dt = strdate2date("2019/6/1(Hoge)");  // テスト用

        if (today - dt >= need_msec) {
          // 経過しているのでハイライト
          var target_tr = document.getElementById(consts.ID_TR_SLA_ + problem_name);
          target_tr.style.backgroundColor = consts.HILIGHT_CLR_TR;
          tds[solved_num].style.backgroundColor = consts.HILIGHT_CLR_TD;
          return true;
        }

        return false;
      }
    }; // Solved 2をチェックする


    var result = hilight_if_needed(2, 60 * 60 * 24 * consts.SOLVED2_DAYS * 1000);

    if (result) {
      return "continue";
    } // Solved 3をチェックする


    result = hilight_if_needed(3, 60 * 60 * 24 * consts.SOLVED3_DAYS * 1000);

    if (result) {
      return "continue";
    }
  };

  for (var i = 0; i < trs.length; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
} //[END function]
//[START function]

function unhilight_problem(problem_name, solved_num) {
  /* SLAテーブルの指定の問題のハイライトを解除する */
  var target_tr = document.getElementById(consts.ID_TR_SLA_ + problem_name);
  target_tr.style.backgroundColor = "";
  var tds = target_tr.getElementsByTagName("td");
  tds[solved_num].style.backgroundColor = "";
} //[END function]

/***/ })

/******/ });
//# sourceMappingURL=content.js.map