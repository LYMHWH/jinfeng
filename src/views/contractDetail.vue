<template>
    <div class="tailor-contractDetail">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/contractReview' }">合同审核</el-breadcrumb-item>
            <el-breadcrumb-item>合同详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="body">
            <div class="info">
                <div class="section">
                    <div class="title">
                        <span>合同状态：</span>
                        <span class="red">{{res.status_id | format_contract_status}}</span>    
                    </div>
                    <div class="content">
                        <el-form inline :label-width="labelWidth">
                            <!--<el-form-item label="合同编号：" class="item">
                                <span class="text">{{res.order_num}}</span>
                            </el-form-item>-->
                            <el-form-item label="合同创建时间：" class="item">
                                <span class="text">{{res.create_time}}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="section">
                    <div class="title">
                        <span>合同内容：</span>
                    </div>
                    <el-form inline :label-width="labelWidth">
                        <el-form-item label="合同名称：" class="item">
                            <span class="text">{{res.contract_name}}</span>
                        </el-form-item>
                        <el-form-item label="省市区：" class="item">
                            <span class="text">{{res.province_name+res.city_name+res.district_name}}</span>
                        </el-form-item>
                        <el-form-item label="合同学校：" class="item">
                            <span class="text">{{res.school_name}}</span>
                        </el-form-item>
                        <div>
                            <el-form-item label="合同团购日期：">
                                <span v-if="!modifyTime">{{date[0]}}~{{date[1]}}</span>
                                <el-date-picker
                                    v-if="modifyTime"
                                    v-model="date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                                    @change="datePicker"
                                >
                                </el-date-picker>
                                <el-button v-if="!modifyTime" @click="modifyTime = true" style="margin-left:30px;" type="primary">修改</el-button>
                                <el-button v-if="modifyTime" @click="save" style="margin-left:30px;" type="primary">保存</el-button>
                                <el-button v-if="modifyTime" @click="cancel" style="margin-left:30px;" type="primary">取消</el-button>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="合同照片：">
                                <span><img :src="res.pictures" /></span>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="section">
                    <div class="title">
                        <span>合伙人信息：</span>
                    </div>
                    <el-form inline :label-width="labelWidth">
                        <el-form-item label="合伙人姓名：" class="item">
                            <span class="text">{{res.nickname}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：" class="item">
                            <span class="text">{{res.mobilephone}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="section">
                    <div class="title">
                        <span>本合同团购服装收货人信息：</span>
                    </div>
                    <el-form inline :label-width="labelWidth">
                        <el-form-item label="收货人姓名：" class="item">
                            <span class="text">{{res.nickname}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：" class="item">
                            <span class="text">{{res.group_mobilephone}}</span>
                        </el-form-item>
                        <el-form-item label="地址：" class="item">
                            <span class="text">{{res.group_address}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="section">
                    <div class="title">
                        <span>款式清单：</span>
                        <el-button v-if="!styleInfo" @click="styleInfo = true" style="margin-left:30px;" type="primary">编辑</el-button>
                        <el-button v-if="styleInfo" @click="save" style="margin-left:30px;" type="primary">保存</el-button>
                        <el-button v-if="styleInfo" @click="cancel" style="margin-left:30px;" type="primary">取消</el-button>
                    </div>
                    <el-table ref="multipleTable" border :data="form.price_info" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%;margin-top:20px;" >
                        <el-table-column
                            prop="info"
                            label="商品信息"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span><img src="scope.row.image" /></span>
                                <span>{{scope.row.main_title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="style_num"
                            label="款式号"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="default_price"
                            label="默认价格"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="group_price"
                            label="合同团购价"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input :disabled="!styleInfo" type="text" style="text-align:center;" v-model="scope.row.group_price" placeholder=""></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="retail_price"
                            label="合同零售价"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input :disabled="!styleInfo" type="text" v-model="scope.row.retail_price" placeholder=""></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="section">
                    <div class="title">
                        <span>提成方案：</span>
                        <el-button v-if="!deduct" @click="deduct = true" type="primary" style="margin-left:30px;">编辑</el-button>
                        <el-button v-if="deduct" @click="save" style="margin-left:30px;" type="primary">保存</el-button>
                        <el-button v-if="deduct" @click="cancel" style="margin-left:30px;" type="primary">取消</el-button>
                    </div>
                    <table class="royalty" style="margin-top:20px;">
                        <tr>
                            <th>提成时间</th>
                            <th>提成比例</th>
                        </tr>
                        <tr>
                            <td>团购日期结束时</td>
                            <td><el-input :disabled="!deduct" style="width:120px;" type="number" v-model="form.deduct_info.deduct_group_end" placeholder=""></el-input>%</td>
                        </tr>
                        <tr>
                            <td>团购交付后&nbsp;<el-input style="width:80px;" :disabled="!deduct" type="number" v-model="form.deduct_info.deduct_group_confirm.days_after" placeholder=""></el-input>天</td>
                            <td><el-input :disabled="!deduct" style="width:120px;" type="number" v-model="form.deduct_info.deduct_group_confirm.ratio" placeholder=""></el-input>%</td>
                        </tr>
                        <tr>
                            <td>零售每笔付款后&nbsp;<el-input :disabled="!deduct" style="width:80px;" type="number" v-model="form.deduct_info.deduct_retail_confirm.days_after" placeholder=""></el-input>天</td>
                            <td><el-input :disabled="!deduct" style="width:120px;" type="number" v-model="form.deduct_info.deduct_retail_confirm.ratio" placeholder=""></el-input>%</td>
                        </tr>
                    </table>
                </div>
                <div class="section" style="border:none;" v-if="order_logs&&order_logs.length">
                    <div class="title">
                        <span>操作记录：</span>
                    </div>
                     <div class="">
                        <el-table
                            :data="order_logs"
                            style="width: 100%"
                            :cell-style="cellStyle" 
                            :header-cell-style="headerCellStyle"
                            border>
                            <el-table-column
                                prop="operator_name"
                                label="操作人"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="create_time"
                                label="操作时间">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
import "../../static/swipebox/lib/ios-orientationchange-fix.js";
import "../../static/swipebox/js/jquery.swipebox.js";
export default {
    name: "contractDetail",
    mixins: [mixin],
    components: {
        upImage: upImage
    },
    filters: {
        format_contract_status(value) {
            value = Number.parseInt(value);
            switch (value) {
                case 1:
                return "待审核";
                break;
                case 2:
                return "审核拒绝";
                break;
                case 3:
                return "审核通过";
                break;
                default:
                break;
            }
        },
    },
    data() {
        var now = new Date();
        var startDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        var endDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 6}`;
        // startDate = new Date(startDate)
        // endDate = new Date(endDate);
        return {
            labelWidth:'150px',
            order_logs: [],
            res: {},
            date: [startDate, endDate],
            startTime: startDate,
            endTime: endDate,
            show: false,
            show1: false,
            modifyTime: false,  //修改时间
            styleInfo: false,  //款式清单
            deduct: false,  //提成方案
            status_list:[
                {label:"全部",value:0},
                {label:"待审核",value:1},
                {label:"审核拒绝",value:2},
                {label:"审核通过",value:3},
            ],
            dialogFormVisible:false,
            form: {
                id: "",
                group_start_time: '',
                group_end_time: '',
                price_info: [],
                deduct_info: {
                    deduct_group_end: '',  //团购结束时提成
                    deduct_group_confirm: {
                        days_after: '',   //团购交付后多少天
                        ratio: ''    //提成比例
                    },
                    deduct_retail_confirm:{
                        days_after: '',   //零售交付后多少天
                        ratio: ''    //提成比例
                    }
                }
            },
            deduct_info: {
                deduct_group_end: '',  //团购结束时提成
                deduct_group_confirm: {
                    days_after: '',   //团购交付后多少天
                    ratio: ''    //提成比例
                },
                deduct_retail_confirm:{
                    days_after: '',   //零售交付后多少天
                    ratio: ''    //提成比例
                }
            },
            formRules: {
                
            },
            form1: {
                id:'',
                remark:'',
            },
            formRules1: {

            },
            id: null,
            tableData:{
                list:[],
                count:0
            },
            contractList:[]  //合同列表
        };
    },
    methods: {
        datePicker(date) {
            if(!date) {
                this.form.group_start_time = '';
                this.form.group_end_time = '';
                return
            }
            this.form.group_start_time = date[0];
            this.form.group_end_time = date[1];
        },
        query() {
            this.$q({
                url: "/bg_admin/bg_todo/getContractDetail",
                method:'post',
                data:{id:this.id}
            }).then(res => {
                this.res = res;
                this.form.deduct_info = res.deduct_json ? res.deduct_json : JSON.parse(JSON.stringify(this.deduct_info));
                this.form.price_info = res.goods_list ? res.goods_list : [];
                if(res.group_start_time){
                    this.date = [res.group_start_time, res.group_end_time]
                }
            });
        },
        save() {
            this.form.id = this.id;
            this.$q({
                url: "/bg_admin/bg_todo/modify_contract_info",
                method:'post',
                data:this.form
            }).then(res => {
                this.query()
                this.modifyTime = false;
                this.styleInfo = false;
                this.deduct = false;
            });
        },
        cancel() {
            this.date = [this.startTime,this.endTime];
            this.query()
            this.modifyTime = false;
            this.styleInfo = false;
            this.deduct = false;
        }
    },

    created() {
        this.id = this.$route.query.id;
        this.query();
    }
};
</script>
<style lang="scss">
.tailor-contractDetail {
   .body {
    padding-right: 30px;
  }
  .steps {
    padding: 30px;
    border-bottom: 1px solid #ddd;
  }
  .price {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
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
      width: 160px;
      overflow: hidden;
      text-overflow:ellipsis; 
    white-space: nowrap;
    }
    .price{
        text-align: left;
    }
  }
  .section {
    padding-top: 20px;
    border-bottom: 1px dashed #ddd;
    .content {
      width: 1200px;
      .item {
        width: 500px;
      }
    }
  }
  .no-data-text{
      font-size: 14px;
      font-weight: normal;
  }
  .group-orders{
      margin-bottom: 20px;
      .label{
           background-color: #f5f5f5;
      }
 .group-title {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    cursor: pointer;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-bottom: none;
  }
    .photo {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-top: none;
    .label {
      width: 100px;
      text-align: center;
      border-right: 1px solid #ddd;
      height: 120px;
      line-height: 120px;
    }
    .content {
      padding: 0 20px;
      flex: 1;
      height: 120px;
      display: flex;
      align-items: center;
      overflow: auto;
    }
  }
  .img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
    .row {
    line-height: 50px;
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-top: none;
    .label {
      width: 100px;
      text-align: center;
      border-right: 1px solid #ddd;
    }
    .content {
      padding: 0 20px;
      flex: 1;
    }
  }
  
  .table {
    border: 1px solid #ddd;
    overflow: hidden;
    border-bottom: none;
    .cell {
      box-sizing: border-box;
      width: 50%;
      float: left;
      line-height: 40px;
      display: flex;
      border-bottom: 1px solid #ddd;
      &:nth-of-type(2n-1) {
        border-right: 1px solid #ddd;
      }
      .label {
        width: 100px;
        text-align: center;
        border-right: 1px solid #ddd;
      }
      .content {
        flex: 1;
        padding-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .remark {
      width: 100%;
      padding-right: 20px;
      border-right: none !important;
      .content {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  }
   .express{
        height: 300px;
        overflow-y:auto;
        border:1px solid #ddd;
        box-sizing: border-box;
     .express-step{
            padding:20px;
            box-sizing: border-box;
     }
   }
   .royalty{
      border-collapse:collapse;
      font-size: 14px;
    }
    
    .royalty, .royalty th, .royalty td{
        border: 1px solid #ebeef5;
    }
    .royalty th{
        background: rgb(245, 245, 245);
        color:#909399;
        height:40px;
    }
    .royalty td{
        text-align:center;
        padding: 10px 20px;
    }
}
</style>

