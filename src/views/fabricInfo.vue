<template>
    <div class="tailor-add-fabric">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order' }">待处理订单</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/orderInfo',query:{id:id} }">订单详情</el-breadcrumb-item>
            <el-breadcrumb-item>面料详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="form" ref="form"  :inline="true" label-width="100px" :rules="form_rule">
                <div class="info-container">
                     <div class="title">基本信息：</div>
                    <div style="width:1200px;" >
                        <el-form-item :label="item.item_name+'：'" v-for="(item,index) in res.fabric_attr_json" :key="index"  >                     <div class="item">{{item.item_value}}</div>
                        </el-form-item>
                        <el-form-item label="面料号：" prop="">
                            <div  class="item">{{res.fabric_num}}</div>
                        </el-form-item>
                        <el-form-item label="纱支："  prop="">
                           <div  class="item">{{res.yarn_count}}</div>
                        </el-form-item>
                    </div>
                </div>
                <div class="upload-container">
                    <div class="title">上传图片：</div>
                    <div>
                        <el-form-item label="面料图片：" prop="">
							            <img :src="item" class="avatar" v-for="(item,index) in res.fabric_photos" :preview="1">
                        </el-form-item>
                    </div>     
                    <div>
                        <el-form-item label="成衣图片："  prop="">
							            <img :src="item" class="avatar" v-for="(item,index) in res.clothing_photos" :preview="2">
                        </el-form-item>
                    </div>     
                    <div>
                        <el-form-item label="模特图片："  prop="">
							            <img :src="item" class="avatar" v-for="(item,index) in res.model_photos" :preview="3">
                        </el-form-item>
                    </div>
                </div>    
            </el-form>
        </div>
     
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import mutiImage from "@/components/Upload/mutiImage";
export default {
  name: "fabricInfo",
  mixins: [mixin],
  components: {
    mutiImage
  },
  data() {
    return {
      form: {
        fabric_num: "",
        yarn_count: "",
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
      list1: [],
      id:"",
      goods_id:"",
       res:{}, 
    };
  },
  methods: {
    cancel() {
      this.$refs["form"].resetFields();
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
      data["item_value_ids"] = JSON.stringify(item_value_ids);
      data["fabric_photos"] = JSON.stringify(data["fabric_photos"]);
      data["clothing_photos"] = JSON.stringify(data["clothing_photos"]);
      data["model_photos"] = JSON.stringify(data["model_photos"]);
      return data;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = this.process_data(this.form);
          this.$q({
            url: "/bg_admin/bg_management/addFabric",
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
        url: "/bg_admin/order/getOrderFabric",
        method:"post",
        data:{
            id:this.id,
            goods_id:this.goods_id
        }
      }).then(res => {
          this.res = res;
            this.$previewRefresh();
      });
    }
  },
  created() {
      this.id = this.$route.query.id;
      this.goods_id = this.$route.query.gid;
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
    // display: flex;
    // justify-content: space-between;
    width: 220px;
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
    width: 150px;
    height: 150px;
    display: inline-block;
    margin-right: 20px;
  }
  .info-container{
      margin-right:50px; 
      border-bottom:1px dotted #ddd; 
      margin-bottom: 20px;
  }
}
</style>

