/**
 * Created by lenovo on 2016/1/18.
 */
function goBackMain(){
    window.location.href = "OrderAndSendCar.html";
}
function goToBefore(){
    window.history.go(-1);
}
//重选订单
function backSelectOrder(){
    window.location.href = "selectOrder.html";
}
///////////////////全局变量///////////////////////
var arr = sessionStorage.orderSummaryArray;
var array = JSON.parse(arr);
var i = 0;
var number1 = 0,number2 = 0;
var fstatus;
//////////////////////////////////////////////////
//保存派车单
function saveTheOrder(){
    var carNumberInput = document.getElementById("carNumberInput").value;
    var driverInput = document.getElementById("driverInput").value;
    var phoneInput = document.getElementById("phoneInput").value;
    var time = document.getElementById("time").value;
    var isHeChe = document.getElementById("isHeChe").value;
    var carType = document.getElementById("carType").value;
    if (time.length>10){
        var newTime = time.substr(0,16) + ":00";
    }else {
        newTime = "";
    }
    fstatus = "N";
    var isHeCheYN;
    if (isHeChe == "是"){
        isHeCheYN = "Y";
    }else {
        isHeCheYN = "N";
    }

    var data = array[0];
    var detail = JSON.parse(data);//再次把字符串转换成对象
    var str = array[0].replace("pk_corp","pkCorp");
    for(var b = 0;b<array.length;b++){
        if (b>0){
            str = str + "," + array[b].replace("pk_corp","pkCorp");
        }
    }
    var newStr = "[" + str + "]";
    var url = myUrl+"sendmanagerServiceController.do?doAdd";
    var JSONP =document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src=url+ "&sessionid=" + localStorage.sessionid + "&fstatus=" + fstatus + "&devicetype=1" + "&sendcorpcode=" + detail.sendcorpcode + "&sendcorpname=" + detail.sendcorpname +　"&quantity=" + number1 + "&drivernumber=" + carNumberInput + "&sjusername=" + driverInput + "&phone=" + phoneInput + "&ordertime=" + newTime + "&zcd=" + detail.zcd + "&isheche=" + isHeCheYN + "&drivertype=" + carType + "&detail=" + newStr +"&callback=haveOrderJsonpcallback";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
}
function haveOrderJsonpcallback(result){
    if (result.msgCode == "0001"){
        window.location.href = "saveTheOrder.html";
        hideLoading();
    }else if(result.msgCode){
        hideLoading();
        if (result.msgDesc == "需要重新登录！"){
            localStorage.sessionid = '';
            localStorage.functionArray = '';
            alert(result.msgDesc);window.location.href = "login.html";
        }else {
            alert(result.msgDesc);
        }

        //var se=confirm(result.msgDesc);
        //if (se == true){
        //    window.location.href = "";
        //}else{
        //
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
    var data = array[i];
    var detail = JSON.parse(data);//再次把字符串转换成对象
    td1.innerHTML = detail.ordercode;
    td2.innerHTML = detail.dhd;
    td3.innerHTML = detail.nnumber;
    if(detail.tj){
        td4.innerHTML = parseFloat(detail.tj).toFixed(3);
    }else {
        td4.innerHTML = '';
    }
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

    for (var a = 0;a < array.length;a++){
        var data = array[a];
        var detail = JSON.parse(data);//再次把字符串转换成对象
        if (detail.nnumber){
            number1 += parseFloat(detail.nnumber);
        }else {
            number1 = "";
        }
        if (detail.tj){
            number2 += parseFloat(detail.tj);
        }else {
            number2 = "";
        }

    }
    b1.innerHTML = "合计";
    b3.innerHTML = number1;
    if(detail.tj){
        b4.innerHTML = number2.toFixed(3);
    }else {
        b4.innerHTML = '';
    }
    td1.appendChild(b1);
    td3.appendChild(b3);
    td4.appendChild(b4);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    myTable.appendChild(tr);
}
//配车成功
function sendSuccess(){
    var carNumberInput = document.getElementById("carNumberInput").value;
    var driverInput = document.getElementById("driverInput").value;
    var phoneInput = document.getElementById("phoneInput").value;
    var time = document.getElementById("time").value;
    var isHeChe = document.getElementById("isHeChe").value;
    var carType = document.getElementById("carType").value;

    if (time.length>10){
        var newTime = time.substr(0,16) + ":00";

    }else {
        newTime = "";
    }
    fstatus = "Y";
    var isHeCheYN;
    if (isHeChe == "是"){
        isHeCheYN = "Y";
    }else {
        isHeCheYN = "N";
    }
    var data = array[0];
    var detail = JSON.parse(data);//再次把字符串转换成对象
    var str = array[0].replace("pk_corp","pkCorp");
    for(var b = 0;b<array.length;b++){
        if (b>0){
            str = str + "," + array[b].replace("pk_corp","pkCorp");
        }
    }
    var newStr = "[" + str + "]";
    if (driverInput.length > 1 && carNumberInput && phoneInput.length == 11 && time){
        showLoading();
        var url = myUrl+"sendmanagerServiceController.do?doAdd";
        var JSONP =document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src=url+ "&sessionid=" + localStorage.sessionid + "&fstatus=" + fstatus + "&devicetype=1" + "&sendcorpcode=" + detail.sendcorpcode + "&sendcorpname=" + detail.sendcorpname +　"&quantity=" + number1 + "&drivernumber=" + carNumberInput + "&sjusername=" + driverInput + "&phone=" + phoneInput + "&ordertime=" + newTime + "&zcd=" + detail.zcd + "&isheche=" + isHeCheYN + "&drivertype=" + carType + "&detail=" + newStr +"&callback=sendCarJsonpcallback";
        document.getElementsByTagName("head")[0].appendChild(JSONP);
    }else{
        alert("请您查看输入的信息是否完整！");

    }
}
//回调
function sendCarJsonpcallback(result) {
    if (result.msgCode == "0001"){
        window.location.href = "sumbitSuccess.html";
        hideLoading();
    }else if(result.msgCode){
        hideLoading();
        if (result.msgDesc == "需要重新登录！"){
            localStorage.sessionid = '';
            localStorage.functionArray = '';
            alert(result.msgDesc);window.location.href = "login.html";
        }else {
            alert(result.msgDesc);
        }
    }

    //for(var i in result) {
    //    alert(i+":"+result[i]);//循环输出a:1,b:2,etc.
    //}
}
function showLoading() {
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
    })}
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
