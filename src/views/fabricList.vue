<template>
  <div class="tailor-fabric-list">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面料列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item label="面料状态：">
          <el-select placeholder="请选择" @change="order_status_query" v-model="queryParams.status_id">
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="item in order_status_list"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面料分类：">
          <el-select placeholder="请选择" @change="order_status_query1" v-model="queryParams.cate_id">
            <el-option label="全部" :value="-1"></el-option>
            <el-option
              :label="item.item_value"
              :value="item.id"
              v-for="item in order_status_list1"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <div style="float:right;">
          <!-- <el-form-item>
            <el-input placeholder="请输入面料号" v-model="queryParams.fabric_num"></el-input>
          </el-form-item>-->
          
          <el-form-item >
            <el-autocomplete
                v-model="keyword"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入面料号"
                @select="handleSelect"
            ></el-autocomplete>
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

        <el-table-column prop="fabric_num" label="面料编号"></el-table-column>
        <el-table-column prop="fabric_variety" label="面料品种"></el-table-column>
        <el-table-column prop="fabric_name" label="面料名称"></el-table-column>
        <el-table-column prop="分类" label="分类" show-overflow-tooltip></el-table-column>
        <el-table-column prop="系列" label="系列" show-overflow-tooltip></el-table-column>
        <el-table-column prop="档次" label="面料档次" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="属性" label="属性" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column prop="花型" label="花色" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="颜色" label="颜色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="成分" label="成分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="yarn_count" label="纱支" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="面料图片" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="check_fabric_photos(scope.row)" type="text" size="small">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="成衣图片" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="check_clothing_photos(scope.row)" type="text" size="small">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="模特图片" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="check_model_photos(scope.row)" type="text" size="small">点击查看</el-button>
          </template>
        </el-table-column>
       
        <el-table-column prop="price" label=" 面料价格/元" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_ip" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.status_id ?'green':'red']"
              v-text="scope.row.status_id ?'启用':'停用'"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="update_time" label="更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.status_id ?'red':'green']"
            >{{scope.row.status_id ?'停用':'启用'}}</el-button>
            <el-button @click="check(scope.row)" type="text" size="small">编辑</el-button>
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
        :total="tableData.count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import "../../static/swipebox/lib/ios-orientationchange-fix.js";
import "../../static/swipebox/js/jquery.swipebox.js";
export default {
  name: "fabricList",
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
        cate_id: -1,
        fabric_num: null
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
      order_status_list1: [],
      nikeList: [],
      nikeName: null,
      tableData: {},
      keyword: ""
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      queryString &&
        this.$q({
          url: "/bg_admin/fabric/getFabricNums",
          params: {
            keyword: queryString
          }
        }).then(res => {
          res = res.map(v => {
            return { value: v };
          });
          cb(res);
        });
    },
    handleSelect(item) {
      this.queryParams.fabric_num = item.value;
      this.queryParams.page = 1;
      this.query();
    },
    del(row) {
      this.delete(
        "确定要删除吗？删除后，相关的商品需重新编辑上架！",
        "/bg_admin/fabric/deleteFabric",
        {
          id: row.id
        }
      );
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
        this.toggle(
          "确定要停用吗？停用后相关的商品需重新编辑上架！",
          "/bg_admin/fabric/setFabricStatus",
          data
        );
      } else {
        this.$q({
          method: "post",
          url: "/bg_admin/fabric/setFabricStatus",
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
      this.$router.push({ path: "/editFabric", query: { id: row.id } });
    },
    query_submit() {
      this.queryParams.fabric_num = this.keyword;
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
        url: "/bg_admin/fabric/manageFabrics",
        params: this.queryParams
      }).then(res => {
        res.list = res.list.map(v => {
          if (v.items && v.items.length) {
            v.items.forEach((val, i) => {
              v[val.item_name] = val.item_value;
            });
          }
          return v;
        });
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
    getFabricItems() {
      this.$q({
        url: "/bg_admin/fabric/getFabricItem",
        params: {
          id: 1
        }
      }).then(res => {
        if (Array.isArray(res)) {
          res.map(item => {
            if (item.item_name == "分类") {
              this.order_status_list1 = item.item_values;
            }
          });
          // this.order_status_list1 = res[0].item_values;
        } else {
          this.order_status_list1 = [];
        }
      });
    }
  },
  created() {
    this.query();
    this.getFabricItems();
  },
  mounted() {}
};
</script>
<style lang="scss">
.tailor-fabric-list {
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
}
</style>

