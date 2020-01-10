/**
 * date:2019/11/18
 * author:tzm
 * description:拦截前端所有请求
 */
hookAjax({
    //拦截回调
    onreadystatechange:function(xhr){
        console.log("onreadystatechange called: %O",xhr);
        console.log(`回调状态：${xhr.status}`);
        if (xhr.status===401){
            layer.alert('登录已过期，请重新登录！', {
                skin: 'layui-layer-molv' //样式类名
                , closeBtn: 0
            }, () => {
                window.location = '/crm/page/login.html';
            });
            return true;
        }
    },
    onload:function(xhr){
        console.log("onload called: %O",xhr);
        console.log(`回调状态：${xhr.status}`);
        if (xhr.status===401){
            layer.alert('登录已过期，请重新登录！', {
                skin: 'layui-layer-molv' //样式类名
                , closeBtn: 0
            }, () => {
                window.location = '/crm/page/login.html';
            });
            return true;
        }
    },
    //拦截方法
    open:function(arg,xhr){
        console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2])
    }
})