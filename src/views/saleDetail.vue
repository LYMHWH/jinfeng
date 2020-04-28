<template>
    <div class="tailor-sale-detail">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>销售明细</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form :model="queryParams" :inline="true" :label-width="'90px'" ref="query_form" action="/bg_admin/bg_report/downSaleRecords">
                <el-form-item label="订单状态：">
                    <el-select style="width:100px;" v-model="queryParams.status_id" @change="order_status_query">
                        <el-option :label="item.label" :value="item.value" v-for="item in status_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品类别：" style="margin-left:30px;">
                    <el-select  placeholder="请选择" v-model="queryParams.cate_id1" @change="getCates1">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option :label="item.name" :value="item.id" v-for="(item,index) in list" :key="index"></el-option>
                    </el-select>
                    <el-select  placeholder="请选择" @change="order_status_query" v-model="queryParams.cate_id2">
                          <el-option label="全部" :value="0"></el-option>
                           <el-option :label="item.name" :value="item.id" v-for="(item,index) in list1" :key="index" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址：" >
                     <el-select v-model="queryParams.province_code" clearable placeholder="省" @change="fetchCity">
                        <el-option :label="item.area_name" :value="item.area_code" v-for="item in provinceList" :key="item.area_code"></el-option>
                    </el-select>
                    <el-select v-model="queryParams.city_code" clearable placeholder="市" @change="fetchRegion">
                        <el-option :label="item.area_name" :value="item.area_code" v-for="item in cityList" :key="item.area_code"></el-option>
                    </el-select>
                    <el-select v-model="queryParams.district_code" clearable placeholder="区" @change="fetchDistrict">
                        <el-option :label="item.area_name" :value="item.area_code" v-for="item in regionList" :key="item.area_code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式：" >
                    <el-select v-model="queryParams.pay_way" @change="order_status_query">
                        <el-option :label="item.label" :value="item.value" v-for="item in list2" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" style="margin-left:30px;">
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
                    <el-button type="primary" @click="download">下载</el-button>
                </el-form-item>
                <span style="display:inline-block;">
                <el-form-item style="margin-left:50px;">
                    <!--
                     <el-input placeholder="请输入内容" v-model="queryParams[select]" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择" @change="select_item" style="width:140px;">
                            <el-option label="商品名称" value="main_title"></el-option>
                            <el-option label="面料号" value="fabric_num"></el-option>
                            <el-option label="买家姓名" value="nickname"></el-option>
                            <el-option label="收货人" value="recipient_name"></el-option>
                            <el-option label="收货人手机号" value="mobilephone"></el-option>
                        </el-select>
                    </el-input>
                    -->
                    <el-input style="width:400px" placeholder="商品名称/面料号/买家姓名/收货人/收货人手机号" v-model="queryParams.skey"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">查询</el-button>
                </el-form-item>
                </span>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.data" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%">
                  <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="order_num"
                    label="订单编号"
                      show-overflow-tooltip
                    >
                         <template slot-scope="scope">
                            <el-button type="text" @click="check(scope.row)">{{scope.row.order_num}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="订单状态"
                    >
                          <template slot-scope="scope">
                             <span>{{scope.row.order_status_id|formatTypeId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="pre_update_money"
                    label="售后状态"
                    >
                    <template slot-scope="scope">
                      <span v-if="scope.row.after_sale_status_id == 1">待处理</span>
                      <span v-if="scope.row.after_sale_status_id == 2">已处理</span>
                      <span v-if="!scope.row.after_sale_status_id">无售后</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                     prop="cate_name1"
                    label="一级类别"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="cate_name2"
                    label="二级类别"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="main_title"
                    label="商品名称"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                    prop="fabric_num"
                    label="面料号"
                    >
                    </el-table-column>
                    <el-table-column label="商品单价"  prop="price">
                      <template slot-scope="scope">
                        <span v-if="scope.row.sell_type_id == 1">{{(Number(scope.row.group_price)+Number(scope.row.personalization_price))}}</span>
                        <span v-if="scope.row.sell_type_id == 2">{{(Number(scope.row.retail_price)+Number(scope.row.personalization_price))}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="数量"  prop="quantity"> </el-table-column>
                    <el-table-column label="商品总价"  prop="payment_amount">
                      <template slot-scope="scope">
                        <span v-if="scope.row.sell_type_id == 1">{{(Number(scope.row.group_price)+Number(scope.row.personalization_price))*scope.row.quantity}}</span>
                        <span v-if="scope.row.sell_type_id == 2">{{(Number(scope.row.retail_price)+Number(scope.row.personalization_price))*scope.row.quantity}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="买家名称"  prop="nickname"></el-table-column>
                    <el-table-column label="收货人"  prop="recipient_name"> </el-table-column>
                    <el-table-column label="收货人手机号" prop="recipient_mobilephone" width="120"> </el-table-column>
                    <el-table-column label="收货地址"  prop="recipient_address"  show-overflow-tooltip>
                         <template slot-scope="scope">
                             <span>{{scope.row.recipient_province_name}} </span>
                             <span>{{scope.row.recipient_city_name}} </span>
                             <span>{{scope.row.recipient_district_name}} </span>
                             <span>{{scope.row.recipient_address}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="支付方式"  prop="pay_way">
                        <template slot-scope="scope">
                             <span>{{scope.row.pay_way|format_pay_way}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单创建时间"  prop="create_time" width="120" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="订单更新时间"  prop="update_time" width="120" show-overflow-tooltip> </el-table-column>
            </el-table>
        </div>
        <div class="pagination" v-show="tableData.data.length">
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
         <a :href="download_url" download id="download"></a>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
export default {
  name: "saleDetail",
  mixins: [mixin],
  filters: {
    format_pay_way(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "余额";
          break;
        case 2:
          return "微信";
          break;
        default:
          break;
      }
    },

    formatTypeId(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "待支付";
          break;
        case 2:
          return "待确认";
          break;
        case 3:
          return "已取消";
          break;
        case 4:
          return "待发货";
          break;
        case 5:
          return "已发货";
          break;
        case 6:
          return "已完成";
          break;
        default:
          break;
      }
    }
  },
  data() {
    // var now = new Date();
    // var startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
    // startDate = new Date(startDate);
    return {
      date: [],
      status_list: [
        { label: "全部", value: 0 },
        { label: "待支付 ", value: 1 },
        { label: "待确认", value: 2 },
        { label: "已取消 ", value: 3 },
        { label: "待发货", value: 4 },
        { label: "已发货", value: 5 },
        { label: "已完成", value: 6 }
      ],
      list: [],
      list1: [],
      list2: [
        { label: "全部", value: 0 },
        { label: "余额 ", value: 1 },
        { label: "微信", value: 2 }
      ],
      provinceList: [],
      cityList: [],
      regionList: [],
      queryParams: {
        page: 1,
        size: 10,
        status_id: 0,
        cate_id1: 0,
        cate_id2: 0,
        province_code: "",
        city_code: "",
        district_code: "",
        stime: "",
        etime: "",
        pay_way: 0,
        skey: ""
        // main_title:"",
        // fabric_num:"",
        // nickname:"",
        // recipient_name:"",
        // mobilephone:"",
      },
      select: "main_title",
      input: "",
      formLabelWidth: "120px",
      tableData: { data: [], count: 0 },
      last_select: "main_title",
      download_url: ""
    };
  },
  methods: {
    select_item(val) {
      this.queryParams[this.last_select] = "";
      this.last_select = val;
    },
    download() {
      this.$q({
        url: "/bg_admin/bg_report/downSaleRecords",
        method: "POST",
        params: this.queryParams
      }).then(
        res => {
          this.download_url = res;
          this.$nextTick(() => {
            document.querySelector("#download").click();
          });
          //  window.open(res,"_blank");
        },
        rej => {
          console.log(rej);
        }
      );
    },
    order_status_query(value) {
      this.queryParams.page = 1;
      this.query();
    },
    check(row) {
      this.$router.push({ path: "/orderInfo", query: { id: row.order_id } });
    },
    getCates1(val) {
      this.queryParams.cate_id2 = 0;
      if (val == 0) {
        this.list1 = [];
        this.queryParams.cate_id1 = val;
        this.queryParams.page = 1;
        this.query();
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
    getCates(parent_id) {
      this.$q({
        url: "/bg_admin/goods/getCates",
        params: { parent_id: parent_id }
      }).then(res => {
        this.list = res;
      });
    },
    datePicker(date) {
      if (!date) {
        this.queryParams.stime = "";
        this.queryParams.etime = "";
        this.queryParams.page = 1;
        this.query();
        return;
      }
      this.queryParams.stime = date[0];
      this.queryParams.etime = date[1];
      this.queryParams.page = 1;
      this.query();
    },
    submit() {
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_report/showSaleRecords",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    fetchProvince() {
      this.$q({
        url: "/bg_admin/index/getAreaList?=440300"
      }).then(res => {
        this.provinceList = res;
      });
    },
    fetchCity(area_code) {
      this.$q({
        url: "/bg_admin/index/getAreaList?=440300",
        params: { parent_area_code: area_code }
      }).then(res => {
        this.cityList = res;
      });
      this.queryParams.page = 1;
      this.query();
    },
    fetchRegion(area_code) {
      this.$q({
        url: "/bg_admin/index/getAreaList?=440300",
        params: { parent_area_code: area_code }
      }).then(res => {
        this.regionList = res;
      });
      this.queryParams.page = 1;
      this.query();
    },
    fetchDistrict() {
      this.queryParams.page = 1;
      this.query();
    }
  },

  created() {
    this.query();
    this.getCates(0);
    this.fetchProvince();
  }
};
</script>
<style lang="scss">
.tailor-sale-detail {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
}
</style>


