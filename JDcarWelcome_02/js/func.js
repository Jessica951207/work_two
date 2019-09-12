var province,homeCity;

/*清楚Safari浏览器缓存,据说是有用的*/
if (isSafari()) {
    $(window).bind("pageshow", function (event) {
        if (event.originalEvent.persisted && $('body').hasClass("no-cache")) {
            document.body.style.display = "none";
            window.location.reload();
        }
    });
}

function isSafari() {
    if (navigator.userAgent.indexOf("Safari") > -1) {
        return true;
    }
    return false;
}

//对当前页面访问人数统计
function addMobtechVisitors() {
    $.ajax({
        //todo later 联调时更改URL
        url: '/zlhj_interface/loan/addJdCarLoanVisitors',
        //url: './mock.json',
        type: 'get',//todo later 更改为post
        data: {"ip":returnCitySN["cip"], "cityId":returnCitySN["cid"], "cityName":returnCitySN["cname"], "type":"8"},
        success: function (data) {
            alert('计数成功');
        },
        error: function (data) {
            console.log('调用失败');
        }
    });
}

$(document).ready(function(){
    /*车辆品牌*/
    $('#brand').click(function () {
        // todo later 联调时更改URL
        $.ajax({
            url: '/zlhj_interface/vehicles/getBrandList',
            //url: './mock.json',
            type: 'get',//todo later 更改为post
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            data: JSON.stringify({"ceInitial": "", "pageNum": "", "pageSize": ""}),
            success: function (res) {
                $('.firstAppend').html("");
                $('.appendOften').html("");
                $('.appendAll').html("");
                $('.popup').show();
                for(var val in res.brandList){
                    var str = "    <div class=\"brands\">\n" +
                        "                        <p>"+res.brandList[val].ceName+"</p>\n" +
                        "                    </div>";
                    $(".firstAppend").append(str);
                    //console.log("我渲染了");
                }
                /*把选择的品牌赋给input的值，且关闭所有品牌页面*/
                $('.brands').each(function (index,element) {
                    //console.log("我遍历了");
                    $(this).click(function () {
                        $('#brand').val($(this).find('p').text());
                        $('.popup').hide();
                    })
                })
                //console.log("wwwwwwwwww",$('.car_all .brands p'));
            },
            error: function (err) {
               alert("服务器正忙！")
            }
        });

    });


    /*申请额度，且把选中的内容赋给input的值*/
    $('.limit_item').each(function (index,element) {
        $(this).click(function () {
            $(this).addClass('limit_checked');
            $(this).siblings().removeClass('limit_checked');
            $('#loan').val($(this).attr("value"));
        })
    });


});


/*搜索框实时显示*/
function HandleSearch(){
    $('.appendOften').html("");
    $('.appendAll').html("");

    var searchData = $('#search').val();
    var curOften = []
    var curAll = []

    if(searchData != ''){
        $('.oftenCar .brands').hide();
        $('.firstAppend .brands').hide();

        //把常用车辆放到数组oftenArr里
        var oftencar = $('.oftenCar .brands p');
        var oftenArr = [];
        oftencar.each(function (index,element) {
            oftenArr.push($(this).text());
        })
        //匹配符合的车辆，放到数组curOften里
        for(var val in oftenArr){
            if(oftenArr[val].indexOf(searchData)>-1){
                curOften.push(oftenArr[val]);
            }
        }
        //console.log('现在的常用车辆',curOften);
        //把匹配符合的车辆追加到html
        $('.appendOften').html("");
        for(var val in curOften){
            var str = "    <div class=\"brands\">\n" +
                "                        <p>"+curOften[val]+"</p>\n" +
                "                    </div>";
        }
        $(".appendOften").append(str);

        //把所有车辆放到数组allArr里
        var allcar = $('.firstAppend .brands p');
        var allArr = [];
        allcar.each(function (index,element) {
            allArr.push($(this).text());
        })
        //console.log("qqqqqqqqq",allArr);
        //匹配符合的车辆，放到数组curAll里
        for(var val in allArr){
            if(allArr[val].indexOf(searchData)>-1){
                curAll.push(allArr[val]);
            }
        }
        //console.log('现在的所有车辆',curAll);
        $('.appendAll').html("");
        for(var val in curAll){
            str = "    <div class=\"brands\">\n" +
                "                        <p>"+curAll[val]+"</p>\n" +
                "                    </div>";
            $('.appendAll').append(str);
        }

        /*把选择的品牌赋给input的值，且关闭所有品牌页面*/
        $('.brands').each(function (index,element) {
            $(this).click(function () {
                $('#brand').val($(this).find('p').text());//把选择的内容赋给品牌
                $('.popup').hide();
                $('#search').val("");//清空搜索框内的内容
                $('.oftenCar .brands').show();
            })
        })


    }else {
        $('.oftenCar .brands').show();
        $('.firstAppend .brands').show();
    }

}

/*关闭所有品牌页面*/
$('.cancel').click(function () {
    $('.popup').hide();
    $('#search').val("");//清空搜索框内的内容
    $('.oftenCar .brands').show();
});

/*短信验证*/
$('.get_verify').click(function () {
    /*先填写手机号，且进行验证*/
    var phoneNum = $('#phone').val();
    if(phoneNum == ""){
        $('#phone').siblings('.error-message').show();
        $('#phone').siblings('.error-message').html($('#phone').data('missing'));
        setTimeout(function () {
            $('#phone').siblings('.error-message').fadeOut();
        },1000)
    }else if(!checkMobile(phoneNum)){
        $('#phone').siblings('.error-message').show();
        $('#phone').siblings('.error-message').html($('#phone').data('invalid'));
        setTimeout(function () {
            $('#phone').siblings('.error-message').fadeOut();
        },1000)
    }else {
        $.ajax({
            //todo later 联调时更改URL
            url: '/zlhj_interface/user/validate?phone=' + phoneNum + '&flag='+"JD"+'',
            //url: "./mock.json",
            dataType: "json",
            contentType: "application/json",
            type: "get",
            success: function (data) {
                $('.success-message').html("验证码发送成功!");
                setTimeout(function () {
                    $('.success-message').fadeOut();
                    $('.get_verify').hide();
                    $('#no-repeat').show();
                },1000);
                var time = 60 ;
                setInterval(function () {
                    $('#no-repeat').html(time + '秒');
                    time--;
                    if(time <= 0 ){
                        clearInterval();
                        $('.get_verify').show();
                        $('#no-repeat').hide();
                    }
                }, 1000)
            },
            error: function () {

            },
        });
    }

})


/*立即申请*/
$(".button").click(function () {
    var Input_label = $(".item_data");
    var InputArray = [];
    Input_label.each(function (index, element) {
        InputArray.push($(this).val());
    })
    for (var val in InputArray){
            if(InputArray[val] == ''){
                $(Input_label[val]).siblings('.error-message').show();
                $(Input_label[val]).siblings('.error-message').html($(Input_label[val]).data('missing'));
                setTimeout(function () {
                    $(Input_label[val]).siblings('.error-message').fadeOut();
                },1000);
                submit = false;
                break;
            }
            // 手机号验证
             if(!checkMobile(InputArray[val]) && (val == 5)){
                $(Input_label[val]).siblings('.error-message').show();
                $(Input_label[val]).siblings('.error-message').html($(Input_label[val]).data('invalid'));
                setTimeout(function () {
                    $(Input_label[val]).siblings('.error-message').fadeOut();
                },1000);
                submit = false;
                console.log("手机号也验证啦！")
                 break;
            }
            // 验证码输入验证
             if(!checkCode(InputArray[val]) && (val == 6)){
                $(Input_label[val]).siblings('.error-message').show();
                $(Input_label[val]).siblings('.error-message').html($(Input_label[val]).data('invalid'));
                setTimeout(function () {
                    $(Input_label[val]).siblings('.error-message').fadeOut();
                },1000);
                submit = false;
                console.log("验证码也验证啦！")
                 break;
            }
            /*基于前面所有的验证都通过了，才执行此次提交行为；不能用else，因为前面不满足就必然会执行*/
            if(checkCode(InputArray[val]) && (val == 6)) {
                $(Input_label[val]).siblings('.error-message').empty();
                submit = true;
                 $.ajax({
                     url:"/zlhj_interface/web/loan",
                     //url: './mock.json',
                     type:"get",//todo later 更改为post
                     data: JSON.stringify({'businessProvince':province,'businessCity':homeCity,'validateCode': InputArray[6],'remark1':InputArray[2],'loanAmount':InputArray[4], 'mainLiveCity':homeCity, 'mainLiveProvince':province, 'mainPhone':InputArray[5]}),
                     success:function (data) {
                         console.log("提交成功！")
                         if (data.resCode == 200 && data.data == 1) {
                             window.location.href = '../web/JD_car_apply_loan_success.html?goToSuccessFlag=1';
                         }else if(data.resCode == 400){
                             $('.application .error-message')(data.resMessage);
                             setTimeout(function () {
                                 $('.application .error-message').fadeOut();
                             },1000)
                         }
                     },
                     error:function () {
                         $('.application .error-message').html("提交失败,请稍后再试");
                         setTimeout(function () {
                             $('.application .error-message').fadeOut();
                         },1000)
                     }
                 })
            }
    }

})

// 手机号验证方法
function checkMobile(data){
    return /^1[345789]\d{9}$/.test(data);
}
// 验证码输入验证方法
function checkCode(data){
    return /^\d{6}$/.test(data);
}





