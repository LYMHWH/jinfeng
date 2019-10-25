<template>
  <div class="upload-img-container">
       <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="`${HOST}/bg_admin/bg_management/upload_files`"
            :show-file-list="false"
            :headers="x_token"
            :data='params'
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </div>
</template>

<script>


export default {
  name: "imageUpload",
  props: {
    params: {
      type: Object,
      default: function() {
        return { type_id: 2 };
      }
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    var host = process.env.BASE_API;
    return {
      HOST: host,
      x_token: {
        "X-Token": ""
      },
      imageUrl: this.value
    };
  },
  computed: {
    tempUrl() {
      return this.value;
    }
  },
  watch: {
    tempUrl(val) {
      this.imageUrl = this.tempUrl;
    }
  },
  methods: {
    rmImage() {
      this.emitInput("");
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    handleImageSuccess() {
      this.emitInput(this.imageUrl);
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
      this.imageUrl = result.oks.file[0].file_url;
      this.emitInput(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("token");
      return true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.upload-img-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 60%;
    float: left;
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
