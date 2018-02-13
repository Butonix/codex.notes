var codex=codex||{};codex.notes=function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=11)}([function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=function(){function e(){r(this,e)}return i(e,null,[{key:"make",value:function(e,t,n){var r=document.createElement(e);if(Array.isArray(t)){var i;(i=r.classList).add.apply(i,o(t))}else t&&r.classList.add(t);for(var a in n)r[a]=n[a];return r}},{key:"append",value:function(e,t){Array.isArray(t)?t.forEach(function(t){return e.appendChild(t)}):e.appendChild(t)}},{key:"replace",value:function(e,t){return e.parentNode.replaceChild(t,e)}},{key:"get",value:function(e){return document.getElementById(e)}},{key:"loadResource",value:function(e,t,n){return new Promise(function(o,r){e&&["JS","CSS"].includes(e)||r("Unexpected resource type passed. «CSS» or «JS» expected, «"+e+"» passed");var i=void 0;n?document.getElementById("cdx-resourse-"+e.toLowerCase()+"-"+n)&&o(t):r("Instance name is missed"),"JS"===e?(i=document.createElement("script"),i.async=!0,i.defer=!0,i.charset="utf-8"):(i=document.createElement("link"),i.rel="stylesheet"),i.id="cdx-resourse-"+e.toLowerCase()+"-"+n;var a="Resource loading "+e+" "+n;console.time(a),i.onload=function(){console.timeEnd(a),o(t)},i.onerror=function(){console.timeEnd(a),r(t)},"JS"===e?i.src=t:i.href=t,document.head.appendChild(i)})}},{key:"after",value:function(e,t){t.insertAdjacentElement("afterEnd",e)}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(3).remote,a=function(){function e(){o(this,e)}return r(e,null,[{key:"confirm",value:function(e){var t=i.getCurrentWindow();return t.setSheetOffset(30,t.width/2),0===i.dialog.showMessageBox(t,{type:"question",buttons:["Yes","No"],title:"Confirm",message:e})}},{key:"error",value:function(e){var t=i.getCurrentWindow();t.setSheetOffset(30,t.width/2),i.dialog.showMessageBox(t,{type:"error",title:"Wow. Something goes wrong.",message:e})}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0).default,a=n(13).default,s=n(1).default,l=n(16).default,u=function(){function e(){o(this,e),this.deleteButton=i.get("delete-button"),this.titleEl=document.getElementById("note-title"),this.dateEl=document.getElementById("note-date"),this.showSavedIndicatorTimer=null,this.autoresizedTitle||(this.autoresizedTitle=new a([this.titleEl])),this.shortcuts=[]}return r(e,[{key:"save",value:function(){var e=this;this.deleteButton.classList.remove("hide");var t=codex.notes.aside.currentFolder?codex.notes.aside.currentFolder.id:null;codex.editor.saver.save().then(function(t){return e.validate(t),t}).then(function(n){var o={data:n,title:e.titleEl.value.trim(),folderId:t},r=document.getElementById("save-indicator");e.showSavedIndicatorTimer&&window.clearTimeout(e.showSavedIndicatorTimer),r.classList.add("saved"),e.showSavedIndicatorTimer=window.setTimeout(function(){r.classList.remove("saved")},500),window.ipcRenderer.send("note - save",{note:o})}).catch(function(e){console.log("Error while saving note: ",e)})}},{key:"validate",value:function(e){if(!e.items.length)throw Error("Article is empty")}},{key:"addToMenu",value:function(e){var t=e.note,n=e.isRootFolder;codex.editor.state.blocks.id=t._id,codex.notes.aside.addMenuItem(t,n)}},{key:"render",value:function(e){codex.editor.content.clear(!0),this.titleEl.value=e.title;var t=new Date(1e3*e.dtModify);this.dateEl.textContent=t.toLocaleDateString("en-US",{day:"numeric",month:"short",hour:"numeric",minute:"numeric",hour12:!1}),codex.editor.content.load({id:e._id,items:JSON.parse(e.content),time:e.dtModify,version:e.editorVersion}),this.deleteButton.classList.remove("hide"),this.autoresizedTitle&&this.autoresizedTitle.destroy(),this.autoresizedTitle=new a([this.titleEl]);var n=new l({name:"CMD+A",on:codex.editor.nodes.redactor,callback:function(e){e.preventDefault(),e.stopImmediatePropagation();var t=document.createRange(),n=window.getSelection();t.selectNodeContents(codex.editor.nodes.redactor),n.removeAllRanges(),n.addRange(t)}});this.shortcuts.push(n)}},{key:"clear",value:function(){codex.editor.content.clear(!0),this.titleEl.value="",this.dateEl.textContent="",codex.editor.ui.addInitialBlock(),this.deleteButton.classList.add("hide"),this.autoresizedTitle.destroy(),this.shortcuts.forEach(function(e){e.remove()})}},{key:"delete",value:function(){var e=codex.editor.state.blocks.id;if(e&&s.confirm("Are you sure you want to delete this note?")){if(!window.ipcRenderer.sendSync("note - delete",{id:e}))return!1;codex.notes.aside.removeMenuItem(e),this.clear()}}},{key:"titleKeydownHandler",value:function(t,n){13==n.keyCode&&(n.preventDefault(),e.focusEditor())}}],[{key:"focusEditor",value:function(){window.setTimeout(function(){document.querySelector(".ce-redactor").click()},10)}}]),e}();t.default=u},function(e,t){e.exports=require("electron")},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(15),s=o(a),l=n(2),u=o(l),d=n(14),c=o(d),f=n(12).default,h=n(0).default,v=function(){function e(){var t=this;r(this,e),this.CSS={notesMenuLoading:"notes-list--loading"};var n=document.querySelector('[name="js-notes-menu"]'),o=document.querySelector('[name="js-folders-menu"]');this.swiper=new f({opened:function(){return t.folderOpened()},closed:function(){return t.folderClosed()}}),this.currentFolder=null,this.previouslyOpenedFolder=null,n.classList.add(this.CSS.notesMenuLoading),o.classList.add(this.CSS.notesMenuLoading),this.loadNotes(),this.loadFolders(),window.ipcRenderer.on("update folders list",function(e,n){var r=n.userFolders;o.classList.remove(t.CSS.notesMenuLoading),o.innerHTML="",r.forEach(function(e){return t.addFolder(e)})}),window.ipcRenderer.on("notes list - update",function(e,o){var r=o.notes,i=o.isRootFolder;n.classList.remove(t.CSS.notesMenuLoading),r.forEach(function(e){return t.addMenuItem(e,i)})}),document.querySelectorAll('[name="js-new-note-button"]').forEach(function(e){e.addEventListener("click",function(){return t.newNoteButtonClicked(e)})}),this.newFolderButton=document.querySelector('[name="js-new-folder-button"]'),this.newFolderField=document.querySelector('[name="js-new-folder-field"]');var i=this.newFolderField.querySelector("input");this.newFolderButton.addEventListener("click",function(e){return t.newFolderButtonClicked(e)}),i.addEventListener("keydown",function(e){return t.newFolderInputFilled(e)}),h.get("folder-close-zone").addEventListener("click",function(){t.closeFolder()}),this.activateScrollableGradient(),this.folderSettings=new c.default}return i(e,[{key:"loadNotes",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new Promise(function(t){t(window.ipcRenderer.sendSync("notes list - load",e))}).catch(function(e){console.log("Error while loading notes: ",e)})}},{key:"loadFolders",value:function(){window.ipcRenderer.send("folders list - load")}},{key:"newNoteButtonClicked",value:function(){u.default.focusEditor(),codex.notes.note.clear()}},{key:"newFolderButtonClicked",value:function(e){var t=e.target,n=this.newFolderField.querySelector("input");t.classList.add("hide"),this.newFolderField.classList.remove("hide"),n.focus()}},{key:"newFolderInputFilled",value:function(e){if("Enter"===e.key){var t=e.target,n=t.value.trim();if(n){var o=window.ipcRenderer.sendSync("folder - create",n);this.addFolder(o),t.value="",this.newFolderField.classList.add("hide"),this.newFolderButton.classList.remove("hide")}}}},{key:"addMenuItem",value:function(e,t){var n=this;if(!e.title)return void console.warn("Can not add Note to the Aside because it has no title",e);codex.notes.searcher.pushData(e);var o=void 0;if(t)o=document.querySelector('[name="js-notes-menu"]');else{if(!this.currentFolder||e.folderId!==this.currentFolder._id)return void console.log("Note added to closed folder: %o",e.folderId);o=document.querySelector('[name="js-folder-notes-menu"]')}var r=o.querySelector('[data-id="'+e._id+'"]');if(r)return void(r.textContent=this.createMenuItemTitle(e.title));var i=this.makeMenuItem(e.title,{id:e._id});o.insertAdjacentElement("afterbegin",i),i.addEventListener("click",function(e){return n.menuItemClicked(e)})}},{key:"addFolder",value:function(e){var t=this;if(!e.title)return void console.warn("Can not add Folder to the Aside because it has no title",e);var n=document.querySelector('[name="js-folders-menu"]'),o=this.makeMenuItem(e.title,{folderId:e._id});n.insertAdjacentElement("afterbegin",o),o.addEventListener("click",function(e){return t.folderClicked(e.target)})}},{key:"makeMenuItem",value:function(e,t){e=this.createMenuItemTitle(e);var n=h.make("li",null,{textContent:e});for(var o in t)n.dataset[o]=t[o];return n}},{key:"createMenuItemTitle",value:function(e){return e.length>68&&(e=e.substring(0,68)+"…"),e}},{key:"removeMenuItem",value:function(e){document.querySelectorAll('[name="js-notes-menu"], [name="js-folder-notes-menu"]').forEach(function(t){var n=t.querySelector('[data-id="'+e+'"]');n&&(n.remove(),codex.notes.searcher.removeData(e))})}},{key:"removeFolderFromMenu",value:function(e){var t=document.querySelector('[name="js-folders-menu"]');if(!t)return!1;var n=t.querySelector('[data-folder-id="'+e+'"]');n&&n.remove()}},{key:"updateFolderTitleInMenu",value:function(e,t){var n=document.querySelector('[name="js-folders-menu"]');if(!n)return!1;var o=n.querySelector('[data-folder-id="'+e+'"]');o&&(o.textContent=t)}},{key:"menuItemClicked",value:function(e){var t=e.target,n=t.dataset.id,o=window.ipcRenderer.sendSync("note - get",{id:n});codex.notes.note.render(o),document.querySelector('[name="editor-view"]').scrollIntoView()}},{key:"folderOpened",value:function(){!this.currentFolder&&this.previouslyOpenedFolder&&(this.currentFolder=new s.default(this.previouslyOpenedFolder)),console.assert(this.currentFolder,"Folder opened but does not initialized"),codex.notes.note.clear()}},{key:"folderClosed",value:function(){this.currentFolder&&(this.previouslyOpenedFolder=this.currentFolder.id),this.currentFolder=null}},{key:"folderClicked",value:function(e){var t=e.dataset.folderId;this.currentFolder=new s.default(t,e.textContent),this.swiper.open()}},{key:"closeFolder",value:function(){this.swiper.close()}},{key:"activateScrollableGradient",value:function(){var e=function(e){var t=e.target,n=e.target.parentNode;t.scrollTop>5?n.classList.add("aside__scrollable--scrolled"):n.classList.remove("aside__scrollable--scrolled")};document.querySelectorAll('[name="js-scrollable"]').forEach(function(t){t.addEventListener("scroll",e)})}}]),e}();t.default=v},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){var t=this;o(this,e),window.navigator.onLine?this.online():this.offline(),window.addEventListener("online",function(){t.online()}),window.addEventListener("offline",function(){t.offline()})}return r(e,[{key:"online",value:function(){codex.notes.statusBar.text="Syncing",codex.notes.statusBar.loading=!0,this.sync().then(function(){codex.notes.statusBar.text="All saved",codex.notes.statusBar.loading=!1})}},{key:"sync",value:function(){return new Promise(function(e){console.time("Syncing..."),window.ipcRenderer.send("user - sync"),window.ipcRenderer.once("sync finished",function(t,n){console.timeEnd("Syncing..."),e(n)})})}},{key:"offline",value:function(){codex.notes.statusBar.text="Offline",this.reconnect()}},{key:"reconnect",value:function(){codex.notes.statusBar.text="Reconnection",codex.notes.statusBar.loading=!0}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0).default,a=function(){function e(){var t=this;o(this,e),this.path="../../public/codex.editor/",this.plugins=["paragraph","header"],this.autosaveTimer=null,this.loadEditor().then(function(){return t.loadPlugins()}).then(function(){return t.init()})}return r(e,[{key:"loadEditor",value:function(){return Promise.all([i.loadResource("JS",this.path+"codex-editor.js","codex-editor"),i.loadResource("CSS",this.path+"codex-editor.css","codex-editor")]).catch(function(e){return console.warn("Cannot load Codex Editor sources: ",e)}).then(function(){return console.log("CodeX Editor loaded")})}},{key:"loadPlugins",value:function(){var e=this,t=[];return this.plugins.forEach(function(n){t.push.apply(t,[i.loadResource("JS",e.path+"plugins/"+n+"/"+n+".js",n),i.loadResource("CSS",e.path+"plugins/"+n+"/"+n+".css",n)])}),Promise.all(t).catch(function(e){return console.warn("Cannot load plugin: ",e)}).then(function(){return console.log("Plugins loaded")})}},{key:"init",value:function(){var e=this,t={holderId:"codex-editor",initialBlockPlugin:"paragraph",hideToolbar:!1,placeholder:"Your story",tools:{}};this.plugins.forEach(function(e){if(!window[e])return void console.warn("Plugin "+e+" does not ready");t.tools[e]={type:e,iconClassname:"ce-icon-"+e,render:window[e].render,validate:window[e].validate,save:window[e].save,destroy:window[e].destroy,makeSettings:window[e].makeSettings}}),t.tools.paragraph&&(t.tools.paragraph.allowedToPaste=!0,t.tools.paragraph.showInlineToolbar=!0,t.tools.paragraph.allowRenderOnPaste=!0),t.tools.header&&(t.tools.header.displayInToolbox=!0),codex.editor.start(t),window.setTimeout(function(){e.enableAutosave()},500)}},{key:"autosave",value:function(){this.autosaveTimer&&window.clearTimeout(this.autosaveTimer),this.autosaveTimer=window.setTimeout(function(){codex.notes.note.save()},500)}},{key:"enableAutosave",value:function(){document.getElementById("note-title").addEventListener("keyup",this.autosave.bind(this)),codex.editor.nodes.redactor.addEventListener("keyup",this.autosave.bind(this))}},{key:"disableAutosave",value:function(){codex.editor.nodes.redactor.removeEventListener("keyup",this.autosave.bind(this))}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){var t=this;o(this,e),this.DOM={input:document.getElementsByClassName("searcher__input")[0],foldersContainer:document.getElementsByName("js-folders-container")[0],notes:{created:document.getElementsByName("js-notes-menu")[0],found:document.getElementsByName("js-found-notes-menu")[0]}},this.dataset=[],this.found=[],this.DOM.input.addEventListener("keyup",function(){t.search(t.DOM.input.value)})}return r(e,[{key:"pushData",value:function(e){var t=this.dataset.length;this.dataset.forEach(function(n,o){if(n._id==e._id)return void(t=o)}),this.dataset.splice(t,1,e)}},{key:"removeData",value:function(e){var t=this.dataset.length;this.dataset.forEach(function(n,o){if(n._id==e)return void(t=o)}),this.dataset.splice(t,1)}},{key:"search",value:function(e){var t=[];this.dataset.forEach(function(n){0==n.title.indexOf(e)&&t.push(n)}),console.log(t)}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(){function e(){o(this,e),this.statusBar=a.default.get("status-bar")}return r(e,[{key:"text",set:function(t){var n=this;this.statusBar.textContent=t,this.statusBar.classList.add(e.CSS.blinked),window.setTimeout(function(){n.statusBar.classList.remove(e.CSS.blinked)},400)},get:function(){return this.statusBar.textContent}},{key:"loading",set:function(t){this.statusBar.classList.toggle(e.CSS.loading,t)}}],[{key:"CSS",get:function(){return{blinked:"status-bar--blinked",loading:"status-bar--loading"}}}]),e}();t.default=s},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(0),s=o(a),l=n(1),u=o(l),d=function(){function e(){var t=this;r(this,e),this.authButton=document.getElementById("js-auth-button");var n=window.ipcRenderer.sendSync("user - get");this.fillUserPanel(n),this.authButton.addEventListener("click",function(){t.showAuth()})}return i(e,[{key:"showAuth",value:function(){var e=window.ipcRenderer.sendSync("auth - google auth");e&&e.token?(this.fillUserPanel(e),window.ipcRenderer.send("user - sync")):u.default.error("Authentication failed. Please, try again.")}},{key:"fillUserPanel",value:function(e){if(e.name){var t=s.default.get("user-panel"),n=s.default.get("user-photo");t.classList.add("aside__header-avatar--filled"),n.style.backgroundImage="url("+e.photo+")"}}}]),e}();t.default=d},function(e,t){},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(9),i=o(r),a=n(8),s=o(a),l=n(5),u=o(l),d=n(3),c=n(6).default,f=n(4).default,h=n(2).default,v=n(7).default;window.ipcRenderer=d.ipcRenderer,d.webFrame.setZoomLevelLimits(1,1),n(10);var y=function(){codex.notes.editor=new c,codex.notes.aside=new f,codex.notes.note=new h,codex.notes.user=new i.default,codex.notes.statusBar=new s.default,codex.notes.connectionObserver=new u.default,codex.notes.searcher=new v,window.ipcRenderer.on("note saved",function(e,t){codex.notes.note.addToMenu(t)})},m=function(e){if("A"===e.target.tagName&&e.target.href)return e.target.closest(".editor")?void((e.metaKey||e.ctrlKey)&&d.shell.openExternal(e.target.href)):void d.shell.openExternal(e.target.href)};e.exports=function(){return document.addEventListener("DOMContentLoaded",y,!1),document.addEventListener("click",m),{}}()},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(17).default,a=function(){function e(t){var n=this,r=t.opened,a=t.closed;o(this,e),this.CSS={wrapper:"aside-swiper",toggled:"aside-swiper--toggled",left:"aside-swiper__left",right:"aside-swiper__right"},this.wrapper=document.querySelector("."+this.CSS.wrapper),this.left=this.wrapper.querySelector("."+this.CSS.left),this.right=this.wrapper.querySelector("."+this.CSS.right),this.opened=r||function(){},this.closed=a||function(){},new i(this.wrapper,function(e){e?n.open():n.close()})}return r(e,[{key:"open",value:function(){this.wrapper.classList.add(this.CSS.toggled),this.opened()}},{key:"close",value:function(){this.wrapper.classList.remove(this.CSS.toggled),this.closed()}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t){o(this,e),this.elements=t||[];for(var n=0;n<this.elements.length;n++)this.addResizer(this.elements[n])}return r(e,[{key:"addResizer",value:function(e){e.value.trim()?e.style.height=e.scrollHeight+"px":e.style.height="auto",e.addEventListener("keydown",this.enterKeyPressed,!1),e.addEventListener("input",this.resize.bind(this,e),!1)}},{key:"enterKeyPressed",value:function(e){13===e.keyCode&&e.preventDefault()}},{key:"resize",value:function(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}},{key:"removeResizer",value:function(e){e.removeEventListener("keydown",this.enterKeyPressed),e.removeEventListener("input",this.resize)}},{key:"destroy",value:function(){for(var e=0;e<this.elements.length;e++)this.removeResizer(this.elements[e]),this.elements[e].style.height="auto";this.elements=[]}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(1).default,a=n(0).default,s=n(18).default,l=function(){function e(){var t=this;o(this,e),this.toggler=a.get("js-folder-settings-toggler"),this.closeButton=a.get("js-close-folder"),this.removeFolderButton=a.get("js-delete-folder"),this.folderTitleInput=document.getElementsByName("folder-title")[0],this.newMemberInput=document.getElementsByName("new-member")[0],this.membersList=a.get("js-members-list"),this.toggler.addEventListener("click",function(){t.toggle()}),this.closeButton.addEventListener("click",function(){t.close()}),this.removeFolderButton.addEventListener("click",function(){t.removeFolderClicked()}),this.folderTitleInput.addEventListener("keydown",function(e){return t.changeTitleKeydown(e)}),this.newMemberInput.addEventListener("keydown",function(e){return t.inviteMemberKeydown(e)})}return r(e,[{key:"open",value:function(){document.body.classList.add(e.CSS.panelOpenedModifier),this.opened=!0,this.folderTitleInput.value=codex.notes.aside.currentFolder.title||""}},{key:"close",value:function(){document.body.classList.remove(e.CSS.panelOpenedModifier),this.opened=!1}},{key:"toggle",value:function(){this.opened?this.close():this.open()}},{key:"removeFolderClicked",value:function(){console.assert(codex.notes.aside.currentFolder,"Cannot remove Folder because it is not open"),codex.notes.aside.currentFolder.delete()&&(this.close(),codex.notes.aside.closeFolder())}},{key:"changeTitleKeydown",value:function(e){if("Enter"===e.key){var t=e.target,n=t.value.trim(),o=codex.notes.aside.currentFolder._id;if(n){if(!window.ipcRenderer.sendSync("folder - change title",{id:o,title:n}))return i.error("Folder renaming failed. Please, try again."),!1;codex.notes.aside.currentFolder.title=n,this.close()}}}},{key:"inviteMemberKeydown",value:function(e){if("Enter"===e.key){var t=e.target,n=t.value.trim(),o=codex.notes.aside.currentFolder._id;if(n&&s.email(n)){if(!window.ipcRenderer.sendSync("folder - collaborator add",{id:o,email:n}))return i.error("Error while adding a collaborator to the folder"),!1;t.value="";var r=a.make("P",[],{innerHTML:n});a.append(this.membersList,r)}}}}],[{key:"CSS",get:function(){return{panelOpenedModifier:"folder-settings-opened"}}}]),e}();t.default=l},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0).default,a=n(1).default,s=function(){function e(t,n){var r=this;o(this,e),this._id=t,this._title=n,this.folderTitleElement=i.get("js-folder-title");var a=window.ipcRenderer.sendSync("folder - get",this._id);this.title=a.title,codex.notes.aside.loadNotes(t).then(function(e){var t=e.notes;r.notes=t}).then(function(){return r.clearNotesList()}),this.notesListWrapper=document.querySelector('[name="js-folder-notes-menu"]')}return r(e,[{key:"fillHeader",value:function(){this.folderTitleElement.textContent=this._title}},{key:"clearNotesList",value:function(){this.notesListWrapper.innerHTML=""}},{key:"delete",value:function(){return a.confirm("Are you sure you want to delete this folder?")&&window.ipcRenderer.sendSync("folder - delete",this._id)?(codex.notes.aside.removeFolderFromMenu(this._id),codex.notes.note.clear(),!0):(a.error("Folder removing failed"),!1)}},{key:"id",get:function(){return this._id}},{key:"title",get:function(){return this._title},set:function(e){this._title=e,this.fillHeader(),codex.notes.aside.updateFolderTitleInMenu(this._id,this._title)}}]),e}();t.default=s},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i={0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,BACKSPACE:8,ENTER:13,ESCAPE:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46},a={CMD:["CMD","CONTROL","COMMAND","WINDOWS","CTRL"],SHIFT:["SHIFT"],ALT:["ALT","OPTION"]},s=function(){function e(t){var n=this;o(this,e),this.commands={},this.keys={},this.parseShortcutName(t.name),this.element=t.on,this.callback=t.callback,this.executeShortcut=function(e){n.execute(e)},this.element.addEventListener("keydown",this.executeShortcut,!1)}return r(e,[{key:"parseShortcutName",value:function(e){e=e.split("+");for(var t=0;t<e.length;t++)if(e[t]=e[t].toUpperCase(),e[t].length>1)for(var n in a)a[n].includes(e[t])&&(this.commands[n]=!0);else this.keys[e[t]]=!0}},{key:"execute",value:function(e){var t=e.ctrlKey||e.metaKey,n=e.shiftKey,o=e.altKey,r={CMD:t,SHIFT:n,ALT:o},a=void 0,s=!0;for(a in this.commands)s=s&&r[a];var l=void 0,u=!0;for(l in this.keys)u=u&&e.keyCode===i[l];s&&u&&this.callback.call(null,e)}},{key:"remove",value:function(){this.element.removeEventListener("keydown",this.executeShortcut)}}]),e}();t.default=s},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t,n){var r=this;o(this,e),this.el=t,this.callback=n,this.swiped=!1,this.wheelTimeout=null,this.el.addEventListener("mousewheel",function(e){r.detectSwipe(e)})}return r(e,[{key:"detectSwipe",value:function(e){var t=this,n=0===e.wheelDeltaY,o=e.wheelDeltaX>30||e.wheelDeltaX<-30;n&&o&&(this.swiped||(this.swiped=!0,this.callback(e.deltaX>0),this.wheelTimeout=window.setTimeout(function(){t.swiped=!1},1e3)))}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){o(this,e)}return r(e,null,[{key:"email",value:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}}]),e}();t.default=i}]);