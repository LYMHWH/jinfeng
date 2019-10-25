<template>
        <div class="tailor-recharge">
            <el-breadcrumb separator="/" style="margin-bottom:20px;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>充值</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="content" style="margin-bottom:30px;">
                <div class="top">
                    <div class="left row cell">
                        <div class="cell">
                            <img src="../../static/images/expire.png"  style="margin-right:30px;" alt="">
                            <div>
                                <div style="margin-bottom:30px;">
                                    <span>可用余额：</span><span class="num">￥888.88</span>
                                </div>
                                <div>
                                    冻结金额：￥200.00
                                </div>
                            </div>
                        </div>
                        <div>
                            <el-button @click="visible = true">申请提现</el-button>
                        </div>
                    </div>
                    <div class="right">
                       <div class="cell" style="margin-bottom:20px">
                           <img src="../../static/images/wechat.png" alt="" class="icon">
                           <div class="info">支付宝账号：张三    13570579596</div>
                           <el-button @click="edit_wechat">编辑</el-button>
                           <el-button @click="bind_wechat">绑定微信</el-button>
                       </div>
                       <div class="cell">
                            <img src="../../static/images/alipay.png" alt="" class="icon">
                            <div class="info">微信账号：张三    13570579596</div>
                            <el-button @click="edit_alipay">编辑</el-button>
                           <el-button @click="bind_alipay">绑定支付宝</el-button>
                       </div>
                    </div>

                </div>
            </div>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="账户明细" name="first">
                     <div class="table">
                        <el-table ref="multipleTable" border :data="tableData.Rows" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%">
                                <el-table-column
                                prop="trade_num"
                                label="时间"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="pre_update_money"
                                label="交易编号"
                                >
                                </el-table-column>
                                <el-table-column
                                label="金额"
                                >
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.pre_update_money*1>scope.row.updated_money*1" style="color:red;">-{{scope.row.payment_amount}}</div>
                                        <div v-if="scope.row.pre_update_money*1<scope.row.updated_money*1" style="color:green;">+{{scope.row.payment_amount}}</div>
                                    </template>    
                                </el-table-column>
                                <el-table-column
                                prop="updated_money"
                                label="状态"
                                >
                                </el-table-column>
                                <el-table-column
                                label="备注"
                                >
                                    <template slot-scope="scope">
                                        <div>{{scope.row.type_id | formatTypeId}}</div>
                                        
                                    </template>    
                                </el-table-column>
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
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="申请提现" :visible.sync="visible" width="400px">
                <el-form :model="rechargeForm" :rules="rechargeRules" ref="rechargeForm">
                    <el-form-item label="提现方式：" :label-width="formLabelWidth" prop="recharge_type">
                        <el-radio v-model="rechargeForm.recharge_type" label="2">微信</el-radio>
                        <el-radio v-model="rechargeForm.recharge_type" label="1">支付宝</el-radio>
                    </el-form-item>
                    <el-form-item label="提现账号：" :label-width="formLabelWidth" prop="recharge_amount">
                        <span>张三</span><span>13570579596</span> <el-button type="text">修改</el-button>
                    </el-form-item>
                    <el-form-item label="可用余额：" :label-width="formLabelWidth" prop="recharge_amount">
                        <span>888.88元</span>
                    </el-form-item>
                    <el-form-item label="提现金额：" :label-width="formLabelWidth" prop="recharge_amount">
                        <el-input v-model.number="rechargeForm.recharge_amount" type="number" style=" width:155px"></el-input><span style="margin-left:5px;">元</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="apply">确 定</el-button>
                </div>
            </el-dialog>
             <el-dialog title="验证手机号" :visible.sync="visiblemobilephone" width="500px" class="chang-pwd">
                <el-form :model="pwdform">
                    <el-form-item label="手机号码：" :label-width="formLabelWidth">
                        <span>13570579596</span>
                    </el-form-item>
                    <el-form-item label="图形码：" :label-width="formLabelWidth">
                        <div style="display:flex;">
                            <el-input v-model="pwdform.name" style="width:200px"></el-input>
                            <img src="../../static/images/expire.png" alt="" class="img-code">
                        </div>
                    </el-form-item>
                    <el-form-item label="验证码：" :label-width="formLabelWidth">
                        <div style="display:flex;">
                            <el-input v-model="pwdform.name" style="width:200px" ></el-input>
                            <el-button type="text" class="sms-code">发送验证码</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visiblemobilephone = false">取 消</el-button>
                    <el-button type="primary" @click="next">下一步</el-button>
                </div>
            </el-dialog>
             <el-dialog title="绑定支付宝" :visible.sync="visible2" width="500px" class="chang-pwd">
                <el-form :model="form1" :label-width="'100px'">
                    <el-form-item label="账号姓名：">
                       <el-input v-model="pwdform.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号：">
                            <el-input v-model="pwdform.name" ></el-input>
                    </el-form-item>
                
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible2 = false">取 消</el-button>
                    <el-button type="primary" @click="submit1">确 定</el-button>
                </div>
            </el-dialog>
        </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";

export default {
  name: "myaccount",
  mixins: [mixin],
  data() {
    return {
      activeName2: "first",
      formLabelWidth: "120px",
      visible: false,
      rechargeForm: {},
      rechargeRules: {},
      visiblemobilephone: false,
      visible2: false,
      pwdform: {
        name: ""
      },
      form1: {}
    };
  },
  methods: {
    handleClick() {},
    apply() {},
    edit_wechat() {
      this.visiblemobilephone = true;
    },
    bind_wechat() {
      this.visiblemobilephone = true;
    },
    edit_alipay() {
      this.visiblemobilephone = true;
    },
    bind_alipay() {
      this.visiblemobilephone = true;
    },
    submit1() {}
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>
<style lang="scss">
.tailor-recharge {
  .top {
    display: flex;
    align-items: center;
    padding: 30px;
    border: 1px solid #ddd;
    .left,
    .right {
      flex: 1;
      padding: 0 30px;
    }
    .left {
      border-right: 1px solid #ddd;
      padding-right: 60px;
    }
    .right {
      padding-left: 60px;
      .icon {
        width: 50px;
        height: 50px;
      }
      .info {
        min-width: 300px;
        padding-left: 20px;
      }
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .cell {
    display: flex;
    align-items: center;
  }
  .content {
    .money {
      margin: 50px 20px;
      .num {
        color: #014691;
        font-size: 30px;
      }
    }
  }
  .img-code {
    width: 100px;
    height: 36px;
    background-color: #409eff;
  }
}
</style>
