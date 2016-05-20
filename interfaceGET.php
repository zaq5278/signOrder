<?php
/**
 * Created by PhpStorm.
 * User: zaq
 * Date: 16/4/12
 * Time: 上午8:23
 */
$url='http://192.168.16.225:9999/synear/orderReceiptController.do?getOrderReceiptList&sessionid=5D4AEA059759E13AAF663D7CF08AB841&ordercode=&startdate=2016-01-13&enddate=2016-04-13&page=1&callback=angular.callbacks._1';
$html = file_get_contents($url);
echo $html;
