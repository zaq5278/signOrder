/**
 * Created by Administrator on 2016-3-14.
 */
angular.module('myApp.signOrderController', ['ionic.rating','jett.ionic.filter.bar'])
    .config(function($stateProvider) {
        $stateProvider
            .state("signOrder", {
                templateUrl: "signOrder.html"
            })
            .state("seeTheOrder", {
                templateUrl: "seeTheOrder.html"
            })
            .state("signOrderDetail",{
                templateUrl:"signOrderDetail.html"
            })
            .state("evaluationTheSignOrder",{
                templateUrl:"evaluationTheSignOrder.html"
            })
            .state("productDetail",{
                templateUrl:"productDetail.html"
            })
            .state("addMoreProduct",{
                templateUrl:"addMoreProduct.html"
            })
    }).controller('mainController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$filter,$timeout,$ionicHistory,$location,$ionicModal,$ionicFilterBar) {

    // $ionicModal.fromTemplateUrl('addMoreProduct.html', {
    //     scope: $scope,
    //     animation: 'slide-in-up'// <---- 改变这里，默认是'slide-in-up' 换成slide-in-left试试
    // }).then(function(modal) {
    //     $scope.modal = modal;
    // });
    // $scope.openModal = function() {
    //     $scope.modal.show();
    // };
    // $scope.closeModal = function() {
    //     $scope.modal.hide();
    // };
    // //Cleanup the modal when we're done with it!
    // $scope.$on('$destroy', function() {
    //     $scope.modal.remove();
    // });
    // // Execute action on hide modal
    // $scope.$on('modal.hidden', function() {
    //     // Execute action
    // });
    // // Execute action on remove modal
    // $scope.$on('modal.removed', function() {
    //     // Execute action
    // });

    //设置首页
    $state.go('seeTheOrder');


    $scope.theCheckOrderList = "";
    $scope.today = new Date();
    $scope.beforeTime = $filter('date')($scope.today, 'yyyy-MM-dd');
    $scope.lastTime = $filter('date')($scope.today, 'yyyy-MM-dd');
    $scope.orderNumber = "";
    $scope.isShowScroll = false;
    $scope.page = 1;//设置查看订单的初始页为1
    $scope.fristRun = false;
    $scope.cheTouPhotoId = '';
    $scope.cheWeiPhotoId = '';
    $scope.danJuPhotoId = '';
    $scope.clickIndex = '';//用于判断用户在列表上点击的哪个cell

    window.onload = function () {
        var url = myUrl + 'orderReceiptController.do?getWechatConfigureList&sessionid=' + localStorage.sessionid + '&url=' + window.location.href + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            if (result.msgCode == "0002") {
                $scope.lodingHide();
                alert(result.msgDesc);
                window.location.href = "login.html";
            } else {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx79476edda797a503', // 必填，公众号的唯一标识
                    timestamp: result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: result.noncestr, // 必填，生成签名的随机串
                    signature: result.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.hideOptionMenu();
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };


//返回首页
    $scope.goToMain = function () {
        window.location.href = "OrderAndSendCar.html";
    };
    $scope.goBackView = function () {
        // window.history.go(-1);
        $ionicHistory.goBack();
    };
    $scope.goBackHtmlView = function () {
        window.history.go(-1);
    };
    $scope.lodingShow = function (str) {
        $ionicLoading.show({
            template: "<ion-spinner icon='ios'></ion-spinner>",
            // + "<div>"+ str +"</div>",
            noBackdrop: true
        });
    };
    $scope.promptShow = function (str) {
        $ionicLoading.show({
            template: str,
            noBackdrop: true
        });
    };
    $scope.lodingHide = function () {
        $ionicLoading.hide();
    };
    $scope.showAlert = function (str) {
        var alertPopup = $ionicPopup.alert({
            title: "温馨提示！",
            template: str
        });
        alertPopup.then(function (res) {
            console.log('点击了确定');
        });
    };
//没有时间的日期选择框架
    $scope.touch = function (timeId, preset) {
        $(function () {
            var currYear = (new Date()).getFullYear();
            $(timeId).mobiscroll().date();
            //初始化日期控件
            var opt = {
                preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
                theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
                display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
                mode: 'scroller', //日期选择模式，可选：scroller\clickpick\mixed
                lang: 'zh',
                dateFormat: 'yy-mm-dd', // 日期格式
                setText: '确定', //确认按钮名称
                cancelText: '取消',//取消按钮名籍我
                dateOrder: 'yymmdd', //面板中日期排列格式
                dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
                showNow: true,
                timeFormat: "HH:ii:ss",
                timeWheels: "HHiiss",
                nowText: "现在",
                startYear: currYear - 10, //开始年份
                endYear: currYear + 10 //结束年份
            };
            $(timeId).mobiscroll(opt);
        });
    };

    //查询派车单
    $scope.checkTheOrder = function (urlType) {

        $scope.theCheckOrderList = [];
        $scope.$broadcast('scroll.infiniteScrollComplete');//强制刷新一下动画,避免多出scroll的问题

        $scope.page = 1;//每次点击都需要把page置为1
        var beforeTime = document.getElementById("jqueryPicker").value;
        var lastTime = document.getElementById("jqueryPicker1").value;
        var orderNumber = document.getElementById("orderNumber").value;
        $scope.lodingShow("加载中...");
        var url = myUrl + "orderReceiptController.do?getOrderReceiptList&sessionid=" + localStorage.sessionid + "&ordercode=" + orderNumber + "&startdate=" + beforeTime + "&enddate=" + lastTime + "&page=1" + "&callback=JSON_CALLBACK";

        $http.jsonp(url).success(function (result) {
            if (result.msgCode == "0002") {
                $scope.lodingHide();
                alert(result.msgDesc);
                window.location.href = "login.html";
            } else {
                if (result.rows.length != 0) {
                    if (result.rows.length > 9) {
                        $scope.isShowScroll = true;
                    }
                    $scope.theCheckOrderList = result.rows;
                    $scope.lodingHide();
                } else {
                    //$scope.lodingShow("暂无数据！");
                    $scope.promptShow("无更多数据！");
                    $timeout(function () {
                        $scope.lodingHide();
                    }, 600);
                }
            }
        }).error(function () {
            $scope.isShowScroll = false;
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };
    //上拉加载更多cell
    $scope.loadMoreOrder = function () {

        if ($scope.page == 1) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.page++;
        } else {
            var beforeTime = document.getElementById("jqueryPicker").value;
            var lastTime = document.getElementById("jqueryPicker1").value;
            var orderNumber = document.getElementById("orderNumber").value;
            var url = myUrl + "orderReceiptController.do?getOrderReceiptList&sessionid=" + localStorage.sessionid + "&ordercode=" + orderNumber + "&startdate=" + beforeTime + "&enddate=" + lastTime + "&page=" + $scope.page + "&callback=JSON_CALLBACK";
            $http.jsonp(url).success(function (result) {
                if (result.msgCode == "0002") {
                    $scope.showAlert(result.msgDesc);
                    window.location.href = "login.html";
                } else {
                    if (result.rows.length != 0) {
                        $scope.isShowScroll = true;
                        $scope.theCheckOrderList = $scope.theCheckOrderList.concat(result.rows);
                    } else {
                        $scope.isShowScroll = false;
                        $scope.promptShow("无更多数据！");
                        $timeout(function () {
                            $scope.lodingHide();
                        }, 500);
                    }
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).error(function () {
                $scope.isShowScroll = false;
                $scope.promptShow("网络错误！");
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
            });
            $scope.page++;
        }

    };
    //点击单据详情跳转页面
    $scope.lookTheOrderDetail = function (index) {

        $scope.clickIndex = index;
        $scope.temperatureChanged = true;//每次进入详情界面默认温度是完好
        $scope.qianFengChanged = true;//每次进入详情界面默认铅封是完好
        $scope.photoTableShow = false;
        $scope.userLocation = '';
        $scope.clickOrderId = $scope.theCheckOrderList[index].orderid;//创建一个变量存放点击的order的id
        $scope.clickSendid = $scope.theCheckOrderList[index].sendid;//存放sendid最后提交的时候使用
        $scope.clickFtype = $scope.theCheckOrderList[index].ftype;//存放ftype最后提交的时候使用
        $scope.rating = {};//设置星星对象
        $scope.rating.rate1 = 0;//设置星星的初始值
        $scope.rating.rate2 = 0;//设置星星的初始值
        $scope.rating.rate3 = 0;//设置星星的初始值
        $scope.rating.max = 5;//设置星星的最大值
        function getLocation() {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    var map = new BMap.Map("allmap");
                    var point = new BMap.Point(parseFloat(longitude) - 0.008774687519, parseFloat(latitude) + 0.00374531687912);
                    // var point = new BMap.Point(113.654144,34.860686);
                    $scope.clickLongitude = longitude - 0.008774687519;//存放提交的时候的经度
                    $scope.clickLatitude = latitude + 0.00374531687912;//存放提交的时候的纬度
                    var gc = new BMap.Geocoder();
                    gc.getLocation(point, function (rs) {
                        var addComp = rs.addressComponents;
                        $timeout(function () {
                            $scope.userLocation = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取到的位置信息
                            // alert($scope.userLocation);
                        });

                    });
                }
            });
        }
        getLocation();
        $state.go('signOrderDetail');
        $scope.getTheSignOrderDetailNumber();


    };
    //返回单据详情
    $scope.goBackSignOrderDetailView = function () {

        $ionicHistory.goBack();
        $scope.getTheSignOrderDetailNumber();
    };
    //进入到订单详情页面后进行隐藏获取产品数量信息
    $scope.getTheSignOrderDetailNumber = function () {
        $scope.lodingShow();
        var oederDetailUrl = myUrl + "orderReceiptController.do?getOrderReceiptDetail&sessionid=" + localStorage.sessionid + "&orderid=" + $scope.clickOrderId + "&callback=JSON_CALLBACK";
        $http.jsonp(oederDetailUrl).success(function (result) {
            if (result.msgCode == "0002") {
                $scope.lodingHide();
                $scope.showAlert(result.msgDesc);
                window.location.href = "login.html";
            } else {
                if(result){
                    $scope.lodingHide();
                    console.log(result);
                    $scope.orderid = result.rows[0].orderid;
                    $scope.lfimgsum = result.rows[0].lfimgsum;
                    $scope.nnumbersum = result.rows[0].nnumbersum;
                    $scope.clickDrivernumber = result.rows[0].drivernumber;//存放drivernumber最后提交的时候使用
                    document.getElementById('phoneInputRevise').value= result.rows[0].drivernumber;
                }
            }
        }).error(function () {

            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };







    //拍照调用微信摄像头
    $scope.playCamera = function (str) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                $timeout(function () {
                    $scope.photoTableShow = true;
                });
                $timeout(function () {
                    wx.uploadImage({
                        localId: localIds[localIds.length - 1], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            switch (str){
                                case 'cheTouPhoto':
                                    $scope.cheTouPhotoId = serverId;
                                    break;
                                case 'cheWeiPhoto':
                                    $scope.cheWeiPhotoId = serverId;
                                    break;
                                default:
                                    $scope.danJuPhotoId = serverId;
                                    break;
                            }
                        }
                    });
                },100);
                document.getElementById(str).src = localIds[localIds.length - 1];
            }
        });
    };

    //温度按钮是否改变
    $scope.temperatureChange = function () {

        if ($scope.temperatureChanged){
            $scope.temperatureChanged = false;
        }else {
            $scope.temperatureChanged = true;
        }
    };
    //铅封按钮是否改变
    $scope.qianFengChange = function () {

        if ($scope.qianFengChanged){
            $scope.qianFengChanged = false;
        }else {
            $scope.qianFengChanged = true;
        }

    };




    //点击产品详情跳转
    $scope.goProductDetail = function () {
        $scope.theNewProductArray = [];

        $scope.isAddNewProduct = false;

        $scope.lodingShow("加载中...");
        var productDetailUrl = myUrl + "orderReceiptController.do?getPreorderOkList&sessionid=" + localStorage.sessionid + "&orderid=" + $scope.clickOrderId;

        $http({
            url:productDetailUrl,
            method:"POST",
            // type : 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // data: {
            //     'email': 'root@qq.com','password': '123456'
            // }
        }).success(function (result) {
                if (result.msgCode == "0002") {
                    $scope.showAlert(result.msgDesc);
                    window.location.href = "login.html";
                } else {
                    if(result){
                        $scope.lodingHide();
                        $scope.productDetailList = result.rows;
                        $state.go('productDetail');
                    }
                }
            }).error(function () {
                $scope.promptShow("网络错误！");
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
            });


    };
    //更改产品详情里面产品数量的时候走的方法
    $scope.changeTheOrderInputValue = function (index) {
        if (isNaN(document.getElementById("productInput" + index).value)){
            $scope.showAlert('为保证数据准确性,请您不要输入特殊字符!');
            document.getElementById("productInput" + index).value = '';
        }else {

        }
        // console.log(document.getElementById(id).value);
        // document.getElementById(id).removeAttribute('readonly');
        // document.getElementById(id).readOnly = 'readOnly';
        // if (!document.getElementById("productInput" + index).value){
        //     document.getElementById("productInput" + index).value = 0;
        // }
        if(document.getElementById("productSpan" + index).innerHTML == '串货'){
            return;
        }else {
            if (parseInt(document.getElementById("productInput" + index).value) > $scope.productDetailList[index].lfimg){
                document.getElementById("productSpan" + index).innerHTML = '多货';
                return '多货';
            } else {
                if (parseInt(document.getElementById("productInput" + index).value) == $scope.productDetailList[index].lfimg){
                    document.getElementById("productSpan" + index).innerHTML = '正常';
                    return '正常';
                }else {
                    document.getElementById("productSpan" + index).innerHTML = '少货';
                    return '少货';
                }
            }
        }


    };

    //串货时增加产品 获取所有产品的列表
    $scope.addMoreProduct = function () {
        $scope.lodingShow("加载中...");
        $scope.isSearchOpen = false;//每次进入产品列表的时候这个判断是否开始查询的变量置为false,否则查询开始再进的时候不能滑动
        $scope.moreProductItems = [];
        $scope.theNewProductArray = [];
            $http({
                url: myUrl + "orderReceiptController.do?getProductList",
                method: "POST",
                dataType:'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: "&sessionid="+localStorage.sessionid

            }).success(function (result) {
                if (result.msgCode == "0002") {
                    $scope.showAlert(result.msgDesc);
                    // window.location.href = "login.html";
                } else {
                    if (result) {
                        $scope.lodingHide();
                        $scope.allProduct = result.rows;
                        if ($scope.allProduct.length>10){//$scope.product_i的在这里被创建
                            for ($scope.product_i = 0;$scope.product_i<10;$scope.product_i++){
                                $scope.moreProductItems = $scope.moreProductItems.concat($scope.allProduct[parseInt($scope.product_i)]);
                            }
                        }

                        $state.go('addMoreProduct');
                    }
                }
            }).error(function () {
                $scope.promptShow("网络错误！");
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
            });

    };
    //下滑加载更多产品
    $scope.isShowProductScroll = true;
    $scope.loadMoreProduct = function () {
        if($scope.isSearchOpen){//当isSearchOpen为真的时候说明开始查询
            if ($scope.productArray.length <= parseInt($scope.productArray_i)){
                $scope.isShowProductScroll = false;
                $scope.promptShow("无更多数据！");
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
                $scope.isShowProductScroll = false;
            }else {
                //这里是用来判定剩余的数量是否够进行下一个10个循环,不够的话只循环剩下的数量的次数
                if ($scope.productArray.length - parseInt($scope.productArray_i) < 10) {
                    for (var p = 0; p < $scope.productArray.length - parseInt($scope.productArray_i); p++) {
                        $scope.moreProductItems = $scope.moreProductItems.concat($scope.productArray[parseInt($scope.productArray_i) + p]);
                    }
                    $scope.isShowProductScroll = true;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.productArray_i += 10;
                } else {
                    for (var l = 0; l < 10; l++) {
                        $scope.moreProductItems = $scope.moreProductItems.concat($scope.productArray[parseInt($scope.productArray_i) + l]);
                    }
                    $scope.isShowProductScroll = true;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.productArray_i += 10;
                    console.log($scope.productArray.length);
                    console.log($scope.productArray_i);
                }
            }

        }else {
            if ($scope.allProduct.length <= parseInt($scope.product_i)){
                $scope.promptShow("无更多数据！");
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
                $scope.isShowProductScroll = false;
            }else {
                if($scope.allProduct.length - parseInt($scope.product_i) < 10){
                    for (var j = 0; j < $scope.allProduct.length - parseInt($scope.product_i); j++) {
                        $scope.moreProductItems = $scope.moreProductItems.concat($scope.allProduct[parseInt($scope.product_i) + j]);
                    }
                    $scope.isShowProductScroll = true;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.product_i+=10;
                } else {
                    if ($scope.product_i == 9) {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    } else {
                        for (var i = 0; i < 10; i++) {
                            $scope.moreProductItems = $scope.moreProductItems.concat($scope.allProduct[parseInt($scope.product_i) + i]);
                        }
                        $scope.isShowProductScroll = true;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.product_i+=10;

                    }
                }

            }
        }

    };

    //模糊查询调用
    var filterBarInstance;
    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.moreProductItems,
            update: function (filteredItems, filterText) {
                if (filterText){

                    $scope.productArray = [];
                    for (var k = 0;k < $scope.allProduct.length;k++){
                        if($scope.allProduct[k].itemdesc.indexOf(filterText) >= 0){
                            $scope.productArray = $scope.productArray.concat($scope.allProduct[k])
                        }
                    }
                    if($scope.productArray.length >= 10){
                        $scope.productArray_i = 10;//当开始查询并且查询到的数量大于10的时候创建用于下拉的计数变量
                        $scope.isShowProductScroll = true;
                        $scope.isSearchOpen = true;
                        $scope.moreProductItems = [];
                        for (var i = 0;i<10;i++){
                            $scope.moreProductItems = $scope.moreProductItems.concat($scope.productArray[i]);
                        }
                    }else {
                        $scope.isSearchOpen = false;
                        $scope.isShowProductScroll = false;
                        $scope.moreProductItems = $scope.productArray;
                    }
                    console.log($scope.moreProductItems);

                }else {
                    $scope.isShowProductScroll = true;
                    $scope.moreProductItems = filteredItems;
                }
                // if (filterText) {
                //     console.log(filterText);
                // }
            }
        });
    };
    // //下拉刷新的方法
    // $scope.refreshItems = function () {
    //     if (filterBarInstance) {
    //         filterBarInstance();
    //         filterBarInstance = null;
    //     }
    //
    //     $timeout(function () {
    //         getItems();
    //         $scope.$broadcast('scroll.refreshComplete');
    //     }, 1000);
    // };

    //判断数据是否是串货的 串货的可以删除
    $scope.isCanRemoveProduct = function (lfimg) {
        if (lfimg == '0'){
            return true;
        }else {
            return false;
        }
    };
    //删除串货时增加的产品
    $scope.removeTheChuanHuoProduct = function (index) {
        $scope.lodingShow();
        $http({
            url: myUrl + "orderReceiptController.do?detetePreorderList",
            method: "POST",
            dataType:'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: "&sessionid="+localStorage.sessionid + "&vbeln=" + $scope.productDetailList[index].vbeln + "&posnr=" + $scope.productDetailList[index].posnr

        }).success(function (result) {
            if (result.msgCode == "0002") {
                $scope.showAlert(result.msgDesc);

                // window.location.href = "login.html";
            } else {
                if (result) {
                    $scope.lodingHide();
                    $scope.isAddNewProduct = true;
                    $scope.productDetailList.splice(index,1);
                    $scope.promptShow(result.msgDesc);
                    $timeout(function () {
                        $scope.lodingHide();
                    }, 500);
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });

    };


    //在所有产品列表页面填写一个产品增加一个产品 每次输入就会进行检查
    $scope.addNewProduct = function (index,str,idName) {
        var isHasPro = false;//用于判断是否有相同的信息
        var re = /^[0-9]+.?[0-9]*$/;
        var newProduct = '';//用于创建新数据
        var isUnpateOrInert = '';
        if (str == 'insert'){
            newProduct = '{' + '"maxposnr":' + '"' + $scope.productDetailList[0].maxposnr + '"' + ',"matnr":' + '"'  + $scope.moreProductItems[index].sap_id  + '"' + ',' + '"reason":"串货"' + ',' + '"vbeln":' + '"'  + $scope.productDetailList[0].vbeln + '"'  + ',' + '"orderid":' + '"'  + $scope.productDetailList[0].orderid + '"'  + ',' + '"nnumber":' + '"'  + document.getElementById(idName + index).value  + '"' + ',' + '"status":"insert"' +'}';
        }else {
            newProduct = '{' + '"maxposnr":' + '"' + $scope.productDetailList[0].maxposnr + '"' + ',"matnr":' + '"'  + $scope.productDetailList[index].matnr  + '"' + ',' + '"reason":"' + document.getElementById("productSpan" + index).innerHTML + '",' + '"vbeln":' + '"'  + $scope.productDetailList[index].vbeln + '"'  + ',' + '"orderid":' + '"'  + $scope.productDetailList[index].orderid + '"'  + ',' + '"nnumber":' + '"'  + document.getElementById(idName + index).value  + '"' + ',' + '"posnr":' + '"' + $scope.productDetailList[index].posnr + '",' + '"status":"update"' +'}';
        }

        if($scope.theNewProductArray.length){//当数组不为空的时候开始循环找是否有相同的 如果数组为空直接添加

            for (var i = 0;i < $scope.theNewProductArray.length;i++){
                //当修改的时候根据不同的条件进行判断是否有相同的信息
                if (str == 'insert'){
                    isUnpateOrInert = JSON.parse(newProduct).matnr == JSON.parse($scope.theNewProductArray[i]).matnr;
                }else {
                    isUnpateOrInert = JSON.parse(newProduct).matnr == JSON.parse($scope.theNewProductArray[i]).matnr  && JSON.parse(newProduct).vbeln == JSON.parse($scope.theNewProductArray[i]).vbeln && JSON.parse(newProduct).maxposnr == JSON.parse($scope.theNewProductArray[i]).maxposnr && JSON.parse(newProduct).posnr == JSON.parse($scope.theNewProductArray[i]).posnr;
                }
                console.log(isUnpateOrInert);
                if (isUnpateOrInert){
                    //newProduct拼接的时候是字符串需要转换成对象
                    if (!document.getElementById(idName + index).value) {
                        //在修改产品的时候会有更改成空的情况 在这种情况下进行操作
                        if (document.getElementById(idName + index).value == '' && str == 'update'){
                            console.log('000');

                            $scope.theNewProductArray.splice(i,1);
                            // $scope.theNewProductArray[i] = newProduct;
                            break;


                        }else {
                            console.log('111');
                            $scope.theNewProductArray.splice(i,1);
                        }
                    }else {
                        console.log('aaa');
                        if (document.getElementById(idName + index).value == '' && str == 'update'){

                        }
                        $scope.theNewProductArray[i] = newProduct;
                    }
                    // console.log(document.getElementById('newProductInput' + index).value);
                    // console.log($scope.theNewProductArray);
                    isHasPro = true;
                    break;
                }
            }
            if (!isHasPro){//当发现不存在相同的信息就扩大数组新增
                if (document.getElementById(idName + index).value) {
                    $scope.theNewProductArray[$scope.theNewProductArray.length] = newProduct;
                }
                //当在已有产品列表里连续删除的把确认件数改为0的时候要单独把空的数据插入到数组中
                if (document.getElementById(idName + index).value == '' && str == 'update'){
                    // document.getElementById(idName + index).value = 0;
                    $scope.theNewProductArray[$scope.theNewProductArray.length] = newProduct;
                }

            }
        }else {
            console.log(document.getElementById(idName + index).value);
            if (document.getElementById(idName + index).value && re.test(document.getElementById(idName + index).value)) {//判断数据存在且只为数字
                $scope.theNewProductArray[$scope.theNewProductArray.length] = newProduct;
                // console.log(document.getElementById('newProductInput' + index).value);
                // console.log($scope.theNewProductArray);
            }
            //当数组不为空且在已有产品列表页面时 即使为空也要加入数组
            if (document.getElementById(idName + index).value == '' && str == 'update'){
                // document.getElementById(idName + index).value = 0;
                $scope.theNewProductArray[$scope.theNewProductArray.length] = newProduct;
            }

        }
        console.log($scope.theNewProductArray);
        // console.log($scope.theNewProductArray);
        // console.log(re.test(document.getElementById('newProductInput' + index).value));

            // if ($.inArray($scope.moreProductItems[index],$scope.theNewProductArray) >= 0){
            //    return;
            // }else {
            //     $scope.theNewProductArray = $scope.theNewProductArray.concat($scope.moreProductItems[index]);
            //     console.log($scope.moreProductItems[index]);
            // }
    };
    //提交变动的数据,进行网络请求新增产品 当是新增的时候新增,当是修改的时候修改
    $scope.submitTheNewProduct = function (status) {
        console.log($scope.isAddNewProduct);

        if (!$scope.theNewProductArray.length){
            if ($scope.isAddNewProduct){
                $scope.getTheSignOrderDetailNumber();
                $state.go("signOrderDetail");
                return;
            }else {
                $scope.showAlert('您没有任何修改或新增的信息!');
                return;
            }
        }
        // console.log($scope.theNewProductArray);
        $scope.lodingShow();
        $http({
            url: myUrl + "orderReceiptController.do?updatePreorderList",
            method: "POST",
            dataType:'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: "&sessionid="+localStorage.sessionid + "&detail=" + '[' + $scope.theNewProductArray + ']'

        }).success(function (result) {
            console.log(result);
            if (result.msgCode == "00004") {
                $scope.promptShow("更改成功!");
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
                if (status == 'insert'){

                    console.log($scope.isAddNewProduct);
                    $scope.goProductDetail("新增并提交");
                    $scope.isAddNewProduct = true;//用于判断是否新增了产品
                }else {
                    $scope.isAddNewProduct = false;
                    $scope.getTheSignOrderDetailNumber();
                    console.log("走了这里");
                    $state.go("signOrderDetail");
                }
                console.log(result.msgDesc);
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });

    };
    //提交用户订单
    $scope.submitUserOrder = function () {

        var checked = '';//用于判断温度和合格
        var qianFengChanged = '';//用于判断铅封
        if ($scope.temperatureChanged){
            // $scope.temperatureChanged = 'Y';
            checked = 'Y';
        }else {
            // $scope.temperatureChanged = 'N';
            checked = 'N';
        }
        if ($scope.qianFengChanged){
            // $scope.qianFengChanged = 'Y';
            qianFengChanged = 'Y';
        }else {
            // $scope.qianFengChanged = 'N';
            qianFengChanged = 'N';
        }
        if (!$scope.userLocation){
            $scope.showAlert('位置信息未获取到,请返回再重新进行操作!');
            return;
        }
        if (!$scope.cheTouPhotoId){
            $scope.showAlert('提示,您的车头拍照没有完成!');
            return;
        }
        if (!$scope.cheWeiPhotoId){
            $scope.showAlert('提示,您的车尾拍照没有完成!');
            return;
        }
        if (!$scope.danJuPhotoId){
            $scope.showAlert('提示,您的单据拍照没有完成!');
            return;
        }
        if (!$scope.rating.rate1){
            $scope.showAlert('提示,您的物流速度评价没有完成!');
            return;
        }
        if (!$scope.rating.rate2){
            $scope.showAlert('提示,您的服务态度评价没有完成!');
            return;
        }
        if (!$scope.rating.rate3){
            $scope.showAlert('提示,您的货品质量评价没有完成!');
            return;
        }
        $scope.lodingShow();
        $http({
            url: myUrl + "orderReceiptController.do?sendOkSubmit",
            method: "POST",
            dataType:'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: "&sessionid="+localStorage.sessionid + "&orderid=" + $scope.clickOrderId + "&sendid=" + $scope.clickSendid + "&ftype=" + $scope.clickFtype + "&oldDrivernumber=" + $scope.clickDrivernumber + "&signoffDrivernumber=" + document.getElementById("phoneInputRevise").value + "&signoffAddress=" + $scope.userLocation + "&longitude=" + $scope.clickLongitude + "&latitude=" + $scope.clickLatitude + "&fileId1=" + $scope.cheTouPhotoId + "&fileId2=" + $scope.cheWeiPhotoId + "&fileId3=" + $scope.danJuPhotoId + "&checked=" + checked + "&thermostat=" + checked + "&leadsealing=" + qianFengChanged + "&logisticsSpeed=" + $scope.rating.rate1 + "&serviceAttitude=" + $scope.rating.rate2 + "&qualityGoods=" + $scope.rating.rate2 + "&remarks=" + document.getElementById('textarea').value
        }).success(function (result) {
            if(result.msgCode == "00004"){
                $scope.promptShow("您的订单已提交成功！");
                $timeout(function () {
                    $scope.lodingHide();
                    $scope.theCheckOrderList.splice($scope.clickIndex,1);
                    $state.go('seeTheOrder');
                }, 500);
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };


});
