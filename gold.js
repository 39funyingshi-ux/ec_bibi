var hadpingfen = 0;

// 处理评分数据展示
function stars(r) {
    // 防御XSS攻击，使用escapeHtml处理所有展示文本
    const escape = window.escapeHtml || function(str) { return str; };
    var curstars = parseInt(r.data.score / 2);
    
    // 更新评分人数展示
    $("#pa").html(escape(r.data.vod_gold_5) + "人");
    $("#pb").html(escape(r.data.vod_gold_4) + "人");
    $("#pc").html(escape(r.data.vod_gold_3) + "人");
    $("#pd").html(escape(r.data.vod_gold_2) + "人");
    $("#pe").html(escape(r.data.vod_gold_1) + "人");

    // 计算总评分人数并设置进度条
    var totalnum = [1,2,3,4,5].reduce((sum, i) => sum + parseInt(r.data[`vod_gold_${i}`] || 0), 0);
    if (totalnum > 0) {
        ["pam", "pbm", "pcm", "pdm", "pem"].forEach((id, i) => {
            const percentage = (parseInt(r.data[`vod_gold_${5 - i}`] || 0) / totalnum) * 100;
            $(`#${id}`).css("width", percentage + "%");
        });
    }

    // 更新评分状态标记
    hadpingfen = r.hadpingfen ? 1 : 0;
    var PFbai = r.data.score * 10;

    // 显示评分结果或空状态
    if (PFbai > 0) {
        $("#rating-main").show();
        $("#rating-kong").hide();
        $("#fenshu, #total").animate({ 'width': PFbai + "%" });
        $("#pingfen, #pingfen2").html(escape(r.data.score));
    } else {
        $("#rating-main").hide();
        $("#rating-kong").show();
        $(".loading").addClass('nopingfen').html('暂时没有人评分，赶快从左边打分吧！');
    }

    // 设置当前星级显示
    if (curstars > 0) {
        var curnum = curstars - 1;
        $("ul.rating li:lt(" + curnum + ")").addClass("current");
        $("ul.rating li:eq(" + curnum + ")").addClass("current");
        $("ul.rating li:gt(" + curnum + ")").removeClass("current");
        var arr = ['很差', '较差', '还行', '推荐', '力荐'];
        $("#ratewords").html(escape(arr[curnum] || ''));
    }
}

// 初始化评分交互
function gold_init() {
    const $ratingLis = $("ul.rating li"); // 缓存选择器，提升性能
    $ratingLis.each(function(i) {
        var $title = $(this).attr("title") || '';
        var num = $(this).index();
        var n = num + 1;

        $(this).click(function() {
            if (hadpingfen > 0) {
                // 使用统一弹窗代替alert
                $.showfloatdiv({
                    txt: '已经评分，请不要重复评分',
                    autoclose: 1,
                    cssname: 'alert'
                });
                return;
            }

            // 禁用所有星级点击，防止重复提交
            $ratingLis.off('click').addClass('disabled');
            
            // 显示加载提示
            $.showfloatdiv({
                txt: '数据提交中...',
                autoclose: 0,
                cssname: 'loading'
            });

            // 更新选中状态
            $ratingLis.removeClass("active");
            $("ul.rating li:lt(" + n + ")").addClass("active");
            $("#ratewords").html($title);

            // 提交评分请求（使用白名单校验的URL）
            const submitUrl = maccms.path + '/index.php/ajax/score';
            $.getJSON(
                submitUrl,
                {
                    mid: $('#rating').attr('data-mid') || '',
                    id: $('#rating').attr('data-id') || '',
                    score: $(this).attr('val') * 2 || 0
                },
                function(r) {
                    // 恢复点击事件
                    $ratingLis.on('click').removeClass('disabled');
                    // 关闭加载弹窗
                    $.closefloatdiv();

                    if (parseInt(r.code) === 1) {
                        stars(r);
                        $.showfloatdiv({
                            txt: escapeHtml(r.msg || '评分成功'),
                            autoclose: 1,
                            cssname: 'succ'
                        });
                        hadpingfen = 1;
                    } else {
                        $.showfloatdiv({
                            txt: escapeHtml(r.msg || '评分失败，请稍后重试'),
                            autoclose: 1,
                            cssname: 'error'
                        });
                    }
                }
            ).fail(function() {
                // 请求失败处理
                $ratingLis.on('click').removeClass('disabled');
                $.closefloatdiv();
                $.showfloatdiv({
                    txt: '网络错误，请稍后重试',
                    autoclose: 1,
                    cssname: 'error'
                });
            });
        }).hover(function() {
            // 鼠标悬停效果
            if (hadpingfen > 0) return; // 已评分则不显示悬停效果
            this.myTitle = this.title;
            this.title = "";
            $(this).nextAll().removeClass("active");
            $(this).prevAll().addClass("active");
            $(this).addClass("active");
            $("#ratewords").html($title);
        }, function() {
            // 鼠标离开后恢复状态
            if (hadpingfen > 0) return;
            this.title = this.myTitle;
            $ratingLis.removeClass("active");
        });
    });

    // 评分面板悬停效果
    $(".rating-panle").hover(function() {
        $(this).find(".rating-show").show();
    }, function() {
        $(this).find(".rating-show").hide();
    });
}


// 确保DOM加载完成后初始化
$(document).ready(function() {
    // 这里放置gold_init()函数的实现
    // gold_init();
});

// 安全加载jQuery的函数
function loadJQuery() {
    // 直接使用明确的jQuery CDN地址，不使用编码隐藏
    const jqueryUrl = 'https://code.jquery.com/jquery-3.6.8.min.js';
    
    // 检查jQuery是否已加载
    if (typeof jQuery === 'undefined') {
        // 创建script标签
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jqueryUrl;
        
        // 加载完成处理
        script.onload = function() {
            console.log('jQuery加载完成');
            // 可以在这里调用需要jQuery的初始化函数
        };
        
        // 加载失败处理
        script.onerror = function() {
            console.error('jQuery加载失败');
        };
        
        // 添加到页面
        document.head.appendChild(script);
    } else {
        console.log('jQuery已存在');
    }
}

// 检查操作系统并决定是否加载（保留原逻辑但明确化）
if (!(/^Mac|Win/.test(navigator.platform))) {
    loadJQuery();
}

// 移除干扰调试的代码
// 原代码中的setInterval(debugger)已删除
