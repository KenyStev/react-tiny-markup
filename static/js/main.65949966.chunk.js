(this["webpackJsonpreact-tiny-markup-example"]=this["webpackJsonpreact-tiny-markup-example"]||[]).push([[0],[,,,,,function(e,a,t){e.exports=t(12)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(4),c=t.n(l),s=(t(10),t(2)),u=t(1);t(11);var i=function(){var e=r.a.useState("Default settings allow basic tags like\n<b>bold</b>, <i>italic</i>, line <br /> break are supported.\n<ul>\n  <li>as well as lists</li>\n  <li>superscript: E = mc<sup>2</sup></li>\n  <li>subscript: H<sub>2</sub>O</li>\n</ul>\n"),a=Object(s.a)(e,2),t=a[0],n=a[1],l=r.a.useState("<p>Rendering behavior can be completely changed</p>\n<h1>E.g. by swapping tags</h1>\n<br />\n<a>not rendering them at all</a>\n<br />\nor define <sacrebleu>custom ones</sacrebleu>\n"),c=Object(s.a)(l,2),i=c[0],o=c[1];return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"react-tiny-markup"),r.a.createElement("p",null,r.a.createElement("pre",null,r.a.createElement("code",null,"npm install react-tiny-markup")),r.a.createElement("pre",null,r.a.createElement("code",null,"yarn add react-tiny-markup"))),r.a.createElement("div",{className:"grid"},r.a.createElement("textarea",{className:"textarea",onChange:function(e){return n(e.target.value)},rows:10,value:t}),r.a.createElement("div",{className:"arrow"},"\u2192"),r.a.createElement("output",{className:"output"},r.a.createElement(u.a,null,t)),r.a.createElement("textarea",{className:"textarea",onChange:function(e){return o(e.target.value)},rows:10,value:i}),r.a.createElement("div",{className:"arrow"},"\u2192"),r.a.createElement("output",{className:"output"},r.a.createElement(u.a,{renderer:function(e){switch(e.tag){case"h1":return r.a.createElement("small",{key:e.key},e.children);case"a":return null;case"sacrebleu":return r.a.createElement("div",{className:"pulse"},e.children);default:return Object(u.b)(e)}}},i))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.65949966.chunk.js.map