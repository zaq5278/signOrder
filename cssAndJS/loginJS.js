/**
 * Created by lenovo on 2016/1/13.
 */



function login(){
    var userName = document.getElementById("userName");
    var passWord = document.getElementById("passWord");
    $.ajax({
        url:myUrl+"userServiceController.do?applogin",
        timeout : 120000,
        type : 'get',
        dataType:'jsonp',
        data :{
            userName:userName.value ,
            passWord:passWord.value
        },
        success:function(result){
            if(result.msgCode == "0001"){
                localStorage.sessionid = result.sessionid;
                // alert(localStorage.sessionid);
                localStorage.functionArray = JSON.stringify(result.function);
                window.location.href = "OrderAndSendCar.html";
                hideLoading();
            }else {
                hideLoading();
                alert("帐号或密码错误！");
            }
            //for(var i in result) {
            //    alert(i+":"+result[i]);//循环输出a:1,b:2,etc.
            //}
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                hideLoading();
                alert("请求超时！");
            }
        }
    });
}

$( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
    html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        textonly: textonly,
        html: html
    });
});
//隐藏loading
function hideLoading() {
    $.mobile.loading( "hide" );
}
