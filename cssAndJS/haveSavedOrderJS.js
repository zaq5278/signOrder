/**
 * Created by lenovo on 2016/1/15.
 */
function goBackMain(){
    window.location.href = "OrderAndSendCar.html";
}
function goToBefore(){
    window.history.go(-1);
}



/////////////全局变量//////////////////////////////////
var i = 0;
var rows = [];
var summary;
/////////////////////////////////////////////////////

function checkOrder(){
    $.ajax({
        url:myUrl+"sendmanagerServiceController.do?datagrid",
        type:"get",
        timeout : 120000,
        dataType:"jsonp",
        data:{
            sessionid:localStorage.sessionid,
            sendid:document.getElementById("ordercodeInput").value,
            fstatus:"N",
            billingdate_begin:document.getElementById("beforeDate").value,
            billingdate_end:document.getElementById("nowDate").value
        },
        success:function(result){
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



function creatNode(){
    //获取到表格
    var myDiv = document.getElementById("myDiv");
    var div = document.createElement("div");
    //创建每个表格内容
    var tb1 = document.createElement("table");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var tb2 = document.createElement("table");
    var tr2 = document.createElement("tr");
    var td11 = document.createElement("td");
    var td22 = document.createElement("td");
    var td33 = document.createElement("td");
    var td44 = document.createElement("td");
    var tb3 = document.createElement("table");
    var tr3 = document.createElement("tr");
    var td31 = document.createElement("td");
    var td32 = document.createElement("td");
    var tdd33 = document.createElement("td");
    var tdd34 = document.createElement("td");

    var tb5 = document.createElement("table");
    var tr5 = document.createElement("tr");
    var td51 = document.createElement("td");
    var td52 = document.createElement("td");
    var td53 = document.createElement("td");
    var td54 = document.createElement("td");

    var tb4 = document.createElement("table");
    var tr4 = document.createElement("tr");
    var td40 = document.createElement("td");
    var btn0 = document.createElement("button");
    var td41 = document.createElement("td");
    var btn1 = document.createElement("button");
    var td42 = document.createElement("td");
    var btn2 = document.createElement("button");


    //设置属性
    div.className="div";
    tb1.className = "tb";
    td1.className="td1";
    td1.innerHTML="派车单:";
    td2.innerHTML= orderSummary.sendid;
    td2.className="otherTd";
    td3.innerHTML = "车牌号:";
    td3.className = "td1";
    td4.className="otherTd";
    if (orderSummary.drivernumber){
        td4.innerHTML= orderSummary.drivernumber;
    }else{
        td4.innerHTML= "未填写";
    }


    tb2.className="tb";
    td11.innerHTML="开单日期:";
    td11.className="td11";
    if (orderSummary.billingdate){
        var str = orderSummary.billingdate.substr(0,10);
        td22.innerHTML= str;
    }else{
        td22.innerHTML= "未填写";
    }
    td22.className="otherTd";
    td33.innerHTML="车型:";
    if (orderSummary.drivertype){
        td44.innerHTML= orderSummary.drivertype;
    }else{
        td44.innerHTML= "未填写";
    }
    tb3.className = "tb";
    td33.className="td33";
    td44.className="otherTd";
    td31.innerHTML="预约时间:";
    if (orderSummary.ordertime){
        var str1 = orderSummary.ordertime.substr(0,16);
        td32.innerHTML= str1;
    }else{
        td32.innerHTML= "未填写";
    }
    tdd33.innerHTML = "拼车:";
    if (orderSummary.isheche){
        if (orderSummary.isheche == "N"){
            tdd34.innerHTML = "否";
        }else {
            tdd34.innerHTML = "是";
        }
    }else {
        tdd34.innerHTML = "未填写";
    }

    tdd33.className="td33";
    tdd34.className = "td11";
    td31.className = "td11";
    td32.className = "otherTd";

    tb5.className = "tb";
    td51.innerHTML = "司机姓名:";
    if(orderSummary.sjusername){
        td52.innerHTML = orderSummary.sjusername;
    }else {
        td52.innerHTML = "未填写";
    }
    if(orderSummary.phone){
        td54.innerHTML = orderSummary.phone;
    }else {
        td54.innerHTML = "未填写";
    }
    td53.innerHTML = "电话:";
    td53.className="td33";
    td54.className = "td11";
    td51.className = "td11";
    td52.className = "otherTd";


    tr4.className = "tr4";
    tb4.className = "tb";
    btn0.innerHTML = "提交";
    btn1.innerHTML = "修改";
    btn2.innerHTML = "删除";
    btn0.className = "btn";
    btn1.className = "btn";
    btn2.className = "btn";

    btn0.name = i;
    btn1.name = i;
    btn2.name = i;
    //父子视图关系添加
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    tb1.appendChild(tr1);
    tr2.appendChild(td11);
    tr2.appendChild(td22);
    tr2.appendChild(td33);
    tr2.appendChild(td44);
    tb2.appendChild(tr2);
    tr3.appendChild(td31);
    tr3.appendChild(td32);
    tr3.appendChild(tdd33);
    tr3.appendChild(tdd34);
    tb3.appendChild(tr3);

    tr5.appendChild(td51);
    tr5.appendChild(td52);
    tr5.appendChild(td53);
    tr5.appendChild(td54);
    tb5.appendChild(tr5);

    td40.appendChild(btn0);
    td41.appendChild(btn1);
    td42.appendChild(btn2);
    tr4.appendChild(td40);
    tr4.appendChild(td41);
    tr4.appendChild(td42);
    tb4.appendChild(tr4);
    div.appendChild(tb1);
    div.appendChild(tb2);
    div.appendChild(tb3);
    div.appendChild(tb5);
    div.appendChild(tb4);

    myDiv.appendChild(div);

    btn0.onclick = function(){//提交
        summary = rows[btn0.name];
        if (summary.sendid && summary.drivernumber && summary.billingdate && summary.ordertime && summary.drivertype && summary.isheche && summary.sjusername.length > 1 && summary.phone.length>10){
            submitTheSavedOrder();
        }else {
            alert("您的订单信息不完整，请修改完整后提交！");
        }
    };
    btn1.onclick = function(){//修改
        summary = rows[btn1.name];
        sessionStorage.isSubmit = "N";//用于更改确认派车或者确认修改按钮
        sessionStorage.isHeChe = rows[btn1.name].isheche;//用于判断是否合车
        sessionStorage.sendid = summary.sendid;//派车单号
        sessionStorage.drivernumber = summary.drivernumber;//车牌号
        sessionStorage.billingdate = summary.billingdate.substr(0,10);//派车时间
        sessionStorage.drivertype = summary.drivertype;//车型
        sessionStorage.ordertime = summary.ordertime;//预约时间
        sessionStorage.sjusername = summary.sjusername;//司机姓名
        sessionStorage.phone = summary.phone;//电话号码
        reviseTheOrder();

    };
    btn2.onclick = function(){//删除
        summary = rows[btn2.name];
        deleteTheSavedOrder();
    }

}
//提交订单的网络请求
function submitTheSavedOrder(){

    var carNumberInput = summary.drivernumber;
    var driverInput = summary.sjusername;
    var phoneInput = summary.phone;
    var time = summary.ordertime;
    showLoading();
    if (time.length>10){
        var time1 = time.replace(" ","T");
        var newTime = time1.substr(0,16) + ":00";
    }else {
        newTime = "";
    }
    var isHeChe = summary.isheche;
    var carType = summary.drivertype;
    var url = myUrl+"sendmanagerServiceController.do?doUpdate";
    var JSONP =document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src=url+ "&sessionid=" + localStorage.sessionid  + "&freightstatus=" + "&id=" + summary.id + "&drivernumber=" + carNumberInput + "&sjusername=" + driverInput + "&phone=" + phoneInput + "&ordertime=" + newTime + "&isheche=" + isHeChe + "&drivertype=" + carType +"&callback=submitJsonpcallback";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
}

function submitJsonpcallback(result) {
    //for(var i in result) {
    //    alert(i+":"+result[i]);//循环输出a:1,b:2,etc.
    //}
    if(result.msgDesc == "需要重新登录！"){
        localStorage.sessionid = '';
        localStorage.functionArray = '';
        alert(result.msgDesc);window.location.href = "login.html";
    }else {
        if (result.msgDesc == "更新成功") {
            window.location.href = "sumbitSuccess.html";
        } else {
            alert("更新失败!");
        }
    }
    hideLoading();
}

//修改的网络请求
function reviseTheOrder(){
    var url = myUrl+"sendmanagerServiceController.do?mxdatagrid";
    var JSONP =document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src=url+ "&sessionid=" + localStorage.sessionid + "&fstatus=N" + "&fid=" + summary.id + "&callback=jsonpcallback1";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
}

function jsonpcallback1(result) {
    if(result.msgDesc == "需要重新登录！"){
        localStorage.sessionid = '';
        localStorage.functionArray = '';
        alert(result.msgDesc);window.location.href = "login.html";
    }else {
        var reviseRow = result.rows;
        sessionStorage.id = summary.id;
        var rowStr = JSON.stringify(reviseRow);
        sessionStorage.rowStr = rowStr;
        if (reviseRow) {
            window.location.href = "reviseTheHavedOrder.html";
        } else {
            alert("未知错误！");
        }
        //for(var a in result) {
        //        alert(a+":"+result[a]);//循环输出a:1,b:2,etc.
        //    }
    }
    hideLoading();
}
//删除订单的网络请求
function deleteTheSavedOrder(){
    showLoading();
    var url = myUrl+"sendmanagerServiceController.do?doDel";
    var JSONP =document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src=url+ "&sessionid=" + localStorage.sessionid + "&id=" + summary.id + "&callback=jsonpcallback2";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
}

function jsonpcallback2(result) {
    if(result.msgDesc == "需要重新登录！"){
        localStorage.sessionid = '';
        localStorage.functionArray = '';
        alert(result.msgDesc);window.location.href = "login.html";
    }else {
        if (result.msgCode == "0007") {
            window.location.href = "wantDelectOrder.html";
        } else {
            alert(result.msgDesc);
        }
        //for(var a in result) {
        //        alert(a+":"+result[a]);//循环输出a:1,b:2,etc.
        // }
    }
    hideLoading();
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
