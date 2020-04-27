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
          <div v-for="(item, index) in tableData" :class="{'productItem':true,'active':index === index1}" @click="selectItem(item,index)">
            <div>{{index+1}}.&nbsp;&nbsp;{{item.name}}</div>
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
              <el-button v-if="isShowEdit" @click="isShowEdit=false">编辑</el-button>
            </el-form-item>
            <el-form-item>
              <el-button v-if="!isShowEdit" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-checkbox-group  v-model="checkList">
            <el-checkbox :disabled="isShowEdit" v-for="(v,i) in sizeList" :label="v.item_id" :key="i">{{v.item_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <el-dialog :title="title?'编辑':'添加'" :visible.sync="show" width="500px">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="产品类型：" prop="name">
          <el-input style="width:300px;" v-model="form.name" placeholder="请输入产品类型"></el-input>
        </el-form-item>
        <el-form-item label="产品编码：" prop="name">
          <el-input style="width:300px;" v-model="form.code" placeholder="请输入产品编码"></el-input>
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
      isShowEdit: true, //是否显示字段编辑按钮
      formRules: {
        name: [{ required: true, message: "请输入产品类型", trigger: "blur" }],
        code: [{ required: true, message: "请输入产品编码", trigger: "blur" }]
      },
      form: {
        name: "",
        code: ""
      },
      form1: {
        id: "",
        item_ids: []
      },
      tableData: [],
      index1: 0, //选中的产品类型下标
      checkList: [], //选中的尺码字段
      sizeList: [] //尺码字段
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    query() {
      this.$q({
        url: "/bg_admin/product_category/manageProductCates",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
        this.checkList = this.tableData[this.index1].item_ids;
        this.form1.id = this.tableData[this.index1].id;
      });
    },
    getSizeItems() {
      this.$q({
        url: "/bg_admin/size/getSizeItems"
      }).then(res => {
        this.sizeList = res;
      });
    },
    selectItem(data, index) {
      this.index1 = index;
      this.checkList = data.item_ids;
      this.form1 = {
        id: data.id,
        item_ids: []
      };
    },
    add() {
      this.clean(this.form);
      this.title = 0;
      this.show = true;
    },
    del(row) {
      if (!this.form1.id) {
        this.$message.error("请选择产品类型！");
        return;
      }
      this.delete(
        "确定要删除吗？",
        "/bg_admin/product_category/deleteProductCate",
        { id: this.form1.id }
      );
    },
    edit() {
      var row = this.tableData[this.index1];
      this.title = 1;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.code = row.code;
      this.show = true;
    },
    //保存字段
    save() {
      this.form1.item_ids = this.checkList;
      this.$q({
        method: "post",
        url: "/bg_admin/product_category/setProductCateItems",
        data: this.form1
      }).then(res => {
        this.$message.success("操作成功");
        this.isShowEdit = true;
        this.query();
      });
    },
    //取消
    cancel() {
      this.query();
      this.isShowEdit = true;
    },
    submit() {
      var url = "/bg_admin/product_category/addProductCate";
      if (this.title) {
        url = "/bg_admin/product_category/editProductCate";
      }
      this.post("form", url, this.form, "show");
    }
  },

  created() {
    this.query();
    this.getSizeItems();
  }
};
</script>
<style lang="scss">
.productTypeManage {
  .box {
    display: flex;
  }
  .product {
    width: 400px;
  }
  .size-field {
    flex: 1;
  }
  .productItem {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    overflow: auto;
  }
  .active {
    background: #014691;
    color: #fff;
  }
  .el-checkbox {
    margin-left: 0;
    margin-right: 30px;
    margin-bottom: 10px;
  }
}
</style>

