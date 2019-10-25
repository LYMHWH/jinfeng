<template>
    <div class="juice-order-info">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order' }">待处理订单</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="body">
            <div class="steps">
                <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="下单"></el-step>
                    <el-step title="付款"></el-step>
                    <el-step title="发货"></el-step>
                    <el-step title="收货"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <div class="info">
                <div class="section">
                    <div class="title">
                            <span>订单状态：</span>  <span class="red">{{res.order_status_id | format_order_status}}</span>    
                    </div>
                    <div class="content">
                        <!-- <div class="item">
                            <span class="label">订单号：</span>
                            <span class="text">201711324656584363</span>
                        </div>
                        <div class="item">
                            <span class="label">订单创建时间：</span>
                            <span class="text">2017-12-07  15:25:00</span>
                        </div> -->
                        <el-form inline :label-width="labelWidth">
                            <el-form-item label="订单号：" class="item">
                                <span class="text">{{res.order_num}}</span>
                            </el-form-item>
                            <el-form-item label="订单创建时间："  class="item">
                                <span class="text">{{res.create_time}}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                   
                </div>
                <div class="section">
                    <div class="title">
                        <span>物流信息：</span>
                    </div>
                     <div class="content">
                        <el-form  :label-width="labelWidth">
                            <el-form-item label="收货地址：">
                                <span class="text">{{res.recipient_name}}  {{res.recipient_mobilephone}}  {{res.recipient_province_name}}  {{res.recipient_city_name}}  {{res.recipient_district_name}}  {{res.recipient_address}}</span>
                            </el-form-item>
                            <el-form-item label="快递公司："  class="item">
                                <span class="text">{{res.express_name?res.express_name:"暂无物流信息"}}</span>
                            </el-form-item>
                            <el-form-item label="快递单号："  class="item">
                                <span class="text">{{res.express_num?res.express_num:"暂无物流信息"}}</span>
                            </el-form-item>
                            <el-form-item label="物流跟踪：">
                                <div class="express">
                                    <template v-if="res.express_name&&res.express_num">
                                        <div class="express-step">
                                            <el-steps direction="vertical">
                                                <el-step :title="item.time" v-for="(item,index) in express.list" :key="index" :description="item.status"></el-step>
                                            </el-steps>
                                        </div>    
                                    </template>
                                    <template v-else>
                                        <div style="text-align:center;line-height:300px;">暂无物流信息</div>
                                    </template>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="section">
                    <div class="title">
                        <span>买家信息：</span>
                    </div>
                     <div class="content">
                        <el-form  inline :label-width="labelWidth">
                            <el-form-item label="买家名称：" class="item">
                                <span class="text">{{res.recipient_name}}   </span>
                            </el-form-item>
                            <el-form-item label="联系电话："  class="item">
                                <span class="text">{{res.recipient_mobilephone}}</span>
                            </el-form-item>
                            <div>
                            <el-form-item label="买家留言：">
                                <span class="text">{{res.user_remark?res.user_remark:'无'}}</span>
                            </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div class="section">
                    <div class="title">
                        <span>发票信息：</span>
                        <span v-if="!res.invoice_need" class="no-data-text">不需要发票</span>
                    </div>
                     <div class="content" v-if="res.invoice_need">
                        <el-form  :label-width="labelWidth" inline>
                            <el-form-item label="发票类型：" class="item">
                                <span class="text">{{res.invoice_type==2?'电子':'纸质'}} </span>
                            </el-form-item>
                            <el-form-item label="发票内容："  class="item">
                                <span class="text">{{res.invoice_content}}</span>
                            </el-form-item>
                            <el-form-item label="售票人手机号："  class="item" v-if="res.invoice_mobilephone">
                                <span class="text">{{res.invoice_mobilephone}}</span>
                            </el-form-item>
                            <el-form-item label="发票抬头："  class="item">
                                <span class="text">{{res.invoice_head}}</span>
                            </el-form-item>
                            <el-form-item label="纳税人识别号："  class="item" v-if="res.invoice_tax_id">
                                <span class="text">{{res.invoice_tax_id}}</span>
                            </el-form-item>
                            <el-form-item label="售票人邮箱："  class="item" v-if="res.invoice_email">
                                <span class="text">{{res.invoice_email}}</span>
                            </el-form-item>

                            <el-form-item label="电话号码："  class="item" v-if="res.invoice_company_phone">
                                <span class="text">{{res.invoice_company_phone}}</span>
                            </el-form-item>
                            <el-form-item label="单位地址："  class="item" v-if="res.invoice_company_address">
                                <span class="text">{{res.invoice_company_address}}</span>
                            </el-form-item>
                            <el-form-item label="开户银行："  class="item" v-if="res.invoice_company_bank_name">
                                <span class="text">{{res.invoice_company_bank_name}}</span>
                            </el-form-item>
                            <el-form-item label="银行账户："  class="item" v-if="res.invoice_company_bank_account">
                                <span class="text">{{res.invoice_company_bank_account}}</span>
                            </el-form-item>


                        </el-form>
                    </div>
                </div>
                <div class="section" v-if="res.measuring_status_id">
                    <div class="title">
                        <span>量体数据：</span>
                          <span v-if="res.measuring_status_id == 1 " class="no-data-text">尚未量体（已预约量体师上门量体）</span>
                    </div>
                    <div class="content" v-if="res.measuring_status_id == 2">
                        <div  class="group-orders">
                            <div style="border-bottom:1px solid #ddd;"> 
                                <div v-for="(val,ind) in measuring_data" :key="ind">
                                    <div class="group-title" @click="unfold(ind)" :style="{backgroundColor:ind==0?'#e5e5e5':'f5f5f5'}">
                                        <span>{{val.customer_name}}<span v-if="measuring_data[0].customer_gender&& measuring_data[0].customer_gender!= '0'">【{{val.customer_gender | gender}}】</span>的量体数据</span>
                                        <span :class="upfoldList[ind]?'el-icon-arrow-up':'el-icon-arrow-down'" style="font-size:20px;"></span>
                                    </div>
                                    <div v-show="upfoldList[ind]">
                                        <div class="table">
                                            <div class="cell" v-for="(item,index) in val.measuring_data" :key="index">
                                                <span class="label">{{item.data_item_name}}</span>
                                                <span class="content">{{item.data_item_value}}</span>
                                            </div>
                                            <div class="cell" v-if="val.measuring_data.length%2 != 0">
                                                <span class="label" style="color:#fff">&nbsp;</span>
                                                <span class="content"></span>
                                            </div>
                                        </div>
                                        <div class="row" v-if="val.ic_remark">
                                            <span class="label">备注</span>
                                            <span class="content">{{val.ic_remark}}</span>
                                        </div>
                                        <div class="photo">
                                            <span class="label">顾客照片</span>
                                            <span class="content">
                                                <template v-if="val.order_photos.length">
                                                    <img :src="item" alt="" v-for="(item,index) in val.order_photos" :key="index" class="img" :preview="ind">
                                                </template>
                                                <template v-else>
                                                    <span>暂无照片</span>
                                                </template>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>       
                       
                    </div>
                </div>
                <div class="section">
                     <div class="title">
                        <span>商品信息：</span>
                    </div>
                     <div class="">
                        <el-table
                            :data="goods_list"
                            style="width: 100%"
                            :cell-style="cellStyle" 
                            :header-cell-style="headerCellStyle"
                            :span-method="arraySpanMethod"
                            border>
                            <el-table-column
                                prop="date"
                                label="商品信息"
                                width="280px"
                            >
                                <template slot-scope="scope">
                                    <div class="goods">
                                        <img style="width:80px;height:80px;" :src="scope.row.goods_image" alt=""/>
                                        <div>
                                            <el-tooltip  effect="dark" :content="scope.row.main_title" placement="top">
                                                <div class="name">
                                                    {{scope.row.main_title}}
                                                </div>
                                            </el-tooltip>
                                             <el-tooltip  effect="dark" :content="'商品单价=￥'+scope.row.group_price+'（款式价格）+'+'￥'+scope.row.personalization_price+'（专属定制价格）'" placement="top">
                                                <div v-if="scope.row.sell_type_id == 1" class="name" style="margin:0;">
                                                    商品单价<span style="color:red;margin-right:5px;">￥{{(Number(scope.row.group_price)+Number(scope.row.personalization_price))}}</span>
                                                </div>
                                                <div v-if="scope.row.sell_type_id == 2" class="name" style="margin:0;">
                                                    商品单价<span style="color:red;margin-right:5px;">￥{{(Number(scope.row.retail_price)+Number(scope.row.personalization_price))}}</span>
                                                </div>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            
                            <el-table-column
                                prop="style_num"
                                label="款式号"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="size"
                                label="尺码"
                                >
                                 <template slot-scope="scope">
                                     <div class="size-c">
                                        <el-button type="text" @click="check_size(scope.row)" v-if="scope.row.size_json?scope.row.size_json.size_name :false">{{scope.row.size_json.size_name}}</el-button>
                                        <span v-else>无</span>
                                     </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="fabric_num"
                                label="面料号">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="jump_fabric(scope.row)">{{scope.row.fabric_num}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="个性化定制">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="jump_per(scope.row)">查看详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="quantity"
                                label="数量">
                            </el-table-column>
                            <el-table-column
                                prop="payment_amount"
                                label="总金额(元)">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.sell_type_id == 1">{{(Number(scope.row.group_price)+Number(scope.row.personalization_price))*scope.row.quantity}}</span>
                                    <span v-if="scope.row.sell_type_id == 2">{{(Number(scope.row.retail_price)+Number(scope.row.personalization_price))*scope.row.quantity}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="payment_amount"
                                label="订单总金额(元)">
                                <template slot-scope="scope">
                                    <span>{{sum}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="overflow:hidden;padding-right:50px;margin-top:30px;">
                            <el-form label-width="120px" style="float:right" class="price">
                                <el-form-item label="">
                                    <div>共<span>{{goods_list.length}}</span>件，小计：  ￥{{sum}}</div>    
                                </el-form-item>
                                <el-form-item label="">
                                    <div>运费：￥{{res.freight_amount}}</div>    
                                </el-form-item>
                                <!--<el-form-item label="">
                                    <div>优惠：￥0.00</div>    
                                </el-form-item>-->
                                <el-form-item label="">
                                    <div>合计：￥{{res.order_amount}}</div>    
                                </el-form-item>
                                <el-form-item label="">
                                   <span>应付款：</span> <span style="color:red">￥{{res.payment_amount}}</span>    
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <div class="section" style="border:none;" v-if="order_logs&&order_logs.length">
                    <div class="title">
                        <span>操作信息：</span>
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
                                prop="log"
                                label="备注"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="show">
             <div class="size-t">
                <div  class="group-orders">
                    <div style="border-bottom:1px solid #ddd;"> 
                        <!-- <div v-for="(val,ind) in measuring_data" :key="ind"> -->
                            <div class="group-title" style="backgroundColor:#e5e5e5">
                                <!--<span>尺码：{{size_json.size_name}}</span>-->
                                <!-- <span :class="upfoldList[ind]?'el-icon-arrow-up':'el-icon-arrow-down'" style="font-size:20px;"></span> -->
                            </div>
                            <div>
                                <div class="table">
                                    <div class="cell" v-for="(item,index) in size_json.size_item_list" :key="index">
                                        <span class="label">{{item.size_item_name}}</span>
                                        <span class="content">{{item.size_item_value}}</span>
                                    </div>
                                    <div class="cell" v-if="size_json.size_item_list.length%2 != 0">
                                        <span class="label" style="color:#fff">&nbsp;</span>
                                        <span class="content"></span>
                                    </div>
                                </div>
                                <!-- <div class="row" v-if="val.ic_remark">
                                    <span class="label">备注</span>
                                    <span class="content">{{val.ic_remark}}</span>
                                </div> -->
                                <!-- <div class="photo">
                                    <span class="label">顾客照片</span>
                                    <span class="content">
                                        <template v-if="val.order_photos.length">
                                            <img :src="item" alt="" v-for="(item,index) in val.order_photos" :key="index" class="img" :preview="ind">
                                        </template>
                                        <template v-else>
                                            <span>暂无照片</span>
                                        </template>
                                    </span>
                                </div> -->
                            </div>
                        <!-- </div> -->
                    </div>
                </div> 
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
export default {
  name: "orderInfo",
  mixins: [mixin],
    filters: {
     gender(val) {
      val = Number.parseInt(val);
      switch (val) {
        case 0:
          return "未知";
          break;
        case 1:
          return "男";
          break;
        case 2:
          return "女";
          break;
        default:
          return "未知";
          break;
      }
    },
    format_order_status(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "待支付";
          break;
        case 2:
          return "待确认";
          break;
        case 3:
          return "取消订单";
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
    },
    format_measuring_status(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "待量体";
          break;
        case 2:
          return "已完成";
          break;
        default:
          break;
      }
    },
    format_measuring_type(value) {
      value = Number.parseInt(value);
      switch (value) {
        case 1:
          return "预约量体";
          break;
        case 2:
          return "拍照量体";
          break;
        default:
          break;
      }
    }
  },
  data() {
    return {
    order_logs:[],
      active: 1,
      labelWidth:'150px',
      tableData: [

      ],
      id:"",
      res:{},
      goods_list:[],
      measuring_data:[],
      upfoldList: [],
      sum:0,
      express:{},
      show:false,
        size_json:{
            size_item_list:[]
        }

    };
  },
    methods: {
        jump_fabric(row){
            this.$router.push(
                { path: '/fabricInfo', query: {id:this.id,gid:row.goods_id} }
            )
        },
        jump_per(row){
            this.$router.push(
                { path: '/personalityInfo', query: {id:this.id,gid:row.goods_id} }
            )
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            
            if(columnIndex ===7){
                if(rowIndex ===0){
                    return [this.goods_list.length,1]
                }else{
                    return [0,0];
                }
            }
            
        },
        process_measuring_data(measuring_data){
          return  measuring_data.map(v=>{   
                var arr =[],object = v.measuring_data||{};
                for (const key in object) {
                    if (object.hasOwnProperty(key)) {
                        const element = object[key];
                        element.forEach(val=>{
                            if(val.data_item_id == 1004){
                                v.ic_remark = val.data_item_value
                            }else if(val.data_item_id == 1006){

                            }
                            else{
                                arr.push(val);
                            }
                        })
                    }
                }  
                v.measuring_data = arr;
            return v;
        });
        },
        process_measuring_data1(measuring_data){
            var arr =[] ,obj ={
                order_photos:[measuring_data.front_photo,measuring_data.side_photo],
                ic_remark:"",
                measuring_data:[],
                customer_name:this.res.nickname,
                customer_gender:this.res.gender_id,
            },object =measuring_data.measuring_data ;
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const element = object[key];
                    for (const k in element) {
                        if (element.hasOwnProperty(k)) {
                            const el = element[k];
                            obj.measuring_data.push({data_item_name:k,data_item_value:el});
                            
                        }
                    }
                }
            }
            arr.push(obj); 
            return arr;
        },
        count_sum(arr){
               var sum =0;
               arr.forEach(v=>{
                //    sum += (v.payment_amount*1);
                if(v.sell_type_id == 1) {
                  sum += ((Number(v.group_price)+Number(v.personalization_price))*v.quantity);
                } 
                if(v.sell_type_id == 2) {
                  sum += ((Number(v.retail_price)+Number(v.personalization_price))*v.quantity);
                }
               })
            return sum.toFixed(2); 
        },
        count_setp_status(order_status_id){
           var value = Number.parseInt(order_status_id);
                switch (value) {
                    case 1:
                   this.active = 0;
                    break;
                    case 2:
                      this.active = 1;
                    break;
                    case 3:
                    this.active = 1;
                    break;
                    case 4:
                    this.active = 2;
                    break;
                    case 5:
                     this.active = 3;
                    break;
                    case 6:
                    this.active = 5;
                    break;
                    default:
                    break;
                }
        },
        check_size(row){
            this.size_json = row.size_json;
            this.show = true;
        },
        query(){
            this.$q({
                url:'/bg_admin/order/getOrderDetail',
                method:'post',
                data:{id:this.id}
            }).then(res=>{
                this.count_setp_status(res.order_status_id);
                this.res = res;
                if(res.express_num){
                    this.getExpressDetail(res.express_num,res.express_code);
                }
                this.goods_list = res.goods_list;
                if(res.measuring_data){
                    try {
                        if(Array.isArray(res.measuring_data)){
                            this.measuring_data = this.process_measuring_data(res.measuring_data);
                        }else{
                            this.measuring_data = this.process_measuring_data1(res.measuring_data);
                        }
                        
                        this.measuring_data.forEach((v, i) => {
                            if (i == 0) {
                                this.upfoldList.push(true);
                            } else {
                                this.upfoldList.push(false);
                            }
                        });
                    } catch (error) {
                      console.log(error);
                    }
                }
                this.sum = this.count_sum(res.goods_list);
                this.order_logs = res.order_logs;
                this.$previewRefresh();
            })
        },
        getExpressDetail(express_number,express_code){
            this.$q({
                url:'/bg_admin/order/getExpressDetail',
                method:'post',
                data:{
                    express_number,
                    express_code
                }
            }).then(res=>{
                this.express =res;
            })
        },
         unfold(i) {
            var flag = this.upfoldList[i];
            var arr = [...this.upfoldList];
            arr[i] = !flag;
            this.upfoldList = arr;
        },  
    },
  created() {
      this.id = this.$route.query.id;
    this.query();
  }
};
</script>
<style lang="scss">
.juice-order-info {
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
//    .size-c{
//        position: relative;
       .size-t{


       }
//    }
}
</style>

