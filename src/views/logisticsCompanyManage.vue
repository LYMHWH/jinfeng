<template>
    <div class="tailor-logistics-company-manage">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>物流公司管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item >
                    <el-button @click="add">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.list" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                 <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="express_name"
                    label="物流公司名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="express_code"
                    label="物流公司编码"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="创建时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="status"
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
            :total="tableData.count">
            </el-pagination>
        </div>
        <el-dialog :title="title?'编辑':'添加'" :visible.sync="show" >
            <el-form :model="form" :rules="formRules" ref="form" label-width="130px">
                <el-form-item label="物流公司名称："  prop="express_name">
                    <el-input v-model="form.express_name"></el-input>
                </el-form-item>
                <el-form-item label="物流公司编码："  prop="express_code">
                    <el-input v-model="form.express_code"></el-input>
                </el-form-item>
                <el-form-item label="备注："  prop="remark">
                    <el-input type="textarea" v-model="form.remark"></el-input>
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
import upImage from "@/components/Upload/upImage";
export default {
  name: "logisticsCompanyManage",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      show1: true,
      title: 0,
      form: {
        express_name: "",
        express_code: "",
        remark: ""
      },
      formRules: {
        express_name: [
          { required: true, message: "请输入物流公司名称", trigger: "blur" }
        ],
        express_code: [
          { required: true, message: "请输入物流公司编码", trigger: "blur" }
        ],
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
      item_id: "",
      tableData:{
          list:[],
          count:0
      }
    };
  },
  methods: {
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/setExpressStatus",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
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
        url: "/bg_admin/bg_management/manageExpress",
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
        "您确认删除该物流公司吗？",
        "/bg_admin/bg_management/deleteExpress",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form = { ...this.form, ...row };
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/addExpress";
      if (this.title) {
        url = "/bg_admin/bg_management/editExpress";
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
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-logistics-company-manage {
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

