<template>
  <div class="tailor-parentAccountManage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>家长账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
        <div style="float:right;">
          <el-form-item>
            <el-input placeholder="请输入姓名/手机号" v-model="queryParams.skey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query_submit">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        :data="tableData.data"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="nickname" label="姓名"></el-table-column>
        <el-table-column prop="mobilephone" label="手机号"></el-table-column>
        <el-table-column label="学生列表" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="checkStudent(scope.row)" style="color:green;cursor:pointer;">查看学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_locked" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.is_locked ?'red':'green']"
              v-text="scope.row.is_locked ?'停用':'启用'"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="reg_time" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_time" label="上次登录时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_ip" label="上次登录IP" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.is_locked ?'green':'red']"
            >{{scope.row.is_locked ?'启用':'停用'}}</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
            <el-button @click="setBtn(scope.row)" type="text" size="small">设置为城市合伙人</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="tableData.count">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.count"
      ></el-pagination>
    </div>
    <el-dialog :title="title?'编辑':'添加'" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="姓名：" prop="nickname">
          <el-input style="width:300px;" v-model="form.nickname" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobilephone">
          <el-input style="width:300px;" type="number" v-model="form.mobilephone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input style="width:300px;" type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
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
  name: "parentAccountManage",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      title: 0,
      formRules: {
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      },
      form: {
        nickname: "",
        mobilephone: "",
        remark: ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        skey: ""
      },
      tableData: {
        count: 0,
        data: []
      }
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    setting(row) {
      var data = { id: row.id, is_locked: 1 };
      if (row.is_locked === 1) {
        data.is_locked = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/set_parent_status",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/parent_list",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete("您确认删除该学生？", "/bg_admin/bg_management/del_parent", {
        id: row.id
      });
    },
    setBtn(row) {
      this.$confirm("您确认该身份设置为城市合伙人身份吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$q({
            url: "/bg_admin/bg_management/set_city_user_role",
            params: { id: row.id }
          }).then(res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.query();
          });
        })
        .catch(() => {});
    },
    edit(row) {
      this.title = 1;
      this.form.id = row.id;
      this.form.mobilephone = row.mobilephone;
      this.form.nickname = row.nickname;
      this.form.remark = row.remark;
      this.show = true;
    },
    submit() {
      if (!/^1[0-9]{10}$/.test(this.form.mobilephone)) {
        this.$message.error({
          message: "输入的手机号不正确！",
          duration: 2000
        });
        return;
      }
      var url = "/bg_admin/bg_management/add_parent";
      if (this.title) {
        url = "/bg_admin/bg_management/edit_parent";
      }
      this.post("form", url, this.form, "show");
    },
    checkStudent(row) {
      this.$router.push({ path: "/studentManage", query: { id: row.id } });
    }
  },

  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-parentAccountManage {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .el-dialog {
    width: 810px;
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
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>

