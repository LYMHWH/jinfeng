<template>
  <div class="tailor-classManage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学校账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
        <div style="float:right;">
          <el-form-item>
            <el-input placeholder="请输入姓名/手机号" v-model="queryParams.keyword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query_submit">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        :data="tableData.data"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="nickname" label="姓名"></el-table-column>
        <el-table-column prop="mobilephone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="wxapp_role_id" label="角色">
          <template slot-scope="scope">
            <span v-text="scope.row.wxapp_role_id == 2 ?'学校管理员':'班主任'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="province_name" label="省"></el-table-column>
        <el-table-column prop="city_name" label="市"></el-table-column>
        <el-table-column prop="district_name" label="区或县"></el-table-column>
        <el-table-column prop="school_name" label="学校"></el-table-column>
        <el-table-column prop="class_name" label="班级"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_locked" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.is_locked ?'red':'green']"
              v-text="scope.row.is_locked ?'锁定':'解锁'"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="reg_time" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_login_time" label="上次登录时间" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="last_login_ip" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.is_locked ?'green':'red']"
            >{{scope.row.is_locked ?'解锁':'锁定'}}</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
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
        :total="tableData.count"
      ></el-pagination>
    </div>
    <el-dialog :title="title?'编辑':'添加'" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="姓名：" prop="nickname">
          <el-input style="width:200px;" v-model="form.nickname" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobilephone">
          <el-input style="width:200px;" v-model="form.mobilephone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="wxapp_role_id">
          <el-select style="width:200px;" v-model="form.wxapp_role_id">
            <el-option :label="item.label" :value="item.value" v-for="item in role_list" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省市区：" prop="province_code" style="display:inline-block">
					<el-select v-model="form.province_code" placeholder="省" @change="fetchCity">
            <el-option :label="item.area_name" :value="item.area_code" v-for="item in provinceList" :key="item.area_code"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label-width="0" prop="city_code" style="display:inline-block">
            <el-select v-model="form.city_code" placeholder="市" @change="fetchRegion">
                <el-option :label="item.area_name" :value="item.area_code" v-for="item in cityList" :key="item.area_code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label-width="0" prop="district_code" style="display:inline-block">
            <el-select v-model="form.district_code" placeholder="区" @change="fetchDistrict(1)">
                <el-option :label="item.area_name" :value="item.area_code" v-for="item in regionList" :key="item.area_code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学校：" prop="school_id">
          <el-select style="width:200px;" v-model="form.school_id" @change="getClass">
            <el-option :label="item.name" :value="item.id" v-for="item in school_list" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.wxapp_role_id == 2" label="资金托管：" prop="mobilephone">
          <el-radio v-model="form.funds_trusteeship" :label="1">不托管</el-radio>
          <el-radio v-model="form.funds_trusteeship" :label="2">托管</el-radio>
        </el-form-item>
        <el-form-item v-if="form.wxapp_role_id == 2" label="账户金额：">
          <span v-model="form.account_balance"></span>
        </el-form-item>
        <el-form-item v-if="form.wxapp_role_id == 3" label="班级：" prop="class_id">
          <el-select style="width:200px;" v-model="form.class_id">
            <el-option :label="item.name" :value="item.id" v-for="item in class_list" :key="item.value"></el-option>
          </el-select>
        </el-form-item>    
        <el-form-item label="备注：" prop="remark">
          <el-input style="width:300px;" type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "classManage",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      title: 0,
      role_list: [
        { label: "学校管理员", value: 2 },
        { label: "班主任", value: 3 }
      ],
      gender_list: [{ label: "男", value: 1 }, { label: "女", value: 2 }],
      school_list: [],
      class_list: [],
      formRules: {
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        wxapp_role_id: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        province_code: [
          { required: true, message: "请选择省", trigger: "change" }
        ],
        city_code: [{ required: true, message: "请选择市", trigger: "change" }],
        district_code: [
          { required: true, message: "请选择区", trigger: "change" }
        ],
        school_id: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        class_id: [{ required: true, message: "请选班级", trigger: "change" }]
      },
      form: {
        nickname: "",
        mobilephone: "",
        wxapp_role_id: "",
        class_id: "",
        remark: "",
        school_id: "",
        province_code: "",
        city_code: "",
        district_code: "",
        funds_trusteeship: 1
      },
      provinceList: [],
      cityList: [],
      regionList: [],
      formLabelWidth: "70px",
      queryParams: {
        page: 1,
        size: 10,
        skey: ""
      },
      tableData: {
        count: 0,
        data: []
      }
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    setting(row) {
      var data = { id: row.id, is_locked: 1 };
      if (row.is_locked === 1) {
        data.is_locked = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/set_school_user_status",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/school_user_list",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
      this.form.funds_trusteeship = 1;
      this.form.parent_id = this.$route.query.id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该账号？",
        "/bg_admin/bg_management/del_school_user",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form.id = row.id;
      this.form.nickname = row.nickname;
      this.form.mobilephone = row.mobilephone;
      this.form.wxapp_role_id = row.wxapp_role_id;
      this.form.school_id = row.school_id;
      this.form.class_id = row.class_id;
      this.form.province_code = String(row.province_code);
      this.form.city_code = String(row.city_code);
      this.form.district_code = String(row.district_code);
      this.form.remark = row.remark;
      this.fetchCity(row.province_code);
      this.fetchRegion(row.city_code);
      this.fetchDistrict();
      this.getClass(row.school_id);
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/add_school_user";
      if (this.title) {
        url = "/bg_admin/bg_management/edit_school_user";
      }
      this.post("form", url, this.form, "show");
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
    fetchDistrict(type) {
      var data = {
        province_code: this.form.province_code,
        city_code: this.form.city_code,
        district_code: this.form.district_code
      };
      this.$q({
        url: "/bg_admin/bg_management/get_school_by_area",
        params: data
      }).then(res => {
        if (type) {
          this.form.school_id = "";
          this.form.class_id = "";
        }
        this.school_list = res.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
      });
    },
    getClass(id) {
      this.$q({
        url: "/bg_admin/bg_management/get_class_by_school",
        params: { school_id: id }
      }).then(res => {
        this.class_list = res.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
      });
    }
  },

  created() {
    this.queryParams.parent_id = this.$route.query.id;
    this.query();
    this.fetchProvince();
  }
};
</script>
<style lang="scss">
.tailor-classManage {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .el-dialog {
    width: 810px;
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
}
</style>

