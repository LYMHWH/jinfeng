<template>
  <div class="upload-file-container">
       <el-upload
            ref="upload_file"
            :action="`${HOST}/bg_admin/bg_management/upload_files`"
            :show-file-list="true"
            multiple
            :limit="num"
            :headers="x_token"
            :data='params'
            :on-success="handleFileSuccess"
            :before-upload="beforeFileUpload"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip"><i class="el-icon-info red"></i>{{tip}}</div>
        </el-upload>
  </div>
</template>

<script>


export default {
  name: "upFile",
  props: {
    params: {
      type: Object,
      default: function() {
        return { type_id: 6 };
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
      default: 2
    },
    tip:{
        type:String,
        default:""
    },
    accept:{
        type:String,
        default:""
    }
  },
  data() {
    var host = process.env.BASE_API;
    return {
      HOST: host,
      x_token: {
        "X-Token": ""
      },
      fileList: this.value,
      exp:null
    };
  },
  created () {
    this.exp = RegExp(`(${this.accept.split(',').join("|")})$`, "i");
  },
  computed: {
    tempFileList() {
      return this.value;
    },
    num() {
      return Number.parseInt(this.limit);
    }
  },
  watch: {
    tempFileList:{
        deep:true,
        handler(val) {
            this.fileList = this.tempFileList;
        }
    }
  },
  methods: {
    handleExceed(files, fileList) {
        this.$message.error(`当前限制选择 ${this.num} 个文件`);
        // this.$message.error(`当前限制选择 ${this.num} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemove(file,fileList){
        this.emitInput(fileList);
    },
    emitInput(val) {
      this.$emit("input", val);
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
    handleFileSuccess(res, file) {
        var { result } = res;
        this.fileList.push(result.oks.file[0]);
        //替换之前文件
        var len = this.fileList.length;
        if( len === this.num){
            this.fileList.splice(this.fileList.length-2,1);
        }
        this.emitInput(this.fileList);
    },
    beforeFileUpload(file) {
        if (this.exp.test(file.name)) {
            this.x_token["X-Token"] = localStorage.getItem("token");
            return true;
        }
        this.$message.error("请上传规定格式文件");
        return false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.upload-file-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .el-icon-info{
      padding: 0 7px 0 4px;
  }
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
