

////////////全局变量/////////////
var i = 0;
var functionArray = JSON.parse(localStorage.functionArray);
var orderName;
////////////////////////////////
function creatNode(){
    var myDiv = document.getElementById("myDiv");
    var btn = document.createElement("button");
    btn.className = "button";
    btn.setAttribute("data-role","none");
    btn.name = orderName;
    if (btn.name == "派车"){
        btn.style.backgroundImage = "url('img/paiche.png')";
    } else if(btn.name == "订单签收"){
        btn.style.backgroundImage = "url('img/qianshou.png')";
    }

    //btn.innerHTML = orderName;
    myDiv.appendChild(btn);
    btn.onclick=function(){
      if (btn.name == "派车"){
          window.location.href = "sendACar.html";
      } else if(btn.name == "订单签收"){
          window.location.href = "signOrder.html";
      }
    };


}
function goOut() {
    localStorage.sessionid = '';
    localStorage.functionArray = '';
    window.location.href = 'login.html';
    // $.ajax({
    //     url:myUrl+"synear/userServiceController.do?apploginout",
    //     timeout : 120000,
    //     type : 'get',
    //     dataType:'jsonp',
    //     // data :{
    //     //     sessionid:localStorage.sessionid
    //     // },
    //     success:function(result){
    //         if(result.msgCode == "0001"){
    //
    //         }else {
    //
    //         }
    //         for(var i in result) {
    //            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.
    //         }
    //     },
    //     complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
    //         if(status=='timeout'){//超时,status还有success,error等值的情况
    //             alert("请求超时！");
    //         }
    //     }
    // });
}
