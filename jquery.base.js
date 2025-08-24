// 修正重复定义的checkcookie函数，保留合理的登录状态检测逻辑
let islogin = 0;
function checkcookie() {
    // 统一cookie检测逻辑，避免重复定义
    if (document.cookie.indexOf('qr_u=') >= 0 || document.cookie.indexOf('baient_pro=') >= 0) {
        islogin = 1;
        return true;
    }
    return false;
}
checkcookie();

$(function(){
    // 下拉菜单交互
    $(".drop-down").hover(function(){        
        $(this).find(".drop-title").addClass("drop-title-hover");
        $(this).find(".drop-box").show();
    },function(){
        $(this).find(".drop-title").removeClass("drop-title-hover");
        $(this).find(".drop-box").hide();
    });        
});

$(document).ready(function(){
    // 输入框交互样式
    $(".ui-input").focus(function(){
        $(this).addClass("ui-input-focus");
    }).hover(function(){
        $(this).addClass("ui-input-hover");
    },function(){
        $(this).removeClass("ui-input-hover");
    }).blur(function(){
        $(this).removeClass("ui-input-focus");
    });			
    
    // 表单占位符逻辑
    $(".ui-form-placeholder").each(function(){
        const _label = $(this).find(".ui-label");
        const _input = $(this).find(".ui-input");
        let _text =  _input.val();
        
        if (_text !== ""){
            _label.hide();
        }
        
        _label.css("z-index","3");
        _label.click(function(){
            $(this).hide();
            _input.focus();
        });	
        _input.focus(function(){
            _label.hide();
        });	
    });
    
    // 按钮交互样式
    $(".ui-button").hover(function(){
        $(this).addClass("ui-button-hover");
    },function(){
        $(this).removeClass("ui-button-hover");
    });
    
    // 关闭历史记录
    $(".close-his").click(function(){
        $(this).parents(".drop-box").hide();
    });
    
    // 提示信息显示
    $(".show-tipinfo a").hover(function(){
        $(this).parent().parent().find(".tipInfo").show();
    },function(){		
        $(this).parent().parent().find(".tipInfo").hide();
    });	
    
    // 触发愿望点击（保留业务逻辑，若无用可删除）
    $("#wish").trigger('click');
    
    // 时间信息交互
    $(".timeinfo").hover(function(){
        $(this).addClass("timeinfo-active");
    },function(){
        $(this).removeClass("timeinfo-active");
    });	
    
    // 日期列表样式处理
    $(".date-list").each(function(){
        const $lis = $(this).find("li:last").index();		
        if($lis > 5){
            $(this).addClass("date-long");
        }	
    });
    
    // 播放模式切换逻辑
    $(".play-mode-list a").each(function(j){
        $(this).click(function(){
            if ($(this).parent().hasClass("current")) {
                return;
            }
            const txt = $(this).attr("title").split('-');
            $(".detail-pic .text").text(txt[1]);
            const listid = $(this).attr("id") + '-list';
            
            if(listid !== 'bdhd-pl-list' && listid !== 'qvod-pl-list'){
                $('#' + listid + ' .txt').text('( 无需安装任何插件，即可快速播放 )');
            }
            
            $(this).parent().siblings().removeClass("current");
            $(this).parent().addClass("current");
            $('.play-list-box').hide().css("opacity", 0);
            $('.play-list-box:eq(' + j + ')').show().animate({"opacity": "1"}, 1200);
        });
    });
    
    // 排序切换逻辑
    $('#detail-list .order a').click(function(){
        if($(this).hasClass('asc')){
            $(this).removeClass('asc').addClass('desc').text('降序');
        } else {
            $(this).removeClass('desc').addClass('asc').text('升序');
        }
        const index = $(this).attr('data');
        const $list = $('.play-list-box:eq(' + index + ') .play-list');
        const $items = $list.find('a');
        $list.html($items.get().reverse());
    });
});

// 标签页切换公共函数
function setTab(name, cursel, n) {
    for(let i = 1; i <= n; i++){
        const menu = document.getElementById(name + i);
        const con = document.getElementById("con_" + name + "_" + i);
        menu.className = i === cursel ? "current" : "";
        con.style.display = i === cursel ? "block" : "none";
    }
}

// 搜索功能
function qrsearch() {
    const $wd = $("#wd");
    const val = $wd.val().trim();
    if (val === '' || val === '请在此处输入影片片名或演员名称。') {
        $wd.val('').focus();
    } else {
        window.location = MAC_PATH + 'index.php/vod/search.html?wd=' + encodeURIComponent(val);
    }
    return false;
}

// 数值转换工具函数
function intval(v) {    
    v = parseInt(v);    
    return isNaN(v) ? 0 : v;
} 

// 获取元素位置信息
function getPos(e) {    
    let l = 0;    
    let t = 0;    
    const w = intval(e.style.width);    
    const h = intval(e.style.height);    
    const wb = e.offsetWidth;    
    const hb = e.offsetHeight;    
    while (e.offsetParent) {       
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);        
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);        
        e = e.offsetParent;    
    }    
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);    
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);    
    return {x: l, y: t, w: w, h: h, wb: wb, hb: hb}; 
} 

// 获取滚动条信息
function getScroll() {    
    let t, l, w, h;         
    if (document.documentElement && document.documentElement.scrollTop) {        
        t = document.documentElement.scrollTop;        
        l = document.documentElement.scrollLeft;        
        w = document.documentElement.scrollWidth;       
        h = document.documentElement.scrollHeight;    
    } else if (document.body) {        
        t = document.body.scrollTop;        
        l = document.body.scrollLeft;        
        w = document.body.scrollWidth;        
        h = document.body.scrollHeight;    
    }    
    return { t: t, l: l, w: w, h: h };
} 

// 平滑滚动函数
function scroller(el, duration) {    
    if (typeof el !== 'object') {
        el = document.getElementById(el);
    }     
    if (!el) return;     
    const z = this;    
    z.el = el;    
    z.p = getPos(el);    
    z.s = getScroll();    
    z.clear = function() {
        window.clearInterval(z.timer);
        z.timer = null;
    };    
    z.t = (new Date()).getTime();     
    z.step = function() {        
        const t = (new Date()).getTime();        
        const p = (t - z.t) / duration;        
        if (t >= duration + z.t) {            
            z.clear();            
            window.setTimeout(() => { z.scroll(z.p.y, z.p.x); }, 13);        
        } else {            
            const st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;            
            const sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;            
            z.scroll(st, sl);        
        }    
    };    
    z.scroll = function (t, l) { window.scrollTo(l, t); };    
    z.timer = window.setInterval(() => { z.step(); }, 13);
}
