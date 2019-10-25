<template>
    <div class="tailor-evaluate-manage">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评价管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="" >
                    <el-tabs v-model="queryParams.grade" @tab-click="handleClick">
                        <el-tab-pane :label="'全部（'+tableData.total_count+'）'" name="0"></el-tab-pane>
                        <el-tab-pane :label="'好评（'+tableData.positive_count+'）'" name="1"></el-tab-pane>
                        <el-tab-pane :label="'中评（'+tableData.neutral_count+'）'" name="2"></el-tab-pane>
                        <el-tab-pane :label="'差评（'+tableData.negative_count+'）'" name="3"></el-tab-pane>
                    </el-tabs>
                </el-form-item>
                <div style="float:right;">
                    <el-form-item label="" >
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
                    <el-form-item>
                        <el-input placeholder="请输入订单号/商品名称" v-model="queryParams.keyword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query_submit">搜索</el-button>
                    </el-form-item>
                 </div>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.data" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                    <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="评价等级"
                    >
                         <template slot-scope="scope">
                            <span> {{scope.row.stars | format_level_status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    label="评价内容"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="评价图片"
                    show-overflow-tooltip>
                          <template slot-scope="scope">                         
                             <el-button @click="check_photos(scope.row)" type="text" size="small">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="nickname"
                    label="用户名"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="order_num"
                    label="订单编号"
                    show-overflow-tooltip>
                        <template slot-scope="scope">                         
                             <el-button @click="jump_order_info(scope.row)" type="text" size="small">{{scope.row.order_num}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="main_title"
                    label="商品名称"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="stars"
                    label="商品描述相符"
                    show-overflow-tooltip>
                         <template slot-scope="scope">
                            <span> {{scope.row.stars}}星</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                    prop="id"
                    label="物流服务评价"
                    show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column
                    prop="create_time"
                    label="评价时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="update_time"
                    label="状态"
                    show-overflow-tooltip>
                         <template slot-scope="scope">
                            <span
                                :class="[scope.row.status_id ?'green':'red']"
                                v-text="scope.row.status_id ?'启用':'停用'"
                            ></span>
                        </template>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                        <el-button
                        @click="setting(scope.row)"
                        type="text"
                        size="small"
                        :class="[scope.row.status_id ?'red':'green']"
                        >{{scope.row.status_id ?'停用':'启用'}}</el-button>
                    </template>
				</el-table-column>
            </el-table>
        </div>
        <div class="pagination" v-if="tableData.current_count">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.current_count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import "../../static/swipebox/lib/ios-orientationchange-fix.js";
import "../../static/swipebox/js/jquery.swipebox.js";
export default {
  name: "evaluateManage",
  mixins: [mixin],
  filters: {
    format_level_status(val) {
      val = Number.parseInt(val);
      switch (val) {
        case 1:
          return "差评";
          break;
        case 2:
          return "差评";
          break;
        case 3:
          return "中评";
          break;
        case 4:
          return "中评";
          break;
        case 5:
          return "好评";
          break;
        default:
          break;
      }
    }
  },
  data() {
    //       var now = new Date();
    // var startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
    // startDate = new Date(startDate);
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
        stime: null,
        etime: null,
        keyword: '', 
        grade:0
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
      nikeList: [],
      nikeName: null,
      tableData: {
        data: [],
        total_count: 0,
        negative_count: 0,
        neutral_count: 0,
        positive_count: 0,
        current_count: 0,
      },
      activeName: 0,
      list: [],
      list1: [],
      date: [],
    };
  },
  methods: {
    jump_order_info(row){
        this.$router.push({
            path:"/orderInfo",
            query:{id:row.order_id}
        })
    },
    datePicker(date) {
      if(!date) {
        this.queryParams.stime = '';
        this.queryParams.etime = '';
        this.queryParams.page = 1;
        this.query();
        return
      }
      this.queryParams.stime = date[0];
      this.queryParams.etime = date[1];
      this.queryParams.page = 1;
      this.query();
    },
     check_photos(row) {
      var arr = row.photos.split('###');
      arr.forEach((element, i) => {
        arr[i] = { href: element };
      });
      $.swipebox(arr);
    },
    pull(row) {
      this.toggle("您确认下架该商品？", "/bg_admin/goods/pullGoods", {
        id: row.id
      });
    },
    push(row) {
      this.toggle("您确认上架该商品？", "/bg_admin/goods/pushGoods", {
        id: row.id
      });
    },
    del(row) {
      this.delete("您确认删除该商品？", "/bg_admin/goods/deleteGoods", {
        id: row.id
      });
    },
    getCates1(val) {
      this.queryParams.cate_id2 = 0;
      if (val == 0) {
        this.list1 = [];
        return;
      }
      this.$q({
        url: "/bg_admin/goods/getCates",
        params: { parent_id: val }
      }).then(res => {
        this.list1 = res;
      });

      this.queryParams.cate_id1 = val;
      this.queryParams.page = 1;
      this.query();
    },
    handleClick(tab, event) {
    //   this.queryParams.grade = this.activeName;
      this.queryParams.page = 1;
      this.query();
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
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/setCommentStatus",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    addNike() {
      this.nikeList.push(this.nikeName);
    },
    delName(index) {
      alert(index);
      this.nikeList = this.nikeList.splice(index, 1);
    },
    check(row) {
      this.$router.push({ path: "/editGoods", query: { id: row.id } });
    },
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    order_status_query(value) {
      this.queryParams.cate_id2 = value;
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
        url: "/bg_admin/bg_management/manageComments",
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
    },
    getCates(parent_id) {
      this.$q({
        url: "/bg_admin/goods/getCates",
        params: { parent_id: parent_id }
      }).then(res => {
        this.list = res;
      });
    }
  },

  created() {
    this.query();
  },
  mounted() {}
};
</script>
<style lang="scss">
.tailor-evaluate-manage {
    @import url("../../static/swipebox/css/swipebox.min.css");
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
  .goods {
    display: flex;
    align-items: center;
    img {
      margin-right: 15px;
    }
    .name {
      margin-bottom: 20px;
      text-align: left;
    }
    .price{
        text-align: left;
    }
  }
}
</style>

