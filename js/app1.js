
angular.module('myApp', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider) {
    $stateProvider
        .state("login", {
            templateUrl: "login.html"
        })
        .state("orderAndSendCar", {
            templateUrl: "orderAndSendCar.html"
        })
        .state("sendACar", {
        templateUrl: "sendACar.html"
        })
        .state("selectOrder",{
            cache:'false',
        templateUrl: "selectOrder.html"
        })
        .state("haveSavedOrder",{
            cache:'false',
            templateUrl: "haveSavedOrder.html"
        })
        .state("haveSubmitOrder",{
            cache:'false',
            templateUrl: "haveSubmitOrder.html"
        })
        .state("sendCarWithTable",{
            cache:'false',
            templateUrl: "sendCarWithTable.html"
        })
        .state("reviseTheHavedOrder",{
            cache:'false',
            templateUrl:"reviseTheHavedOrder.html"
        });
}).controller('mainController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$filter,$timeout,$ionicHistory){
    $scope.userName='6000301';
    $scope.passWord='123456';
    $scope.theSelectOrderArray = [];//用于存放选择的查询到的未派车的订单的数组
    $scope.saveOrderFstatus = "N";
    $scope.submitOrderFstatus = "Y";



    $state.go('login');
    $scope.goToMain = function(){
      $state.go("orderAndSendCar");
    };
    $scope.goBackView = function(){
      $ionicHistory.goBack();
    };
    $scope.lodingShow = function(str) {
        $ionicLoading.show({
            template: str,
            noBackdrop:true
        });
    };
    $scope.lodingHide = function(){
        $ionicLoading.hide();
    };
    $scope.showAlert = function(str) {
        var alertPopup = $ionicPopup.alert({
            title: "温馨提示！",
            template: str
        });
        alertPopup.then(function(res) {
            console.log('点击了确定');
        });
    };

    $scope.login = function(userName,passWord) {
        $scope.lodingShow("登录中...");
        var loginUrl = "http://222.88.22.70:9999/synear/userServiceController.do?applogin&userName=" + userName + "&passWord=" + passWord + "&callback=JSON_CALLBACK";
        $http.jsonp(loginUrl).success(function (result) {
            $scope.lodingHide();
            if(result.msgCode == "0001"){
                localStorage.functionArray = JSON.stringify(result.function);
                localStorage.sessionid = result.sessionid;
                $state.go('orderAndSendCar');
            }else {
                $scope.showAlert("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号或者密码错误！");
            }
        });
    };

    //没有时间的日期选择框架
    $scope.touch = function(){

        $("#jqueryPicker").datetimepicker({
            timepicker:false,
            format:'Y-m-d'
        });
        $("#jqueryPicker1").datetimepicker({
            timepicker:false,
            format:'Y-m-d'
        });
        $("#jqueryTimePickerRevise").datetimepicker({
            timepicker:true,
            format:'Y-m-d H:i'
        });

    };
    //进入选择未派车的订单的方法
    $scope.goToSelectOrder = function(){
        $scope.theCheckOrderList = "";
        $scope.theSelectOrderArray = [];
        $scope.today = new Date();
        $scope.beforeTime = $filter('date')($scope.today,'yyyy-MM-dd');
        $scope.lastTime = $filter('date')($scope.today,'yyyy-MM-dd');
        $scope.orderNumber = "";
        $state.go("selectOrder");
    };
    //查询派车单
    $scope.checkTheOrder = function(urlType) {
        var beforeTime = document.getElementById("jqueryPicker").value;
        var lastTime = document.getElementById("jqueryPicker1").value;
        var orderNumber = document.getElementById("orderNumber").value;
        $scope.lodingShow("加载中...");
        $scope.theCheckOrderList = "";
        var url = "";
        if(urlType == "checkOrder"){
            url= "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?getSapSaleOrderList&sessionid=" + localStorage.sessionid + "&ordercode=" + orderNumber + "&createDate=" + beforeTime + "&ordertime=" + lastTime + "&callback=JSON_CALLBACK";
        }
        if (urlType == "savedOrder"){
            url = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?datagrid&sessionid=" + localStorage.sessionid + "&fstatus=N" + "&sendid=" + orderNumber + "&billingdate_begin=" + beforeTime + "&billingdate_end=" + lastTime + "&callback=JSON_CALLBACK";
        }
        if (urlType == "submitOrder"){
            url = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?datagrid&sessionid=" + localStorage.sessionid + "&fstatus=Y" + "&sendid=" + orderNumber + "&billingdate_begin=" + beforeTime + "&billingdate_end=" + lastTime + "&callback=JSON_CALLBACK";
        }
        $http.jsonp(url).success(function(result){
            if(result.msgDesc == "需要重新登录！"){
                localStorage.sessionid = '';
                localStorage.functionArray = '';
                $scope.lodingHide();
                $scope.showAlert(result.msgDesc);$state.go("login");
            }else {
                if (result.rows.length != 0){
                    $scope.theCheckOrderList = result.rows;
                    $scope.lodingHide();
                }else{
                    $scope.lodingShow("暂无数据！");
                    $timeout(function(){
                       $scope.lodingHide();
                    },500);
                }
            }
        }).error(function(){
            $scope.lodingShow("网络错误！");
            $timeout(function(){
                $scope.lodingHide();
            },500);
        });
    };
    //点击选择一个订单
    $scope.selectTheOrderInput = function(index){
        var isSelect = false;//定义一个布尔类型的值判断数组中是否有相同的对象
        var re = 0;//定义一个变量接收再次点击存在相同数据在数组中的位置
        for (var num = 0;num < $scope.theSelectOrderArray.length;num++){
            if($scope.theCheckOrderList[index] == $scope.theSelectOrderArray[num]){
                isSelect = true;
                re = num;
            }
        }
        if (!isSelect){
            $scope.theSelectOrderArray[$scope.theSelectOrderArray.length] = $scope.theCheckOrderList[index];
        }else{
            $scope.theSelectOrderArray.splice(re,1);
        }
        //console.log($scope.theSelectOrderArray);
    };
    //提交选择的未派车的订单
    $scope.submitTheSelectOrder = function(){

        if ($scope.theSelectOrderArray.length > 0){
            if($scope.theSelectOrderArray.length>1){
                $scope.isOnOrOff = true;
            }else {
                $scope.isOnOrOff = false;
            }
            $scope.number1 = 0;
            $scope.number2 = 0;
            $scope.drivertype = $scope.theSelectOrderArray[0].drivertype;
            for (var a = 0;a < $scope.theSelectOrderArray.length;a++){
                var data = $scope.theSelectOrderArray[a];

                $scope.number1 += parseFloat(data.nnumber);
                $scope.number2 += parseFloat(data.tj);
            }
            $scope.number2 = $scope.number2.toFixed(3);
            $state.go("sendCarWithTable");
        }else {
            $scope.showAlert("请选择订单后再进行提交!");
        }

    };
    //重选订单或者返回查询订单页面
    $scope.fromSendCarWithTableToSelectCar = function(){
        $scope.theCheckOrderList = "";
        $scope.theSelectOrderArray = [];//必须把选择的订单数组置为数组！
        $scope.today = new Date();
        //var beforeTime = document.getElementById("jqueryPicker");
        //var lastTime = document.getElementById("jqueryPicker1");
        //$scope.beforeTime = $filter('date')($scope.today,'yyyy-MM-dd');
        //$scope.lastTime = $filter('date')($scope.today,'yyyy-MM-dd');
        //beforeTime.value = $scope.beforeTime;
        //lastTime.value = $scope.lastTime;
        $scope.orderNumber = "";
        $ionicHistory.goBack();
    };
    //点击改变是否派车的状态
    $scope.changeTheIsOnOrOff = function(){
        if ($scope.isOnOrOff){
            $scope.isOnOrOff = false;
        }else {
            $scope.isOnOrOff = true;
        }
    };

    //保存或提交派车单订单
    $scope.saveOrSumbitTheOrder = function(fstatus){
        $scope.lodingShow("加载中...");
        var carNumberInput = document.getElementById("carNumberInput").value;
        var driverInput = document.getElementById("driverInput").value;
        var phoneInput = document.getElementById("phoneInput").value;
        var time = document.getElementById("jqueryTimePicker").value;
        var newTime = time.replace(" ","T");
        var carType = document.getElementById("carType").value;
        var isHeChe = "N";
        if($scope.isOnOrOff){
            isHeChe = "Y";
        }
        var array = [];
        for (var a = 0;a<$scope.theSelectOrderArray.length;a++){
            var str = angular.toJson($scope.theSelectOrderArray[a]);
            str = str.replace("pk_corp","pkCorp");
            array[array.length] = str;
        }
        var newStr = "[" + array + "]";
        var saveOrderUrl = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?doAdd"+ "&sessionid=" + localStorage.sessionid + "&fstatus=" + fstatus + "&devicetype=1" + "&sendcorpcode=" + $scope.theSelectOrderArray[0].sendcorpcode + "&sendcorpname=" + $scope.theSelectOrderArray[0].sendcorpname +　"&quantity=" + $scope.number1 + "&drivernumber=" + carNumberInput + "&sjusername=" + driverInput + "&phone=" + phoneInput + "&ordertime=" + newTime + ":00" + "&zcd=" + $scope.theSelectOrderArray[0].zcd + "&isheche=" + isHeChe + "&drivertype=" + carType + "&detail=" + newStr +"&&callback=JSON_CALLBACK";
        var alertStr = "您的派车单已保存成功，请进行下一步操作，您可以进入已保存的派车单界面继续编辑您的派车单，或者返回首页进行其他操作！";
        var wantGo = "haveSavedOrder";
        var okText = "已保存派车单";
        if (fstatus == "Y"){
            alertStr = "派车成功，请进行下一步操作，您可以进入已提交的派车单界面继续编辑您的派车单，或者返回首页进行其他操作！";
            wantGo = "haveSubmitOrder";
            okText = "已提交派车单";
            if(!(driverInput.length > 1 && carNumberInput && phoneInput.length == 11 && time)){
                $scope.lodingHide();
                $scope.showAlert("请检查您输入的信息是否完整，需要填写的选项均不能为空，司机姓名不能少于两个字，联系方式必须是11位数字！");
                return;
            }
        }
        //对话框
        $scope.showMyConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示！',
                template: alertStr,
                cancelText: '返回首页',
                okText: okText
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $scope.theCheckOrderList = "";
                    $scope.today = new Date();
                    //var beforeTime = document.getElementById("jqueryPicker");
                    //var lastTime = document.getElementById("jqueryPicker1");
                    $scope.beforeTime = $filter('date')($scope.today,'yyyy-MM-dd');
                    $scope.lastTime = $filter('date')($scope.today,'yyyy-MM-dd');
                    //beforeTime.value = $scope.beforeTime;
                    //lastTime.value = $scope.lastTime;
                    $scope.orderNumber = "";
                    $state.go(wantGo);
                } else {
                    $state.go("sendACar");
                }
            });
        };
        $http.jsonp(saveOrderUrl).success(function(result){
            if (result.msgCode == "0001"){
                $scope.lodingHide();
                $scope.showMyConfirm();
            }else if(result.msgCode){
                if (result.msgDesc == "需要重新登录！"){
                    localStorage.sessionid = '';
                    localStorage.functionArray = '';
                    $scope.lodingHide();
                    $scope.showAlert(result.msgDesc);$state.go("login");
                }else {
                    $scope.lodingHide();
                    $scope.showAlert(result.msgDesc);
                }
            }
        }).error(function(){
            $scope.lodingHide();
            $scope.showAlert("连接错误！");
        });
    };

    //进入已保存的订单界面
    $scope.goToHavedOrder = function(){
        $scope.theCheckOrderList = "";
        $scope.today = new Date();
        $scope.beforeTime = $filter('date')($scope.today,'yyyy-MM-dd');
        $scope.lastTime = $filter('date')($scope.today,'yyyy-MM-dd');
        $scope.orderNumber = "";
        $state.go("haveSavedOrder");
    };
    //进入已提交的订单
    $scope.goToSubmitOrder = function(){
        $scope.theCheckOrderList = "";
        $scope.today = new Date();
        $scope.beforeTime = $filter('date')($scope.today,'yyyy-MM-dd');
        $scope.lastTime = $filter('date')($scope.today,'yyyy-MM-dd');
        $scope.orderNumber = "";
        $state.go("haveSubmitOrder");
    };
    $scope.theCarStatus = function(index){
        var orderStatus = "";
        if (!$scope.theCheckOrderList[index].asterntime && !$scope.theCheckOrderList[index].begintime && !$scope.theCheckOrderList[index].endtime){
            orderStatus="未到";
        }
        if ($scope.theCheckOrderList[index].asterntime){
            orderStatus = "正在排队";
        }
        if ($scope.theCheckOrderList[index].begintime){
            orderStatus = "开始装车";
        }
        if ($scope.theCheckOrderList[index].endtime){
            orderStatus = "装车完毕";
        }
        return orderStatus;
    };

    //进入修改已保存或者已提交的订单界面
    $scope.goToRevisrTheHavedOrder = function(index){
        $scope.lodingShow("加载中...");
        var url = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?mxdatagrid"+ "&sessionid=" + localStorage.sessionid + "&fstatus=N" + "&fid=" + $scope.theCheckOrderList[index].id + "&callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(result){
            if(result.msgDesc == "需要重新登录！"){
                localStorage.sessionid = '';
                localStorage.functionArray = '';
                $scope.showAlert(result.msgDesc);$state.go("login");
            }else {
                $scope.lodingHide();
                $scope.theWantReviseOrderList = result.rows;
                $scope.number3 = 0;
                $scope.number4 = 0;

                for (var a = 0;a < $scope.theWantReviseOrderList.length;a++){
                    var data = $scope.theWantReviseOrderList[a];
                    $scope.number3 += parseFloat(data.nnumber);
                    $scope.number4 += parseFloat(data.tj);
                }
                $scope.number4 = $scope.number4.toFixed(3);
                $scope.carNumberInput = $scope.theCheckOrderList[index].drivernumber;
                $scope.driverInput = $scope.theCheckOrderList[index].sjusername;
                $scope.phoneInput = $scope.theCheckOrderList[index].phone;
                $scope.jqueryTimePicker = $scope.theCheckOrderList[index].ordertime.substr(0,16);
                $scope.drivertype = $scope.theCheckOrderList[index].drivertype;
                sessionStorage.id = $scope.theCheckOrderList[index].id;
                if($scope.theCheckOrderList[index].isheche == "Y"){
                    $scope.isOnOrOff = true;
                }else {
                    $scope.isOnOrOff = false;
                }
                $state.go("reviseTheHavedOrder");
            }
        }).error(function(){
            $scope.lodingHide();
            $scope.showAlert("连接错误！");
        });
    };
    //删除已保存的订单
    $scope.delTheSavedOrder = function(index){
        $scope.lodingShow("操作进行中...");
        var url = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?doDel" + "&sessionid=" + localStorage.sessionid + "&id=" + $scope.theCheckOrderList[index].id + "&callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(result){
            $scope.lodingHide();
            if(result.msgDesc == "需要重新登录！"){
                localStorage.sessionid = '';
                localStorage.functionArray = '';
                $scope.showAlert(result.msgDesc);$state.go("login");
            }else {
                if (result.msgCode == "0007") {
                    $scope.lodingShow(result.msgDesc + "!");
                    $timeout(function(){
                        $scope.lodingHide();
                    },500);
                    $scope.theCheckOrderList.splice(index,1);
                } else {
                    $scope.lodingShow(result.msgDesc + "!");
                    $timeout(function(){
                        $scope.lodingHide();
                    },500);
                }
            }
        }).error(function(){
            $scope.lodingHide();
            $scope.showAlert("连接错误！");
        });
    };
    //提交已保存的派车单
    $scope.submitTheSavedOrder = function(index){
        $scope.lodingShow("操作进行中...");
        var theOrder = $scope.theCheckOrderList[index];
        var newTime = theOrder.ordertime.substr(0,19).replace(" ","T");
        var url = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?doUpdate" + "&sessionid=" + localStorage.sessionid  + "&freightstatus=" + "&id=" + theOrder.id + "&drivernumber=" + theOrder.drivernumber + "&sjusername=" + theOrder.sjusername + "&phone=" + theOrder.phone + "&ordertime=" + newTime + "&isheche=" + theOrder.isheche + "&drivertype=" + theOrder.drivertype +"&callback=JSON_CALLBACK";
        if (theOrder.sendid && theOrder.drivernumber && theOrder.billingdate && theOrder.drivertype && theOrder.ordertime && theOrder.isheche && theOrder.sjusername.length>1 && theOrder.phone.length>10){
            $http.jsonp(url).success(function(result){
                $scope.lodingHide();
                if(result.msgDesc == "需要重新登录！"){
                    localStorage.sessionid = '';
                    localStorage.functionArray = '';
                    $scope.showAlert(result.msgDesc);$state.go("login");
                }else {
                    if (result.msgDesc == "更新成功") {
                        $scope.lodingShow(result.msgDesc + "!");
                        $timeout(function(){
                            $scope.lodingHide();
                        },500);
                        $scope.theCheckOrderList.splice(index,1);
                    } else {
                        $scope.lodingShow(result.msgDesc + "!");
                        $timeout(function(){
                            $scope.lodingHide();
                        },500);
                    }
                }
            }).error(function(){
                $scope.lodingHide();
                $scope.showAlert("连接错误！");
            });
        }else {
            $scope.lodingHide();
            $scope.showAlert("您的派车单信息不完整，需要填写的选项均不能为空，司机姓名不能少于两个字，联系方式必须是11位数字！");
        }
    };
    //更新已保存或者已提交的派车单
    $scope.updateTheOrder = function(){
        $scope.lodingShow("更新中...");
        var carNumberInput = document.getElementById("carNumberInputRevise").value;
        var driverInput = document.getElementById("driverInputRevise").value;
        var phoneInput = document.getElementById("phoneInputRevise").value;
        var time = document.getElementById("jqueryTimePickerRevise").value;
        var newTime = time.replace(" ","T")+ ":00";
        var carType = document.getElementById("carTypeRevise").value;
        var isHeChe = "N";
        if($scope.isOnOrOff){
            isHeChe = "Y";
        }
        if(!(driverInput.length > 1 && carNumberInput && phoneInput.length == 11 && time)){
            $scope.lodingHide();
            $scope.showAlert("请检查您输入的信息是否完整，需要填写的选项均不能为空，司机姓名不能少于两个字，联系方式必须是11位数字！");
            return;
        }
        var url = "http://222.88.22.70:9999/synear/sendmanagerServiceController.do?doUpdate" + "&sessionid=" + localStorage.sessionid  + "&freightstatus=" + "&id=" + sessionStorage.id + "&drivernumber=" + carNumberInput + "&sjusername=" + driverInput + "&phone=" + phoneInput + "&ordertime=" + newTime + "&isheche=" + isHeChe + "&drivertype=" + carType +"&callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(result){
            if (result.msgDesc == "需要重新登录！"){
                localStorage.sessionid = '';
                localStorage.functionArray = '';
                $scope.lodingHide();
                $scope.showAlert(result.msgDesc);$state.go("login");
            }else {
                if (result.msgDesc == "更新成功") {
                    $scope.lodingHide();
                    $scope.showOtherConfirm();
                } else {
                    $scope.lodingHide();
                    $scope.showAlert(result.msgDesc);
                }
            }
        }).error(function(){
            $scope.lodingHide();
            $scope.showAlert("连接错误！");
        });
        //对话框
        $scope.showOtherConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示！',
                template: "派车单提交成功，点击上一页按钮可返回上一页，点击返回首页按钮可返回首页！",
                cancelText: '返回首页',
                okText: "上一页"
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $scope.theCheckOrderList = "";
                    $scope.today = new Date();
                    var beforeTime = document.getElementById("jqueryPicker");
                    var lastTime = document.getElementById("jqueryPicker1");
                    $scope.beforeTime = $filter('date')($scope.today,'yyyy-MM-dd');
                    $scope.lastTime = $filter('date')($scope.today,'yyyy-MM-dd');
                    beforeTime.value = $scope.beforeTime;
                    lastTime.value = $scope.lastTime;
                    $scope.orderNumber = "";
                    $ionicHistory.goBack();
                } else {
                    $state.go("sendACar");
                }
            });
        };
    };
});
