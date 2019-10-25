<template>
    <div class="tailor-account-record">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>经营报表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form :model="queryParams" :inline="true">
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-select v-model="queryParams.where.type_id">
                        <el-option label="全部" value="0"></el-option>
                        <el-option :label="item.label" :value="item.value" v-for="item in type_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
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
                <div style="float:right;">
                    <el-form-item>
                        <el-input placeholder="请输入关键字搜索"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">搜索</el-button>
                    </el-form-item>
                 </div>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.Rows" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%">
                    <el-table-column
                    prop="trade_num"
                    label="订单号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="pre_update_money"
                    label="商品类别"
                    >
                    </el-table-column>
                    <el-table-column
                    label="客户姓名"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.pre_update_money*1>scope.row.updated_money*1" style="color:red;">-{{scope.row.payment_amount}}</div>
                            <div v-if="scope.row.pre_update_money*1<scope.row.updated_money*1" style="color:green;">+{{scope.row.payment_amount}}</div>
                        </template>    
                    </el-table-column>
                    <el-table-column
                    prop="updated_money"
                    label="客户手机号"
                    >
                    </el-table-column>
                    <el-table-column
                    label="客户地址"
                    >
                        <template slot-scope="scope">
                            <div>{{scope.row.type_id | formatTypeId}}</div>
                            
                        </template>    
                    </el-table-column>
                    <el-table-column
                    prop="truename"
                    label="订单状态"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="truename"
                    label="实付金额"
                    >
                  
                    </el-table-column>
                    <el-table-column
                    prop="update_remark"
                    label="备注"
                    >
                    </el-table-column>
                      <el-table-column
                    prop="truename"
                    label="下单时间"
                    >
                     </el-table-column>
                    <el-table-column label="支付时间"  prop="create_time"> </el-table-column>

            </el-table>
        </div>
        <div class="pagination" v-show="tableData.Total">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.Total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
export default {
  name: "accountRecord",
  mixins: [mixin],
  filters: {
    formatTypeId(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "充值";
          break;
        case 2:
          return "消费";
          break;
        case 3:
          return "退款";
          break;
        case 4:
          return "申请提现";
          break;
        case 5:
          return "提现通过";
          break;
        case 6:
          return "提现不通过";
          break;
        case 7:
          return "交纳保证金";
          break;
        case 8:
          return "退还保证金";
          break;
        case 9:
          return "量体费用到账";
          break;
        case 10:
          return "一键返款";
          break;
        case 11:
          return "一键扣款";
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
      date: [startDate, new Date()],
      type_list: [
        { label: "充值", value: 1 },
        { label: "消费", value: 2 },
        { label: "退款", value: 3 },
        { label: "申请提现", value: 4 },
        { label: "提现通过", value: 5 },
        { label: "提现不通过", value: 6 },
        { label: "交纳保证金", value: 7 },
        { label: "退还保证金", value: 8 },
        { label: "量体费用到账", value: 9 },
        { label: "一键返款", value: 10 },
        { label: "一键扣款", value: 11 }
      ],
      queryParams: {
        where: {
          type_id: "0",
          STime: "",
          ETime: ""
        },
        page: 1,
        size: 25
      },
      formLabelWidth: "120px",
      tableData: {}
    };
  },
  methods: {
    datePicker(date) {
      this.queryParams.where.STime = date[0];
      this.queryParams.where.ETime = date[1];
    },
    submit() {
      this.query();
    },
    query() {
      this.$post(
        "/ecommerce_report/getEcommerceCapitalRecords",
        this.queryParams
      ).then(res => {
        this.tableData = res;
      });
    }
  },
  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-account-record {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
}
</style>


