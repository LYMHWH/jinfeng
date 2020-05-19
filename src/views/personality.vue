<template>
    <div class="tailor-personality">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加个性化工艺</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form :model="form" ref="form" :rules="form_rule" :label-width="'150px'" :inline="true">
                <div>
                    <div class="title">基本信息：</div>
                    <div>
                        <el-form-item label="名称：" prop="name">
                            <el-input placeholder="请输入个性化工艺名称" v-model="form.name"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="编码：" prop="code">
                            <el-input placeholder="请输入个性化工艺编码" v-model="form.code"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item required label="内容：" prop="allow_content">
                            <el-radio-group v-model="form.allow_content">
                                <el-radio :label="0">不允许自定义内容</el-radio>
                                <el-radio :label="1">允许自定义内容</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <!--
                    <div v-show="form.allow_content ==1">
                        <el-form-item  label="自定义内容方式：" prop="content" :rules="form.allow_content==1?form_rule.content:[{type: 'array',required:false,message: '请选择自定义内容方式', trigger: 'change'}]">
                            <el-checkbox-group v-model="form.content">
                                <el-checkbox label="is_text">文本输入</el-checkbox>
                                <el-checkbox label="is_sign">手签</el-checkbox>
                                <el-checkbox label="is_art">自动生成艺术字体</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    -->
                    <div>
                        <el-form-item required label="设置：" prop="type_id">
                            <el-radio-group v-model="form.type_id">
                                <el-radio :label="1">城市合伙人</el-radio>
                                <el-radio :label="2">家长</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>        
                    <div>
                        <el-form-item label="价格：" prop="price">
                            <div style="display:flex;">
                            <el-input placeholder="请输入价格" type="number" v-model.number="form.price"></el-input><span style="margin-left:10px;">元</span>
                            </div>
                        </el-form-item>
                    </div>    
                    <div>
                        <el-form-item label="选项：" prop="attrs">
                            <div style="display:flex;">
                                <el-input placeholder="请输入" v-model="attr"></el-input>
                                <el-button @click="add_attr" style="margin-left:10px;">添加</el-button>
                            </div>
                            <div>
                                <el-tag
                                    style="margin-right:10px;"
                                    v-for="(tag,index) in form.attrs"
                                    :key="index"
                                    closable
                                    @close="handleClose(index)"
                                    >
                                    <span>{{tag.id?tag.attr_name:tag}}</span>
                                </el-tag>
                            </div>
                        </el-form-item>
                    </div>
                </div>    
                <div v-show="form.attrs.length" class="opt-setting">
                    <div class="title">选项设置： <span>
                                <i class="el-icon-info red"></i> 分辨率要求210px*210px，格式要求png、jpg或jpeg，且大小不超过1M；
                            </span></div>
                     <div v-for="(item,index) in form.attrs" :key="index">
                        <el-form-item :label="item+'：'" :prop="`photos${item}`" :rules="[
      { required: true, message: `请上传${item}图片`, trigger: [ 'change'] },
    ]">
                            <div class="cell">
                                <div class="card" v-for="(val,i) in form[`photos${item}`]" :key="i">
                                    <div class="avatar-container">
                                        <img :src="val.url" alt="">
                                        <div class="avatar-delet-modal">
                                            <i class="el-icon-delete avatar-delet" @click="rmImage(item,i)"></i>
                                        </div>
                                    </div>
                                    <div style="margin:10px 0;"><span>工艺名称：</span><el-input placeholder="请输入" style="width:100px;" v-model="val.name"></el-input></div>
                                    <div><span>工艺编码：</span><el-input placeholder="请输入" style="width:100px;" v-model="val.code"></el-input></div>
                                </div>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="`${HOST}/bg_admin/bg_management/upload_files`"
                                    multiple
                                    :show-file-list="false"
                                    :headers="x_token"
                                    :data='params'
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <el-button class="add" @click="add(item)">添加</el-button>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </div> 
                </div>
                 <div  class="sub-btns">
                    <el-form-item label=" " prop="">
                        <el-button @click="cancel">取消</el-button> 
                        <el-button type="primary" @click="submit">提交</el-button> 
                    </el-form-item>
                </div> 
            </el-form>
        </div>

    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "personality",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    var host = process.env.BASE_API;
    return {
      HOST: host,
      image: "",
      form: {
        name: "",
        code: "",
        allow_content: 0,
        // content:[],
        type_id: 1,
        price: "",
        attrs: []
      },
      form_rule: {
        name: [
          { required: true, message: "请输入个性化工艺名称", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入个性化工艺编码", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        // content:[{type: "array",required:true,message: '请选择自定义内容方式', trigger: 'change'}],
        attrs: [
          {
            type: "array",
            required: true,
            message: "请输入个性化工艺名称",
            trigger: "blur"
          }
        ]
      },
      attr: "",
      x_token: "",
      params: {
        type_id: 4
      },
      x_token: {
        "X-Token": ""
      },
      index: 0
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      var { result } = res;
      this.form[`photos${this.index}`].push({
        url: result.oks.file[0].file_url,
        name: "",
        code: ""
      });
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("token");
      return true;
    },
    add(item) {
      this.index = item;
    },
    add_attr() {
      this.$refs["form"].clearValidate("attrs");
      var val = this.attr.trim();
      if (!val) {
        this.$message.error("请填写选项");
        return;
      }
      if (this.form.attrs.indexOf(val) != -1) {
        this.$message.error("选项已存在");
        return;
      }
      this.$set(this.form, `photos${val}`, []);
      this.form.attrs.push(val);
      this.attr = "";
      console.log(this.form);
    },
    handleClose(index) {
      this.form.attrs.splice(index, 1);
    },
    rmImage(item, i) {
      this.form[`photos${item}`].splice(i, 1);
    },
    process_data(obj) {
      var data = {},
        items = [];
      this.form.attrs.forEach(v => {
        items.push({
          item_name: v,
          photos: obj[`photos${v}`]
        });
      });
      // if(obj.allow_content ==1){
      //   data.is_text = 0;
      //    data.is_sign = 0;
      //    data.is_art = 0;
      //    obj.content.forEach(v=>{
      //        data[v] = 1;
      //    })
      // }else{
      //    data.is_text = 0;
      //    data.is_sign = 0;
      //    data.is_art = 0;
      // }

      data.name = obj.name;
      data.code = obj.code;
      data.allow_content = obj.allow_content;
      // data.allow_more = obj.allow_more;
      data.price = obj.price;
      data.items = items;
      data.type_id = obj.type_id;

      return data;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = this.process_data(this.form);
          this.$q({
            url: "/bg_admin/personalization/addPersonalization",
            data,
            method: "post"
          }).then(res => {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push({ path: "/personalityList" });
            }, 2000);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel1() {
      this.$router.push({ path: "/personalityList" });
    }
  }
};
</script>
<style lang="scss">
.tailor-personality {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .cell {
    display: flex;
    align-items: center;
    .card {
      width: 200px;
      margin: 0 20px 20px 0;
      img {
        width: 100px;
        height: 100px;
        display: block;
        margin: 0 auto;
      }
    }
    .add {
      margin-left: 30px;
    }
  }
  .avatar-container {
    position: relative;
    &:hover {
      .avatar-delet-modal {
        display: block;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    .avatar-delet-modal {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0);
      display: none;
      transition: all 2s;
    }
    .avatar-delet {
      font-size: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
    }
  }
  .opt-setting {
    .el-input__inner {
      border-radius: 0;
    }
  }
}
</style>


