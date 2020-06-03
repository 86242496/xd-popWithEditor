!(function ($, window, document, undefined) {
    var Dimension = 'width', Position = 'right', Display = 'display', document = $(document), documentWidth = $(document).width();
    function xdPopWithEditor(ele, options) {
        //默认参数设置
        this.defaults = {
            editorOpt:[
                'head',
                'bold',
                'italic',
                'underline'
            ],
            popClose: function () { }
        };
        //合并传入的参数
        this.options = $.extend({}, this.defaults, options || {});
        //标记当前对象
        this.$ele = ele;
        //执行初始化操作
        this.init();

    }
    xdPopWithEditor.prototype = {
        init: function () {
            //初始化操作
            this.getPosition();
        },
        // 获取当前元素垂直高度和水平高度
        getPosition: function () {

            var _this = this;
            this.$ele.each(function (index) {
                $(this).on('click', function () {
                    console.log(index, 'index')
                    _this.editorHtml(index);
                })
            })
        },
        editorHtml: function (index) {
            var _this = this;
            $('body').append('<div id="popEdior" style="margin:15px;height:300px"></div>');
            var E = window.wangEditor
            var editor = new E('#popEdior')
            // editor.customConfig.pasteFilterStyle = false
            // 自定义菜单配置
            editor.customConfig.menus = this.options.editorOpt;
            editor.customConfig.pasteTextHandle = function (content) {

                return content
            }
            editor.create()
            layer.open({
                type: 1,
                shade: [0.5],
                area: ['70%', '420px'],
                title: false, //不显示标题
                btn: ['确定', '取消'],
                content: $('#popEdior'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                yes: function () {

                    layer.closeAll();
                    _this.options.popClose(editor.txt.html())
                    _this.$ele.eq(index).val(editor.txt.html());
                    $('#popEdior').remove();
                },
                btn2: function (index, layero) {
                    //按钮【按钮二】的回调

                    //return false 开启该代码可禁止点击该按钮关闭


                    $('#popEdior').remove();
                },
                cancel: function (rse) {


                    $('#popEdior').remove();

                    //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
                }
            });
        },
        handleButtons: function () {
            var _this = this;
            $('.xd-tooltips').find('.xd-buttons').on('click', function () {
                _this.options.callback($(this).index())
            })
        },
        // 点击添加或者生成的按钮之外的区域时，移除生成的部分
        closeThis: function () {
            document.on('click', function (e) {
                if (!$(e.target).closest('.xd-tooltipcon,.xd-tooltips').length) {
                    $(".xd-tooltips").remove();
                }
            })
        },
        // 提示框
        toast: function () {
            $('body').append('<div class="splittoast">类型错误</div>');
        },
        isEmpty: function (obj) {
            if (obj == '' || obj == null || obj == undefined) {
                return true;
            }
            return false;
        },
        otherFn: function () {
            //定义可调用方法

            return this.$ele;//返回当前对象供链式调用
        }
    }
    $.fn.xdPopWithEditor = function (options) {
        return new xdPopWithEditor(this, options);
    };
})(jQuery, window, document);
