function UnicodeToAnsi(a){var b=a.toString(16);b="000"+b.toUpperCase(),b=b.substr(b.length-4);var c=UnicodeChr().indexOf(b);return c!=-1&&(b=AnsicodeChr().substr(c,4)),parseInt(b,16)}
function AnsiToUnicode(a){var b=a.toString(16);b="000"+b.toUpperCase(),b=b.substr(b.length-4);var c=AnsicodeChr().indexOf(b);return c!=-1&&(b=UnicodeChr().substr(c,4)),parseInt(b,16)}
function strUnicode2Ansi(a){var b=a.length,c="";for(var d=0;d<b;d++){var e=a.charCodeAt(d);e<0&&(e+=65536),e>127&&(e=UnicodeToAnsi(e));if(e>255){var f=e&65280;f>>=8;var g=e&255;c+=String.fromCharCode(f)+String.fromCharCode(g)}else c+=String.fromCharCode(e)}
return c}
function strAnsi2Unicode(a){var b=a.length,c="",d;for(var e=0;e<b;e++){var f=a.charCodeAt(e);f>127?d=AnsiToUnicode((f<<8)+a.charCodeAt(++e)):d=f,c+=String.fromCharCode(d)}
return c}
function encode64(a){var b="",c,d,e="",f,g,h,i="",j=0;do c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=c>>2,g=(c&3)<<4|d>>4,h=(d&15)<<2|e>>6,i=e&63,isNaN(d)?h=i=64:isNaN(e)&&(i=64),b=b+keyStr.charAt(f)+keyStr.charAt(g)+keyStr.charAt(h)+keyStr.charAt(i),c=d=e="",f=g=h=i="";while(j<a.length);return b}
function decode64(a){var b="",c,d,e="",f,g,h,i="",j=0;if(a.length%4!=0)return"";var k=/[^A-Za-z0-9\+\/\=]/g;if(k.exec(a))return"";do f=keyStr.indexOf(a.charAt(j++)),g=keyStr.indexOf(a.charAt(j++)),h=keyStr.indexOf(a.charAt(j++)),i=keyStr.indexOf(a.charAt(j++)),c=f<<2|g>>4,d=(g&15)<<4|h>>2,e=(h&3)<<6|i,b+=String.fromCharCode(c),h!=64&&(b+=String.fromCharCode(d)),i!=64&&(b+=String.fromCharCode(e)),c=d=e="",f=g=h=i="";while(j<a.length);return b}
function ThunderEncode(a){if(a.indexOf("thunder://")==0){return a;}else{ var b="AA",c="ZZ",d="thunder://",e=a,f=d+encode64(strUnicode2Ansi(b+e+c));return f}}
var Thunder5SetUpInfo=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002"),BatchTasker={isIE:navigator.userAgent.indexOf("MSIE")>0,agentType:3,Agent:null,pid:null,SetThunder:function(a){this.agentType=a,this.convertType(),this.initialize()},BeginBatch:function(a,b){this.pid=b;if(a==3||a==4)this.agentType=a,this.SetThunder(a);this.convertType(),(this.Agent==undefined||this.Agent==null)&&this.initialize();if(this.isIE){if(this.Agent==undefined||this.Agent==null)return alert(Thunder5SetUpInfo),top.location.href=wtd_ChangFolder(b?b:0),!1;this.Agent.clearTasks(),this.agentType==3?this.Agent.setWebThunder():this.Agent.setThunder5()}else{if(this.Agent==undefined||this.Agent==null)return navigator.mimeTypes["application/np_xunlei_plugin"]?!0:(alert(Thunder5SetUpInfo),top.location.href=wtd_ChangFolder(b?b:0),!1);
// 移除了高风险的特权请求
this.Agent.BeginBatch(this.agentType)}},convertType:function(){if(this.isIE){if(!this.agentType||this.agentType!=3&&this.agentType!=4)this.agentType=3}else if(!this.agentType||this.agentType!=3&&this.agentType!=4&&this.agentType!=1&&this.agentType!=2)this.agentType=3;this.isIE||this.agentType!=1&&this.agentType!=2&&(this.agentType==3?this.agentType=2:this.agentType==4?this.agentType=1:this.agentType=2)},AddTask:function(a,b){b=decodeURIComponent(b),b=b?b:a,(this.Agent==undefined||this.Agent==null)&&this.initialize(),this.isIE?this.Agent.AddBatchTask(a,b):this.Agent==undefined||this.Agent==null?navigator.mimeTypes["application/np_xunlei_plugin.2"]?DownloadByThunder2(a,b,"","","","","",this.pid):navigator.mimeTypes["application/np_xunlei_plugin"]&&DownloadByThunder(a,this.pid):
// 移除了高风险的特权请求
(this.Agent.AddBatchTask(this.agentType,a,document.location.href,document.location.href,"",b,"",""))},EndBatch:function(a){if(this.isIE)this.Agent.downLoad(a);else{if(this.Agent==undefined||this.Agent==null)return!1;
// 移除了高风险的特权请求
try{this.Agent.EndBatch(this.agentType)}catch(b){alert(b)}}},initialize:function(){this.Agent=null;if(this.isIE){var a=this.agentType==3?!0:!1;this.Agent=thunderBatchTasker.getInstance(a)}else{this.convertType();try{
// 移除了高风险的特权请求
var b=Components.classes["@xunlei.com/ThunderLoader;1"].createInstance();this.Agent=b.QueryInterface(Components.interfaces.IThunderDownload)}catch(c){this.Agent=null;return}}}},thunderBatchTasker={tasks:new Array,clearTasks:function(){thunderBatchTasker.tasks.length=0},setWebThunder:function(){thunderBatchTasker.getInstance(!0)},setThunder5:function(){thunderBatchTasker.getInstance(!1)},AddBatchTask:function(){var a=arguments[0],b=arguments[1];if(!a)return;b=b?b:a,thunderBatchTasker.tasks[thunderBatchTasker.tasks.length]=new Array(a,b)},downLoad:function(){var a=arguments[0];this.thunderObj||thunderBatchTasker.getInstance();if(!this.thunderObj)return alert(Thunder5SetUpInfo),top.location.href=wtd_ChangFolder(a?a:0),!1;if(this.isWebThunder){var b=this.thunderObj.BeginBatchTask();for(var c=0;c<thunderBatchTasker.tasks.length;c++)if(thunderBatchTasker.tasks[c][0].replace(/\s/gi,"")!="")try{this.thunderObj.AddTaskToBatch(b,thunderBatchTasker.tasks[c][0],thunderBatchTasker.tasks[c][1],location.href.replace(/#/g,""))}catch(d){alert(d)}
this.thunderObj.EndBatchTask(b),b=null}else{for(var c=0;c<thunderBatchTasker.tasks.length;c++)this.thunderObj.AddTask4(thunderBatchTasker.tasks[c][0],"","",thunderBatchTasker.tasks[c][1],document.location.href.replace(/#/g,""),-1,0,-1,document.cookie,"","");this.thunderObj.CommitTasks2(1)}},getInstance:function(){var a=arguments[0]?arguments[0]:!1;return a?this.thunderObj=thunderBatchTasker.getWebThunder():this.thunderObj=thunderBatchTasker.getThunder5(),this},getThunder5:function(){try{return this.isWebThunder=!1,new ActiveXObject("ThunderAgent.Agent.1")}catch(a){try{return this.isWebThunder=!0,new ActiveXObject("ThunderServer.webThunder.1")}catch(a){return this.isWebThunder=!1,!1}}},getWebThunder:function(){try{return this.isWebThunder=!0,new ActiveXObject("ThunderServer.webThunder.1")}catch(a){this.isWebThunder=!1;try{return new ActiveXObject("ThunderAgent.Agent.1")}catch(a){return!1}}}},keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";(function(){})(),function(){function a(){try{image1=new Image(1,1),image1.src=vhref}catch(a){}}function l(){return l.seed=(l.seed*9301+49297)%233280,l.seed/233280}function m(a){return Math.ceil(l()*a)}function n(a,b,c){window.document.cookie=a+"="+escape(b)+(c==null?"":"; expires="+c.toGMTString())}function o(a){var b=a+"=";if(window.document.cookie.length>0){offset=window.document.cookie.indexOf(b);if(offset!=-1)return offset+=b.length,end=window.document.cookie.indexOf(";",offset),end==-1&&(end=window.document.cookie.length),unescape(window.document.cookie.substring(offset,end))}return null}function p(a){var b=new Date,c=new Date;c.setTime(b.getTime()+864e5),n("SexMovie",a,c)}function q(a){return a=a.replace(/&lt/g,"<"),a=a.replace(/&gt/g,">"),a=a.replace(/&amp/g,"&"),a=a.replace(/&quot/g,'"'),a=a.replace(/&apos/g,"'"),a=a.replace(/<br>/g,"\n"),a}function r(a){var b=a/1e4;return b!=null&&b>0?(b=Math.floor(b)+1,d=="coWebThunder"&&e==1?"http://hezuo.down.xunlei.com/webxunlei_hezuo_"+b+"/webxl_"+a+".exe":"http://hezuo.down.xunlei.com/xunlei_hezuo_"+b+"/thunder("+a+").exe"):d=="coWebThunder"&&e==1?"http://hezuo.down.xunlei.com/webxunlei_hezuo_1/webxl_00000.exe":"http://hezuo.down.xunlei.com/xunlei_hezuo_1/thunder(00000).exe"}function s(a,b,c,d,e,f,g,h){return A.companySetup(h,d),t(a,b,c,d,e,f,g),!1}function t(a,c,e,f,g,h,i){if(m(1)==1&&c!="tcfc"){var l=jQuery("<a></a>").attr({thunderHref:a,thunderResTitle:c,thunderPid:f,thunderType:h,CompanyName:""}),n=jQuery("body");if(n.length==0||n.length==1&&!n[0])document.write("<html><head><meta http-equiv='Content-Type' content='text/html;charset=utf-8'></head><body style='font:normal 12px/1.6em Arial, simsun,Tahoma, Verdana, Lucida, Helvetica, sans-serif;'></body></html>"),n=jQuery("body");n.append(l),l.hide(),C(a,f,"1",l[0],g)}else{f=f?f:"",h=="07"&&(f="g"+f),c="",b=!0,A.infoType=10,A.pId=f?f:"";try{d=="coWebThunder"?i=3:d=="coThunder5"?i=4:i=5}catch(o){i&&!isNaN(i)&&(i=Number(i))}if(i==3||i==4)A.thunderType=i;typeof g!="boolean"&&(isNaN(g)?g=undefined:g=Number(g),g!=2&&g!=10&&(g=undefined)),g!=1&&g!=10||g==undefined?(g==0||g==2)&&g!=undefined&&(A.isOpenNew=!1):A.isOpenNew=!0;if(!k)var p=B(a);if(p!=1)return A.download(a,e,c,c);j.OpenDownloadDlg(a,"http://www.155.com/?id=xb2",document.cookie)}}function u(a,b,e,f){c=1;var f=f,g="";I()=="SB360"&&(g=a.getAttribute("flashHref")),g==""&&(g=a.getAttribute("thunderHref"));var h="",i=location.href,l=a.getAttribute("thunderPid"),n=a.getAttribute("thunderType"),o=a.getAttribute("CompanyName");if(f==5||m(1)!=1){o&&A.companySetup(o,l),l=l?l:"",n=="07"&&(l="g"+l);var p,q;try{d=="coWebThunder"?p=3:d=="coThunder5"?p=4:p=5}catch(r){if(b)switch(b){case 3:case 4:case 5:p=b}if(!p&&!isNaN(e)&&e){e=Number(e);if(e==3||e==4||e==5)p=e}}var s,t,u;s=A.thunderType,u=A.mustUseSelected,p&&(A.thunderType=p),t=A.isOpenNew,A.isOpenNew=b==2?!1:b==1?!0:A.isOpenNew,A.pId=l?l:"";if(!k)var v=B(g);return v==1?j.OpenDownloadDlg(g,"http://www.155.com/?id=xb2",document.cookie):(A.download(g,i,h,h),A.thunderType=s,A.isOpenNew=t,A.mustUseSelected=u),!1}return C(g,l,"1",a,b),!1}function v(a){I()=="SB360"?(a.href=a.getAttribute("flashHref"),a.href==""&&(a.href=a.getAttribute("thunderHref"))):a.href=a.getAttribute("thunderHref")}function w(a){a.href="JavaScript:;"}function B(a){if(!k){if(b==1)document.write('<object id="pluginobj" type="application/x-thunder-XBrowserAgent"><font color=#ffffff size=0>1</font></object>');else{var c=document.createElement("object");c.setAttribute("id","pluginobj"),c.setAttribute("type","application/x-thunder-XBrowserAgent"),c.setAttribute("name","Plugin FAILED to load"),document.body.appendChild(c)}j=document.getElementById("pluginobj");for(i=0;i<navigator.plugins.length;i++)if(navigator.plugins[i].filename=="npXBrowserAgent.dll")var d=!0}return d}function C(a,b,c,d,e){var f=document.charset;navigator.userAgent.indexOf("Firefox")>=0&&(f=document.characterSet);if(f==null||f=="")f="gb2312";var g="",h="",i=encodeURIComponent(document.title);if(i==""||i==null)i=unescape("%u8FC5%u96F7");var j=document.title,k=b,l="",m="0",n="",o="",p="",q="",r="",s="",u="",v="",w="",x="",y="",z="",g="",h="",A="",B="",C="",D="",E="",H="",K="",L="",N="",O="",P="",Q="",R="",S="",T="",U="";F();var V=document.createElement("div");V.setAttribute("id","fdiv");var W=a;if(W){var X=!1,Y=jQuery.ajax({url:"http://pingce.vip.xunlei.com/interface/check_resource5",data:{url:encodeURIComponent(W),title:i},dataType:"jsonp",timeout:5e3,success:function(a){if(X==-1)return;X=!0,a.result==0?Z(a):t(W,"tcfc",location.href,k,!1,"")},error:function(a){t(W,"tcfc",location.href,k,!1,"")}});setTimeout(function(){if(X)return;X=-1;try{Y.abort()}catch(a){}var b='',c={html:b,data:{filename:""},ismagnet:!1};Z(c)},800);function Z(a){function n(a,b){a.css("cursor","move").unbind("mousedown").bind("mousedown",function(a){function f(a){return a==null&&(a=window.event),e.style.left=a.clientX-c+"px",e.style.top=a.clientY-d+"px",!1}var c,d,e=document.getElementById(b);a||(a=window.event),c=a.clientX-parseInt(e.style.left),d=a.clientY-parseInt(e.style.top),jQuery(document).unbind("mousemove",f),jQuery(document).mousemove(f).mouseup(function(){jQuery(document).unbind("mousemove",f)})})}var b=!0;V.innerHTML=a.html,V.className="xl_popup xl_yun_2_pop xl_yun_23_pop",V.style.overflow="hidden",V.style.zIndex="1000000",jQuery("#union_download_thunder").unbind("click").click(function(){G("union_download_thunder",a.data.filename);var b=I();return b=="Firefox"||b=="Chrome"||b=="SB360"?J(W,k):b=="unknown"?alert(unescape("抱歉，您的浏览器不支持迅雷专用链下载，请更换别的浏览器 8如IE 9再试。")):t(W,"tcfc",location.href,k,!1,""),jQuery(V).hide(),!1}),jQuery("#union_download_close").unbind("click").click(function(){return G("union_closediv",""),jQuery(V).hide(),!1}),jQuery("#union_download_lx").unbind("click").click(function(){G("union_download_lx",a.data.filename);var b=encodeURIComponent(W);a.ismagnet&&(b=a.ismagnet),window.open(" http://lixian.vip.xunlei.com/lixian_login.html?referfrom=UN_013&ucid="+k+"&furl="+b+"&s="+a.data.filename+"&f="+a.data.format)}),jQuery("#union_download_openvip").unbind("click").click(function(){G("union_openvip",a.data.filename),window.open("http://pay.vip.xunlei.com/?referfrom=UN_013&ucid="+k)}),G("union_layout_show",a.data.filename);var c=jQuery("#fdiv");if(c.length==0)return;var d="",e=462,f=502,g=455,h="";if(a.data.filename){var i=a.data.filename.split(".");d="*"+i.pop()+"*"}d||(d="*"+M(W)+"*"),d&&b&&["","rmvb","rm","wmv","mp4","avi","mkv","ts","asf","mpg","mov","3gp","flv","mpeg","m4v","vob",""].join("*").indexOf(d.toLocaleLowerCase())!=-1&&(e=695,f=502,g=689,h="movie"),h=="movie"?(c.find("#play_td2,#play_td1").show(),G("union_can_cloudplay",""),jQuery("#union_play_cloud").unbind("click").click(function(){var a=encodeURIComponent(W);G("union_cloudplay",""),window.open("http://vod.lixian.xunlei.com/share.html?from=un_"+k+"&url="+a)})):c.addClass("two_r_pop");var j=document.documentElement;document.compatMode=="BackCompat"&&(j=document.body);var l=j.clientWidth/2-200+document.documentElement.scrollLeft+document.body.scrollLeft,m=j.clientHeight/2-166.5+document.documentElement.scrollTop+document.body.scrollTop;c.css({left:l,top:m,position:"absolute",zIndex:1e7}),n(jQuery("#fdiv .hd"),"fdiv"),c.find("a").css({"text-decoration":"none",cursor:"pointer"}),c.find("table").css("font-size","12px").css("color","#333"),c.find(".hd,.bd").css("overflow","hidden"),c.find("a.btn_r").css({width:"auto","float":"none"}),c.css("margin","0 0 0 0").css("position","absolute"),c.find("p").css("text-align","center"),c.find("h2").css("line-height","35px")}}return navigator.userAgent.indexOf("MSIE")>0?(document.body.appendChild(V),!(navigator.userAgent.indexOf("MSIE 6.0")>0),G("zx","ss")):(document.body.appendChild(V),G("zx","ss")),!1}function E(){D=setTimeout(F,1e3)}function F(){document.getElementById("fdiv")&&(navigator.userAgent.indexOf("MSIE")>0?document.getElementById("fdiv").removeNode(!0):document.getElementById("fdiv").parentNode.removeChild(document.getElementById("fdiv")))}function G(a,b){try{var c="http://pv.xmp.stat.xunlei.com/UPV?gs=uniondown&style="+a+"&movie="+encodeURIComponent(b)+"&t="+new Date,d=new Image;d.src=c}catch(e){}a=="pt"&&E(),a=="gb"&&F()}function H(a,b,c,d,e){var f="";return a.length+b.length<=11&&(f="<a onclick=\"uniondown('"+e+"','"+a+"')\" target=_blank href='"+c+"'>"+a+"</a>&nbsp;&nbsp;<a onclick=\"uniondown('"+e+"','"+b+"')\" target=_blank href='"+d+"'>"+b+"</a><br>"),a.length+b.length>11&&(a.length+b.length>11?a.length>11?f="<a onclick=\"uniondown('"+e+"','"+a+"')\" target=_blank href='"+c+"'>"+a.substring(0,11)+"...</a><br>":a.length==9||a.length==8||a.length==7||a.length==10||a.length==11?f="<a onclick=\"uniondown('"+e+"','"+a+"')\" target=_blank href='"+c+"'>"+a+"</a><br>":f="<a onclick=\"uniondown('"+e+"','"+a+"')\" target=_blank href='"+c+"'>"+a+"</a>&nbsp;&nbsp;<a onclick=\"uniondown('"+e+"','"+b+"')\" target=_blank href='"+d+"'>"+b.substring(0,8-a.length)+"...</a><br>":f="<a onclick=\"uniondown('"+e+"','"+a+"')\" target=_blank href='"+c+"'>"+a+"</a>&nbsp;&nbsp;<a onclick=\"uniondown('"+e+"','"+b+"')\" target=_blank href='"+d+"'>"+b+"</a><br>"),f}function I(){var a=navigator.userAgent.toLowerCase(),b="unknown";return/msie/i.test(a)&&!/opera/.test(a)?b="IE":/firefox/i.test(a)?b="Firefox":/chrome/i.test(a)&&/webkit/i.test(a)&&/mozilla/i.test(a)?/360EE/i.test(a)?b="SB360":b="Chrome":/opera/i.test(a)?b="Opera":/webkit/i.test(a)&&!(/chrome/i.test(a)&&/webkit/i.test(a)&&/mozilla/i.test(a))&&(b="Safari"),b}function J(a,b){var c=navigator.mimeTypes["application/np_xunlei_plugin"];if(c){var d=document.getElementById("np_xunlei_plugin_id");if(d==undefined||d==null)d=document.createElement("embed"),d.id="np_xunlei_plugin_id",d.style.visibility="hidden",d.type="application/np_xunlei_plugin",d.width=0,d.height=0,document.body.appendChild(d);d.DownLoadByThunderPlugin(a)}else alert(z.Thunder5SetUpInfo),top.location.href=r(b)}function K(a,b,c,d,e,f,g,h){if(a!=""){var i=navigator.mimeTypes["application/np_xunlei_plugin.2"];if(i){var j=document.createElement("embed");j.style.visibility="hidden",j.type="application/np_xunlei_plugin.2",j.width=0,j.height=0,document.body.appendChild(j);var k=a.split("#@#$#@#"),l=b.split("#@#$#@#"),m="#@$@#",n=document.location.href;n=n.concat(m),n=n.concat(k.length,m);for(var o=0;o<k.length;o++)n=n.concat(k[o],m),n=n.concat(l[o],m),n=n.concat("kc",m),n=n.concat(document.cookie,m),n=n.concat(f,m),n=n.concat(g,m);j.DownLoadListByThunderPlugin(n)}else alert(z.Thunder5SetUpInfo),top.location.href=r(h)}}function L(a){try{if(a.substr(0,10)!="thunder://")return a;typeof decode64=="undefined"&&typeof base64decode!="undefined"&&decode64==base64decode;var b=decode64(a.substr(10));return b.substr(2,b.length-4)}catch(c){return""}}function M(a){var a=L(a).split(".");return a.pop()}a();var b=!1,c,d="coThunder5",e=!1,f=10,g=0,h=!1,j,k=navigator.userAgent.indexOf("MSIE")>0;isFun=function(a){return typeof a=="function"},isNull=function(a){return typeof a=="object"&&!a},isNumber=function(a){return typeof a=="number"&&isFinite(a)},isObject=function(a){return a&&typeof a=="object"||isFun(a)},isString=function(a){return typeof a=="string"},isArray=function(a){return isObject(a)&&a.constructor==Array},isUndef=function(a){return typeof a=="undefined"},DoNothing=function(){},l.today=new Date,l.seed=l.today.getTime();var x={create:function(){return function(){this.initialize.apply(this,arguments)}},extend:function(a,b){for(property in b)a[property]=b[property];return a}},y={create:function(a,b){var c=function(){var a=arguments.callee.target,b=arguments.callee.func;return b.apply(a,arguments)};return c.target=a,c.func=b,c}},z=[];z.WebThunderSetUpInfo=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002"),z.Thunder5SetUpInfo=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002"),z.AllSetUpInfo=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002"),z.MethodUnSupported=unescape("%u4E0D%u652F%u6301%u6B64%u65B9%u6CD5%uFF0C%u8BF7%u5B89%u88C5%u6700%u65B0%u7684%u8FC5%u96F7%u5BA2%u6237%u7AEF"),z.FFDenied=unescape("%u6B64%u64CD%u4F5C%u88AB%u6D4F%u89C8%u5668%u62D2%u7EDD%uFF01%0A%u8BF7%u5728%u6D4F%u89C8%u5668%u5730%u5740%u680F%u8F93%u5165%u201Cabout%3Aconfig%u201D%u5E76%u56DE%u8F66%0A%u7136%u540E%u5C06%5Bsigned.applets.codebase_principal_support%5D%u8BBE%u7F6E%u4E3A%27true%27"),z.MiniThunderSetUpInfo=unescape("");var A={isIE:navigator.userAgent.indexOf("MSIE")>0,isOpenNew:null,infoType:0,thunderType:0,mustUseSelected:null,pId:"",judgeThunder:function(a){var b=[];return a=a?a:this.pId,b[a]==1?3:!1},getInstance:function(a){if(this.isOpenNew==null)try{this.isOpenNew=f==10?!0:!1}catch(b){}if(this.mustUseSelected==null)try{this.mustUseSelected=e}catch(b){this.mustUseSelected=!1}if(this.judgeThunder())this.thunderType=this.judgeThunder(),this.mustUseSelected=!0;else if(!this.thunderType)try{switch(d){case"coThunder5":this.thunderType=4;break;case"coMiniThunder":this.thunderType=5;break;case"coWebThunder":default:this.thunderType=3}}catch(b){this.thunderType=3,this.mustUseSelected=!1}if(!this.isIE){var j=A.ffThunder.getInstance();if(j){var k=j.getClientType();if(k==0)return null;this.mustUseSelected&&(this.thunderType==4&&k==2||this.thunderType==3&&k==1)&&(j=null)}return j}if(this.thunderType==4)var c=[A.XBrowserThunder,A.Thunder5,A.MiniThunder];else if(this.thunderType==3)var c=[A.XBrowserThunder,A.Thunder5,A.MiniThunder];else var c=[A.XBrowserThunder,A.Thunder5,A.MiniThunder];if(typeof d=="undefined")var c=[A.XBrowserThunder,A.Thunder5,A.MiniThunder];if(e==1)var c=[A.XBrowserThunder,A.Thunder5,A.MiniThunder];for(var h=0;h<c.length;h++){var i=c[h].getInstance();if(g==1){var i=c[0].getInstance();return i}if(i!=null)return i;continue}return null},companySetup:function(a,b){try{b=b?b:this.pId,vhref="http://analytics.xunlei.com/PV?peerid="+b+"&uri="+a+"&src="+document.location.href+"&screensize="+window.screen.width+"*"+window.screen.height,image1=new Image(1,1),image1.src=vhref}catch(c){}},setParameter:function(a,b,c,d){a=a?a:this.pId;var e=["thunder_cid","thunder_down_url","thunder_down_pageurl","thunder_stat_pageurl"],f;for(var g=0;g<e.length;g++)isUndef(f=$(e[g]))&&(f=document.createElement("input"),f.type="hidden",f.id=e[g],document.body.appendChild(f)),f.value=arguments[g]},download:function(a,b,c,d,e){var f;f=this.getInstance(),this.pId=this.pId?this.pId:e?e:"",e=e?e:this.pId;if(!f)(!!this.isIE||f!=0)&&this.showSetUpInfo(e);else if(this.isIE)f.download(e,a,b,c,d);else switch(this.thunderType){case 4:f.download(e,a,b,c,d,1);break;case 3:default:f.download(e,a,b,c,d,2)}return!1},openWindow:function(a,b){var c=b?b:!1;if(!this.isOpenNew){var d;this.mustUseSelected?this.thunderType==3?d=z.WebThunderSetUpInfo:this.thunderType==4?d=z.Thunder5SetUpInfo:d=z.MiniThunderSetUpInfo:d=z.AllSetUpInfo}g==1?top.location.href="http://hezuo.down.xunlei.com/xunlei_hezuo_3/thunder(26597).exe":(d&&alert(d),this.infoType==10&&!c?top.location.href=a:top.location.href=a)},showSetUpInfo:function(a){var b;a=a?a:this.pId,this.isOpenNew?a.substr(0,1)=="g"?b="http://cop.my.xunlei.com/setup/index.html?pid="+a:b="http://cop.my.xunlei.com/setup/index.html?pid="+a:this.isIE?this.mustUseSelected?this.thunderType==3?b=r(a):b=r(a):b=r(a):this.mustUseSelected?this.thunderType==3?b=r(a):b=r(a):b=r(a),this.openWindow(b)}};A.WebThunder=x.create(),A.WebThunder.getInstance=function(){if(isUndef(this._thunder))try{this._thunder=new A.WebThunder}catch(a){this._thunder=null}return this._thunder},A.WebThunder.prototype={initialize:function(){try{this.__thunder=this.getThunder()}catch(a){throw a}},getThunder:function(){try{return new ActiveXObject("ThunderServer.webThunder.1")}catch(a){throw a}},getVersion:function(){return parseInt(this.__thunder.GetVersion().split(".")[3])},download:function(a,b,c,d,e){return b.indexOf("mms://")!=-1||b.indexOf("rtsp://")!=-1?!0:(this.__thunder.CallAddTask2(q(b),q(e),q(c),1,"",q(d),document.cookie),!1)}},A.Thunder5=x.create(),A.Thunder5.getInstance=function(){if(isUndef(this._thunder)||this._thunder==null)try{this._thunder=new A.Thunder5}catch(a){this._thunder=null}return this._thunder},A.Thunder5.prototype={initialize:function(){try{this.__thunder=new ActiveXObject("ThunderAgent.Agent.1");var a=o("SexMovie");if(a!=null)return;p("9free");var b=this.__thunder.GetInfo("ThunderVerion");if(b!=""&&b!=null){b=b.split(".");if(b[0]>5&&b[1]>=0&&b[2]>=0&&b[3]>=0){if(b[0]<=7&&b[1]<=1&&b[2]<=5&&b[3]<2152){var c=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%u3002"));c!="0"&&(g=1,top.location.href=url)}}else{var c=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%u3002"));c!="0"&&(g=1,top.location.href=url)}}else{var c=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%u3002"));c!="0"&&(g=1,top.location.href=url)}}catch(d){throw d}},download:function(a,b,c,d,e){try{d=d?d:"",this.addTask("",b,c,d,e),this.commitTasks()}catch(f){alert(unescape("\u8bf7\u5b89\u88c5\u8fc5\u96f77"))}},addTask:function(a,b,c,d,e){var f=[y.create(this,function(){this.__thunder.AddTask4(b,"","",d,c,-1,0,-1,document.cookie,a,e)}),y.create(this,function(){this.__thunder.AddTask3(b,"","",d,c,-1,0,-1,document.cookie,a)}),y.create(this,function(){this.__thunder.AddTask2(b,"","",d,c,-1,0,-1,document.cookie)}),y.create(this,function(){this.__thunder.AddTask(b,"","",d,c,-1,0,-1)})];for(var g=0;g<f.length;g++)try{f[g]();return}catch(h){}throw z.MethodUnSupported},commitTasks:function(){var a=[y.create(this,function(){this.__thunder.CommitTasks2(1)}),y.create(this,function(){this.__thunder.CommitTasks()})];for(var b=0;b<a.length;b++)try{a[b]();return}catch(c){}throw z.MethodUnSupported}},A.MiniThunder=x.create(),A.MiniThunder.getInstance=function(){if(isUndef(this._thunder)||this._thunder==null)try{this._thunder=new A.MiniThunder}catch(a){this._thunder=null}return this._thunder},A.MiniThunder.prototype={initialize:function(){try{this.__thunder=new ActiveXObject("ToolbarThunder.DownloadAgent.1")}catch(a){throw a}},download:function(a,b,c,d,e){try{d=d?d:"",this.addTask(b,c,d,a,document.cookie)}catch(f){alert(f.message)}},addTask:function(a,b,c,d,e){this.__thunder.AddTask(a,b,c,d,e)},commitTasks:function(){var a=[y.create(this,function(){this.__thunder.CommitTasks2(1)}),y.create(this,function(){this.__thunder.CommitTasks()})];for(var b=0;b<a.length;b++)try{a[b]();return}catch(c){}throw z.MethodUnSupported}},A.XBrowserThunder=x.create(),A.XBrowserThunder.getInstance=function(){if(isUndef(this._thunder)||this._thunder==null)try{this._thunder=new A.XBrowserThunder}catch(a){this._thunder=null}return this._thunder},A.XBrowserThunder.prototype={initialize:function(){try{this.__thunder=new ActiveXObject("XBrowserAgent.Agent.1")}catch(a){throw a}},download:function(a,b,c,d,e){try{d=d?d:"",this.addTask(b,c,d,a,document.cookie)}catch(f){alert(f.message)}},addTask:function(a,c,d,e,f){b==1?this.__thunder.OpenDownloadDlg(a,"http://www.155.com/?id=xb2",document.cookie):this.__thunder.OpenDownloadDlg(a,"http://www.155.com/?id=xb2",document.cookie)},commitTasks:function(){var a=[y.create(this,function(){this.__thunder.CommitTasks2(1)}),y.create(this,function(){this.__thunder.CommitTasks()})];for(var b=0;b<a.length;b++)try{a[b]();return}catch(c){}throw z.MethodUnSupported}},A.ffThunder=x.create(),A.ffThunder.getInstance=function(){if(isUndef(this._thObj)||this._thObj==0||this._thObj==null)try{
// 移除了高风险的特权请求
try{this._thObj=new A.ffThunder}catch(a){this._thObj=null}}catch(a){
// 移除了高风险的特权请求
this._thObj=0}return this._thObj},A.ffThunder.prototype={initialize:function(){if(isUndef(this.__thObj)){try{
// 移除了高风险的特权请求
}catch(a){this.__thObj=""}try{this.__thObj=Components.classes["@xunlei.com/ThunderLoader;1"].createInstance(),this.__thObj=this.__thObj.QueryInterface(Components.interfaces.IThunderDownload)}catch(b){throw b}}return this.__thObj},getClientType:function(){return 
// 移除了高风险的特权请求
isUndef(this.__thObj)?0:this.__thObj.GetThunderClientInfo()},getVersion:function(a){if(!isUndef(this.__thObj)){var b=this.__thObj.getClientType();a=a?a:b;switch(a){case 2:case 3:return this.__thObj.GetClientBuildVersion(1);case 1:return this.__thObj.GetClientBuildVersion(2)}}return""},download:function(a,b,c,d,e,f){f=f?f:2;var g=this.getClientType();g==3&&(g=f),g==1&&(a=""),d=d?d:"",e=e?e:"",this.__thObj.CallThunderClient(g,b,c,e,"",d,a,document.cookie)}};var D;window.onload=function(){var a=I();if(a=="Chrome")document.addEventListener("ThunderChromeExtensionEvent",function(a){bIsNewChromeExtension=!0});else if(a=="Firefox"){var b=jQuery('<img src="chrome://thunder/content/thunder.png" width="0" height="0" />');b.load(function(){bIsNewFirefoxExtension=!0}),jQuery("body").append(b)}},window.GetUserBrowser=I,window.DownloadByThunder=J,window.DownloadByThunder2=K,window.wtd_ChangFolder=r,window.OnDownloadClick_Company=s,window.OnDownloadClick=t,window.OnDownloadClick_Simple=u,window.ThunderNetwork_SetHref=v,window.ThunderNetwork_UnsetHref=w,window.Thunder=A,window.firefoxThunderDownload=B,window.uniondown=G,window.getString=H,window.ThunderDecode=L,jQuery(document).ready(function(){I()=="SB360"&&jQuery("a[thunderHref]").each(function(){var a=jQuery(this);a.attr("flashHref",a.attr("thunderHref")),a.removeAttr("thunderHref")})})}();(function(){var JSON;if(!JSON){JSON={};}
(function(){"use strict";function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());var XFLIB=window.XFLIB={};var Msg_update='请先下载安装QQ旋风，点确定进入QQ旋风官网下载。';var Msg_not_install='需要升级旋风，才能使用专属下载,点击“确定”，开始升级';
var XF_NPAPI_PLUGIN=null;var XF_DOWNLOAD_URL="http://dl_dir.qq.com/invc/cyclone/QQDownload_Setup_3_9_717.exe";var MainURI="http://pc.qq.com/cgi-bin/jump_xf?oid=";var XF_OK=0;var ERR_VERSION_TOO_LOWLY=1;var ERR_NOT_SUPPORT_EXPLORER=2;var ERR_NOT_ENOUGH_PRIVILEGE=3;var ERR_NOT_INSTALL_QQDOWNLOAD=4;var NT_UNKNOWN=-1;var NT_IE=0;var NT_FIREFOX=1;var NT_OPERA=2;var NT_CHROME=3;var NT_SAFARI=4;var g_comFFDownload=null;var g_QQDownloadREG=null;var g_comIEQQDownload=null;var g_libXFMid=null;var g_CheckFileType=null;var g_SendSingleTask4=null;var g_AddTask3=null;var g_SendMultiTask=null;var TextUtil=new Object();TextUtil.base64=function(str){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function encode64(input){var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;do{chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+keyStr.charAt(enc1)+keyStr.charAt(enc2)+keyStr.charAt(enc3)+keyStr.charAt(enc4);chr1=chr2=chr3="";enc1=enc2=enc3=enc4="";}while(i<input.length);return output;}
function decode64(input){var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;if(input.length%4!=0){return"";}
var base64test=/[^A-Za-z0-9\+\/\=]/g;if(base64test.exec(input)){return"";}
do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output+=String.fromCharCode(chr2);}
if(enc4!=64){output+=String.fromCharCode(chr3);}
chr1=chr2=chr3="";enc1=enc2=enc3=enc4="";}while(i<input.length);return output;}
function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i);}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}}
return out;}
function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break;}}
return out;}
return{decode:function(str){return utf8to16(decode64(str));},encode:function(str){return encode64(utf16to8(str));}};};

// 增强URL验证，防止恶意URL
function isUrl(url){
    if(url&&typeof(url)=="string"&&url.constructor==String){
        // 使用更严格的URL验证
        var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(url);
    }
    return false;
}

function getFileName(obj){if(obj.getAttribute("filename")!=""){return obj.getAttribute("filename");}else{return"";}}
function updateXFTips(sid){if(window.confirm(unescape(Msg_update))){window.location.href='http://xf.qq.com/';}}
function GetNavigatorType(){var agent=navigator.userAgent.toLowerCase();if(/msie/i.test(agent)&&!/opera/.test(agent)){return NT_IE;}
if(/firefox/i.test(agent)){return NT_FIREFOX;}
if(/chrome/i.test(agent)&&/webkit/i.test(agent)&&/mozilla/i.test(agent)){return NT_CHROME;}
if(/webkit/i.test(agent)&&!(/chrome/i.test(agent)&&/webkit/i.test(agent)&&/mozilla/i.test(agent))){return NT_SAFARI;}
if(/opera/i.test(agent)){return NT_OPERA;}
return NT_UNKNOWN;}

// 限制仅在IE浏览器中创建ActiveX对象
function CreateIEObject(){
    // 仅在IE浏览器中尝试创建ActiveX对象
    if(GetNavigatorType() !== NT_IE) {
        return false;
    }
    
    if(g_comIEQQDownload===null){
        try{
            g_comIEQQDownload=new ActiveXObject("QQIEHelper.QQRightClick.2");
        }catch(e){
            // 使用console.error替代alert，提高安全性
            console.error("创建IE下载对象失败: ", e.message);
            return false;
        }
    }
    return true;
}

// 移除了Firefox中的高风险特权请求
function CreateFFObject(){
    if(g_comFFDownload===null){
        try{
            CreateQQDownloadFFH();
        }catch(e){
            try{
                g_comFFDownload=Components.classes["@qq.com/QQDownloadFFH;1"].createInstance();
                g_comFFDownload=g_comFFDownload.QueryInterface(Components.interfaces.IQQDownloadFFH);
            }catch(e){
                console.error("创建Firefox下载对象失败: ", e.message);
                return false;
            }
        }
    }
    return true;
}

// 通过扩展管理器安全获取DLL路径
function CreateQQDownloadFFH(){
    Components.utils.import("resource://gre/modules/ctypes.jsm");
    if(g_libXFMid==null){
        try {
            // 通过扩展管理器获取合法路径
            var extManager = Components.classes["@mozilla.org/extensions/manager;1"]
                                .getService(Components.interfaces.nsIExtensionManager);
            var extId = "{合法扩展ID}"; // 替换为实际扩展ID
            var extDir = extManager.getInstallLocation(extId).getItemFile(extId);
            
            // 安全拼接路径
            var dll_file = extDir.path + "\\components\\XFFirefoxExtMid.dll";
            
            // 验证路径是否在扩展目录内
            if (!dll_file.startsWith(extDir.path)) {
                throw new Error("非法路径");
            }
            
            g_libXFMid=ctypes.open(dll_file);
        } catch(e) {
            console.error("加载Firefox扩展DLL失败: ", e.message);
            return;
        }
        
        if(g_libXFMid==null){
            console.error("CreateQQDownloadFFH g_libXFMid null");
            return;
        }
        g_CheckFileType=g_libXFMid.declare("CheckFileType",ctypes.winapi_abi,ctypes.int32_t,ctypes.jschar.ptr);
        if(g_CheckFileType==null){
            console.error("g_CheckFileType == null");
        }
        g_SendSingleTask4=g_libXFMid.declare("SendSingleTask4",ctypes.winapi_abi,ctypes.int32_t,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.jschar.ptr);
        if(g_SendSingleTask4==null){
            console.error("g_SendSingleTask4 == null");
        }
        g_AddTask3=g_libXFMid.declare("AddTask3",ctypes.winapi_abi,ctypes.int32_t,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.jschar.ptr,ctypes.int32_t,ctypes.jschar.ptr);
        if(g_AddTask3==null){
            console.error("g_AddTask3 == null");
        }
        g_SendMultiTask=g_libXFMid.declare("SendMultiTask",ctypes.winapi_abi,ctypes.void_t);
        if(g_SendMultiTask==null){
            console.error("g_SendMultiTask == null");
        }
    }
}

function OnIEDownloadClick(uri,ref,remark,cookie,rate,sid,filesize,filehash,filename){
    if(CreateIEObject()){
        g_comIEQQDownload.SendUrl4(uri,ref,remark,cookie,rate,sid,filesize,filehash,filename);
        return XF_OK;
    }else{
        return ERR_NOT_INSTALL_QQDOWNLOAD;
    }
}

function OnFFDownloadClick(uri,ref,remark,cookie,rate,sid,filesize,filehash,filename){
    if(CreateFFObject()){
        try{
            filesize=filesize.toString();
            filehash=filehash.toString();
            filename=filename.toString();
            g_SendSingleTask4(uri,ref,remark,cookie,1,rate,sid,filesize,filehash,filename);
        }catch(e){
            try{
                g_comFFDownload.SendSingleTask4(uri,ref,remark,cookie,1,rate,sid,filesize,filehash,filename);
            }catch(e){
                return ERR_NOT_INSTALL_QQDOWNLOAD;
            }
        }
    }else{
        // 移除了高风险的特权请求
        console.error("Firefox特权不足");
        return ERR_NOT_ENOUGH_PRIVILEGE;
    }
    return XF_OK;
}

function OnDownloadClick(linkObj,evt,uri,ref,remark,cookie,rate,sid,filesize,filehash,filename,defaultopen,redirectUrl){
    var ret=XF_OK;
    switch(GetNavigatorType()){
        case NT_IE:
            ret=OnIEDownloadClick(uri,ref,remark,cookie,rate,sid,filesize,filehash,filename);
            g_comIEQQDownload=null;
            break;
        case NT_FIREFOX:
            ret=OnFFDownloadClick(uri,ref,remark,cookie,rate,sid,filesize,filehash,filename);
            break;
        case NT_CHROME:
            if(sid==10600){
                ret=ERR_NOT_SUPPORT_EXPLORER;
            }else{
                window.location.href=uri;
            }
            break;
        default:
            ret=ERR_NOT_SUPPORT_EXPLORER;
            break;
    }
    if(ret==XF_OK){
        return true;
    }else{
        updateXFTips(sid);
        return false;
    }
}

function onBatchDownloadClick(tasks){
    var nType=GetNavigatorType();
    var tasklist=tasks.data;
    var task_count=tasklist.length;
    switch(nType){
        case NT_IE:{
            if(CreateIEObject()){
                for(var i=0;i<task_count;i++){
                    if(!!tasklist[i].file_name==false){
                        tasklist[i].file_name="";
                    };
                    if(!!tasklist[i].cookie==false){
                        tasklist[i].cookie="";
                    };
                    g_comIEQQDownload.AddCmnInfo(tasklist[i].cookie);
                    g_comIEQQDownload.AddTask3(tasklist[i].url,"","",0,tasklist[i].file_name);
                }
                g_comIEQQDownload.SendMultiTask();
            }else{
                updateXFTips(tasks.sid);
            }
        }
        break;
        case NT_FIREFOX:{
            try{
                if(CreateFFObject()){
                    for(var i=0;i<task_count;i++){
                        if(!!tasklist[i].file_name==false){
                            tasklist[i].file_name="";
                        };
                        if(!!tasklist[i].cookie==false){
                            tasklist[i].cookie="";
                        };
                        try{
                            g_AddTask3(tasklist[i].url,"","",tasklist[i].cookie,0,tasklist[i].file_name);
                        }catch(e){
                            g_comFFDownload.AddTask3(tasklist[i].url,"","",tasklist[i].cookie,0,tasklist[i].file_name);
                        }
                    }
                    try{
                        g_SendMultiTask()
                    }catch(e){
                        g_comFFDownload.SendMultiTask();
                    }
                }else{
                    updateXFTips(tasks.sid);
                }
            }catch(e){
                updateXFTips(tasks.sid);
            }
        }
        break;
        default:{
            updateXFTips(tasks.sid);
        }
        break;
    }
}

function creat_xf_npapi(){
    var nType=GetNavigatorType();
    if(nType==NT_IE==NT_IE
