<template>
    <div class="tailor-personality-list">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个性化工艺列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="工艺状态：" >
                    <el-select  placeholder="请选择" @change="order_status_query" v-model="queryParams.status_id">
                        <el-option :label="item.name" :value="item.value" v-for="item in order_status_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="面料分类：" >
                    <el-select  placeholder="请选择" @change="order_status_query1" v-model="queryParams.cate_id">
                        <el-option :label="item.name" :value="item.value" v-for="item in order_status_list1" :key="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
              
                <div style="float:right;">
                    <el-form-item>
                        <el-input placeholder="请输入个性化工艺名" v-model="queryParams.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query_submit">搜索</el-button>
                    </el-form-item>
                 </div>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.list" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                    <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="价格（元）"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="状态"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                             <span :class="[scope.row.status_id ?'green':'red']"  v-text="scope.row.status_id ?'启用':'停用'"></span>
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
                            <el-button @click="setting(scope.row)" type="text" size="small" :class="[scope.row.status_id ?'red':'green']">{{scope.row.status_id ?'停用':'启用'}}</el-button>
                            <el-button @click="check(scope.row)" type="text" size="small" >编辑</el-button>
                            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
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
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
// import "../../static/swipebox/lib/ios-orientationchange-fix.js";
// import "../../static/swipebox/js/jquery.swipebox.js";
export default {
  name: "personalityList",
  mixins: [mixin],
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      total: 0,
      form: {
        truename: "",
        mobilephone: "",
        password: "",
        role_id: "203",
        remark: "",
        qq: "",
        email: ""
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
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        status_id: -1,
        name: null
      },
      formRules: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ]
      },
      formRules1: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ]
      },
      order_status_list: [
        { value: -1, name: "全部" },
        { value: 1, name: "启用" },
        { value: 0, name: "停用" }
      ],
      order_status_list1: [
        { value: -1, name: "全部" },
        { value: 1, name: "启用" },
        { value: 0, name: "停用" }
      ],
      nikeList: [],
      nikeName: null,
      tableData: {}
    };
  },
  methods: {
    del(row) {
        this.delete("确定要删除吗？删除后，相关的商品需重新编辑上架！", "/bg_admin/personalization/deletePersonalization", {
        id: row.id
        });
    },
    check_fabric_photos(row) {
      var arr = JSON.parse(row.fabric_photos);
      arr.forEach((element, i) => {
        arr[i] = { href: element };
      });
      $.swipebox(arr);
    },
    check_clothing_photos(row) {
      var arr = JSON.parse(row.clothing_photos);
      arr.forEach((element, i) => {
        arr[i] = { href: element };
      });
      $.swipebox(arr);
    },
    check_model_photos(row) {
      var arr = JSON.parse(row.model_photos);
      arr.forEach((element, i) => {
        arr[i] = { href: element };
      });
      $.swipebox(arr);
    },
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
           this.toggle("确定要停用吗？停用后相关的商品需重新编辑上架！", "/bg_admin/personalization/setPersonalStatus", data);
      }else{
            this.$q({
                method: "post",
                url: "/bg_admin/personalization/setPersonalStatus",
                data
            }).then(res => {
                this.$message.success("操作成功");
                this.query();
            });
      }
      
    },
    addNike() {
      this.nikeList.push(this.nikeName);
    },
    delName(index) {
      alert(index);
      this.nikeList = this.nikeList.splice(index, 1);
    },
    check(row) {
      this.$router.push({ path: "/editPersonality", query: { id: row.id } });
    },
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    order_status_query(value) {
      this.queryParams.status_id = value;
      this.queryParams.page = 1;
      this.query();
    },
    order_status_query1(value) {
      this.queryParams.cate_id = value;
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
        url: "/bg_admin/personalization/managePersonalization",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.dialogFormVisible = true;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$post("/ecommerce_management/addEcommerceStaff", {
            dto: JSON.stringify(this.form)
          }).then(res => {
            this.$message(res.Content);
            if (res.Type == "Success") {
              this.queryParams.page = 1;
              this.query();
              this.dialogFormVisible = false;
              this.$refs["form"].resetFields();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit1() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          this.$post("/ecommerce_management/editEcommerceStaff", {
            dto: JSON.stringify(this.form1)
          }).then(res => {
            this.$message(res.Content);
            if (res.Type == "Success") {
              this.queryParams.page = 1;
              this.query();
              this.dialogFormVisible1 = false;
              this.$refs["form1"].resetFields();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel(row) {
      this.$confirm("您确认删除此订单？", "提示", {
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
    confirm(row) {
      this.$confirm("确定该订单已通过其他方式付款？", "提示", {
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
    editShow(row) {
      this.form1 = { ...this.form1, ...row };
      this.form1.role_id = this.form1.role_id + "";
      this.dialogFormVisible1 = true;
    }
  },
  created() {
    this.query();
  },
  mounted() {}
};
</script>
<style lang="scss">
.tailor-personalityList-list {
//   @import url("../../static/swipebox/css/swipebox.min.css");
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
}
</style>

