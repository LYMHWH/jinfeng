<template>
    <div class="tailor-fabric-options-setting">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/fabricOptionsSetting' }">面料选项管理</el-breadcrumb-item>
            <el-breadcrumb-item>选项值设置</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item >
                    <el-button @click="add">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                  <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="item_name"
                    label="选项名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="item_value"
                    label="选项值"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="sequence_id"
                    label="排序号"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="创建时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="status_id"
                    label="状态"
                    show-overflow-tooltip>
                       <template slot-scope="scope">                         
                            <span :class="[scope.row.status_id ?'green':'red']"  v-text="scope.row.status_id ?'启用':'停用'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small" >编辑</el-button>
                            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
                            <el-button @click="setting(scope.row)" type="text" size="small" :class="[scope.row.status_id ?'red':'green']" >{{scope.row.status_id ?'停用':'启用'}}</el-button>
                        </template>
				</el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.Total">
            </el-pagination>
        </div>
        <el-dialog :title="title?'编辑':'添加'" :visible.sync="show" >
            <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
                <el-form-item label="所属选项："  prop="truename">
                    <div>{{item_name}}</div>
                </el-form-item>
                <el-form-item label="选项值："  prop="item_value">
                    <el-input v-model="form.item_value"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">确定添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
export default {
  name: "fabricOptionsSetting",
  mixins: [mixin],
  data() {
    return {
      show: false,
      show1: true,
      title: 0,
      form: {
        item_id: "",
        item_value: "",
        id: ""
      },
      formRules: {
        item_value: [
          { required: true, message: "请输入面料选项值", trigger: "blur" }
        ]
      },
      form1: {
        truename: "",
        mobilephone: "",
        password: "",
        role_id: "203",
        remark: "",
        qq: "",
        email: ""
      },
      formRules1: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ]
      },
      attr: "",
      attr_list: [],
      imageUrl: "",
      x_token: {
        "X-Token": ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        id: ""
      },
      item_name: "",
      item_id: ""
    };
  },
  methods: {
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
         this.toggle("确定要停用吗？停用后相关的商品需重新编辑上架！", "/bg_admin/bg_management/setFabricItemValueStatus", data);
      }else{
        this.$q({
            method: "post",
            url: "/bg_admin/bg_management/setFabricItemValueStatus",
            data
          }).then(res => {
            this.$message.success("操作成功");
            this.query();
          });
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("X-Token");
      return true;
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/manageFabricItemValues",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
      this.form.item_id = this.item_id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "确定要删除吗？删除后，相关的面料和商品需重新编辑上架！",
        "/bg_admin/bg_management/deleteFabricItemValue",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form = { ...this.form, ...row };
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/addFabricItemValue";
      if (this.title) {
        url = "/bg_admin/bg_management/editFabricItemValue";
      }
      this.post("form", url, this.form, "show");
    },
    submit1() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add_attr() {
      var val = this.attr.trim();
      if (!val) {
        this.$message.error("请填写属性");
      }
      this.attr_list.push(val);
    },
    handleClose(index) {
      this.attr_list.splice(index, 1);
    }
  },

  created() {
    this.queryParams.id = this.$route.query.id;
    this.form.item_id = this.item_id = this.queryParams.id;
    this.item_name = this.$route.query.name;
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-fabric-options-setting {
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

