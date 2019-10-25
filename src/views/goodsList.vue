<template>
    <div class="tailor-goods-list">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="" >
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="0"></el-tab-pane>
                        <el-tab-pane label="上架中" name="3"></el-tab-pane>
                        <el-tab-pane label="待上架" name="2"></el-tab-pane>
                        <el-tab-pane label="已下架" name="4"></el-tab-pane>
                    </el-tabs>
                </el-form-item>
                <el-form-item label="商品类别：" >
                    <el-select  placeholder="请选择" v-model="queryParams.cate_id1" @change="getCates1">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option :label="item.name" :value="item.id" v-for="(item,index) in list" :key="index"></el-option>
                    </el-select>
                    <el-select  placeholder="请选择" @change="order_status_query" v-model="queryParams.cate_id2">
                          <el-option label="全部" :value="0"></el-option>
                           <el-option :label="item.name" :value="item.id" v-for="(item,index) in list1" :key="index" ></el-option>
                    </el-select>
                </el-form-item>
                <div style="float:right;">
                    <el-form-item>
                        <el-input placeholder="请输入商品名称等" v-model="queryParams.main_title"></el-input>
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
                    label="商品信息"
                    width="430px"
                    >
                        <template slot-scope="scope">
                            <div class="goods">
                                <img style="width:80px;height:80px;" :src="scope.row.image" alt=""/>
                                <div>
                                    <el-tooltip  effect="dark" :content="scope.row.main_title" placement="top">
                                        <div class="name">
                                            {{scope.row.main_title}}
                                        </div>
                                    </el-tooltip>
                                    <div class="price">
                                        <span style="color:red;margin-right:5px;">￥{{scope.row.min_sale_price}} <span v-if="scope.row.min_sale_price != scope.row.max_sale_price">- ￥{{scope.row.max_sale_price}}</span></span>
                                        <!--<span style=" text-decoration:line-through;" v-if="scope.row.max_price !='0.00'">￥{{scope.row.min_price}} - ￥{{scope.row.max_price}}</span>-->
                                        <span style=" text-decoration:line-through;" v-if="scope.row.max_price !='0.00'">￥{{scope.row.min_price}} <span v-if="scope.row.min_price != scope.row.max_price">- ￥{{scope.row.max_price}}</span></span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="style_num"
                    label="款式号"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="类别"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                             <span>{{scope.row.cate_name1}}/{{scope.row.cate_name2}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    label="商品ID"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="update_time"
                    label="状态"
                    show-overflow-tooltip>
                         <template slot-scope="scope">
                             <span>{{scope.row.goods_status|status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <template v-if="scope.row.goods_status ==3">
                                <el-button @click="pull(scope.row)" type="text" size="small" class="red">下架</el-button>
                            </template>
                            <template v-else>
                                <el-button @click="push(scope.row)" type="text" size="small" >上架</el-button>
                            </template>

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
  filters: {
    status(val) {
      val = Number.parseInt(val);
      switch (val) {
        case 1:
          return "待完善信息";
          break;

        case 2:
          return "待上架";
          break;

        case 3:
          return "上架中";
          break;
        case 4:
          return "已下架";
          break;

        default:
          break;
      }
    }
  },
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
        status_id: 0,
        cate_id1: 0,
        cate_id2: 0,
        main_title: null
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
        list: [],
        count: 0
      },
      activeName: 0,
      list: [],
      list1: []
    };
  },
  methods: {
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
      this.queryParams.status_id = this.activeName;
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
        url: "/bg_admin/bg_management/setPersonalStatus",
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
        url: "/bg_admin/goods/getGoods",
        params: this.queryParams
      }).then(res => {
        console.log(res);

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
    this.getCates(0);
  },
  mounted() {}
};
</script>
<style lang="scss">
.tailor-goods-list {
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
  .goods {
    display: flex;
    align-items: center;
    img {
      margin-right: 15px;
    }
    .name {
      margin-bottom: 20px;
      text-align: left;
      width: 300px;
      overflow: hidden;
      text-overflow:ellipsis; 
    white-space: nowrap;
    }
    .price{
        text-align: left;
    }
  }
}
</style>

