/**
 * Created by lenovo on 2016/1/14.
 */
//$(document).ready(function(){
//    document.getElementById("sendCarButton").style.height = window.screen.width * 0.49 +"px";
//    document.getElementById("havedOrder").style.height = window.screen.width * 0.49 +"px";
//    document.getElementById("sunmiedOrder").style.height = window.screen.width * 0.49 +"px";
//});
window.onload = function(){
    document.getElementById("sendCarButton").style.height = document.getElementById("sendCarButton").offsetWidth + "px";
    document.getElementById("havedOrder").style.height = document.getElementById("havedOrder").offsetWidth + "px";
    document.getElementById("sunmiedOrder").style.height = document.getElementById("sunmiedOrder").offsetWidth + "px";
};
function iWantSendCar(){
    window.location.href = "selectOrder.html";
}
function goBackMain(){
    window.location.href = "OrderAndSendCar.html";
}
function goToBefore(){
    window.history.go(-1);
}
function haveSavedOrder(){
    window.location.href = "haveSavedOrder.html";
}
function haveSubmitOrder(){
    window.location.href = "haveSubmitOrder.html";
}
