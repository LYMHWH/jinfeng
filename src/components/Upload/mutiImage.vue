<template>
  <div class="muti-upload-container">
      <div class="avatar-container" v-for="(url,index) in imageUrls" >
        <img  :src="url" class="avatar">
        <div class="avatar-delet-modal">
            <i class="el-icon-delete avatar-delet" @click="rmImage(index)"></i>
        </div>
      </div>
       <el-upload
            ref="uploadItem"
            v-show="imageUrls.length<num"
            class="avatar-uploader"
            :action="`${HOST}/bg_admin/bg_management/upload_files`"
            multiple
            :show-file-list="false"
            :limit="num"
            :headers="x_token"
            :data='data'
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </div>
</template>

<script>

var ImgType = ["gif", "jpeg", "jpg", "png"],
  img_exp = RegExp(`(${ImgType.join("|")})$`, "i");
export default {
  name: "mutiUpload",
  props: {
    data: {
      type: Object,
      default: function() {
        return { type_id: 3 };
      }
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    limit: {
      type: [Number, String],
      default: 5
    }
  },
  data() {
    var host = process.env.BASE_API;
    return {
      HOST: host,
      x_token: {
        "X-Token": ""
      },
      imageUrls: this.value
    };
  },
  computed: {
    tempUrl() {
      return this.value;
    },
    num() {
      return Number.parseInt(this.limit);
    }
  },
  watch: {
    tempUrl(val) {
      this.imageUrls = this.tempUrl;
    }
  },
  methods: {
    rmImage(index) {
      this.imageUrls.splice(index, 1);
      this.$refs.uploadItem.uploadFiles.splice(index, 1);
      this.emitInput(this.imageUrls);
    },
    emitInput(val) {
      this.$emit("input", val);
      this.$emit("update", val);
    },
    handleImageSuccess() {
      this.emitInput(this.imageUrls);
    },
    beforeUpload() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getToken()
          .then(response => {
            const key = response.data.qiniu_key;
            const token = response.data.qiniu_token;
            _self._data.dataObj.token = token;
            _self._data.dataObj.key = key;
            this.tempUrl = response.data.qiniu_url;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    handleAvatarSuccess(res, file) {
      var { result } = res;
      this.imageUrls.push(result.oks.file[0].file_url);
      this.emitInput(this.imageUrls);
    },
    beforeAvatarUpload(file) {
      if (img_exp.test(file.type)) {
        this.x_token["X-Token"] = localStorage.getItem("token");
        return true;
      }
      this.$message.error("请上传规定格式的照片");
      return false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.muti-upload-container {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  @include clearfix;
  .avatar-uploader {
    display: inline-block;
  }
  .avatar-container {
    display: inline-block;
    position: relative;
    margin: 0 20px 20px 0;
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
  .image-uploader {
    width: 60%;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
