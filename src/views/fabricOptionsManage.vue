<template>
    <div class="tailor-fabric-options-manage">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>面料选项管理</el-breadcrumb-item>
        </el-breadcrumb>
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
                    prop="item_values"
                    label="选项值"
                    show-overflow-tooltip>
                        <template slot-scope="scope">                         
                            <span  v-text="scope.row.item_values?scope.row.item_values:'无'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="type_id"
                    label="选项"
                    show-overflow-tooltip>
                        <template slot-scope="scope">                         
                            <span  v-text="scope.row.type_id == 1?'单选':'多选'"></span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="是否为筛选项"
                    show-overflow-tooltip>
                        <template slot-scope="scope">                         
                            <span  v-text="scope.row.is_search?'是':'否'"></span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="创建时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="update_time"
                    label="更新时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <el-button @click="jump(scope.row)" type="text" size="small" >设置选项值</el-button>
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
        </div> -->
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
export default {
  name: "order",
  mixins: [mixin],
  data() {
    return {
      show: false,
      show1: true,
      form: {
        truename: "",
        mobilephone: "",
        password: "",
        role_id: "203",
        remark: "",
        qq: "",
        email: ""
      },
      formRules: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
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
        page: 1
      }
    };
  },
  methods: {
    jump(row) {
        this.$router.push({path:'/fabricOptionsSetting',query:{id:row.id,name:row.item_name}})
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
        url: "/bg_admin/bg_management/manageFabricItems"
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.$router.push({ path: "/fabricOptionsSetting" });
    },
    del(row) {
      this.$confirm("您确认删除该类目？", "提示", {
        type: "warning"
      }).then(() => {
        this.$post("/ecommerce_management/deleteEcommerceStaff", {
          ids: JSON.stringify([row.id])
        }).then(res => {
          this.$message(res.Content);
          if (res.Type == "Success") {
            this.query();
          }
        });
      });
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.tailor-fabric-options-manage {
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

