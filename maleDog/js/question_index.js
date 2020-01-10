$(function(){
    /*轮播*/
    // var swiper = new Swiper('.swiper-container', {
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },
    // });

    var answerId = ['1','2','3','4','5'];
    var answerQuestion = ['B','D','A','C','A'];
    $('#submit').click(function () {
        var answers = []
        for(var val in answerId) {
            $('input[name='+answerId[val]+']:checked').each(function () {
                answers.push($(this).val())
            })
        }
        if(answers.length !== 5){
            alert('请务必填写完整')
        } else {
            var allCorrectStatus = true;
            (function (data, answer) {
                for(var val in data){
                    if(data[val] !== answer[val]){
                        allCorrectStatus = false
                        break;
                    }
                }
            })(answers, answerQuestion)
            if(allCorrectStatus){
                alert('全部答对')
            } else {
                alert('很遗憾')
            }
        }
    })
});

