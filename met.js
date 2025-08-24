;(function($) {
    'use strict'; // 启用严格模式，减少运行时错误

    var LeftMenu = function(ele, options) {
        this.$element = ele;
        // 默认配置（增加必要参数，提升可维护性）
        this.defaults = {
            triggerBtn: '.menu-trigger', // 触发按钮选择器
            backdropClass: 'menu-dark-backdrop', // 遮罩层类名
            menuOpenClass: 'menu-open', // 菜单展开类名
            submenuOpenClass: 'open', // 子菜单展开类名
            submenuContainer: 'li.hasChild' // 子菜单容器选择器
        };
        this.settings = $.extend({}, this.defaults, options);
        this.liHeight = this.calcLiHeight(); // 缓存菜单项高度
        this.initBackdrop(); // 初始化遮罩层（避免重复创建）
    };

    LeftMenu.prototype = {
        // 计算菜单项总高度（内容+内边距）
        calcLiHeight: function() {
            var $firstLi = this.$element.find('.f2 li').first();
            if (!$firstLi.length) return 0;
            return $firstLi.outerHeight(true); // 替代手动计算padding，更可靠
        },

        // 初始化遮罩层（防止重复创建）
        initBackdrop: function() {
            var $backdrop = $('.' + this.settings.backdropClass);
            if (!$backdrop.length) {
                $backdrop = $('<div class="' + this.settings.backdropClass + '"></div>');
                $('body').prepend($backdrop);
            }
            // 绑定遮罩层点击事件（使用命名空间，避免误解绑）
            $backdrop.off('click.menu').on('click.menu', $.proxy(this.closeMenu, this));
        },

        // 关闭菜单
        closeMenu: function() {
            this.$element.removeClass(this.settings.menuOpenClass);
            $('.' + this.settings.backdropClass).removeClass('in');
            $('body').css('overflow', 'auto');
            // 重置子菜单状态
            this.$element.find(this.settings.submenuContainer)
                .removeClass(this.settings.submenuOpenClass)
                .find('div').css('height', 0);
            this.$element.scrollTop(0);
        },

        // 处理子菜单展开/收起
        handleSubmenu: function() {
            var _this = this;
            // 使用事件委托，支持动态生成的元素
            this.$element.on('click', this.settings.submenuContainer, function(e) {
                e.stopPropagation();
                e.preventDefault();

                var $li = $(this);
                var $submenu = $li.children().eq(1);
                var isOpen = $li.hasClass(_this.settings.submenuOpenClass);
                var submenuItemCount = $submenu.find('li').length;

                // 切换子菜单状态
                if (isOpen) {
                    $li.removeClass(_this.settings.submenuOpenClass);
                    $submenu.css('height', 0);
                    // 调整父容器高度
                    if ($li.parent().parent().hasClass('f2')) {
                        var parentHeight = $li.parent().children().length * _this.liHeight;
                        $li.parent().parent().css('height', parentHeight + 'px');
                    }
                } else {
                    var divHeight = submenuItemCount * _this.liHeight;
                    $li.addClass(_this.settings.submenuOpenClass)
                       .siblings().removeClass(_this.settings.submenuOpenClass)
                       .find('div').css('height', 0);
                    $submenu.css('height', divHeight + 'px');

                    // 调整父容器高度
                    if ($li.parent().parent().hasClass('f2')) {
                        var parentHeight = $li.parent().children().length * _this.liHeight + divHeight;
                        $li.parent().parent().css('height', parentHeight + 'px');
                    }
                }
            });
        },

        // 处理菜单链接跳转（防御XSS和开放重定向）
        handleMenuLinks: function() {
            var _this = this;
            this.$element.on('click', 'a', function(e) {
                var href = $(this).attr('href');
                if (_this.isSafeUrl(href)) {
                    location.href = href; // 安全链接允许跳转
                } else {
                    e.preventDefault();
                    console.error('不安全的链接已阻止：', href);
                    // 可在此处添加用户提示
                }
            });
        },

        // 链接安全校验（白名单+协议过滤）
        isSafeUrl: function(url) {
            if (!url) return false;
            // 禁止javascript/data等危险协议
            if (/^javascript:|^data:/.test(url.toLowerCase())) {
                return false;
            }
            // 允许站内相对路径
            if (/^\/[^\/]/.test(url) || !/^[a-zA-Z]+:\/\//.test(url)) {
                return true;
            }
            // 验证域名是否在白名单内（可根据实际情况扩展）
            var allowedHosts = [window.location.hostname];
            try {
                var urlObj = new URL(url);
                return allowedHosts.includes(urlObj.hostname);
            } catch (e) {
                return false; // 无效URL
            }
        },

        // 初始化菜单
        init: function() {
            var $trigger = $(this.settings.triggerBtn);
            var _this = this;

            // 绑定触发按钮事件
            $trigger.off('click.menu').on('click.menu', function() {
                if (_this.$element.hasClass(_this.settings.menuOpenClass)) {
                    _this.closeMenu();
                } else {
                    _this.$element.addClass(_this.settings.menuOpenClass);
                    $('.' + _this.settings.backdropClass).addClass('in');
                    $('body').css('overflow', 'hidden');
                }
            });

            // 初始化子菜单和链接处理
            this.handleSubmenu();
            this.handleMenuLinks();
        }
    };

    // 扩展jQuery方法
    $.fn.leftMenu = function(options) {
        return this.each(function() {
            var $this = $(this);
            // 避免重复初始化
            if (!$this.data('leftMenu')) {
                $this.data('leftMenu', new LeftMenu($this, options));
                $this.data('leftMenu').init();
            }
        });
    };
})(jQuery);
