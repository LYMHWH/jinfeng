<template>
  <div class="tailor-shop-layout">
    <div class="tailor-shop-layout-header">
      <div class="tailor-shop-layout-title">
        <router-link to="/">
        <img src="../../../static/images/logo_white_pt.png" style="height:48px;" alt="">
        </router-link>
        <i class="line"></i>
        <span>云特校服管理后台</span> 
      </div>
      <div class="tailor-shop-layout-login">
        <span style="margin-right:10px;">欢迎</span>
        <!--<span v-text="`${user.nickname}（${user.mobilephone}）`"style="margin-right:20px;"></span>-->
        <span v-text="`${user.nickname}`"style="margin-right:20px;"></span>
        <!--<a @click="jumpInfo">消息中心</a>-->
        <a @click="loginOut">退出登录</a>
      </div>
    </div>
    <div class="tailor-shop-layout-container">
      <div class="tailor-shop-layout-nav-menu">
        <el-menu
          router
          default-active="1"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">订单工作台</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="order">待处理订单</el-menu-item>
            </el-menu-item-group>	
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">待办事项</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="contractReview">合同审核</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="auditInvoice">发票审核</el-menu-item>
            </el-menu-item-group>	
            <el-menu-item-group>
              <el-menu-item index="withdrawalAudit">提现审核</el-menu-item>
            </el-menu-item-group>	
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="goodsList">商品列表</el-menu-item>
              <el-menu-item index="addGoods">发布商品</el-menu-item>
                            <!-- <el-menu-item index="imgSpace">图片空间</el-menu-item> -->
            </el-menu-item-group>	
          </el-submenu> 
          <el-submenu index="4">
            <template slot="title">
              <img src="../../../static/images/fabric.png" style="width:24px;margin-right: 5px;"  alt="">
              <span slot="title">面料管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="fabricList">面料列表</el-menu-item>
              <el-menu-item index="addFabric">添加面料</el-menu-item>
            </el-menu-item-group>	
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <img src="../../../static/images/personality.png" style="width:24px;margin-right: 5px;"  alt="">
              <span slot="title">个性化工艺管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="personalityList">个性化工艺列表</el-menu-item>
              <el-menu-item index="personality">添加个性化工艺</el-menu-item>
            </el-menu-item-group>	
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">财务&报表</span>
            </template>
            <el-menu-item-group>
              <!-- <el-menu-item index="myaccount">我的账户</el-menu-item> -->
              <el-menu-item index="saleDetail">销售明细</el-menu-item>
              <el-menu-item index="accountRecord">资金变动记录</el-menu-item>
                            <!-- <el-menu-item index="myCoupon">我的优惠券</el-menu-item> -->
              </el-menu-item-group>	
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理&设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="accountManage">后台账号管理</el-menu-item>
              <el-menu-item index="permissionManage">权限管理</el-menu-item>
              <el-menu-item index="gruopManage">用户组管理</el-menu-item>
              <el-menu-item index="schoolManage">学校管理</el-menu-item>
              <el-menu-item index="schoolAccountManage">学校账号管理</el-menu-item>
              <el-menu-item index="parentAccountManage">家长账号管理</el-menu-item>
              <el-menu-item index="cityPartnerManage">城市合伙人管理</el-menu-item>              
              <el-menu-item index="itemCategoryManage">商品类目管理</el-menu-item>
              <el-menu-item index="styleManage">着装风格管理</el-menu-item>
              <el-menu-item index="specialShapeManage">特殊体型管理</el-menu-item>
              <el-menu-item index="evaluateManage">评价管理</el-menu-item> 
              <!--<el-menu-item index="customerManage">客户管理</el-menu-item>-->
              <!--<el-menu-item index="bannerSetting">banner管理</el-menu-item>-->
              <el-menu-item index="fabricOptionsManage">面料选项管理</el-menu-item>
              <el-menu-item index="freightManage">运费模板管理</el-menu-item>
              <el-menu-item index="logisticsCompanyManage">物流公司管理</el-menu-item>
              <!--<el-menu-item index="fontlibManage">字体库管理</el-menu-item>-->
              <el-menu-item index="feedback">意见反馈</el-menu-item>
              <el-menu-item index="messageCenter">消息中心</el-menu-item>
            </el-menu-item-group>	
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <img src="../../../static/images/sizeManage.png" style="width:24px;margin-right: 5px;"  alt="">
              <span slot="title">尺码管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="sizeFiledManage">尺码字段管理</el-menu-item>
              <el-menu-item index="sizeTemplateManage">尺码模板管理</el-menu-item>
            </el-menu-item-group>	
          </el-submenu>
        </el-menu>
      </div>
      <router-view class="tailor-shop-layout-page-content"></router-view>
    </div>
    <div class="tailor-shop-layout-footer">河南云特智能服饰有限公司&nbsp;&nbsp;&nbsp;豫公网安备 37032102000118号&nbsp;&nbsp;&nbsp; <a href="http://www.miitbeian.gov.cn/" style="color: #fff; text-decoration: none;" target="_blank">ICP证：豫ICP备16005251号-3</a></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  computed: mapState({
    user: state => state.user.user
  }),
  data() {
    return {
      shopList: []
    };
  },
  created() {
    
  },
  methods: {
    handleClose() {},
    handleOpen() {},
    jumpInfo() {
      this.$router.push({ path: "/messageCenter" });
    },
    loginOut() {
      this.$confirm("您确定要退出本次登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$q({
          method: "post",
          url: "/bg_admin/index/logout"
        }).then(res => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    fetchShopList() {
      this.$post("/index/getAuthorizedEcommerceShops").then(res => {
        this.shopList = res;
        this.$store.commit("SET_SHOP_LIST", res);
      });
    },
    encodeUrl(url) {
      return encodeURIComponent(url);
    }
  }
};
</script>
<style lang="scss">
.tailor-shop-layout {
  height: 98%;
  display: flex;
  flex-direction: column;
  .tailor-shop-layout-header {
    height: 80px !important;
    background-color: #014691;
    padding: 0 50px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tailor-shop-layout-title {
        font-size: 24px;
        display: flex;
        align-items: center;
        .line {
        height: 24px;
        width: 2px;
        background-color: #fff;
        margin: 0 20px;
        }
    }
  }
  .tailor-shop-layout-login {
    a {
      margin-left: 10px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .tailor-shop-layout-container {
    flex: 1;
    display: flex;
    .tailor-shop-layout-nav-menu {
      width: 220px;
      border-right: 1px solid #e6e6e6;
      overflow-y: auto;
      padding-bottom: 50px;
      .el-menu {
        border: none;
      }
    }
    .tailor-shop-layout-page-content {
      margin: 0 0 0 50px;
      padding-bottom: 50px;
      padding-top: 20px;
      flex: 1;
      overflow-x: hidden;
    }
  }
  .tailor-shop-layout-footer {
    position: fixed;
    text-align: center;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #014691;
    z-index: 99999;
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
  .el-submenu .el-menu-item {
    padding-left: 54px !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-button--text:hover {
    text-decoration: underline;
  }
  .sub-btns {
      margin-top: 20px;
      .el-button{
        width: 200px;
      }
  }
}
</style>


