/**
 * Created by lenovo on 2016/1/15.
 */
function goBackMain(){
    window.location.href = "OrderAndSendCar.html";
}
function goToBefore(){
    window.history.go(-1);
}
//function goSendACarDetail(){
//    window.location.href = "sendACarDetail.html";
//}


/////////////全局变量//////////////////////////////////
var a = 0;
var  i = 0;
var isCheck = false;
var orderSummary = null;
var rows = [];
var orderSummaryArray = [];//存放要sessionStorage中的数据的全局变量
/////////////////////////////////////////////////////
function goSendACarWithTable(){
    if (orderSummaryArray.length > 0){
        window.location.href = "sendCarWithTable.html";
    }else{
        alert("请选择订单！");
    }

}
function checkOrder(){
    if (isCheck){
        //清空数组
        orderSummaryArray = [];
        a = 0;//清空数组的同时也需要把点击的变量重置为0
    }
    isCheck = true;
    $.ajax({
        url:myUrl+'sendmanagerServiceController.do?getSapSaleOrderList',  //请求的URL
        timeout : 120000,
        type : 'get',  //请求方式，get或post
        data :{
            sessionid:localStorage.sessionid,
            ordercode:document.getElementById("ordercodeInput").value,
            createDate:document.getElementById("beforeDate").value,
            ordertime:document.getElementById("nowDate").value
        },  //请求所传参数，json格式
        dataType:'jsonp',//返回的数据格式
        success:function(result){ //请求成功的回调函数
            if(result.msgDesc == "需要重新登录！"){
                localStorage.sessionid = '';
                localStorage.functionArray = '';
                alert(result.msgDesc);window.location.href = "login.html";
            }else {
                rows = result.rows;
                //获取到表格
                var myDiv = document.getElementById("myDiv");
                if (rows.length) {
                    myDiv.innerHTML = "";
                    for (i = 0; i < rows.length; i++) {//这里的i必须是全局变量否则input.name不能动态赋值
                        orderSummary = rows[i];
                        creatNode();//这里必须使用方法调用否则input不能动态创建
                    }
                } else {
                    myDiv.innerHTML = "暂无数据！";
                    myDiv.style.textAlign = "center";
                }
            }
            hideLoading();
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                hideLoading();
                alert("请求超时！");
            }
        }
    });
}

function creatNode(){
    //获取到表格
    
    var myDiv = document.getElementById("myDiv");
    var div = document.createElement("div");
    //创建每个表格内容
    var tb1 = document.createElement("table");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");
    var input = document.createElement("input");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var tb2 = document.createElement("table");
    var tr2 = document.createElement("tr");
    var td11 = document.createElement("td");
    var td22 = document.createElement("td");
    var td33 = document.createElement("td");
    var td44 = document.createElement("td");
    var tb3 = document.createElement("table");
    var tr3 = document.createElement("tr");
    var b1 = document.createElement("b");
    var td13 = document.createElement("td");
    var td23 = document.createElement("td");
    var b2 = document.createElement("b");
    //设置属性
    div.className="div";
    input.type="checkbox";input.className="myInput";
    //input.setAttribute("data-role","none");
    var inputStr = JSON.stringify(rows[i]);//转化成字符串并把需要存储的数据给input的name属性
    input.name = inputStr;
    td2.className="td2";
    td2.innerHTML="订单号:";
    td3.className="otherTd";
    td3.innerHTML = orderSummary.ordercode;
    td4.className="td2";
    td4.innerHTML="到货地:";
    td4.id="td4";
    td5.className="otherTd";
    td5.innerHTML = orderSummary.dhd;
    tb2.id="tb2";
    td11.innerHTML="实际件数:";
    td11.className="td11";
    td22.innerHTML= orderSummary.nnumber;
    td22.className="otherTd";
    td33.innerHTML="标准件数:";
    td33.className="td11";
    td44.innerHTML= parseFloat(orderSummary.tj).toFixed(3);
    td44.className="otherTd";
    tb3.id="tb3";
    td13.id="td13";
    b1.innerHTML="客户名称:";
    td23.id="td23";
    b2.innerHTML= orderSummary.custname;
    b2.id="b2";
    //父子视图关系添加
    td1.appendChild(input);
    td13.appendChild(b1);
    td23.appendChild(b2);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    tr1.appendChild(td5);
    tb1.appendChild(tr1);
    tr2.appendChild(td11);
    tr2.appendChild(td22);
    tr2.appendChild(td33);
    tr2.appendChild(td44);
    tb2.appendChild(tr2);
    tr3.appendChild(td13);
    tr3.appendChild(td23);
    tb3.appendChild(tr3);
    div.appendChild(tb1);
    div.appendChild(tb2);
    div.appendChild(tb3);
    myDiv.appendChild(div);

    input.addEventListener("click",function(){
        var isSelect = false;//定义一个布尔类型的值判断数组中是否有相同的对象
        var re = 0;//定义一个变量接收再次点击存在相同数据在数组中的位置
        //orderSummaryArray代表的是存储input.name的数据的数组
        for (var num = 0;num < orderSummaryArray.length;num++){
            if(input.name == orderSummaryArray[num]){
                isSelect = true;
                re = num;
            }
        }
        if (!isSelect){
            orderSummaryArray[a] = input.name;
            a++;//如果没有存储过就让数组扩大1
        }else{
            orderSummaryArray.splice(re,1);
            a--;//删除过元素之后再把数组的大小减少1
        }
        var rowStr = JSON.stringify(orderSummaryArray);
        sessionStorage.orderSummaryArray = rowStr;
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
