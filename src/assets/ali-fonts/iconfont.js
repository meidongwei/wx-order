(function(window){var svgSprite='<svg><symbol id="icon-caigou" viewBox="0 0 1024 1024"><path d="M768 576c13.6 0 24.8-8.8 29.6-22.4l97.6-318.4c6.4-20.8-8-43.2-29.6-43.2H252.8l-18.4-64L216 64H64v64h104.8l18.4 64 100 361.6c1.6 4.8 4 8.8 7.2 12l-52 83.2c-6.4 5.6-10.4 14.4-10.4 23.2 0 17.6 14.4 32 32 32h568v-64H323.2l40-64H768z"  ></path><path d="M320 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M768 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path></symbol><symbol id="icon-jia-yuankuang" viewBox="0 0 1024 1024"><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m256 483.2H544.8V768h-65.6V547.2H256v-65.6h223.2V256h65.6v225.6H768v65.6z"  ></path></symbol><symbol id="icon-jian-xianxingyuankuang" viewBox="0 0 1024 1024"><path d="M512 128c212 0 384 172 384 384s-172 384-384 384-384-172-384-384 172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m256 416H256v64h512v-64z"  ></path></symbol><symbol id="icon-shangyiyehoutuifanhui-yuankuang" viewBox="0 0 1024 1024"><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m158.4 674.4L625.6 784l-272-272 272-272 45.6 45.6L444 512l226.4 226.4z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)