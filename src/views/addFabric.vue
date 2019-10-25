<template>
    <div class="tailor-add-fabric">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加面料</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="form" ref="form"  :inline="true" label-width="100px" :rules="form_rule">
                <div class="info-container">
                     <div class="title">基本信息：</div>
                    <div style="width:1200px;">
                        <el-form-item :label="item.item_name+'：'" :prop="`item${item.id}`" v-for="(item,index) in list" :key="index"  :rules="[
      { required: item.is_search, message: `请选择${item.item_name}`, trigger: ['blur', 'change'] },
    ]">
                            <el-select v-model="form[`item${item.id}`]" placeholder="请选择">
                                <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in item.item_values"  :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="面料号：" prop="fabric_num">
                            <el-input v-model="form.fabric_num" placeholder="请输入面料号"></el-input>
                        </el-form-item>
                        <el-form-item label="纱支："  prop="yarn_count">
                            <el-input v-model="form.yarn_count" placeholder="请输入纱支"></el-input>
                        </el-form-item>
                        <el-form-item label="面料价格：" prop="price">
                            <div style="display:flex;">
                                <el-input placeholder="请输入价格"  v-model.number="form.price"></el-input><span style="margin-left:10px;">元</span>
                            </div>
                        </el-form-item>
                        <!-- <el-form-item label="系列："  prop="">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="属性："  prop="">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="花型："  prop="">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="面料档次："  prop="">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="颜色："  prop="">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item> -->
                    </div>
                    <div v-for="(item,index) in list1" :key="index" >
                        <el-form-item :label="item.item_name+'：'"  :prop="`item${item.id}`" :rules="[
      { type:'array', required: item.is_search, message: `请选择${item.item_name}`, trigger:'change'},
    ]">                     <div style="width:1000px;">
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
							<muti-image :data="{ type_id: 3 }" v-model="form.fabric_photos"/>
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
  name: "addFabric",
  mixins: [mixin],
  components: {
    mutiImage
  },
  data() {
    return {
      form: {
        fabric_num: "",
        yarn_count: "",
        price: "0.00",
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
        price: [
          { required: true, message: "请填写价格", trigger: "blur" }
        ],
        yarn_count: [
          { required: true, message: "请输入纱支", trigger: "blur" }
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
      list1: []
    };
  },
  methods: {
    // handleUpdate(val){
    //   this.form.fabric_photos = val;
    // },
    cancel1() {
       this.$router.push({ path: "/fabricList" });
    },
    process_data(obj) {
      var data={},
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
            url: "/bg_admin/fabric/addFabric",
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
    query() {
      this.$q({
        url: "/bg_admin/fabric/getFabricItem"
      }).then(res => {
        res.forEach(v => {
          if (v.type_id == 2) {
            this.list1.push(v);
            this.form[`item${v.id}`] = [];
          } else {
            this.list.push(v);
          }
        });
      });
    }
  },
  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-add-fabric {
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
  .info-container{
      overflow: hidden;
      margin-right:50px; 
      border-bottom:1px dotted #ddd; 
      margin-bottom: 20px;
      .el-form-item{
          float: left;
      }
  }
}
</style>

