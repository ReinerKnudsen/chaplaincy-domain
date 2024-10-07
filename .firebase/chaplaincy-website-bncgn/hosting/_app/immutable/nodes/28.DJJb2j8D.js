import{d as he,g as pe,c as Ie}from"../chunks/firebaseConfig.C3ZSizqS.js";import{s as we,e as g,t as L,a as $,M as be,c as h,b as D,d as N,f as _,g as p,N as De,q as ke,m as d,z as de,i as O,h as i,j as P}from"../chunks/scheduler.CYYz9b31.js";import{S as Ee,i as Ve,c as A,b as G,m as R,t as I,a as E,f as ve,d as B,g as _e}from"../chunks/index.Bkhjxhd0.js";import{m as Ce}from"../chunks/marked.esm.8ZxQ78w7.js";import{I as F}from"../chunks/Icon.BOLyAvVO.js";import{i as te,h as Me,a as Se,b as je,c as qe,d as ye,e as Te,f as ze}from"../chunks/formats.Bs_PpwaW.js";async function He({params:u}){const e=u.newsId,s=he(Ie,"news",e),f=await pe(s);if(f.exists())return{thisItem:f.data(),docRef:s};console.log("No such document!")}const Fe=Object.freeze(Object.defineProperty({__proto__:null,load:He},Symbol.toStringTag,{value:"Module"}));function ge(u){let e,s,f,o=u[0].tags+"",v,n;return s=new F({props:{name:"tags"}}),{c(){e=g("div"),A(s.$$.fragment),f=$(),v=L(o),this.h()},l(t){e=h(t,"DIV",{class:!0});var l=D(e);G(s.$$.fragment,l),f=p(l),v=N(l,o),l.forEach(_),this.h()},h(){d(e,"class",`entry ${te}`)},m(t,l){O(t,e,l),R(s,e,null),i(e,f),i(e,v),n=!0},p(t,l){(!n||l&1)&&o!==(o=t[0].tags+"")&&P(v,o)},i(t){n||(I(s.$$.fragment,t),n=!0)},o(t){E(s.$$.fragment,t),n=!1},d(t){t&&_(e),B(s)}}}function $e(u){let e,s,f,o=u[0].imageCaption+"",v,n;return s=new F({props:{name:"camera"}}),{c(){e=g("div"),A(s.$$.fragment),f=$(),v=L(o),this.h()},l(t){e=h(t,"DIV",{class:!0});var l=D(e);G(s.$$.fragment,l),f=p(l),v=N(l,o),l.forEach(_),this.h()},h(){d(e,"class",`entry ${te}`)},m(t,l){O(t,e,l),R(s,e,null),i(e,f),i(e,v),n=!0},p(t,l){(!n||l&1)&&o!==(o=t[0].imageCaption+"")&&P(v,o)},i(t){n||(I(s.$$.fragment,t),n=!0)},o(t){E(s.$$.fragment,t),n=!1},d(t){t&&_(e),B(s)}}}function Le(u){let e,s,f=u[0].title+"",o,v,n,t,l,ae,T=u[0].publishdate+"",J,se,V,S,ne,z=u[0].author+"",K,le,Q,ie,q,w,U,W,re,y,H,X=u[0].text+"",Y,k,j,oe,C,fe="Take me back to overview",b;l=new F({props:{name:"calendar"}}),S=new F({props:{name:"author"}});let m=u[0].tags&&ge(u),c=u[0].imageCaption&&$e(u);return j=new F({props:{name:"left"}}),{c(){e=g("div"),s=g("div"),o=L(f),v=$(),n=g("div"),t=g("div"),A(l.$$.fragment),ae=$(),J=L(T),se=$(),V=g("div"),A(S.$$.fragment),ne=$(),K=L(z),le=$(),m&&m.c(),Q=$(),c&&c.c(),ie=$(),q=g("div"),w=g("img"),re=$(),y=g("div"),H=new be(!1),Y=$(),k=g("div"),A(j.$$.fragment),oe=$(),C=g("a"),C.textContent=fe,this.h()},l(a){e=h(a,"DIV",{class:!0});var r=D(e);s=h(r,"DIV",{class:!0});var me=D(s);o=N(me,f),me.forEach(_),v=p(r),n=h(r,"DIV",{class:!0});var M=D(n);t=h(M,"DIV",{class:!0});var Z=D(t);G(l.$$.fragment,Z),ae=p(Z),J=N(Z,T),Z.forEach(_),se=p(M),V=h(M,"DIV",{class:!0});var x=D(V);G(S.$$.fragment,x),ne=p(x),K=N(x,z),x.forEach(_),le=p(M),m&&m.l(M),Q=p(M),c&&c.l(M),M.forEach(_),ie=p(r),q=h(r,"DIV",{class:!0});var ce=D(q);w=h(ce,"IMG",{class:!0,src:!0,alt:!0}),ce.forEach(_),re=p(r),y=h(r,"DIV",{class:!0});var ue=D(y);H=De(ue,!1),ue.forEach(_),r.forEach(_),Y=p(a),k=h(a,"DIV",{class:!0});var ee=D(k);G(j.$$.fragment,ee),oe=p(ee),C=h(ee,"A",{class:!0,href:!0,"data-svelte-h":!0}),ke(C)!=="svelte-1v9gwoe"&&(C.textContent=fe),ee.forEach(_),this.h()},h(){d(s,"class",`headline ${Me}`),d(t,"class",`entry ${te}`),d(V,"class",`entry ${te}`),d(n,"class",`news-data ${Se}`),d(w,"class",je),de(w.src,U=u[0].image)||d(w,"src",U),d(w,"alt",W=u[0].title),d(q,"class",`news-image ${qe}`),H.a=null,d(y,"class",`news-description ${ye}`),d(e,"class","container undefined"),d(C,"class",Te),d(C,"href","/news"),d(k,"class",`back-link ${ze}`)},m(a,r){O(a,e,r),i(e,s),i(s,o),i(e,v),i(e,n),i(n,t),R(l,t,null),i(t,ae),i(t,J),i(n,se),i(n,V),R(S,V,null),i(V,ne),i(V,K),i(n,le),m&&m.m(n,null),i(n,Q),c&&c.m(n,null),i(e,ie),i(e,q),i(q,w),i(e,re),i(e,y),H.m(X,y),O(a,Y,r),O(a,k,r),R(j,k,null),i(k,oe),i(k,C),b=!0},p(a,[r]){(!b||r&1)&&f!==(f=a[0].title+"")&&P(o,f),(!b||r&1)&&T!==(T=a[0].publishdate+"")&&P(J,T),(!b||r&1)&&z!==(z=a[0].author+"")&&P(K,z),a[0].tags?m?(m.p(a,r),r&1&&I(m,1)):(m=ge(a),m.c(),I(m,1),m.m(n,Q)):m&&(_e(),E(m,1,1,()=>{m=null}),ve()),a[0].imageCaption?c?(c.p(a,r),r&1&&I(c,1)):(c=$e(a),c.c(),I(c,1),c.m(n,null)):c&&(_e(),E(c,1,1,()=>{c=null}),ve()),(!b||r&1&&!de(w.src,U=a[0].image))&&d(w,"src",U),(!b||r&1&&W!==(W=a[0].title))&&d(w,"alt",W),(!b||r&1)&&X!==(X=a[0].text+"")&&H.p(X)},i(a){b||(I(l.$$.fragment,a),I(S.$$.fragment,a),I(m),I(c),I(j.$$.fragment,a),b=!0)},o(a){E(l.$$.fragment,a),E(S.$$.fragment,a),E(m),E(c),E(j.$$.fragment,a),b=!1},d(a){a&&(_(e),_(Y),_(k)),B(l),B(S),m&&m.d(),c&&c.d(),B(j)}}}function Ne(u,e,s){let{data:f}=e;const o=f.thisItem;return o.text=Ce.parse(o.text),u.$$set=v=>{"data"in v&&s(1,f=v.data)},[o,f]}class Je extends Ee{constructor(e){super(),Ve(this,e,Ne,Le,we,{data:1})}}export{Je as component,Fe as universal};
