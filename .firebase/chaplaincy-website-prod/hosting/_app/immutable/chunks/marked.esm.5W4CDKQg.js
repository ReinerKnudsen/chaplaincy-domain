var xe=Object.defineProperty;var V=c=>{throw TypeError(c)};var be=(c,e,t)=>e in c?xe(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var k=(c,e,t)=>be(c,typeof e!="symbol"?e+"":e,t),we=(c,e,t)=>e.has(c)||V("Cannot "+t);var Y=(c,e,t)=>e.has(c)?V("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(c):e.set(c,t);var _=(c,e,t)=>(we(c,e,"access private method"),t);function O(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let R=O();function re(c){R=c}const le=/[&<>"']/,me=new RegExp(le.source,"g"),oe=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,ye=new RegExp(oe.source,"g"),$e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ee=c=>$e[c];function b(c,e){if(e){if(le.test(c))return c.replace(me,ee)}else if(oe.test(c))return c.replace(ye,ee);return c}const ze=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function Te(c){return c.replace(ze,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const Re=/(^|[^\[])\^/g;function d(c,e){let t=typeof c=="string"?c:c.source;e=e||"";const s={replace:(n,i)=>{let r=typeof i=="string"?i:i.source;return r=r.replace(Re,"$1"),t=t.replace(n,r),s},getRegex:()=>new RegExp(t,e)};return s}function te(c){try{c=encodeURI(c).replace(/%25/g,"%")}catch{return null}return c}const A={exec:()=>null};function ne(c,e){const t=c.replace(/\|/g,(i,r,l)=>{let o=!1,h=r;for(;--h>=0&&l[h]==="\\";)o=!o;return o?"|":" |"}),s=t.split(/ \|/);let n=0;if(s[0].trim()||s.shift(),s.length>0&&!s[s.length-1].trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(/\\\|/g,"|");return s}function I(c,e,t){const s=c.length;if(s===0)return"";let n=0;for(;n<s;){const i=c.charAt(s-n-1);if(i===e&&!t)n++;else if(i!==e&&t)n++;else break}return c.slice(0,s-n)}function _e(c,e){if(c.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<c.length;s++)if(c[s]==="\\")s++;else if(c[s]===e[0])t++;else if(c[s]===e[1]&&(t--,t<0))return s;return-1}function se(c,e,t,s){const n=e.href,i=e.title?b(e.title):null,r=c[1].replace(/\\([\[\]])/g,"$1");if(c[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:n,title:i,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:n,title:i,text:b(r)}}function Ie(c,e){const t=c.match(/^(\s+)(?:```)/);if(t===null)return e;const s=t[1];return e.split(`
`).map(n=>{const i=n.match(/^\s+/);if(i===null)return n;const[r]=i;return r.length>=s.length?n.slice(s.length):n}).join(`
`)}class B{constructor(e){k(this,"options");k(this,"rules");k(this,"lexer");this.options=e||R}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:I(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],n=Ie(s,t[3]||"");return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(/#$/.test(s)){const n=I(s,"#");(this.options.pedantic||!n||/ $/.test(n))&&(s=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:I(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=I(t[0],`
`).split(`
`),n="",i="";const r=[];for(;s.length>0;){let l=!1;const o=[];let h;for(h=0;h<s.length;h++)if(/^ {0,3}>/.test(s[h]))o.push(s[h]),l=!0;else if(!l)o.push(s[h]);else break;s=s.slice(h);const a=o.join(`
`),u=a.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");n=n?`${n}
${a}`:a,i=i?`${i}
${u}`:u;const f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,r,!0),this.lexer.state.top=f,s.length===0)break;const p=r[r.length-1];if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const x=p,w=x.raw+`
`+s.join(`
`),m=this.blockquote(w);r[r.length-1]=m,n=n.substring(0,n.length-x.raw.length)+m.raw,i=i.substring(0,i.length-x.text.length)+m.text;break}else if((p==null?void 0:p.type)==="list"){const x=p,w=x.raw+`
`+s.join(`
`),m=this.list(w);r[r.length-1]=m,n=n.substring(0,n.length-p.raw.length)+m.raw,i=i.substring(0,i.length-x.raw.length)+m.raw,s=w.substring(r[r.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:r,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const n=s.length>1,i={type:"list",raw:"",ordered:n,start:n?+s.slice(0,-1):"",loose:!1,items:[]};s=n?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=n?s:"[*+-]");const r=new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",o="",h=!1;for(;e;){let a=!1;if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let u=t[2].split(`
`,1)[0].replace(/^\t+/,j=>" ".repeat(3*j.length)),f=e.split(`
`,1)[0],p=0;this.options.pedantic?(p=2,o=u.trimStart()):(p=t[2].search(/[^ ]/),p=p>4?1:p,o=u.slice(p),p+=t[1].length);let x=!1;if(!u&&/^ *$/.test(f)&&(l+=f+`
`,e=e.substring(f.length+1),a=!0),!a){const j=new RegExp(`^ {0,${Math.min(3,p-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),W=new RegExp(`^ {0,${Math.min(3,p-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),J=new RegExp(`^ {0,${Math.min(3,p-1)}}(?:\`\`\`|~~~)`),K=new RegExp(`^ {0,${Math.min(3,p-1)}}#`);for(;e;){const Q=e.split(`
`,1)[0];if(f=Q,this.options.pedantic&&(f=f.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),J.test(f)||K.test(f)||j.test(f)||W.test(e))break;if(f.search(/[^ ]/)>=p||!f.trim())o+=`
`+f.slice(p);else{if(x||u.search(/[^ ]/)>=4||J.test(u)||K.test(u)||W.test(u))break;o+=`
`+f}!x&&!f.trim()&&(x=!0),l+=Q+`
`,e=e.substring(Q.length+1),u=f.slice(p)}}i.loose||(h?i.loose=!0:/\n *\n *$/.test(l)&&(h=!0));let w=null,m;this.options.gfm&&(w=/^\[[ xX]\] /.exec(o),w&&(m=w[0]!=="[ ] ",o=o.replace(/^\[[ xX]\] +/,""))),i.items.push({type:"list_item",raw:l,task:!!w,checked:m,loose:!1,text:o,tokens:[]}),i.raw+=l}i.items[i.items.length-1].raw=l.trimEnd(),i.items[i.items.length-1].text=o.trimEnd(),i.raw=i.raw.trimEnd();for(let a=0;a<i.items.length;a++)if(this.lexer.state.top=!1,i.items[a].tokens=this.lexer.blockTokens(i.items[a].text,[]),!i.loose){const u=i.items[a].tokens.filter(p=>p.type==="space"),f=u.length>0&&u.some(p=>/\n.*\n/.test(p.raw));i.loose=f}if(i.loose)for(let a=0;a<i.items.length;a++)i.items[a].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(/\s+/g," "),n=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:n,title:i}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const s=ne(t[1]),n=t[2].replace(/^\||\| *$/g,"").split("|"),i=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===n.length){for(const l of n)/^ *-+: *$/.test(l)?r.align.push("right"):/^ *:-+: *$/.test(l)?r.align.push("center"):/^ *:-+ *$/.test(l)?r.align.push("left"):r.align.push(null);for(let l=0;l<s.length;l++)r.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:r.align[l]});for(const l of i)r.rows.push(ne(l,r.header.length).map((o,h)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:r.align[h]})));return r}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:b(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&/^</.test(s)){if(!/>$/.test(s))return;const r=I(s.slice(0,-1),"\\");if((s.length-r.length)%2===0)return}else{const r=_e(t[2],"()");if(r>-1){const o=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let n=t[2],i="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);r&&(n=r[1],i=r[3])}else i=t[3]?t[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(this.options.pedantic&&!/>$/.test(s)?n=n.slice(1):n=n.slice(1,-1)),se(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const n=(s[2]||s[1]).replace(/\s+/g," "),i=t[n.toLowerCase()];if(!i){const r=s[0].charAt(0);return{type:"text",raw:r,text:r}}return se(s,i,s[0],this.lexer)}}emStrong(e,t,s=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!n||n[3]&&s.match(/[\p{L}\p{N}]/u))return;if(!(n[1]||n[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const r=[...n[0]].length-1;let l,o,h=r,a=0;const u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+r);(n=u.exec(t))!=null;){if(l=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!l)continue;if(o=[...l].length,n[3]||n[4]){h+=o;continue}else if((n[5]||n[6])&&r%3&&!((r+o)%3)){a+=o;continue}if(h-=o,h>0)continue;o=Math.min(o,o+h+a);const f=[...n[0]][0].length,p=e.slice(0,r+n.index+f+o);if(Math.min(r,o)%2){const w=p.slice(1,-1);return{type:"em",raw:p,text:w,tokens:this.lexer.inlineTokens(w)}}const x=p.slice(2,-2);return{type:"strong",raw:p,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(/\n/g," ");const n=/[^ ]/.test(s),i=/^ /.test(s)&&/ $/.test(s);return n&&i&&(s=s.substring(1,s.length-1)),s=b(s,!0),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,n;return t[2]==="@"?(s=b(t[1]),n="mailto:"+s):(s=b(t[1]),n=s),{type:"link",raw:t[0],text:s,href:n,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let n,i;if(t[2]==="@")n=b(t[0]),i="mailto:"+n;else{let r;do r=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(r!==t[0]);n=b(t[0]),t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let s;return this.lexer.state.inRawBlock?s=t[0]:s=b(t[0]),{type:"text",raw:t[0],text:s}}}}const Se=/^(?: *(?:\n|$))+/,Ae=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Ee=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,L=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Le=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ae=/(?:[*+-]|\d{1,9}[.)])/,ce=d(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,ae).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),N=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ce=/^[^\n]+/,H=/(?!\s*\])(?:\\.|[^\[\]\\])+/,qe=d(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",H).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Be=d(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ae).getRegex(),P="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",F=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ze=d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",F).replace("tag",P).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),he=d(N).replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",P).getRegex(),ve=d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",he).getRegex(),U={blockquote:ve,code:Ae,def:qe,fences:Ee,heading:Le,hr:L,html:Ze,lheading:ce,list:Be,newline:Se,paragraph:he,table:A,text:Ce},ie=d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",P).getRegex(),Pe={...U,table:ie,paragraph:d(N).replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ie).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",P).getRegex()},je={...U,html:d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",F).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:A,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:d(N).replace("hr",L).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ce).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pe=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Qe=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ue=/^( {2,}|\\)\n(?!\s*$)/,Me=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,C="\\p{P}\\p{S}",De=d(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,C).getRegex(),Oe=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Ne=d(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,C).getRegex(),He=d("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,C).getRegex(),Fe=d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,C).getRegex(),Ue=d(/\\([punct])/,"gu").replace(/punct/g,C).getRegex(),Xe=d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ge=d(F).replace("(?:-->|$)","-->").getRegex(),We=d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ge).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Z=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Je=d(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Z).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fe=d(/^!?\[(label)\]\[(ref)\]/).replace("label",Z).replace("ref",H).getRegex(),ge=d(/^!?\[(ref)\](?:\[\])?/).replace("ref",H).getRegex(),Ke=d("reflink|nolink(?!\\()","g").replace("reflink",fe).replace("nolink",ge).getRegex(),X={_backpedal:A,anyPunctuation:Ue,autolink:Xe,blockSkip:Oe,br:ue,code:Qe,del:A,emStrongLDelim:Ne,emStrongRDelimAst:He,emStrongRDelimUnd:Fe,escape:pe,link:Je,nolink:ge,punctuation:De,reflink:fe,reflinkSearch:Ke,tag:We,text:Me,url:A},Ve={...X,link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",Z).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Z).getRegex()},M={...X,escape:d(pe).replace("])","~|])").getRegex(),url:d(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Ye={...M,br:d(ue).replace("{2,}","*").getRegex(),text:d(M.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},q={normal:U,gfm:Pe,pedantic:je},S={normal:X,gfm:M,breaks:Ye,pedantic:Ve};class y{constructor(e){k(this,"tokens");k(this,"options");k(this,"state");k(this,"tokenizer");k(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||R,this.options.tokenizer=this.options.tokenizer||new B,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:q.normal,inline:S.normal};this.options.pedantic?(t.block=q.pedantic,t.inline=S.pedantic):this.options.gfm&&(t.block=q.gfm,this.options.breaks?t.inline=S.breaks:t.inline=S.gfm),this.tokenizer.rules=t}static get rules(){return{block:q,inline:S}}static lex(e,t){return new y(t).lex(e)}static lexInline(e,t){return new y(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,o,h)=>o+"    ".repeat(h.length));let n,i,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(n=l.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+n.raw,i.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const o=e.slice(1);let h;this.options.extensions.startBlock.forEach(a=>{h=a.call({lexer:this},o),typeof h=="number"&&h>=0&&(l=Math.min(l,h))}),l<1/0&&l>=0&&(r=e.substring(0,l+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){i=t[t.length-1],s&&(i==null?void 0:i.type)==="paragraph"?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(n),s=r.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),i=t[t.length-1],i&&i.type==="text"?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(n);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let s,n,i,r=e,l,o,h;if(this.tokens.links){const a=Object.keys(this.tokens.links);if(a.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,l.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(o||(h=""),o=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(a=>(s=a.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))){if(s=this.tokenizer.escape(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.tag(e)){e=e.substring(s.raw.length),n=t[t.length-1],n&&s.type==="text"&&n.type==="text"?(n.raw+=s.raw,n.text+=s.text):t.push(s);continue}if(s=this.tokenizer.link(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(s.raw.length),n=t[t.length-1],n&&s.type==="text"&&n.type==="text"?(n.raw+=s.raw,n.text+=s.text):t.push(s);continue}if(s=this.tokenizer.emStrong(e,r,h)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.codespan(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.br(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.del(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.autolink(e)){e=e.substring(s.raw.length),t.push(s);continue}if(!this.state.inLink&&(s=this.tokenizer.url(e))){e=e.substring(s.raw.length),t.push(s);continue}if(i=e,this.options.extensions&&this.options.extensions.startInline){let a=1/0;const u=e.slice(1);let f;this.options.extensions.startInline.forEach(p=>{f=p.call({lexer:this},u),typeof f=="number"&&f>=0&&(a=Math.min(a,f))}),a<1/0&&a>=0&&(i=e.substring(0,a+1))}if(s=this.tokenizer.inlineText(i)){e=e.substring(s.raw.length),s.raw.slice(-1)!=="_"&&(h=s.raw.slice(-1)),o=!0,n=t[t.length-1],n&&n.type==="text"?(n.raw+=s.raw,n.text+=s.text):t.push(s);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return t}}class v{constructor(e){k(this,"options");k(this,"parser");this.options=e||R}space(e){return""}code({text:e,lang:t,escaped:s}){var r;const n=(r=(t||"").match(/^\S*/))==null?void 0:r[0],i=e.replace(/\n$/,"")+`
`;return n?'<pre><code class="language-'+b(n)+'">'+(s?i:b(i,!0))+`</code></pre>
`:"<pre><code>"+(s?i:b(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,s=e.start;let n="";for(let l=0;l<e.items.length;l++){const o=e.items[l];n+=this.listitem(o)}const i=t?"ol":"ul",r=t&&s!==1?' start="'+s+'"':"";return"<"+i+r+`>
`+n+"</"+i+`>
`}listitem(e){let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?e.tokens.length>0&&e.tokens[0].type==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+e.tokens[0].tokens[0].text)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" "}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",s="";for(let i=0;i<e.header.length;i++)s+=this.tablecell(e.header[i]);t+=this.tablerow({text:s});let n="";for(let i=0;i<e.rows.length;i++){const r=e.rows[i];s="";for(let l=0;l<r.length;l++)s+=this.tablecell(r[l]);n+=this.tablerow({text:s})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),s=e.header?"th":"td";return(e.align?`<${s} align="${e.align}">`:`<${s}>`)+t+`</${s}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const n=this.parser.parseInline(s),i=te(e);if(i===null)return n;e=i;let r='<a href="'+e+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image({href:e,title:t,text:s}){const n=te(e);if(n===null)return s;e=n;let i=`<img src="${e}" alt="${s}"`;return t&&(i+=` title="${t}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class G{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class ${constructor(e){k(this,"options");k(this,"renderer");k(this,"textRenderer");this.options=e||R,this.options.renderer=this.options.renderer||new v,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new G}static parse(e,t){return new $(t).parse(e)}static parseInline(e,t){return new $(t).parseInline(e)}parse(e,t=!0){let s="";for(let n=0;n<e.length;n++){const i=e[n];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const l=i,o=this.options.extensions.renderers[l.type].call({parser:this},l);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=o||"";continue}}const r=i;switch(r.type){case"space":{s+=this.renderer.space(r);continue}case"hr":{s+=this.renderer.hr(r);continue}case"heading":{s+=this.renderer.heading(r);continue}case"code":{s+=this.renderer.code(r);continue}case"table":{s+=this.renderer.table(r);continue}case"blockquote":{s+=this.renderer.blockquote(r);continue}case"list":{s+=this.renderer.list(r);continue}case"html":{s+=this.renderer.html(r);continue}case"paragraph":{s+=this.renderer.paragraph(r);continue}case"text":{let l=r,o=this.renderer.text(l);for(;n+1<e.length&&e[n+1].type==="text";)l=e[++n],o+=`
`+this.renderer.text(l);t?s+=this.renderer.paragraph({type:"paragraph",raw:o,text:o,tokens:[{type:"text",raw:o,text:o}]}):s+=o;continue}default:{const l='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,t){t=t||this.renderer;let s="";for(let n=0;n<e.length;n++){const i=e[n];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}const r=i;switch(r.type){case"escape":{s+=t.text(r);break}case"html":{s+=t.html(r);break}case"link":{s+=t.link(r);break}case"image":{s+=t.image(r);break}case"strong":{s+=t.strong(r);break}case"em":{s+=t.em(r);break}case"codespan":{s+=t.codespan(r);break}case"br":{s+=t.br(r);break}case"del":{s+=t.del(r);break}case"text":{s+=t.text(r);break}default:{const l='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}}class E{constructor(e){k(this,"options");this.options=e||R}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}k(E,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var z,de,D,ke;class et{constructor(...e){Y(this,z);k(this,"defaults",O());k(this,"options",this.setOptions);k(this,"parse",_(this,z,D).call(this,y.lex,$.parse));k(this,"parseInline",_(this,z,D).call(this,y.lexInline,$.parseInline));k(this,"Parser",$);k(this,"Renderer",v);k(this,"TextRenderer",G);k(this,"Lexer",y);k(this,"Tokenizer",B);k(this,"Hooks",E);this.use(...e)}walkTokens(e,t){var n,i;let s=[];for(const r of e)switch(s=s.concat(t.call(this,r)),r.type){case"table":{const l=r;for(const o of l.header)s=s.concat(this.walkTokens(o.tokens,t));for(const o of l.rows)for(const h of o)s=s.concat(this.walkTokens(h.tokens,t));break}case"list":{const l=r;s=s.concat(this.walkTokens(l.items,t));break}default:{const l=r;(i=(n=this.defaults.extensions)==null?void 0:n.childTokens)!=null&&i[l.type]?this.defaults.extensions.childTokens[l.type].forEach(o=>{const h=l[o].flat(1/0);s=s.concat(this.walkTokens(h,t))}):l.tokens&&(s=s.concat(this.walkTokens(l.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const n={...s};if(n.async=this.defaults.async||n.async||!1,s.extensions&&(s.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const r=t.renderers[i.name];r?t.renderers[i.name]=function(...l){let o=i.renderer.apply(this,l);return o===!1&&(o=r.apply(this,l)),o}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const r=t[i.level];r?r.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),n.extensions=t),s.renderer){const i=this.defaults.renderer||new v(this.defaults);for(const r in s.renderer){if(!(r in i))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;const l=r;let o=s.renderer[l];const h=i[l];i[l]=(...a)=>{s.useNewRenderer||(o=_(this,z,de).call(this,o,l,i));let u=o.apply(i,a);return u===!1&&(u=h.apply(i,a)),u||""}}n.renderer=i}if(s.tokenizer){const i=this.defaults.tokenizer||new B(this.defaults);for(const r in s.tokenizer){if(!(r in i))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;const l=r,o=s.tokenizer[l],h=i[l];i[l]=(...a)=>{let u=o.apply(i,a);return u===!1&&(u=h.apply(i,a)),u}}n.tokenizer=i}if(s.hooks){const i=this.defaults.hooks||new E;for(const r in s.hooks){if(!(r in i))throw new Error(`hook '${r}' does not exist`);if(r==="options")continue;const l=r,o=s.hooks[l],h=i[l];E.passThroughHooks.has(r)?i[l]=a=>{if(this.defaults.async)return Promise.resolve(o.call(i,a)).then(f=>h.call(i,f));const u=o.call(i,a);return h.call(i,u)}:i[l]=(...a)=>{let u=o.apply(i,a);return u===!1&&(u=h.apply(i,a)),u}}n.hooks=i}if(s.walkTokens){const i=this.defaults.walkTokens,r=s.walkTokens;n.walkTokens=function(l){let o=[];return o.push(r.call(this,l)),i&&(o=o.concat(i.call(this,l))),o}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return y.lex(e,t??this.defaults)}parser(e,t){return $.parse(e,t??this.defaults)}}z=new WeakSet,de=function(e,t,s){switch(t){case"heading":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(s.parser.parseInline(n.tokens),n.depth,Te(s.parser.parseInline(n.tokens,s.parser.textRenderer)))};case"code":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.text,n.lang,!!n.escaped)};case"table":return function(n){if(!n.type||n.type!==t)return e.apply(this,arguments);let i="",r="";for(let o=0;o<n.header.length;o++)r+=this.tablecell({text:n.header[o].text,tokens:n.header[o].tokens,header:!0,align:n.align[o]});i+=this.tablerow({text:r});let l="";for(let o=0;o<n.rows.length;o++){const h=n.rows[o];r="";for(let a=0;a<h.length;a++)r+=this.tablecell({text:h[a].text,tokens:h[a].tokens,header:!1,align:n.align[a]});l+=this.tablerow({text:r})}return e(i,l)};case"blockquote":return function(n){if(!n.type||n.type!==t)return e.apply(this,arguments);const i=this.parser.parse(n.tokens);return e(i)};case"list":return function(n){if(!n.type||n.type!==t)return e.apply(this,arguments);const i=n.ordered,r=n.start,l=n.loose;let o="";for(let h=0;h<n.items.length;h++){const a=n.items[h],u=a.checked,f=a.task;let p="";if(a.task){const x=this.checkbox({checked:!!u});l?a.tokens.length>0&&a.tokens[0].type==="paragraph"?(a.tokens[0].text=x+" "+a.tokens[0].text,a.tokens[0].tokens&&a.tokens[0].tokens.length>0&&a.tokens[0].tokens[0].type==="text"&&(a.tokens[0].tokens[0].text=x+" "+a.tokens[0].tokens[0].text)):a.tokens.unshift({type:"text",text:x+" "}):p+=x+" "}p+=this.parser.parse(a.tokens,l),o+=this.listitem({type:"list_item",raw:p,text:p,task:f,checked:!!u,loose:l,tokens:a.tokens})}return e(o,i,r)};case"html":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.text,n.block)};case"paragraph":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(this.parser.parseInline(n.tokens))};case"escape":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.text)};case"link":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.href,n.title,this.parser.parseInline(n.tokens))};case"image":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.href,n.title,n.text)};case"strong":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(this.parser.parseInline(n.tokens))};case"em":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(this.parser.parseInline(n.tokens))};case"codespan":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.text)};case"del":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(this.parser.parseInline(n.tokens))};case"text":return function(n){return!n.type||n.type!==t?e.apply(this,arguments):e(n.text)}}return e},D=function(e,t){return(s,n)=>{const i={...n},r={...this.defaults,...i};this.defaults.async===!0&&i.async===!1&&(r.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),r.async=!0);const l=_(this,z,ke).call(this,!!r.silent,!!r.async);if(typeof s>"u"||s===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));if(r.hooks&&(r.hooks.options=r),r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(s):s).then(o=>e(o,r)).then(o=>r.hooks?r.hooks.processAllTokens(o):o).then(o=>r.walkTokens?Promise.all(this.walkTokens(o,r.walkTokens)).then(()=>o):o).then(o=>t(o,r)).then(o=>r.hooks?r.hooks.postprocess(o):o).catch(l);try{r.hooks&&(s=r.hooks.preprocess(s));let o=e(s,r);r.hooks&&(o=r.hooks.processAllTokens(o)),r.walkTokens&&this.walkTokens(o,r.walkTokens);let h=t(o,r);return r.hooks&&(h=r.hooks.postprocess(h)),h}catch(o){return l(o)}}},ke=function(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const n="<p>An error occurred:</p><pre>"+b(s.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(s);throw s}};const T=new et;function g(c,e){return T.parse(c,e)}g.options=g.setOptions=function(c){return T.setOptions(c),g.defaults=T.defaults,re(g.defaults),g};g.getDefaults=O;g.defaults=R;g.use=function(...c){return T.use(...c),g.defaults=T.defaults,re(g.defaults),g};g.walkTokens=function(c,e){return T.walkTokens(c,e)};g.parseInline=T.parseInline;g.Parser=$;g.parser=$.parse;g.Renderer=v;g.TextRenderer=G;g.Lexer=y;g.lexer=y.lex;g.Tokenizer=B;g.Hooks=E;g.parse=g;g.options;g.setOptions;g.use;g.walkTokens;g.parseInline;$.parse;y.lex;export{g as m};
