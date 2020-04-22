<!-- 产品类型管理 -->
<template>
  <div class="productTypeManage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="box">
      <div class="product">
        <div class="btns">
          <el-form :inline="true">
            <el-form-item>
              <el-button @click="add">新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="edit">编辑</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="del">删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="border: 1px solid #ccc;height:700px;width:300px;padding:10px 0;">
          <div v-for="(item, index) in tableData" :class="{'productItem':true,'active':index === index1}" @click="selectItem(index)">
            <div>{{index+1}}、{{item.name}}</div>
            <div>{{item.code}}</div>
          </div>
        </div>
      </div>
      <div class="size-field">
        <div class="btns">
          <el-form :inline="true">
            <el-form-item>
              <el-button v-if="!isShowEdit" @click="save">保存</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="isShowEdit=false">编辑</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-if="!isShowEdit" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-checkbox-group  v-model="checkList">
            <el-checkbox v-for="(v,i) in sizeList" :label="v.item_id" :key="i">{{v.item_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <el-dialog :title="title?'编辑':'添加'" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="产品类型：" prop="name">
          <el-input style="width:300px;" v-model="form.product_type" placeholder="请输入产品类型"></el-input>
        </el-form-item>
        <el-form-item label="产品编码：" prop="name">
          <el-input style="width:300px;" v-model="form.product_code" placeholder="请输入产品编码"></el-input>
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
  name: "productTypeManage",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      title: 0,
      isShowEdit: false, //是否显示字段编辑按钮
      formRules: {
        product_type: [
          { required: true, message: "请输入学校名", trigger: "blur" }
        ],
        product_code: [
          { required: true, message: "请输入产品编码", trigger: "blur" }
        ],
      },
      form: {
        product_type: "",
        product_code:"",
      },
      tableData:[{id:1,name: '上衣',code:'123'},{id:1,name: '裤子',code:'3214'},{id:1,name: '下衣',code:'asdf'}],
      index1: 0, //选中的产品类型下标
      checkList: [], //选中的尺码字段
      sizeList: [], //尺码字段
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/school_list",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    getSizeItems(){
      this.$q({
        url:'/bg_admin/size/getSizeItems'
      }).then(res=>{
        this.sizeList=res;
      })
    },
    selectItem(index){
      this.index1 = index;
    },
    add() {
      this.clean(this.form);
    //   this.form.item_id = this.item_id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "确定要删除吗？",
        "/bg_admin/bg_management/del_school",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.province_code = String(row.province_code);
      this.form.city_code = String(row.city_code);
      this.form.district_code = String(row.district_code);
      this.form.remark = row.remark;
      this.fetchCity(row.province_code);
      this.fetchRegion(row.city_code);
      this.show = true;
    },
    //保存字段
    save(){

    },
    //取消
    cancel(){

    },
    submit(){

    }
  },

  created() {
    // this.query();
    this.getSizeItems();
  }
};
</script>
<style lang="scss">
.productTypeManage {
  .box{
    display: flex;
  }
  .product{
    width: 400px;
  }
  .size-field{
    flex: 1;
  }
  .productItem{
    display:flex;
    justify-content: space-between;
    height:40px;
    line-height: 40px;
    padding: 0 10px;
    overflow: auto;
  }
  .active{
    background: #014691;
    color:#fff;
  }
  .el-checkbox{
    margin-left: 0;
    margin-right: 30px;
    margin-bottom: 10px;
  }
}
</style>

