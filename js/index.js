$(function () {
    $('.container').fullpage({
        /*1.默认顶部对齐*/
        verticalCentered: false,
        /*2.右侧的导航*/
        navigation: true,
        /*3.配置纵向每一屏的颜色 数组*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        /*4.滚完成回调 */
        afterLoad: function (link, index) {
            /*显示 更多操作区域 */
            if(index < 8){
                $('.more').fadeIn();
            }
            /*给当前的屏幕加载now执行动画*/
            /*console.log(index);
            console.log($('.section').eq(index - 1));*/
            /*console.log($(this));*/
            $(this).addClass('now');
        },
        /*5. 离开屏幕的回调 */
        onLeave: function (index,nextIndex,direction) {
            /*隐藏 更多操作区域 */
            $('.more').hide();
            /*第二屏到第三屏沙发动画*/
            if(index == 2 && nextIndex == 3){
                $('.section:eq(1) .sofa').addClass('animated');
            }
            /*第三屏到第四屏沙发动画*/
            else if(index == 3 && nextIndex == 4){
                $('.section:eq(2) .sofa').addClass('animated');
            }
            /*第五屏到第六屏沙发动画盒子动画*/
            else if(index == 5 && nextIndex == 6){
                /*eq的索引  index 是序号*/
                $('.section:eq(4) .sofa').addClass('animated');
                $('.section:eq(5) .box').addClass('animated');
            }
            /*第六屏到第七屏评价*/
            else if(index == 6 && nextIndex == 7){
                $('.section:eq(6) .star img').each(function (i,item) {
                    /*delay()动画之前调用 做延时 单位是毫秒*/
                    $(item).delay(i*500).fadeIn();
                    /*问：动画执行时间 jqueyr动画fadeIn默认执行时间多少 （400 normal）fast 200 slow 600 */
                });
            }
        },
        /*6. 控制动画切换时间*/
        scrollingSpeed:1000,
        /*7. 页面架构加载完成*/
        afterRender:function () {
            /*监听第四屏购物车的动画结束事件*/
            $('.section:eq(3) .cart').on('animationend',function () {
                /*显示收货地址容器*/
                /*fadeIn([speed],[easing],[fn])  200 linear|swing callback */
                $('.section:eq(3) .address').fadeIn(500,'linear',function () {
                    $(this).find('img:eq(1)').fadeIn();
                });
                /*换个文字*/
                $('.section:eq(3) .text').find('img:eq(0)').hide();
                $('.section:eq(3) .text').find('img:eq(1)').fadeIn(500);
            });
            /*点击更多切换下一屏*/
            $('.more').on('click',function () {
                /*that 指向插件对象  插件对象没有moveSectionDown*/
                /*指向插件对象 fullpage jquery插件*/
                /*$.fn jquery提供扩展第三方方法（插件方法）的入口 */
                /*$.fn.fullpage = function(){} */
                /*$.fn.fullpage.moveSectionDown = function(){} 封装插件更多的方法*/
                $.fn.fullpage.moveSectionDown();
            });

            /*第八屏的需求*/
            /*1. 手需要跟着鼠标移动*/
            $('.section:eq(7)').on('mousemove',function (e) {
                /*获取鼠标的当前坐标 基于页面pageX/Y  基于屏幕screenX/Y  基于窗口clientX/Y */
                /*把坐标给手做定位*/
                /*注意：基于content 但是需要基于页面 放在content之外*/
                $(this).find('.hand').css({
                    left:e.pageX,
                    top:e.pageY + 20
                });
            }).on('click','.again',function () {
                /*2. 点击再来一次  跳的第一屏  重置所有动画  （不要去刷新页面 a链接  location.reload() ）*/
                /*跳的第一屏*/
                $.fn.fullpage.moveTo(1);
                /*重置动画*/
                /*考虑：我们自己的动画实怎么实现的？*/
                /*1. 加了now类 控制了动画 滚动到第几屏*/
                $('.section.now').removeClass('now');
                /*2. 加了animated 控制了动画 离开屏幕的动画*/
                $('.section').find('.animated').removeClass('animated');
                /*3. show() hide() fade* slide* animate() jquery 加了行内样式  去掉行内样式就是重置*/
                $('.section').find('[style]').removeAttr('style');
            })
        }
    });
});
/*需求：在页面滚动完成  当前页面的动画开始执行  更多的区域淡入（离开上一屏的时候隐藏） */
/*分析：掐时间点  js 一般都是事件，回调函数  afterLoad 滚完成回调 onLeave离开屏幕的回调 */