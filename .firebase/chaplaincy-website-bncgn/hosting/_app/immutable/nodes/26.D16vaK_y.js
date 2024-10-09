import{s as X,e as h,a as x,t as U,c as v,b as H,q as j,g as y,d as G,f as _,m as w,i as I,h as $,x as Z,j as ee,k as te,r as se,w as J,y as K}from"../chunks/scheduler.NTvg1yRH.js";import{S as ae,i as ne,c as q,b as k,m as D,t as L,a as M,d as P,e as Q}from"../chunks/index.BFVs8E14.js";import{B as re}from"../chunks/Button.DAqEizx_.js";import{L as Y,I as W}from"../chunks/Input.DECM0dUc.js";import{s as le}from"../chunks/authService.B_ouGYOY.js";import{a as O}from"../chunks/AuthStore.42czV-rK.js";import{g as R}from"../chunks/entry.C7pGwSda.js";function oe(l){let a,n="Your email",t,s,u,i;function m(e){l[4](e)}let d={type:"email",name:"email",id:"email",placeholder:"name@company.com",autocomplete:"username",required:!0};return l[1]!==void 0&&(d.value=l[1]),s=new W({props:d}),J.push(()=>Q(s,"value",m)),{c(){a=h("span"),a.textContent=n,t=x(),q(s.$$.fragment)},l(e){a=v(e,"SPAN",{"data-svelte-h":!0}),j(a)!=="svelte-17zhp19"&&(a.textContent=n),t=y(e),k(s.$$.fragment,e)},m(e,r){I(e,a,r),I(e,t,r),D(s,e,r),i=!0},p(e,r){const f={};!u&&r&2&&(u=!0,f.value=e[1],K(()=>u=!1)),s.$set(f)},i(e){i||(L(s.$$.fragment,e),i=!0)},o(e){M(s.$$.fragment,e),i=!1},d(e){e&&(_(a),_(t)),P(s,e)}}}function ie(l){let a,n="Your password",t,s,u,i;function m(e){l[5](e)}let d={type:"password",name:"password",placeholder:"•••••",autocomplete:"current-password",required:!0};return l[0]!==void 0&&(d.value=l[0]),s=new W({props:d}),J.push(()=>Q(s,"value",m)),{c(){a=h("span"),a.textContent=n,t=x(),q(s.$$.fragment)},l(e){a=v(e,"SPAN",{"data-svelte-h":!0}),j(a)!=="svelte-1nyqqaq"&&(a.textContent=n),t=y(e),k(s.$$.fragment,e)},m(e,r){I(e,a,r),I(e,t,r),D(s,e,r),i=!0},p(e,r){const f={};!u&&r&1&&(u=!0,f.value=e[0],K(()=>u=!1)),s.$set(f)},i(e){i||(L(s.$$.fragment,e),i=!0)},o(e){M(s.$$.fragment,e),i=!1},d(e){e&&(_(a),_(t)),P(s,e)}}}function ue(l){let a;return{c(){a=U("Sign in")},l(n){a=G(n,"Sign in")},m(n,t){I(n,a,t)},d(n){n&&_(a)}}}function fe(l){let a,n,t,s,u="Login",i,m,d,e,r,f,V,B,z,b,N='<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>',A,g,C,F,T;return m=new Y({props:{class:"space-y-2",$$slots:{default:[oe]},$$scope:{ctx:l}}}),e=new Y({props:{class:"space-y-2",$$slots:{default:[ie]},$$scope:{ctx:l}}}),g=new re({props:{type:"submit",class:"w-full bg-primary-80 text-white-primary",$$slots:{default:[ue]},$$scope:{ctx:l}}}),{c(){a=h("div"),n=h("div"),t=h("form"),s=h("h3"),s.textContent=u,i=x(),q(m.$$.fragment),d=x(),q(e.$$.fragment),r=x(),f=h("div"),V=U(l[2]),z=x(),b=h("div"),b.innerHTML=N,A=x(),q(g.$$.fragment),this.h()},l(o){a=v(o,"DIV",{class:!0});var c=H(a);n=v(c,"DIV",{class:!0});var S=H(n);t=v(S,"FORM",{class:!0,action:!0});var p=H(t);s=v(p,"H3",{class:!0,"data-svelte-h":!0}),j(s)!=="svelte-t61lhk"&&(s.textContent=u),i=y(p),k(m.$$.fragment,p),d=y(p),k(e.$$.fragment,p),r=y(p),f=v(p,"DIV",{class:!0});var E=H(f);V=G(E,l[2]),E.forEach(_),z=y(p),b=v(p,"DIV",{class:!0,"data-svelte-h":!0}),j(b)!=="svelte-1i4zerc"&&(b.innerHTML=N),A=y(p),k(g.$$.fragment,p),p.forEach(_),S.forEach(_),c.forEach(_),this.h()},h(){w(s,"class","dark:text-white p-0 text-xl font-medium text-gray-900"),w(f,"class","error text-base font-semibold text-red-700"),f.hidden=B=!l[2],w(b,"class","flex items-start"),w(t,"class","flex flex-col space-y-6"),w(t,"action","/"),w(n,"class","w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6"),w(a,"class","flex flex-row justify-center")},m(o,c){I(o,a,c),$(a,n),$(n,t),$(t,s),$(t,i),D(m,t,null),$(t,d),D(e,t,null),$(t,r),$(t,f),$(f,V),$(t,z),$(t,b),$(t,A),D(g,t,null),C=!0,F||(T=Z(t,"submit",l[3]),F=!0)},p(o,[c]){const S={};c&130&&(S.$$scope={dirty:c,ctx:o}),m.$set(S);const p={};c&129&&(p.$$scope={dirty:c,ctx:o}),e.$set(p),(!C||c&4)&&ee(V,o[2]),(!C||c&4&&B!==(B=!o[2]))&&(f.hidden=B);const E={};c&128&&(E.$$scope={dirty:c,ctx:o}),g.$set(E)},i(o){C||(L(m.$$.fragment,o),L(e.$$.fragment,o),L(g.$$.fragment,o),C=!0)},o(o){M(m.$$.fragment,o),M(e.$$.fragment,o),M(g.$$.fragment,o),C=!1},d(o){o&&_(a),P(m),P(e),P(g),F=!1,T()}}}function pe(l,a,n){let t;te(l,O,r=>n(6,t=r));let s="",u="",i="";se(()=>{document.getElementById("email").focus()});async function m(r){r.preventDefault(),await le(u,s)?t.isEditor?R("/admin"):R("/"):n(2,i="Invalid email or password")}function d(r){u=r,n(1,u)}function e(r){s=r,n(0,s)}return n(2,i=O.error),[s,u,i,m,d,e]}class ve extends ae{constructor(a){super(),ne(this,a,pe,fe,X,{})}}export{ve as component};