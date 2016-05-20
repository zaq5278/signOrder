/**
 * Created by lenovo on 2016/1/28.
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

//动态创建界面并添加时间
var a = 0;
var arr = [];
function creatNode(){
    //获取到表格
    var myDiv = document.getElementById("myDiv");
    var div = document.createElement("div");
    var tb1 = document.createElement("table");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var tb2 = document.createElement("table");
    var tr2 = document.createElement("tr");
    var td11 = document.createElement("td");
    var td22 = document.createElement("td");
    var button1 = document.createElement("button");
    var td23 = document.createElement("td");
    var button2 = document.createElement("button");
    div.className = "div";
    tb1.className = "tb";
    tb2.className = "tb2";
    td1.innerHTML = "订单号:";
    td1.className = "allTd";
    td2.innerHTML = "54545-1111";
    td2.className = "otherTD";
    td3.innerHTML = "订单总量:";
    td3.className = "allTd";
    td4.innerHTML = "2550";
    td4.className = "otherTD";
    td5.innerHTML = "已发货";
    td5.className = "lastTD";
    td11.innerHTML = "2015-01-28 15:36";
    td11.className = "td11";
    button1.innerHTML = "单据详情";
    button1.id = "button1";
    button2.innerHTML = "订单评价";
    button2.id = "button2";
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    tr1.appendChild(td5);
    tb1.appendChild(tr1);
    td22.appendChild(button1);
    td23.appendChild(button2);
    tr2.appendChild(td11);
    tr2.appendChild(td22);
    tr2.appendChild(td23);
    tb2.appendChild(tr2);
    div.appendChild(tb1);
    div.appendChild(tb2);
    myDiv.appendChild(div);
    button1.addEventListener("click",function(){
       window.location.href = "../signOrderDetail1.html";
    });
    button2.addEventListener("click",function(){
        window.location.href = "../evaluationTheSignOrder1.html";
    });
}

