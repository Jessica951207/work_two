$(function () {
	"use strict";
	var init = 1;
    $(".container section").ImageSwitch({
        //动画时间 单位：毫秒
        Speed: 300,
        //切换方向 可选方向：vertical、horizontal
        direction: "vertical",
        //开启触控
        Touch: !0,
        //触控配置 可选参数：left、right、up、down
        TouchDirection: [80, "up", "down"],
        //动画版本 可选版本：CSS2、CSS3
        Compact: "CSS3",
        //动画曲线（需动画版本为CSS3） 可选参数请参照CSS3的动画曲线
        Curve: "ease-out",
        //是否启用状态切换
        Stat: !0,
        //回调函数上一个
        Prevcallback: function () {
            init--;
            $(".stepChange a").eq(init).removeClass("active");

        },
        //回调函数下一个
        Nextcallback: function () {
            init++;
           for(var i = 0; i < init; i++){
               $(".stepChange a").eq(i).addClass("active");
           }

        }
    });
    $(document).Platform({
        iphone: function () {
            $("html").addClass("iphone");
        },
        android: function () {
            $(".stepChange").css('transform','scale(0.8)');
        },
        google: function () {
            $(".stepChange").css('transform','scale(0.8)');
        },
    })

});
