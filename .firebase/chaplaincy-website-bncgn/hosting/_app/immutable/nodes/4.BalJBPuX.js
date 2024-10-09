import{q as Dt,l as Ct,o as It,n as Gt,i as Ht,w as St,e as Jt}from"../chunks/firebaseConfig.hXLAg77p.js";import{s as Xt,e as d,a as x,t as T,R as Kt,c as u,b as _,f as s,g as w,d as B,S as Yt,m as c,i as f,h as r,j as Pe,q as Te,F as it,r as el,n as Ge,a8 as V,A as Vt}from"../chunks/scheduler.NTvg1yRH.js";import{S as Ut,i as Wt,c as Me,b as Ae,m as je,t as C,a as P,d as qe,f as Je,g as Ke}from"../chunks/index.BFVs8E14.js";import{e as Be}from"../chunks/each.D6YF6ztN.js";import{I as rt}from"../chunks/Icon.DzyQmyFx.js";import{I as Ft}from"../chunks/ItemCard.CeEKMuPq.js";const tl=async()=>{const o=Dt(Gt,It("publishdate","desc"),Ct(2));let i=(await Ht(o)).docs.map(m=>({id:m.id,data:m.data()}));const l=new Date,a=Dt(Jt,St("publishDateTime","<",l),St("unpublishDateTime",">",l),It("publishDateTime","asc"),Ct(2));let v=(await Ht(a)).docs.map(m=>({id:m.id,data:m.data()}));return{news:i,events:v}},Tl=Object.freeze(Object.defineProperty({__proto__:null,load:tl},Symbol.toStringTag,{value:"Module"}));function ll(o){let t,i,l,a,h,v,m=o[0].name+"",$,X,M,G=o[0].time+"",J,U,A,W=o[0].kind+"",F,ee,j,K=(o[0].subtitle?o[0].subtitle:"")+"",Y,N,I,Z,R=o[0].place_church+"",oe,te,q,Q,z=o[0].place_address+"",le,H;return l=new rt({props:{name:o[0].icon==="people"?"onsite":"users_online",width:"3rem",height:"3rem"}}),{c(){t=d("div"),i=d("div"),Me(l.$$.fragment),a=x(),h=d("div"),v=d("h3"),$=T(m),X=x(),M=d("p"),J=T(G),U=x(),A=d("h3"),F=T(W),ee=x(),j=d("p"),Y=T(K),N=x(),I=d("div"),Z=d("h4"),oe=T(R),te=x(),q=d("a"),Q=new Kt(!1),this.h()},l(g){t=u(g,"DIV",{class:!0});var b=_(t);i=u(b,"DIV",{class:!0});var D=_(i);Ae(l.$$.fragment,D),D.forEach(s),a=w(b),h=u(b,"DIV",{class:!0});var k=_(h);v=u(k,"H3",{class:!0});var Ee=_(v);$=B(Ee,m),Ee.forEach(s),X=w(k),M=u(k,"P",{class:!0});var de=_(M);J=B(de,G),de.forEach(s),U=w(k),A=u(k,"H3",{class:!0});var se=_(A);F=B(se,W),se.forEach(s),ee=w(k),j=u(k,"P",{class:!0});var ue=_(j);Y=B(ue,K),ue.forEach(s),k.forEach(s),N=w(b),I=u(b,"DIV",{class:!0});var O=_(I);Z=u(O,"H4",{class:!0});var ye=_(Z);oe=B(ye,R),ye.forEach(s),te=w(O),q=u(O,"A",{class:!0,href:!0});var fe=_(q);Q=Yt(fe,!1),fe.forEach(s),O.forEach(s),b.forEach(s),this.h()},h(){c(i,"class",`icon ${al}`),c(v,"class",Lt),c(M,"class",Tt),c(A,"class",Lt),c(j,"class",Tt),c(h,"class",nl),c(Z,"class","mt-2"),Q.a=null,c(q,"class","font-semibold text-link-primary"),c(q,"href",le=o[0].url),c(I,"class","location text-center"),c(t,"class",sl)},m(g,b){f(g,t,b),r(t,i),je(l,i,null),r(t,a),r(t,h),r(h,v),r(v,$),r(h,X),r(h,M),r(M,J),r(h,U),r(h,A),r(A,F),r(h,ee),r(h,j),r(j,Y),r(t,N),r(t,I),r(I,Z),r(Z,oe),r(I,te),r(I,q),Q.m(z,q),H=!0},p(g,[b]){const D={};b&1&&(D.name=g[0].icon==="people"?"onsite":"users_online"),l.$set(D),(!H||b&1)&&m!==(m=g[0].name+"")&&Pe($,m),(!H||b&1)&&G!==(G=g[0].time+"")&&Pe(J,G),(!H||b&1)&&W!==(W=g[0].kind+"")&&Pe(F,W),(!H||b&1)&&K!==(K=(g[0].subtitle?g[0].subtitle:"")+"")&&Pe(Y,K),(!H||b&1)&&R!==(R=g[0].place_church+"")&&Pe(oe,R),(!H||b&1)&&z!==(z=g[0].place_address+"")&&Q.p(z),(!H||b&1&&le!==(le=g[0].url))&&c(q,"href",le)},i(g){H||(C(l.$$.fragment,g),H=!0)},o(g){P(l.$$.fragment,g),H=!1},d(g){g&&s(t),qe(l)}}}const sl="rounded-2xl border border-slate-200 py-5 px-3 shadow-xl",nl="flex flex-col items-center justify-start",al="flex min-h-[80px] items-center justify-center",Lt="mb-0 mt-1",Tt="my-0";function il(o,t,i){let{service:l}=t;return o.$$set=a=>{"service"in a&&i(0,l=a.service)},[l]}class rl extends Ut{constructor(t){super(),Wt(this,t,il,ll,Xt,{service:0})}}const cl=""+new URL("../assets/mainhero.BcHbuLBA.webp",import.meta.url).href,ol=[{id:"1",icon:"people",name:"St. Boniface, Bonn",time:"Sundays, 09:30 am",kind:"Eucharist",subtitle:"Holy Communion",place_church:"St. Paulus Church",place_address:`Siegburger Str. 75, 
Bonn-Beuel`,url:"https://www.openstreetmap.org/?mlat=50.74153&mlon=7.13235#map=19/50.74153/7.13235"},{id:"2",icon:"people",name:"All Saints, Cologne",time:"Sundays, 11:45 am",kind:"Eucharist",subtitle:"Holy Communion",place_church:"All Saints Church",place_address:`Bonner Str./Lindenallee, 
Cologne`,url:"https://www.openstreetmap.org/?mlat=50.89432&mlon=6.96776#map=19/50.89432/6.96776"},{id:"3",icon:"online",name:"Online Service",time:"Tuesdays, 07:30 pm",kind:"Evening Prayer",subtitle:"",place_church:"Zoom",place_address:"Meeting Id: 542 044 8085",url:"https://us02web.zoom.us/j/5420448085?pwd=MFVnM1QzTzRsODZEaHVEUU9qZHpVdz09"},{id:"4",icon:"people",name:"All Saints, Cologne",time:"Fridays, 06:00 pm",kind:"Evening Prayer",subtitle:"Bible Study",place_church:"All Saints Church",place_address:`Bonner Str./Lindenallee, 
Cologne`,url:"https://www.openstreetmap.org/?mlat=50.89432&mlon=6.96776#map=19/50.89432/6.96776"}],dl={services:ol};function Bt(o,t,i){const l=o.slice();return l[2]=t[i],l}function Mt(o,t,i){const l=o.slice();return l[5]=t[i],l}function At(o,t,i){const l=o.slice();return l[8]=t[i],l}function jt(o){let t,i;return t=new rl({props:{service:o[8]}}),{c(){Me(t.$$.fragment)},l(l){Ae(t.$$.fragment,l)},m(l,a){je(t,l,a),i=!0},p:Ge,i(l){i||(C(t.$$.fragment,l),i=!0)},o(l){P(t.$$.fragment,l),i=!1},d(l){qe(t,l)}}}function qt(o){let t,i;return t=new Ft({props:{item:o[5],kind:"news"}}),{c(){Me(t.$$.fragment)},l(l){Ae(t.$$.fragment,l)},m(l,a){je(t,l,a),i=!0},p(l,a){const h={};a&1&&(h.item=l[5]),t.$set(h)},i(l){i||(C(t.$$.fragment,l),i=!0)},o(l){P(t.$$.fragment,l),i=!1},d(l){qe(t,l)}}}function ul(o){let t,i="Currently there are no events scheduled";return{c(){t=d("p"),t.textContent=i},l(l){t=u(l,"P",{"data-svelte-h":!0}),Te(t)!=="svelte-1va327t"&&(t.textContent=i)},m(l,a){f(l,t,a)},p:Ge,i:Ge,o:Ge,d(l){l&&s(t)}}}function fl(o){let t,i,l=Be(o[0].events),a=[];for(let v=0;v<l.length;v+=1)a[v]=Pt(Bt(o,l,v));const h=v=>P(a[v],1,1,()=>{a[v]=null});return{c(){for(let v=0;v<a.length;v+=1)a[v].c();t=Vt()},l(v){for(let m=0;m<a.length;m+=1)a[m].l(v);t=Vt()},m(v,m){for(let $=0;$<a.length;$+=1)a[$]&&a[$].m(v,m);f(v,t,m),i=!0},p(v,m){if(m&1){l=Be(v[0].events);let $;for($=0;$<l.length;$+=1){const X=Bt(v,l,$);a[$]?(a[$].p(X,m),C(a[$],1)):(a[$]=Pt(X),a[$].c(),C(a[$],1),a[$].m(t.parentNode,t))}for(Ke(),$=l.length;$<a.length;$+=1)h($);Je()}},i(v){if(!i){for(let m=0;m<l.length;m+=1)C(a[m]);i=!0}},o(v){a=a.filter(Boolean);for(let m=0;m<a.length;m+=1)P(a[m]);i=!1},d(v){v&&s(t),it(a,v)}}}function Pt(o){let t,i;return t=new Ft({props:{item:o[2],kind:"events"}}),{c(){Me(t.$$.fragment)},l(l){Ae(t.$$.fragment,l)},m(l,a){je(t,l,a),i=!0},p(l,a){const h={};a&1&&(h.item=l[2]),t.$set(h)},i(l){i||(C(t.$$.fragment,l),i=!0)},o(l){P(t.$$.fragment,l),i=!1},d(l){qe(t,l)}}}function Nt(o){let t,i='<a class="cool-link svelte-1st84c2" href="/news">See all events</a>';return{c(){t=d("div"),t.innerHTML=i,this.h()},l(l){t=u(l,"DIV",{class:!0,"data-svelte-h":!0}),Te(t)!=="svelte-me08z5"&&(t.innerHTML=i),this.h()},h(){c(t,"class","more-link mb-8 svelte-1st84c2")},m(l,a){f(l,t,a)},d(l){l&&s(t)}}}function vl(o){let t,i,l,a,h,v,m,$=`<img src="${cl}" alt="main hero"/>`,X,M,G,J,U,A,W,F,ee,j,K,Y,N,I,Z,R,oe='<a class="cool-link svelte-1st84c2" href="/news">See all news articles</a>',te,q,Q,z,le,H,g,b,D,k,Ee,de,se,ue,O,ye,fe,ne,ct='<div class="more-link svelte-1st84c2"><a class="cool-link svelte-1st84c2" href="/about">Learn more</a></div>',Ne,ve,Ye,Re,ae,ot='<div class="more-link svelte-1st84c2"><a class="cool-link svelte-1st84c2" href="/about">Learn more</a></div>',ze,me,ke,et,Oe,pe,ie,he,tt,De,Ce,_e,lt,ge,st,Ie,He,$e,Xe,xe=Be(o[1]),E=[];for(let e=0;e<xe.length;e+=1)E[e]=jt(At(o,xe,e));const Zt=e=>P(E[e],1,1,()=>{E[e]=null});let we=Be(o[0].news),y=[];for(let e=0;e<we.length;e+=1)y[e]=qt(Mt(o,we,e));const Qt=e=>P(y[e],1,1,()=>{y[e]=null}),dt=[fl,ul],re=[];function ut(e,n){return e[0].events.length>0?0:1}D=ut(o),k=re[D]=dt[D](o);let L=o[0].events.length>1&&Nt();return _e=new rt({props:{name:"sheet",width:"24px",height:"24px"}}),$e=new rt({props:{name:"sheet",width:"24px",height:"24px"}}),{c(){t=d("div"),i=T("Anglican Chaplaincy of Bonn and Cologne"),l=x(),a=d("div"),h=T("St. Boniface, Bonn and All Saints, Cologne"),v=x(),m=d("div"),m.innerHTML=$,X=x(),M=d("div"),G=T("Our regular worship services"),J=x(),U=d("div"),A=d("div");for(let e=0;e<E.length;e+=1)E[e].c();W=x(),F=d("hr"),ee=x(),j=d("div"),K=T("News and Notices"),Y=x(),N=d("div"),I=d("div");for(let e=0;e<y.length;e+=1)y[e].c();Z=x(),R=d("div"),R.innerHTML=oe,te=x(),q=d("hr"),Q=x(),z=d("div"),le=T("Upcoming Events"),H=x(),g=d("div"),b=d("div"),k.c(),Ee=x(),L&&L.c(),de=x(),se=d("hr"),ue=x(),O=d("div"),ye=T("Who we are"),fe=x(),ne=d("div"),ne.innerHTML=ct,Ne=x(),ve=d("div"),Ye=T("Safeguarding"),Re=x(),ae=d("div"),ae.innerHTML=ot,ze=x(),me=d("div"),ke=d("h2"),et=T("Downloads"),Oe=x(),pe=d("div"),ie=d("div"),he=d("div"),tt=T(`Weekly Sheet
			`),De=d("div"),Ce=d("span"),Me(_e.$$.fragment),lt=x(),ge=d("div"),st=T(`Newsletter
			`),Ie=d("div"),He=d("span"),Me($e.$$.fragment),this.h()},l(e){t=u(e,"DIV",{class:!0});var n=_(t);i=B(n,"Anglican Chaplaincy of Bonn and Cologne"),n.forEach(s),l=w(e),a=u(e,"DIV",{class:!0});var S=_(a);h=B(S,"St. Boniface, Bonn and All Saints, Cologne"),S.forEach(s),v=w(e),m=u(e,"DIV",{class:!0,"data-svelte-h":!0}),Te(m)!=="svelte-bu64fs"&&(m.innerHTML=$),X=w(e),M=u(e,"DIV",{class:!0});var p=_(M);G=B(p,"Our regular worship services"),p.forEach(s),J=w(e),U=u(e,"DIV",{class:!0});var ce=_(U);A=u(ce,"DIV",{class:!0});var ft=_(A);for(let be=0;be<E.length;be+=1)E[be].l(ft);ft.forEach(s),ce.forEach(s),W=w(e),F=u(e,"HR",{class:!0}),ee=w(e),j=u(e,"DIV",{class:!0});var vt=_(j);K=B(vt,"News and Notices"),vt.forEach(s),Y=w(e),N=u(e,"DIV",{class:!0});var Ue=_(N);I=u(Ue,"DIV",{class:!0});var mt=_(I);for(let be=0;be<y.length;be+=1)y[be].l(mt);mt.forEach(s),Z=w(Ue),R=u(Ue,"DIV",{class:!0,"data-svelte-h":!0}),Te(R)!=="svelte-1nwgd6"&&(R.innerHTML=oe),Ue.forEach(s),te=w(e),q=u(e,"HR",{class:!0}),Q=w(e),z=u(e,"DIV",{class:!0});var pt=_(z);le=B(pt,"Upcoming Events"),pt.forEach(s),H=w(e),g=u(e,"DIV",{class:!0});var We=_(g);b=u(We,"DIV",{class:!0});var ht=_(b);k.l(ht),ht.forEach(s),Ee=w(We),L&&L.l(We),We.forEach(s),de=w(e),se=u(e,"HR",{class:!0}),ue=w(e),O=u(e,"DIV",{class:!0});var _t=_(O);ye=B(_t,"Who we are"),_t.forEach(s),fe=w(e),ne=u(e,"DIV",{class:!0,"data-svelte-h":!0}),Te(ne)!=="svelte-1yq8qkn"&&(ne.innerHTML=ct),Ne=w(e),ve=u(e,"DIV",{class:!0});var gt=_(ve);Ye=B(gt,"Safeguarding"),gt.forEach(s),Re=w(e),ae=u(e,"DIV",{class:!0,"data-svelte-h":!0}),Te(ae)!=="svelte-1yq8qkn"&&(ae.innerHTML=ot),ze=w(e),me=u(e,"DIV",{class:!0});var $t=_(me);ke=u($t,"H2",{class:!0});var xt=_(ke);et=B(xt,"Downloads"),xt.forEach(s),$t.forEach(s),Oe=w(e),pe=u(e,"DIV",{class:!0});var wt=_(pe);ie=u(wt,"DIV",{class:!0});var Fe=_(ie);he=u(Fe,"DIV",{class:!0});var nt=_(he);tt=B(nt,`Weekly Sheet
			`),De=u(nt,"DIV",{class:!0});var bt=_(De);Ce=u(bt,"SPAN",{class:!0});var Et=_(Ce);Ae(_e.$$.fragment,Et),Et.forEach(s),bt.forEach(s),nt.forEach(s),lt=w(Fe),ge=u(Fe,"DIV",{class:!0});var at=_(ge);st=B(at,`Newsletter
			`),Ie=u(at,"DIV",{class:!0});var yt=_(Ie);He=u(yt,"SPAN",{class:!0});var kt=_(He);Ae($e.$$.fragment,kt),kt.forEach(s),yt.forEach(s),at.forEach(s),Fe.forEach(s),wt.forEach(s),this.h()},h(){c(t,"class",V(`page-title ${ml} ${pl} ${hl}`)+" svelte-1st84c2"),c(a,"class",V(`sub-title ${_l} ${gl} ${$l} `)+" svelte-1st84c2"),c(m,"class","image-container svelte-1st84c2"),c(M,"class",V(`sectionHeader ${Se} ${Ve} ${Le}`)+" svelte-1st84c2"),c(A,"class",V(`services ${xl} ${wl} ${bl}`)+" svelte-1st84c2"),c(U,"class",V(`container ${Ze} ${Qe}`)+" svelte-1st84c2"),c(F,"class","mx-auto w-[80%]"),c(j,"class",V(`sectionHeader ${Se} ${Ve} ${Le}`)+" svelte-1st84c2"),c(I,"class",V(`item-container ${Rt} ${zt} ${Ot}`)+" svelte-1st84c2"),c(R,"class","more-link mb-8 svelte-1st84c2"),c(N,"class",V(`container ${Ze} ${Qe}`)+" svelte-1st84c2"),c(q,"class","mx-auto w-[80%]"),c(z,"class",V(`sectionHeader ${Se} ${Ve} ${Le}`)+" svelte-1st84c2"),c(b,"class",V(`item-container ${Rt} ${zt} ${Ot}`)+" svelte-1st84c2"),c(g,"class",V(`container ${Ze} ${Qe}`)+" svelte-1st84c2"),c(se,"class","mx-auto w-[80%]"),c(O,"class",V(`sectionHeader ${Se} ${Ve} ${Le}`)+" svelte-1st84c2"),c(ne,"class","single-post"),c(ve,"class",V(`sectionHeader ${Se} ${Ve} ${Le}`)+" svelte-1st84c2"),c(ae,"class","single-post"),c(ke,"class",V(`sectionHeader ${Se} ${Ve} ${Le}`)+" svelte-1st84c2"),c(me,"class","downloads"),c(Ce,"class","icon"),c(De,"class","circle svelte-1st84c2"),c(he,"class","download-item mt-10 svelte-1st84c2"),c(He,"class","icon"),c(Ie,"class","circle svelte-1st84c2"),c(ge,"class","download-item mt-10 svelte-1st84c2"),c(ie,"class",V(`download-container ${El} ${yl} ${kl}`)+" svelte-1st84c2"),c(pe,"class",V(`container ${Ze} ${Qe}`)+" svelte-1st84c2")},m(e,n){f(e,t,n),r(t,i),f(e,l,n),f(e,a,n),r(a,h),f(e,v,n),f(e,m,n),f(e,X,n),f(e,M,n),r(M,G),f(e,J,n),f(e,U,n),r(U,A);for(let S=0;S<E.length;S+=1)E[S]&&E[S].m(A,null);f(e,W,n),f(e,F,n),f(e,ee,n),f(e,j,n),r(j,K),f(e,Y,n),f(e,N,n),r(N,I);for(let S=0;S<y.length;S+=1)y[S]&&y[S].m(I,null);r(N,Z),r(N,R),f(e,te,n),f(e,q,n),f(e,Q,n),f(e,z,n),r(z,le),f(e,H,n),f(e,g,n),r(g,b),re[D].m(b,null),r(g,Ee),L&&L.m(g,null),f(e,de,n),f(e,se,n),f(e,ue,n),f(e,O,n),r(O,ye),f(e,fe,n),f(e,ne,n),f(e,Ne,n),f(e,ve,n),r(ve,Ye),f(e,Re,n),f(e,ae,n),f(e,ze,n),f(e,me,n),r(me,ke),r(ke,et),f(e,Oe,n),f(e,pe,n),r(pe,ie),r(ie,he),r(he,tt),r(he,De),r(De,Ce),je(_e,Ce,null),r(ie,lt),r(ie,ge),r(ge,st),r(ge,Ie),r(Ie,He),je($e,He,null),Xe=!0},p(e,[n]){if(n&2){xe=Be(e[1]);let p;for(p=0;p<xe.length;p+=1){const ce=At(e,xe,p);E[p]?(E[p].p(ce,n),C(E[p],1)):(E[p]=jt(ce),E[p].c(),C(E[p],1),E[p].m(A,null))}for(Ke(),p=xe.length;p<E.length;p+=1)Zt(p);Je()}if(n&1){we=Be(e[0].news);let p;for(p=0;p<we.length;p+=1){const ce=Mt(e,we,p);y[p]?(y[p].p(ce,n),C(y[p],1)):(y[p]=qt(ce),y[p].c(),C(y[p],1),y[p].m(I,null))}for(Ke(),p=we.length;p<y.length;p+=1)Qt(p);Je()}let S=D;D=ut(e),D===S?re[D].p(e,n):(Ke(),P(re[S],1,1,()=>{re[S]=null}),Je(),k=re[D],k?k.p(e,n):(k=re[D]=dt[D](e),k.c()),C(k,1),k.m(b,null)),e[0].events.length>1?L||(L=Nt(),L.c(),L.m(g,null)):L&&(L.d(1),L=null)},i(e){if(!Xe){for(let n=0;n<xe.length;n+=1)C(E[n]);for(let n=0;n<we.length;n+=1)C(y[n]);C(k),C(_e.$$.fragment,e),C($e.$$.fragment,e),Xe=!0}},o(e){E=E.filter(Boolean);for(let n=0;n<E.length;n+=1)P(E[n]);y=y.filter(Boolean);for(let n=0;n<y.length;n+=1)P(y[n]);P(k),P(_e.$$.fragment,e),P($e.$$.fragment,e),Xe=!1},d(e){e&&(s(t),s(l),s(a),s(v),s(m),s(X),s(M),s(J),s(U),s(W),s(F),s(ee),s(j),s(Y),s(N),s(te),s(q),s(Q),s(z),s(H),s(g),s(de),s(se),s(ue),s(O),s(fe),s(ne),s(Ne),s(ve),s(Re),s(ae),s(ze),s(me),s(Oe),s(pe)),it(E,e),it(y,e),re[D].d(),L&&L.d(),qe(_e),qe($e)}}}const ml="text-2xl text-justify w-full px-5 font-semibold",pl="lg:text-4xl lg:px-10 lg:py-4",hl="xl:text-6xl xl:px-10 xl:py-6",_l="text-lg text-justify w-full px-5 py-3 ",gl="lg:text-2xl lg:px-10 lg:py-2",$l="xl:text-4xl xl:px-10 xl:py-5",Se="text-xl text-justify w-full px-5 pt-4 font-semibold",Ve="md:text-3xl md:px-10 md:pt-10 md:py-3",Le="xl:text-4xl xl:px-10 xl:pt-14 xl:py-5 ",Ze="mb-5",Qe="lg:mb-10",xl="px-5 py-5 grid grid-cols-1 gap-5",wl="md:grid-cols-2 md:gap-8 md:px-10 ",bl="xl:grid xl:grid-cols-4 xl:gap-8 xl:px-5 ",Rt="px-5 grid grid-cols-1",zt="lg:px-10 lg:grid lg:grid-cols-2 lg:gap-5",Ot="xl:px-10 xl:grid xl:grid-cols-2 xl:gap-5",El="grid grid-cols-2 justify-items-center px-5",yl="lg:grid lg:grid-cols-4 lg:justify-items-center lg:px-5",kl="xl:grid xl:grid-cols-4 xl:justify-items-center xl:px-5";function Dl(o,t,i){const l=dl.services.map(h=>(h.place_address&&(h.place_address=h.place_address.replace(/\n/g,"<br>")),h));let{data:a}=t;return el(()=>{}),o.$$set=h=>{"data"in h&&i(0,a=h.data)},[a,l]}class Bl extends Ut{constructor(t){super(),Wt(this,t,Dl,vl,Xt,{data:0})}}export{Bl as component,Tl as universal};
