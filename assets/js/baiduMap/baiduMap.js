"use strict";

//创建和初始化地图函数：
function initMap() {
    createMap(); //创建地图
    setMapEvent(); //设置地图事件
    addMapControl(); //向地图添加控件
    addMapOverlay(); //向地图添加覆盖物
}
function createMap() {
    map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(118.729549, 32.211467), 15);
}
function setMapEvent() {
    // map.enableScrollWheelZoom(); // 设置鼠标滚轮控制地图变大缩小
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom();
}
function addClickHandler(target, window) {
    target.addEventListener("click", function () {
        target.openInfoWindow(window);
    });
}
function addMapOverlay() {
    var markers = [{ content: "我的母校", title: "南京信息工程大学", imageOffset: { width: -23, height: -21 }, position: { lat: 32.210841, lng: 118.729585 } }];
    for (var index = 0; index < markers.length; index++) {
        var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
        var marker = new BMap.Marker(point, { icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
                imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
            }) });
        var label = new BMap.Label(markers[index].title, { offset: new BMap.Size(25, 5) });
        var opts = {
            width: 200,
            title: markers[index].title,
            enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
        marker.setLabel(label);
        addClickHandler(marker, infoWindow);
        map.addOverlay(marker);
    };
    var plOpts = [{ strokeColor: "#f00", strokeWeight: "4", strokeOpacity: "0.6" }, { strokeColor: "#f00", strokeWeight: "4", strokeOpacity: "0.6" }];
}
//向地图添加控件
function addMapControl() {
    var scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: 0 });
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true });
    map.addControl(overviewControl);
}
var map;
initMap();