//设置字体大小
function set_size() {
    $("html").css({"font-size": $(window).width() >= 750 ? 20 : ($(window).width() / 750 * 24)})
}
$(window).resize(set_size);


$(function () {
    set_size();
    //轮播
    var swiper1 = new Swiper('#swiper1',{
        direction : 'vertical',
        followFinger : false,
        speed:500,
        mousewheel: true,
        on:{
            init:function(swiper){
                slide=this.slides.eq(0);
                slide.addClass('ani-slide');
                console.log(this.slides);
            },
            transitionStart: function(){
                for(i=0;i<this.slides.length;i++){
                    slide=this.slides.eq(i);
                    slide.removeClass('ani-slide');
                }
            },
            transitionEnd: function(){
                slide=this.slides.eq(this.activeIndex);
                slide.addClass('ani-slide');
                //console.log(this.activeIndex);
            },
        }
    });

    var swiper2 = new Swiper('#swiper2',{
        speed:800,
        loop:true,
       /* allowTouchMove:true,*/
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });




    /*手机导航显示消失*/
    $('.nav_icon').toggle(function () {
        $('.menu_mb').slideDown();
    },function () {
        $('.menu_mb').slideUp();
    });

    /*媒体内容显示消失*/
    $('.icon_change').toggle(function () {
        $(this).addClass('change_rotate');
        $(this).parent('.detail_top').next().show();
        $(this).parent('.mb_show').next().show();
    },function () {
        $(this).removeClass('change_rotate').addClass('add_icon');
        $(this).parent('.detail_top').next().hide();
    });

    /*管理团队内容显示消失*/
    $('.open').toggle(function () {
        $(this).addClass('change');
        $(this).parent('.item').next().show();
    },function () {
        $(this).removeClass('change').addClass('add_icon');
        $(this).parent('.item').next().hide();
    });


    $('.close').click(function () {
        $(".popup").hide();
    })

    $('.PrimaryJava').click(function () {
        $("#PrimaryPopup").show();
    })
    $('.MiddleJava').click(function () {
        $("#MiddlePopup").show();
    })
    $('.TestJob').click(function () {
        $("#TestPopup").show();
    })
    $('.Operation').click(function () {
        $("#OperationPopup").show();
    })
    $('.CreditLoan').click(function () {
        $("#LoanPopup").show();
    })
    $('.AccountMan').click(function () {
        $("#AccountManPopup").show();
    })
    $('.AccountGroup').click(function () {
        $("#AccountGroupPopup").show();
    })


});
