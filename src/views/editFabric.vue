<template>
    <div class="tailor-edit-fabric">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑面料</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="form" ref="form"  :inline="true" label-width="100px" :rules="form_rule">
                <div class="info-container">
                       <div class="title">基本信息：</div>
                    <div style="width:1200px;">
                        <!--<el-form-item :label="item.item_name+'：'" :prop="`item${item.id}`" v-for="(item,index) in list" :key="index"  :rules="[{ required: item.is_search, message: `请选择${item.item_name}`, trigger: ['blur', 'change'] },]">                     
                            <el-select v-model="form[`item${item.id}`]" placeholder="请选择">
                                <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in item.item_values"  :key="i"></el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="分类：" prop="classification">
                            <el-select v-model="form.classification" placeholder="请选择">
                                <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in classificationList"  :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="系列：" prop="series">
                            <el-select v-model="form.series" placeholder="请选择">
                                <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in seriesList"  :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="面料编号：" prop="fabric_num">
                            <el-input v-model="form.fabric_num" placeholder="请输入面料编号"></el-input>
                        </el-form-item>
                        <el-form-item label="面料品种：">
                            <el-input v-model="form.fabric_variety" placeholder="请输入面料品种"></el-input>
                        </el-form-item>
                        <el-form-item label="面料名称：">
                            <el-input v-model="form.fabric_name" placeholder="请输入面料名称"></el-input>
                        </el-form-item>
                        <el-form-item label="面料档次：" prop="grade">
                            <el-select v-model="form.grade" placeholder="请选择">
                                <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in gradeList"  :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="面料颜色：" prop="color">
                            <el-select v-model="form.color" placeholder="请选择">
                                <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in colorList"  :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="纱支：">
                            <el-input v-model="form.yarn_count" placeholder="请输入纱支"></el-input>
                        </el-form-item>
                        <el-form-item label="面料价格：" prop="price">
                            <div style="display:flex;">
                                <el-input placeholder="请输入价格" v-model.number="form.price"></el-input><span style="margin-left:10px;">元</span>
                            </div>
                        </el-form-item>
                    </div>
                    <div v-for="(item,index) in list1" :key="index">
                      <el-form-item :label="item.item_name+'：'"  :prop="`item${item.id}`">
                        <div style="width:1000px;">    
                          <el-checkbox-group  v-model="form[`item${item.id}`]">
                            <el-checkbox  v-for="(v,i) in item.item_values" :label="v.id"    :key="i" :name="`item${item.id}`">{{v.item_value}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-form-item>
                    </div>
                </div>
                <div class="upload-container">
  <div class="title">上传图片： <span>
                                <i class="el-icon-info red"></i> 分辨率要求160px*160px，格式要求png、jpg或jpeg，且大小不超过1M；
                            </span></div>
                    <div>
                        <el-form-item label="面料图片："  prop="fabric_photos">
							<muti-image  :data="{ type_id: 3 }" v-model="form.fabric_photos"/>
                        </el-form-item>
                    </div>     

                    <div>
                        <el-form-item label="成衣图片："  prop="clothing_photos">
							<muti-image  :data="{ type_id: 3 }" v-model="form.clothing_photos"/>
                        </el-form-item>
                    </div>     
                    <div>
                        <el-form-item label="模特图片："  prop="model_photos">
							<muti-image  :data="{ type_id: 3 }" v-model="form.model_photos"/>
                        </el-form-item>
                    </div>


                </div>    

                <div  class="sub-btns">
                    <el-form-item label=" " prop="">
                        <el-button  @click="cancel">取消</el-button> 
                        <el-button type="primary" @click="submit">提交</el-button> 
                    </el-form-item>
                </div> 
            </el-form>
        </div>
     
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import mutiImage from "@/components/Upload/mutiImage";
export default {
  name: "editFabric",
  mixins: [mixin],
  components: {
    mutiImage
  },
  data() {
    return {
      form: {
        id: "",
        fabric_num: "",
        yarn_count: "",
        price: "0.00",
        classification: "",
        series: "",
        grade: "",
        color: "",
        fabric_variety: "",
        fabric_name: "",
        fabric_photos: [],
        clothing_photos: [],
        model_photos: [],
        item7: [],
        item8: []
      },
      form_rule: {
        fabric_num: [
          { required: true, message: "请输入面料号", trigger: "blur" }
        ],
        price: [{ required: true, message: "请填写价格", trigger: "blur" }],
        yarn_count: [
          { required: true, message: "请输入纱支", trigger: "blur" }
        ],
        classification: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        series: [
          { required: true, message: "请选择面料系列", trigger: "change" }
        ],
        grade: [
          { required: true, message: "请选择面料档次", trigger: "change" }
        ],
        color: [
          { required: true, message: "请选择面料颜色", trigger: "change" }
        ],
        item7: [
          {
            type: "array",
            required: true,
            message: "请选择成分",
            trigger: "change"
          }
        ],
        fabric_photos: [
          {
            type: "array",
            required: true,
            message: "请上传面料图片",
            trigger: "change"
          }
        ],
        clothing_photos: [
          {
            type: "array",
            required: true,
            message: "请上传成衣图片",
            trigger: "change"
          }
        ],
        model_photos: [
          {
            type: "array",
            required: true,
            message: "请上传模特图片",
            trigger: "change"
          }
        ]
      },
      list: [],
      list1: [],
      classificationList: [], //分类列表
      seriesList: [], //系列列表
      gradeList: [], //档次列表
      colorList: [] //颜色列表
    };
  },
  methods: {
    cancel1() {
      this.$router.push({ path: "/fabricList" });
    },
    process_data(obj) {
      var data = {},
        item_value_ids = [],
        keys = Object.keys(obj);
      keys.forEach(v => {
        if (v.startsWith("item")) {
          if (Array.isArray(obj[v])) {
            obj[v].forEach(val => {
              item_value_ids.push({ item_value_id: val });
            });
          } else {
            item_value_ids.push({ item_value_id: obj[v] });
          }
        } else {
          data[v] = obj[v];
        }
      });
      item_value_ids.push({ item_value_id: obj.classification });
      item_value_ids.push({ item_value_id: obj.series });
      item_value_ids.push({ item_value_id: obj.grade });
      item_value_ids.push({ item_value_id: obj.color });
      data["item_value_ids"] = item_value_ids;
      data["fabric_photos"] = data["fabric_photos"];
      data["clothing_photos"] = data["clothing_photos"];
      data["model_photos"] = data["model_photos"];
      return data;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = this.process_data(this.form);
          this.$q({
            url: "/bg_admin/fabric/editFabric",
            data,
            method: "post"
          }).then(res => {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push({ path: "/fabricList" });
            }, 2000);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fetchInfo() {
      this.$q({
        url: "/bg_admin/fabric/getFabricDetail",
        params: { id: this.$route.query.id }
      }).then(res => {
        this.form.fabric_num = res.fabric_num;
        this.form.yarn_count = res.yarn_count;
        this.form.price = res.price;
        this.form.fabric_name = res.fabric_name;
        this.form.fabric_variety = res.fabric_variety;
        this.form.fabric_photos = JSON.parse(res.fabric_photos);
        this.form.clothing_photos = JSON.parse(res.clothing_photos);
        this.form.model_photos = JSON.parse(res.model_photos);
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/fabric/getFabricItem",
        params: { id: this.$route.query.id }
      }).then(res => {
        res.forEach(v => {
          if (v.type_id == 2) {
            this.list1.push(v);
            this.form[`item${v.id}`] =
              v.item_value_id && v.item_value_id.length > 0
                ? v.item_value_id
                : [];
          } else {
            this.list.push(v);
            // this.$set(
            //   this.form,
            //   `item${v.id}`,
            //   v.item_value_id ? v.item_value_id[0] : ""
            // );
            if (v.id === 1) {
              this.classificationList = v.item_values; //分类
              this.form.classification = v.item_value_id
                ? v.item_value_id[0]
                : "";
            }
            if (v.id === 2) {
              this.seriesList = v.item_values; //系列
              this.form.series = v.item_value_id ? v.item_value_id[0] : "";
            }
            if (v.id === 3) {
              this.gradeList = v.item_values; //档次
              this.form.grade = v.item_value_id ? v.item_value_id[0] : "";
            }
            if (v.id === 5) {
              this.colorList = v.item_values; //颜色
              this.form.color = v.item_value_id ? v.item_value_id[0] : "";
            }
          }
        });
      });
    }
  },
  created() {
    this.form.id = this.$route.query.id;
    this.query();
    this.fetchInfo();
  }
};
</script>
<style lang="scss">
.tailor-edit-fabric {
  .el-input {
    width: 200px;
  }
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
  .info-container {
    overflow: hidden;
    margin-right: 50px;
    border-bottom: 1px dotted #ddd;
    margin-bottom: 20px;
    .el-form-item {
      float: left;
    }
  }
}
</style>

