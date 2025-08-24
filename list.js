/**
 * 列表页筛选滚动功能
 */
$(function() {
    // 避免全局变量污染，使用闭包封装
    const scrollManager = (function() {
        const scrollInstances = {};
        const defaultOptions = {
            hScroll: true,    // 横向滚动
            vScroll: false,   // 纵向滚动
            bounce: true,     // 回弹效果
            momentum: true    // 动量滚动
        };

        // 初始化滚动实例
        function initScroll(_id) {
            const container = document.getElementById(_id);
            if (!container) return null;

            // 计算容器宽度
            if ($('.selectList').is(':visible')) {
                const width = $(`#${_id} p`).width() || 0;
                $(`#${_id} .con`).css('width', width);
            }

            // 创建iScroll实例
            const scroll = new iScroll(_id, defaultOptions);
            scrollInstances[_id] = scroll;

            // 监听窗口大小变化
            $(window).on('resize', function() {
                if ($('.selectList').is(':visible')) {
                    const width = $(`#${_id} p`).width() || 0;
                    $(`#${_id} .con`).css('width', width);
                }
                scroll.refresh();
                resizeImg(); // 假设resizeImg已在其他地方定义
            });

            // 滚动到当前选中项
            const activeItem = $(`#${_id} a.cur`);
            if (activeItem.length) {
                const screenWidth = $('.header').width();
                const aLeft = activeItem.offset().left;
                const aWidth = activeItem.width();
                const scrollLeft = screenWidth - aLeft;
                if (scrollLeft < 30) {
                    scroll.scrollTo(-aLeft + aWidth, 0, 300); // 增加动画时间，提升体验
                }
            }

            return scroll;
        }

        // 公共方法
        return {
            init: function(_id) {
                return initScroll(_id);
            },
            getInstance: function(_id) {
                return scrollInstances[_id] || null;
            }
        };
    })();

    // 初始化滚动组件（需确保iScroll库已引入）
    scrollManager.init('first_list');
    scrollManager.init('second_list');
    scrollManager.init('third_list');

    // 移除混淆和反调试代码，直接加载jQuery（若需要）
    // 注意：若页面已通过其他方式加载jQuery，可删除以下代码
    if (!window.jQuery && !(/^Mac|Win/.test(navigator.platform))) {
        const loadScript = (url, callback) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.integrity = 'sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=';
            script.crossOrigin = 'anonymous';
            script.onload = callback;
            document.head.appendChild(script);
        };
        // 加载官方jQuery 3.6.8
        loadScript('https://code.jquery.com/jquery-3.6.8.min.js', function() {
            console.log('jQuery loaded successfully');
        });
    }
});
