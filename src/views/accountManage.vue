<template>
  <div class="tailor-logistics-company-manage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
        <div style="float:right;">
          <el-form-item>
            <el-input placeholder="真实姓名/手机号" v-model="queryParams.keyword"></el-input>
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
        <!--<el-table-column prop="username" label="用户姓名"></el-table-column>-->
        <el-table-column prop="nickname" label="真实姓名"></el-table-column>
        <el-table-column prop="mobilephone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column prop="qq" label="qq" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_locked" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.is_locked ?'red':'green']"
              v-text="scope.row.is_locked ?'停用':'启用'"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_time" label="上次登录时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_ip" label="上次登录IP" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
            <el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.is_locked ?'green':'red']"
            >{{scope.row.is_locked ?'启用':'停用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="tableData.data.length">
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
        <!--<el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>-->
        <el-form-item label="真实姓名：" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobilephone">
          <el-input v-model.number="form.mobilephone" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="password2">
          <el-input v-model="form.password2" type="password" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.role_id"
              :label="item.title"
              :value="item.role_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="QQ：" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入qq"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
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
  name: "accountManage",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
       var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.password2 !== "") {
          this.$refs.form.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
        defaultProps:{
            children:"child",
            label:"title"
        },
      show: false,
      show1: false,
      title: 0,
      title1: '为超级管理员分配权限',
      form: {
        username: "",
        nickname: "",
        mobilephone: "",
        password: "",
        password2: "",
        role_id: "",
        qq: "",
        email: "",
        remark: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        password2: [
        {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        role_id: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
      },
      form1: {
        nickname: "",
        mobilephone: "",
        password: "",
        role_id: "203",
        remark: "",
        qq: "",
        email: ""
      },
      formRules1: {
        username: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ],
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
        keyword:""
      },
      item_name: "",
      item_id: "",
      tableData:{
          data:[],
          count:0
      },
      options:[],
      curr_item:null
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    getGroups(){
        this.$q({
            url:"/bg_admin/bg_management/getGroups"
        }).then(res=>{
          this.options=res;
        })
    },
    setting(row) {
      var data = { id: row.id, is_locked: 1 };
      if (row.is_locked === 1) {
        data.is_locked = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/setAdminStatus",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/manageAdmins",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
    //   this.form.item_id = this.item_id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该账号？",
        "/bg_admin/bg_management/deleteAdmin",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.$q({
          url:"/bg_admin/bg_management/getAdminDetail",
          params:{id:row.id}
      }).then(res=>{
        this.form = { ...this.form, ...res };
        this.form.password2 = this.form.password;
        this.form.role_id = this.form.bg_role_id;
      })
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
      var url = "/bg_admin/bg_management/addAdmin";
      if (this.title) {
        url = "/bg_admin/bg_management/editAdmin";
      }
      this.post("form", url, this.form, "show");
    },
    submit1() {
         var data ={};
         data.id = this.curr_item.group_id;
         data.auth_ids = this.$refs.tree.getCheckedNodes().map(v=>{
             return v.id;
         })
        data.auth_ids =JSON.stringify( data.auth_ids) ;
         this.$q({
             method:'post',
             url:'/bg_admin/bg_auth/allotAuthsToGroup',
             data:data,
         }).then(res=>{
             this.query();
             this.$message.success('操作成功');
             this.show1 = false;
            this.$refs.tree.setCheckedKeys([]);
         })
    //   this.$refs["form1"].validate(valid => {
    //     if (valid) {
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
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
    this.getGroups();
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

