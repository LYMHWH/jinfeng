<template>
  <div class="tailor-item-category-manage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        :data="tableData.Rows"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- <el-table-column
                        type="index"
                        width="50">
        </el-table-column>-->
        <el-table-column prop="name" label="ID">
          <template slot-scope="scope">
            <div style="text-align:left;" v-if="scope.row.level_id ==1">{{scope.row.id}}</div>
            <div style="text-align:left;" v-else-if="scope.row.level_id ==2">
              <span style="margin-left:20px;">|--</span>
              {{scope.row.id}}
            </div>
            <div style="text-align:left;" v-else>
              <span style="margin-left:40px;">|--</span>
              {{scope.row.id}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="attrs" label="权限名" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="text-align:left;" v-if="scope.row.level_id ==1">{{scope.row.title}}</div>
            <div style="text-align:left;" v-else-if="scope.row.level_id ==2">
              <span style="margin-left:20px;">|--</span>
              {{scope.row.title}}
            </div>
            <div style="text-align:left;" v-else>
              <span style="margin-left:40px;">|--</span>
              {{scope.row.title}}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="add1(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.level_id !=3"
              class="green"
            >添加子类目</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.Total">
            </el-pagination>
    </div>-->
    <el-dialog :title="title" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="80px">
        <el-form-item label="权限名：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="权限：" prop="url">
          <el-input v-model="form.url"></el-input>
          <span>
            <i class="el-icon-info red"></i>
            <span class="info">输入“模块/控制器/方法”即可，例如：</span>
          </span>
          <span>/bg_admin/bg_auth/index</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
import { sub } from "@/utils/submit";

export default {
  name: "permissionManage",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      img_data: {
        type_id: 2
      },
      form: {
        title: "",
        url: "",
        parent_id: 0,
      },
      formRules: {
        title: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入权限", trigger: "blur" }]
      },
      form1: {
        name: "",
        rank: "",
        parent_id: 1,
        image: "",
        attrs: []
      },
      formRules1: {
        name: [{ required: true, message: "请输入类目名称", trigger: "blur" }],
        rank: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      form2: {
        name: "",
        rank: "",
        parent_id: 2,
        image: ""
      },
      formRules2: {
        name: [{ required: true, message: "请输入类目名称", trigger: "blur" }],
        rank: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      attr: "",
      imageUrl: "",
      x_token: {
        "X-Token": ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1
      },
      tableData: {
        Rows: []
      },
      curr_item: {},
      title: ""
    };
  },
  methods: {
    edit(row) {
      this.title = "编辑";
        this.form = Object.assign({},row);
        this.show =true;
    },
    handleAvatarSuccess(res, file) {
      var { result } = res;
      this.imageUrl = result.oks.file[0].file_url;
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("token");
      return true;
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/manageAuths"
      }).then(res => {
        var arr = [];
        res.forEach(element => {
          arr.push(element);
          if (element.child && element.child.length) {
            element.child.forEach(v => {
              arr.push(v);
              if (v.child && v.child.length) {
                v.child.forEach(item => {
                  arr.push(item);
                });
              }
            });
          }
        });
        this.tableData.Rows = arr;
        // this.tableData.Total = arr.length;
      });
    },
    add() {
      this.title = "添加";
      this.form = {
        title: "",
        url: "",
        parent_id: 0,
      },
      this.show = true;
    },
    add1(val) {
      this.title = "添加";
      this.curr_item = val;
       this.form = {
        title: "",
        url: "",
        parent_id: 0,
      }
        this.form.parent_id = val.id;
        this.show = true;
    },
    del(row) {
      this.delete(
        '"您确认删除该权限组？"',
        "/bg_admin/bg_management/deleteAuth",
        { id: row.id }
      );
    },
    submit() {
      var url = "/bg_admin/bg_management/addAuth";
      if (this.title == "编辑") {
        url = "/bg_admin/bg_management/editAuth";
      }
      var data = Object.assign({}, this.form);
      sub("form", url, data, "show", this);
    },
    // submit1() {
    //   var url = "/bg_admin/bg_management/addGoodsCategory";
    //   if (this.title == "编辑") {
    //     url = "/bg_admin/bg_management/editGoodsCategory";
    //   }
    //   var data = Object.assign({}, this.form1);
    //   data.attrs = JSON.stringify(data.attrs);
    //   sub("form1", url, data, "show1", this);
    // },
    // submit2() {
    //   var url = "/bg_admin/bg_management/addGoodsCategory";
    //   if (this.title == "编辑") {
    //     url = "/bg_admin/bg_management/editGoodsCategory";
    //   }
    //   var data = Object.assign({}, this.form2);
    //   data.attrs = JSON.stringify(data.attrs);
    //   sub("form2", url, data, "show2", this);
    // },
    // add_attr() {
    //   var val = this.attr.trim();
    //   if (!val) {
    //     this.$message.error("请填写属性");
    //     return;
    //   }
    //   this.form1.attrs.push(val);
    //   this.attr ='';
    // },
    // handleClose(index) {
    //   this.form1.attrs.splice(index, 1);
    // }
  },

  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-item-category-manage {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .el-dialog {
    width: 510px;
  }
  .item {
    display: flex;
    justify-content: space-between;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

}
</style>

