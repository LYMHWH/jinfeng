<template>
    <div class="tailor-feedback">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item label="处理状态：" >
                    <el-select v-model="queryParams.status_id" @change="query1">
                        <el-option :label="item.label" :value="item.value" v-for="item in type_list" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.data" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                 <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="nickname"
                    label="昵称"
                    >
                    </el-table-column>
                    <!-- <el-table-column
                    prop="goods_id"
                    label="真实姓名"
                    show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column
                    prop="mobilephone"
                    label="手机号"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="avatar_photo"
                    label="头像"
                    show-overflow-tooltip>
                       <template slot-scope="scope">                         
                            <img :src="scope.row.avatar_photo" alt="" class="img">
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="message"
                    label="内容"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="图片"
                    show-overflow-tooltip>
                       <template slot-scope="scope">                         
                             <el-button @click="check_photos(scope.row)" type="text" size="small">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="反馈时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="处理结果"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="处理状态"
                    show-overflow-tooltip>
                            <template slot-scope="scope">                         
                            <span :class="[scope.row.status_id ?'green':'red']"  v-text="scope.row.status_id ?'已处理':'待处理'"></span>
                            </template>
                    </el-table-column>
                    <el-table-column
                    prop="admin_name"
                    label="处理人"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="handle_time"
                    label="处理时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <el-button @click="add(scope.row)" type="text" size="small" >添加处理结果</el-button>
                            <el-button @click="mark(scope.row)" type="text" size="small" v-if="scope.row.status_id !=1">标记为已处理</el-button>
                        </template>
				</el-table-column>
            </el-table>
        </div>
        <div class="pagination" v-if="tableData.count">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.count">
            </el-pagination>
        </div>
        <el-dialog title="添加处理结果" :visible.sync="show" >
            <el-form :model="form" :rules="formRules" ref="form" label-width="10px">
                <el-form-item label=""  prop="remark">
                    <el-input type="textarea" v-model="form.remark" placeholder="请添加处理结果"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
import "../../static/swipebox/lib/ios-orientationchange-fix.js";
import "../../static/swipebox/js/jquery.swipebox.js";
export default {
  name: "feedback",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      show1: true,
      title: 0,
      type_list:[
          {label:"全部",value:-1},
          {label:"待处理",value:0},
          {label:"已处理",value:1},
      ],
      form: {
        id: "",
        remark: "",
      },
      formRules: {
        image_url: [
          { required: true, message: "请上传图片", trigger: "change" }
        ],
        rank: [
          { required: true, message: "请填写排序号", trigger: "blur" }
        ],
      },
      form1: {
        truename: "",
        mobilephone: "",
        password: "",
        role_id: "203",
        remark: "",
        qq: "",
        email: ""
      },
      formRules1: {
        truename: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ]
      },
      attr: "",
      attr_list: [],
      imageUrl: "",
      x_token: {
        "X-Token": ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        index: 1,
        status_id: -1
      },
      item_name: "",
      item_id: "",
    tableData:{
        data:[],
        count:0   
    }
    };
  },
  methods: {
    check_photos(row) {
      var arr = row.pictures.split('###');
      arr.forEach((element, i) => {
        arr[i] = { href: element };
      });
      $.swipebox(arr);
    },
    setting(row) {
      var data = { id: row.id, status: 1 };
      if (row.status === 1) {
        data.status = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/setBannerStatus",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("X-Token");
      return true;
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/getFeedbacks",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    query1(){
        this.queryParams.page =1;
        this.query();
    },
    add(row) {
      this.clean(this.form);
      this.form.id = row.id; 
      this.show = true;
    },
    mark(row) {
      this.toggle(
        "确定已处理完成？",
        "/bg_admin/bg_management/completeFeadback",
        { id: row.id },
      );
    },
    // edit(row) {
    //   this.title = 1;
    //   this.form = { ...this.form, ...row };
    //   this.show = true;
    // },
    submit() {
      this.post("form", '/bg_admin/bg_management/addHandleResult', this.form, "show");
    },
    // submit1() {
    //   this.$refs["form1"].validate(valid => {
    //     if (valid) {
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // add_attr() {
    //   var val = this.attr.trim();
    //   if (!val) {
    //     this.$message.error("请填写属性");
    //   }
    //   this.attr_list.push(val);
    // },
    // handleClose(index) {
    //   this.attr_list.splice(index, 1);
    // }
  },

  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-feedback {
    @import url("../../static/swipebox/css/swipebox.min.css");
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
  .img{
      width: 50px;
      height: 50px;
  }
}
</style>

