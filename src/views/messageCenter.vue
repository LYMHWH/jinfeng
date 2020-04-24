<template>
    <div class="tailor-evaluate-manage">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>消息中心</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="" >
                    <el-tabs v-model="queryParams.status_id" @tab-click="handleClick">
                        <el-tab-pane :label="'全部（'+tableData.total_count+'）'" name="-1"></el-tab-pane>
                        <el-tab-pane :label="'已读（'+tableData.read_count+'）'" name="1"></el-tab-pane>
                        <el-tab-pane :label="'未读（'+tableData.unread_count+'）'" name="0"></el-tab-pane>
                    </el-tabs>
                </el-form-item>
                <el-form-item label="消息类型：">
                  <el-select placeholder="请选择" @change="handleClick" v-model="queryParams.type_id">
                    <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
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
                    label="订单号"
                    show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)">{{scope.row.order_num}}</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="title"
                    label="消息类型"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    label="消息内容"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="update_time"
                    label="状态"
                    show-overflow-tooltip>
                         <template slot-scope="scope">
                            <span
                                :class="[scope.row.status_id ?'green':'red']"
                                v-text="scope.row.status_id ?'已读':'未读'"
                            ></span>
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
                        <el-button
                        @click="setting(scope.row)"
                        type="text"
                        size="small"
                        >{{scope.row.status_id ?'设为未读':'设为已读'}}</el-button>
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
  name: "messageCenter",
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
    var now = new Date();
    var startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
    startDate = new Date(startDate);
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
        status_id: "-1",
        type_id: 0
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
      tableData: {
        data: [],
        total_count: 0,
        negative_count: 0,
        neutral_count: 0,
        positive_count: 0,
        current_count: 0
      },
      activeName: 0,
      list: [],
      list1: [],
      date: [startDate, new Date()],
      typeList: []
    };
  },
  methods: {
    getMessageTypes(val) {
      this.$q({
        url: "/bg_admin/bg_management/getMessageTypes"
      }).then(res => {
        this.typeList = res;
      });
    },
    check(row) {
      this.$router.push({ path: "/orderInfo", query: { id: row.order_id } });
    },
    jump_order_info(row) {
      this.$router.push({
        path: "/orderInfo",
        query: { id: row.order_id }
      });
    },
    datePicker(date) {
      this.queryParams.stime = date[0];
      this.queryParams.etime = date[1];
    },
    check_photos(row) {
      var arr = row.photos.split("###");
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
        url: "/bg_admin/bg_management/setMessageStatus",
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
        url: "/bg_admin/bg_management/manageMessages",
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
    this.getMessageTypes();
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
    .price {
      text-align: left;
    }
  }
}
</style>

