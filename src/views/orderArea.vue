<template>
    <div class="order-area">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>接单区域</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <span id='mouse_dist'>0.00</span>
            <div id="map"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "orderArea",
  mounted() {
    var map = new BMap.Map("map"),
      shopPoint = new BMap.Point(116.40390583019587, 39.9151754663074),
      EARTHRADIUS = 6370996.81,
      painted_overlays = [],
      nearby_overlays = [],
      painted_overlay_points_str = "";
    map.centerAndZoom(shopPoint, 14);
    map.enableScrollWheelZoom(true);
    var top_left_control = new BMap.ScaleControl({
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    var top_left_navigation = new BMap.NavigationControl();
    var top_right_navigation = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      type: BMAP_NAVIGATION_CONTROL_SMALL
    });

    map.addControl(top_left_control);
    map.addControl(top_left_navigation);
    //鼠标移动事件
    map.addEventListener("mousemove", showMouseDist);
    function showMouseDist(e) {
      document.getElementById("mouse_dist").innerHTML = (
        getDistance(e.point, shopPoint) / 1000.0
      ).toFixed(2);
    }
    drawCircle(116.40390583019587, 39.9151754663074, 5);
    //画圆
    function drawCircle(lng, lat, radius) {
      var point = new BMap.Point(lng, lat);
      map.panTo(point);
      var circle = new BMap.Circle(point, radius * 1000, {
        strokeColor: "red",
        strokeWeight: 1,
        strokeOpacity: 0.9,
        fillColor: "blue",
        fillOpacity: 0.1
      });
      map.addOverlay(circle);
      var myIcon = new BMap.Icon(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAhCAYAAAA2/OAtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4QTRBQjRFNjNDMjExRTc4OTJERkM5M0MyMDNEOUU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4QTRBQjRGNjNDMjExRTc4OTJERkM5M0MyMDNEOUU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzhBNEFCNEM2M0MyMTFFNzg5MkRGQzkzQzIwM0Q5RTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzhBNEFCNEQ2M0MyMTFFNzg5MkRGQzkzQzIwM0Q5RTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SiWhrAAACJ0lEQVR42uyVzU7bQBCAZ8dJJSTnTwWpPWFVQlDhiOTEgQP0CUivPcEF9QjqAzR9gJYH6KF5A3gFqvbQE6ksRBASmBsVIJwfCYHxbmdRXIXdjRNaestI/pnZnc8zsztrBgPk0nWXgLEcF6KEjNXJFBQ8byfJhxlBjpPnmcwmvVboyhumBHRtYxh+KDQa/kDoebG4QsbNPjANLgA2xj2v1hd64bpVSvU9PFxqTz1vVYN2I/wCfykU8WocMeup4bExZSFa8IztW9P8KjrAMTgVLymbrKkUVOOyrHFKaty2qyYge8G/pz5GLmZxXuopiIC3eDOqWjv8Jy4q0/M8nZacFewaKibgk89igYC5XrvU05/EIpuLvhqiXb7zvZydLXHEXXU0vRW2CJDtV0MZcVhJMbUUKMQrJKNexwwllwCMI4bn0FDtEfGQbo6W+gR0hllxnBJXmq/sPEsIrSPEGdjDQPkhG9N8qZWRtkygzW7jHNWslQiU46dsWrVbnPtY2NurE/hEHQzfWvtJ0Nt3lkePnGJuSl68pWqa1y+cv37DfqgRS/1mjX0TR7hgaBSto3zDl+PdUMcyBHyXGqSNpT7BN7Hddgq+H/T2foWUrcfo/Th9IMO2HPhX4D1oF1yjCa9lKkPymiow+eS37XV5OFDHTZpgclGw06nKGg71O7n3gZkZh06f4z+pcV6+24YP/UepclEsividTviBPgj/QUbQEXQEfUz5LcAAq/vfhx3QTEwAAAAASUVORK5CYII=",
        new BMap.Size(22, 60)
      );
     var  starMarker = new BMap.Marker(point, {
        icon: myIcon
      });
      starMarker.addEventListener("click", function() {
        var p = starMarker.getPosition();
        alert("这里是您所查找的中心点！\n坐标：" + p.lng + "，" + p.lat);
      });
      map.addOverlay(starMarker);
    }
    var overlaycomplete = function(e) {
      painted_overlays.push(e.overlay);
      var path = e.overlay.getPath(); //Array<Point> 返回多边型的点数组
      painted_overlay_points_str = "";
      for (var iph = 0; iph < path.length; iph++) {
        if (iph < path.length - 1) {
          painted_overlay_points_str +=
            path[iph].lng + "," + path[iph].lat + ";";
        } else {
          painted_overlay_points_str += path[iph].lng + "," + path[iph].lat;
        }
      }
    };
    var styleOptions = {
      strokeColor: "red", //边线颜色。
      fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 3, //边线的宽度，以像素为单位。
      strokeOpacity: 0.9, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
      strokeStyle: "solid" //边线的样式，solid或dashed。
    };
    //实例化鼠标绘制工具

    var drawingManager = new BMapLib.DrawingManager(map, {
      isOpen: false, //是否开启绘制模式
      enableDrawingTool: true, //是否显示工具栏
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
        offset: new BMap.Size(5, 5), //偏离值
        drawingModes: [BMAP_DRAWING_POLYGON]
      },
      polygonOptions: styleOptions //多边形的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener("overlaycomplete", overlaycomplete);

    /**
     * 计算两点之间的距离,两点坐标必须为经纬度
     * @param {point1} Point 点对象
     * @param {point2} Point 点对象
     * @returns {Number} 两点之间距离，单位为米
     */
    function getDistance(point1, point2) {
      //判断类型
      if (!(point1 instanceof BMap.Point) || !(point2 instanceof BMap.Point)) {
        return 0;
      }

      point1.lng = _getLoop(point1.lng, -180, 180);
      point1.lat = _getRange(point1.lat, -74, 74);
      point2.lng = _getLoop(point2.lng, -180, 180);
      point2.lat = _getRange(point2.lat, -74, 74);

      var x1, x2, y1, y2;
      x1 = degreeToRad(point1.lng);
      y1 = degreeToRad(point1.lat);
      x2 = degreeToRad(point2.lng);
      y2 = degreeToRad(point2.lat);

      return (
        EARTHRADIUS *
        Math.acos(
          Math.sin(y1) * Math.sin(y2) +
            Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)
        )
      );
    }

    /**
     * 将度转化为弧度
     * @param {degree} Number 度
     * @returns {Number} 弧度
     */
    function degreeToRad(degree) {
      return (Math.PI * degree) / 180;
    }

    /**
     * 将弧度转化为度
     * @param {radian} Number 弧度
     * @returns {Number} 度
     */
    function radToDegree(rad) {
      return (180 * rad) / Math.PI;
    }

    /**
     * 将v值限定在a,b之间，纬度使用
     */
    function _getRange(v, a, b) {
      if (a != null) {
        v = Math.max(v, a);
      }
      if (b != null) {
        v = Math.min(v, b);
      }
      return v;
    }

    /**
     * 将v值限定在a,b之间，经度使用
     */
    function _getLoop(v, a, b) {
      while (v > b) {
        v -= b - a;
      }
      while (v < a) {
        v += b - a;
      }
      return v;
    }
  }
};
</script>
<style lang="scss">
.order-area {
  #map {
    width: 100%;
    height: 800px;
  }
}
</style>


