<template>
    <div class="tailor-img-space">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>图片空间</el-breadcrumb-item>
        </el-breadcrumb>
        <section id="accounts_manage_ct">
            <!--商品图片管理-->
            <div class="cmd_pic_manage content_right">
                <!-- <h2 style="font-weight: 600;">商品图片</h2> -->
                <h3 class="title_ct">
                    <div class="group_name">
                        <!--<input type="text" name="" id="" value="全部图片" class="edit_group_name" readonly="readonly" />-->
                        <p>
                            <a href="javascript:;" class="confirm_submit">保存</a>
                            <a href="javascript:;" class="cancel_change">取消</a>
                        </p>
                    </div>
                    <div class="operation_bt">
                        <div  class="form-checkbox" style="transform:translate(0,-1px)">
                            <label><span class="checkbox-rebuild"></span><input class="checkbox-truer" id="checkall" type="checkbox" name="" value="" /><span style="font-size: 14px;">全选</span></label>                    		
                        </div>
                        <a href="javascript:;" id="del_select">删除</a>
                        <a href="javascript:;" id="chang_group_name" style="display: none">重命名</a>
                        <a href="javascript:;">复制标签</a>
                        <a href="javascript:;" id="delete_group" style="display: none">删除分组</a>
                        <a href="javascript:;" id="move_group_bt">移动至分组</a>
                        <a href="javascript:;" id="upload_bt">上传图片</a>
                    </div>
                </h3>
                <div class="pic_space_title">
                    <div class="add_father_group">
                        <div class="blue_add_icon">
                            
                        </div>
                        新建分组
                    </div>
                    <div id="groupTitle" class="all_pic_num">
                        全部图片（{$Total}）
                    </div>
                </div>
                <div class="pic_ct">
                    <p class="cue_info">提示：为方便您管理图片，您可以提前把需要的商品图片上传到这里，添加商品时就可以直接从商品图片库添加了</p>
                    <div class="pic_box">
                    </div>
                    <div class="add_pic_group">
                        <ul id="picture_tree"  class="ztree">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mongolia_layer" id="add_group" >
                <div class="change_pic_group_name">
                    <h2>输入图片组名称</h2>
                    <div class="change_brand_inner">
                        <label><input type="text" name="groupName" id="groupName" value="" placeholder="请输入图片组名称"/></label>
                        <a href="javascript:;"  id="add_group_confirm" class="confirm_submit">确认</a><a href="javascript:;" class="close_win">取消</a>
                    </div>
                </div>
            </div>
            <div class="mongolia_layer" id="add_child_group" >
                <h2>新增图片分组</h2>
                <div class="change_pic_group_name">
                    <div class="change_brand_inner">
                        <label><input type="text" name="groupName" id="childGroupName" value="" placeholder="请输入图片组名称"/></label>
                        <a href="javascript:;" class="close_win">取消</a>
                        <a href="javascript:;"  id="child_group_confirm" class="confirm_submit">确认</a>
                    </div>
                </div>
            </div>
            <div class="mongolia_layer" id="move_group" style="text-align: center;">
                <span class="canzhao"></span>
                <div class="move_group_ct">
                    <h2>移动至<i></i></h2>
                    <div class="move_group_inner">
                        <select name="" id="first_group">
                            {volist name="goods_images_group[0]" id="v"}
                                <option value="{$v.group_id}">{$v.group_name}</option>
                            {/volist}
                        </select>
                        <select name="" id="second_group" style="display: none">
                            <option value=""></option>
                        </select>
                        <a href="javascript:;" class="confirm_submit">确认</a>
                        <a href="javascript:;" class="close_win">取消</a>
                    </div>
                </div>
            </div>
            <div class="mongolia_layer" id="change_pic_name" style="text-align: center;">
                <span class="canzhao"></span>
                <div class="move_group_ct">
                    <h2>修改图片名称</h2>
                    <div class="move_group_inner">
                        <input type="" name="" id="" value="" />
                        <div>
                            <a href="javascript:;" class="confirm_submit">确认</a>
                            <a href="javascript:;" class="close_win">取消</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mongolia_layer window_hide" id="upload_pic_win" style="text-align: center; display: block;">
                <span class="canzhao"></span>
                <div id="wrapper">
                    <i class="close_pic_win"></i>
                    <div id="container">	
                        <div id="uploader">
                            <div class="queueList">
                                <div id="dndArea" class="placeholder">
                                    <div id="filePicker"></div>
                                    <p>或将照片拖到这里，单次最多可选300张</p>
                                </div>
                            </div>
                            <div class="statusBar" style="display:none;">
                                <div class="progress">
                                    <span class="text">0%</span>
                                    <span class="percentage"></span>
                                </div><div class="info"></div>
                                <div class="btns">
                                    <div id="filePicker2"></div><div class="uploadBtn">开始上传</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>






        <!-- <div>
            <el-form :model="queryParams" :inline="true">
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-select v-model="queryParams.where.type_id">
                        <el-option label="全部" value="0"></el-option>
                        <el-option :label="item.label" :value="item.value" v-for="item in type_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="datePicker"
                    >
                    </el-date-picker>
                </el-form-item>
                <div style="float:right;">
                    <el-form-item>
                        <el-input placeholder="请输入关键字搜索"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">搜索</el-button>
                    </el-form-item>
                 </div>
            </el-form>
        </div> -->
       
        <!-- <div class="pagination" v-show="tableData.Total">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.Total">
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import '../../static/zTree/js/jquery.ztree.core.min.js';
import '../../static/zTree/js/jquery.ztree.exedit.min.js';


export default {
  name: "imgSpace",
  mixins: [mixin],
  filters: {
    formatTypeId(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "充值";
          break;
        case 2:
          return "消费";
          break;
        case 3:
          return "退款";
          break;
        case 4:
          return "申请提现";
          break;
        case 5:
          return "提现通过";
          break;
        case 6:
          return "提现不通过";
          break;
        case 7:
          return "交纳保证金";
          break;
        case 8:
          return "退还保证金";
          break;
        case 9:
          return "量体费用到账";
          break;
        case 10:
          return "一键返款";
          break;
        case 11:
          return "一键扣款";
          break;
        default:
          break;
      }
    }
  },
  data() {
    var now = new Date();
    var startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
    startDate = new Date(startDate);
    return {
      date: [startDate, new Date()],
      type_list: [
        { label: "充值", value: 1 },
        { label: "消费", value: 2 },
        { label: "退款", value: 3 },
        { label: "申请提现", value: 4 },
        { label: "提现通过", value: 5 },
        { label: "提现不通过", value: 6 },
        { label: "交纳保证金", value: 7 },
        { label: "退还保证金", value: 8 },
        { label: "量体费用到账", value: 9 },
        { label: "一键返款", value: 10 },
        { label: "一键扣款", value: 11 }
      ],
      queryParams: {
        where: {
          type_id: "0",
          STime: "",
          ETime: ""
        },
        page: 1,
        size: 25
      },
      formLabelWidth: "120px",
      tableData: {}
    };
  },
  methods: {
    datePicker(date) {
      this.queryParams.where.STime = date[0];
      this.queryParams.where.ETime = date[1];
    },
    submit() {
      this.query();
    },
    query() {
      this.$post(
        "/ecommerce_report/getEcommerceCapitalRecords",
        this.queryParams
      ).then(res => {
        this.tableData = res;
      });
    }
  },
  created() {
    // this.query();
  },
  mounted() {
    var group_id = 0;
    var goodsImagesGroup ={
        733:[
            {group_id:735,group_name
:
"新增子分组1",group_num
:
0,
is_system
:
0,
p_group_name
:
"asd",
p_group_num
:
0,
parent_group_id
:
733}
        ],
       
    };
    var zNodes = [
      {
        id: 0,
        pId: -1,
        name: "全部图片",
        picNum:  1,
        icon: "../../static/images/pic_space_sprite.png"
      }
    ];
    for (var group in goodsImagesGroup[0]) {
      var newGroup = {
        id: goodsImagesGroup[0][group].group_id,
        pId: -1,
        name: goodsImagesGroup[0][group].group_name,
        picNum: goodsImagesGroup[0][group].group_num,
        icon: "/static/images/pic_space_sprite.png"
      };
      zNodes.push(newGroup);
      var childArr = goodsImagesGroup[goodsImagesGroup[0][group].group_id];
      if (childArr) {
        for (var child in childArr) {
          var newGroup = {
            id: childArr[child].group_id,
            pId: goodsImagesGroup[0][group].group_id,
            name: childArr[child].group_name,
            picNum: childArr[child].group_num,
            icon: "/static/images/pic_space_sprite.png"
          };
          zNodes.push(newGroup);
        }
      }
    }
    var setting = {
      view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
      },
      edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn: showRemoveBtn,
        showRenameBtn: showRenameBtn
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeDrag: beforeDrag,
        beforeEditName: beforeEditName,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onRename: onRename,
        onClick: treeClick
      }
    };
    function treeClick(e, treeId, treeNode) {
      group_id = treeNode.id;
      // uploader.options.formData.group_id=group_id;
      if (image_array[group_id] && group_id != recycle_group_id) {
        manage_image(image_array[group_id]);
      } else {
        $.post(
          "/mall_seller/seller_commodity/getSpaceImage",
          { group_id: group_id, page: 1, size: 48 },
          function(data, textStatus, xhr) {
            if (data.code) {
              image_array[group_id] = data.data;
              manage_image(data.data);
            }
          }
        );
      }
      $("#groupTitle").html(treeNode.name + "（" + treeNode.picNum + "）");
    }
    var log,
      className = "dark";
    function beforeDrag(treeId, treeNodes) {
      return false;
    }
    function beforeEditName(treeId, treeNode) {
      className = className === "dark" ? "" : "dark";
      showLog(
        "[ " +
          getTime() +
          " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
      var zTree = $.fn.zTree.getZTreeObj("picture_tree");
      zTree.selectNode(treeNode);
      zTree.editName(treeNode);
      return false;
    }
    function beforeRemove(treeId, treeNode) {
      className = className === "dark" ? "" : "dark";
      showLog(
        "[ " +
          getTime() +
          " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
      var zTree = $.fn.zTree.getZTreeObj("picture_tree");
      zTree.selectNode(treeNode);
      if (confirm("确定删除分组'" + treeNode.name + "' 吗?")) {
        var group_id = treeNode.id;
        var treeNode = treeNode;
        $.post(
          "/mall_seller/seller_commodity/deleteImageGroup",
          { group_id: group_id },
          function(data, textStatus, xhr) {
            if (data.code) {
              ui.toast({
                content: "删除成功！",
                width: 150,
                heigth: 150
              });
              showLog(
                "[ " +
                  getTime() +
                  " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
                  treeNode.name
              );
            } else {
              ui.message({
                title: "提示信息",
                content: data.msg
              });
            }
          }
        );
        return true;
      } else {
        return false;
      }
    }
    function onRemove(e, treeId, treeNode) {
      showLog(
        "[ " +
          getTime() +
          " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
    }
    function beforeRename(treeId, treeNode, newName, isCancel) {
      var isSuccess = true;
      className = className === "dark" ? "" : "dark";
      showLog(
        (isCancel ? "<span style='color:red'>" : "") +
          "[ " +
          getTime() +
          " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name +
          (isCancel ? "</span>" : "")
      );
      var val = newName;
      var treeNode = treeNode;
      var zTree = $.fn.zTree.getZTreeObj("picture_tree");
      if (isAddGronp) {
        reg = /^\S{1,8}$/;
        if (!reg.test(val)) {
          ui.message({
            title: "提示信息",
            content: "组名必须为1-8个字符"
          });
          return false;
        }
        $.ajax({
          type: "post",
          url: "/mall_seller/seller_commodity/addImageGroup",
          async: false,
          data: {
            group_name: val
          },
          success: function(data) {
            if (data.code) {
              isAddGronp = false;
              var obj = {
                parent_group_id: 0,
                p_group_name: null,
                p_group_num: null,
                group_id: data.data,
                group_name: val,
                group_num: 0,
                is_system: 0
              };
              group_array[0].push(obj);
              ui.toast({
                content: "添加成功！",
                width: 150,
                heigth: 150
              });
              treeNode.id = data.data;
              zTree.updateNode(treeNode, false);
            } else {
              ui.message({
                title: "提示信息",
                content: data.msg
              });
              isAddGronp = true;
              isSuccess = false;
            }
          }
        });
      } else if (isAddChildGroup) {
        var val = newName,
          parent_group_id = treeNode.pId,
          parentNode = zTree.getNodeByParam("id", parent_group_id, null),
          group_name = parentNode.name,
          reg = /^\S{1,8}$/;
        if (!reg.test(val)) {
          ui.message({
            title: "提示信息",
            content: "组名必须为1-8个字符"
          });
          return false;
        }
        $.ajax({
          type: "post",
          url: "/mall_seller/seller_commodity/addImageGroup",
          async: false,
          data: { group_name: val, parent_group_id: parent_group_id },
          success: function(data) {
            isAddChildGroup = false;
            if (data.code) {
              var obj = {
                parent_group_id: parent_group_id,
                p_group_name: group_name,
                p_group_num: 0,
                group_id: data.data,
                group_name: val,
                group_num: 0,
                is_system: 0
              };
              if (group_array[parent_group_id]) {
                group_array[parent_group_id].push(obj);
              } else {
                group_array[parent_group_id] = [obj];
              }
              ui.toast({
                content: "添加成功！",
                width: 150,
                heigth: 150
              });
              treeNode.id = data.data;
              zTree.updateNode(treeNode, false);
            } else {
              ui.message({
                title: "提示信息",
                content: data.msg
              });
              isSuccess = false;
            }
          }
        });
      } else {
        if (val == treeNode.name) {
          return true;
        }
        var reg = /^\S{1,8}$/;
        if (reg.test(val)) {
          $.ajax({
            type: "post",
            url: "/mall_seller/seller_commodity/updateImageGroup",
            async: false,
            data: {
              group_id: treeNode.id,
              group_name: val
            },
            success: function(data) {
              if (data.code) {
                ui.toast({
                  content: "编辑成功！",
                  width: 150,
                  heigth: 150
                });
                var obj;
                if ($(".active_group").length == 0) {
                  obj = $(".selected_group");
                  obj
                    .find(".span_group_name")
                    .html($(".group_name input").val());
                } else {
                  obj = $(".active_group");
                  obj.find("a").html($(".group_name input").val());
                }
                obj.attr("data-name", $(".group_name input").val());
              } else {
                ui.message({
                  title: "提示信息",
                  content: data.msg
                });
                isSuccess = false;
              }
            }
          });
        } else {
          ui.message({
            title: "提示信息",
            content: "组名必须为1-8个字符"
          });
          return false;
        }
      }
      return isSuccess;
    }
    function onRename(e, treeId, treeNode, isCancel) {
      showLog(
        (isCancel ? "<span style='color:red'>" : "") +
          "[ " +
          getTime() +
          " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name +
          (isCancel ? "</span>" : "")
      );
    }
    //编辑组名
    function editGroupName() {}
    function showRemoveBtn(treeId, treeNode) {
      if (
        treeNode.name.indexOf("全部图片") > -1 ||
        treeNode.name.indexOf("未分组") > -1 ||
        treeNode.name.indexOf("回收站") > -1
      ) {
        return false;
      } else {
        return true;
      }
    }
    function showRenameBtn(treeId, treeNode) {
      if (
        treeNode.name.indexOf("全部图片") > -1 ||
        treeNode.name.indexOf("未分组") > -1 ||
        treeNode.name.indexOf("回收站") > -1
      ) {
        return false;
      } else {
        return true;
      }
    }
    function showLog(str) {
      if (!log) log = $("#log");
      log.append("<li class='" + className + "'>" + str + "</li>");
      if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
      }
    }
    function getTime() {
      var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
      return h + ":" + m + ":" + s + " " + ms;
    }

    var newCount = 1,
      isAddChildGroup = false;
    function addHoverDom(treeId, treeNode) {
      if (treeNode.pId) {
        return false;
      }
      if (
        treeNode.editNameFlag ||
        $("#addBtn_" + treeNode.tId).length > 0 ||
        $("#numBtn_" + treeNode.id).length > 0
      )
        return;
      var sObj = $("#" + treeNode.tId + "_span");
      treeNode.picNum = treeNode.picNum ? treeNode.picNum : 0;
      var numStr =
        "<i id='numBtn_" +
        treeNode.id +
        "' title='图片数量'>（" +
        treeNode.picNum +
        "）</i>";
      if (
        treeNode.name.indexOf("全部图片") > -1 ||
        treeNode.name.indexOf("未分组") > -1 ||
        treeNode.name.indexOf("回收站") > -1
      ) {
        sObj.after(numStr);
        return false;
      }
      var addStr =
        "<span class='button add' id='addBtn_" +
        treeNode.tId +
        "' title='add node' onfocus='this.blur();'></span>";
      sObj.after(addStr).after(numStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn)
        btn.bind("click", function() {
          var zTree = $.fn.zTree.getZTreeObj("picture_tree");
          zTree.addNodes(treeNode, {
            id: 1000 + newCount,
            picNum: 0,
            pId: treeNode.id,
            name: "新增子分组" + newCount++
          });
          isAddChildGroup = true;
          zTree.editName(zTree.getNodeByParam("id", 1000 + newCount - 1, null));
          return false;
        });
    }
    function removeHoverDom(treeId, treeNode) {
      $("#numBtn_" + treeNode.id)
        .unbind()
        .remove();
      $("#addBtn_" + treeNode.tId)
        .unbind()
        .remove();
    }
    var newParentCount = 1;
    var isAddGronp = false;
    function addParentGroup(e) {
      isAddGronp = true;
      var zTree = $.fn.zTree.getZTreeObj("picture_tree"),
        treeNode = zTree.addNodes(null, {
          id: 1000 + newParentCount++,
          icon: "/static/images/pic_space_sprite.png",
          pId: -1,
          isParent: true,
          name: "新增父分组"
        });
      zTree.editName(treeNode[0]);
    }
    $(document).ready(function() {
      //添加父分组
      $(".add_father_group").click(addParentGroup);
      console.log("============", zNodes);
      var zTree = $.fn.zTree.init($("#picture_tree"), setting, zNodes);
      var nodes = zTree.getNodes();
      if (nodes.length > 0) {
        zTree.selectNode(nodes[0]);
      }
    });
    $(".picNav")
      .addClass("active")
      .parents("span")
      .prev()
      .css("color", "#007aff")
      .children("a")
      .css("color", "#007aff");
    var image_array = [],
      u_group_id = 0,
      flag_recycle = 0,
      group_array = { $json_group },
      recycle_group_id = $(".recycle_group")
        .parents("li")
        .attr("data-id");
    //默认显示全部图片
    image_array[0] = { $goods_images };
    $(function() {
      manage_image(image_array[0]);
    });
    //选择图片
    $(".pic_box").on("click", "img", function(e) {
      $(this)
        .parent()
        .find("input")
        .click();
      var span = $(this)
        .parent()
        .find(".piccheck");
      if (span.hasClass("picselected")) {
        span.removeClass("picselected");
        $(this)
          .parent()
          .css("border-color", "#d2d8dd");
      } else {
        span.addClass("picselected");
        $(this)
          .parent()
          .css("border-color", "#007aff");
      }
    });

    //渲染图片函数
    function manage_image(images) {
      u_group_id = $("h3 input").attr("data-id")
        ? $("h3 input").attr("data-id")
        : 0;
      $(".pic_box").empty();
      html = "";
      if (images.length != 0) {
        $.each(images, function(k, v) {
          html +=
            '<div class="pic_item"><span class="title"><input type="checkbox" value="' +
            v.id +
            '" data-image_url="' +
            v.image_url +
            '" /><i>' +
            v.image_name +
            '</i></span><img src="' +
            v.image_url +
            '?imageView2/2/w/130/h/130/q/75" alt="" /><i class="piccheck"></i><span class="pic_operation"><a href="javascript:;" class="edit_pic" title="修改图片名字" data-id="' +
            v.id +
            '" data-name=' +
            v.image_name +
            '></a><a href="javascript:;" class="copy_tag" title="复制标签"></a>';
          if (v.image_group != recycle_group_id) {
            html +=
              '<a href="javascript:;"  title="删除图片" class="cancel_pic" data-id="' +
              v.id +
              '"></a>';
            $("#del_select").show();
          } else {
            $("#del_select").hide();
          }
          html += "</span></div>";
        });
      }
      $(".pic_box").html(html);
      $("#checkall").prop("checked", false);
      $(".pic_box").mCustomScrollbar({
        scrollButtons: {
          enable: true
        }
      });
    }
    //关闭弹窗
    $(".mongolia_layer").on("click", ".close_win", function() {
      $(".mongolia_layer").hide();
    });

    //全选图片
    $("#checkall").click(function() {
      if ($(this).is(":checked")) {
        $(".pic_box input").prop("checked", true);
        $(".pic_box .piccheck").addClass("picselected");
        $(this)
          .siblings(".checkbox-rebuild")
          .addClass("on");
      } else {
        $(".pic_box input").prop("checked", false);
        $(".pic_box .piccheck").removeClass("picselected");
        $(this)
          .siblings(".checkbox-rebuild")
          .removeClass("on");
      }
    });

    //移动组
    $("#move_group_bt").click(function() {
      var image_ids_obj = $(".pic_box input:checkbox:checked");
      $("#first_group").empty();
      if (image_ids_obj.length != 0) {
        $("#move_group").show();
        html_group = "";
        $.each(group_array[0], function(k, v) {
          html_group +=
            '<option value="' + v.group_id + '">' + v.group_name + "</option>";
        });
        $("#first_group").append(html_group);
      } else {
        ui.message({
          title: "提示信息",
          content: "请选择移动的图片"
        });
      }
    });
    //移动图片
    $("#move_group .confirm_submit").click(function(e) {
      var zTree = $.fn.zTree.getZTreeObj("picture_tree");
      var selectNode = zTree.getSelectedNodes();
      var current_group_id = selectNode[0].id;
      (move_to_group_id = $("#second_group").val()
        ? $("#second_group").val()
        : $("#first_group").val()),
        (image_ids_obj = $(".pic_box input:checkbox:checked")),
        (image_ids = []);

      $.each(image_ids_obj, function(k, v) {
        image_ids.push($(v).val());
      });
      if (current_group_id == move_to_group_id) {
        ui.message({
          title: "提示信息",
          content: "图片已在当前分组"
        });
        return false;
      }
      $.post(
        "/mall_seller/seller_commodity/moveImage",
        {
          current_group_id: current_group_id,
          move_to_group_id: move_to_group_id,
          image_ids: JSON.stringify(image_ids)
        },
        function(data) {
          if (data.code) {
            $("#move_group").hide();
            ui.toast({
              content: "移动成功！",
              width: 150,
              heigth: 150
            });
            for (var a = 0; a < image_array[current_group_id].length; a++) {
              if (
                $.inArray(image_array[current_group_id][a].id + "", image_ids) >
                -1
              ) {
                if (image_array[move_to_group_id]) {
                  image_array[move_to_group_id].push(
                    image_array[current_group_id][a]
                  );
                }
                image_array[current_group_id].splice(a, 1);
                a--;
              }
            }
            zTree.getNodeByParam("id", current_group_id, null).picNum -=
              image_ids.length;
            zTree.getNodeByParam("id", move_to_group_id, null).picNum +=
              image_ids.length;
            var index = $("#numBtn_105" + current_group_id).val();
            $("#numBtn_105" + current_group_id).val(--index);
            manage_image(image_array[current_group_id]);
            location.reload();
          } else {
            ui.message({
              title: "提示信息",
              content: data.msg
            });
          }
        }
      );
    });

    //删除图片
    var thisImage;
    $(".pic_box").on("click", ".cancel_pic", function(e) {
      var image_id = $(this).attr("data-id"),
        zTree = $.fn.zTree.getZTreeObj("picture_tree");
      selectNode = zTree.getSelectedNodes();
      group_id = selectNode[0].id;

      var image_id = $(this).attr("data-id"),
        group_id = $("h3 input").attr("data-id"),
        data = { group_id: group_id, image_id: JSON.stringify([image_id]) };
      thisImage = $(this).parents(".pic_item");
      ui.message({
        title: "提示信息",
        content: "是否要删除图片",
        hasCancel: true,
        parameter: data,
        callBack: function(data) {
          $.post("/mall_seller/seller_commodity/deleteImage", data, function(
            data
          ) {
            if (data.code) {
              location.reload();
            } else {
              ui.message({
                title: "提示信息",
                content: data.msg
              });
            }
          });
        }
      });
    });

    //删除所选
    $("#del_select").click(function() {
      var del_array = $("i.picselected")
        .next()
        .find(".cancel_pic")
        .map(function() {
          return $(this).attr("data-id");
        })
        .get();
      var zTree = $.fn.zTree.getZTreeObj("picture_tree"),
        group_id = zTree.getSelectedNodes().id;
      if (del_array.length > 0) {
        ui.message({
          title: "提示信息",
          content: "是否要删除所选图片",
          hasCancel: true,
          parameter: del_array,
          callBack: function(del_array) {
            var data = {
              group_id: group_id,
              image_id: JSON.stringify(del_array)
            };
            $.post("/mall_seller/seller_commodity/deleteImage", data, function(
              data
            ) {
              if (data.code) {
                location.reload();
              } else {
                ui.message({
                  title: "提示信息",
                  content: data.msg
                });
              }
            });
          }
        });
      } else {
        ui.message({
          title: "提示信息",
          content: "请选择删除的图片"
        });
      }
    });

    //添加子分组
    var childBotton = null;
    $("#group_list").on("click", ".add_child_bt", function() {
      $("#add_child_group").show();
      childBotton = $(this);
    });
    var update_pic_item;
    //修改图片名字
    $(".pic_box").on("click", ".edit_pic", function(e) {
      $("#change_pic_name").show();
      update_pic_item = $(this).parents(".pic_item");
      $(this).parent(".pic_item");
      $("#change_pic_name input").val($(this).attr("data-name"));
    });

    //修改
    $("#change_pic_name .confirm_submit").click(function(e) {
      $.post(
        "/mall_seller/seller_commodity/updateImage",
        {
          image_id: update_pic_item.find("input").val(),
          image_name: $("#change_pic_name input").val()
        },
        function(data, textStatus, xhr) {
          if (data.code) {
            var val = $("#change_pic_name input").val();
            $("#change_pic_name").hide();
            update_pic_item.find("i").html(val);
            update_pic_item.find(".edit_pic").attr("data-name", val);
            ui.toast({
              content: "修改成功！",
              width: 150,
              heigth: 150
            });
          } else {
            ui.message({
              title: "提示信息",
              content: data.msg
            });
          }
        }
      );
    });

    $("body").on("click", ".close_pic_win", function(e) {
      location.reload();
    });
    //选择移动至分组
    $("#first_group").change(function(e) {
      $("#second_group").empty();
      var seletct_group_id = $("#first_group").val(),
        html_group = "";
      if (group_array[seletct_group_id]) {
        $.each(group_array[seletct_group_id], function(k, v) {
          html_group +=
            '<option value="' + v.group_id + '">' + v.group_name + "</option>";
        });
        $("#second_group").css("display", "");
        $("#second_group").append(html_group);
      } else {
        $("#second_group").css("display", "none");
      }
    });
    //上传图片
    $("#upload_bt").click(function() {
      $("#upload_pic_win").removeClass("window_hide");
      $("#upload_pic_win").css("display", "block");
    });
    //关闭窗口
    $(".close_pic_win").click(function() {
      $("#upload_pic_win").addClass("window_hide");
    });
  }
};
</script>
<style lang="scss">
.tailor-img-space {
  @import url("../styles/public_nav.css");
  @import url("../styles/public_nav.css");

  @import url("../../static/zTree/css/zTreeStyle/zTreeStyle.css");
  @import url("../styles/image_space.css");
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .cmd_pic_manage .title_ct {
    background-color: #f3f3f3;
  }
  .pic_item .title input {
    opacity: 0;
  }
  .move_group_ct input {
    border-radius: 4px;
  }
}
</style>


