var app=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t){},function(e,t){e.exports=require("electron")},function(e,t,n){"use strict";n(1).webFrame.setZoomLevelLimits(1,1),e.exports=function(){function e(e){r.saver.saveBlocks(),window.setTimeout(t.bind(null,e),1e3)}function t(e){var t=new FormData;t.append("json",JSON.stringify({items:r.state.jsonOutput})),e&&t.append("id",e),r.core.ajax({url:"/save",data:t,type:"POST",success:function(){},error:function(){}})}var r=codex.editor;return n(0),{saveArticle:e}}()}]);