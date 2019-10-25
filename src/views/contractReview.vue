<template>
    <div class="tailor-contract-review">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>合同审核</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="审核状态：" >
                    <el-select v-model="queryParams.status_id" @change="query_submit">
                        <el-option :label="item.label" :value="item.value" v-for="item in status_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间：" style="margin-left:30px;">
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
                <el-form-item style="float:right">
                    <el-button type="primary" @click="query_submit">查询</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-input style="width:300px;" placeholder="合伙人姓名/合伙人手机号" v-model="queryParams.skey"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.list" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                 <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <!--<el-table-column
                    prop="username"
                    label="合同编号"
                    width="130">
                    <template slot-scope="scope">
                        <span v-text="scope.row.username" @click="checkContractDetail(row.id)"></span>
                    </template>
                </el-table-column>-->
                <el-table-column
                    prop="contract_name"
                    label="合同名称"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="province_name"
                    label="省"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="city_name"
                    label="市"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="district_name"
                    label="县或区"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="school_name"
                    label="合同学校"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="pictures"
                    label="合同照片"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button @click="check_contract_photos(scope.row)" type="text" size="small">点击查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="nickname"
                    label="合伙人姓名"
                    width="100"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="mobilephone"
                    label="合伙人手机号"
                    width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="status_id"
                label="审核状态"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span class="red" v-if="scope.row.status_id===1">待审核</span>
                        <span  v-if="scope.row.status_id===2">审核拒绝</span>
                        <span  v-if="scope.row.status_id===3">审核通过</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="合同备注"
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
                        <el-button @click="checkContractDetail(scope.row.id)" type="text" size="small">合同详情</el-button>
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
        <el-dialog title="审核合同" :visible.sync="show1" customClass="customWidth-max">
            <el-form :model="form" :label-width="'120px'">
                <el-form-item label="款式清单：">
                    <el-table ref="multipleTable" border :data="contractList" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
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
                                <el-input type="text" v-model="scope.row.group_price" placeholder=""></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="retail_price"
                            label="合同零售价"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.retail_price" placeholder=""></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="提成方案：">
                    <table class="royalty">
                        <tr>
                            <th>提成时间</th>
                            <th>提成比例</th>
                        </tr>
                        <tr>
                            <td>团购日期结束时</td>
                            <td><el-input style="width:120px;" type="number" v-model="deduct_info.deduct_group_end" placeholder=""></el-input>%</td>
                        </tr>
                        <tr>
                            <td>团购交付后&nbsp;<el-input style="width:80px;" type="number" v-model="deduct_info.deduct_group_confirm.days_after" placeholder=""></el-input>天</td>
                            <td><el-input style="width:120px;" type="number" v-model="deduct_info.deduct_group_confirm.ratio" placeholder=""></el-input>%</td>
                        </tr>
                        <tr>
                            <td>零售每笔付款后&nbsp;<el-input style="width:80px;" type="number" v-model="deduct_info.deduct_retail_confirm.days_after" placeholder=""></el-input>天</td>
                            <td><el-input style="width:120px;" type="number" v-model="deduct_info.deduct_retail_confirm.ratio" placeholder=""></el-input>%</td>
                        </tr>
                    </table>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show1 = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
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
import "../../static/swipebox/lib/ios-orientationchange-fix.js";
import "../../static/swipebox/js/jquery.swipebox.js";
export default {
    name: "contractReview",
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
            show1: false,
            status_list:[
                {label:"全部",value:0},
                {label:"待审核",value:1},
                {label:"审核拒绝",value:2},
                {label:"审核通过",value:3},
            ],
            dialogFormVisible:false,
            form: {
                id: "",
                price_info: [],
                deduct_info: {}
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
                status_id: 0,
                stime: '',
                etime: '',
                skey: '',
            },
            tableData:{
                list:[],
                count:0
            },
            contractList:[],  //合同列表
            deduct_info:{
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
        check_contract_photos(row) {
            var arr = row.pictures ? row.pictures.split(',') : [];
            arr.forEach((element, i) => {
                arr[i] = { href: element };
            });
            $.swipebox(arr);
        },
        pass(row){
            this.contractList = row.goods_list;
            this.deduct_info = {
                deduct_group_end: '',  //团购结束时提成
                deduct_group_confirm: {
                    days_after: '',   //团购交付后多少天
                    ratio: ''    //提成比例
                },
                deduct_retail_confirm:{
                    days_after: '',   //零售交付后多少天
                    ratio: ''    //提成比例
                }
            };
            this.form.id = row.id;
            this.show1 = true;
        },
        deny(row){
            this.clean(this.form);
            this.form1.id = row.id;
            this.dialogFormVisible = true;
        },
        query() {
            this.$q({
                url: "/bg_admin/bg_todo/getContracts",
                params: this.queryParams
            }).then(res => {
                this.tableData = res;
            });
        },
        query_submit(){
            this.queryParams.page =1;
            this.query();
        },
        submit() {
            this.form.deduct_info = this.deduct_info;
            this.form.price_info = this.contractList;
            // this.post("form", '/bg_admin/bg_todo/approveContract', this.form, "show1");
            this.$q({
                url: "/bg_admin/bg_todo/approveContract",
                method: "post",
                data: this.form
            }).then(res => {
                this.show1 = false;
                this.query()
                // this.tableData = {"count":1,"list":[{"id":1,"create_time":"2019-07-17 14:22:40","update_time":"2019-07-26 17:01:29","status_id":1,"nickname":"曲俊伟","mobilephone":"17704059686","contract_name":"测试添加合同","province_name":"河南省","city_name":"南阳市","district_name":"南召县","school_name":"测试添加学校2","pictures":"1.jpg###2.jpg","remark":"这是备注","review_remark":"1asdfasdfasa","goods_list":[{"goods_id":123,"image":"https:\/\/test2.dapangzi.com:60012\/\/uploads\/goods\/70\/d8c205f7409084c1a345cf941d6307.png","main_title":"女式0.01包邮","style_num":"ASW100011","default_price":105,"group_price":"1.00","retail_price":"2.00"}]}]};
            });
        },
        submit1() {
            this.post("form1", '/bg_admin/bg_todo/disapproveContract', this.form1, "dialogFormVisible");
        },
        checkContractDetail(id) {
            this.$router.push({ path: "/contractDetail",query:{id:id} });
        }

    },

    created() {
        this.query();
    }
};
</script>
<style lang="scss">
.tailor-contract-review {
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
  .customWidth-max{
      width: 50%;
  }
  .royalty{
      border-collapse:collapse;
  }
  
  .royalty, .royalty th, .royalty td{
      border: 1px solid #ebeef5;
  }
  .royalty th{
      background: rgb(245, 245, 245);
      color:#909399;
  }
  .royalty td{
      text-align:center;
      padding: 10px 20px;
  }
}
</style>

