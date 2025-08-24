// 使用闭包封装全局变量，避免污染
(function($) {
    'use strict'; // 启用严格模式

    let pp = null; // 局部变量替代全局变量

    // HTML转义函数，防御XSS攻击
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return ''; // 严格类型检查
        return unsafe.replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m] || m)); // 增加默认处理，防止遗漏
    }

    // 验证URL是否为可信域名
    function isSafeUrl(url) {
        const allowedHosts = [window.location.hostname];
        try {
            const urlObj = new URL(url, window.location.href);
            // 过滤路径遍历攻击（如 ../）
            if (urlObj.pathname.includes('../')) return false;
            return allowedHosts.includes(urlObj.hostname);
        } catch (e) {
            return false;
        }
    }

    // 全选复选框功能
    function CheckAll(objname) {
        // 移除arguments.callee依赖，通过事件参数直接获取
        const event = window.event || (arguments[0] instanceof Event && arguments[0]);
        if (!event) return;

        const target = event.target || event.srcElement;
        if (!target || target.type !== 'checkbox') return;

        const checkboxes = objname 
            ? document.getElementsByName(objname)
            : document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.checked = target.checked;
        });
    }

    // 获取事件对象（兼容处理）
    function getEvent(e) {
        // 优先使用传入的事件参数
        if (e instanceof Event) return e;
        // 兼容IE全局事件
        if (window.event) return window.event;
        // 最后尝试从调用栈获取（避免严格模式报错）
        try {
            return arguments.callee.caller.arguments[0];
        } catch (err) {
            return null;
        }
    }

    // 扩展jQuery方法
    $.extend({
        refresh: function(url) {
            if (isSafeUrl(url)) {
                window.location.href = url;
            } else {
                console.error("不安全的跳转URL，已阻止");
                window.location.href = '/';
            }
        },

        // 显示浮动弹窗
        showfloatdiv: function(ox) {
            const oxdefaults = {
                txt: '数据加载中,请稍后...',
                classname: 'progressBar',
                left: 410,
                top: 210,
                wantclose: 1,
                suredo: function(e) { return false; },
                succdo: function(r) {},
                completetxt: '操作成功!',
                autoclose: 1,
                ispost: 0,
                cssname: 'alert',
                isajax: 0,
                intvaltime: 1000,
                redirurl: '/',
                ajaxUrlWhitelist: ['/api/', '/user/', '/comment/']
            };

            ox = { ...oxdefaults, ...ox }; // 使用对象扩展语法

            // 移除已存在的弹窗，避免重复
            $("#qirebox_overlay, #qirebox").remove();

            // 事件命名空间，避免解绑冲突
            const eventNamespace = '.qirebox_' + Date.now();

            if (ox.wantclose === 1) {
                const floatdiv = $(`
                    <div id="qirebox" class="qirebox png-img">
                        <div class="ui-dialog">
                            <div class="ui-dialog-cnt" id="ui-dialog-cnt">
                                <div class="ui-dialog-tip ${ox.cssname}" id="ui-cnt">
                                    <span id="xtip">${escapeHtml(ox.txt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                $("body").append(floatdiv);
                $("#qirebox_overlay").fadeIn(500);
                $("#qirebox").fadeIn(500);

                // 绑定关闭事件（带命名空间）
                $(document).on(`click${eventNamespace}`, '.ui-dialog-close', () => {
                    $.closefloatdiv(eventNamespace);
                });

                if (ox.isajax === 1) {
                    const event = getEvent();
                    if (!event) return;

                    const target = event.target || event.srcElement;
                    const url = target.getAttribute("data") || target.data;
                    if (!url) return;

                    // 校验URL白名单
                    const isUrlSafe = ox.ajaxUrlWhitelist.some(prefix => 
                        url.startsWith(prefix) && !url.includes('../')
                    );
                    if (!isUrlSafe) {
                        $("#xtip").text('无效的请求地址');
                        return;
                    }

                    $.ajax({
                        url: url,
                        type: 'get',
                        dataType: 'json',
                        cache: false, // 禁用缓存，避免请求旧数据
                        success: function(data) {
                            const msg = data.msg || ox.completetxt;
                            $("#xtip").text(escapeHtml(msg));
                            ox.succdo(data);

                            if (data.wantclose !== undefined || ox.autoclose === 1) {
                                $.hidediv(data, eventNamespace);
                            }

                            if (data.wantredir) {
                                const redirUrl = data.redir || ox.redirurl;
                                setTimeout(() => $.refresh(redirUrl), ox.intvaltime);
                            }
                        },
                        error: function() {
                            $("#xtip").text('系统繁忙,请稍后再试...');
                        }
                    });
                }
            } else if (ox.wantclose === 2) {
                const event = getEvent();
                if (!event) return;

                const target = event.target || event.srcElement;
                const url = target.getAttribute("data") || target.data;
                if (!url) return;

                // 校验URL白名单
                const isUrlSafe = ox.ajaxUrlWhitelist.some(prefix => 
                    url.startsWith(prefix) && !url.includes('../')
                );
                if (!isUrlSafe) {
                    alert('无效的请求地址');
                    return;
                }

                const floatdiv = $(`
                    <div class="qirebox-overlayBG" id="qirebox_overlay"></div>
                    <div id="qirebox" class="qirebox png-img">
                        <iframe frameborder="0" class="ui-iframe"></iframe>
                        <table class="ui-dialog-box">
                            <tr>
                                <td>
                                    <div class="ui-dialog">
                                        <div class="ui-dialog-cnt" id="ui-dialog-cnt">
                                            <div class="ui-dialog-tip ${ox.cssname}" id="ui-cnt">
                                                <span id="xtip">${escapeHtml(ox.txt)}</span>
                                            </div>
                                        </div>
                                        <div class="ui-dialog-todo">
                                            <a class="ui-link ui-link-small" href="javascript:void(0);" id="surebt">确定</a>
                                            <a class="ui-link ui-link-small cancelbt" id="cancelbt">取消</a>
                                            <input type="hidden" id="hideval" value=""/>
                                        </div>
                                        <div class="ui-dialog-close"><span class="close">关闭</span></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                `);
                $("body").append(floatdiv);
                $("#qirebox_overlay").fadeIn(500);
                $("#qirebox").fadeIn(500);

                // 绑定关闭相关事件（带命名空间）
                $(document).on(`click${eventNamespace}`, '.ui-dialog-close, .cancelbt', () => {
                    $.closefloatdiv(eventNamespace);
                });

                $(document).on(`click${eventNamespace}`, '#surebt', function(e) {
                    if (!ox.suredo(e)) {
                        $(".ui-dialog-todo").remove();
                        $("#ui-cnt").removeClass('succ error alert').addClass('loading');

                        if (ox.ispost === 0) {
                            $.ajax({
                                url: url,
                                type: 'get',
                                dataType: 'json',
                                cache: false,
                                success: function(data) {
                                    const msg = data.msg || ox.completetxt;
                                    $("#xtip").text(escapeHtml(msg));
                                    ox.succdo(data);

                                    if (data.wantclose !== undefined || ox.autoclose === 1) {
                                        $.hidediv(data, eventNamespace);
                                    }
                                },
                                error: function() {
                                    $("#xtip").text('系统繁忙,请稍后再试...');
                                }
                            });
                        } else {
                            $(`#${ox.formid}`).qiresub({
                                curobj: $(this),
                                txt: '数据提交中,请稍后...',
                                onsucc: function(result) {
                                    ox.succdo(result);
                                    $.hidediv(result, eventNamespace);
                                }
                            }).post({ url: ox.url });
                        }
                    } else {
                        ox.succdo(e);
                    }
                });
            } else {
                const floatdiv = $(`
                    <div class="qirebox_overlayBG" id="qirebox_overlay"></div>
                    <div id="qirebox" class="qirebox">
                        <iframe frameborder="0" class="ui-iframe"></iframe>
                        <div class="ui-dialog">
                            <div class="ui-dialog-cnt" id="ui-dialog-cnt">
                                <div class="ui-dialog-box">
                                    <div class="ui-cnt" id="ui-cnt">${escapeHtml(ox.txt)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                $("body").append(floatdiv);
                $("#qirebox_overlay").fadeIn(500);
                $("#qirebox").fadeIn(500);
            }

            // 遮罩层点击事件
            $('#qirebox_overlay').on(`click${eventNamespace}`, function() {
                $.closefloatdiv(eventNamespace);
                if (pp !== null) {
                    clearTimeout(pp);
                    pp = null; // 清除定时器引用
                }
            });
        },

        // 关闭浮动弹窗
        closefloatdiv: function(namespace = '') {
            $("#qirebox_overlay, #qirebox").remove();
            // 解绑指定命名空间的事件，避免影响其他功能
            $(document).off(namespace);
        },

        // 自动隐藏弹窗
        hidediv: function(e, namespace = '') {
            const oxdefaults = { intvaltime: 1000 };
            const options = { ...oxdefaults, ...e };

            if (e.msg) {
                $("#ui-cnt").text(escapeHtml(e.msg));
            }

            if (parseInt(e.rcode) === 1) {
                $("#ui-cnt").removeClass('loading error alert').addClass('succ');
            } else if (parseInt(e.rcode) < 1) {
                $("#ui-cnt").removeClass('loading alert succ').addClass('error');
            }

            // 清除旧定时器，避免重复执行
            if (pp !== null) clearTimeout(pp);
            pp = setTimeout(() => {
                $.closefloatdiv(namespace);
                pp = null; // 清除引用
            }, options.intvaltime);
        }
    });

    // 扩展表单提交功能
    $.fn.qiresub = function(options) {
        const defaults = {
            txt: '数据提交中,请稍后...',
            redirurl: window.location.href,
            dataType: 'json',
            onsucc: function(e) {},
            onerr: function() {
                $.hidediv({ msg: '系统繁忙' });
            },
            oncomplete: function() {},
            intvaltime: 1000,
            ajaxUrlWhitelist: ['/api/', '/user/', '/comment/']
        };

        const opts = { ...defaults, ...options };
        opts.curobj.attr('disabled', true);
        const ox = opts.curobj.offset();

        $.showfloatdiv({
            offset: ox,
            txt: opts.txt
        });

        const $form = $(this);
        const formId = $form.attr('id');

        return {
            post: function(e) {
                // 验证URL安全性
                if (!opts.ajaxUrlWhitelist.some(prefix => 
                    e.url.startsWith(prefix) && !e.url.includes('../')
                )) {
                    opts.curobj.attr('disabled', false);
                    $.hidediv({ msg: '无效的提交地址' });
                    return;
                }

                $("#ui-cnt").removeClass('succ error alert').addClass('loading');
                $.post(e.url, $form.serializeArray(), function(result) {
                    opts.curobj.attr('disabled', false);
                    opts.onsucc(result);

                    if (result.closediv) {
                        $.closefloatdiv();
                    }

                    if (result.wantredir) {
                        const redirUrl = result.redir || opts.redirurl;
                        setTimeout(() => $.refresh(redirUrl), opts.intvaltime);
                    }
                }, opts.dataType).fail(function() { // 使用fail替代error（jQuery 3.x兼容）
                    opts.curobj.attr('disabled', false);
                    opts.onerr();
                }).always(function() { // 使用always替代complete
                    opts.oncomplete();
                    opts.curobj.attr('disabled', false);
                });
            },

            implodeval: function() {
                if (!formId) return '';
                return $(`#${formId} :input`).map(function() {
                    const name = $(this).attr('name');
                    if (name) {
                        // 使用encodeURIComponent避免特殊字符冲突
                        return `${name}=${encodeURIComponent(escapeHtml($(this).val()))}`;
                    }
                }).get().join('&');
            },

            get: function(e) {
                // 验证URL安全性
                if (!opts.ajaxUrlWhitelist.some(prefix => 
                    e.url.startsWith(prefix) && !e.url.includes('../')
                )) {
                    opts.curobj.attr('disabled', false);
                    $.hidediv({ msg: '无效的请求地址' });
                    return;
                }

                $(".ui-dialog-todo").remove();
                $("#ui-cnt").removeClass('succ error alert').addClass('loading');
                const val = this.implodeval();

                $.get(`${e.url}${val ? '?' + val : ''}`, function(result) { // 使用?拼接参数
                    opts.curobj.attr('disabled', false);
                    opts.onsucc(result);

                    if (result.wantredir) {
                        const redirUrl = result.redir || opts.redirurl;
                        setTimeout(() => $.refresh(redirUrl), opts.intvaltime);
                    }
                }, opts.dataType).fail(function() {
                    opts.curobj.attr('disabled', false);
                    opts.onerr();
                }).always(function() {
                    opts.oncomplete();
                    opts.curobj.attr('disabled', false);
                });
            }
        };
    };

    // AJAX删除功能
    $.fn.ajaxdel = function(options) {
        const defaults = {
            txt: '数据提交中,请稍后...',
            redirurl: window.location.href,
            dataType: 'json',
            onsucc: function(e) {},
            onerr: function() {},
            oncomplete: function() {},
            intvaltime: 3000,
            ajaxUrlWhitelist: ['/api/', '/user/', '/comment/']
        };

        const opts = { ...defaults, ...options };
        const ajurl = $(this).attr('url');

        // 验证URL安全性
        if (!opts.ajaxUrlWhitelist.some(prefix => 
            ajurl.startsWith(prefix) && !ajurl.includes('../')
        )) {
            $.hidediv({ msg: '无效的删除请求地址' });
            return;
        }

        $(".ui-dialog-todo").remove();
        $("#ui-cnt").removeClass('succ error alert').addClass('loading');

        $.ajax({
            url: ajurl,
            success: function(data) {
                opts.onsucc(data);
            },
            error: function() {
                opts.onerr();
            },
            complete: function() {
                opts.oncomplete();
            },
            dataType: 'json'
        });
    };

    // 暴露CheckAll方法到window（保持外部调用兼容性）
    window.CheckAll = CheckAll;

})(jQuery);
