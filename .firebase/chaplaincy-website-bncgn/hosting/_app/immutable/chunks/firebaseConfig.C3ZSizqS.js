import{r as Yt,L as qc,_ as Rs,C as Ps,F as Ss,a as it,b as rr,d as Vs,e as Cs,f as bt,h as Jo,S as Zo,i as jc,j as qn,k as $c,l as zc,m as $i,n as Gc,g as Kc}from"./index-219c3cac.BQwdOHZI.js";var Qc="firebase",Wc="10.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yt(Qc,Wc,"app");var Hc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},_,Ds=Ds||{},A=Hc||self;function sr(e){var t=typeof e;return t=t!="object"?t:e?Array.isArray(e)?"array":t:"null",t=="array"||t=="object"&&typeof e.length=="number"}function cn(e){var t=typeof e;return t=="object"&&e!=null||t=="function"}function Xc(e){return Object.prototype.hasOwnProperty.call(e,Mr)&&e[Mr]||(e[Mr]=++Yc)}var Mr="closure_uid_"+(1e9*Math.random()>>>0),Yc=0;function Jc(e,t,n){return e.call.apply(e.bind,arguments)}function Zc(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),e.apply(t,s)}}return function(){return e.apply(t,arguments)}}function rt(e,t,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?rt=Jc:rt=Zc,rt.apply(null,arguments)}function Sn(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),e.apply(this,r)}}function W(e,t){function n(){}n.prototype=t.prototype,e.$=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.ac=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return t.prototype[s].apply(r,o)}}function Bt(){this.s=this.s,this.o=this.o}var tl=0;Bt.prototype.s=!1;Bt.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),tl!=0)&&Xc(this)};Bt.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const ta=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if(typeof e=="string")return typeof t!="string"||t.length!=1?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1};function ks(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function zi(e,t){for(let n=1;n<arguments.length;n++){const r=arguments[n];if(sr(r)){const s=e.length||0,i=r.length||0;e.length=s+i;for(let o=0;o<i;o++)e[s+o]=r[o]}else e.push(r)}}function st(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}st.prototype.h=function(){this.defaultPrevented=!0};var el=function(){if(!A.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const n=()=>{};A.addEventListener("test",n,t),A.removeEventListener("test",n,t)}catch{}return e}();function Qe(e){return/^[\s\xa0]*$/.test(e)}function ir(){var e=A.navigator;return e&&(e=e.userAgent)?e:""}function Et(e){return ir().indexOf(e)!=-1}function Ns(e){return Ns[" "](e),e}Ns[" "]=function(){};function nl(e,t){var n=Wl;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}var rl=Et("Opera"),ge=Et("Trident")||Et("MSIE"),ea=Et("Edge"),Yr=ea||ge,na=Et("Gecko")&&!(ir().toLowerCase().indexOf("webkit")!=-1&&!Et("Edge"))&&!(Et("Trident")||Et("MSIE"))&&!Et("Edge"),sl=ir().toLowerCase().indexOf("webkit")!=-1&&!Et("Edge");function ra(){var e=A.document;return e?e.documentMode:void 0}var Jr;t:{var Fr="",Ur=function(){var e=ir();if(na)return/rv:([^\);]+)(\)|;)/.exec(e);if(ea)return/Edge\/([\d\.]+)/.exec(e);if(ge)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e);if(sl)return/WebKit\/(\S+)/.exec(e);if(rl)return/(?:Version)[ \/]?(\S+)/.exec(e)}();if(Ur&&(Fr=Ur?Ur[1]:""),ge){var Br=ra();if(Br!=null&&Br>parseFloat(Fr)){Jr=String(Br);break t}}Jr=Fr}var Zr;if(A.document&&ge){var Gi=ra();Zr=Gi||parseInt(Jr,10)||void 0}else Zr=void 0;var il=Zr;function We(e,t){if(st.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(na){t:{try{Ns(t.nodeName);var s=!0;break t}catch{}s=!1}s||(t=null)}}else n=="mouseover"?t=e.fromElement:n=="mouseout"&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=e.clientX!==void 0?e.clientX:e.pageX,this.clientY=e.clientY!==void 0?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=typeof e.pointerType=="string"?e.pointerType:ol[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&We.$.h.call(this)}}W(We,st);var ol={2:"touch",3:"pen",4:"mouse"};We.prototype.h=function(){We.$.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var ln="closure_listenable_"+(1e6*Math.random()|0),al=0;function ul(e,t,n,r,s){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.la=s,this.key=++al,this.fa=this.ia=!1}function or(e){e.fa=!0,e.listener=null,e.proxy=null,e.src=null,e.la=null}function bs(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function cl(e,t){for(const n in e)t.call(void 0,e[n],n,e)}function sa(e){const t={};for(const n in e)t[n]=e[n];return t}const Ki="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ia(e,t){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)e[n]=r[n];for(let i=0;i<Ki.length;i++)n=Ki[i],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function ar(e){this.src=e,this.g={},this.h=0}ar.prototype.add=function(e,t,n,r,s){var i=e.toString();e=this.g[i],e||(e=this.g[i]=[],this.h++);var o=es(e,t,r,s);return-1<o?(t=e[o],n||(t.ia=!1)):(t=new ul(t,this.src,i,!!r,s),t.ia=n,e.push(t)),t};function ts(e,t){var n=t.type;if(n in e.g){var r=e.g[n],s=ta(r,t),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(or(t),e.g[n].length==0&&(delete e.g[n],e.h--))}}function es(e,t,n,r){for(var s=0;s<e.length;++s){var i=e[s];if(!i.fa&&i.listener==t&&i.capture==!!n&&i.la==r)return s}return-1}var xs="closure_lm_"+(1e6*Math.random()|0),qr={};function oa(e,t,n,r,s){if(r&&r.once)return ua(e,t,n,r,s);if(Array.isArray(t)){for(var i=0;i<t.length;i++)oa(e,t[i],n,r,s);return null}return n=Ms(n),e&&e[ln]?e.O(t,n,cn(r)?!!r.capture:!!r,s):aa(e,t,n,!1,r,s)}function aa(e,t,n,r,s,i){if(!t)throw Error("Invalid event type");var o=cn(s)?!!s.capture:!!s,a=Ls(e);if(a||(e[xs]=a=new ar(e)),n=a.add(t,n,r,o,i),n.proxy)return n;if(r=ll(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)el||(s=o),s===void 0&&(s=!1),e.addEventListener(t.toString(),r,s);else if(e.attachEvent)e.attachEvent(la(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function ll(){function e(n){return t.call(e.src,e.listener,n)}const t=hl;return e}function ua(e,t,n,r,s){if(Array.isArray(t)){for(var i=0;i<t.length;i++)ua(e,t[i],n,r,s);return null}return n=Ms(n),e&&e[ln]?e.P(t,n,cn(r)?!!r.capture:!!r,s):aa(e,t,n,!0,r,s)}function ca(e,t,n,r,s){if(Array.isArray(t))for(var i=0;i<t.length;i++)ca(e,t[i],n,r,s);else r=cn(r)?!!r.capture:!!r,n=Ms(n),e&&e[ln]?(e=e.i,t=String(t).toString(),t in e.g&&(i=e.g[t],n=es(i,n,r,s),-1<n&&(or(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete e.g[t],e.h--)))):e&&(e=Ls(e))&&(t=e.g[t.toString()],e=-1,t&&(e=es(t,n,r,s)),(n=-1<e?t[e]:null)&&Os(n))}function Os(e){if(typeof e!="number"&&e&&!e.fa){var t=e.src;if(t&&t[ln])ts(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(la(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=Ls(t))?(ts(n,e),n.h==0&&(n.src=null,t[xs]=null)):or(e)}}}function la(e){return e in qr?qr[e]:qr[e]="on"+e}function hl(e,t){if(e.fa)e=!0;else{t=new We(t,this);var n=e.listener,r=e.la||e.src;e.ia&&Os(e),e=n.call(r,t)}return e}function Ls(e){return e=e[xs],e instanceof ar?e:null}var jr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ms(e){return typeof e=="function"?e:(e[jr]||(e[jr]=function(t){return e.handleEvent(t)}),e[jr])}function Q(){Bt.call(this),this.i=new ar(this),this.S=this,this.J=null}W(Q,Bt);Q.prototype[ln]=!0;Q.prototype.removeEventListener=function(e,t,n,r){ca(this,e,t,n,r)};function J(e,t){var n,r=e.J;if(r)for(n=[];r;r=r.J)n.push(r);if(e=e.S,r=t.type||t,typeof t=="string")t=new st(t,e);else if(t instanceof st)t.target=t.target||e;else{var s=t;t=new st(r,e),ia(t,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=t.g=n[i];s=Vn(o,r,!0,t)&&s}if(o=t.g=e,s=Vn(o,r,!0,t)&&s,s=Vn(o,r,!1,t)&&s,n)for(i=0;i<n.length;i++)o=t.g=n[i],s=Vn(o,r,!1,t)&&s}Q.prototype.N=function(){if(Q.$.N.call(this),this.i){var e=this.i,t;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)or(n[r]);delete e.g[t],e.h--}}this.J=null};Q.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)};Q.prototype.P=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};function Vn(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var s=!0,i=0;i<t.length;++i){var o=t[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,u=o.la||o.src;o.ia&&ts(e.i,o),s=a.call(u,r)!==!1&&s}}return s&&!r.defaultPrevented}var Fs=A.JSON.stringify;class dl{constructor(t,n){this.i=t,this.j=n,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}function fl(){var e=Us;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class pl{constructor(){this.h=this.g=null}add(t,n){const r=ha.get();r.set(t,n),this.h?this.h.next=r:this.g=r,this.h=r}}var ha=new dl(()=>new ml,e=>e.reset());class ml{constructor(){this.next=this.g=this.h=null}set(t,n){this.h=t,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function gl(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function _l(e){A.setTimeout(()=>{throw e},0)}let He,Xe=!1,Us=new pl,da=()=>{const e=A.Promise.resolve(void 0);He=()=>{e.then(yl)}};var yl=()=>{for(var e;e=fl();){try{e.h.call(e.g)}catch(n){_l(n)}var t=ha;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}Xe=!1};function ur(e,t){Q.call(this),this.h=e||1,this.g=t||A,this.j=rt(this.qb,this),this.l=Date.now()}W(ur,Q);_=ur.prototype;_.ga=!1;_.T=null;_.qb=function(){if(this.ga){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-e):(this.T&&(this.g.clearTimeout(this.T),this.T=null),J(this,"tick"),this.ga&&(Bs(this),this.start()))}};_.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Bs(e){e.ga=!1,e.T&&(e.g.clearTimeout(e.T),e.T=null)}_.N=function(){ur.$.N.call(this),Bs(this),delete this.g};function qs(e,t,n){if(typeof e=="function")n&&(e=rt(e,n));else if(e&&typeof e.handleEvent=="function")e=rt(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:A.setTimeout(e,t||0)}function fa(e){e.g=qs(()=>{e.g=null,e.i&&(e.i=!1,fa(e))},e.j);const t=e.h;e.h=null,e.m.apply(null,t)}class Tl extends Bt{constructor(t,n){super(),this.m=t,this.j=n,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:fa(this)}N(){super.N(),this.g&&(A.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ye(e){Bt.call(this),this.h=e,this.g={}}W(Ye,Bt);var Qi=[];function pa(e,t,n,r){Array.isArray(n)||(n&&(Qi[0]=n.toString()),n=Qi);for(var s=0;s<n.length;s++){var i=oa(t,n[s],r||e.handleEvent,!1,e.h||e);if(!i)break;e.g[i.key]=i}}function ma(e){bs(e.g,function(t,n){this.g.hasOwnProperty(n)&&Os(t)},e),e.g={}}Ye.prototype.N=function(){Ye.$.N.call(this),ma(this)};Ye.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function cr(){this.g=!0}cr.prototype.Ea=function(){this.g=!1};function El(e,t,n,r,s,i){e.info(function(){if(e.g)if(i)for(var o="",a=i.split("&"),u=0;u<a.length;u++){var c=a[u].split("=");if(1<c.length){var l=c[0];c=c[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+c+"&"):o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+t+`
`+n+`
`+o})}function vl(e,t,n,r,s,i,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+t+`
`+n+`
`+i+" "+o})}function he(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+Il(e,n)+(r?" "+r:"")})}function wl(e,t){e.info(function(){return"TIMEOUT: "+t})}cr.prototype.info=function(){};function Il(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return Fs(n)}catch{return t}}var ne={},Wi=null;function lr(){return Wi=Wi||new Q}ne.Ta="serverreachability";function ga(e){st.call(this,ne.Ta,e)}W(ga,st);function Je(e){const t=lr();J(t,new ga(t))}ne.STAT_EVENT="statevent";function _a(e,t){st.call(this,ne.STAT_EVENT,e),this.stat=t}W(_a,st);function ut(e){const t=lr();J(t,new _a(t,e))}ne.Ua="timingevent";function ya(e,t){st.call(this,ne.Ua,e),this.size=t}W(ya,st);function hn(e,t){if(typeof e!="function")throw Error("Fn must not be null and must be a function");return A.setTimeout(function(){e()},t)}var hr={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Ta={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function js(){}js.prototype.h=null;function Hi(e){return e.h||(e.h=e.i())}function Ea(){}var dn={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function $s(){st.call(this,"d")}W($s,st);function zs(){st.call(this,"c")}W(zs,st);var ns;function dr(){}W(dr,js);dr.prototype.g=function(){return new XMLHttpRequest};dr.prototype.i=function(){return{}};ns=new dr;function fn(e,t,n,r){this.l=e,this.j=t,this.m=n,this.W=r||1,this.U=new Ye(this),this.P=Al,e=Yr?125:void 0,this.V=new ur(e),this.I=null,this.i=!1,this.u=this.B=this.A=this.L=this.G=this.Y=this.C=null,this.F=[],this.g=null,this.o=0,this.s=this.v=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new va}function va(){this.i=null,this.g="",this.h=!1}var Al=45e3,wa={},rs={};_=fn.prototype;_.setTimeout=function(e){this.P=e};function ss(e,t,n){e.L=1,e.A=pr(kt(t)),e.u=n,e.S=!0,Ia(e,null)}function Ia(e,t){e.G=Date.now(),pn(e),e.B=kt(e.A);var n=e.B,r=e.W;Array.isArray(r)||(r=[String(r)]),ka(n.i,"t",r),e.o=0,n=e.l.J,e.h=new va,e.g=Ja(e.l,n?t:null,!e.u),0<e.O&&(e.M=new Tl(rt(e.Pa,e,e.g),e.O)),pa(e.U,e.g,"readystatechange",e.nb),t=e.I?sa(e.I):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ha(e.B,e.v,e.u,t)):(e.v="GET",e.g.ha(e.B,e.v,null,t)),Je(),El(e.j,e.v,e.B,e.m,e.W,e.u)}_.nb=function(e){e=e.target;const t=this.M;t&&vt(e)==3?t.l():this.Pa(e)};_.Pa=function(e){try{if(e==this.g)t:{const l=vt(this.g);var t=this.g.Ia();const h=this.g.da();if(!(3>l)&&(l!=3||Yr||this.g&&(this.h.h||this.g.ja()||Zi(this.g)))){this.J||l!=4||t==7||(t==8||0>=h?Je(3):Je(2)),fr(this);var n=this.g.da();this.ca=n;e:if(Aa(this)){var r=Zi(this.g);e="";var s=r.length,i=vt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Gt(this),Be(this);var o="";break e}this.h.i=new A.TextDecoder}for(t=0;t<s;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:i&&t==s-1});r.length=0,this.h.g+=e,this.o=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,vl(this.j,this.v,this.B,this.m,this.W,l,n),this.i){if(this.aa&&!this.K){e:{if(this.g){var a,u=this.g;if((a=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Qe(a)){var c=a;break e}}c=null}if(n=c)he(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,is(this,n);else{this.i=!1,this.s=3,ut(12),Gt(this),Be(this);break t}}this.S?(Ra(this,l,o),Yr&&this.i&&l==3&&(pa(this.U,this.V,"tick",this.mb),this.V.start())):(he(this.j,this.m,o,null),is(this,o)),l==4&&Gt(this),this.i&&!this.J&&(l==4?Wa(this.l,this):(this.i=!1,pn(this)))}else Gl(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),Gt(this),Be(this)}}}catch{}finally{}};function Aa(e){return e.g?e.v=="GET"&&e.L!=2&&e.l.Ha:!1}function Ra(e,t,n){let r=!0,s;for(;!e.J&&e.o<n.length;)if(s=Rl(e,n),s==rs){t==4&&(e.s=4,ut(14),r=!1),he(e.j,e.m,null,"[Incomplete Response]");break}else if(s==wa){e.s=4,ut(15),he(e.j,e.m,n,"[Invalid Chunk]"),r=!1;break}else he(e.j,e.m,s,null),is(e,s);Aa(e)&&e.o!=0&&(e.h.g=e.h.g.slice(e.o),e.o=0),t!=4||n.length!=0||e.h.h||(e.s=1,ut(16),r=!1),e.i=e.i&&r,r?0<n.length&&!e.ba&&(e.ba=!0,t=e.l,t.g==e&&t.ca&&!t.M&&(t.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),Xs(t),t.M=!0,ut(11))):(he(e.j,e.m,n,"[Invalid Chunked Response]"),Gt(e),Be(e))}_.mb=function(){if(this.g){var e=vt(this.g),t=this.g.ja();this.o<t.length&&(fr(this),Ra(this,e,t),this.i&&e!=4&&pn(this))}};function Rl(e,t){var n=e.o,r=t.indexOf(`
`,n);return r==-1?rs:(n=Number(t.substring(n,r)),isNaN(n)?wa:(r+=1,r+n>t.length?rs:(t=t.slice(r,r+n),e.o=r+n,t)))}_.cancel=function(){this.J=!0,Gt(this)};function pn(e){e.Y=Date.now()+e.P,Pa(e,e.P)}function Pa(e,t){if(e.C!=null)throw Error("WatchDog timer not null");e.C=hn(rt(e.lb,e),t)}function fr(e){e.C&&(A.clearTimeout(e.C),e.C=null)}_.lb=function(){this.C=null;const e=Date.now();0<=e-this.Y?(wl(this.j,this.B),this.L!=2&&(Je(),ut(17)),Gt(this),this.s=2,Be(this)):Pa(this,this.Y-e)};function Be(e){e.l.H==0||e.J||Wa(e.l,e)}function Gt(e){fr(e);var t=e.M;t&&typeof t.sa=="function"&&t.sa(),e.M=null,Bs(e.V),ma(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.sa())}function is(e,t){try{var n=e.l;if(n.H!=0&&(n.g==e||os(n.i,e))){if(!e.K&&os(n.i,e)&&n.H==3){try{var r=n.Ja.g.parse(t)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){t:if(!n.u){if(n.g)if(n.g.G+3e3<e.G)zn(n),yr(n);else break t;Hs(n),ut(18)}}else n.Fa=s[1],0<n.Fa-n.V&&37500>s[2]&&n.G&&n.A==0&&!n.v&&(n.v=hn(rt(n.ib,n),6e3));if(1>=xa(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else Kt(n,11)}else if((e.K||n.g==e)&&zn(n),!Qe(t))for(s=n.Ja.g.parse(t),t=0;t<s.length;t++){let c=s[t];if(n.V=c[0],c=c[1],n.H==2)if(c[0]=="c"){n.K=c[1],n.pa=c[2];const l=c[3];l!=null&&(n.ra=l,n.l.info("VER="+n.ra));const h=c[4];h!=null&&(n.Ga=h,n.l.info("SVER="+n.Ga));const d=c[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;const m=e.g;if(m){const v=m.g?m.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(v){var i=r.i;i.g||v.indexOf("spdy")==-1&&v.indexOf("quic")==-1&&v.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(Gs(i,i.h),i.h=null))}if(r.F){const I=m.g?m.g.getResponseHeader("X-HTTP-Session-Id"):null;I&&(r.Da=I,x(r.I,r.F,I))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-e.G,n.l.info("Handshake RTT: "+n.S+"ms")),r=n;var o=e;if(r.wa=Ya(r,r.J?r.pa:null,r.Y),o.K){Oa(r.i,o);var a=o,u=r.L;u&&a.setTimeout(u),a.C&&(fr(a),pn(a)),r.g=o}else Ka(r);0<n.j.length&&Tr(n)}else c[0]!="stop"&&c[0]!="close"||Kt(n,7);else n.H==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?Kt(n,7):Ws(n):c[0]!="noop"&&n.h&&n.h.Aa(c),n.A=0)}}Je(4)}catch{}}function Pl(e){if(e.Z&&typeof e.Z=="function")return e.Z();if(typeof Map<"u"&&e instanceof Map||typeof Set<"u"&&e instanceof Set)return Array.from(e.values());if(typeof e=="string")return e.split("");if(sr(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}t=[],n=0;for(r in e)t[n++]=e[r];return t}function Sl(e){if(e.ta&&typeof e.ta=="function")return e.ta();if(!e.Z||typeof e.Z!="function"){if(typeof Map<"u"&&e instanceof Map)return Array.from(e.keys());if(!(typeof Set<"u"&&e instanceof Set)){if(sr(e)||typeof e=="string"){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const r in e)t[n++]=r;return t}}}function Sa(e,t){if(e.forEach&&typeof e.forEach=="function")e.forEach(t,void 0);else if(sr(e)||typeof e=="string")Array.prototype.forEach.call(e,t,void 0);else for(var n=Sl(e),r=Pl(e),s=r.length,i=0;i<s;i++)t.call(void 0,r[i],n&&n[i],e)}var Va=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vl(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),s=null;if(0<=r){var i=e[n].substring(0,r);s=e[n].substring(r+1)}else i=e[n];t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Ht(e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof Ht){this.h=e.h,jn(this,e.j),this.s=e.s,this.g=e.g,$n(this,e.m),this.l=e.l;var t=e.i,n=new Ze;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),Xi(this,n),this.o=e.o}else e&&(t=String(e).match(Va))?(this.h=!1,jn(this,t[1]||"",!0),this.s=xe(t[2]||""),this.g=xe(t[3]||"",!0),$n(this,t[4]),this.l=xe(t[5]||"",!0),Xi(this,t[6]||"",!0),this.o=xe(t[7]||"")):(this.h=!1,this.i=new Ze(null,this.h))}Ht.prototype.toString=function(){var e=[],t=this.j;t&&e.push(Oe(t,Yi,!0),":");var n=this.g;return(n||t=="file")&&(e.push("//"),(t=this.s)&&e.push(Oe(t,Yi,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&e.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&e.push("/"),e.push(Oe(n,n.charAt(0)=="/"?kl:Dl,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",Oe(n,bl)),e.join("")};function kt(e){return new Ht(e)}function jn(e,t,n){e.j=n?xe(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function $n(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function Xi(e,t,n){t instanceof Ze?(e.i=t,xl(e.i,e.h)):(n||(t=Oe(t,Nl)),e.i=new Ze(t,e.h))}function x(e,t,n){e.i.set(t,n)}function pr(e){return x(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function xe(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function Oe(e,t,n){return typeof e=="string"?(e=encodeURI(e).replace(t,Cl),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Cl(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(e&15).toString(16)}var Yi=/[#\/\?@]/g,Dl=/[#\?:]/g,kl=/[#\?]/g,Nl=/[#\?@]/g,bl=/#/g;function Ze(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function qt(e){e.g||(e.g=new Map,e.h=0,e.i&&Vl(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}_=Ze.prototype;_.add=function(e,t){qt(this),this.i=null,e=Ae(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this};function Ca(e,t){qt(e),t=Ae(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Da(e,t){return qt(e),t=Ae(e,t),e.g.has(t)}_.forEach=function(e,t){qt(this),this.g.forEach(function(n,r){n.forEach(function(s){e.call(t,s,r,this)},this)},this)};_.ta=function(){qt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){const s=e[r];for(let i=0;i<s.length;i++)n.push(t[r])}return n};_.Z=function(e){qt(this);let t=[];if(typeof e=="string")Da(this,e)&&(t=t.concat(this.g.get(Ae(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t};_.set=function(e,t){return qt(this),this.i=null,e=Ae(this,e),Da(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this};_.get=function(e,t){return e?(e=this.Z(e),0<e.length?String(e[0]):t):t};function ka(e,t,n){Ca(e,t),0<n.length&&(e.i=null,e.g.set(Ae(e,t),ks(n)),e.h+=n.length)}_.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];const i=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),e.push(s)}}return this.i=e.join("&")};function Ae(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function xl(e,t){t&&!e.j&&(qt(e),e.i=null,e.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(Ca(this,r),ka(this,s,n))},e)),e.j=t}var Ol=class{constructor(e,t){this.g=e,this.map=t}};function Na(e){this.l=e||Ll,A.PerformanceNavigationTiming?(e=A.performance.getEntriesByType("navigation"),e=0<e.length&&(e[0].nextHopProtocol=="hq"||e[0].nextHopProtocol=="h2")):e=!!(A.g&&A.g.Ka&&A.g.Ka()&&A.g.Ka().dc),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Ll=10;function ba(e){return e.h?!0:e.g?e.g.size>=e.j:!1}function xa(e){return e.h?1:e.g?e.g.size:0}function os(e,t){return e.h?e.h==t:e.g?e.g.has(t):!1}function Gs(e,t){e.g?e.g.add(t):e.h=t}function Oa(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}Na.prototype.cancel=function(){if(this.i=La(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const e of this.g.values())e.cancel();this.g.clear()}};function La(e){if(e.h!=null)return e.i.concat(e.h.F);if(e.g!=null&&e.g.size!==0){let t=e.i;for(const n of e.g.values())t=t.concat(n.F);return t}return ks(e.i)}var Ml=class{stringify(e){return A.JSON.stringify(e,void 0)}parse(e){return A.JSON.parse(e,void 0)}};function Fl(){this.g=new Ml}function Ul(e,t,n){const r=n||"";try{Sa(e,function(s,i){let o=s;cn(s)&&(o=Fs(s)),t.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw t.push(r+"type="+encodeURIComponent("_badmap")),s}}function Bl(e,t){const n=new cr;if(A.Image){const r=new Image;r.onload=Sn(Cn,n,r,"TestLoadImage: loaded",!0,t),r.onerror=Sn(Cn,n,r,"TestLoadImage: error",!1,t),r.onabort=Sn(Cn,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=Sn(Cn,n,r,"TestLoadImage: timeout",!1,t),A.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}function Cn(e,t,n,r,s){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,s(r)}catch{}}function mr(e){this.l=e.ec||null,this.j=e.ob||!1}W(mr,js);mr.prototype.g=function(){return new gr(this.l,this.j)};mr.prototype.i=function(e){return function(){return e}}({});function gr(e,t){Q.call(this),this.F=e,this.u=t,this.m=void 0,this.readyState=Ks,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}W(gr,Q);var Ks=0;_=gr.prototype;_.open=function(e,t){if(this.readyState!=Ks)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,tn(this)};_.send=function(e){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.F||A).fetch(new Request(this.B,t)).then(this.$a.bind(this),this.ka.bind(this))};_.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,mn(this)),this.readyState=Ks};_.$a=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tn(this)),this.g&&(this.readyState=3,tn(this),this.g)))if(this.responseType==="arraybuffer")e.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof A.ReadableStream<"u"&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Ma(this)}else e.text().then(this.Za.bind(this),this.ka.bind(this))};function Ma(e){e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))}_.Xa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?mn(this):tn(this),this.readyState==3&&Ma(this)}};_.Za=function(e){this.g&&(this.response=this.responseText=e,mn(this))};_.Ya=function(e){this.g&&(this.response=e,mn(this))};_.ka=function(){this.g&&mn(this)};function mn(e){e.readyState=4,e.l=null,e.j=null,e.A=null,tn(e)}_.setRequestHeader=function(e,t){this.v.append(e,t)};_.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""};_.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join(`\r
`)};function tn(e){e.onreadystatechange&&e.onreadystatechange.call(e)}Object.defineProperty(gr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(e){this.m=e?"include":"same-origin"}});var ql=A.JSON.parse;function U(e){Q.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Fa,this.L=this.M=!1}W(U,Q);var Fa="",jl=/^https?$/i,$l=["POST","PUT"];_=U.prototype;_.Oa=function(e){this.M=e};_.ha=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+e);t=t?t.toUpperCase():"GET",this.I=e,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():ns.g(),this.C=this.u?Hi(this.u):Hi(ns),this.g.onreadystatechange=rt(this.La,this);try{this.G=!0,this.g.open(t,String(e),!0),this.G=!1}catch(i){Ji(this,i);return}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())n.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),s=A.FormData&&e instanceof A.FormData,!(0<=ta($l,t))||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{qa(this),0<this.B&&((this.L=zl(this.g))?(this.g.timeout=this.B,this.g.ontimeout=rt(this.ua,this)):this.A=qs(this.ua,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(i){Ji(this,i)}};function zl(e){return ge&&typeof e.timeout=="number"&&e.ontimeout!==void 0}_.ua=function(){typeof Ds<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,J(this,"timeout"),this.abort(8))};function Ji(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,Ua(e),_r(e)}function Ua(e){e.F||(e.F=!0,J(e,"complete"),J(e,"error"))}_.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,J(this,"complete"),J(this,"abort"),_r(this))};_.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),_r(this,!0)),U.$.N.call(this)};_.La=function(){this.s||(this.G||this.v||this.l?Ba(this):this.kb())};_.kb=function(){Ba(this)};function Ba(e){if(e.h&&typeof Ds<"u"&&(!e.C[1]||vt(e)!=4||e.da()!=2)){if(e.v&&vt(e)==4)qs(e.La,0,e);else if(J(e,"readystatechange"),vt(e)==4){e.h=!1;try{const o=e.da();t:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break t;default:t=!1}var n;if(!(n=t)){var r;if(r=o===0){var s=String(e.I).match(Va)[1]||null;!s&&A.self&&A.self.location&&(s=A.self.location.protocol.slice(0,-1)),r=!jl.test(s?s.toLowerCase():"")}n=r}if(n)J(e,"complete"),J(e,"success");else{e.m=6;try{var i=2<vt(e)?e.g.statusText:""}catch{i=""}e.j=i+" ["+e.da()+"]",Ua(e)}}finally{_r(e)}}}}function _r(e,t){if(e.g){qa(e);const n=e.g,r=e.C[0]?()=>{}:null;e.g=null,e.C=null,t||J(e,"ready");try{n.onreadystatechange=r}catch{}}}function qa(e){e.g&&e.L&&(e.g.ontimeout=null),e.A&&(A.clearTimeout(e.A),e.A=null)}_.isActive=function(){return!!this.g};function vt(e){return e.g?e.g.readyState:0}_.da=function(){try{return 2<vt(this)?this.g.status:-1}catch{return-1}};_.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};_.Wa=function(e){if(this.g){var t=this.g.responseText;return e&&t.indexOf(e)==0&&(t=t.substring(e.length)),ql(t)}};function Zi(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.K){case Fa:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch{return null}}function Gl(e){const t={};e=(e.g&&2<=vt(e)&&e.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<e.length;r++){if(Qe(e[r]))continue;var n=gl(e[r]);const s=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const i=t[s]||[];t[s]=i,i.push(n)}cl(t,function(r){return r.join(", ")})}_.Ia=function(){return this.m};_.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function ja(e){let t="";return bs(e,function(n,r){t+=r,t+=":",t+=n,t+=`\r
`}),t}function Qs(e,t,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=ja(n),typeof e=="string"?n!=null&&encodeURIComponent(String(n)):x(e,t,n))}function De(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function $a(e){this.Ga=0,this.j=[],this.l=new cr,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=De("failFast",!1,e),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=De("baseRetryDelayMs",5e3,e),this.hb=De("retryDelaySeedMs",1e4,e),this.eb=De("forwardChannelMaxRetries",2,e),this.xa=De("forwardChannelRequestTimeoutMs",2e4,e),this.va=e&&e.xmlHttpFactory||void 0,this.Ha=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.i=new Na(e&&e.concurrentRequestLimit),this.Ja=new Fl,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=e&&e.bc||!1,e&&e.Ea&&this.l.Ea(),e&&e.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&e&&e.detectBufferingProxy||!1,this.qa=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.qa=e.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}_=$a.prototype;_.ra=8;_.H=1;function Ws(e){if(za(e),e.H==3){var t=e.W++,n=kt(e.I);if(x(n,"SID",e.K),x(n,"RID",t),x(n,"TYPE","terminate"),gn(e,n),t=new fn(e,e.l,t),t.L=2,t.A=pr(kt(n)),n=!1,A.navigator&&A.navigator.sendBeacon)try{n=A.navigator.sendBeacon(t.A.toString(),"")}catch{}!n&&A.Image&&(new Image().src=t.A,n=!0),n||(t.g=Ja(t.l,null),t.g.ha(t.A)),t.G=Date.now(),pn(t)}Xa(e)}function yr(e){e.g&&(Xs(e),e.g.cancel(),e.g=null)}function za(e){yr(e),e.u&&(A.clearTimeout(e.u),e.u=null),zn(e),e.i.cancel(),e.m&&(typeof e.m=="number"&&A.clearTimeout(e.m),e.m=null)}function Tr(e){if(!ba(e.i)&&!e.m){e.m=!0;var t=e.Na;He||da(),Xe||(He(),Xe=!0),Us.add(t,e),e.C=0}}function Kl(e,t){return xa(e.i)>=e.i.j-(e.m?1:0)?!1:e.m?(e.j=t.F.concat(e.j),!0):e.H==1||e.H==2||e.C>=(e.cb?0:e.eb)?!1:(e.m=hn(rt(e.Na,e,t),Ha(e,e.C)),e.C++,!0)}_.Na=function(e){if(this.m)if(this.m=null,this.H==1){if(!e){this.W=Math.floor(1e5*Math.random()),e=this.W++;const s=new fn(this,this.l,e);let i=this.s;if(this.U&&(i?(i=sa(i),ia(i,this.U)):i=this.U),this.o!==null||this.O||(s.I=i,i=null),this.P)t:{for(var t=0,n=0;n<this.j.length;n++){e:{var r=this.j[n];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break e}r=void 0}if(r===void 0)break;if(t+=r,4096<t){t=n;break t}if(t===4096||n===this.j.length-1){t=n+1;break t}}t=1e3}else t=1e3;t=Ga(this,s,t),n=kt(this.I),x(n,"RID",e),x(n,"CVER",22),this.F&&x(n,"X-HTTP-Session-Id",this.F),gn(this,n),i&&(this.O?t="headers="+encodeURIComponent(String(ja(i)))+"&"+t:this.o&&Qs(n,this.o,i)),Gs(this.i,s),this.bb&&x(n,"TYPE","init"),this.P?(x(n,"$req",t),x(n,"SID","null"),s.aa=!0,ss(s,n,null)):ss(s,n,t),this.H=2}}else this.H==3&&(e?to(this,e):this.j.length==0||ba(this.i)||to(this))};function to(e,t){var n;t?n=t.m:n=e.W++;const r=kt(e.I);x(r,"SID",e.K),x(r,"RID",n),x(r,"AID",e.V),gn(e,r),e.o&&e.s&&Qs(r,e.o,e.s),n=new fn(e,e.l,n,e.C+1),e.o===null&&(n.I=e.s),t&&(e.j=t.F.concat(e.j)),t=Ga(e,n,1e3),n.setTimeout(Math.round(.5*e.xa)+Math.round(.5*e.xa*Math.random())),Gs(e.i,n),ss(n,r,t)}function gn(e,t){e.na&&bs(e.na,function(n,r){x(t,r,n)}),e.h&&Sa({},function(n,r){x(t,r,n)})}function Ga(e,t,n){n=Math.min(e.j.length,n);var r=e.h?rt(e.h.Va,e.h,e):null;t:{var s=e.j;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let u=0;u<n;u++){let c=s[u].g;const l=s[u].map;if(c-=i,0>c)i=Math.max(0,s[u].g-100),a=!1;else try{Ul(l,o,"req"+c+"_")}catch{r&&r(l)}}if(a){r=o.join("&");break t}}}return e=e.j.splice(0,n),t.F=e,r}function Ka(e){if(!e.g&&!e.u){e.ba=1;var t=e.Ma;He||da(),Xe||(He(),Xe=!0),Us.add(t,e),e.A=0}}function Hs(e){return e.g||e.u||3<=e.A?!1:(e.ba++,e.u=hn(rt(e.Ma,e),Ha(e,e.A)),e.A++,!0)}_.Ma=function(){if(this.u=null,Qa(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var e=2*this.S;this.l.info("BP detection timer enabled: "+e),this.B=hn(rt(this.jb,this),e)}};_.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,ut(10),yr(this),Qa(this))};function Xs(e){e.B!=null&&(A.clearTimeout(e.B),e.B=null)}function Qa(e){e.g=new fn(e,e.l,"rpc",e.ba),e.o===null&&(e.g.I=e.s),e.g.O=0;var t=kt(e.wa);x(t,"RID","rpc"),x(t,"SID",e.K),x(t,"AID",e.V),x(t,"CI",e.G?"0":"1"),!e.G&&e.qa&&x(t,"TO",e.qa),x(t,"TYPE","xmlhttp"),gn(e,t),e.o&&e.s&&Qs(t,e.o,e.s),e.L&&e.g.setTimeout(e.L);var n=e.g;e=e.pa,n.L=1,n.A=pr(kt(t)),n.u=null,n.S=!0,Ia(n,e)}_.ib=function(){this.v!=null&&(this.v=null,yr(this),Hs(this),ut(19))};function zn(e){e.v!=null&&(A.clearTimeout(e.v),e.v=null)}function Wa(e,t){var n=null;if(e.g==t){zn(e),Xs(e),e.g=null;var r=2}else if(os(e.i,t))n=t.F,Oa(e.i,t),r=1;else return;if(e.H!=0){if(t.i)if(r==1){n=t.u?t.u.length:0,t=Date.now()-t.G;var s=e.C;r=lr(),J(r,new ya(r,n)),Tr(e)}else Ka(e);else if(s=t.s,s==3||s==0&&0<t.ca||!(r==1&&Kl(e,t)||r==2&&Hs(e)))switch(n&&0<n.length&&(t=e.i,t.i=t.i.concat(n)),s){case 1:Kt(e,5);break;case 4:Kt(e,10);break;case 3:Kt(e,6);break;default:Kt(e,2)}}}function Ha(e,t){let n=e.ab+Math.floor(Math.random()*e.hb);return e.isActive()||(n*=2),n*t}function Kt(e,t){if(e.l.info("Error code "+t),t==2){var n=null;e.h&&(n=null);var r=rt(e.pb,e);n||(n=new Ht("//www.google.com/images/cleardot.gif"),A.location&&A.location.protocol=="http"||jn(n,"https"),pr(n)),Bl(n.toString(),r)}else ut(2);e.H=0,e.h&&e.h.za(t),Xa(e),za(e)}_.pb=function(e){e?(this.l.info("Successfully pinged google.com"),ut(2)):(this.l.info("Failed to ping google.com"),ut(1))};function Xa(e){if(e.H=0,e.ma=[],e.h){const t=La(e.i);(t.length!=0||e.j.length!=0)&&(zi(e.ma,t),zi(e.ma,e.j),e.i.i.length=0,ks(e.j),e.j.length=0),e.h.ya()}}function Ya(e,t,n){var r=n instanceof Ht?kt(n):new Ht(n);if(r.g!="")t&&(r.g=t+"."+r.g),$n(r,r.m);else{var s=A.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;var i=new Ht(null);r&&jn(i,r),t&&(i.g=t),s&&$n(i,s),n&&(i.l=n),r=i}return n=e.F,t=e.Da,n&&t&&x(r,n,t),x(r,"VER",e.ra),gn(e,r),r}function Ja(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return t=e.Ha&&!e.va?new U(new mr({ob:n})):new U(e.va),t.Oa(e.J),t}_.isActive=function(){return!!this.h&&this.h.isActive(this)};function Za(){}_=Za.prototype;_.Ba=function(){};_.Aa=function(){};_.za=function(){};_.ya=function(){};_.isActive=function(){return!0};_.Va=function(){};function Gn(){if(ge&&!(10<=Number(il)))throw Error("Environmental error: no available transport.")}Gn.prototype.g=function(e,t){return new ft(e,t)};function ft(e,t){Q.call(this),this.g=new $a(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.Ca&&(e?e["X-WebChannel-Client-Profile"]=t.Ca:e={"X-WebChannel-Client-Profile":t.Ca}),this.g.U=e,(e=t&&t.cc)&&!Qe(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!Qe(t)&&(this.g.F=t,e=this.h,e!==null&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new Re(this)}W(ft,Q);ft.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var e=this.g,t=this.l,n=this.h||void 0;ut(0),e.Y=t,e.na=n||{},e.G=e.aa,e.I=Ya(e,null,e.Y),Tr(e)};ft.prototype.close=function(){Ws(this.g)};ft.prototype.u=function(e){var t=this.g;if(typeof e=="string"){var n={};n.__data__=e,e=n}else this.v&&(n={},n.__data__=Fs(e),e=n);t.j.push(new Ol(t.fb++,e)),t.H==3&&Tr(t)};ft.prototype.N=function(){this.g.h=null,delete this.j,Ws(this.g),delete this.g,ft.$.N.call(this)};function tu(e){$s.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){t:{for(const n in t){e=n;break t}e=void 0}(this.i=e)&&(e=this.i,t=t!==null&&e in t?t[e]:void 0),this.data=t}else this.data=e}W(tu,$s);function eu(){zs.call(this),this.status=1}W(eu,zs);function Re(e){this.g=e}W(Re,Za);Re.prototype.Ba=function(){J(this.g,"a")};Re.prototype.Aa=function(e){J(this.g,new tu(e))};Re.prototype.za=function(e){J(this.g,new eu)};Re.prototype.ya=function(){J(this.g,"b")};function Ql(){this.blockSize=-1}function gt(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}W(gt,Ql);gt.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function $r(e,t,n){n||(n=0);var r=Array(16);if(typeof t=="string")for(var s=0;16>s;++s)r[s]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(s=0;16>s;++s)r[s]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],s=e.g[2];var i=e.g[3],o=t+(i^n&(s^i))+r[0]+3614090360&4294967295;t=n+(o<<7&4294967295|o>>>25),o=i+(s^t&(n^s))+r[1]+3905402710&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(n^i&(t^n))+r[2]+606105819&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(t^s&(i^t))+r[3]+3250441966&4294967295,n=s+(o<<22&4294967295|o>>>10),o=t+(i^n&(s^i))+r[4]+4118548399&4294967295,t=n+(o<<7&4294967295|o>>>25),o=i+(s^t&(n^s))+r[5]+1200080426&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(n^i&(t^n))+r[6]+2821735955&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(t^s&(i^t))+r[7]+4249261313&4294967295,n=s+(o<<22&4294967295|o>>>10),o=t+(i^n&(s^i))+r[8]+1770035416&4294967295,t=n+(o<<7&4294967295|o>>>25),o=i+(s^t&(n^s))+r[9]+2336552879&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(n^i&(t^n))+r[10]+4294925233&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(t^s&(i^t))+r[11]+2304563134&4294967295,n=s+(o<<22&4294967295|o>>>10),o=t+(i^n&(s^i))+r[12]+1804603682&4294967295,t=n+(o<<7&4294967295|o>>>25),o=i+(s^t&(n^s))+r[13]+4254626195&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(n^i&(t^n))+r[14]+2792965006&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(t^s&(i^t))+r[15]+1236535329&4294967295,n=s+(o<<22&4294967295|o>>>10),o=t+(s^i&(n^s))+r[1]+4129170786&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(t^n))+r[6]+3225465664&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^n&(i^t))+r[11]+643717713&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(s^i))+r[0]+3921069994&4294967295,n=s+(o<<20&4294967295|o>>>12),o=t+(s^i&(n^s))+r[5]+3593408605&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(t^n))+r[10]+38016083&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^n&(i^t))+r[15]+3634488961&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(s^i))+r[4]+3889429448&4294967295,n=s+(o<<20&4294967295|o>>>12),o=t+(s^i&(n^s))+r[9]+568446438&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(t^n))+r[14]+3275163606&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^n&(i^t))+r[3]+4107603335&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(s^i))+r[8]+1163531501&4294967295,n=s+(o<<20&4294967295|o>>>12),o=t+(s^i&(n^s))+r[13]+2850285829&4294967295,t=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(t^n))+r[2]+4243563512&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^n&(i^t))+r[7]+1735328473&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^t&(s^i))+r[12]+2368359562&4294967295,n=s+(o<<20&4294967295|o>>>12),o=t+(n^s^i)+r[5]+4294588738&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^s)+r[8]+2272392833&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^n)+r[11]+1839030562&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^t)+r[14]+4259657740&4294967295,n=s+(o<<23&4294967295|o>>>9),o=t+(n^s^i)+r[1]+2763975236&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^s)+r[4]+1272893353&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^n)+r[7]+4139469664&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^t)+r[10]+3200236656&4294967295,n=s+(o<<23&4294967295|o>>>9),o=t+(n^s^i)+r[13]+681279174&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^s)+r[0]+3936430074&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^n)+r[3]+3572445317&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^t)+r[6]+76029189&4294967295,n=s+(o<<23&4294967295|o>>>9),o=t+(n^s^i)+r[9]+3654602809&4294967295,t=n+(o<<4&4294967295|o>>>28),o=i+(t^n^s)+r[12]+3873151461&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^n)+r[15]+530742520&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^t)+r[2]+3299628645&4294967295,n=s+(o<<23&4294967295|o>>>9),o=t+(s^(n|~i))+r[0]+4096336452&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~s))+r[7]+1126891415&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~n))+r[14]+2878612391&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~t))+r[5]+4237533241&4294967295,n=s+(o<<21&4294967295|o>>>11),o=t+(s^(n|~i))+r[12]+1700485571&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~s))+r[3]+2399980690&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~n))+r[10]+4293915773&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~t))+r[1]+2240044497&4294967295,n=s+(o<<21&4294967295|o>>>11),o=t+(s^(n|~i))+r[8]+1873313359&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~s))+r[15]+4264355552&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~n))+r[6]+2734768916&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~t))+r[13]+1309151649&4294967295,n=s+(o<<21&4294967295|o>>>11),o=t+(s^(n|~i))+r[4]+4149444226&4294967295,t=n+(o<<6&4294967295|o>>>26),o=i+(n^(t|~s))+r[11]+3174756917&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~n))+r[2]+718787259&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+i&4294967295}gt.prototype.j=function(e,t){t===void 0&&(t=e.length);for(var n=t-this.blockSize,r=this.m,s=this.h,i=0;i<t;){if(s==0)for(;i<=n;)$r(this,e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[s++]=e.charCodeAt(i++),s==this.blockSize){$r(this,r),s=0;break}}else for(;i<t;)if(r[s++]=e[i++],s==this.blockSize){$r(this,r),s=0;break}}this.h=s,this.i+=t};gt.prototype.l=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.i;for(t=e.length-8;t<e.length;++t)e[t]=n&255,n/=256;for(this.j(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};function D(e,t){this.h=t;for(var n=[],r=!0,s=e.length-1;0<=s;s--){var i=e[s]|0;r&&i==t||(n[s]=i,r=!1)}this.g=n}var Wl={};function Ys(e){return-128<=e&&128>e?nl(e,function(t){return new D([t|0],0>t?-1:0)}):new D([e|0],0>e?-1:0)}function wt(e){if(isNaN(e)||!isFinite(e))return de;if(0>e)return X(wt(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=as;return new D(t,0)}function nu(e,t){if(e.length==0)throw Error("number format error: empty string");if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(e.charAt(0)=="-")return X(nu(e.substring(1),t));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=wt(Math.pow(t,8)),r=de,s=0;s<e.length;s+=8){var i=Math.min(8,e.length-s),o=parseInt(e.substring(s,s+i),t);8>i?(i=wt(Math.pow(t,i)),r=r.R(i).add(wt(o))):(r=r.R(n),r=r.add(wt(o)))}return r}var as=4294967296,de=Ys(0),us=Ys(1),eo=Ys(16777216);_=D.prototype;_.ea=function(){if(pt(this))return-X(this).ea();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.D(n);e+=(0<=r?r:as+r)*t,t*=as}return e};_.toString=function(e){if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(Dt(this))return"0";if(pt(this))return"-"+X(this).toString(e);for(var t=wt(Math.pow(e,6)),n=this,r="";;){var s=Qn(n,t).g;n=Kn(n,s.R(t));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(e);if(n=s,Dt(n))return i+r;for(;6>i.length;)i="0"+i;r=i+r}};_.D=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h};function Dt(e){if(e.h!=0)return!1;for(var t=0;t<e.g.length;t++)if(e.g[t]!=0)return!1;return!0}function pt(e){return e.h==-1}_.X=function(e){return e=Kn(this,e),pt(e)?-1:Dt(e)?0:1};function X(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new D(n,~e.h).add(us)}_.abs=function(){return pt(this)?X(this):this};_.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,s=0;s<=t;s++){var i=r+(this.D(s)&65535)+(e.D(s)&65535),o=(i>>>16)+(this.D(s)>>>16)+(e.D(s)>>>16);r=o>>>16,i&=65535,o&=65535,n[s]=o<<16|i}return new D(n,n[n.length-1]&-2147483648?-1:0)};function Kn(e,t){return e.add(X(t))}_.R=function(e){if(Dt(this)||Dt(e))return de;if(pt(this))return pt(e)?X(this).R(X(e)):X(X(this).R(e));if(pt(e))return X(this.R(X(e)));if(0>this.X(eo)&&0>e.X(eo))return wt(this.ea()*e.ea());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<e.g.length;s++){var i=this.D(r)>>>16,o=this.D(r)&65535,a=e.D(s)>>>16,u=e.D(s)&65535;n[2*r+2*s]+=o*u,Dn(n,2*r+2*s),n[2*r+2*s+1]+=i*u,Dn(n,2*r+2*s+1),n[2*r+2*s+1]+=o*a,Dn(n,2*r+2*s+1),n[2*r+2*s+2]+=i*a,Dn(n,2*r+2*s+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new D(n,0)};function Dn(e,t){for(;(e[t]&65535)!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function ke(e,t){this.g=e,this.h=t}function Qn(e,t){if(Dt(t))throw Error("division by zero");if(Dt(e))return new ke(de,de);if(pt(e))return t=Qn(X(e),t),new ke(X(t.g),X(t.h));if(pt(t))return t=Qn(e,X(t)),new ke(X(t.g),t.h);if(30<e.g.length){if(pt(e)||pt(t))throw Error("slowDivide_ only works with positive integers.");for(var n=us,r=t;0>=r.X(e);)n=no(n),r=no(r);var s=ae(n,1),i=ae(r,1);for(r=ae(r,2),n=ae(n,2);!Dt(r);){var o=i.add(r);0>=o.X(e)&&(s=s.add(n),i=o),r=ae(r,1),n=ae(n,1)}return t=Kn(e,s.R(t)),new ke(s,t)}for(s=de;0<=e.X(t);){for(n=Math.max(1,Math.floor(e.ea()/t.ea())),r=Math.ceil(Math.log(n)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),i=wt(n),o=i.R(t);pt(o)||0<o.X(e);)n-=r,i=wt(n),o=i.R(t);Dt(i)&&(i=us),s=s.add(i),e=Kn(e,o)}return new ke(s,e)}_.gb=function(e){return Qn(this,e).h};_.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)&e.D(r);return new D(n,this.h&e.h)};_.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)|e.D(r);return new D(n,this.h|e.h)};_.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)^e.D(r);return new D(n,this.h^e.h)};function no(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.D(r)<<1|e.D(r-1)>>>31;return new D(n,e.h)}function ae(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,s=[],i=0;i<r;i++)s[i]=0<t?e.D(i+n)>>>t|e.D(i+n+1)<<32-t:e.D(i+n);return new D(s,e.h)}Gn.prototype.createWebChannel=Gn.prototype.g;ft.prototype.send=ft.prototype.u;ft.prototype.open=ft.prototype.m;ft.prototype.close=ft.prototype.close;hr.NO_ERROR=0;hr.TIMEOUT=8;hr.HTTP_ERROR=6;Ta.COMPLETE="complete";Ea.EventType=dn;dn.OPEN="a";dn.CLOSE="b";dn.ERROR="c";dn.MESSAGE="d";Q.prototype.listen=Q.prototype.O;U.prototype.listenOnce=U.prototype.P;U.prototype.getLastError=U.prototype.Sa;U.prototype.getLastErrorCode=U.prototype.Ia;U.prototype.getStatus=U.prototype.da;U.prototype.getResponseJson=U.prototype.Wa;U.prototype.getResponseText=U.prototype.ja;U.prototype.send=U.prototype.ha;U.prototype.setWithCredentials=U.prototype.Oa;gt.prototype.digest=gt.prototype.l;gt.prototype.reset=gt.prototype.reset;gt.prototype.update=gt.prototype.j;D.prototype.add=D.prototype.add;D.prototype.multiply=D.prototype.R;D.prototype.modulo=D.prototype.gb;D.prototype.compare=D.prototype.X;D.prototype.toNumber=D.prototype.ea;D.prototype.toString=D.prototype.toString;D.prototype.getBits=D.prototype.D;D.fromNumber=wt;D.fromString=nu;var Hl=function(){return new Gn},Xl=function(){return lr()},zr=hr,Yl=Ta,Jl=ne,ro={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},kn=Ea,Zl=U,th=gt,fe=D;const so="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}et.UNAUTHENTICATED=new et(null),et.GOOGLE_CREDENTIALS=new et("google-credentials-uid"),et.FIRST_PARTY=new et("first-party-uid"),et.MOCK_USER=new et("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pe="10.11.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new qc("@firebase/firestore");function Ne(){return Jt.logLevel}function g(e,...t){if(Jt.logLevel<=bt.DEBUG){const n=t.map(Js);Jt.debug(`Firestore (${Pe}): ${e}`,...n)}}function St(e,...t){if(Jt.logLevel<=bt.ERROR){const n=t.map(Js);Jt.error(`Firestore (${Pe}): ${e}`,...n)}}function _e(e,...t){if(Jt.logLevel<=bt.WARN){const n=t.map(Js);Jt.warn(`Firestore (${Pe}): ${e}`,...n)}}function Js(e){if(typeof e=="string")return e;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(e)}catch{return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w(e="Unexpected state"){const t=`FIRESTORE (${Pe}) INTERNAL ASSERTION FAILED: `+e;throw St(t),new Error(t)}function N(e,t){e||w()}function P(e,t){return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class y extends Ss{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(){this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class eh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable(()=>n(et.UNAUTHENTICATED))}shutdown(){}}class nh{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,n){this.changeListener=n,t.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class rh{constructor(t){this.t=t,this.currentUser=et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new At;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new At,t.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;t.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},a=u=>{g("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(u=>a(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?a(u):(g("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new At)}},0),o()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==t?(g("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(N(typeof r.accessToken=="string"),new ru(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return N(t===null||typeof t=="string"),new et(t)}}class sh{constructor(t,n,r){this.l=t,this.h=n,this.P=r,this.type="FirstParty",this.user=et.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class ih{constructor(t,n,r){this.l=t,this.h=n,this.P=r}getToken(){return Promise.resolve(new sh(this.l,this.h,this.P))}start(t,n){t.enqueueRetryable(()=>n(et.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class oh{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ah{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,n){const r=i=>{i.error!=null&&g("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,g("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>r(i))};const s=i=>{g("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):g("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(n=>n?(N(typeof n.token=="string"),this.R=n.token,new oh(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(e){const t=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=uh(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=t.charAt(s[i]%t.length))}return r}}function C(e,t){return e<t?-1:e>t?1:0}function ye(e,t,n){return e.length===t.length&&e.every((r,s)=>n(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new y(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new y(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new y(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new y(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return G.fromMillis(Date.now())}static fromDate(t){return G.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*n));return new G(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?C(this.nanoseconds,t.nanoseconds):C(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(t){this.timestamp=t}static fromTimestamp(t){return new R(t)}static min(){return new R(new G(0,0))}static max(){return new R(new G(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(t,n,r){n===void 0?n=0:n>t.length&&w(),r===void 0?r=t.length-n:r>t.length-n&&w(),this.segments=t,this.offset=n,this.len=r}get length(){return this.len}isEqual(t){return en.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof en?t.forEach(r=>{n.push(r)}):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,r=this.limit();n<r;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const r=Math.min(t.length,n.length);for(let s=0;s<r;s++){const i=t.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class O extends en{construct(t,n,r){return new O(t,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const n=[];for(const r of t){if(r.indexOf("//")>=0)throw new y(f.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new O(n)}static emptyPath(){return new O([])}}const ch=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Y extends en{construct(t,n,r){return new Y(t,n,r)}static isValidIdentifier(t){return ch.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Y.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Y(["__name__"])}static fromServerFormat(t){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new y(f.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<t.length;){const a=t[s];if(a==="\\"){if(s+1===t.length)throw new y(f.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new y(f.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new y(f.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Y(n)}static emptyPath(){return new Y([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(t){this.path=t}static fromPath(t){return new E(O.fromString(t))}static fromName(t){return new E(O.fromString(t).popFirst(5))}static empty(){return new E(O.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&O.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return O.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new E(new O(t.slice()))}}function lh(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=R.fromTimestamp(r===1e9?new G(n+1,0):new G(n,r));return new Mt(s,E.empty(),t)}function hh(e){return new Mt(e.readTime,e.key,-1)}class Mt{constructor(t,n,r){this.readTime=t,this.documentKey=n,this.largestBatchId=r}static min(){return new Mt(R.min(),E.empty(),-1)}static max(){return new Mt(R.max(),E.empty(),-1)}}function dh(e,t){let n=e.readTime.compareTo(t.readTime);return n!==0?n:(n=E.comparator(e.documentKey,t.documentKey),n!==0?n:C(e.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ph{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _n(e){if(e.code!==f.FAILED_PRECONDITION||e.message!==fh)throw e;g("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&w(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new p((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((t,n)=>{this.next(t,n)})}wrapUserFunction(t){try{const n=t();return n instanceof p?n:p.resolve(n)}catch(n){return p.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction(()=>t(n)):p.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction(()=>t(n)):p.reject(n)}static resolve(t){return new p((n,r)=>{n(t)})}static reject(t){return new p((n,r)=>{r(t)})}static waitFor(t){return new p((n,r)=>{let s=0,i=0,o=!1;t.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(t){let n=p.resolve(!1);for(const r of t)n=n.next(s=>s?p.resolve(s):r());return n}static forEach(t,n){const r=[];return t.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(t,n){return new p((r,s)=>{const i=t.length,o=new Array(i);let a=0;for(let u=0;u<i;u++){const c=u;n(t[c]).next(l=>{o[c]=l,++a,a===i&&r(o)},l=>s(l))}})}static doWhile(t,n){return new p((r,s)=>{const i=()=>{t()===!0?n().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(t,n){this.action=t,this.transaction=n,this.aborted=!1,this.V=new At,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{n.error?this.V.reject(new qe(t,n.error)):this.V.resolve()},this.transaction.onerror=r=>{const s=ti(r.target.error);this.V.reject(new qe(t,s))}}static open(t,n,r,s){try{return new Zs(n,t.transaction(s,r))}catch(i){throw new qe(n,i)}}get m(){return this.V.promise}abort(t){t&&this.V.reject(t),this.aborted||(g("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const n=this.transaction.objectStore(t);return new gh(n)}}class Qt{constructor(t,n,r){this.name=t,this.version=n,this.p=r,Qt.S(qn())===12.2&&St("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return g("SimpleDb","Removing database:",t),zt(window.indexedDB.deleteDatabase(t)).toPromise()}static D(){if(!$c())return!1;if(Qt.C())return!0;const t=qn(),n=Qt.S(t),r=0<n&&n<10,s=Qt.v(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||r||i)}static C(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)===null||t===void 0?void 0:t.F)==="YES"}static M(t,n){return t.store(n)}static S(t){const n=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=n?n[1].split("_").slice(0,2).join("."):"-1";return Number(r)}static v(t){const n=t.match(/Android ([\d.]+)/i),r=n?n[1].split(".").slice(0,2).join("."):"-1";return Number(r)}async O(t){return this.db||(g("SimpleDb","Opening database:",this.name),this.db=await new Promise((n,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;n(o)},s.onblocked=()=>{r(new qe(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new y(f.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new y(f.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new qe(t,o))},s.onupgradeneeded=i=>{g("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.p.N(o,s.transaction,i.oldVersion,this.version).next(()=>{g("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=n=>this.L(n)),this.db}B(t){this.L=t,this.db&&(this.db.onversionchange=n=>t(n))}async runTransaction(t,n,r,s){const i=n==="readonly";let o=0;for(;;){++o;try{this.db=await this.O(t);const a=Zs.open(this.db,t,i?"readonly":"readwrite",r),u=s(a).next(c=>(a.g(),c)).catch(c=>(a.abort(c),p.reject(c))).toPromise();return u.catch(()=>{}),await a.m,u}catch(a){const u=a,c=u.name!=="FirebaseError"&&o<3;if(g("SimpleDb","Transaction failed with error:",u.message,"Retrying:",c),this.close(),!c)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}class mh{constructor(t){this.k=t,this.q=!1,this.K=null}get isDone(){return this.q}get $(){return this.K}set cursor(t){this.k=t}done(){this.q=!0}U(t){this.K=t}delete(){return zt(this.k.delete())}}class qe extends y{constructor(t,n){super(f.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${n}`),this.name="IndexedDbTransactionError"}}function yn(e){return e.name==="IndexedDbTransactionError"}class gh{constructor(t){this.store=t}put(t,n){let r;return n!==void 0?(g("SimpleDb","PUT",this.store.name,t,n),r=this.store.put(n,t)):(g("SimpleDb","PUT",this.store.name,"<auto-key>",t),r=this.store.put(t)),zt(r)}add(t){return g("SimpleDb","ADD",this.store.name,t,t),zt(this.store.add(t))}get(t){return zt(this.store.get(t)).next(n=>(n===void 0&&(n=null),g("SimpleDb","GET",this.store.name,t,n),n))}delete(t){return g("SimpleDb","DELETE",this.store.name,t),zt(this.store.delete(t))}count(){return g("SimpleDb","COUNT",this.store.name),zt(this.store.count())}W(t,n){const r=this.options(t,n),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new p((o,a)=>{i.onerror=u=>{a(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(r),o=[];return this.G(i,(a,u)=>{o.push(u)}).next(()=>o)}}j(t,n){const r=this.store.getAll(t,n===null?void 0:n);return new p((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}H(t,n){g("SimpleDb","DELETE ALL",this.store.name);const r=this.options(t,n);r.J=!1;const s=this.cursor(r);return this.G(s,(i,o,a)=>a.delete())}Y(t,n){let r;n?r=t:(r={},n=t);const s=this.cursor(r);return this.G(s,n)}Z(t){const n=this.cursor({});return new p((r,s)=>{n.onerror=i=>{const o=ti(i.target.error);s(o)},n.onsuccess=i=>{const o=i.target.result;o?t(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}G(t,n){const r=[];return new p((s,i)=>{t.onerror=o=>{i(o.target.error)},t.onsuccess=o=>{const a=o.target.result;if(!a)return void s();const u=new mh(a),c=n(a.primaryKey,a.value,u);if(c instanceof p){const l=c.catch(h=>(u.done(),p.reject(h)));r.push(l)}u.isDone?s():u.$===null?a.continue():a.continue(u.$)}}).next(()=>p.waitFor(r))}options(t,n){let r;return t!==void 0&&(typeof t=="string"?r=t:n=t),{index:r,range:n}}cursor(t){let n="next";if(t.reverse&&(n="prev"),t.index){const r=this.store.index(t.index);return t.J?r.openKeyCursor(t.range,n):r.openCursor(t.range,n)}return this.store.openCursor(t.range,n)}}function zt(e){return new p((t,n)=>{e.onsuccess=r=>{const s=r.target.result;t(s)},e.onerror=r=>{const s=ti(r.target.error);n(s)}})}let io=!1;function ti(e){const t=Qt.S(qn());if(t>=12.2&&t<13){const n="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(n)>=0){const r=new y("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return io||(io=!0,setTimeout(()=>{throw r},0)),r}}return e}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=r=>this.se(r),this.oe=r=>n.writeSequenceNumber(r))}se(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.oe&&this.oe(t),t}}ei._e=-1;function Er(e){return e==null}function Wn(e){return e===0&&1/e==-1/0}function _h(e){return typeof e=="number"&&Number.isInteger(e)&&!Wn(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oo(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function re(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function iu(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(t,n){this.comparator=t,this.root=n||H.EMPTY}insert(t,n){return new F(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,H.BLACK,null,null))}remove(t){return new F(this.comparator,this.root.remove(t,this.comparator).copy(null,null,H.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(t){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((n,r)=>(t(n,r),!1))}toString(){const t=[];return this.inorderTraversal((n,r)=>(t.push(`${n}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Nn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Nn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Nn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Nn(this.root,t,this.comparator,!0)}}class Nn{constructor(t,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=n?r(t.key,n):1,n&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class H{constructor(t,n,r,s,i){this.key=t,this.value=n,this.color=r??H.RED,this.left=s??H.EMPTY,this.right=i??H.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,s,i){return new H(t??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(t,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return H.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,s=this;if(n(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(t,s.key)===0){if(s.right.isEmpty())return H.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,H.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,H.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw w();const t=this.left.check();if(t!==this.right.check())throw w();return t+(this.isRed()?0:1)}}H.EMPTY=null,H.RED=!0,H.BLACK=!1;H.EMPTY=new class{constructor(){this.size=0}get key(){throw w()}get value(){throw w()}get color(){throw w()}get left(){throw w()}get right(){throw w()}copy(t,n,r,s,i){return this}insert(t,n,r){return new H(t,n)}remove(t,n){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(t){this.comparator=t,this.data=new F(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((n,r)=>(t(n),!1))}forEachInRange(t,n){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;n(s.key)}}forEachWhile(t,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new ao(this.data.getIterator())}getIteratorFrom(t){return new ao(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach(r=>{n=n.add(r)}),n}isEqual(t){if(!(t instanceof Z)||this.size!==t.size)return!1;const n=this.data.getIterator(),r=t.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(n=>{t.push(n)}),t}toString(){const t=[];return this.forEach(n=>t.push(n)),"SortedSet("+t.toString()+")"}copy(t){const n=new Z(this.comparator);return n.data=t,n}}class ao{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.fields=t,t.sort(Y.comparator)}static empty(){return new ht([])}unionWith(t){let n=new Z(Y.comparator);for(const r of this.fields)n=n.add(r);for(const r of t)n=n.add(r);return new ht(n.toArray())}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return ye(this.fields,t.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.binaryString=t}static fromBase64String(t){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ou("Invalid base64 string: "+i):i}}(t);return new ot(n)}static fromUint8Array(t){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(t);return new ot(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return C(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ot.EMPTY_BYTE_STRING=new ot("");const yh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ft(e){if(N(!!e),typeof e=="string"){let t=0;const n=yh.exec(e);if(N(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:$(e.seconds),nanos:$(e.nanos)}}function $(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function Zt(e){return typeof e=="string"?ot.fromBase64String(e):ot.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function ri(e){const t=e.mapValue.fields.__previous_value__;return ni(t)?ri(t):t}function nn(e){const t=Ft(e.mapValue.fields.__local_write_time__.timestampValue);return new G(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(t,n,r,s,i,o,a,u,c){this.databaseId=t,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=u,this.useFetchStreams=c}}class rn{constructor(t,n){this.projectId=t,this.database=n||"(default)"}static empty(){return new rn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof rn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function te(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ni(e)?4:Eh(e)?9007199254740991:10:w()}function Vt(e,t){if(e===t)return!0;const n=te(e);if(n!==te(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return nn(e).isEqual(nn(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ft(s.timestampValue),a=Ft(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(s,i){return Zt(s.bytesValue).isEqual(Zt(i.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(s,i){return $(s.geoPointValue.latitude)===$(i.geoPointValue.latitude)&&$(s.geoPointValue.longitude)===$(i.geoPointValue.longitude)}(e,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return $(s.integerValue)===$(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=$(s.doubleValue),a=$(i.doubleValue);return o===a?Wn(o)===Wn(a):isNaN(o)&&isNaN(a)}return!1}(e,t);case 9:return ye(e.arrayValue.values||[],t.arrayValue.values||[],Vt);case 10:return function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(oo(o)!==oo(a))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(a[u]===void 0||!Vt(o[u],a[u])))return!1;return!0}(e,t);default:return w()}}function sn(e,t){return(e.values||[]).find(n=>Vt(n,t))!==void 0}function Te(e,t){if(e===t)return 0;const n=te(e),r=te(t);if(n!==r)return C(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return C(e.booleanValue,t.booleanValue);case 2:return function(i,o){const a=$(i.integerValue||i.doubleValue),u=$(o.integerValue||o.doubleValue);return a<u?-1:a>u?1:a===u?0:isNaN(a)?isNaN(u)?0:-1:1}(e,t);case 3:return uo(e.timestampValue,t.timestampValue);case 4:return uo(nn(e),nn(t));case 5:return C(e.stringValue,t.stringValue);case 6:return function(i,o){const a=Zt(i),u=Zt(o);return a.compareTo(u)}(e.bytesValue,t.bytesValue);case 7:return function(i,o){const a=i.split("/"),u=o.split("/");for(let c=0;c<a.length&&c<u.length;c++){const l=C(a[c],u[c]);if(l!==0)return l}return C(a.length,u.length)}(e.referenceValue,t.referenceValue);case 8:return function(i,o){const a=C($(i.latitude),$(o.latitude));return a!==0?a:C($(i.longitude),$(o.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(i,o){const a=i.values||[],u=o.values||[];for(let c=0;c<a.length&&c<u.length;++c){const l=Te(a[c],u[c]);if(l)return l}return C(a.length,u.length)}(e.arrayValue,t.arrayValue);case 10:return function(i,o){if(i===bn.mapValue&&o===bn.mapValue)return 0;if(i===bn.mapValue)return 1;if(o===bn.mapValue)return-1;const a=i.fields||{},u=Object.keys(a),c=o.fields||{},l=Object.keys(c);u.sort(),l.sort();for(let h=0;h<u.length&&h<l.length;++h){const d=C(u[h],l[h]);if(d!==0)return d;const m=Te(a[u[h]],c[l[h]]);if(m!==0)return m}return C(u.length,l.length)}(e.mapValue,t.mapValue);default:throw w()}}function uo(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return C(e,t);const n=Ft(e),r=Ft(t),s=C(n.seconds,r.seconds);return s!==0?s:C(n.nanos,r.nanos)}function Ee(e){return cs(e)}function cs(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(n){const r=Ft(n);return`time(${r.seconds},${r.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(n){return Zt(n).toBase64()}(e.bytesValue):"referenceValue"in e?function(n){return E.fromName(n).toString()}(e.referenceValue):"geoPointValue"in e?function(n){return`geo(${n.latitude},${n.longitude})`}(e.geoPointValue):"arrayValue"in e?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=cs(i);return r+"]"}(e.arrayValue):"mapValue"in e?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${cs(n.fields[o])}`;return s+"}"}(e.mapValue):w()}function co(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function ls(e){return!!e&&"integerValue"in e}function si(e){return!!e&&"arrayValue"in e}function lo(e){return!!e&&"nullValue"in e}function ho(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Mn(e){return!!e&&"mapValue"in e}function je(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return re(e.mapValue.fields,(n,r)=>t.mapValue.fields[n]=je(r)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=je(e.arrayValue.values[n]);return t}return Object.assign({},e)}function Eh(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.value=t}static empty(){return new lt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let r=0;r<t.length-1;++r)if(n=(n.mapValue.fields||{})[t.get(r)],!Mn(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=je(n)}setAll(t){let n=Y.emptyPath(),r={},s=[];t.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=je(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(t){const n=this.field(t.popLast());Mn(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return Vt(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=n.mapValue.fields[t.get(r)];Mn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[t.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(t,n,r){re(n,(s,i)=>t[s]=i);for(const s of r)delete t[s]}clone(){return new lt(je(this.value))}}function au(e){const t=[];return re(e.fields,(n,r)=>{const s=new Y([n]);if(Mn(r)){const i=au(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)}),new ht(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(t,n,r,s,i,o,a){this.key=t,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(t){return new nt(t,0,R.min(),R.min(),R.min(),lt.empty(),0)}static newFoundDocument(t,n,r,s){return new nt(t,1,n,R.min(),r,s,0)}static newNoDocument(t,n){return new nt(t,2,n,R.min(),R.min(),lt.empty(),0)}static newUnknownDocument(t,n){return new nt(t,3,n,R.min(),R.min(),lt.empty(),2)}convertToFoundDocument(t,n){return!this.createTime.isEqual(R.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=lt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=lt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=R.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof nt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new nt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(t,n){this.position=t,this.inclusive=n}}function fo(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(i.field.isKeyField()?r=E.comparator(E.fromName(o.referenceValue),n.key):r=Te(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function po(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Vt(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(t,n="asc"){this.field=t,this.dir=n}}function vh(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{}class z extends uu{constructor(t,n,r){super(),this.field=t,this.op=n,this.value=r}static create(t,n,r){return t.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(t,n,r):new Ih(t,n,r):n==="array-contains"?new Ph(t,r):n==="in"?new Sh(t,r):n==="not-in"?new Vh(t,r):n==="array-contains-any"?new Ch(t,r):new z(t,n,r)}static createKeyFieldInFilter(t,n,r){return n==="in"?new Ah(t,r):new Rh(t,r)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Te(n,this.value)):n!==null&&te(this.value)===te(n)&&this.matchesComparison(Te(n,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return w()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class _t extends uu{constructor(t,n){super(),this.filters=t,this.op=n,this.ue=null}static create(t,n){return new _t(t,n)}matches(t){return cu(this)?this.filters.find(n=>!n.matches(t))===void 0:this.filters.find(n=>n.matches(t))!==void 0}getFlattenedFilters(){return this.ue!==null||(this.ue=this.filters.reduce((t,n)=>t.concat(n.getFlattenedFilters()),[])),this.ue}getFilters(){return Object.assign([],this.filters)}}function cu(e){return e.op==="and"}function lu(e){return wh(e)&&cu(e)}function wh(e){for(const t of e.filters)if(t instanceof _t)return!1;return!0}function hs(e){if(e instanceof z)return e.field.canonicalString()+e.op.toString()+Ee(e.value);if(lu(e))return e.filters.map(t=>hs(t)).join(",");{const t=e.filters.map(n=>hs(n)).join(",");return`${e.op}(${t})`}}function hu(e,t){return e instanceof z?function(r,s){return s instanceof z&&r.op===s.op&&r.field.isEqual(s.field)&&Vt(r.value,s.value)}(e,t):e instanceof _t?function(r,s){return s instanceof _t&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,a)=>i&&hu(o,s.filters[a]),!0):!1}(e,t):void w()}function du(e){return e instanceof z?function(n){return`${n.field.canonicalString()} ${n.op} ${Ee(n.value)}`}(e):e instanceof _t?function(n){return n.op.toString()+" {"+n.getFilters().map(du).join(" ,")+"}"}(e):"Filter"}class Ih extends z{constructor(t,n,r){super(t,n,r),this.key=E.fromName(r.referenceValue)}matches(t){const n=E.comparator(t.key,this.key);return this.matchesComparison(n)}}class Ah extends z{constructor(t,n){super(t,"in",n),this.keys=fu("in",n)}matches(t){return this.keys.some(n=>n.isEqual(t.key))}}class Rh extends z{constructor(t,n){super(t,"not-in",n),this.keys=fu("not-in",n)}matches(t){return!this.keys.some(n=>n.isEqual(t.key))}}function fu(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>E.fromName(r.referenceValue))}class Ph extends z{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return si(n)&&sn(n.arrayValue,this.value)}}class Sh extends z{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&sn(this.value.arrayValue,n)}}class Vh extends z{constructor(t,n){super(t,"not-in",n)}matches(t){if(sn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!sn(this.value.arrayValue,n)}}class Ch extends z{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!si(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>sn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(t,n=null,r=[],s=[],i=null,o=null,a=null){this.path=t,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.ce=null}}function mo(e,t=null,n=[],r=[],s=null,i=null,o=null){return new Dh(e,t,n,r,s,i,o)}function ii(e){const t=P(e);if(t.ce===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map(r=>hs(r)).join(","),n+="|ob:",n+=t.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Er(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(r=>Ee(r)).join(",")),t.endAt&&(n+="|ub:",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(r=>Ee(r)).join(",")),t.ce=n}return t.ce}function oi(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!vh(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!hu(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!po(e.startAt,t.startAt)&&po(e.endAt,t.endAt)}function ds(e){return E.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(t,n=null,r=[],s=[],i=null,o="F",a=null,u=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=u,this.le=null,this.he=null,this.Pe=null,this.startAt,this.endAt}}function kh(e,t,n,r,s,i,o,a){return new Se(e,t,n,r,s,i,o,a)}function ai(e){return new Se(e)}function go(e){return e.filters.length===0&&e.limit===null&&e.startAt==null&&e.endAt==null&&(e.explicitOrderBy.length===0||e.explicitOrderBy.length===1&&e.explicitOrderBy[0].field.isKeyField())}function pu(e){return e.collectionGroup!==null}function $e(e){const t=P(e);if(t.le===null){t.le=[];const n=new Set;for(const i of t.explicitOrderBy)t.le.push(i),n.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Z(Y.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(a=a.add(c.field))})}),a})(t).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||t.le.push(new on(i,r))}),n.has(Y.keyField().canonicalString())||t.le.push(new on(Y.keyField(),r))}return t.le}function Rt(e){const t=P(e);return t.he||(t.he=Nh(t,$e(e))),t.he}function Nh(e,t){if(e.limitType==="F")return mo(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new on(s.field,i)});const n=e.endAt?new Hn(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Hn(e.startAt.position,e.startAt.inclusive):null;return mo(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function fs(e,t){const n=e.filters.concat([t]);return new Se(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Xn(e,t,n){return new Se(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function vr(e,t){return oi(Rt(e),Rt(t))&&e.limitType===t.limitType}function mu(e){return`${ii(Rt(e))}|lt:${e.limitType}`}function ue(e){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>du(s)).join(", ")}]`),Er(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Ee(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Ee(s)).join(",")),`Target(${r})`}(Rt(e))}; limitType=${e.limitType})`}function wr(e,t){return t.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):E.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(e,t)&&function(r,s){for(const i of $e(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(e,t)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(e,t)&&function(r,s){return!(r.startAt&&!function(o,a,u){const c=fo(o,a,u);return o.inclusive?c<=0:c<0}(r.startAt,$e(r),s)||r.endAt&&!function(o,a,u){const c=fo(o,a,u);return o.inclusive?c>=0:c>0}(r.endAt,$e(r),s))}(e,t)}function bh(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function gu(e){return(t,n)=>{let r=!1;for(const s of $e(e)){const i=xh(s,t,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function xh(e,t,n){const r=e.field.isKeyField()?E.comparator(t.key,n.key):function(i,o,a){const u=o.data.field(i),c=a.data.field(i);return u!==null&&c!==null?Te(u,c):w()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return w()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={},this.innerSize=0}get(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,n){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,n]);s.push([t,n]),this.innerSize++}delete(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){re(this.inner,(n,r)=>{for(const[s,i]of r)t(s,i)})}isEmpty(){return iu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=new F(E.comparator);function Nt(){return Oh}const _u=new F(E.comparator);function Le(...e){let t=_u;for(const n of e)t=t.insert(n.key,n);return t}function yu(e){let t=_u;return e.forEach((n,r)=>t=t.insert(n,r.overlayedDocument)),t}function Wt(){return ze()}function Tu(){return ze()}function ze(){return new Ve(e=>e.toString(),(e,t)=>e.isEqual(t))}const Lh=new F(E.comparator),Mh=new Z(E.comparator);function S(...e){let t=Mh;for(const n of e)t=t.add(n);return t}const Fh=new Z(C);function Uh(){return Fh}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Wn(t)?"-0":t}}function vu(e){return{integerValue:""+e}}function Bh(e,t){return _h(t)?vu(t):Eu(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(){this._=void 0}}function qh(e,t,n){return e instanceof Yn?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ni(i)&&(i=ri(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,t):e instanceof an?Iu(e,t):e instanceof un?Au(e,t):function(s,i){const o=wu(s,i),a=_o(o)+_o(s.Ie);return ls(o)&&ls(s.Ie)?vu(a):Eu(s.serializer,a)}(e,t)}function jh(e,t,n){return e instanceof an?Iu(e,t):e instanceof un?Au(e,t):n}function wu(e,t){return e instanceof Jn?function(r){return ls(r)||function(i){return!!i&&"doubleValue"in i}(r)}(t)?t:{integerValue:0}:null}class Yn extends Ir{}class an extends Ir{constructor(t){super(),this.elements=t}}function Iu(e,t){const n=Ru(t);for(const r of e.elements)n.some(s=>Vt(s,r))||n.push(r);return{arrayValue:{values:n}}}class un extends Ir{constructor(t){super(),this.elements=t}}function Au(e,t){let n=Ru(t);for(const r of e.elements)n=n.filter(s=>!Vt(s,r));return{arrayValue:{values:n}}}class Jn extends Ir{constructor(t,n){super(),this.serializer=t,this.Ie=n}}function _o(e){return $(e.integerValue||e.doubleValue)}function Ru(e){return si(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function $h(e,t){return e.field.isEqual(t.field)&&function(r,s){return r instanceof an&&s instanceof an||r instanceof un&&s instanceof un?ye(r.elements,s.elements,Vt):r instanceof Jn&&s instanceof Jn?Vt(r.Ie,s.Ie):r instanceof Yn&&s instanceof Yn}(e.transform,t.transform)}class zh{constructor(t,n){this.version=t,this.transformResults=n}}class mt{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new mt}static exists(t){return new mt(void 0,t)}static updateTime(t){return new mt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Fn(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class Ar{}function Pu(e,t){if(!e.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return e.isNoDocument()?new ui(e.key,mt.none()):new Tn(e.key,e.data,mt.none());{const n=e.data,r=lt.empty();let s=new Z(Y.comparator);for(let i of t.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new jt(e.key,r,new ht(s.toArray()),mt.none())}}function Gh(e,t,n){e instanceof Tn?function(s,i,o){const a=s.value.clone(),u=To(s.fieldTransforms,i,o.transformResults);a.setAll(u),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(e,t,n):e instanceof jt?function(s,i,o){if(!Fn(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=To(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Su(s)),u.setAll(a),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(e,t,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,t,n)}function Ge(e,t,n,r){return e instanceof Tn?function(i,o,a,u){if(!Fn(i.precondition,o))return a;const c=i.value.clone(),l=Eo(i.fieldTransforms,u,o);return c.setAll(l),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(e,t,n,r):e instanceof jt?function(i,o,a,u){if(!Fn(i.precondition,o))return a;const c=Eo(i.fieldTransforms,u,o),l=o.data;return l.setAll(Su(i)),l.setAll(c),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(h=>h.field))}(e,t,n,r):function(i,o,a){return Fn(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(e,t,n)}function Kh(e,t){let n=null;for(const r of e.fieldTransforms){const s=t.data.field(r.field),i=wu(r.transform,s||null);i!=null&&(n===null&&(n=lt.empty()),n.set(r.field,i))}return n||null}function yo(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ye(r,s,(i,o)=>$h(i,o))}(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Tn extends Ar{constructor(t,n,r,s=[]){super(),this.key=t,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class jt extends Ar{constructor(t,n,r,s,i=[]){super(),this.key=t,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Su(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function To(e,t,n){const r=new Map;N(e.length===n.length);for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,jh(o,a,n[s]))}return r}function Eo(e,t,n){const r=new Map;for(const s of e){const i=s.transform,o=n.data.field(s.field);r.set(s.field,qh(i,o,t))}return r}class ui extends Ar{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Qh extends Ar{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(t,n,r,s){this.batchId=t,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Gh(i,t,r[s])}}applyToLocalView(t,n){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(n=Ge(r,t,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(n=Ge(r,t,n,this.localWriteTime));return n}applyToLocalDocumentSet(t,n){const r=Tu();return this.mutations.forEach(s=>{const i=t.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const u=Pu(o,a);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(R.min())}),r}keys(){return this.mutations.reduce((t,n)=>t.add(n.key),S())}isEqual(t){return this.batchId===t.batchId&&ye(this.mutations,t.mutations,(n,r)=>yo(n,r))&&ye(this.baseMutations,t.baseMutations,(n,r)=>yo(n,r))}}class ci{constructor(t,n,r,s){this.batch=t,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(t,n,r){N(t.mutations.length===r.length);let s=function(){return Lh}();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ci(t,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(t,n){this.largestBatchId=t,this.mutation=n}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t,n){this.count=t,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j,V;function Yh(e){switch(e){default:return w();case f.CANCELLED:case f.UNKNOWN:case f.DEADLINE_EXCEEDED:case f.RESOURCE_EXHAUSTED:case f.INTERNAL:case f.UNAVAILABLE:case f.UNAUTHENTICATED:return!1;case f.INVALID_ARGUMENT:case f.NOT_FOUND:case f.ALREADY_EXISTS:case f.PERMISSION_DENIED:case f.FAILED_PRECONDITION:case f.ABORTED:case f.OUT_OF_RANGE:case f.UNIMPLEMENTED:case f.DATA_LOSS:return!0}}function Vu(e){if(e===void 0)return St("GRPC error has no .code"),f.UNKNOWN;switch(e){case j.OK:return f.OK;case j.CANCELLED:return f.CANCELLED;case j.UNKNOWN:return f.UNKNOWN;case j.DEADLINE_EXCEEDED:return f.DEADLINE_EXCEEDED;case j.RESOURCE_EXHAUSTED:return f.RESOURCE_EXHAUSTED;case j.INTERNAL:return f.INTERNAL;case j.UNAVAILABLE:return f.UNAVAILABLE;case j.UNAUTHENTICATED:return f.UNAUTHENTICATED;case j.INVALID_ARGUMENT:return f.INVALID_ARGUMENT;case j.NOT_FOUND:return f.NOT_FOUND;case j.ALREADY_EXISTS:return f.ALREADY_EXISTS;case j.PERMISSION_DENIED:return f.PERMISSION_DENIED;case j.FAILED_PRECONDITION:return f.FAILED_PRECONDITION;case j.ABORTED:return f.ABORTED;case j.OUT_OF_RANGE:return f.OUT_OF_RANGE;case j.UNIMPLEMENTED:return f.UNIMPLEMENTED;case j.DATA_LOSS:return f.DATA_LOSS;default:return w()}}(V=j||(j={}))[V.OK=0]="OK",V[V.CANCELLED=1]="CANCELLED",V[V.UNKNOWN=2]="UNKNOWN",V[V.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",V[V.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",V[V.NOT_FOUND=5]="NOT_FOUND",V[V.ALREADY_EXISTS=6]="ALREADY_EXISTS",V[V.PERMISSION_DENIED=7]="PERMISSION_DENIED",V[V.UNAUTHENTICATED=16]="UNAUTHENTICATED",V[V.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",V[V.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",V[V.ABORTED=10]="ABORTED",V[V.OUT_OF_RANGE=11]="OUT_OF_RANGE",V[V.UNIMPLEMENTED=12]="UNIMPLEMENTED",V[V.INTERNAL=13]="INTERNAL",V[V.UNAVAILABLE=14]="UNAVAILABLE",V[V.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=new fe([4294967295,4294967295],0);function vo(e){const t=Jh().encode(e),n=new th;return n.update(t),new Uint8Array(n.digest())}function wo(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new fe([n,r],0),new fe([s,i],0)]}class li{constructor(t,n,r){if(this.bitmap=t,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Me(`Invalid padding: ${n}`);if(r<0)throw new Me(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Me(`Invalid hash count: ${r}`);if(t.length===0&&n!==0)throw new Me(`Invalid padding when bitmap length is 0: ${n}`);this.Te=8*t.length-n,this.Ee=fe.fromNumber(this.Te)}de(t,n,r){let s=t.add(n.multiply(fe.fromNumber(r)));return s.compare(Zh)===1&&(s=new fe([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Ee).toNumber()}Ae(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Te===0)return!1;const n=vo(t),[r,s]=wo(n);for(let i=0;i<this.hashCount;i++){const o=this.de(r,s,i);if(!this.Ae(o))return!1}return!0}static create(t,n,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new li(i,s,n);return r.forEach(a=>o.insert(a)),o}insert(t){if(this.Te===0)return;const n=vo(t),[r,s]=wo(n);for(let i=0;i<this.hashCount;i++){const o=this.de(r,s,i);this.Re(o)}}Re(t){const n=Math.floor(t/8),r=t%8;this.bitmap[n]|=1<<r}}class Me extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(t,n,r,s,i){this.snapshotVersion=t,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,n,r){const s=new Map;return s.set(t,En.createSynthesizedTargetChangeForCurrentChange(t,n,r)),new Rr(R.min(),s,new F(C),Nt(),S())}}class En{constructor(t,n,r,s,i){this.resumeToken=t,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,n,r){return new En(r,n,S(),S(),S())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(t,n,r,s){this.Ve=t,this.removedTargetIds=n,this.key=r,this.me=s}}class Cu{constructor(t,n){this.targetId=t,this.fe=n}}class Du{constructor(t,n,r=ot.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Io{constructor(){this.ge=0,this.pe=Ro(),this.ye=ot.EMPTY_BYTE_STRING,this.we=!1,this.Se=!0}get current(){return this.we}get resumeToken(){return this.ye}get be(){return this.ge!==0}get De(){return this.Se}Ce(t){t.approximateByteSize()>0&&(this.Se=!0,this.ye=t)}ve(){let t=S(),n=S(),r=S();return this.pe.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:w()}}),new En(this.ye,this.we,t,n,r)}Fe(){this.Se=!1,this.pe=Ro()}Me(t,n){this.Se=!0,this.pe=this.pe.insert(t,n)}xe(t){this.Se=!0,this.pe=this.pe.remove(t)}Oe(){this.ge+=1}Ne(){this.ge-=1,N(this.ge>=0)}Le(){this.Se=!0,this.we=!0}}class td{constructor(t){this.Be=t,this.ke=new Map,this.qe=Nt(),this.Qe=Ao(),this.Ke=new F(C)}$e(t){for(const n of t.Ve)t.me&&t.me.isFoundDocument()?this.Ue(n,t.me):this.We(n,t.key,t.me);for(const n of t.removedTargetIds)this.We(n,t.key,t.me)}Ge(t){this.forEachTarget(t,n=>{const r=this.ze(n);switch(t.state){case 0:this.je(n)&&r.Ce(t.resumeToken);break;case 1:r.Ne(),r.be||r.Fe(),r.Ce(t.resumeToken);break;case 2:r.Ne(),r.be||this.removeTarget(n);break;case 3:this.je(n)&&(r.Le(),r.Ce(t.resumeToken));break;case 4:this.je(n)&&(this.He(n),r.Ce(t.resumeToken));break;default:w()}})}forEachTarget(t,n){t.targetIds.length>0?t.targetIds.forEach(n):this.ke.forEach((r,s)=>{this.je(s)&&n(s)})}Je(t){const n=t.targetId,r=t.fe.count,s=this.Ye(n);if(s){const i=s.target;if(ds(i))if(r===0){const o=new E(i.path);this.We(n,o,nt.newNoDocument(o,R.min()))}else N(r===1);else{const o=this.Ze(n);if(o!==r){const a=this.Xe(t),u=a?this.et(a,t,o):1;if(u!==0){this.He(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(n,c)}}}}}Xe(t){const n=t.fe.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,a;try{o=Zt(r).toUint8Array()}catch(u){if(u instanceof ou)return _e("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{a=new li(o,s,i)}catch(u){return _e(u instanceof Me?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return a.Te===0?null:a}et(t,n,r){return n.fe.count===r-this.rt(t,n.targetId)?0:2}rt(t,n){const r=this.Be.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Be.nt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(a)||(this.We(n,i,null),s++)}),s}it(t){const n=new Map;this.ke.forEach((i,o)=>{const a=this.Ye(o);if(a){if(i.current&&ds(a.target)){const u=new E(a.target.path);this.qe.get(u)!==null||this.st(o,u)||this.We(o,u,nt.newNoDocument(u,t))}i.De&&(n.set(o,i.ve()),i.Fe())}});let r=S();this.Qe.forEach((i,o)=>{let a=!0;o.forEachWhile(u=>{const c=this.Ye(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.qe.forEach((i,o)=>o.setReadTime(t));const s=new Rr(t,n,this.Ke,this.qe,r);return this.qe=Nt(),this.Qe=Ao(),this.Ke=new F(C),s}Ue(t,n){if(!this.je(t))return;const r=this.st(t,n.key)?2:0;this.ze(t).Me(n.key,r),this.qe=this.qe.insert(n.key,n),this.Qe=this.Qe.insert(n.key,this.ot(n.key).add(t))}We(t,n,r){if(!this.je(t))return;const s=this.ze(t);this.st(t,n)?s.Me(n,1):s.xe(n),this.Qe=this.Qe.insert(n,this.ot(n).delete(t)),r&&(this.qe=this.qe.insert(n,r))}removeTarget(t){this.ke.delete(t)}Ze(t){const n=this.ze(t).ve();return this.Be.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}Oe(t){this.ze(t).Oe()}ze(t){let n=this.ke.get(t);return n||(n=new Io,this.ke.set(t,n)),n}ot(t){let n=this.Qe.get(t);return n||(n=new Z(C),this.Qe=this.Qe.insert(t,n)),n}je(t){const n=this.Ye(t)!==null;return n||g("WatchChangeAggregator","Detected inactive target",t),n}Ye(t){const n=this.ke.get(t);return n&&n.be?null:this.Be._t(t)}He(t){this.ke.set(t,new Io),this.Be.getRemoteKeysForTarget(t).forEach(n=>{this.We(t,n,null)})}st(t,n){return this.Be.getRemoteKeysForTarget(t).has(n)}}function Ao(){return new F(E.comparator)}function Ro(){return new F(E.comparator)}const ed={asc:"ASCENDING",desc:"DESCENDING"},nd={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rd={and:"AND",or:"OR"};class sd{constructor(t,n){this.databaseId=t,this.useProto3Json=n}}function ps(e,t){return e.useProto3Json||Er(t)?t:{value:t}}function Zn(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ku(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function id(e,t){return Zn(e,t.toTimestamp())}function Pt(e){return N(!!e),R.fromTimestamp(function(n){const r=Ft(n);return new G(r.seconds,r.nanos)}(e))}function hi(e,t){return ms(e,t).canonicalString()}function ms(e,t){const n=function(s){return new O(["projects",s.projectId,"databases",s.database])}(e).child("documents");return t===void 0?n:n.child(t)}function Nu(e){const t=O.fromString(e);return N(Mu(t)),t}function gs(e,t){return hi(e.databaseId,t.path)}function Gr(e,t){const n=Nu(t);if(n.get(1)!==e.databaseId.projectId)throw new y(f.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new y(f.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new E(xu(n))}function bu(e,t){return hi(e.databaseId,t)}function od(e){const t=Nu(e);return t.length===4?O.emptyPath():xu(t)}function _s(e){return new O(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function xu(e){return N(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function Po(e,t,n){return{name:gs(e,t),fields:n.value.mapValue.fields}}function ad(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:w()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(c,l){return c.useProto3Json?(N(l===void 0||typeof l=="string"),ot.fromBase64String(l||"")):(N(l===void 0||l instanceof Buffer||l instanceof Uint8Array),ot.fromUint8Array(l||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(c){const l=c.code===void 0?f.UNKNOWN:Vu(c.code);return new y(l,c.message||"")}(o);n=new Du(r,s,i,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Gr(e,r.document.name),i=Pt(r.document.updateTime),o=r.document.createTime?Pt(r.document.createTime):R.min(),a=new lt({mapValue:{fields:r.document.fields}}),u=nt.newFoundDocument(s,i,o,a),c=r.targetIds||[],l=r.removedTargetIds||[];n=new Un(c,l,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Gr(e,r.document),i=r.readTime?Pt(r.readTime):R.min(),o=nt.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Un([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Gr(e,r.document),i=r.removedTargetIds||[];n=new Un([],i,s,null)}else{if(!("filter"in t))return w();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Xh(s,i),a=r.targetId;n=new Cu(a,o)}}return n}function ud(e,t){let n;if(t instanceof Tn)n={update:Po(e,t.key,t.value)};else if(t instanceof ui)n={delete:gs(e,t.key)};else if(t instanceof jt)n={update:Po(e,t.key,t.data),updateMask:_d(t.fieldMask)};else{if(!(t instanceof Qh))return w();n={verify:gs(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(r=>function(i,o){const a=o.transform;if(a instanceof Yn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof an)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof un)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Jn)return{fieldPath:o.field.canonicalString(),increment:a.Ie};throw w()}(0,r))),t.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:id(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:w()}(e,t.precondition)),n}function cd(e,t){return e&&e.length>0?(N(t!==void 0),e.map(n=>function(s,i){let o=s.updateTime?Pt(s.updateTime):Pt(i);return o.isEqual(R.min())&&(o=Pt(i)),new zh(o,s.transformResults||[])}(n,t))):[]}function ld(e,t){return{documents:[bu(e,t.path)]}}function hd(e,t){const n={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=bu(e,s);const i=function(c){if(c.length!==0)return Lu(_t.create(c,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(c){if(c.length!==0)return c.map(l=>function(d){return{field:ce(d.field),direction:pd(d.dir)}}(l))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=ps(e,t.limit);return a!==null&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(t.endAt)),{ut:n,parent:s}}function dd(e){let t=od(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){N(r===1);const l=n.from[0];l.allDescendants?s=l.collectionId:t=t.child(l.collectionId)}let i=[];n.where&&(i=function(h){const d=Ou(h);return d instanceof _t&&lu(d)?d.getFilters():[d]}(n.where));let o=[];n.orderBy&&(o=function(h){return h.map(d=>function(v){return new on(le(v.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(v.direction))}(d))}(n.orderBy));let a=null;n.limit&&(a=function(h){let d;return d=typeof h=="object"?h.value:h,Er(d)?null:d}(n.limit));let u=null;n.startAt&&(u=function(h){const d=!!h.before,m=h.values||[];return new Hn(m,d)}(n.startAt));let c=null;return n.endAt&&(c=function(h){const d=!h.before,m=h.values||[];return new Hn(m,d)}(n.endAt)),kh(t,s,o,i,a,"F",u,c)}function fd(e,t){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return w()}}(t.purpose);return n==null?null:{"goog-listen-tags":n}}function Ou(e){return e.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=le(n.unaryFilter.field);return z.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=le(n.unaryFilter.field);return z.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=le(n.unaryFilter.field);return z.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=le(n.unaryFilter.field);return z.create(o,"!=",{nullValue:"NULL_VALUE"});default:return w()}}(e):e.fieldFilter!==void 0?function(n){return z.create(le(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return w()}}(n.fieldFilter.op),n.fieldFilter.value)}(e):e.compositeFilter!==void 0?function(n){return _t.create(n.compositeFilter.filters.map(r=>Ou(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return w()}}(n.compositeFilter.op))}(e):w()}function pd(e){return ed[e]}function md(e){return nd[e]}function gd(e){return rd[e]}function ce(e){return{fieldPath:e.canonicalString()}}function le(e){return Y.fromServerFormat(e.fieldPath)}function Lu(e){return e instanceof z?function(n){if(n.op==="=="){if(ho(n.value))return{unaryFilter:{field:ce(n.field),op:"IS_NAN"}};if(lo(n.value))return{unaryFilter:{field:ce(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(ho(n.value))return{unaryFilter:{field:ce(n.field),op:"IS_NOT_NAN"}};if(lo(n.value))return{unaryFilter:{field:ce(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ce(n.field),op:md(n.op),value:n.value}}}(e):e instanceof _t?function(n){const r=n.getFilters().map(s=>Lu(s));return r.length===1?r[0]:{compositeFilter:{op:gd(n.op),filters:r}}}(e):w()}function _d(e){const t=[];return e.fields.forEach(n=>t.push(n.canonicalString())),{fieldPaths:t}}function Mu(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(t,n,r,s,i=R.min(),o=R.min(),a=ot.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=u}withSequenceNumber(t){return new Ot(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,n){return new Ot(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ot(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ot(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(t){this.ct=t}}function Td(e){const t=dd({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?Xn(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(){this._n=new vd}addToCollectionParentIndex(t,n){return this._n.add(n),p.resolve()}getCollectionParents(t,n){return p.resolve(this._n.getEntries(n))}addFieldIndex(t,n){return p.resolve()}deleteFieldIndex(t,n){return p.resolve()}deleteAllFieldIndexes(t){return p.resolve()}createTargetIndexes(t,n){return p.resolve()}getDocumentsMatchingTarget(t,n){return p.resolve(null)}getIndexType(t,n){return p.resolve(0)}getFieldIndexes(t,n){return p.resolve([])}getNextCollectionGroupToUpdate(t){return p.resolve(null)}getMinOffset(t,n){return p.resolve(Mt.min())}getMinOffsetFromCollectionGroup(t,n){return p.resolve(Mt.min())}updateCollectionGroup(t,n,r){return p.resolve()}updateIndexEntries(t,n){return p.resolve()}}class vd{constructor(){this.index={}}add(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n]||new Z(O.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Z(O.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(t){this.On=t}next(){return this.On+=2,this.On}static Nn(){return new ve(0)}static Ln(){return new ve(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(){this.changes=new Ve(t=>t.toString(),(t,n)=>t.isEqual(n)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,n){this.assertNotApplied(),this.changes.set(t,nt.newInvalidDocument(t).setReadTime(n))}getEntry(t,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?p.resolve(r):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(t,n){this.overlayedDocument=t,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(t,n,r,s){this.remoteDocumentCache=t,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,n){let r=null;return this.documentOverlayCache.getOverlay(t,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,n))).next(s=>(r!==null&&Ge(r.mutation,s,ht.empty(),G.now()),s))}getDocuments(t,n){return this.remoteDocumentCache.getEntries(t,n).next(r=>this.getLocalViewOfDocuments(t,r,S()).next(()=>r))}getLocalViewOfDocuments(t,n,r=S()){const s=Wt();return this.populateOverlays(t,s,n).next(()=>this.computeViews(t,n,s,r).next(i=>{let o=Le();return i.forEach((a,u)=>{o=o.insert(a,u.overlayedDocument)}),o}))}getOverlayedDocuments(t,n){const r=Wt();return this.populateOverlays(t,r,n).next(()=>this.computeViews(t,n,r,S()))}populateOverlays(t,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(t,n,r,s){let i=Nt();const o=ze(),a=function(){return ze()}();return n.forEach((u,c)=>{const l=r.get(c.key);s.has(c.key)&&(l===void 0||l.mutation instanceof jt)?i=i.insert(c.key,c):l!==void 0?(o.set(c.key,l.mutation.getFieldMask()),Ge(l.mutation,c,l.mutation.getFieldMask(),G.now())):o.set(c.key,ht.empty())}),this.recalculateAndSaveOverlays(t,i).next(u=>(u.forEach((c,l)=>o.set(c,l)),n.forEach((c,l)=>{var h;return a.set(c,new Id(l,(h=o.get(c))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(t,n){const r=ze();let s=new F((o,a)=>o-a),i=S();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,n).next(o=>{for(const a of o)a.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let l=r.get(u)||ht.empty();l=a.applyToLocalView(c,l),r.set(u,l);const h=(s.get(a.batchId)||S()).add(u);s=s.insert(a.batchId,h)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const u=a.getNext(),c=u.key,l=u.value,h=Tu();l.forEach(d=>{if(!i.has(d)){const m=Pu(n.get(d),r.get(d));m!==null&&h.set(d,m),i=i.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(t,c,h))}return p.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,n){return this.remoteDocumentCache.getEntries(t,n).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,n,r,s){return function(o){return E.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(t,n.path):pu(n)?this.getDocumentsMatchingCollectionGroupQuery(t,n,r,s):this.getDocumentsMatchingCollectionQuery(t,n,r,s)}getNextDocuments(t,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,n,r.largestBatchId,s-i.size):p.resolve(Wt());let a=-1,u=i;return o.next(c=>p.forEach(c,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(l)?p.resolve():this.remoteDocumentCache.getEntry(t,l).next(d=>{u=u.insert(l,d)}))).next(()=>this.populateOverlays(t,c,i)).next(()=>this.computeViews(t,u,c,S())).next(l=>({batchId:a,changes:yu(l)})))})}getDocumentsMatchingDocumentQuery(t,n){return this.getDocument(t,new E(n)).next(r=>{let s=Le();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,n,r,s){const i=n.collectionGroup;let o=Le();return this.indexManager.getCollectionParents(t,i).next(a=>p.forEach(a,u=>{const c=function(h,d){return new Se(d,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,c,r,s).next(l=>{l.forEach((h,d)=>{o=o.insert(h,d)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(t,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,n,r,i,s))).next(o=>{i.forEach((u,c)=>{const l=c.getKey();o.get(l)===null&&(o=o.insert(l,nt.newInvalidDocument(l)))});let a=Le();return o.forEach((u,c)=>{const l=i.get(u);l!==void 0&&Ge(l.mutation,c,ht.empty(),G.now()),wr(n,c)&&(a=a.insert(u,c))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(t){this.serializer=t,this.cr=new Map,this.lr=new Map}getBundleMetadata(t,n){return p.resolve(this.cr.get(n))}saveBundleMetadata(t,n){return this.cr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:Pt(s.createTime)}}(n)),p.resolve()}getNamedQuery(t,n){return p.resolve(this.lr.get(n))}saveNamedQuery(t,n){return this.lr.set(n.name,function(s){return{name:s.name,query:Td(s.bundledQuery),readTime:Pt(s.readTime)}}(n)),p.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(){this.overlays=new F(E.comparator),this.hr=new Map}getOverlay(t,n){return p.resolve(this.overlays.get(n))}getOverlays(t,n){const r=Wt();return p.forEach(n,s=>this.getOverlay(t,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(t,n,r){return r.forEach((s,i)=>{this.ht(t,n,i)}),p.resolve()}removeOverlaysForBatchId(t,n,r){const s=this.hr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.hr.delete(r)),p.resolve()}getOverlaysForCollection(t,n,r){const s=Wt(),i=n.length+1,o=new E(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const u=a.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return p.resolve(s)}getOverlaysForCollectionGroup(t,n,r,s){let i=new F((c,l)=>c-l);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let l=i.get(c.largestBatchId);l===null&&(l=Wt(),i=i.insert(c.largestBatchId,l)),l.set(c.getKey(),c)}}const a=Wt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,l)=>a.set(c,l)),!(a.size()>=s)););return p.resolve(a)}ht(t,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.hr.get(s.largestBatchId).delete(r.key);this.hr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Hh(n,r));let i=this.hr.get(n);i===void 0&&(i=S(),this.hr.set(n,i)),this.hr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(){this.Pr=new Z(K.Ir),this.Tr=new Z(K.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(t,n){const r=new K(t,n);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(t,n){t.forEach(r=>this.addReference(r,n))}removeReference(t,n){this.Ar(new K(t,n))}Rr(t,n){t.forEach(r=>this.removeReference(r,n))}Vr(t){const n=new E(new O([])),r=new K(n,t),s=new K(n,t+1),i=[];return this.Tr.forEachInRange([r,s],o=>{this.Ar(o),i.push(o.key)}),i}mr(){this.Pr.forEach(t=>this.Ar(t))}Ar(t){this.Pr=this.Pr.delete(t),this.Tr=this.Tr.delete(t)}gr(t){const n=new E(new O([])),r=new K(n,t),s=new K(n,t+1);let i=S();return this.Tr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(t){const n=new K(t,0),r=this.Pr.firstAfterOrEqual(n);return r!==null&&t.isEqual(r.key)}}class K{constructor(t,n){this.key=t,this.pr=n}static Ir(t,n){return E.comparator(t.key,n.key)||C(t.pr,n.pr)}static Er(t,n){return C(t.pr,n.pr)||E.comparator(t.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(t,n){this.indexManager=t,this.referenceDelegate=n,this.mutationQueue=[],this.yr=1,this.wr=new Z(K.Ir)}checkEmpty(t){return p.resolve(this.mutationQueue.length===0)}addMutationBatch(t,n,r,s){const i=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Wh(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this.wr=this.wr.add(new K(a.key,i)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(t,n){return p.resolve(this.Sr(n))}getNextMutationBatchAfterBatchId(t,n){const r=n+1,s=this.br(r),i=s<0?0:s;return p.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(t){return p.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const r=new K(n,0),s=new K(n,Number.POSITIVE_INFINITY),i=[];return this.wr.forEachInRange([r,s],o=>{const a=this.Sr(o.pr);i.push(a)}),p.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,n){let r=new Z(C);return n.forEach(s=>{const i=new K(s,0),o=new K(s,Number.POSITIVE_INFINITY);this.wr.forEachInRange([i,o],a=>{r=r.add(a.pr)})}),p.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(t,n){const r=n.path,s=r.length+1;let i=r;E.isDocumentKey(i)||(i=i.child(""));const o=new K(new E(i),0);let a=new Z(C);return this.wr.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(a=a.add(u.pr)),!0)},o),p.resolve(this.Dr(a))}Dr(t){const n=[];return t.forEach(r=>{const s=this.Sr(r);s!==null&&n.push(s)}),n}removeMutationBatch(t,n){N(this.Cr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return p.forEach(n.mutations,s=>{const i=new K(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.wr=r})}Mn(t){}containsKey(t,n){const r=new K(n,0),s=this.wr.firstAfterOrEqual(r);return p.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,p.resolve()}Cr(t,n){return this.br(t)}br(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Sr(t){const n=this.br(t);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(t){this.vr=t,this.docs=function(){return new F(E.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.vr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const r=this.docs.get(n);return p.resolve(r?r.document.mutableCopy():nt.newInvalidDocument(n))}getEntries(t,n){let r=Nt();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():nt.newInvalidDocument(s))}),p.resolve(r)}getDocumentsMatchingQuery(t,n,r,s){let i=Nt();const o=n.path,a=new E(o.child("")),u=this.docs.getIteratorFrom(a);for(;u.hasNext();){const{key:c,value:{document:l}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||dh(hh(l),r)<=0||(s.has(l.key)||wr(n,l))&&(i=i.insert(l.key,l.mutableCopy()))}return p.resolve(i)}getAllFromCollectionGroup(t,n,r,s){w()}Fr(t,n){return p.forEach(this.docs,r=>n(r))}newChangeBuffer(t){return new Cd(this)}getSize(t){return p.resolve(this.size)}}class Cd extends wd{constructor(t){super(),this.ar=t}applyChanges(t){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.ar.addEntry(t,s)):this.ar.removeEntry(r)}),p.waitFor(n)}getFromCache(t,n){return this.ar.getEntry(t,n)}getAllFromCache(t,n){return this.ar.getEntries(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(t){this.persistence=t,this.Mr=new Ve(n=>ii(n),oi),this.lastRemoteSnapshotVersion=R.min(),this.highestTargetId=0,this.Or=0,this.Nr=new di,this.targetCount=0,this.Lr=ve.Nn()}forEachTarget(t,n){return this.Mr.forEach((r,s)=>n(s)),p.resolve()}getLastRemoteSnapshotVersion(t){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return p.resolve(this.Or)}allocateTargetId(t){return this.highestTargetId=this.Lr.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(t,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Or&&(this.Or=n),p.resolve()}qn(t){this.Mr.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.Lr=new ve(n),this.highestTargetId=n),t.sequenceNumber>this.Or&&(this.Or=t.sequenceNumber)}addTargetData(t,n){return this.qn(n),this.targetCount+=1,p.resolve()}updateTargetData(t,n){return this.qn(n),p.resolve()}removeTargetData(t,n){return this.Mr.delete(n.target),this.Nr.Vr(n.targetId),this.targetCount-=1,p.resolve()}removeTargets(t,n,r){let s=0;const i=[];return this.Mr.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.Mr.delete(o),i.push(this.removeMatchingKeysForTargetId(t,a.targetId)),s++)}),p.waitFor(i).next(()=>s)}getTargetCount(t){return p.resolve(this.targetCount)}getTargetData(t,n){const r=this.Mr.get(n)||null;return p.resolve(r)}addMatchingKeys(t,n,r){return this.Nr.dr(n,r),p.resolve()}removeMatchingKeys(t,n,r){this.Nr.Rr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(t,o))}),p.waitFor(i)}removeMatchingKeysForTargetId(t,n){return this.Nr.Vr(n),p.resolve()}getMatchingKeysForTargetId(t,n){const r=this.Nr.gr(n);return p.resolve(r)}containsKey(t,n){return p.resolve(this.Nr.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(t,n){this.Br={},this.overlays={},this.kr=new ei(0),this.qr=!1,this.qr=!0,this.referenceDelegate=t(this),this.Qr=new Dd(this),this.indexManager=new Ed,this.remoteDocumentCache=function(s){return new Vd(s)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new yd(n),this.$r=new Rd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let n=this.overlays[t.toKey()];return n||(n=new Pd,this.overlays[t.toKey()]=n),n}getMutationQueue(t,n){let r=this.Br[t.toKey()];return r||(r=new Sd(n,this.referenceDelegate),this.Br[t.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(t,n,r){g("MemoryPersistence","Starting transaction:",t);const s=new Nd(this.kr.next());return this.referenceDelegate.Ur(),r(s).next(i=>this.referenceDelegate.Wr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Gr(t,n){return p.or(Object.values(this.Br).map(r=>()=>r.containsKey(t,n)))}}class Nd extends ph{constructor(t){super(),this.currentSequenceNumber=t}}class fi{constructor(t){this.persistence=t,this.zr=new di,this.jr=null}static Hr(t){return new fi(t)}get Jr(){if(this.jr)return this.jr;throw w()}addReference(t,n,r){return this.zr.addReference(r,n),this.Jr.delete(r.toString()),p.resolve()}removeReference(t,n,r){return this.zr.removeReference(r,n),this.Jr.add(r.toString()),p.resolve()}markPotentiallyOrphaned(t,n){return this.Jr.add(n.toString()),p.resolve()}removeTarget(t,n){this.zr.Vr(n.targetId).forEach(s=>this.Jr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,n.targetId).next(s=>{s.forEach(i=>this.Jr.add(i.toString()))}).next(()=>r.removeTargetData(t,n))}Ur(){this.jr=new Set}Wr(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.Jr,r=>{const s=E.fromPath(r);return this.Yr(t,s).next(i=>{i||n.removeEntry(s,R.min())})}).next(()=>(this.jr=null,n.apply(t)))}updateLimboDocument(t,n){return this.Yr(t,n).next(r=>{r?this.Jr.delete(n.toString()):this.Jr.add(n.toString())})}Kr(t){return 0}Yr(t,n){return p.or([()=>p.resolve(this.zr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Gr(t,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(t,n,r,s){this.targetId=t,this.fromCache=n,this.qi=r,this.Qi=s}static Ki(t,n){let r=S(),s=S();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new pi(t,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return jc()?8:Qt.v(qn())>0?6:4}()}initialize(t,n){this.zi=t,this.indexManager=n,this.$i=!0}getDocumentsMatchingQuery(t,n,r,s){const i={result:null};return this.ji(t,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Hi(t,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new bd;return this.Ji(t,n,o).next(a=>{if(i.result=a,this.Ui)return this.Yi(t,n,o,a.size)})}).next(()=>i.result)}Yi(t,n,r,s){return r.documentReadCount<this.Wi?(Ne()<=bt.DEBUG&&g("QueryEngine","SDK will not create cache indexes for query:",ue(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),p.resolve()):(Ne()<=bt.DEBUG&&g("QueryEngine","Query:",ue(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Gi*s?(Ne()<=bt.DEBUG&&g("QueryEngine","The SDK decides to create cache indexes for query:",ue(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Rt(n))):p.resolve())}ji(t,n){if(go(n))return p.resolve(null);let r=Rt(n);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Xn(n,null,"F"),r=Rt(n)),this.indexManager.getDocumentsMatchingTarget(t,r).next(i=>{const o=S(...i);return this.zi.getDocuments(t,o).next(a=>this.indexManager.getMinOffset(t,r).next(u=>{const c=this.Zi(n,a);return this.Xi(n,c,o,u.readTime)?this.ji(t,Xn(n,null,"F")):this.es(t,c,n,u)}))})))}Hi(t,n,r,s){return go(n)||s.isEqual(R.min())?p.resolve(null):this.zi.getDocuments(t,r).next(i=>{const o=this.Zi(n,i);return this.Xi(n,o,r,s)?p.resolve(null):(Ne()<=bt.DEBUG&&g("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ue(n)),this.es(t,o,n,lh(s,-1)).next(a=>a))})}Zi(t,n){let r=new Z(gu(t));return n.forEach((s,i)=>{wr(t,i)&&(r=r.add(i))}),r}Xi(t,n,r,s){if(t.limit===null)return!1;if(r.size!==n.size)return!0;const i=t.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ji(t,n,r){return Ne()<=bt.DEBUG&&g("QueryEngine","Using full collection scan to execute query:",ue(n)),this.zi.getDocumentsMatchingQuery(t,n,Mt.min(),r)}es(t,n,r,s){return this.zi.getDocumentsMatchingQuery(t,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(t,n,r,s){this.persistence=t,this.ts=n,this.serializer=s,this.ns=new F(C),this.rs=new Ve(i=>ii(i),oi),this.ss=new Map,this.os=t.getRemoteDocumentCache(),this.Qr=t.getTargetCache(),this.$r=t.getBundleCache(),this._s(r)}_s(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Ad(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>t.collect(n,this.ns))}}function Ld(e,t,n,r){return new Od(e,t,n,r)}async function Fu(e,t){const n=P(e);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n._s(t),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let u=S();for(const c of s){o.push(c.batchId);for(const l of c.mutations)u=u.add(l.key)}for(const c of i){a.push(c.batchId);for(const l of c.mutations)u=u.add(l.key)}return n.localDocuments.getDocuments(r,u).next(c=>({us:c,removedBatchIds:o,addedBatchIds:a}))})})}function Md(e,t){const n=P(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),i=n.os.newChangeBuffer({trackRemovals:!0});return function(a,u,c,l){const h=c.batch,d=h.keys();let m=p.resolve();return d.forEach(v=>{m=m.next(()=>l.getEntry(u,v)).next(I=>{const T=c.docVersions.get(v);N(T!==null),I.version.compareTo(T)<0&&(h.applyToRemoteDocument(I,c),I.isValidDocument()&&(I.setReadTime(c.commitVersion),l.addEntry(I)))})}),m.next(()=>a.mutationQueue.removeMutationBatch(u,h))}(n,r,t,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let u=S();for(let c=0;c<a.mutationResults.length;++c)a.mutationResults[c].transformResults.length>0&&(u=u.add(a.batch.mutations[c].key));return u}(t))).next(()=>n.localDocuments.getDocuments(r,s))})}function Uu(e){const t=P(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",n=>t.Qr.getLastRemoteSnapshotVersion(n))}function Fd(e,t){const n=P(e),r=t.snapshotVersion;let s=n.ns;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.os.newChangeBuffer({trackRemovals:!0});s=n.ns;const a=[];t.targetChanges.forEach((l,h)=>{const d=s.get(h);if(!d)return;a.push(n.Qr.removeMatchingKeys(i,l.removedDocuments,h).next(()=>n.Qr.addMatchingKeys(i,l.addedDocuments,h)));let m=d.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(h)!==null?m=m.withResumeToken(ot.EMPTY_BYTE_STRING,R.min()).withLastLimboFreeSnapshotVersion(R.min()):l.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(l.resumeToken,r)),s=s.insert(h,m),function(I,T,k){return I.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-I.snapshotVersion.toMicroseconds()>=3e8?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0}(d,m,l)&&a.push(n.Qr.updateTargetData(i,m))});let u=Nt(),c=S();if(t.documentUpdates.forEach(l=>{t.resolvedLimboDocuments.has(l)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,l))}),a.push(Ud(i,o,t.documentUpdates).next(l=>{u=l.cs,c=l.ls})),!r.isEqual(R.min())){const l=n.Qr.getLastRemoteSnapshotVersion(i).next(h=>n.Qr.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(l)}return p.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(n.ns=s,i))}function Ud(e,t,n){let r=S(),s=S();return n.forEach(i=>r=r.add(i)),t.getEntries(e,r).next(i=>{let o=Nt();return n.forEach((a,u)=>{const c=i.get(a);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(a)),u.isNoDocument()&&u.version.isEqual(R.min())?(t.removeEntry(a,u.readTime),o=o.insert(a,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(t.addEntry(u),o=o.insert(a,u)):g("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",u.version)}),{cs:o,ls:s}})}function Bd(e,t){const n=P(e);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function qd(e,t){const n=P(e);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Qr.getTargetData(r,t).next(i=>i?(s=i,p.resolve(s)):n.Qr.allocateTargetId(r).next(o=>(s=new Ot(t,o,"TargetPurposeListen",r.currentSequenceNumber),n.Qr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.ns.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.ns=n.ns.insert(r.targetId,r),n.rs.set(t,r.targetId)),r})}async function ys(e,t,n){const r=P(e),s=r.ns.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!yn(o))throw o;g("LocalStore",`Failed to update sequence numbers for target ${t}: ${o}`)}r.ns=r.ns.remove(t),r.rs.delete(s.target)}function So(e,t,n){const r=P(e);let s=R.min(),i=S();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,l){const h=P(u),d=h.rs.get(l);return d!==void 0?p.resolve(h.ns.get(d)):h.Qr.getTargetData(c,l)}(r,o,Rt(t)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(o,a.targetId).next(u=>{i=u})}).next(()=>r.ts.getDocumentsMatchingQuery(o,t,n?s:R.min(),n?i:S())).next(a=>(jd(r,bh(t),a),{documents:a,hs:i})))}function jd(e,t,n){let r=e.ss.get(t)||R.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),e.ss.set(t,r)}class Vo{constructor(){this.activeTargetIds=Uh()}As(t){this.activeTargetIds=this.activeTargetIds.add(t)}Rs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}ds(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class $d{constructor(){this.no=new Vo,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,r){}addLocalQueryTarget(t){return this.no.As(t),this.ro[t]||"not-current"}updateQueryState(t,n,r){this.ro[t]=n}removeLocalQueryTarget(t){this.no.Rs(t)}isLocalQueryTarget(t){return this.no.activeTargetIds.has(t)}clearQueryState(t){delete this.ro[t]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(t){return this.no.activeTargetIds.has(t)}start(){return this.no=new Vo,Promise.resolve()}handleUserChange(t,n,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{io(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(t){this.uo.push(t)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){g("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.uo)t(0)}ao(){g("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.uo)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xn=null;function Kr(){return xn===null?xn=function(){return 268435456+Math.round(2147483648*Math.random())}():xn++,"0x"+xn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(t){this.lo=t.lo,this.ho=t.ho}Po(t){this.Io=t}To(t){this.Eo=t}onMessage(t){this.Ao=t}close(){this.ho()}send(t){this.lo(t)}Ro(){this.Io()}Vo(t){this.Eo(t)}mo(t){this.Ao(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="WebChannelConnection";class Qd extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.fo=r+"://"+n.host,this.po=`projects/${s}/databases/${i}`,this.yo=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get wo(){return!1}So(n,r,s,i,o){const a=Kr(),u=this.bo(n,r.toUriEncodedString());g("RestConnection",`Sending RPC '${n}' ${a}:`,u,s);const c={"google-cloud-resource-prefix":this.po,"x-goog-request-params":this.yo};return this.Do(c,i,o),this.Co(n,u,c,s).then(l=>(g("RestConnection",`Received RPC '${n}' ${a}: `,l),l),l=>{throw _e("RestConnection",`RPC '${n}' ${a} failed with error: `,l,"url: ",u,"request:",s),l})}vo(n,r,s,i,o,a){return this.So(n,r,s,i,o)}Do(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Pe}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}bo(n,r){const s=Gd[n];return`${this.fo}/v1/${r}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Co(t,n,r,s){const i=Kr();return new Promise((o,a)=>{const u=new Zl;u.setWithCredentials(!0),u.listenOnce(Yl.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case zr.NO_ERROR:const l=u.getResponseJson();g(tt,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(l)),o(l);break;case zr.TIMEOUT:g(tt,`RPC '${t}' ${i} timed out`),a(new y(f.DEADLINE_EXCEEDED,"Request time out"));break;case zr.HTTP_ERROR:const h=u.getStatus();if(g(tt,`RPC '${t}' ${i} failed with status:`,h,"response text:",u.getResponseText()),h>0){let d=u.getResponseJson();Array.isArray(d)&&(d=d[0]);const m=d==null?void 0:d.error;if(m&&m.status&&m.message){const v=function(T){const k=T.toLowerCase().replace(/_/g,"-");return Object.values(f).indexOf(k)>=0?k:f.UNKNOWN}(m.status);a(new y(v,m.message))}else a(new y(f.UNKNOWN,"Server responded with status "+u.getStatus()))}else a(new y(f.UNAVAILABLE,"Connection failed."));break;default:w()}}finally{g(tt,`RPC '${t}' ${i} completed.`)}});const c=JSON.stringify(s);g(tt,`RPC '${t}' ${i} sending request:`,s),u.send(n,"POST",c,r,15)})}Fo(t,n,r){const s=Kr(),i=[this.fo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=Hl(),a=Xl(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const l=i.join("");g(tt,`Creating RPC '${t}' stream ${s}: ${l}`,u);const h=o.createWebChannel(l,u);let d=!1,m=!1;const v=new Kd({lo:T=>{m?g(tt,`Not sending because RPC '${t}' stream ${s} is closed:`,T):(d||(g(tt,`Opening RPC '${t}' stream ${s} transport.`),h.open(),d=!0),g(tt,`RPC '${t}' stream ${s} sending:`,T),h.send(T))},ho:()=>h.close()}),I=(T,k,b)=>{T.listen(k,L=>{try{b(L)}catch(M){setTimeout(()=>{throw M},0)}})};return I(h,kn.EventType.OPEN,()=>{m||g(tt,`RPC '${t}' stream ${s} transport opened.`)}),I(h,kn.EventType.CLOSE,()=>{m||(m=!0,g(tt,`RPC '${t}' stream ${s} transport closed`),v.Vo())}),I(h,kn.EventType.ERROR,T=>{m||(m=!0,_e(tt,`RPC '${t}' stream ${s} transport errored:`,T),v.Vo(new y(f.UNAVAILABLE,"The operation could not be completed")))}),I(h,kn.EventType.MESSAGE,T=>{var k;if(!m){const b=T.data[0];N(!!b);const L=b,M=L.error||((k=L[0])===null||k===void 0?void 0:k.error);if(M){g(tt,`RPC '${t}' stream ${s} received error:`,M);const Ct=M.status;let Tt=function(Bc){const ji=j[Bc];if(ji!==void 0)return Vu(ji)}(Ct),oe=M.message;Tt===void 0&&(Tt=f.INTERNAL,oe="Unknown error status: "+Ct+" with message "+M.message),m=!0,v.Vo(new y(Tt,oe)),h.close()}else g(tt,`RPC '${t}' stream ${s} received:`,b),v.mo(b)}}),I(a,Jl.STAT_EVENT,T=>{T.stat===ro.PROXY?g(tt,`RPC '${t}' stream ${s} detected buffering proxy`):T.stat===ro.NOPROXY&&g(tt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{v.Ro()},0),v}}function Qr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(e){return new sd(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(t,n,r=1e3,s=1.5,i=6e4){this.oi=t,this.timerId=n,this.Mo=r,this.xo=s,this.Oo=i,this.No=0,this.Lo=null,this.Bo=Date.now(),this.reset()}reset(){this.No=0}ko(){this.No=this.Oo}qo(t){this.cancel();const n=Math.floor(this.No+this.Qo()),r=Math.max(0,Date.now()-this.Bo),s=Math.max(0,n-r);s>0&&g("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.No} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Lo=this.oi.enqueueAfterDelay(this.timerId,s,()=>(this.Bo=Date.now(),t())),this.No*=this.xo,this.No<this.Mo&&(this.No=this.Mo),this.No>this.Oo&&(this.No=this.Oo)}Ko(){this.Lo!==null&&(this.Lo.skipDelay(),this.Lo=null)}cancel(){this.Lo!==null&&(this.Lo.cancel(),this.Lo=null)}Qo(){return(Math.random()-.5)*this.No}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(t,n,r,s,i,o,a,u){this.oi=t,this.$o=r,this.Uo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=u,this.state=0,this.Wo=0,this.Go=null,this.zo=null,this.stream=null,this.jo=new Bu(t,n)}Ho(){return this.state===1||this.state===5||this.Jo()}Jo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Yo()}async stop(){this.Ho()&&await this.close(0)}Zo(){this.state=0,this.jo.reset()}Xo(){this.Jo()&&this.Go===null&&(this.Go=this.oi.enqueueAfterDelay(this.$o,6e4,()=>this.e_()))}t_(t){this.n_(),this.stream.send(t)}async e_(){if(this.Jo())return this.close(0)}n_(){this.Go&&(this.Go.cancel(),this.Go=null)}r_(){this.zo&&(this.zo.cancel(),this.zo=null)}async close(t,n){this.n_(),this.r_(),this.jo.cancel(),this.Wo++,t!==4?this.jo.reset():n&&n.code===f.RESOURCE_EXHAUSTED?(St(n.toString()),St("Using maximum backoff delay to prevent overloading the backend."),this.jo.ko()):n&&n.code===f.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.i_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.To(n)}i_(){}auth(){this.state=1;const t=this.s_(this.Wo),n=this.Wo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Wo===n&&this.o_(r,s)},r=>{t(()=>{const s=new y(f.UNKNOWN,"Fetching auth token failed: "+r.message);return this.__(s)})})}o_(t,n){const r=this.s_(this.Wo);this.stream=this.a_(t,n),this.stream.Po(()=>{r(()=>(this.state=2,this.zo=this.oi.enqueueAfterDelay(this.Uo,1e4,()=>(this.Jo()&&(this.state=3),Promise.resolve())),this.listener.Po()))}),this.stream.To(s=>{r(()=>this.__(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}Yo(){this.state=5,this.jo.qo(async()=>{this.state=0,this.start()})}__(t){return g("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}s_(t){return n=>{this.oi.enqueueAndForget(()=>this.Wo===t?n():(g("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wd extends qu{constructor(t,n,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}a_(t,n){return this.connection.Fo("Listen",t,n)}onMessage(t){this.jo.reset();const n=ad(this.serializer,t),r=function(i){if(!("targetChange"in i))return R.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?R.min():o.readTime?Pt(o.readTime):R.min()}(t);return this.listener.u_(n,r)}c_(t){const n={};n.database=_s(this.serializer),n.addTarget=function(i,o){let a;const u=o.target;if(a=ds(u)?{documents:ld(i,u)}:{query:hd(i,u).ut},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=ku(i,o.resumeToken);const c=ps(i,o.expectedCount);c!==null&&(a.expectedCount=c)}else if(o.snapshotVersion.compareTo(R.min())>0){a.readTime=Zn(i,o.snapshotVersion.toTimestamp());const c=ps(i,o.expectedCount);c!==null&&(a.expectedCount=c)}return a}(this.serializer,t);const r=fd(this.serializer,t);r&&(n.labels=r),this.t_(n)}l_(t){const n={};n.database=_s(this.serializer),n.removeTarget=t,this.t_(n)}}class Hd extends qu{constructor(t,n,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i,this.h_=!1}get P_(){return this.h_}start(){this.h_=!1,this.lastStreamToken=void 0,super.start()}i_(){this.h_&&this.I_([])}a_(t,n){return this.connection.Fo("Write",t,n)}onMessage(t){if(N(!!t.streamToken),this.lastStreamToken=t.streamToken,this.h_){this.jo.reset();const n=cd(t.writeResults,t.commitTime),r=Pt(t.commitTime);return this.listener.T_(r,n)}return N(!t.writeResults||t.writeResults.length===0),this.h_=!0,this.listener.E_()}d_(){const t={};t.database=_s(this.serializer),this.t_(t)}I_(t){const n={streamToken:this.lastStreamToken,writes:t.map(r=>ud(this.serializer,r))};this.t_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd extends class{}{constructor(t,n,r,s){super(),this.authCredentials=t,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.A_=!1}R_(){if(this.A_)throw new y(f.FAILED_PRECONDITION,"The client has already been terminated.")}So(t,n,r,s){return this.R_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(t,ms(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new y(f.UNKNOWN,i.toString())})}vo(t,n,r,s,i){return this.R_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.vo(t,ms(n,r),s,o,a,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new y(f.UNKNOWN,o.toString())})}terminate(){this.A_=!0,this.connection.terminate()}}class Yd{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.m_=0,this.f_=null,this.g_=!0}p_(){this.m_===0&&(this.y_("Unknown"),this.f_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.f_=null,this.w_("Backend didn't respond within 10 seconds."),this.y_("Offline"),Promise.resolve())))}S_(t){this.state==="Online"?this.y_("Unknown"):(this.m_++,this.m_>=1&&(this.b_(),this.w_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.y_("Offline")))}set(t){this.b_(),this.m_=0,t==="Online"&&(this.g_=!1),this.y_(t)}y_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}w_(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.g_?(St(n),this.g_=!1):g("OnlineStateTracker",n)}b_(){this.f_!==null&&(this.f_.cancel(),this.f_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(t,n,r,s,i){this.localStore=t,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.D_=[],this.C_=new Map,this.v_=new Set,this.F_=[],this.M_=i,this.M_.io(o=>{r.enqueueAndForget(async()=>{se(this)&&(g("RemoteStore","Restarting streams for network reachability change."),await async function(u){const c=P(u);c.v_.add(4),await vn(c),c.x_.set("Unknown"),c.v_.delete(4),await Sr(c)}(this))})}),this.x_=new Yd(r,s)}}async function Sr(e){if(se(e))for(const t of e.F_)await t(!0)}async function vn(e){for(const t of e.F_)await t(!1)}function ju(e,t){const n=P(e);n.C_.has(t.targetId)||(n.C_.set(t.targetId,t),yi(n)?_i(n):Ce(n).Jo()&&gi(n,t))}function mi(e,t){const n=P(e),r=Ce(n);n.C_.delete(t),r.Jo()&&$u(n,t),n.C_.size===0&&(r.Jo()?r.Xo():se(n)&&n.x_.set("Unknown"))}function gi(e,t){if(e.O_.Oe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(R.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Ce(e).c_(t)}function $u(e,t){e.O_.Oe(t),Ce(e).l_(t)}function _i(e){e.O_=new td({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),_t:t=>e.C_.get(t)||null,nt:()=>e.datastore.serializer.databaseId}),Ce(e).start(),e.x_.p_()}function yi(e){return se(e)&&!Ce(e).Ho()&&e.C_.size>0}function se(e){return P(e).v_.size===0}function zu(e){e.O_=void 0}async function Zd(e){e.C_.forEach((t,n)=>{gi(e,t)})}async function tf(e,t){zu(e),yi(e)?(e.x_.S_(t),_i(e)):e.x_.set("Unknown")}async function ef(e,t,n){if(e.x_.set("Online"),t instanceof Du&&t.state===2&&t.cause)try{await async function(s,i){const o=i.cause;for(const a of i.targetIds)s.C_.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.C_.delete(a),s.O_.removeTarget(a))}(e,t)}catch(r){g("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await tr(e,r)}else if(t instanceof Un?e.O_.$e(t):t instanceof Cu?e.O_.Je(t):e.O_.Ge(t),!n.isEqual(R.min()))try{const r=await Uu(e.localStore);n.compareTo(r)>=0&&await function(i,o){const a=i.O_.it(o);return a.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const l=i.C_.get(c);l&&i.C_.set(c,l.withResumeToken(u.resumeToken,o))}}),a.targetMismatches.forEach((u,c)=>{const l=i.C_.get(u);if(!l)return;i.C_.set(u,l.withResumeToken(ot.EMPTY_BYTE_STRING,l.snapshotVersion)),$u(i,u);const h=new Ot(l.target,u,c,l.sequenceNumber);gi(i,h)}),i.remoteSyncer.applyRemoteEvent(a)}(e,n)}catch(r){g("RemoteStore","Failed to raise snapshot:",r),await tr(e,r)}}async function tr(e,t,n){if(!yn(t))throw t;e.v_.add(1),await vn(e),e.x_.set("Offline"),n||(n=()=>Uu(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{g("RemoteStore","Retrying IndexedDB access"),await n(),e.v_.delete(1),await Sr(e)})}function Gu(e,t){return t().catch(n=>tr(e,n,t))}async function Vr(e){const t=P(e),n=Ut(t);let r=t.D_.length>0?t.D_[t.D_.length-1].batchId:-1;for(;nf(t);)try{const s=await Bd(t.localStore,r);if(s===null){t.D_.length===0&&n.Xo();break}r=s.batchId,rf(t,s)}catch(s){await tr(t,s)}Ku(t)&&Qu(t)}function nf(e){return se(e)&&e.D_.length<10}function rf(e,t){e.D_.push(t);const n=Ut(e);n.Jo()&&n.P_&&n.I_(t.mutations)}function Ku(e){return se(e)&&!Ut(e).Ho()&&e.D_.length>0}function Qu(e){Ut(e).start()}async function sf(e){Ut(e).d_()}async function of(e){const t=Ut(e);for(const n of e.D_)t.I_(n.mutations)}async function af(e,t,n){const r=e.D_.shift(),s=ci.from(r,t,n);await Gu(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await Vr(e)}async function uf(e,t){t&&Ut(e).P_&&await async function(r,s){if(function(o){return Yh(o)&&o!==f.ABORTED}(s.code)){const i=r.D_.shift();Ut(r).Zo(),await Gu(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Vr(r)}}(e,t),Ku(e)&&Qu(e)}async function Do(e,t){const n=P(e);n.asyncQueue.verifyOperationInProgress(),g("RemoteStore","RemoteStore received new credentials");const r=se(n);n.v_.add(3),await vn(n),r&&n.x_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.v_.delete(3),await Sr(n)}async function cf(e,t){const n=P(e);t?(n.v_.delete(2),await Sr(n)):t||(n.v_.add(2),await vn(n),n.x_.set("Unknown"))}function Ce(e){return e.N_||(e.N_=function(n,r,s){const i=P(n);return i.R_(),new Wd(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(e.datastore,e.asyncQueue,{Po:Zd.bind(null,e),To:tf.bind(null,e),u_:ef.bind(null,e)}),e.F_.push(async t=>{t?(e.N_.Zo(),yi(e)?_i(e):e.x_.set("Unknown")):(await e.N_.stop(),zu(e))})),e.N_}function Ut(e){return e.L_||(e.L_=function(n,r,s){const i=P(n);return i.R_(),new Hd(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(e.datastore,e.asyncQueue,{Po:sf.bind(null,e),To:uf.bind(null,e),E_:of.bind(null,e),T_:af.bind(null,e)}),e.F_.push(async t=>{t?(e.L_.Zo(),await Vr(e)):(await e.L_.stop(),e.D_.length>0&&(g("RemoteStore",`Stopping write stream with ${e.D_.length} pending writes`),e.D_=[]))})),e.L_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(t,n,r,s,i){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new At,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,n,r,s,i){const o=Date.now()+r,a=new Ti(t,n,o,s,i);return a.start(r),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new y(f.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ei(e,t){if(St("AsyncQueue",`${t}: ${e}`),yn(e))return new y(f.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(t){this.comparator=t?(n,r)=>t(n,r)||E.comparator(n.key,r.key):(n,r)=>E.comparator(n.key,r.key),this.keyedMap=Le(),this.sortedSet=new F(this.comparator)}static emptySet(t){return new pe(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const n=this.keyedMap.get(t);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((n,r)=>(t(n),!1))}add(t){const n=this.delete(t.key);return n.copy(n.keyedMap.insert(t.key,t),n.sortedSet.insert(t,null))}delete(t){const n=this.get(t);return n?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(n)):this}isEqual(t){if(!(t instanceof pe)||this.size!==t.size)return!1;const n=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(n=>{t.push(n.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,n){const r=new pe;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(){this.B_=new F(E.comparator)}track(t){const n=t.doc.key,r=this.B_.get(n);r?t.type!==0&&r.type===3?this.B_=this.B_.insert(n,t):t.type===3&&r.type!==1?this.B_=this.B_.insert(n,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.B_=this.B_.insert(n,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.B_=this.B_.insert(n,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.B_=this.B_.remove(n):t.type===1&&r.type===2?this.B_=this.B_.insert(n,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.B_=this.B_.insert(n,{type:2,doc:t.doc}):w():this.B_=this.B_.insert(n,t)}k_(){const t=[];return this.B_.inorderTraversal((n,r)=>{t.push(r)}),t}}class we{constructor(t,n,r,s,i,o,a,u,c){this.query=t,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(t,n,r,s,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new we(t,n,pe.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&vr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const n=this.docChanges,r=t.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(){this.q_=void 0,this.Q_=[]}K_(){return this.Q_.some(t=>t.U_())}}class hf{constructor(){this.queries=new Ve(t=>mu(t),vr),this.onlineState="Unknown",this.W_=new Set}}async function Wu(e,t){const n=P(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.K_()&&t.U_()&&(r=2):(i=new lf,r=t.U_()?0:1);try{switch(r){case 0:i.q_=await n.onListen(s,!0);break;case 1:i.q_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const a=Ei(o,`Initialization of query '${ue(t.query)}' failed`);return void t.onError(a)}n.queries.set(s,i),i.Q_.push(t),t.G_(n.onlineState),i.q_&&t.z_(i.q_)&&vi(n)}async function Hu(e,t){const n=P(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const o=i.Q_.indexOf(t);o>=0&&(i.Q_.splice(o,1),i.Q_.length===0?s=t.U_()?0:1:!i.K_()&&t.U_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function df(e,t){const n=P(e);let r=!1;for(const s of t){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.Q_)a.z_(s)&&(r=!0);o.q_=s}}r&&vi(n)}function ff(e,t,n){const r=P(e),s=r.queries.get(t);if(s)for(const i of s.Q_)i.onError(n);r.queries.delete(t)}function vi(e){e.W_.forEach(t=>{t.next()})}var Ts,No;(No=Ts||(Ts={})).j_="default",No.Cache="cache";class Xu{constructor(t,n,r){this.query=t,this.H_=n,this.J_=!1,this.Y_=null,this.onlineState="Unknown",this.options=r||{}}z_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new we(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let n=!1;return this.J_?this.Z_(t)&&(this.H_.next(t),n=!0):this.X_(t,this.onlineState)&&(this.ea(t),n=!0),this.Y_=t,n}onError(t){this.H_.error(t)}G_(t){this.onlineState=t;let n=!1;return this.Y_&&!this.J_&&this.X_(this.Y_,t)&&(this.ea(this.Y_),n=!0),n}X_(t,n){if(!t.fromCache||!this.U_())return!0;const r=n!=="Offline";return(!this.options.ta||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||n==="Offline")}Z_(t){if(t.docChanges.length>0)return!0;const n=this.Y_&&this.Y_.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ea(t){t=we.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.J_=!0,this.H_.next(t)}U_(){return this.options.source!==Ts.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(t){this.key=t}}class Ju{constructor(t){this.key=t}}class pf{constructor(t,n){this.query=t,this.ua=n,this.ca=null,this.hasCachedResults=!1,this.current=!1,this.la=S(),this.mutatedKeys=S(),this.ha=gu(t),this.Pa=new pe(this.ha)}get Ia(){return this.ua}Ta(t,n){const r=n?n.Ea:new ko,s=n?n.Pa:this.Pa;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((l,h)=>{const d=s.get(l),m=wr(this.query,h)?h:null,v=!!d&&this.mutatedKeys.has(d.key),I=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let T=!1;d&&m?d.data.isEqual(m.data)?v!==I&&(r.track({type:3,doc:m}),T=!0):this.da(d,m)||(r.track({type:2,doc:m}),T=!0,(u&&this.ha(m,u)>0||c&&this.ha(m,c)<0)&&(a=!0)):!d&&m?(r.track({type:0,doc:m}),T=!0):d&&!m&&(r.track({type:1,doc:d}),T=!0,(u||c)&&(a=!0)),T&&(m?(o=o.add(m),i=I?i.add(l):i.delete(l)):(o=o.delete(l),i=i.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),i=i.delete(l.key),r.track({type:1,doc:l})}return{Pa:o,Ea:r,Xi:a,mutatedKeys:i}}da(t,n){return t.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(t,n,r,s){const i=this.Pa;this.Pa=t.Pa,this.mutatedKeys=t.mutatedKeys;const o=t.Ea.k_();o.sort((l,h)=>function(m,v){const I=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return w()}};return I(m)-I(v)}(l.type,h.type)||this.ha(l.doc,h.doc)),this.Aa(r),s=s!=null&&s;const a=n&&!s?this.Ra():[],u=this.la.size===0&&this.current&&!s?1:0,c=u!==this.ca;return this.ca=u,o.length!==0||c?{snapshot:new we(this.query,t.Pa,i,o,t.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),Va:a}:{Va:a}}G_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Pa:this.Pa,Ea:new ko,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{Va:[]}}ma(t){return!this.ua.has(t)&&!!this.Pa.has(t)&&!this.Pa.get(t).hasLocalMutations}Aa(t){t&&(t.addedDocuments.forEach(n=>this.ua=this.ua.add(n)),t.modifiedDocuments.forEach(n=>{}),t.removedDocuments.forEach(n=>this.ua=this.ua.delete(n)),this.current=t.current)}Ra(){if(!this.current)return[];const t=this.la;this.la=S(),this.Pa.forEach(r=>{this.ma(r.key)&&(this.la=this.la.add(r.key))});const n=[];return t.forEach(r=>{this.la.has(r)||n.push(new Ju(r))}),this.la.forEach(r=>{t.has(r)||n.push(new Yu(r))}),n}fa(t){this.ua=t.hs,this.la=S();const n=this.Ta(t.documents);return this.applyChanges(n,!0)}ga(){return we.fromInitialDocuments(this.query,this.Pa,this.mutatedKeys,this.ca===0,this.hasCachedResults)}}class mf{constructor(t,n,r){this.query=t,this.targetId=n,this.view=r}}class gf{constructor(t){this.key=t,this.pa=!1}}class _f{constructor(t,n,r,s,i,o){this.localStore=t,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.ya={},this.wa=new Ve(a=>mu(a),vr),this.Sa=new Map,this.ba=new Set,this.Da=new F(E.comparator),this.Ca=new Map,this.va=new di,this.Fa={},this.Ma=new Map,this.xa=ve.Ln(),this.onlineState="Unknown",this.Oa=void 0}get isPrimaryClient(){return this.Oa===!0}}async function yf(e,t,n=!0){const r=sc(e);let s;const i=r.wa.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.ga()):s=await Zu(r,t,n,!0),s}async function Tf(e,t){const n=sc(e);await Zu(n,t,!0,!1)}async function Zu(e,t,n,r){const s=await qd(e.localStore,Rt(t)),i=s.targetId,o=n?e.sharedClientState.addLocalQueryTarget(i):"not-current";let a;return r&&(a=await Ef(e,t,i,o==="current",s.resumeToken)),e.isPrimaryClient&&n&&ju(e.remoteStore,s),a}async function Ef(e,t,n,r,s){e.Na=(h,d,m)=>async function(I,T,k,b){let L=T.view.Ta(k);L.Xi&&(L=await So(I.localStore,T.query,!1).then(({documents:oe})=>T.view.Ta(oe,L)));const M=b&&b.targetChanges.get(T.targetId),Ct=b&&b.targetMismatches.get(T.targetId)!=null,Tt=T.view.applyChanges(L,I.isPrimaryClient,M,Ct);return xo(I,T.targetId,Tt.Va),Tt.snapshot}(e,h,d,m);const i=await So(e.localStore,t,!0),o=new pf(t,i.hs),a=o.Ta(i.documents),u=En.createSynthesizedTargetChangeForCurrentChange(n,r&&e.onlineState!=="Offline",s),c=o.applyChanges(a,e.isPrimaryClient,u);xo(e,n,c.Va);const l=new mf(t,n,o);return e.wa.set(t,l),e.Sa.has(n)?e.Sa.get(n).push(t):e.Sa.set(n,[t]),c.snapshot}async function vf(e,t,n){const r=P(e),s=r.wa.get(t),i=r.Sa.get(s.targetId);if(i.length>1)return r.Sa.set(s.targetId,i.filter(o=>!vr(o,t))),void r.wa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ys(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&mi(r.remoteStore,s.targetId),Es(r,s.targetId)}).catch(_n)):(Es(r,s.targetId),await ys(r.localStore,s.targetId,!0))}async function wf(e,t){const n=P(e),r=n.wa.get(t),s=n.Sa.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),mi(n.remoteStore,r.targetId))}async function If(e,t,n){const r=Df(e);try{const s=await function(o,a){const u=P(o),c=G.now(),l=a.reduce((m,v)=>m.add(v.key),S());let h,d;return u.persistence.runTransaction("Locally write mutations","readwrite",m=>{let v=Nt(),I=S();return u.os.getEntries(m,l).next(T=>{v=T,v.forEach((k,b)=>{b.isValidDocument()||(I=I.add(k))})}).next(()=>u.localDocuments.getOverlayedDocuments(m,v)).next(T=>{h=T;const k=[];for(const b of a){const L=Kh(b,h.get(b.key).overlayedDocument);L!=null&&k.push(new jt(b.key,L,au(L.value.mapValue),mt.exists(!0)))}return u.mutationQueue.addMutationBatch(m,c,k,a)}).next(T=>{d=T;const k=T.applyToLocalDocumentSet(h,I);return u.documentOverlayCache.saveOverlays(m,T.batchId,k)})}).then(()=>({batchId:d.batchId,changes:yu(h)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(o,a,u){let c=o.Fa[o.currentUser.toKey()];c||(c=new F(C)),c=c.insert(a,u),o.Fa[o.currentUser.toKey()]=c}(r,s.batchId,n),await wn(r,s.changes),await Vr(r.remoteStore)}catch(s){const i=Ei(s,"Failed to persist write");n.reject(i)}}async function tc(e,t){const n=P(e);try{const r=await Fd(n.localStore,t);t.targetChanges.forEach((s,i)=>{const o=n.Ca.get(i);o&&(N(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.pa=!0:s.modifiedDocuments.size>0?N(o.pa):s.removedDocuments.size>0&&(N(o.pa),o.pa=!1))}),await wn(n,r,t)}catch(r){await _n(r)}}function bo(e,t,n){const r=P(e);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.wa.forEach((i,o)=>{const a=o.view.G_(t);a.snapshot&&s.push(a.snapshot)}),function(o,a){const u=P(o);u.onlineState=a;let c=!1;u.queries.forEach((l,h)=>{for(const d of h.Q_)d.G_(a)&&(c=!0)}),c&&vi(u)}(r.eventManager,t),s.length&&r.ya.u_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Af(e,t,n){const r=P(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Ca.get(t),i=s&&s.key;if(i){let o=new F(E.comparator);o=o.insert(i,nt.newNoDocument(i,R.min()));const a=S().add(i),u=new Rr(R.min(),new Map,new F(C),o,a);await tc(r,u),r.Da=r.Da.remove(i),r.Ca.delete(t),wi(r)}else await ys(r.localStore,t,!1).then(()=>Es(r,t,n)).catch(_n)}async function Rf(e,t){const n=P(e),r=t.batch.batchId;try{const s=await Md(n.localStore,t);nc(n,r,null),ec(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await wn(n,s)}catch(s){await _n(s)}}async function Pf(e,t,n){const r=P(e);try{const s=await function(o,a){const u=P(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let l;return u.mutationQueue.lookupMutationBatch(c,a).next(h=>(N(h!==null),l=h.keys(),u.mutationQueue.removeMutationBatch(c,h))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,l,a)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,l)).next(()=>u.localDocuments.getDocuments(c,l))})}(r.localStore,t);nc(r,t,n),ec(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await wn(r,s)}catch(s){await _n(s)}}function ec(e,t){(e.Ma.get(t)||[]).forEach(n=>{n.resolve()}),e.Ma.delete(t)}function nc(e,t,n){const r=P(e);let s=r.Fa[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(n?i.reject(n):i.resolve(),s=s.remove(t)),r.Fa[r.currentUser.toKey()]=s}}function Es(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Sa.get(t))e.wa.delete(r),n&&e.ya.La(r,n);e.Sa.delete(t),e.isPrimaryClient&&e.va.Vr(t).forEach(r=>{e.va.containsKey(r)||rc(e,r)})}function rc(e,t){e.ba.delete(t.path.canonicalString());const n=e.Da.get(t);n!==null&&(mi(e.remoteStore,n),e.Da=e.Da.remove(t),e.Ca.delete(n),wi(e))}function xo(e,t,n){for(const r of n)r instanceof Yu?(e.va.addReference(r.key,t),Sf(e,r)):r instanceof Ju?(g("SyncEngine","Document no longer in limbo: "+r.key),e.va.removeReference(r.key,t),e.va.containsKey(r.key)||rc(e,r.key)):w()}function Sf(e,t){const n=t.key,r=n.path.canonicalString();e.Da.get(n)||e.ba.has(r)||(g("SyncEngine","New document in limbo: "+n),e.ba.add(r),wi(e))}function wi(e){for(;e.ba.size>0&&e.Da.size<e.maxConcurrentLimboResolutions;){const t=e.ba.values().next().value;e.ba.delete(t);const n=new E(O.fromString(t)),r=e.xa.next();e.Ca.set(r,new gf(n)),e.Da=e.Da.insert(n,r),ju(e.remoteStore,new Ot(Rt(ai(n.path)),r,"TargetPurposeLimboResolution",ei._e))}}async function wn(e,t,n){const r=P(e),s=[],i=[],o=[];r.wa.isEmpty()||(r.wa.forEach((a,u)=>{o.push(r.Na(u,t,n).then(c=>{if((c||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(u.targetId,c!=null&&c.fromCache?"not-current":"current"),c){s.push(c);const l=pi.Ki(u.targetId,c);i.push(l)}}))}),await Promise.all(o),r.ya.u_(s),await async function(u,c){const l=P(u);try{await l.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>p.forEach(c,d=>p.forEach(d.qi,m=>l.persistence.referenceDelegate.addReference(h,d.targetId,m)).next(()=>p.forEach(d.Qi,m=>l.persistence.referenceDelegate.removeReference(h,d.targetId,m)))))}catch(h){if(!yn(h))throw h;g("LocalStore","Failed to update sequence numbers: "+h)}for(const h of c){const d=h.targetId;if(!h.fromCache){const m=l.ns.get(d),v=m.snapshotVersion,I=m.withLastLimboFreeSnapshotVersion(v);l.ns=l.ns.insert(d,I)}}}(r.localStore,i))}async function Vf(e,t){const n=P(e);if(!n.currentUser.isEqual(t)){g("SyncEngine","User change. New user:",t.toKey());const r=await Fu(n.localStore,t);n.currentUser=t,function(i,o){i.Ma.forEach(a=>{a.forEach(u=>{u.reject(new y(f.CANCELLED,o))})}),i.Ma.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await wn(n,r.us)}}function Cf(e,t){const n=P(e),r=n.Ca.get(t);if(r&&r.pa)return S().add(r.key);{let s=S();const i=n.Sa.get(t);if(!i)return s;for(const o of i){const a=n.wa.get(o);s=s.unionWith(a.view.Ia)}return s}}function sc(e){const t=P(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=tc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Cf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Af.bind(null,t),t.ya.u_=df.bind(null,t.eventManager),t.ya.La=ff.bind(null,t.eventManager),t}function Df(e){const t=P(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Rf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Pf.bind(null,t),t}class Oo{constructor(){this.synchronizeTabs=!1}async initialize(t){this.serializer=Pr(t.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(t),this.persistence=this.createPersistence(t),await this.persistence.start(),this.localStore=this.createLocalStore(t),this.gcScheduler=this.createGarbageCollectionScheduler(t,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(t,this.localStore)}createGarbageCollectionScheduler(t,n){return null}createIndexBackfillerScheduler(t,n){return null}createLocalStore(t){return Ld(this.persistence,new xd,t.initialUser,this.serializer)}createPersistence(t){return new kd(fi.Hr,this.serializer)}createSharedClientState(t){return new $d}async terminate(){var t,n;(t=this.gcScheduler)===null||t===void 0||t.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class kf{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>bo(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Vf.bind(null,this.syncEngine),await cf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new hf}()}createDatastore(t){const n=Pr(t.databaseInfo.databaseId),r=function(i){return new Qd(i)}(t.databaseInfo);return function(i,o,a,u){return new Xd(i,o,a,u)}(t.authCredentials,t.appCheckCredentials,r,n)}createRemoteStore(t){return function(r,s,i,o,a){return new Jd(r,s,i,o,a)}(this.localStore,this.datastore,t.asyncQueue,n=>bo(this.syncEngine,n,0),function(){return Co.D()?new Co:new zd}())}createSyncEngine(t,n){return function(s,i,o,a,u,c,l){const h=new _f(s,i,o,a,u,c);return l&&(h.Oa=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}async terminate(){var t;await async function(r){const s=P(r);g("RemoteStore","RemoteStore shutting down."),s.v_.add(5),await vn(s),s.M_.shutdown(),s.x_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.qa(this.observer.next,t)}error(t){this.observer.error?this.qa(this.observer.error,t):St("Uncaught Error in snapshot listener:",t.toString())}Qa(){this.muted=!0}qa(t,n){this.muted||setTimeout(()=>{this.muted||t(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(t,n,r,s){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=et.UNAUTHENTICATED,this.clientId=su.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{g("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(g("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new y(f.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new At;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const r=Ei(n,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Wr(e,t){e.asyncQueue.verifyOperationInProgress(),g("FirestoreClient","Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Fu(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Lo(e,t){e.asyncQueue.verifyOperationInProgress();const n=await xf(e);g("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(r=>Do(t.remoteStore,r)),e.setAppCheckTokenChangeListener((r,s)=>Do(t.remoteStore,s)),e._onlineComponents=t}function bf(e){return e.name==="FirebaseError"?e.code===f.FAILED_PRECONDITION||e.code===f.UNIMPLEMENTED:!(typeof DOMException<"u"&&e instanceof DOMException)||e.code===22||e.code===20||e.code===11}async function xf(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){g("FirestoreClient","Using user provided OfflineComponentProvider");try{await Wr(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!bf(n))throw n;_e("Error using user provided cache. Falling back to memory cache: "+n),await Wr(e,new Oo)}}else g("FirestoreClient","Using default OfflineComponentProvider"),await Wr(e,new Oo);return e._offlineComponents}async function oc(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(g("FirestoreClient","Using user provided OnlineComponentProvider"),await Lo(e,e._uninitializedComponentsProvider._online)):(g("FirestoreClient","Using default OnlineComponentProvider"),await Lo(e,new kf))),e._onlineComponents}function Of(e){return oc(e).then(t=>t.syncEngine)}async function ac(e){const t=await oc(e),n=t.eventManager;return n.onListen=yf.bind(null,t.syncEngine),n.onUnlisten=vf.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Tf.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=wf.bind(null,t.syncEngine),n}function Lf(e,t,n={}){const r=new At;return e.asyncQueue.enqueueAndForget(async()=>function(i,o,a,u,c){const l=new ic({next:d=>{o.enqueueAndForget(()=>Hu(i,h));const m=d.docs.has(a);!m&&d.fromCache?c.reject(new y(f.UNAVAILABLE,"Failed to get document because the client is offline.")):m&&d.fromCache&&u&&u.source==="server"?c.reject(new y(f.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(d)},error:d=>c.reject(d)}),h=new Xu(ai(a.path),l,{includeMetadataChanges:!0,ta:!0});return Wu(i,h)}(await ac(e),e.asyncQueue,t,n,r)),r.promise}function Mf(e,t,n={}){const r=new At;return e.asyncQueue.enqueueAndForget(async()=>function(i,o,a,u,c){const l=new ic({next:d=>{o.enqueueAndForget(()=>Hu(i,h)),d.fromCache&&u.source==="server"?c.reject(new y(f.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(d)},error:d=>c.reject(d)}),h=new Xu(a,l,{includeMetadataChanges:!0,ta:!0});return Wu(i,h)}(await ac(e),e.asyncQueue,t,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uc(e){const t={};return e.timeoutSeconds!==void 0&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(e,t,n){if(!n)throw new y(f.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Ff(e,t,n,r){if(t===!0&&r===!0)throw new y(f.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function Fo(e){if(!E.isDocumentKey(e))throw new y(f.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Uo(e){if(E.isDocumentKey(e))throw new y(f.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Cr(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":w()}function yt(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new y(f.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Cr(e);throw new y(f.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function Uf(e,t){if(t<=0)throw new y(f.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(t){var n,r;if(t.host===void 0){if(t.ssl!==void 0)throw new y(f.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new y(f.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Ff("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uc((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new y(f.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new y(f.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new y(f.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Dr{constructor(t,n,r,s){this._authCredentials=t,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bo({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new y(f.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(t){if(this._settingsFrozen)throw new y(f.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bo(t),t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new eh;switch(r.type){case"firstParty":return new ih(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new y(f.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Mo.get(n);r&&(g("ComponentProvider","Removing Datastore"),Mo.delete(n),r.terminate())}(this),Promise.resolve()}}function Bf(e,t,n,r={}){var s;const i=(e=yt(e,Dr))._getSettings(),o=`${t}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&_e("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let a,u;if(typeof r.mockUserToken=="string")a=r.mockUserToken,u=et.MOCK_USER;else{a=Jo(r.mockUserToken,(s=e._app)===null||s===void 0?void 0:s.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new y(f.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new et(c)}e._authCredentials=new nh(new ru(a,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(t,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new $t(this.firestore,t,this._query)}}class ct{constructor(t,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ct(this.firestore,t,this._key)}}class Lt extends $t{constructor(t,n,r){super(t,n,ai(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ct(this.firestore,null,new E(t))}withConverter(t){return new Lt(this.firestore,t,this._path)}}function Ii(e,t,...n){if(e=it(e),cc("collection","path",t),e instanceof Dr){const r=O.fromString(t,...n);return Uo(r),new Lt(e,null,r)}{if(!(e instanceof ct||e instanceof Lt))throw new y(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(O.fromString(t,...n));return Uo(r),new Lt(e.firestore,null,r)}}function qf(e,t,...n){if(e=it(e),arguments.length===1&&(t=su.newId()),cc("doc","path",t),e instanceof Dr){const r=O.fromString(t,...n);return Fo(r),new ct(e,null,new E(r))}{if(!(e instanceof ct||e instanceof Lt))throw new y(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(O.fromString(t,...n));return Fo(r),new ct(e.firestore,e instanceof Lt?e.converter:null,new E(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(){this.nu=Promise.resolve(),this.ru=[],this.iu=!1,this.su=[],this.ou=null,this._u=!1,this.au=!1,this.uu=[],this.jo=new Bu(this,"async_queue_retry"),this.cu=()=>{const n=Qr();n&&g("AsyncQueue","Visibility state changed to "+n.visibilityState),this.jo.Ko()};const t=Qr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cu)}get isShuttingDown(){return this.iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.lu(),this.hu(t)}enterRestrictedMode(t){if(!this.iu){this.iu=!0,this.au=t||!1;const n=Qr();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.cu)}}enqueue(t){if(this.lu(),this.iu)return new Promise(()=>{});const n=new At;return this.hu(()=>this.iu&&this.au?Promise.resolve():(t().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.ru.push(t),this.Pu()))}async Pu(){if(this.ru.length!==0){try{await this.ru[0](),this.ru.shift(),this.jo.reset()}catch(t){if(!yn(t))throw t;g("AsyncQueue","Operation failed with retryable error: "+t)}this.ru.length>0&&this.jo.qo(()=>this.Pu())}}hu(t){const n=this.nu.then(()=>(this._u=!0,t().catch(r=>{this.ou=r,this._u=!1;const s=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw St("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this._u=!1,r))));return this.nu=n,n}enqueueAfterDelay(t,n,r){this.lu(),this.uu.indexOf(t)>-1&&(n=0);const s=Ti.createAndSchedule(this,t,n,r,i=>this.Iu(i));return this.su.push(s),s}lu(){this.ou&&w()}verifyOperationInProgress(){}async Tu(){let t;do t=this.nu,await t;while(t!==this.nu)}Eu(t){for(const n of this.su)if(n.timerId===t)return!0;return!1}du(t){return this.Tu().then(()=>{this.su.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.su)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.Tu()})}Au(t){this.uu.push(t)}Iu(t){const n=this.su.indexOf(t);this.su.splice(n,1)}}class ie extends Dr{constructor(t,n,r,s){super(t,n,r,s),this.type="firestore",this._queue=function(){return new jf}(),this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||lc(this),this._firestoreClient.terminate()}}function $f(e,t){const n=typeof e=="object"?e:rr(),r=typeof e=="string"?e:t||"(default)",s=Vs(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Cs("firestore");i&&Bf(s,...i)}return s}function Ai(e){return e._firestoreClient||lc(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function lc(e){var t,n,r;const s=e._freezeSettings(),i=function(a,u,c,l){return new Th(a,u,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,uc(l.experimentalLongPollingOptions),l.useFetchStreams)}(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,s);e._firestoreClient=new Nf(e._authCredentials,e._appCheckCredentials,e._queue,i),!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.localCache.kind,_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ie(ot.fromBase64String(t))}catch(n){throw new y(f.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new Ie(ot.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new y(f.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Y(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new y(f.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new y(f.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return C(this._lat,t._lat)||C(this._long,t._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf=/^__.*__$/;class Gf{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return this.fieldMask!==null?new jt(t,this.data,this.fieldMask,n,this.fieldTransforms):new Tn(t,this.data,n,this.fieldTransforms)}}class hc{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return new jt(t,this.data,this.fieldMask,n,this.fieldTransforms)}}function dc(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw w()}}class Si{constructor(t,n,r,s,i,o){this.settings=t,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ru(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Vu(){return this.settings.Vu}mu(t){return new Si(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}fu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.mu({path:r,gu:!1});return s.pu(t),s}yu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.mu({path:r,gu:!1});return s.Ru(),s}wu(t){return this.mu({path:void 0,gu:!0})}Su(t){return er(t,this.settings.methodName,this.settings.bu||!1,this.path,this.settings.Du)}contains(t){return this.fieldMask.find(n=>t.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>t.isPrefixOf(n.field))!==void 0}Ru(){if(this.path)for(let t=0;t<this.path.length;t++)this.pu(this.path.get(t))}pu(t){if(t.length===0)throw this.Su("Document fields must not be empty");if(dc(this.Vu)&&zf.test(t))throw this.Su('Document fields cannot begin and end with "__"')}}class Kf{constructor(t,n,r){this.databaseId=t,this.ignoreUndefinedProperties=n,this.serializer=r||Pr(t)}Cu(t,n,r,s=!1){return new Si({Vu:t,methodName:n,Du:r,path:Y.emptyPath(),gu:!1,bu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Nr(e){const t=e._freezeSettings(),n=Pr(e._databaseId);return new Kf(e._databaseId,!!t.ignoreUndefinedProperties,n)}function fc(e,t,n,r,s,i={}){const o=e.Cu(i.merge||i.mergeFields?2:0,t,n,s);Vi("Data must be an object, but it was:",o,r);const a=pc(r,o);let u,c;if(i.merge)u=new ht(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const l=[];for(const h of i.mergeFields){const d=vs(t,h,n);if(!o.contains(d))throw new y(f.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);gc(l,d)||l.push(d)}u=new ht(l),c=o.fieldTransforms.filter(h=>u.covers(h.field))}else u=null,c=o.fieldTransforms;return new Gf(new lt(a),u,c)}class br extends Ri{_toFieldTransform(t){if(t.Vu!==2)throw t.Vu===1?t.Su(`${this._methodName}() can only appear at the top level of your update data`):t.Su(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof br}}function Qf(e,t,n,r){const s=e.Cu(1,t,n);Vi("Data must be an object, but it was:",s,r);const i=[],o=lt.empty();re(r,(u,c)=>{const l=Ci(t,u,n);c=it(c);const h=s.yu(l);if(c instanceof br)i.push(l);else{const d=In(c,h);d!=null&&(i.push(l),o.set(l,d))}});const a=new ht(i);return new hc(o,a,s.fieldTransforms)}function Wf(e,t,n,r,s,i){const o=e.Cu(1,t,n),a=[vs(t,r,n)],u=[s];if(i.length%2!=0)throw new y(f.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(vs(t,i[d])),u.push(i[d+1]);const c=[],l=lt.empty();for(let d=a.length-1;d>=0;--d)if(!gc(c,a[d])){const m=a[d];let v=u[d];v=it(v);const I=o.yu(m);if(v instanceof br)c.push(m);else{const T=In(v,I);T!=null&&(c.push(m),l.set(m,T))}}const h=new ht(c);return new hc(l,h,o.fieldTransforms)}function Hf(e,t,n,r=!1){return In(n,e.Cu(r?4:3,t))}function In(e,t){if(mc(e=it(e)))return Vi("Unsupported field value:",t,e),pc(e,t);if(e instanceof Ri)return function(r,s){if(!dc(s.Vu))throw s.Su(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Su(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.gu&&t.Vu!==4)throw t.Su("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const a of r){let u=In(a,s.wu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(e,t)}return function(r,s){if((r=it(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Bh(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=G.fromDate(r);return{timestampValue:Zn(s.serializer,i)}}if(r instanceof G){const i=new G(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zn(s.serializer,i)}}if(r instanceof Pi)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ie)return{bytesValue:ku(s.serializer,r._byteString)};if(r instanceof ct){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Su(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:hi(r.firestore._databaseId||s.databaseId,r._key.path)}}throw s.Su(`Unsupported field value: ${Cr(r)}`)}(e,t)}function pc(e,t){const n={};return iu(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):re(e,(r,s)=>{const i=In(s,t.fu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function mc(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof G||e instanceof Pi||e instanceof Ie||e instanceof ct||e instanceof Ri)}function Vi(e,t,n){if(!mc(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=Cr(n);throw r==="an object"?t.Su(e+" a custom object"):t.Su(e+" "+r)}}function vs(e,t,n){if((t=it(t))instanceof kr)return t._internalPath;if(typeof t=="string")return Ci(e,t);throw er("Field path arguments must be of type string or ",e,!1,void 0,n)}const Xf=new RegExp("[~\\*/\\[\\]]");function Ci(e,t,n){if(t.search(Xf)>=0)throw er(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new kr(...t.split("."))._internalPath}catch{throw er(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function er(e,t,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new y(f.INVALID_ARGUMENT,a+e+u)}function gc(e,t){return e.some(n=>n.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(t,n,r,s,i){this._firestore=t,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Yf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const n=this._document.data.field(xr("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Yf extends _c{data(){return super.data()}}function xr(e,t){return typeof t=="string"?Ci(e,t):t instanceof kr?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(e){if(e.limitType==="L"&&e.explicitOrderBy.length===0)throw new y(f.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Di{}class ki extends Di{}function Mm(e,t,...n){let r=[];t instanceof Di&&r.push(t),r=r.concat(n),function(i){const o=i.filter(u=>u instanceof Ni).length,a=i.filter(u=>u instanceof Or).length;if(o>1||o>0&&a>0)throw new y(f.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)e=s._apply(e);return e}class Or extends ki{constructor(t,n,r){super(),this._field=t,this._op=n,this._value=r,this.type="where"}static _create(t,n,r){return new Or(t,n,r)}_apply(t){const n=this._parse(t);return yc(t._query,n),new $t(t.firestore,t.converter,fs(t._query,n))}_parse(t){const n=Nr(t.firestore);return function(i,o,a,u,c,l,h){let d;if(c.isKeyField()){if(l==="array-contains"||l==="array-contains-any")throw new y(f.INVALID_ARGUMENT,`Invalid Query. You can't perform '${l}' queries on documentId().`);if(l==="in"||l==="not-in"){jo(h,l);const m=[];for(const v of h)m.push(qo(u,i,v));d={arrayValue:{values:m}}}else d=qo(u,i,h)}else l!=="in"&&l!=="not-in"&&l!=="array-contains-any"||jo(h,l),d=Hf(a,o,h,l==="in"||l==="not-in");return z.create(c,l,d)}(t._query,"where",n,t.firestore._databaseId,this._field,this._op,this._value)}}function Fm(e,t,n){const r=t,s=xr("where",e);return Or._create(s,r,n)}class Ni extends Di{constructor(t,n){super(),this.type=t,this._queryConstraints=n}static _create(t,n){return new Ni(t,n)}_parse(t){const n=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:_t.create(n,this._getOperator())}_apply(t){const n=this._parse(t);return n.getFilters().length===0?t:(function(s,i){let o=s;const a=i.getFlattenedFilters();for(const u of a)yc(o,u),o=fs(o,u)}(t._query,n),new $t(t.firestore,t.converter,fs(t._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class bi extends ki{constructor(t,n){super(),this._field=t,this._direction=n,this.type="orderBy"}static _create(t,n){return new bi(t,n)}_apply(t){const n=function(s,i,o){if(s.startAt!==null)throw new y(f.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new y(f.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new on(i,o)}(t._query,this._field,this._direction);return new $t(t.firestore,t.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Se(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,n))}}function Um(e,t="asc"){const n=t,r=xr("orderBy",e);return bi._create(r,n)}class xi extends ki{constructor(t,n,r){super(),this.type=t,this._limit=n,this._limitType=r}static _create(t,n,r){return new xi(t,n,r)}_apply(t){return new $t(t.firestore,t.converter,Xn(t._query,this._limit,this._limitType))}}function Bm(e){return Uf("limit",e),xi._create("limit",e,"F")}function qo(e,t,n){if(typeof(n=it(n))=="string"){if(n==="")throw new y(f.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!pu(t)&&n.indexOf("/")!==-1)throw new y(f.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(O.fromString(n));if(!E.isDocumentKey(r))throw new y(f.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return co(e,new E(r))}if(n instanceof ct)return co(e,n._key);throw new y(f.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Cr(n)}.`)}function jo(e,t){if(!Array.isArray(e)||e.length===0)throw new y(f.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function yc(e,t){const n=function(s,i){for(const o of s)for(const a of o.getFlattenedFilters())if(i.indexOf(a.op)>=0)return a.op;return null}(e.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(n!==null)throw n===t.op?new y(f.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new y(f.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class Zf{convertValue(t,n="none"){switch(te(t)){case 0:return null;case 1:return t.booleanValue;case 2:return $(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,n);case 5:return t.stringValue;case 6:return this.convertBytes(Zt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,n);case 10:return this.convertObject(t.mapValue,n);default:throw w()}}convertObject(t,n){return this.convertObjectMap(t.fields,n)}convertObjectMap(t,n="none"){const r={};return re(t,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(t){return new Pi($(t.latitude),$(t.longitude))}convertArray(t,n){return(t.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(t,n){switch(n){case"previous":const r=ri(t);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(nn(t));default:return null}}convertTimestamp(t){const n=Ft(t);return new G(n.seconds,n.nanos)}convertDocumentKey(t,n){const r=O.fromString(t);N(Mu(r));const s=new rn(r.get(1),r.get(3)),i=new E(r.popFirst(5));return s.isEqual(n)||St(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(t,n){this.hasPendingWrites=t,this.fromCache=n}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ec extends _c{constructor(t,n,r,s,i,o){super(t,n,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const n=new Bn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,n={}){if(this._document){const r=this._document.data.field(xr("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Bn extends Ec{data(t={}){return super.data(t)}}class tp{constructor(t,n,r,s){this._firestore=t,this._userDataWriter=n,this._snapshot=s,this.metadata=new Fe(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(n=>t.push(n)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,n){this._snapshot.docs.forEach(r=>{t.call(n,new Bn(this._firestore,this._userDataWriter,r.key,r,new Fe(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const n=!!t.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new y(f.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(a=>{const u=new Bn(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Fe(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(a=>i||a.type!==3).map(a=>{const u=new Bn(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Fe(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,l=-1;return a.type!==0&&(c=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),l=o.indexOf(a.doc.key)),{type:ep(a.type),doc:u,oldIndex:c,newIndex:l}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function ep(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return w()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qm(e){e=yt(e,ct);const t=yt(e.firestore,ie);return Lf(Ai(t),e._key).then(n=>np(t,e,n))}class vc extends Zf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ie(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new ct(this.firestore,null,n)}}function jm(e){e=yt(e,$t);const t=yt(e.firestore,ie),n=Ai(t),r=new vc(t);return Jf(e._query),Mf(n,e._query).then(s=>new tp(t,r,e,s))}function $m(e,t,n){e=yt(e,ct);const r=yt(e.firestore,ie),s=Tc(e.converter,t,n);return Lr(r,[fc(Nr(r),"setDoc",e._key,s,e.converter!==null,n).toMutation(e._key,mt.none())])}function zm(e,t,n,...r){e=yt(e,ct);const s=yt(e.firestore,ie),i=Nr(s);let o;return o=typeof(t=it(t))=="string"||t instanceof kr?Wf(i,"updateDoc",e._key,t,n,r):Qf(i,"updateDoc",e._key,t),Lr(s,[o.toMutation(e._key,mt.exists(!0))])}function Gm(e){return Lr(yt(e.firestore,ie),[new ui(e._key,mt.none())])}function Km(e,t){const n=yt(e.firestore,ie),r=qf(e),s=Tc(e.converter,t);return Lr(n,[fc(Nr(e.firestore),"addDoc",r._key,s,e.converter!==null,{}).toMutation(r._key,mt.exists(!1))]).then(()=>r)}function Lr(e,t){return function(r,s){const i=new At;return r.asyncQueue.enqueueAndForget(async()=>If(await Of(r),s,i)),i.promise}(Ai(e),t)}function np(e,t,n){const r=n.docs.get(t._key),s=new vc(e);return new Ec(e,s,t._key,r,new Fe(n.hasPendingWrites,n.fromCache),t.converter)}(function(t,n=!0){(function(s){Pe=s})(Zo),Rs(new Ps("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new ie(new rh(r.getProvider("auth-internal")),new ah(r.getProvider("app-check-internal")),function(c,l){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new y(f.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rn(c.options.projectId,l)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),a._setSettings(i),a},"PUBLIC").setMultipleInstances(!0)),Yt(so,"4.6.0",t),Yt(so,"4.6.0","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="firebasestorage.googleapis.com",Ic="storageBucket",rp=2*60*1e3,sp=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q extends Ss{constructor(t,n,r=0){super(Hr(t),`Firebase Storage: ${n} (${Hr(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,q.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Hr(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var B;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(B||(B={}));function Hr(e){return"storage/"+e}function Oi(){const e="An unknown error occurred, please check the error payload for server response.";return new q(B.UNKNOWN,e)}function ip(e){return new q(B.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function op(e){return new q(B.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function ap(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new q(B.UNAUTHENTICATED,e)}function up(){return new q(B.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function cp(e){return new q(B.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function lp(){return new q(B.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function hp(){return new q(B.CANCELED,"User canceled the upload/download.")}function dp(e){return new q(B.INVALID_URL,"Invalid URL '"+e+"'.")}function fp(e){return new q(B.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function pp(){return new q(B.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ic+"' property when initializing the app?")}function mp(){return new q(B.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function gp(){return new q(B.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function _p(e){return new q(B.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ws(e){return new q(B.INVALID_ARGUMENT,e)}function Ac(){return new q(B.APP_DELETED,"The Firebase app was deleted.")}function yp(e){return new q(B.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ke(e,t){return new q(B.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function be(e){throw new q(B.INTERNAL_ERROR,"Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let r;try{r=dt.makeFromUrl(t,n)}catch{return new dt(t,"")}if(r.path==="")return r;throw fp(t)}static makeFromUrl(t,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function c(M){M.path_=decodeURIComponent(M.path)}const l="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",m=new RegExp(`^https?://${h}/${l}/b/${s}/o${d}`,"i"),v={bucket:1,path:3},I=n===wc?"(?:storage.googleapis.com|storage.cloud.google.com)":n,T="([^?#]*)",k=new RegExp(`^https?://${I}/${s}/${T}`,"i"),L=[{regex:a,indices:u,postModify:i},{regex:m,indices:v,postModify:c},{regex:k,indices:{bucket:1,path:2},postModify:c}];for(let M=0;M<L.length;M++){const Ct=L[M],Tt=Ct.regex.exec(t);if(Tt){const oe=Tt[Ct.indices.bucket];let Pn=Tt[Ct.indices.path];Pn||(Pn=""),r=new dt(oe,Pn),Ct.postModify(r);break}}if(r==null)throw dp(t);return r}}class Tp{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ep(e,t,n){let r=1,s=null,i=null,o=!1,a=0;function u(){return a===2}let c=!1;function l(...T){c||(c=!0,t.apply(null,T))}function h(T){s=setTimeout(()=>{s=null,e(m,u())},T)}function d(){i&&clearTimeout(i)}function m(T,...k){if(c){d();return}if(T){d(),l.call(null,T,...k);return}if(u()||o){d(),l.call(null,T,...k);return}r<64&&(r*=2);let L;a===1?(a=2,L=0):L=(r+Math.random())*1e3,h(L)}let v=!1;function I(T){v||(v=!0,d(),!c&&(s!==null?(T||(a=2),clearTimeout(s),h(0)):T||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,I(!0)},n),I}function vp(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wp(e){return e!==void 0}function Ip(e){return typeof e=="object"&&!Array.isArray(e)}function Li(e){return typeof e=="string"||e instanceof String}function $o(e){return Mi()&&e instanceof Blob}function Mi(){return typeof Blob<"u"}function zo(e,t,n,r){if(r<t)throw ws(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw ws(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(e,t,n){let r=t;return n==null&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function Rc(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const s=t(r)+"="+t(e[r]);n=n+s+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xt;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(Xt||(Xt={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(e,t){const n=e>=500&&e<600,s=[408,429].indexOf(e)!==-1,i=t.indexOf(e)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(t,n,r,s,i,o,a,u,c,l,h,d=!0){this.url_=t,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=l,this.connectionFactory_=h,this.retry=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((m,v)=>{this.resolve_=m,this.reject_=v,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new On(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=a=>{const u=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const a=i.getErrorCode()===Xt.NO_ERROR,u=i.getStatus();if(!a||Ap(u,this.additionalRetryCodes_)&&this.retry){const l=i.getErrorCode()===Xt.ABORT;r(!1,new On(!1,null,l));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new On(c,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(a,a.getResponse());wp(u)?i(u):i()}catch(u){o(u)}else if(a!==null){const u=Oi();u.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Ac():hp();o(u)}else{const u=lp();o(u)}};this.canceled_?n(!1,new On(!1,null,!0)):this.backoffId_=Ep(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&vp(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class On{constructor(t,n,r){this.wasSuccessCode=t,this.connection=n,this.canceled=!!r}}function Pp(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function Sp(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Vp(e,t){t&&(e["X-Firebase-GMPID"]=t)}function Cp(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Dp(e,t,n,r,s,i,o=!0){const a=Rc(e.urlParams),u=e.url+a,c=Object.assign({},e.headers);return Vp(c,t),Pp(c,n),Sp(c,i),Cp(c,r),new Rp(u,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Np(...e){const t=kp();if(t!==void 0){const n=new t;for(let r=0;r<e.length;r++)n.append(e[r]);return n.getBlob()}else{if(Mi())return new Blob(e);throw new q(B.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function bp(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(e){if(typeof atob>"u")throw _p("base-64");return atob(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Xr{constructor(t,n){this.data=t,this.contentType=n||null}}function Op(e,t){switch(e){case It.RAW:return new Xr(Pc(t));case It.BASE64:case It.BASE64URL:return new Xr(Sc(e,t));case It.DATA_URL:return new Xr(Mp(t),Fp(t))}throw Oi()}function Pc(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const i=r,o=e.charCodeAt(++n);r=65536|(i&1023)<<10|o&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function Lp(e){let t;try{t=decodeURIComponent(e)}catch{throw Ke(It.DATA_URL,"Malformed data URL.")}return Pc(t)}function Sc(e,t){switch(e){case It.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw Ke(e,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case It.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw Ke(e,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=xp(t)}catch(s){throw s.message.includes("polyfill")?s:Ke(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class Vc{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw Ke(It.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=Up(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function Mp(e){const t=new Vc(e);return t.base64?Sc(It.BASE64,t.rest):Lp(t.rest)}function Fp(e){return new Vc(e).contentType}function Up(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(t,n){let r=0,s="";$o(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,n){if($o(this.data_)){const r=this.data_,s=bp(r,t,n);return s===null?null:new xt(s)}else{const r=new Uint8Array(this.data_.buffer,t,n-t);return new xt(r,!0)}}static getBlob(...t){if(Mi()){const n=t.map(r=>r instanceof xt?r.data_:r);return new xt(Np.apply(null,n))}else{const n=t.map(o=>Li(o)?Op(It.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)s[i++]=o[a]}),new xt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cc(e){let t;try{t=JSON.parse(e)}catch{return null}return Ip(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function qp(e,t){const n=t.split("/").filter(r=>r.length>0).join("/");return e.length===0?n:e+"/"+n}function Dc(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(e,t){return t}class at{constructor(t,n,r,s){this.server=t,this.local=n||t,this.writable=!!r,this.xform=s||jp}}let Ln=null;function $p(e){return!Li(e)||e.length<2?e:Dc(e)}function kc(){if(Ln)return Ln;const e=[];e.push(new at("bucket")),e.push(new at("generation")),e.push(new at("metageneration")),e.push(new at("name","fullPath",!0));function t(i,o){return $p(o)}const n=new at("name");n.xform=t,e.push(n);function r(i,o){return o!==void 0?Number(o):o}const s=new at("size");return s.xform=r,e.push(s),e.push(new at("timeCreated")),e.push(new at("updated")),e.push(new at("md5Hash",null,!0)),e.push(new at("cacheControl",null,!0)),e.push(new at("contentDisposition",null,!0)),e.push(new at("contentEncoding",null,!0)),e.push(new at("contentLanguage",null,!0)),e.push(new at("contentType",null,!0)),e.push(new at("metadata","customMetadata",!0)),Ln=e,Ln}function zp(e,t){function n(){const r=e.bucket,s=e.fullPath,i=new dt(r,s);return t._makeStorageReference(i)}Object.defineProperty(e,"ref",{get:n})}function Gp(e,t,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const o=n[i];r[o.local]=o.xform(r,t[o.server])}return zp(r,e),r}function Nc(e,t,n){const r=Cc(t);return r===null?null:Gp(e,r,n)}function Kp(e,t,n,r){const s=Cc(t);if(s===null||!Li(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(c=>{const l=e.bucket,h=e.fullPath,d="/b/"+o(l)+"/o/"+o(h),m=Fi(d,n,r),v=Rc({alt:"media",token:c});return m+v})[0]}function Qp(e,t){const n={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(n[i.server]=e[i.local])}return JSON.stringify(n)}class bc{constructor(t,n,r,s){this.url=t,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(e){if(!e)throw Oi()}function Wp(e,t){function n(r,s){const i=Nc(e,s,t);return xc(i!==null),i}return n}function Hp(e,t){function n(r,s){const i=Nc(e,s,t);return xc(i!==null),Kp(i,s,e.host,e._protocol)}return n}function Oc(e){function t(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=up():s=ap():n.getStatus()===402?s=op(e.bucket):n.getStatus()===403?s=cp(e.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return t}function Xp(e){const t=Oc(e);function n(r,s){let i=t(r,s);return r.getStatus()===404&&(i=ip(e.path)),i.serverResponse=s.serverResponse,i}return n}function Yp(e,t,n){const r=t.fullServerUrl(),s=Fi(r,e.host,e._protocol),i="GET",o=e.maxOperationRetryTime,a=new bc(s,i,Hp(e,n),o);return a.errorHandler=Xp(t),a}function Jp(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Zp(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=Jp(null,t)),r}function tm(e,t,n,r,s){const i=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let L="";for(let M=0;M<2;M++)L=L+Math.random().toString().slice(2);return L}const u=a();o["Content-Type"]="multipart/related; boundary="+u;const c=Zp(t,r,s),l=Qp(c,n),h="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+l+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,d=`\r
--`+u+"--",m=xt.getBlob(h,r,d);if(m===null)throw mp();const v={name:c.fullPath},I=Fi(i,e.host,e._protocol),T="POST",k=e.maxUploadRetryTime,b=new bc(I,T,Wp(e,n),k);return b.urlParams=v,b.headers=o,b.body=m.uploadData(),b.errorHandler=Oc(t),b}class em{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Xt.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Xt.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Xt.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,r,s){if(this.sent_)throw be("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw be("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw be("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw be("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw be("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class nm extends em{initXhr(){this.xhr_.responseType="text"}}function Lc(){return new nm}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(t,n){this._service=t,n instanceof dt?this._location=n:this._location=dt.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new ee(t,n)}get root(){const t=new dt(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Dc(this._location.path)}get storage(){return this._service}get parent(){const t=Bp(this._location.path);if(t===null)return null;const n=new dt(this._location.bucket,t);return new ee(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw yp(t)}}function rm(e,t,n){e._throwIfRoot("uploadBytes");const r=tm(e.storage,e._location,kc(),new xt(t,!0),n);return e.storage.makeRequestWithTokens(r,Lc).then(s=>({metadata:s,ref:e}))}function sm(e){e._throwIfRoot("getDownloadURL");const t=Yp(e.storage,e._location,kc());return e.storage.makeRequestWithTokens(t,Lc).then(n=>{if(n===null)throw gp();return n})}function im(e,t){const n=qp(e._location.path,t),r=new dt(e._location.bucket,n);return new ee(e.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(e){return/^[A-Za-z]+:\/\//.test(e)}function am(e,t){return new ee(e,t)}function Mc(e,t){if(e instanceof Ui){const n=e;if(n._bucket==null)throw pp();const r=new ee(n,n._bucket);return t!=null?Mc(r,t):r}else return t!==void 0?im(e,t):e}function um(e,t){if(t&&om(t)){if(e instanceof Ui)return am(e,t);throw ws("To use ref(service, url), the first argument must be a Storage instance.")}else return Mc(e,t)}function Go(e,t){const n=t==null?void 0:t[Ic];return n==null?null:dt.makeFromBucketSpec(n,e)}function cm(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken=typeof s=="string"?s:Jo(s,e.app.options.projectId))}class Ui{constructor(t,n,r,s,i){this.app=t,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=wc,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=rp,this._maxUploadRetryTime=sp,this._requests=new Set,s!=null?this._bucket=dt.makeFromBucketSpec(s,this._host):this._bucket=Go(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=dt.makeFromBucketSpec(this._url,t):this._bucket=Go(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){zo("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){zo("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new ee(this,t)}_makeRequest(t,n,r,s,i=!0){if(this._deleted)return new Tp(Ac());{const o=Dp(t,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,r,s).getPromise()}}const Ko="@firebase/storage",Qo="0.12.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc="storage";function Qm(e,t,n){return e=it(e),rm(e,t,n)}function Wm(e){return e=it(e),sm(e)}function An(e,t){return e=it(e),um(e,t)}function lm(e=rr(),t){e=it(e);const r=Vs(e,Fc).getImmediate({identifier:t}),s=Cs("storage");return s&&hm(r,...s),r}function hm(e,t,n,r={}){cm(e,t,n,r)}function dm(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new Ui(n,r,s,t,Zo)}function fm(){Rs(new Ps(Fc,dm,"PUBLIC").setMultipleInstances(!0)),Yt(Ko,Qo,""),Yt(Ko,Qo,"esm2017")}fm();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="type.googleapis.com/google.protobuf.Int64Value",mm="type.googleapis.com/google.protobuf.UInt64Value";function Uc(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function Is(e){if(e==null)return null;if(e instanceof Number&&(e=e.valueOf()),typeof e=="number"&&isFinite(e)||e===!0||e===!1||Object.prototype.toString.call(e)==="[object String]")return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(t=>Is(t));if(typeof e=="function"||typeof e=="object")return Uc(e,t=>Is(t));throw new Error("Data cannot be encoded in JSON: "+e)}function nr(e){if(e==null)return e;if(e["@type"])switch(e["@type"]){case pm:case mm:{const t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(t=>nr(t)):typeof e=="function"||typeof e=="object"?Uc(e,t=>nr(t)):e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class me extends Ss{constructor(t,n,r){super(`${Bi}/${t}`,n||""),this.details=r}}function gm(e){if(e>=200&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function _m(e,t){let n=gm(e),r=n,s;try{const i=t&&t.error;if(i){const o=i.status;if(typeof o=="string"){if(!Wo[o])return new me("internal","internal");n=Wo[o],r=o}const a=i.message;typeof a=="string"&&(r=a),s=i.details,s!==void 0&&(s=nr(s))}}catch{}return n==="ok"?null:new me(n,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(t,n,r){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=t.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||t.get().then(s=>this.auth=s,()=>{}),this.messaging||n.get().then(s=>this.messaging=s,()=>{}),this.appCheck||r.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const t=await this.auth.getToken();return t==null?void 0:t.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(t){if(this.appCheck){const n=t?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(t){const n=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(t);return{authToken:n,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As="us-central1";function Tm(e){let t=null;return{promise:new Promise((n,r)=>{t=setTimeout(()=>{r(new me("deadline-exceeded","deadline-exceeded"))},e)}),cancel:()=>{t&&clearTimeout(t)}}}class Em{constructor(t,n,r,s,i=As,o){this.app=t,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new ym(n,r,s),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{const a=new URL(i);this.customDomain=a.origin,this.region=As}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(t){const n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${t}`:this.customDomain!==null?`${this.customDomain}/${t}`:`https://${this.region}-${n}.cloudfunctions.net/${t}`}}function vm(e,t,n){e.emulatorOrigin=`http://${t}:${n}`}function wm(e,t,n){return r=>Am(e,t,r,n||{})}async function Im(e,t,n,r){n["Content-Type"]="application/json";let s;try{s=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}function Am(e,t,n,r){const s=e._url(t);return Rm(e,s,n,r)}async function Rm(e,t,n,r){n=Is(n);const s={data:n},i={},o=await e.contextProvider.getContext(r.limitedUseAppCheckTokens);o.authToken&&(i.Authorization="Bearer "+o.authToken),o.messagingToken&&(i["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(i["X-Firebase-AppCheck"]=o.appCheckToken);const a=r.timeout||7e4,u=Tm(a),c=await Promise.race([Im(t,s,i,e.fetchImpl),u.promise,e.cancelAllRequests]);if(u.cancel(),!c)throw new me("cancelled","Firebase Functions instance was deleted.");const l=_m(c.status,c.json);if(l)throw l;if(!c.json)throw new me("internal","Response is not valid JSON object.");let h=c.json.data;if(typeof h>"u"&&(h=c.json.result),typeof h>"u")throw new me("internal","Response is missing data field.");return{data:nr(h)}}const Ho="@firebase/functions",Xo="0.11.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm="auth-internal",Sm="app-check-internal",Vm="messaging-internal";function Cm(e,t){const n=(r,{instanceIdentifier:s})=>{const i=r.getProvider("app").getImmediate(),o=r.getProvider(Pm),a=r.getProvider(Vm),u=r.getProvider(Sm);return new Em(i,o,a,u,s,e)};Rs(new Ps(Bi,n,"PUBLIC").setMultipleInstances(!0)),Yt(Ho,Xo,t),Yt(Ho,Xo,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dm(e=rr(),t=As){const r=Vs(it(e),Bi).getImmediate({identifier:t}),s=Cs("functions");return s&&km(r,...s),r}function km(e,t,n){vm(it(e),t,n)}function Hm(e,t,n){return wm(it(e),t,n)}Cm(fetch.bind(self));var Nm={VITE_APIKEY:"AIzaSyDzGsaVy4PHDvHQhNQj5fmcAaGm64bf_kY",VITE_AUTHDOMIAN:"chaplaincy-website-bncgn.firebaseapp.com",VITE_PROJECTID:"chaplaincy-website-bncgn",VITE_STORAGEBUCKET:"chaplaincy-website-bncgn.appspot.com",VITE_MESSAGINGSENDERID:"342698394076",VITE_APPID:"1:342698394076:web:21790dc7aa59f599a58f19",VITE_TINY_APIKEY:"3pskonuir0vn1t8bgm9dvfczq8gjhhft128b7x40amaw247x",BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const Yo={apiKey:"AIzaSyDzGsaVy4PHDvHQhNQj5fmcAaGm64bf_kY",authDomain:Nm.VITE_AUTHDOMAIN,projectId:"chaplaincy-website-bncgn",storageBucket:"chaplaincy-website-bncgn.appspot.com",messagingSenderId:"342698394076",appId:"1:342698394076:web:21790dc7aa59f599a58f19"};let Ue;zc().length?(Ue=rr(),Gc(Ue),Ue=$i(Yo)):Ue=$i(Yo);const Xm=Kc(Ue),qi=$f(),Ym=Dm(),Rn=lm();An(Rn);const Jm=Ii(qi,"events"),Zm=Ii(qi,"news");Ii(qi,"users");An(Rn,"events");An(Rn,"articles");An(Rn,"documents");An(Rn,"images");export{G as T,Km as a,Xm as b,qi as c,qf as d,Jm as e,Ym as f,qm as g,Hm as h,jm as i,Gm as j,Rn as k,Bm as l,Qm as m,Zm as n,Um as o,Wm as p,Mm as q,An as r,$m as s,zm as u,Fm as w};
