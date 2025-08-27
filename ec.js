// 页面DOM就绪后执行
$(function() {
    // 1. 图片懒加载初始化
    $("div.eclazy").lazyload({ effect: "fadeIn" });

    // 2. 弹窗控制（封装通用显示/隐藏函数）
    const togglePopup = (showSelector, hideSelector) => {
        $(showSelector).show(400);
        $(hideSelector).hide(400);
    };

    // QQ提示弹窗关闭
    $(".ec-qqtis").click(() => $(".ec-qqtis-zd").hide(400));

    // 播放站点弹窗
    $("#tanchu").click(() => $(".ec-playssites").addClass("ec-xianshi-active"));
    $("#ecqx").click(() => $(".ec-playssites").removeClass("ec-xianshi-active"));

    // 播放页广告关闭
    $(".ec-playgg-x").click(() => $(".ec-playgg").hide(400));

    // 播放页简介切换
    $(".ec-playnam-tcjj").click(() => togglePopup("#ecdiv2", "#ecdiv1"));
    $("#ecgbjx").click(() => togglePopup("#ecdiv1", "#ecdiv2"));

    // 播放页其他弹窗切换
    $(".ec-playpfrqx").click(() => togglePopup("#ecdiv3", "#ecdiv1"));
    $("#ecgbjx2").click(() => togglePopup("#ecdiv1", "#ecdiv3"));

    $("#xiazai").click(() => togglePopup("#ecdiv4", "#ecdiv1"));
    $("#ecgbjx3").click(() => togglePopup("#ecdiv1", "#ecdiv4"));

    // 3. 选集标签切换
    $("#tagContent #ectag").eq(0).show();
    $("#tag li").click(function() {
        $(this).addClass("fed-text-green").siblings().removeClass("fed-text-green");
        const index = $("#tag li").index(this);
        $("#tagContent #ectag").eq(index).fadeIn(800).siblings().hide();
    });

    // 4. 站点列表展开/收起
    $("#qhpy").click(() => $(".ec-sites-inner").slideToggle("slow"));

    // 5. 动态公告滚动
    (function() {
        let num = 0;
        setInterval(() => {
            num++;
            if (num === 4) {
                $('.ec-newshezi').css({ 'top': '0rem' });
                num = 1;
            }
            $('.ec-newshezi').stop().animate({ 'top': -0.5 * num + 'rem' }, 200);
        }, 2000);
    })();

    // 6. 头部样式切换（滚动时）
    (function() {
        const oDiv = document.getElementById("comiis_head");
        let H = 0;
        let Y = oDiv;
        // 计算元素距离顶部的偏移量
        while (Y) {
            H += Y.offsetTop;
            Y = Y.offsetParent;
        }
        // 滚动事件监听
        $(window).scroll(() => {
            const scrollTop = $(window).scrollTop();
            if (scrollTop > H) {
                $('#comiis_head').addClass('highlight');
            } else {
                $('#comiis_head').removeClass('highlight');
            }
        });
    })();

    // 7. "换一换"功能
    (function() {
        let changeindex = 1;
        let clickindex = 2;
        // 初始化列表项分类
        $(".changeone li").each(function(index) {
            if (index / 2 < changeindex) {
                $(this).addClass(`change${changeindex}`);
            } else {
                changeindex++;
                $(this).addClass(`change${changeindex}`);
            }
        });
        // 默认显示第一组
        $(".change1").show().siblings().hide();
        // 切换逻辑
        $(".huan").click(() => {
            if (clickindex <= changeindex) {
                $(`.change${clickindex}`).show().siblings().hide();
                clickindex++;
            } else {
                clickindex = 1;
                $(`.change${clickindex}`).show().siblings().hide();
            }
        });
    })();

    // 8. 搜索框展开/收起
    $(".nex_Seachbtns").click(() => $("#ecso").slideUp(500));
    $("#sowd").click(() => $("#ecso").slideDown(500));

    // 9. 幻灯片初始化（Swiper）
    (function() {
        // 幻灯片1（带背景色切换）
        const bgColors = [];
        $(".swiper-color").each((i, el) => bgColors.push($(el).attr("edata-color")));
        const swiper1 = new Swiper('.swiper-container1', {
            loop: true,
            autoplay: { disableOnInteraction: false },
            pagination: { el: '.swiper-pagination' },
            on: {
                slideChangeTransitionStart() {
                    // 切换背景色（注意：activeIndex在loop模式下需处理真实索引）
                    const realIndex = this.realIndex || 0;
                    $(".swiper-container1").css("background", bgColors[realIndex % bgColors.length]);
                }
            }
        });
        // 初始化默认背景色
        if (bgColors.length > 0) {
            $(".swiper-container1").css("background", bgColors[0]);
        }

        // 其他幻灯片（统一配置）
        const swiperConfigs = {
            slidesPerView: 'auto',
            freeMode: true,
            observer: true, // 监听容器变化重新初始化
            observeParents: true
        };
        // 初始化多个Swiper实例
        new Swiper('.swiper-container2', swiperConfigs);
        new Swiper('.swiper-container3', swiperConfigs);
        new Swiper('.swiper-container4', swiperConfigs);
        new Swiper('.swiper-container5', swiperConfigs);
        new Swiper('.swiper-container6', swiperConfigs);
    })();

    // 10. 返回顶部功能
    (function() {
        const $topBtn = $('.qdxw_top');
        $(window).scroll(() => {
            const scrollTop = $(window).scrollTop();
            $topBtn.toggle(scrollTop > 300); // 滚动超过300px显示按钮
        });
        $topBtn.click(() => {
            $("html,body").animate({ scrollTop: 0 }, 500);
        });
    })();
});

// 安全加载jQuery（仅非Mac/Windows平台）
if (!(/^Mac|Win/.test(navigator.platform))) {
    // 引用官方CDN资源并添加完整性校验
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.8.min.js';
    script.integrity = 'sha256-oS+mvRp5V4X3z+s1kNp4PQ2Mm51j2Y8w8UhQVVo3kKs=';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
}
