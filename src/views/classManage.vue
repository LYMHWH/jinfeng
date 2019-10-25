<template>
  <div class="tailor-classManage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/schoolManage' }">学校管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
        <div style="float:right;">
          <el-form-item>
            <el-input placeholder="请输入班级名" v-model="queryParams.name"></el-input>
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
        :data="tableData"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="班级名称"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status_id" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.status_id ?'green':'red']"
              v-text="scope.row.status_id ?'启用':'停用'"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.status_id ?'red':'green']"
            >{{scope.row.status_id ?'停用':'启用'}}</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="tableData.length">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <el-dialog :title="title?'编辑班级':'添加班级'" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="班级名称：" prop="name">
          <el-input style="width:300px;" v-model="form.name" placeholder="请输入班级名称"></el-input>
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
  name: "classManage",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      title: 0,
      formRules: {
        name: [
          { required: true, message: "请输入班级名", trigger: "blur" }
        ],
      },
      form: {
        name: "",
        school_id: "",
        remark: "",
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        name:"",
        school_id: ""
      },
      tableData:[],
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/set_class_status",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/class_list",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
      this.form.school_id = this.$route.query.id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该班级？",
        "/bg_admin/bg_management/del_class",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.remark = row.remark;
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/add_class";
      if (this.title) {
        url = "/bg_admin/bg_management/edit_class";
      }
      this.post("form", url, this.form, "show");
    },
  },

  created() {
    this.queryParams.school_id = this.$route.query.id;
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-classManage {
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
}
</style>

