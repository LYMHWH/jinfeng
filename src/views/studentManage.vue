<template>
  <div class="tailor-classManage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{parentName}}家长学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
        <!--
        <div style="float:right;">
          <el-form-item>
            <el-input placeholder="请输入学生名" v-model="queryParams.keyword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query_submit">搜索</el-button>
          </el-form-item>
        </div>-->
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender_id" label="性别">
          <template slot-scope="scope">
            <span v-text="scope.row.gender_id == 1 ?'男':'女'" ></span>
          </template></el-table-column>
        <el-table-column prop="height" label="身高"></el-table-column>
        <el-table-column prop="weight" label="体重"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="province_name" label="省"></el-table-column>
        <el-table-column prop="city_name" label="市"></el-table-column>
        <el-table-column prop="district_name" label="区或县"></el-table-column>
        <el-table-column prop="school_name" label="学校"></el-table-column>
        <el-table-column prop="class_name" label="班级"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="status_id" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.status_id ?'green':'red']"
              v-text="scope.row.status_id ?'启用':'停用'"
            ></span>
          </template>
        </el-table-column>-->
        <el-table-column prop="create_time" label="注册时间" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <!--<el-button
              @click="setting(scope.row)"
              type="text"
              size="small"
              :class="[scope.row.status_id ?'red':'green']"
            >{{scope.row.status_id ?'停用':'启用'}}</el-button>-->
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="tableData.length">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <el-dialog :title="title?'编辑学生':'添加学生'" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="学生姓名：" prop="name">
          <el-input style="width:200px;" v-model="form.name" placeholder="请输入学生名称"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender_id">
          <el-select style="width:100px;" v-model="form.gender_id">
            <el-option :label="item.label" :value="item.value" v-for="item in gender_list" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身高：" prop="height">
          <el-input type="number" style="width:200px;" v-model="form.height" placeholder="请输入学生身高"></el-input>cm
        </el-form-item>
        <el-form-item label="体重：" prop="weight">
          <el-input type="number" style="width:200px;" v-model="form.weight" placeholder="请输入学生体重"></el-input>kg
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input type="number" style="width:200px;" v-model="form.age" placeholder="请输入学生年龄"></el-input>岁
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
        <el-form-item label="班级：" prop="class_id">
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
      gender_list:[
        {label: '男', value: 1},
        {label: '女', value: 2},
      ],
      school_list: [],
      class_list:[],
      formRules: {
        name: [
          { required: true, message: "请输入学生名", trigger: "blur" },
        ],
        gender_id: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        height: [
          { required: true, message: "请输入学生身高", trigger: "change" }
        ],
        weight: [
          { required: true, message: "请输入学生体重", trigger: "change" }
        ],
        age: [
          { required: true, message: "请输入学生年龄", trigger: "change" }
        ],
        province_code: [
          { required: true, message: "请选择省", trigger: "change" }
        ],
        city_code: [
          { required: true, message: "请选择市", trigger: "change" }
        ],
        district_code: [
          { required: true, message: "请选择区", trigger: "change" }
        ],
        school_id: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        class_id: [
          { required: true, message: "请选班级", trigger: "change" }
        ],
      },
      form: {
        name: "",
        gender_id: "",
        height: "",
        weight: "",
        age: "",
        class_id: "",
        parent_id: "",
        remark: "",
        school_id: "",
        province_code: "",
        city_code: "",
        district_code: "",
      },
      provinceList: [],
      cityList: [],
      regionList: [],
      formLabelWidth: "70px",
      queryParams: {
        parent_id: ""
      },
      tableData:[],
      parentName: "",
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/set_class_status",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/student_list",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
        this.parentName = res[0] ? res[0].parent_name : '';
      });
    },
    add() {
      this.clean(this.form);
      this.form.parent_id = this.$route.query.id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该学生？",
        "/bg_admin/bg_management/del_student",
        { student_id: row.id, parent_id:this.$route.query.id}
      );
    },
    edit(row) {
      this.title = 1;
      this.form.parent_id = this.$route.query.id;
      this.form.student_id = row.id;
      this.form.name = row.name;
      this.form.gender_id = row.gender_id;
      this.form.height = row.height;
      this.form.weight = row.weight;
      this.form.age = row.age;
      this.form.school_id = row.school_id;
      this.form.class_id = row.class_id;
      this.form.province_code = String(row.province_code);
      this.form.city_code = String(row.city_code);
      this.form.district_code = String(row.district_code);
      this.form.remark = row.remark;
      this.fetchCity(row.province_code);
      this.fetchRegion(row.city_code);
      this.fetchDistrict()
      this.getClass(row.school_id)
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/add_student";
      if (this.title) {
        url = "/bg_admin/bg_management/edit_student";
      }
      this.post("form", url, this.form, "show");
    },
    fetchProvince() {
      this.$q({
        url:'/bg_admin/index/getAreaList?=440300',
      }).then(res=>{
        this.provinceList = res;
      })
    },
    fetchCity(area_code) {
      this.$q({
        url:'/bg_admin/index/getAreaList?=440300',
        params:{ parent_area_code: area_code}
      }).then(res=>{
        this.cityList =res;
      })
    },
    fetchRegion(area_code) {
      this.$q({
        url:'/bg_admin/index/getAreaList?=440300',
        params:{ parent_area_code: area_code}
      }).then(res=>{
        this.regionList = res;
      })
    },
    fetchDistrict(type) {
      var data = {
        province_code: this.form.province_code,
        city_code: this.form.city_code,
        district_code: this.form.district_code,
      }
      this.$q({
        url: "/bg_admin/bg_management/get_school_by_area",
        params: data
      }).then(res => {
        if(type){
          this.form.school_id = '';
          this.form.class_id = '';
        }
        this.school_list = res.map(item => {
          return{
            id: item.id,
            name: item.name
          }
        })
      });
    },
    getClass(id) {
      this.$q({
        url: "/bg_admin/bg_management/get_class_by_school",
        params: {school_id: id}
      }).then(res => {
        this.class_list = res.map(item => {
          return{
            id: item.id,
            name: item.name
          }
        })
      });
    },
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

