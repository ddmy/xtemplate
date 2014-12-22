var XTemplateRuntime=function(){var n;return n=function(n){var t,r,e,i,a;return t=function(n){function t(){var n="";for(var t in e)n+=t+"|";return n=n.slice(0,-1),a=new RegExp(n,"g")}var r,e={"&":"&amp;",">":"&gt;","<":"&lt;","`":"&#x60;","/":"&#x2F;",'"':"&quot;","'":"&#x27;"},i=/[&<>"'`]/,a=t(),o=/\\?\{([^{}]+)\}/g,f="undefined"!=typeof global?global:window,u=Object.prototype.toString;return n=r={isArray:Array.isArray||function(n){return"[object Array]"===u.call(n)},keys:Object.keys||function(n){var t,r=[];for(t in n)n.hasOwnProperty(t)&&r.push(t);return r},each:function(n,t,e){if(n){var i,a,o,f=0,u=n&&n.length,s=void 0===u||"[object Function]"===Object.prototype.toString.call(n);if(e=e||null,s)for(o=r.keys(n);f<o.length&&(i=o[f],t.call(e,n[i],i,n)!==!1);f++);else for(a=n[0];u>f&&t.call(e,a,f,n)!==!1;a=n[++f]);}return n},mix:function(n,t){for(var r in t)n[r]=t[r];return n},globalEval:function(n){f.execScript?f.execScript(n):!function(n){f.eval.call(f,n)}(n)},substitute:function(n,t,r){return"string"==typeof n&&t?n.replace(r||o,function(n,r){return"\\"===n.charAt(0)?n.slice(1):void 0===t[r]?"":t[r]}):n},escapeHtml:function(n){return n=""+n,i.test(n)?(n+"").replace(a,function(n){return e[n]}):n},merge:function(){for(var n=0,t=arguments.length,e={};t>n;n++){var i=arguments[n];i&&r.mix(e,i)}return e}}}(),r=function(n){function t(n,t,r){this.data=void 0!==n?n:{},r?(this.parent=r,this.root=r.root):(this.parent=void 0,this.root=this),this.affix=t||{},this.ready=!1}return t.prototype={isScope:1,constructor:t,setParent:function(n){this.parent=n,this.root=n.root},set:function(n,t){this.affix[n]=t},setData:function(n){this.data=n},getData:function(){return this.data},mix:function(n){var t=this.affix;for(var r in n)t[r]=n[r]},get:function(n){var t,r=this.data,e=this.affix;return null!=r&&(t=r[n]),void 0!==t?t:e[n]},resolveInternalOuter:function(n){var t,r=n[0],e=this,i=e;if("this"===r)t=e.data;else if("root"===r)i=i.root,t=i.data;else{if(!r)return[i.data];do t=i.get(r);while(void 0===t&&(i=i.parent))}return[void 0,t]},resolveInternal:function(n){var t=this.resolveInternalOuter(n);if(1===t.length)return t[0];var r,e=n.length,i=t[1];if(void 0===i)return void 0;for(r=1;e>r;r++)i=i[n[r]];return i},resolveLooseInternal:function(n){var t=this.resolveInternalOuter(n);if(1===t.length)return t[0];var r,e=n.length,i=t[1];for(r=1;null!=i&&e>r;r++)i=i[n[r]];return i},resolveUp:function(n){return this.parent&&this.parent.resolveInternal(n)},resolveLooseUp:function(n){return this.parent&&this.parent.resolveLooseInternal(n)},resolveOuter:function(n,t){var r,e=this,i=e;if(!t&&1===n.length){if(r=e.get(n[0]),void 0!==r)return[r];t=1}if(t)for(;i&&t--;)i=i.parent;return i?[void 0,i]:[void 0]},resolveLoose:function(n,t){var r=this.resolveOuter(n,t);return 1===r.length?r[0]:r[1].resolveLooseInternal(n)},resolve:function(n,t){var r=this.resolveOuter(n,t);return 1===r.length?r[0]:r[1].resolveInternal(n)}},n=t}(),e=function(n){function r(n,t,r){this.list=n,this.init(),this.next=t,this.ready=!1,this.tpl=r}function e(n,t){var e=this;e.config=t,e.head=new r(e,void 0),e.callback=n,this.init()}var i=t;return r.prototype={constructor:r,isBuffer:1,init:function(){this.data=""},append:function(n){return this.data+=n,this},write:function(n){if(null!=n){if(n.isBuffer)return n;this.data+=n}return this},writeEscaped:function(n){if(null!=n){if(n.isBuffer)return n;this.data+=i.escapeHtml(n)}return this},insert:function(){var n=this,t=n.list,e=n.tpl,i=new r(t,n.next,e),a=new r(t,i,e);return n.next=a,n.ready=!0,a},async:function(n){var t=this.insert(),r=t.next;return n(t),r},error:function(n){var t=this.list.callback;if(t){var r=this.tpl;if(r){n instanceof Error||(n=new Error(n));var e=r.name,i=r.pos.line,a="XTemplate error in file: "+e+" at line "+i+": ";n.stack=a+n.stack,n.message=a+n.message,n.xtpl={pos:{line:i},name:e}}this.list.callback=null,t(n,void 0)}},end:function(){var n=this;return n.list.callback&&(n.ready=!0,n.list.flush()),n}},e.prototype={constructor:e,init:function(){this.data=""},append:function(n){this.data+=n},end:function(){this.callback(null,this.data),this.callback=null},flush:function(){for(var n=this,t=n.head;t;){if(!t.ready)return n.head=t,void 0;this.data+=t.data,t=t.next}n.end()}},e.Buffer=r,n=e}(),i=function(n){var e=r,i=t,a={range:function(n,t){var r=t.params,e=r[0],i=r[1],a=r[2];a?(e>i&&a>0||i>e&&0>a)&&(a=-a):a=e>i?-1:1;for(var o=[],f=e;i>e?i>f:f>i;f+=a)o.push(f);return o},foreach:function(n,t,r){var i,a,o,f,u=t.params,s=u[0],l=u[2]||"xindex",c=u[1];if(s)for(i=s.length,f=0;i>f;f++)a=new e(s[f],{xcount:i,xindex:f},n),o=a.affix,"xindex"!==l&&(o[l]=f,o.xindex=void 0),c&&(o[c]=s[f]),r=t.fn(a,r);return r},forin:function(n,t,r){var i,a,o,f=t.params,u=f[0],s=f[2]||"xindex",l=f[1];if(u)for(o in u)i=new e(u[o],{xindex:o},n),a=i.affix,"xindex"!==s&&(a[s]=o,a.xindex=void 0),l&&(a[l]=u[o]),r=t.fn(i,r);return r},each:function(n,t,r){var e=t.params,o=e[0];return o?i.isArray(o)?a.foreach(n,t,r):a.forin(n,t,r):r},"with":function(n,t,r){var i=t.params,a=i[0];if(a){var o=new e(a,void 0,n);r=t.fn(o,r)}return r},"if":function(n,t,r){var e=t.params,i=e[0];if(i){var a=t.fn;a&&(r=a(n,r))}else{var o=!1,f=t.elseIfs,u=t.inverse;if(f)for(var s=0,l=f.length;l>s;s++){var c=f[s];if(o=c.test(n)){r=c.fn(n,r);break}}!o&&u&&(r=u(n,r))}return r},set:function(n,t,r){return n.mix(t.hash),r},include:1,parse:1,extend:1,block:function(n,t,r){var e,i=this,a=i.runtime,o=t.params,f=o[0];2===o.length&&(e=o[0],f=o[1]);var u,s=a.blocks=a.blocks||{},l=s[f],c={fn:t.fn,type:e};if(l){if(l.type)if("append"===l.type)c.next=l,s[f]=c;else if("prepend"===l.type){var d;for(u=l;u&&"prepend"===u.type;)d=u,u=u.next;c.next=u,d.next=c}}else s[f]=c;if(!a.extendTpl)for(u=s[f];u;)u.fn&&(r=u.fn.call(i,n,r)),u=u.next;return r},macro:function(n,t,r){var i=t.hash,a=t.params,o=a[0],f=a.slice(1),u=this,s=u.runtime,l=s.macros=s.macros||{},c=l[o];if(t.fn)l[o]={paramNames:f,hash:i,fn:t.fn};else if(c){var d,v=c.hash||{};if(d=c.paramNames)for(var h=0,p=d.length;p>h;h++){var m=d[h];v[m]=f[h]}if(i)for(var g in i)v[g]=i[g];var x=new e(v);x.root=n.root,r=c.fn.call(u,x,r)}else{var y="can not find macro: "+o;r.error(y)}return r}};return a["debugger"]=function(){},n=a}(),a=function(n){function a(n,t,r,e,i,a,o,f){this.name=n,this.originalName=a||n,this.runtime=t,this.root=r,this.pos={line:1},this.scope=e,this.buffer=i,this.fn=o,this.parent=f}function o(n,t,r){var e=r[0],i=n&&n[e]||t&&t[e]||g[e];if(1===r.length)return i;if(i)for(var a=r.length,o=1;a>o;o++)if(i=i[r[o]],!i)return!1;return i}function f(n,t){var r=n.split("/"),e=t.split("/");r.pop();for(var i=0,a=e.length;a>i;i++){var o=e[i];"."===o||(".."===o?r.pop():r.push(o))}return r.join("/")}function u(n,t,r,e,i,a){var f,u,s;return a||(s=o(n.runtime.commands,n.root.config.commands,i)),s?s.call(n,t,r,e):s!==!1&&(f=t.resolve(i.slice(0,-1),a),u=f[i[i.length-1]])?u.apply(f,r.params):(e.error("Command Not Found: "+i.join(".")),e)}function s(n,t){var r=this;r.fn=n,r.config=p.merge(s.globalConfig,t),this.subNameResolveCache={}}function l(n,t,r){if("."!==t.charAt(0))return t;var e=r+"_ks_"+t,i=n.subNameResolveCache,a=i[e];return a?a:t=i[e]=f(r,t)}function c(n,t,r,e,i,a){var o=l(n,a,i.name),f=e.insert(),u=f.next;return v(n,o,i.runtime,t,f,a,r,e.tpl),u}function d(n,t,r,e,i){var o=r.insert(),f=o.next,u=new a(i.TPL_NAME,e.runtime,n,t,o,void 0,i,r.tpl);return o.tpl=u,h(u),f}function v(n,t,r,e,i,o,f,u){var s=new a(t,r,n,e,i,o,void 0,u);i.tpl=s,n.config.loader.load(s,function(n,t){"function"==typeof t?(s.fn=t,h(s)):n?i.error(n):(t=t||"",f?i.writeEscaped(t):i.data+=t,i.end())})}function h(n){var t=n.fn();if(t){var r,e=n.runtime,i=e.extendTpl;if(i&&(r=i.params[0],!r))return t.error("extend command required a non-empty parameter");var a=e.extendTplFn,o=e.extendTplBuffer;return a?(e.extendTpl=null,e.extendTplBuffer=null,e.extendTplFn=null,d(n.root,n.scope,o,n,a).end()):r&&(e.extendTpl=null,e.extendTplBuffer=null,c(n.root,n.scope,0,o,n,r).end()),t.end()}}var p=t,m=i,g={},x=r,y=e,b={callFn:u,callDataFn:function(n,t){for(var r=t[0],e=r,i=1;i<t.length;i++){var a=t[i];if(!e||null==e[a])return"";r=e,e=e[a]}return e.apply(r,n)},callCommand:function(n,t,r,e,i){return u(n,t,r,e,i)}};return p.mix(s,{config:function(n,t){var r=this.globalConfig=this.globalConfig||{};return arguments.length?(void 0!==t?r[n]=t:p.mix(r,n),void 0):r},version:"4.0.2",nativeCommands:m,utils:b,util:p,addCommand:function(n,t){g[n]=t},removeCommand:function(n){delete g[n]}}),s.prototype={constructor:s,Scope:x,nativeCommands:m,utils:b,removeCommand:function(n){var t=this.config;t.commands&&delete t.commands[n]},addCommand:function(n,t){var r=this.config;r.commands=r.commands||{},r.commands[n]=t},include:function(n,t,r,e){var i,a=t.params;i=n;var o=t.hash,f=t&&t.escape;return o&&(i=new x(o,void 0,n)),a[0]?r=c(this,i,f,r,e,a[0]):r.error("include command required a non-empty parameter")},includeModule:function(n,t,r,e){var i=t.params,a=n,o=t.hash;return o&&(a=new x(o,void 0,n)),i[0]?r=d(this,a,r,e,i[0]):r.error("include command required a non-empty parameter")},render:function(n,t,r){var e="",i=this,o=i.fn,f=i.config;"function"==typeof t&&(r=t,t=null),t=t||{},r=r||function(n,t){if(n)throw n instanceof Error||(n=new Error(n)),n;e=t};var u=i.config.name;!u&&o&&o.TPL_NAME&&(u=o.TPL_NAME);var l;l=n instanceof x?n:new x(n);var c=new s.LinkedBuffer(r,f).head,d=new a(u,{commands:t.commands},i,l,c,u,o);return c.tpl=d,o?(h(d),e):(f.loader.load(d,function(n,t){t?(d.fn=i.fn=t,h(d)):n&&c.error(n)}),e)}},s.Scope=x,s.LinkedBuffer=y,n=s}(),n=a}()}();