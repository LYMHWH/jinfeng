<template>
  <div class="tailor-staff-manage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>待处理订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true">
        <el-form-item label="" v-if="isShowBatch">
          <!-- <el-button type="primary" @click="cancel">批量审核不通过</el-button> -->
          <el-button type="primary" @click="batchAudit">批量审核通过</el-button>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select
            placeholder="请选择"
            @change="order_status_query"
            v-model="queryParams.order_status_id"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="item in order_status_list"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="量体状态：">
          <el-select
            placeholder="请选择"
            @change="order_status_query1"
            v-model="queryParams.size_status_id	"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="item in measuring_status_list"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校：">
          <el-select placeholder="请选择" @change="order_status_query1" v-model="queryParams.size_status_id	">
            <el-option label="全部" :value="0"></el-option>
            <el-option :label="item.name" :value="item.id" v-for="item in schoolList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div style="float:right;">
          <!-- <el-form-item>
            <el-input placeholder="订单号" v-model="queryParams.order_num"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="面料号" v-model="queryParams.fabric_num"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="客户姓名或者手机号" v-model="queryParams.keyword"></el-input>
          </el-form-item> 
           <el-form-item>
                <el-input placeholder="请输入内容" v-model="queryParams[select]" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择" @change="select_item" style="width:140px;">
                        <el-option label="订单号" value="order_num"></el-option>
                        <el-option label="面料号" value="fabric_num"></el-option>
                        <el-option label="客户姓名" value="keyword"></el-option>
                        <el-option label="手机号" value="keyword"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>-->
          <el-form-item>
            <el-input placeholder="订单号/客户姓名/手机号" v-model="queryParams.skey"></el-input>
          </el-form-item> 
          <el-form-item>
            <el-button type="primary" @click="query_submit">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table">
      <el-table ref="multipleTable" border :data="tableData.data" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50" align="center">
          <template scope="scope">
            <span>{{scope.$index+(queryParams.page - 1) * queryParams.size + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="44" align="center"></el-table-column>
        <!--<el-table-column type="index" width="50"></el-table-column>-->
        <el-table-column prop="order_num" label="订单号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column
                    prop="main_title"
                    label="商品名称"
                     width="120"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="total_quantity"
                    label="数量"
                    show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="payment_amount" label="金额/元" show-overflow-tooltip>
         
        </el-table-column>
        <!--
        <el-table-column prop="type_id" label="量体方式" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.type_id|format_measuring_type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="last_login_time" label="量体状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.size_status_id	|format_measuring_status}}</span>
          </template>
        </el-table-column>
        -->
        <el-table-column prop="order_status_id	" label="订单状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.order_status_id|format_order_status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recipient_name" label="收货人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recipient_mobilephone" label="手机号码" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recipient_province_name" label="省" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recipient_city_name" label="市" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recipient_district_name" label="县或区" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recipient_address" label="详细地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="admin_remark" label="客服备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="update_time" label="更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="cancel(scope.row)"
              type="text"
              size="small"
              class="red"
              v-if="scope.row.order_status_id == 2"
            >确认不可生产</el-button>
            <el-button
              @click="confirm(scope.row)"
              type="text"
              size="small"
              class="green"
              v-if="scope.row.order_status_id == 2"
            >确认可生产</el-button>
            <el-button
              @click="send(scope.row)"
              type="text"
              size="small"
              class="green"
              v-if="scope.row.order_status_id == 4"
            >发货</el-button>
            <el-button
              @click="modifyRecipientInfo(scope.row)"
              type="text"
              size="small"
              class="red"
              v-if="scope.row.order_status_id == 4"
            >修改收货地址</el-button>
            <el-button
              @click="modifyExpress(scope.row)"
              type="text"
              size="small"
              class="red"
              v-if="scope.row.order_status_id == 5"
            >修改物流信息</el-button>
            <el-button
              @click="edit_price(scope.row)"
              type="text"
              size="small"
              class="red"
              v-if="scope.row.order_status_id == 1"
            >修改金额</el-button>
            <el-button @click="check(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-show="tableData.count >0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.count"
      ></el-pagination>
    </div>
    <el-dialog :title="title?'修改发货信息':'填写发货信息'" :visible.sync="show2" width="900px">
      <el-form :model="form2" :rules="formRules2" ref="form2" :label-width="'120px'">
        <el-table
          ref="multipleTable1"
          border
          :data="cur_item.goods_list"
          :cell-style="cellStyle"
          :header-cell-style="headerCellStyle"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="商品信息" width="280px">
            <template slot-scope="scope">
              <div class="goods">
                <img style="width:80px;height:80px;" :src="scope.row.image" alt>
                <div>
                   <el-tooltip  effect="dark" :content="scope.row.main_title" placement="top">
                                        <div class="name">
                                            {{scope.row.main_title}}
                                        </div>
                    </el-tooltip>
                  <div class="price" style="text-align:left;">
                    <span style="color:red;margin-right:5px;">￥ {{scope.row.price}}</span>
                    <!-- <span style=" text-decoration:line-through;">￥{{scope.row.min_price}}</span> -->
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="style_num" label="款式号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fabric_num" label="面料号">
                <template slot-scope="scope">
                    <el-button type="text" @click="jump_fabric(scope.row)">{{scope.row.fabric_num}}</el-button>
                </template>
          </el-table-column>
          <el-table-column prop="" label="个性化定制">
                <template slot-scope="scope">
                    <el-button type="text" @click="jump_per(scope.row)">查看详情</el-button>
                </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量"></el-table-column>
        </el-table>

        <el-form-item label="订单编号：" prop >
          <div>{{cur_item.order_num}}</div>
        </el-form-item>
        <el-form-item label="收货人信息：" prop>
          <div>{{cur_item.recipient_name}} {{cur_item.recipient_mobilephone}} {{cur_item.recipient_province_name}} {{cur_item.recipient_city_name}} {{cur_item.recipient_district_name}} {{cur_item.recipient_address}}</div>
        </el-form-item>
        <el-form-item label="物流公司：" prop="express_id">
              <el-select
            placeholder="请选择"
            v-model="form2.express_id"
          >
            <el-option
              :label="item.express_name"
              :value="item.id"
              v-for="item in list1"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号：" prop="express_num">
          <el-input v-model="form2.express_num" placeholder="请输入物流单号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改金额" :visible.sync="show1">
      <el-form :model="form1" :rules="formRules1" ref="form1"  :label-width="'90px'">
        <el-form-item label="商品总价：" prop="">
            ￥{{cur_item.order_amount}}
        </el-form-item>
        <el-form-item label="运费："  prop="">
            ￥{{cur_item.freight_amount}}
        </el-form-item>
        <el-form-item label="合计："  prop="">
            ￥{{Number(cur_item.order_amount) + Number(cur_item.freight_amount)}}
        </el-form-item>
        <el-form-item label="需付款："  prop="payment_amount">
            <div style="display:flex;">
            <el-input type="number" v-model.number="form1.payment_amount" placeholder="请输入金额"></el-input>
            <span>元</span>
            </div>
        </el-form-item>
        <el-form-item label="备注：" prop="admin_remark">
          <el-input type="textarea" v-model="form1.admin_remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show1 = false">取 消</el-button>
        <el-button type="primary" @click="submit1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确认不可生产" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="70px">
        <el-form-item label="原因：" prop="reason">
          <el-input type="textarea" v-model="form.reason" placeholder="请输入原因"></el-input>
          <div>
            <i class="el-icon-info red"></i> 确认不可生产，订单将自动取消；
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定不可生产</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改收货地址" :visible.sync="show3" width="750px">
      <el-form :model="form3" :rules="formRules3" ref="form3" label-width="100px" >
        <el-form-item label="收货人：" prop="name">
          <el-input  v-model="form3.name" placeholder="请输入收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobilephone">
          <el-input   v-model.number="form3.mobilephone" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
       <el-form-item label="省市区："  prop="province_code" style="display:inline-block">
            <el-select v-model="form3.province_code" placeholder="省" @change="fetchCity">
                <el-option :label="item.area_name" :value="item.area_code" v-for="item in provinceList" :key="item.area_code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label-width="0" prop="city_code" style="display:inline-block">
            <el-select v-model="form3.city_code" placeholder="市" @change="fetchRegion">
                <el-option :label="item.area_name" :value="item.area_code" v-for="item in cityList" :key="item.area_code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label-width="0" prop="district_code" style="display:inline-block">
            <el-select v-model="form3.district_code" placeholder="区" @change="fetchDistrict">
                <el-option :label="item.area_name" :value="item.area_code" v-for="item in regionList" :key="item.area_code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input type="textarea" v-model="form3.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show3 = false">取 消</el-button>
        <el-button type="primary" @click="submit3">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import { isRejected } from "q";
export default {
  name: "order",
  mixins: [mixin],
  filters: {
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
          return "不需要量体";
          break;
        case 2:
          return "待量体";
          break;
        case 3:
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
      show2: false,
      show1: false,
      show: false,
      show3: false,
      form: {
        id: "",
        reason: ""
      },
      form1: {
        id: "",
        payment_amount: "",
        admin_remark: ""
      },
      form3: {
        id: "",
        name: "",
        mobilephone: "",
        province_code: "",
        city_code: "",
        district_code: "",
        address: ""
      },
      form2: {
        id: "",
        express_id: "",
        express_num: ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        order_status_id: 0,
        size_status_id: 0,
        // order_num: "",
        // fabric_num: "",
        skey: ""
      },
      formRules: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ]
      },
      formRules1: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ]
      },
      formRules2: {
        express_id: [
          { required: true, message: "请选择物流公司", trigger: "change" }
        ],
        express_num: [
          { required: true, message: "请输入物流单号", trigger: "blur" }
        ]
      },
      formRules3: {
        name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        province_code: [
          { required: true, message: "请选择省", trigger: "change" }
        ],
        city_code: [{ required: true, message: "请选择市", trigger: "change" }],
        district_code: [
          { required: true, message: "请选择区", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      provinceList: [],
      cityList: [],
      regionList: [],
      order_status_list: [
        { value: 1, name: "待支付" },
        { value: 2, name: "待确认" },
        { value: 3, name: "取消订单" },
        { value: 4, name: "待发货" },
        { value: 5, name: "已发货" },
        { value: 6, name: "已完成" }
      ],
      measuring_status_list: [
        { value: 1, name: "不需要量体" },
        { value: 2, name: "待量体" },
        { value: 3, name: "已完成" }
      ],
      nikeList: [],
      nikeName: null,
      tableData: {
        data: [],
        count: 0
      },
      cur_item: {},
      list1: [],
      title: "",
      select: "order_num",
      last_select: "order_num",
      multipleSelection: [], //选中的行数据
      isShowBatch: false, //是否显示批量操作
      schoolList: [] //学校列表
    };
  },
  methods: {
    //获取学校列表
    getSchoolList() {
      this.$q({
        url: "/bg_admin/bg_management/get_school"
      }).then(res => {
        this.schoolList = res;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    select_item(val) {
      this.queryParams[this.last_select] = "";
      this.last_select = val;
    },
    jump_fabric(row) {
      this.$router.push({
        path: "/fabricInfo",
        query: { id: this.cur_item.id, gid: row.goods_id }
      });
    },
    jump_per(row) {
      this.$router.push({
        path: "/personalityInfo",
        query: { id: this.cur_item.id, gid: row.goods_id }
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
    },
    fetchRegion(area_code) {
      this.$q({
        url: "/bg_admin/index/getAreaList?=440300",
        params: { parent_area_code: area_code }
      }).then(res => {
        this.regionList = res;
      });
    },
    fetchDistrict(area_code) {
      //   this.area.customer_district = this.areaMap(area_code, this.regionList);
    },
    areaMap(area_code, array) {
      for (var i = 0; i < array.length; i++) {
        const element = array[i];
        if (area_code == element.area_code) return element.area_name;
      }
    },
    modifyRecipientInfo(row) {
      this.cur_item = row;
      this.form3.name = row.recipient_name;
      this.form3.mobilephone = row.recipient_mobilephone;
      this.form3.province_code = row.recipient_province_code;
      this.form3.city_code = row.recipient_city_code;
      this.form3.district_code = row.recipient_district_code;
      this.form3.address = row.recipient_address;
      this.fetchCity(row.recipient_province_code);
      this.fetchRegion(row.recipient_city_code);
      this.show3 = true;
    },
    send(row) {
      this.title = 0;
      this.$q({
        method: "post",
        url: "/bg_admin/order/getRecipientInfo",
        data: { id: row.id }
      }).then(res => {
        this.cur_item = res;
        this.show2 = true;
      });
    },
    modifyExpress(row) {
      this.title = 1;
      this.$q({
        method: "post",
        url: "/bg_admin/order/getRecipientInfo",
        data: { id: row.id }
      }).then(res => {
        this.form2.express_id = res.express_id;
        this.form2.express_num = res.express_num;
        this.cur_item = res;
        this.show2 = true;
      });
    },
    getExpressCompanies() {
      this.$q({
        url: "/bg_admin/bg_management/manageExpress"
      }).then(res => {
        this.list1 = res.list;
      });
    },
    edit_price(item) {
      this.cur_item = item;
      this.form1.payment_amount = this.cur_item.payment_amount;
      this.show1 = true;
    },
    addNike() {
      this.nikeList.push(this.nikeName);
    },
    delName(index) {
      alert(index);
      this.nikeList = this.nikeList.splice(index, 1);
    },
    check(row) {
      this.$router.push({ path: "/orderInfo", query: { id: row.id } });
    },
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    order_status_query(value) {
      this.queryParams.order_status_id = value;
      this.queryParams.page = 1;
      this.query();
      var that = this;
      setTimeout(function() {
        that.isShowBatch = false;
        if (that.queryParams.order_status_id == 2) {
          that.isShowBatch = true;
        }
      }, 200);
    },
    order_status_query1(value) {
      this.queryParams.size_status_id = value;
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
        url: "/bg_admin/order/manageOrders",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.dialogFormVisible = true;
    },
    submit() {
      this.form.id = this.cur_item.id;
      this.post("form", "/bg_admin/order/cancelOrder", this.form, "show");
    },
    submit1() {
      this.form1.id = this.cur_item.id;
      this.$confirm("确定要修改该商品需付金额吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.post(
          "form1",
          "/bg_admin/order/modifyOrderPayment",
          this.form1,
          "show1"
        );
      });
    },
    submit2() {
      var url = "/bg_admin/order/sendGoods";
      if (this.title) {
        url = "/bg_admin/order/modifyExpress";
      }
      this.form2.id = this.cur_item.id;
      this.post("form2", url, this.form2, "show2");
    },
    submit3() {
      this.form3.id = this.cur_item.id;
      this.$confirm("确定要修改该订单收货地址吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.post(
          "form3",
          "/bg_admin/order/modifyRecipientInfo",
          this.form3,
          "show3"
        );
      });
    },
    cancel(row) {
      this.cur_item = row;
      this.show = true;
    },
    confirm(row) {
      this.$confirm("确定该订单确定可生产？", "提示", {
        type: "warning"
      }).then(() => {
        this.$q({
          url: "/bg_admin/order/confirmOrder",
          method: "post",
          data: { id: row.id }
        }).then(res => {
          this.$message.success("操作成功");
          this.query();
        });
      });
    },
    //批量审核
    batchAudit() {
      console.log(this.multipleSelection);
      var ids = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$q({
        url: "/bg_admin/order/batchConfirmOrders",
        method: "post",
        data: { ids: ids }
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    editShow(row) {
      this.form1 = { ...this.form1, ...row };
      this.form1.role_id = this.form1.role_id + "";
      this.dialogFormVisible1 = true;
    }
  },
  created() {
    this.query();
    this.getExpressCompanies();
    this.fetchProvince();
    this.getSchoolList();
  }
};
</script>
<style lang="scss">
.tailor-staff-manage {
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
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      text-align: left;
    }
  }
}
</style>

