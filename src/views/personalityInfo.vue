<template>
    <div class="tailor-personality-info">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
             <el-breadcrumb-item :to="{ path: '/order' }">待处理订单</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/orderInfo',query:{id:id} }">订单详情</el-breadcrumb-item>
            <el-breadcrumb-item>个性化定制详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="info">
            <div class="section">
                <div class="goods">
                    <img :src="res.goods_image" alt="" class="logo">
                    <div class="right">
                        <div class="name">
                            {{res.main_title}}
                        </div>
                        <div class="price">
                            <!--<span style="color:red;margin-right:5px;">￥  {{res.payment_amount}}</span>-->
                            <span style="color:red;margin-right:5px;" v-if="res.sell_type_id == 1">￥{{(Number(res.group_price)+Number(res.personalization_price))*res.quantity}}</span>
                            <span style="color:red;margin-right:5px;" v-if="res.sell_type_id == 2">￥{{(Number(res.retail_price)+Number(res.personalization_price))*res.quantity}}</span>
                        </div>
                    </div>
                </div>
                <div class="content" v-for="(item,index) in list" :key="index">
                    <el-form :label-width="'120px'" class="form" inline>
                        <div>
                            <el-form-item label="名称：">
                                <div class="name">{{item.personalization_name}} <span class="red" style="margin-left:10px;">￥{{item.price}}</span></div>
                            </el-form-item>
                        </div>
                        <div v-if="item.content">
                            <el-form-item label="内容：">
                                <div>{{item.content}}</div>
                            </el-form-item>
                        </div>
                        <div v-if="item.sign_photo">
                            <el-form-item label="手签：">
                                <img :src="item.sign_photo" alt="" :preview="'sign_photo'+index" class="img sign_photo">
                            </el-form-item>
                        </div>
                        <div v-if="item.art_photo">
                            <el-form-item label="艺术字体：">
                                <img :src="item.art_photo" alt="" :preview="'art_photo'+index" class="img">
                            </el-form-item>
                        </div>
                        <div v-for="(v,i) in item.items" :key="i">
                            <el-form-item :label="v.item_name+'：'" >
                                    <div class="photo" v-for="(val,ind) in v.photos" :key="ind" >
                                        <img :src="val.url" alt="" :preview="ind">
                                         <el-tooltip  effect="dark" :content="''+val.name" placement="top">
                                            <div class="p-name" >{{val.name}}</div>
                                        </el-tooltip>
                                    </div>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>

            </div>

                
          
        </div>

    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "personalityInfo",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    return {
        id:"",
      goods_id:"",
       res:{}, 
       list:[]
    };
  },
  methods: {
      query() {
      this.$q({
        url: "/bg_admin/order/getOrderPersonalization",
        method:"post",
        data:{
            id:this.id,
            goods_id:this.goods_id
        }
      }).then(res => {
            this.res = res;
            this.list = res.personalization_json;
            this.$previewRefresh();
      });
    }
  },
  created(){
          this.id = this.$route.query.id;
      this.goods_id = this.$route.query.gid;
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-personality-info {
    .section{
        .goods {
             padding: 30px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            img {
                margin-right: 15px;
                width: 100px;
                height: 100px;
            }
            .name {
                margin-bottom: 20px;
                text-align: left;
            }
            .price{
                text-align: left;
            }
        }
        .content{
            margin-top: 20px;
            padding-right:30px; 
            .name{
                font-weight: bold;
            }
            .form{
                border-bottom: 1px dashed #ddd;
            }
            .photo{
                display: inline-block;
                margin-right: 20px;
                img{
                    width: 80px;
                    height: 80px;
                    display: block;
                }
                .p-name{
                    text-align:center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 80px;
                }
            }
        }
    }
    .img{
        width: 80px;
        height: 80px;
        display: block;
    }
    .sign_photo{
        transform: rotate(-90deg);
    }
}
</style>


