<template>
    <div class="tailor-account-record">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资金变动记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form :model="queryParams" :inline="true">
                <el-form-item label="操作类型：" :label-width="formLabelWidth">
                    <el-select @change="fetchType" v-model="queryParams.type_id">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option :label="item.label" :value="item.value" v-for="item in type_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="变动时间：" :label-width="formLabelWidth">
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
                <!--<el-form-item>
                    <el-button type="primary" @click="submit">查询</el-button>
                </el-form-item>-->
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.data" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%">
                  <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="变动时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="trade_num"
                    label="交易编号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="pre_update_money"
                    label="变动前金额"
                    >
                    </el-table-column>
                    <el-table-column
                    label="变动金额"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.pre_update_money*1>scope.row.updated_money*1" style="color:red;">-{{scope.row.payment_amount}}</div>
                            <div v-if="scope.row.pre_update_money*1<scope.row.updated_money*1" style="color:green;">+{{scope.row.payment_amount}}</div>
                        </template>    
                    </el-table-column>
                    <el-table-column
                    prop="updated_money"
                    label="变动后金额"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作类型"
                    >
                        <template slot-scope="scope">
                            <div>{{scope.row.type_id | formatTypeId}}</div>
                            
                        </template>    
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    label="操作人"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="update_remark"
                    label="备注"
                    >
                    </el-table-column>
                    <el-table-column label="操作时间"  prop="create_time"> </el-table-column>

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
          return "付款";
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
          return "一键返款";
          break;
        case 8:
          return "一键扣款";
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
      type_list: [
        { label: "充值", value: 1 },
        { label: "付款", value: 2 },
        { label: "退款", value: 3 },
        { label: "申请提现", value: 4 },
        { label: "提现通过", value: 5 },
        { label: "提现不通过", value: 6 },
        { label: "一键返款", value: 7 },
        { label: "一键扣款", value: 8 }
      ],
      queryParams: {
        stime: "",
        etime: "",
        type_id: 0,
        page: 1,
        size: 10
      },
      formLabelWidth: "120px",
      tableData: { data: [], count: 0 }
    };
  },
  methods: {
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
    fetchType() {
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_report/showCapitalRecords",
        params: this.queryParams
      }).then(res => {
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


