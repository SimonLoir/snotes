!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(e){this.message=e,this.name="IndexOutOfArrayException"}}t.IndexOutOfArrayExecption=r;class o{constructor(e,t){var n;if("string"==typeof e)n=document.querySelectorAll(e),null!=t&&(n=[n[t]]);else{if(null==e||e==document)return this.ready=function(e){document.addEventListener("DOMContentLoaded",e)},this;if("object"!=typeof e)return"ExtJsObject"==e.type?e:void 0;n=null==e.length?[e]:null!=t?[e[t]]:e}this.type="ExtJsObject",this.node=n}html(e){if(null!=e){for(var t=0;t<this.node.length;t++){var n=this.node[t];"string"!=typeof e&&"number"!=typeof e||(n.innerHTML=e)}return this}return this.node[0].innerHTML}text(e){if(null!=e){for(var t=0;t<this.node.length;t++){var n=this.node[t];"string"!=typeof e&&"number"!=typeof e||(n.innerText=e)}return this}return this.node[0].innerText}click(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e?r.addEventListener("click",e):r.click();else if(void 0!==e){var o=r;r.addEventListener("click",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}else{(o=r).querySelector(t).click()}}return this}dblclick(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e?r.addEventListener("dblclick",e):r.dblclick();else if(void 0!==e){var o=r;r.addEventListener("dblclick",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}else{(o=r).querySelector(t).dblclick()}}return this}hover(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e?r.addEventListener("mouseover",e):r.click();else if(void 0!==e){var o=r;r.addEventListener("mouseover",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}leave(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e?r.addEventListener("mouseleave",e):r.click();else if(void 0!==e){var o=r;r.addEventListener("mouseleave",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}get(e){if(null!=e){if(null==this.node[e])throw new r("ExtJsObject.get undefined index node["+e+"]");return this.node[e]}if(null==this.node[0])throw new r("ExtJsObject.get undefined index node[0]");return this.node[0]}exists(e){return null!=e?null!=this.node[e]:0!=this.node.length}height(e){for(var t=0;t<this.node.length;t++){var n=this.node[t];if(void 0===e)return n.offsetHeight;n.style.height=e}return this}width(e){for(var t=0;t<this.node.length;t++){var n=this.node[t];if(void 0===e)return n.offsetWidth;n.style.width=e}return this}addClass(e){for(var t=0;t<this.node.length;t++){this.node[t].classList.add(e)}return this}hasClass(e){return this.node[0].classList.contains(e)}removeClass(e){for(var t=0;t<this.node.length;t++){this.node[t].classList.remove(e)}return this}remove(){for(var e=0;e<this.node.length;e++){var t=this.node[e];t.parentElement.removeChild(t)}}child(e){for(var t=[],n=0;n<this.node.length;n++){var r=this.node[n],o=document.createElement(e);r.appendChild(o),t.push(o)}return i(t)}css(e,t,n){var r=n;if(null==n&&(n=0),null==t)return this.node[n].style[e];if(null!=r)return this.node[n].style[e]=t,this;for(let n=0;n<this.node.length;n++){this.node[n].style[e]=t}return this}attr(e,t,n){var r=n;if(null==n&&(n=0),null==t)return this.node[n].getAttribute(e);if(null!=r)return this.node[n].style[e]=t,this;for(let n=0;n<this.node.length;n++){this.node[n].setAttribute(e,t)}return this}parent(e){for(var t=[],n=0;n<this.node.length;n++){var r=this.node[n];null==e?t.push(r.parentElement):t.push(r.closest(e))}return i(t)}value(e){if(null!=e){for(var t=0;t<this.node.length;t++){var n=this.node[t];"string"!=typeof e&&"number"!=typeof e||(n.value=e)}return this}this.node[0];return this.node[0].value}keypress(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e&&r.addEventListener("keypress",e);else if(void 0!==e){var o=r;r.addEventListener("keypress",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}input(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e&&r.addEventListener("input",e);else if(void 0!==e){var o=r;r.addEventListener("input",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}keydown(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e&&r.addEventListener("keydown",e);else if(void 0!==e){var o=r;r.addEventListener("keydown",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}change(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e&&r.addEventListener("change",e);else if(void 0!==e){var o=r;r.addEventListener("change",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}keyup(e,t){for(var n=0;n<this.node.length;n++){var r=this.node[n];if(void 0===t)void 0!==e&&r.addEventListener("keyup",e);else if(void 0!==e){var o=r;r.addEventListener("keyup",function(n){if(o.querySelector(t)==n.target){let n=o.querySelector(t);n.prototype.toDo=e,n.toDo()}})}}return this}prevSibling(){let e=[];for(var t=0;t<this.node.length;t++){var n=this.node[t];e.push(n.previousSibling)}return i(e)}nextSibling(){let e=[];for(var t=0;t<this.node.length;t++){var n=this.node[t];e.push(n.nextSibling)}return i(e)}appendTo(e){let t=this.get(0);e.get(0).appendChild(t)}count(){return this.node.length}forEach(e){for(let t=0;t<this.node.length;t++){const n=this.node[t];e.bind(n)(t)}return this}cssObj(e){return Object.keys(e).forEach(t=>{this.css(t,e[t])}),this}children(e){return i(this.node[0].querySelectorAll(e))}only(e){return i(this.node[e])}}t.ExtJsObject=o;function i(e,t){return null!=e?new o(e,t):this}t.AR=new class{request(e,t,n,r,o){let i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status)r(i.responseText);else if(4==i.readyState&&null!=o)try{o()}catch(e){}},i.open("GET"==e||"DELETE"==e?"GET":"POST",t,!0);let s="";if(null!=n){let e=Object.keys(n);for(let t=0;t<e.length;t++)0!==t&&(s+="&"),s=s+e[t]+"="+n[e[t]];i.setRequestHeader("Content-type","application/x-www-form-urlencoded")}"PUT"!=e&&"DELETE"!=e||i.setRequestHeader("x-http-method-override",e),""!=s?i.send(s):i.send()}GET(e,t,n){return this.request("GET",e,void 0,t,n)}DELETE(e,t,n){return this.request("DELETE",e,void 0,t,n)}POST(e,t,n,r){return this.request("POST",e,t,n,r)}PUT(e,t,n,r){return this.request("PUT",e,t,n,r)}},t.$=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return"process"in window}},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var s;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),a=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),l=null,d=0,c=[],u=n(12);function f(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(y(r.parts[s],t))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(y(r.parts[s],t));i[r.id]={id:r.id,refs:1,parts:a}}}}function h(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],s=t.base?i[0]+t.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}function p(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function v(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function m(e){var t=document.createElement("style");return e.attrs.type="text/css",g(t,e.attrs),p(e,t),t}function g(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var s=d++;n=l||(l=m(t)),r=w.bind(null,n,s,!1),o=w.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",g(t,e.attrs),p(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=u(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,t),o=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){v(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=h(e,t);return f(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(a=i[s.id]).refs--,r.push(a)}e&&f(h(e,t),t);for(o=0;o<r.length;o++){var a;if(0===(a=r[o]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete i[a.id]}}}};var b,x=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);n(14);t.default=class{constructor(e="Default text",t=r.$("body")){const n=t.child("div").addClass("rich-textarea");this.base=n,this.controls=n.child("div").addClass("controls"),this.addControls();const o=n.child("div").addClass("text").attr("spellcheck","true").attr("contenteditable","true").html(e);this.textarea=o,o.get(0).addEventListener("blur",e=>{e.relatedTarget&&r.$(e.relatedTarget).parent(".matrix").count()>0||(e.preventDefault(),e.stopPropagation(),e.target.focus())}),o.keydown(e=>{switch(e.keyCode){case 9:e.preventDefault(),e.ctrlKey?(e.preventDefault(),e.stopPropagation(),document.execCommand("insertHTML",!0,'\n                        <span class="matrix" contenteditable="false">\n                        <table contenteditable="true">\n                            <tr>\n                                <td>0</td>\n                                <td>0</td>\n                                <td>0</td>\n                            </tr>\n                            <tr>\n                                <td>0</td>\n                                <td>0</td>\n                                <td>0</td>\n                            </tr>\n                            <tr>\n                                <td>0</td>\n                                <td>0</td>\n                                <td>0</td>\n                            </tr>\n                        </table>\n                        </span> ')):document.execCommand("insertText",void 0,"\t")}})}addControls(){const e=this.controls.child("select");[{title:""},{title:"Titre 1",value:"<h1>",action:"formatBlock"},{title:"Titre 2",value:"<h2>",action:"formatBlock"},{title:"Titre 3",value:"<h3>",action:"formatBlock"},{title:"Titre 4",value:"<h4>",action:"formatBlock"}].forEach(t=>{e.child("option").attr("value",t.title).text(t.title),e.change(()=>{e.value()==t.title&&document.execCommand(t.action,void 0,t.value)})}),[{icon:"undo",command:"undo",title:"Annuler"},{icon:"redo",command:"redo",title:"Refaire"},{icon:"format_bold",command:"bold",title:"Mettre en gras"},{icon:"format_italic",command:"italic",title:"Mettre en italique"},{icon:"format_strikethrough",command:"strikeThrough",title:"Barrer"},{icon:"format_indent_increase",command:"indent",title:"Augmenter l'indentation"},{icon:"format_indent_decrease",command:"outdent",title:"Diminuer l'indentation"},{icon:"format_underlined",command:"underline",title:"Souligner"},{icon:"format_list_bulleted",command:"insertUnorderedList",title:"Liste non numérotée"},{icon:"format_list_numbered",command:"insertOrderedList",title:"Liste numérotée"}].forEach(e=>{this.controls.child("span").addClass("material-icons").attr("title",e.title||"").text(e.icon).click(()=>{document.execCommand(e.command)})})}hide(){this.base.css("display","none")}show(){this.base.css("display","block")}get html(){return this.textarea.html()}}},function(e,t){e.exports=require("fs")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,a)}l((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(7);n(10);const i=n(0),s=n(13),a=n(4),l=n(16),d=n(1),c=i.$("body").child("div").addClass("workspace"),u=c.child("div").addClass("controls"),f=c.child("div").addClass("slides").child("div").addClass("welcome-wrapper");let h;f.child("img").attr("src","images/working.svg"),f.child("span").text("Bienvenue sur SNotes !"),f.child("p").text("Ouvrez un PDF ou un fichier SNotes 2.0 pour commencer ☺"),[{icon:"note_add",title:"Charger un document",command:()=>r(this,void 0,void 0,function*(){const e=new o.default,t=yield e.snoteDoc;h=new s.default(t)})},{icon:"save",title:"Sauvegarder",command:()=>null==h?alert("Aucun document à sauvegarder"):d.default()?(console.log("s"),console.log(n(5)),h.doc.file_path||(h.doc.file_path=window.saveDialog()),void(h.doc.file_path&&n(5).writeFileSync(h.doc.file_path,JSON.stringify(h.save()),"utf8"))):alert("Désolé, la fonction sauvegarder n'est pas disponible ici mais vous pouvez toujours utiliser l'option télécharger (icone suivante)")},{icon:"cloud_download",title:"Sauvegarder en .snote",command:()=>{if(null==h)return alert("Aucun document à sauvegarder");l.saveJSONAsFile(h.save(),"note.snote")}}].forEach(e=>{u.child("span").addClass("material-icons").attr("title",e.title||"").text(e.icon).click(()=>{e.command()})});const p=c.child("div").addClass("flip").html('<i class="material-icons">\n                flip\n            </i>').get(0);let v,m,g=!1;const y=e=>{const t=window.getComputedStyle(c.get(0)).width;window.getComputedStyle(i.$(".rich-textarea").get(0)).width;m=parseFloat(t.replace("px","")),v=e.pageX,g=!0};p.addEventListener("mousedown",y);const b=e=>{if(!g)return;const t=e.pageX-v,n=parseFloat(window.getComputedStyle(document.body).width.replace("px","")),r=Math.min(Math.max(m+t,200),n-200);c.css("width",r+"px"),i.$(".rich-textarea").css("width",n-r-1+"px")};window.addEventListener("mousemove",b),t.updateSize=()=>{v=0,y({pageX:0}),b({pageX:0}),g=!1},window.addEventListener("resize",t.updateSize),window.addEventListener("mouseup",e=>{g=!1}),new a.default("<h2>SNotes 2.0</h2><div>Bienvenue sur SNotes ! SNotes c'est un logiciel de prise de notes qui est entièrement <i>gratuit</i>. Pas d'abonnement, pas d'achat, toutes les fonctionnalités sont gratuites et le resteront 😎</div><div><br></div><h2>Quoi de neuf en version 2 ?</h2><div>La version 2 de SNotes vient avec le format de prise de notes SNotes format v3. Les notes sont plus structurées au sein du fichier, ce qui rend le logiciel plus efficace lors de l'ouverture des fichiers .snote (ou .snotes, les deux sont valides).</div><div><br></div><div>Une interface plus agréable à utiliser est aussi au rendez-vous ! Le but est d'être efficace à 100% lors de la prise de notes 😁</div>")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,a)}l((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),i=n(8),s=n(9),a=n(1);t.default=class{constructor(){this.snoteDoc=new Promise(e=>{let t=o.$("body").child("input").change(()=>r(this,void 0,void 0,function*(){const n=new s.default,r=t.get(0).files[0],o=r.name.split(".").reverse()[0];let l;if("pdf"==o)l=yield(new i.default).load(r);else if("snote"==o||"snotes"==o){const t=JSON.parse(yield this.readFilebAsText(r));return a.default()&&(t.file_path=r.path),n.destroy(),e(t)}const d={type:"snote",version:3,pages:[],author:"snote"};l.forEach(e=>{d.pages.push({image:e,objects:[],htmlContent:""})}),n.destroy(),e(d)})).attr("type","file").click()})}readFilebAsText(e){const t=new FileReader;return new Promise(n=>{t.addEventListener("loadend",e=>{n(e.srcElement.result)}),t.readAsText(e)})}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,a)}l((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});t.default=class{load(e){const t=window.XPDF,n=URL.createObjectURL(e);return new Promise(o=>r(this,void 0,void 0,function*(){if("pdf"!=e.name.split(".").reverse()[0])throw"Erreur lors du chargement : ce fichier n'est pas un PDF";const r=yield t.getDocument({url:n}),i=[];for(let e=0;e<r.numPages;e++){const t=yield r.getPage(e+1),n=document.createElement("canvas"),o=n.getContext("2d"),s=t.getViewport(1.5);n.setAttribute("width",s.width),n.setAttribute("height",s.height),yield t.render({canvasContext:o,viewport:s}),i.push(n.width+"x"+n.height+"///"+n.toDataURL()),n.remove()}o(i)}))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);t.default=class{constructor(){this.loader=r.$("body").child("div").addClass("loader");const e=this.loader.child("div").addClass("gooey");e.child("span").addClass("dot");const t=e.child("div").addClass("dots");t.child("span"),t.child("span"),t.child("span")}destroy(){this.loader.remove()}}},function(e,t,n){var r=n(11);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,"body,html{margin:0;padding:0;height:100vh;width:100vw;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif}.rich-textarea{z-index:85;right:0;width:50vw;border-left:1px solid #d7d7d7}.rich-textarea,.workspace{position:absolute;top:0;bottom:0;height:100vh}.workspace{z-index:90;background:#fff;left:0;width:calc(50vw - 1px)}.workspace .flip{background:#fff;position:absolute;top:50%;right:0;transform:translate(50%,-50%);border:1px solid #d7d7d7;padding:2px;padding-top:5px;padding-bottom:5px;border-radius:4px;cursor:col-resize;opacity:0;transition:.75s}.workspace .flip i{vertical-align:middle}.workspace .flip:hover{opacity:1}.workspace .controls{user-select:none;background:#f2f2f2;padding:12px;height:30px;position:absolute;top:0;right:0;left:0;border-bottom:1px solid #d7d7d7}.workspace .controls .material-icons{display:inline-block;height:30px;line-height:30px;vertical-align:middle;color:#565656;padding-left:7px;padding-right:7px;cursor:pointer}.workspace .controls select{border:1px solid #c5c5c5;color:#3c3c3c}.workspace .slides{position:absolute;top:55px;left:0;right:0;bottom:55px;overflow:auto;padding:5px}.workspace .slides>img{width:100%}.workspace .slides .welcome-wrapper{position:absolute;text-align:center;top:50%;left:50%;transform:translate(-50%,-50%);width:50%;color:#565656}.workspace .slides .welcome-wrapper img{display:block;position:relative;width:400px;max-width:80%;margin:auto;margin-bottom:35px}.workspace .slides_switcher{position:absolute;bottom:5px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;border-radius:4px;user-select:none}.workspace .slides_switcher span{vertical-align:middle;display:inline-block;line-height:30px;padding:8px}.workspace .slides_switcher span.current_page{font-size:18px}.workspace .slides_switcher span.next,.workspace .slides_switcher span.previous{cursor:pointer}.loader{position:fixed;top:0;right:0;bottom:0;left:0;background:#fff;z-index:98}.loader .gooey{position:absolute;top:50%;left:50%;width:142px;height:40px;margin:-20px 0 0 -71px;background:#fff;filter:contrast(20)}.loader .gooey .dot{position:absolute;width:16px;height:16px;top:12px;left:15px;filter:blur(4px);background:#000;border-radius:50%;transform:translateX(0);animation:dot 2.8s infinite}.loader .gooey .dots{transform:translateX(0);margin-top:12px;margin-left:31px;animation:dots 2.8s infinite}.loader .gooey .dots span{display:block;float:left;width:16px;height:16px;margin-left:16px;filter:blur(4px);background:#000;border-radius:50%}@-moz-keyframes dot{50%{transform:translateX(96px)}}@-webkit-keyframes dot{50%{transform:translateX(96px)}}@-o-keyframes dot{50%{transform:translateX(96px)}}@keyframes dot{50%{transform:translateX(96px)}}@-moz-keyframes dots{50%{transform:translateX(-31px)}}@-webkit-keyframes dots{50%{transform:translateX(-31px)}}@-o-keyframes dots{50%{transform:translateX(-31px)}}@keyframes dots{50%{transform:translateX(-31px)}}",""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(4),o=n(0),i=n(6);t.default=class{constructor(e){if(this.doc=e,e.pages.length<1)throw alert("Document non valide !"),"Erreur document";switch(e.version){case 3:e.pages.forEach(e=>{const t=e.image.split("///");e.richTextBox=new r.default(e.htmlContent),e.imageBox=o.$(".slides").child("img"),t.splice(0,1),e.imageBox.attr("src",t.join("///"))}),o.$(".slides_switcher").remove();let t=0;const n=o.$(".workspace").child("div").addClass("slides_switcher"),s=n.child("span").addClass("previous").addClass("material-icons").text("arrow_back"),a=n.child("span").addClass("current_page"),l=()=>{a.text(`Page ${t+1}/${e.pages.length}`),e.pages.forEach((e,n)=>{t==n?(e.richTextBox.show(),e.imageBox.css("display","block")):(e.richTextBox.hide(),e.imageBox.css("display","none"))})};l(),s.click(()=>{--t<0&&(t=0),l()}),n.child("span").addClass("next").addClass("material-icons").text("arrow_forward").click(()=>{++t>e.pages.length-1&&(t=e.pages.length-1),l()}),o.$(".welcome-wrapper").css("display","none"),i.updateSize();break;default:alert("Cette version n'est pas (ou plus) prise en charge.")}}save(){return this.doc.pages.forEach(e=>{e.htmlContent=e.richTextBox.html}),this.doc}}},function(e,t,n){var r=n(15);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".matrix{display:inline-block;background:#eee;vertical-align:middle;position:relative}.matrix table{display:inline-table;vertical-align:top}.matrix table td{background:#fff}.rich-textarea .controls{user-select:none;background:#f2f2f2;padding:12px;height:30px;position:absolute;top:0;right:0;left:0;border-bottom:1px solid #d7d7d7}.rich-textarea .controls .material-icons{display:inline-block;height:30px;line-height:30px;vertical-align:middle;color:#565656;padding-left:7px;padding-right:7px;cursor:pointer}.rich-textarea .controls select{border:1px solid #c5c5c5;color:#3c3c3c}.rich-textarea .text{outline:none;position:absolute;top:55px;right:0;left:0;bottom:0;padding:25px;overflow:auto;background:#fff}",""])},function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.saveJSONAsFile=(r=document.createElement("a"),document.body.appendChild(r),r.style.display="none",function(e,t){var n=JSON.stringify(e),o=new Blob([n],{type:"octet/stream"}),i=window.URL.createObjectURL(o);r.href=i,r.download=t,r.click(),window.URL.revokeObjectURL(i)})}]);