/**
 * Created by lenovo on 2016/1/27.
 */

function goBackMain(){
    window.location.href = "OrderAndSendCar.html";
}
function goToBefore(){
    window.history.go(-1);
}
////重选订单
//function backSelectOrder(){
//    window.location.href = "selectOrder.html";
//}
//$(document).ready(function(){
//   document.getElementById("dateInput").addEventListener("click",function(){
//
//   });
//});
function saveTheOrder(){
    var value1 = document.getElementById("areaSelect").value;
    var value2 = document.getElementById("driverInput").value;
    var value3 = document.getElementById("phoneInput").value;
    var value4 = document.getElementById("time").value;
    if (value2.length > 1 && value1 && value3.length == 11 && value4){
        window.location.href = "saveTheOrder.html";
    }else{
        //if (value2.length < 10){
        //    alert("您输入的手机号长度不正确！");
        //}else{
        alert("请您查看输入信息是否完整！");
        //}
    }
}
function tableCreateNode(){
    var myTable = document.getElementById("selectedTable");
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td1.innerHTML = "1000377841";
    td2.innerHTML = "盘锦市";
    td3.innerHTML = "10000";
    td4.innerHTML = "1356.440";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    myTable.appendChild(tr);
}
function addLastNode(){
    var myTable = document.getElementById("selectedTable");
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var b1 = document.createElement("b");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var b3 = document.createElement("b");
    var td4 = document.createElement("td");
    var b4 = document.createElement("b");
    b1.innerHTML = "合计";
    b3.innerHTML = "23122";
    b4.innerHTML = "32323";
    td1.appendChild(b1);
    td3.appendChild(b3);
    td4.appendChild(b4);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    myTable.appendChild(tr);
}
////配车成功
//function sendSuccess(){
//    var value1 = document.getElementById("areaSelect").value;
//    var value2 = document.getElementById("phoneInput").value;
//    var value3 = document.getElementById("time").value;
//    if (value1 && value2.length == 11 && value3){
//        window.location.href = "sumbitSuccess.html";
//    }else{
//        //if (value2.length < 10){
//        //    alert("您输入的手机号长度不正确！");
//        //}else{
//        alert("请您查看输入的信息是否完整！");
//        //}
//    }
//}
