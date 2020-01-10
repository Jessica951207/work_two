$(function(){
    var popupHeight = $(window).height();
    $('.popupContent').height(popupHeight *0.77);

    /*轮播*/
    // var swiper = new Swiper('.swiper-container', {
    //     // observer: true,                  //修改swiper自己或子元素时，自动初始化swiper
    //     // observeParents: true,            //修改swiper的父元素时，自动初始化swiper
    //     touchRatio: 0.8,                   //解决滑动卡顿
    //     // longSwipesRatio:0.1
    //     effect : 'slide',
    // });
    var answerId = ['1','2','3','4','5'];
    var answerQuestion = [['A','B','C','D'],['A','B','C','D'],['A','B','C','D'],['B','C','D'],['B','C']];
    // 选中改编颜色逻辑
    for(var val in answerId){
        $('input[name='+answerId[val]+']').click(function (){
            $("input[type='radio']").each(function(){
                if(this.checked){
                    $(this).next().css('color','#f2d176');
                } else {
                    $(this).next().css('color','#fff');
                }
            });
        });
    }
    $("input[name='5']").click(function () {
        var answers = []
        for(var val in answerId) {
            $('input[name='+answerId[val]+']:checked').each(function () {
                answers.push($(this).val())
            })
        }
        if(answers.length !== 5){
            setTimeout(function () {
                $('#failPopup').show()
            },500)
            // $('#failPopup').show()
        } else {
            var allCorrectStatus = true;
            (function (data, answer) {
                for (var val in data) {
                    if (answer[val].indexOf(data[val]) === -1) {
                        allCorrectStatus = false
                        break;
                    }
                }
            })(answers, answerQuestion)
            if (allCorrectStatus) {
                // $('#successPopup').show()
                setTimeout(function () {
                    // alert('全部答对')
                    $('#successPopup').show()
                },500)
            } else {
                // $('#failPopup').show()
                setTimeout(function () {
                    $('#failPopup').show()
                },500)
            }
        }
    })
    // // 阻止modal框冒泡
    // $('.popupContent').click(function (e) {
    //     e.stopPropagation()
    // })
    $('#success_pop').click(function () {
        $('#successPopup').hide()
    });
    $('#fail_pop').click(function () {
        $('#failPopup').hide()
    });
    // 跳转连接
    $('.clickBuy').click(function () {
        window.location.href = "https://weidian.com/item.html?itemID=3043092786"
    })
});

// function closePopup(id) {
//     $("#"+ id).hide()
// }
