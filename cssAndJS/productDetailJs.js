/**
 * Created by lenovo on 2016/1/29.
 */
function goBackMain(){
    window.location.href = "OrderAndSendCar.html";
}
function goToBefore(){
    window.history.go(-1);
}
function addNode(){
    var mainDiv = document.getElementById("mainDiv");
    var span = document.createElement("span");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var tb1 = document.createElement("table");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var divTd = document.createElement("td");
    var otherDiv = document.createElement("div");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var input1 = document.createElement("input");
    var tb2 = document.createElement("table");
    var tr2 = document.createElement("tr");
    var td21 = document.createElement("td");
    var td22 = document.createElement("td");
    var select = document.createElement("select");
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var option3 = document.createElement("option");
    var option4 = document.createElement("option");
    span.innerHTML = "思念400g珍品五仁汤圆(24袋)";
    span.className = "span";
    td1.innerHTML = "数量:";
    td1.className = "td1";
    td2.innerHTML = "50";
    otherDiv.className = "otherDiv";
    td3.innerHTML = "确认件数:";
    td3.className = "td3";
    input1.value = "230";
    input1.setAttribute("data-mini",true);
    input1.setAttribute("type","tel");
    input1.setAttribute("onkeyup","if(/\\D/.test(this.value)){alert('只能输入数字');this.value='';}");
    td21.innerHTML = "差异原因:";
    select.setAttribute("data-mini",true);//设置mini样式
    option1.innerHTML = "正常";
    option2.innerHTML = "少货";
    option3.innerHTML = "多货";
    option4.innerHTML = "串货";
    div2.style.backgroundColor = "#eeeeee";
    div1.className = "div1";
    div2.className = "div2";
    tb1.className = "tb1";
    tb2.className = "tb2";
    tr1.appendChild(td1);
    divTd.appendChild(otherDiv);
    tr1.appendChild(td2);
    tr1.appendChild(divTd);
    tr1.appendChild(td3);
    td4.appendChild(input1);
    tr1.appendChild(td4);
    tb1.appendChild(tr1);
    tr2.appendChild(td21);
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    td22.appendChild(select);
    tr2.appendChild(td22);
    tb2.appendChild(tr2);
    div1.appendChild(span);
    div2.appendChild(tb1);
    div2.appendChild(tb2);
    div1.appendChild(div2);
    mainDiv.appendChild(div1);
}
