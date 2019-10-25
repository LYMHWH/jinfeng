<template>
    <div class="tailor-auditInvoice">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发票审核</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="审核状态：" >
                    <el-select style="width:130px;" v-model="queryParams.status_id" @change="query_submit">
                        <el-option :label="item.label" :value="item.value" v-for="item in status_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间：">
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
                <el-form-item label="审核通过总额：">
                    <span>￥{{tableData.reviewed}}</span>
                </el-form-item>
                <el-form-item label="审核拒绝总额：">
                    <span>￥{{tableData.denyed}}</span>
                </el-form-item>
                <el-form-item label="待审核总额：">
                    <span>￥{{tableData.reviewing}}</span>
                </el-form-item>
                <div style="float:right">
                    <el-form-item style="float:right">
                        <el-button type="primary" @click="query_submit">查询</el-button>
                    </el-form-item>
                    <el-form-item style="float:right">
                        <el-input placeholder="姓名/手机号" v-model="queryParams.skey"></el-input>
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
                        prop="invoice_type"
                        label="发票类型"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.invoice_type===1">纸质发票</span>
                            <span v-if="scope.row.invoice_type===2">电子发票</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_head_type"
                        label="抬头类型"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.invoice_head_type===1">个人</span>
                            <span v-if="scope.row.invoice_head_type===2">单位</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_head"
                        label="抬头"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_tax_id"
                        label="税号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="开票金额"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        label="申请人姓名"
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="mobilephone"
                        label="申请人手机号"
                        width="120"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_content"
                        label="发票内容"
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_company_phone"
                        label="单位电话"
                        width="120"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_company_address"
                        label="单位地址"
                        width="160"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_email"
                        label="收票人邮箱"
                        width="160"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_company_bank_name"
                        label="单位开户行"
                        width="180"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="invoice_company_bank_account"
                        label="单位银行账号"
                        width="180"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="status_id"
                        label="审核状态"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="red" v-if="scope.row.status_id===1">待审核</span>
                            <span v-if="scope.row.status_id===2">审核通过</span>
                            <span v-if="scope.row.status_id===3">审核拒绝</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="review_remark"
                        label="备注"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="申请时间"
                        show-overflow-tooltip width="160">
                    </el-table-column>
                    <el-table-column
                        prop="update_time"
                        label="更新时间"
                        show-overflow-tooltip width="160">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        >
                        <template slot-scope="scope">
                            <el-button @click="pass(scope.row)" class="green"  type="text" size="small" v-if="scope.row.status_id ===1">审核通过</el-button>
                            <el-button @click="deny(scope.row)" class="red" type="text" size="small" v-if="scope.row.status_id ===1">审核拒绝</el-button>
                        </template>
				</el-table-column>
            </el-table>
        </div>
        <div class="pagination" v-if="tableData.count">
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
        <el-dialog title="审核拒绝" :visible.sync="dialogFormVisible" >
            <el-form :model="form1" :rules="formRules1" ref="form1" :label-width="'120px'">
                <el-form-item label="拒绝理由："  prop="review_remark">
                    <el-input  type="textarea" v-model="form1.review_remark" placeholder="请添加拒绝理由"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit1">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
    name: "auditInvoice",
    mixins: [mixin],
    components: {
        upImage: upImage
    },
    data() {
        // var now = new Date();
        // var startDate = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
        // startDate = new Date(startDate);
        return {
            date: [],
            show1: true,
            status_list:[
                {label:"全部",value:-1},
                {label:"待审核",value:1},
                {label:"审核通过",value:2},
                {label:"审核拒绝",value:3},
            ],
            dialogFormVisible:false,
            form: {
                id: "",
                remark: "",
            },
            formRules: {
               
            },
            form1: {
                id:'',
                review_remark:'',
            },
            formRules1: {

            },
            queryParams: {
                size: 10,
                page: 1,
                status_id: -1,
                stime: '',
                etime: '',
                skey: '',
            },
            tableData:{
                list:[],
                count:0
            }
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
        pass(row){
            this.toggle('确定审核通过？','/bg_admin/bg_todo/approveInvoice',{id:row.id})
        },
        deny(row){
            this.clean(this.form);
            this.form1.id = row.id;
            this.dialogFormVisible = true;
        },
        query() {
            this.$q({
                url: "/bg_admin/bg_todo/getInvoices",
                params: this.queryParams
            }).then(res => {
                this.tableData = res;
            });
        },
        query_submit(){
            this.queryParams.page =1;
            this.query();
        },
        submit1() {
            this.post("form1", '/bg_admin/bg_todo/disapproveInvoice', this.form1, "dialogFormVisible");
        },
    },

    created() {
        this.query();
    }
};
</script>
<style lang="scss">
.tailor-auditInvoice {
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
  .img{
      width: 50px;
      height: 50px;
  }
}
</style>

