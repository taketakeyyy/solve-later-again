!function(e){var t={};function n(r){if(t[r])return t[r].exports;var d=t[r]={i:r,l:!1,exports:{}};return e[r].call(d.exports,d,d.exports,n),d.l=!0,d.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)n.d(r,d,function(t){return e[t]}.bind(null,d));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";n.r(t),n.d(t,"SOLVED_MAX",function(){return r}),n.d(t,"ABC_COL_NUM",function(){return d}),n.d(t,"ARC_COL_NUM",function(){return a}),n.d(t,"AGC_COL_NUM",function(){return i}),n.d(t,"ID_SLA_ROOT",function(){return l}),n.d(t,"ID_TR_SLA_",function(){return o}),n.d(t,"ID_CHKBOX_SOLVED1_SLA_",function(){return c}),n.d(t,"ID_CHKBOX_SOLVED2_SLA_",function(){return _}),n.d(t,"ID_CHKBOX_SOLVED3_SLA_",function(){return u}),n.d(t,"ID_DEL_BTN_SLA_",function(){return s}),n.d(t,"ID_AGAIN_BTN_SLA_",function(){return m}),n.d(t,"ID_DATE_SOLVED1_SLA_",function(){return A}),n.d(t,"ID_DATE_SOLVED2_SLA_",function(){return C}),n.d(t,"ID_DATE_SOLVED3_SLA_",function(){return p}),n.d(t,"ID_CHKBOX_SLA_",function(){return b}),n.d(t,"SOLVED2_DAYS",function(){return g}),n.d(t,"SOLVED3_DAYS",function(){return E}),n.d(t,"WDAYS",function(){return v}),n.d(t,"HILIGHT_CLR_TR",function(){return h}),n.d(t,"HILIGHT_CLR_TD",function(){return L}),n.d(t,"CAN_MAKE_CHKBOX_WAIT_MSEC",function(){return f}),n.d(t,"CAN_MAKE_CHKBOX_RETRY_COUNT",function(){return S});var r=3,d=7,a=5,i=8,l="sla_root",o="tr_sla_",c="chkbox_solved1_sla_",_="chkbox_solved2_sla_",u="chkbox_solved3_sla_",s="del_btn_sla_",m="again_btn_sla_",A="date_solved1_sla_",C="date_solved2_sla_",p="date_solved3_sla_",b="chkbox_sla_",g=7,E=30,v=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],h="#f5b88791",L="#f7964891",f=1e3,S=60},function(e,t,n){!function(){"use strict";var e=n(2),t=n(0);function r(e){return 1!==e.parentNode.getElementsByTagName("tbody")[0].getElementsByTagName("td").length}function d(){return new Promise(function(n,r){chrome.storage.sync.get(null,function(r){for(var d in r){var a=document.getElementById("chkbox_"+d),i=a.parentNode.getElementsByTagName("a")[0].cloneNode(!0);e.make_new_tr_sla(d.slice(4),i);for(var l=1;l<=t.SOLVED_MAX;l++){var o=r[d]["solved"+String(l)];if(null!==o){var c=document.getElementById("chkbox_solved"+String(l)+"_"+d).parentNode;c.innerText="";var _=document.createElement("div");_.setAttribute("id","date_solved"+String(l)+"_"+d),_.innerText=o,c.appendChild(_)}}for(var u=1;u<=t.SOLVED_MAX;u++){var s=document.getElementById("chkbox_solved"+String(u)+"_"+d);if(null!==s){s.disabled=!1;break}}a.checked=!0}n()})})}function a(){return Promise.resolve().then(function(){e.make_checkboxes()}).then(d).then(e.hilight_problems)}function i(e){setTimeout(function(){l(e).then(a,i)},t.CAN_MAKE_CHKBOX_WAIT_MSEC)}function l(e){return new Promise(function(t,n){!function(){for(var e=document.getElementsByTagName("h2"),t=!0,n=0;n<e.length;n++)"AtCoder Beginner Contest"==e[n].innerText?t&=r(e[n]):"AtCoder Regular Contest"==e[n].innerText?t&=r(e[n]):"AtCoder Grand Contest"==e[n].innerText&&(t&=r(e[n]));return!!t}()&&0!==e?n(--e):t()})}chrome.runtime.onMessage.addListener(function(n,r,d){if(null!==document.getElementById(t.ID_SLA_ROOT))return!1;var o=document.getElementById("root").firstElementChild.getElementsByClassName("container")[0].firstElementChild,c=e.make_base_html();o.insertBefore(c,o.firstChild),l(t.CAN_MAKE_CHKBOX_RETRY_COUNT).then(a,i)})}()},function(e,t,n){"use strict";n.r(t);var r=n(0);function d(e){var t=e.target.getAttribute("id").slice(r.ID_AGAIN_BTN_SLA_.length);A(t);for(var n=1;n<r.SOLVED_MAX+1;n++)p(t,n);l(t)}function a(e){var t=e.target.getAttribute("id").slice(r.ID_DEL_BTN_SLA_.length),n=document.getElementById(r.ID_TR_SLA_+t);n.parentNode.removeChild(n),document.getElementById(r.ID_CHKBOX_SLA_+t).checked=!1,l(t)}function i(e){var t=e.target.getAttribute("id").slice(r.ID_CHKBOX_SLA_.length);if(e.target.checked){m(t,e.target.parentNode.getElementsByTagName("a")[0].cloneNode(!0))}else{var n=document.getElementById(r.ID_TR_SLA_+t);n.parentNode.removeChild(n)}l(t)}function l(e){var t="sla_"+e;if(null===document.getElementById(r.ID_TR_SLA_+e))return chrome.storage.sync.remove(t),!0;var n={};n[t]={};for(var d=1;d<=r.SOLVED_MAX;d++){if(null!==document.getElementById("chkbox_solved"+String(d)+"_"+t))n[t]["solved"+String(d)]=null;else{var a=document.getElementById("date_solved"+String(d)+"_"+t);n[t]["solved"+String(d)]=a.innerText}}chrome.storage.sync.set(n)}function o(e){var t=e.target.getAttribute("id").slice(r.ID_CHKBOX_SOLVED1_SLA_.length),n=parseInt(e.target.getAttribute("id")["chkbox_solved".length],10);!function(n){var d=new Date,a=d.getFullYear(),i=d.getMonth(),l=d.getDate(),o=d.getDay(),c=e.target.parentNode;c.innerText="";var _=document.createElement("div");_.setAttribute("id","date_solved"+String(n)+"_sla_"+t),_.innerText=a+"/"+(i+1)+"/"+l+"("+r.WDAYS[o]+")",c.appendChild(_),n<r.SOLVED_MAX&&(document.getElementById("chkbox_solved"+(n+1)+"_sla_"+t).disabled=!1)}(n),p(t,n),l(t)}n.d(t,"make_checkboxes",function(){return u}),n.d(t,"make_base_html",function(){return s}),n.d(t,"make_new_tr_sla",function(){return m}),n.d(t,"initialize_problem_status",function(){return A}),n.d(t,"hilight_problems",function(){return C}),n.d(t,"unhilight_problem",function(){return p});var c=n(0);function _(e,t){for(var n=e.parentNode.getElementsByTagName("tbody")[0].getElementsByTagName("td"),r="",d=0;d<n.length;d++)if(n[d].hasAttribute("tabindex")&&void 0!==n[d].getElementsByTagName("a")[0]){var a=parseInt(n[d].getAttribute("tabindex"));if(a%t!=1){var l=document.createElement("input");l.setAttribute("type","checkbox"),l.checked=!1,l.addEventListener("click",i),t!==c.ABC_COL_NUM?t!==c.ARC_COL_NUM?t!==c.AGC_COL_NUM||(a%t==2?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_a"):a%t==3?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_b"):a%t==4?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_c"):a%t==5?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_d"):a%t==6?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_e"):a%t==7?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_f"):a%t==0&&l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_f2"),n[d].insertBefore(l,n[d].firstChild)):(a%t==2?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_a"):a%t==3?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_b"):a%t==4?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_c"):a%t==0&&l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_d"),n[d].insertBefore(l,n[d].firstChild)):(a%t==2?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_a"):a%t==3?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_b"):a%t==4?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_c"):a%t==5?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_d"):a%t==6?l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_e"):a%t==0&&l.setAttribute("id",c.ID_CHKBOX_SLA_+r+"_f"),n[d].insertBefore(l,n[d].firstChild))}else r=n[d].getElementsByTagName("a")[0].innerText.toLowerCase()}}function u(){for(var e=document.getElementsByTagName("h2"),t=0;t<e.length;t++)"AtCoder Beginner Contest"==e[t].innerText?_(e[t],c.ABC_COL_NUM):"AtCoder Regular Contest"==e[t].innerText?_(e[t],c.ARC_COL_NUM):"AtCoder Grand Contest"==e[t].innerText&&_(e[t],c.AGC_COL_NUM);!function(){for(var e=document.getElementsByClassName("table-responsive"),t=0;t<e.length;t++)for(var n=e[t].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td"),r=0;r<n.length;r++){var d=n[r].getElementsByTagName("a")[0].getAttribute("href").split("/"),a=d[d.length-1],l=document.createElement("input");l.setAttribute("type","checkbox"),l.checked=!1,l.addEventListener("click",i),l.setAttribute("id",c.ID_CHKBOX_SLA_+a),n[r].insertBefore(l,n[r].firstChild)}}()}function s(){var e=document.createElement("div");e.setAttribute("id",c.ID_SLA_ROOT),e.classList.add("row");var t=document.createElement("h2");t.textContent="Solve Later Again",e.appendChild(t);var n=document.createElement("div");n.classList.add("react-bs-table-container"),e.appendChild(n);var r=document.createElement("div");r.classList.add("react-bs-table"),r.classList.add("react-bs-table-bordered"),n.appendChild(r);var d=document.createElement("div");d.classList.add("s-alert-wrapper"),n.appendChild(d);var a=document.createElement("div");a.classList.add("react-bs-container-header"),a.classList.add("table-header-wrapper"),r.appendChild(a);var i=document.createElement("div");i.classList.add("react-bs-container-body"),r.appendChild(i);var l=document.createElement("table");l.classList.add("table"),l.classList.add("table-hover"),l.classList.add("table-bordered"),a.appendChild(l);var o=document.createElement("table");o.classList.add("table"),o.classList.add("table-bordered"),i.appendChild(o);var _=document.createElement("colgroup");l.appendChild(_);var u=document.createElement("colgroup");o.appendChild(u);var s=document.createElement("col"),m=document.createElement("col"),A=document.createElement("col"),C=document.createElement("col"),p=document.createElement("col");_.appendChild(s),_.appendChild(m),_.appendChild(A),_.appendChild(C),_.appendChild(p);var b=document.createElement("col"),g=document.createElement("col"),E=document.createElement("col"),v=document.createElement("col"),h=document.createElement("col");u.appendChild(b),u.appendChild(g),u.appendChild(E),u.appendChild(v),u.appendChild(h);var L=document.createElement("thead");l.appendChild(L);var f=document.createElement("tr");L.appendChild(f);var S=document.createElement("th");S.textContent="Problem",f.appendChild(S);var D=document.createElement("th");D.textContent="Solved 1",f.appendChild(D);var B=document.createElement("th");B.textContent="Solved 2 ("+String(c.SOLVED2_DAYS)+" Days Later)",f.appendChild(B);var I=document.createElement("th");I.textContent="Solved 3 ("+String(c.SOLVED3_DAYS)+" Days Later)",f.appendChild(I);var O=document.createElement("th");O.textContent="Buttons",O.colSpan="2",f.appendChild(O);var y=document.createElement("tbody");return o.appendChild(y),e}function m(e,t){var n=document.createElement("tr");n.setAttribute("id",c.ID_TR_SLA_+e);var r=document.createElement("td");r.appendChild(t);var i=document.createElement("td"),l=document.createElement("td"),o=document.createElement("td"),_=document.createElement("td");_.classList.add("td-sla-again");var u=document.createElement("input");u.setAttribute("type","button"),u.setAttribute("value","ReAgain"),u.setAttribute("id",c.ID_AGAIN_BTN_SLA_+e),u.classList.add("btn"),u.classList.add("btn-sla-again"),u.addEventListener("click",d),_.appendChild(u);var s=document.createElement("td");s.classList.add("td-sla-delete");var m=document.createElement("input");m.setAttribute("type","button"),m.setAttribute("value","Delete"),m.setAttribute("id",c.ID_DEL_BTN_SLA_+e),m.classList.add("btn"),m.classList.add("btn-secondary"),m.classList.add("btn-sla-delete"),m.addEventListener("click",a),s.appendChild(m),n.appendChild(r),n.appendChild(i),n.appendChild(l),n.appendChild(o),n.appendChild(_),n.appendChild(s),document.getElementById(c.ID_SLA_ROOT).getElementsByTagName("tbody")[0].appendChild(n),A(e)}function A(e){var t=document.getElementById(c.ID_TR_SLA_+e).getElementsByTagName("td");t[1].textContent=null;var n=document.createElement("input");n.setAttribute("type","checkbox"),n.setAttribute("id",c.ID_CHKBOX_SOLVED1_SLA_+e),n.addEventListener("click",o),t[1].appendChild(n),n.checked=!1,n.disabled=!1,t[2].textContent=null;var r=document.createElement("input");r.setAttribute("type","checkbox"),r.setAttribute("id",c.ID_CHKBOX_SOLVED2_SLA_+e),r.addEventListener("click",o),t[2].appendChild(r),r.checked=!1,r.disabled=!0,t[3].textContent=null;var d=document.createElement("input");d.setAttribute("type","checkbox"),d.setAttribute("id",c.ID_CHKBOX_SOLVED3_SLA_+e),d.addEventListener("click",o),t[3].appendChild(d),d.checked=!1,d.disabled=!0}function C(){var e=new Date;e.setHours(23),e.setMinutes(59),e.setSeconds(59);for(var t=document.getElementById(c.ID_SLA_ROOT).getElementsByTagName("tbody")[0].getElementsByTagName("tr"),n=function(n){var r=t[n].getAttribute("id").slice(c.ID_TR_SLA_.length),d=t[n].getElementsByTagName("td"),a=document.getElementById(c.ID_CHKBOX_SOLVED1_SLA_+r);if(null!==a&&!1===a.disabled)return"continue";var i=function(t,n){var a=document.getElementById("chkbox_solved"+String(t)+"_sla_"+r);if(null!==a&&!1===a.disabled){var i=function(e){var t=(e=e.split("(")[0]).split("/"),n=new Date;return n.setFullYear(Number(t[0])),n.setMonth(Number(t[1])-1),n.setDate(Number(t[2])),n}(document.getElementById("date_solved"+String(t-1)+"_sla_"+r).innerText);return e-i>=n&&(document.getElementById(c.ID_TR_SLA_+r).style.backgroundColor=c.HILIGHT_CLR_TR,d[t].style.backgroundColor=c.HILIGHT_CLR_TD,!0)}},l=i(2,86400*c.SOLVED2_DAYS*1e3);return l?"continue":(l=i(3,86400*c.SOLVED3_DAYS*1e3))?"continue":void 0},r=0;r<t.length;r++)n(r)}function p(e,t){var n=document.getElementById(c.ID_TR_SLA_+e);n.style.backgroundColor="",n.getElementsByTagName("td")[t].style.backgroundColor=""}}]);