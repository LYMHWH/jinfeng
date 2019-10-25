<template>
  <div class="tailor-staff-manage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true">
        <!-- <el-form-item label="" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
        </el-form-item>-->
        <div style="float:right;">
          <el-form-item>
            <el-input placeholder="请输入关键字搜索" v-model="queryParams.keyword"></el-input>
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
        :data="tableData.list"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <!-- <el-table-column prop="" label="真实姓名" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="mobilephone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="avatar_photo" label="头像" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.avatar_photo" class="img" alt>
          </template>
        </el-table-column>
        <el-table-column prop="user_money" label="余额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="frozen_money" label="提现中金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gender_id" label="性别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.gender_id ==1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="last_login_ip" label="微信" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="is_locked" label="是否锁定" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.is_locked ?'red':'green']"
              v-text="scope.row.is_locked ?'锁定':'未锁定'"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="reg_time" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_time" label="更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_ip" label="ip地址" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.is_locked ?'green':'red']"
            >{{scope.row.is_locked ?'解锁':'锁定'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="tableData.list.length">
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
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
export default {
  name: "fruitManage",
  mixins: [mixin],
  data() {
    return {
      form: {
        truename: "",
        mobilephone: "",
        password: "",
        role_id: "203",
        remark: "",
        qq: "",
        email: ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        keyword:""
      },
      formRules: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ],
      },
      tableData:{
            list:[],
          count:0
      }
    };
  },
  methods: {
      setting(row) {
      var data = { id: row.id, is_locked: 1 };
      if (row.is_locked === 1) {
        data.is_locked = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/setUserStatus",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
          url:"/bg_admin/bg_management/manageUsers",
          params:this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
  },
  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-staff-manage {
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
  .item{
      display: flex;
      justify-content: space-between;
  }
  .img{
      width: 50px;
      height: 50px;
  }
}
</style>

