<template>
    <div class="tailor-banner-setting">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>banner管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item >
                    <el-button @click="add">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                 <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="item_name"
                    label="banner图"
                    >
                         <template slot-scope="scope">                         
                            <img :src="scope.row.image_url" alt="" class="img">
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="goods_id"
                    label="商品ID"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="rank"
                    label="排序号"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="创建时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态"
                    show-overflow-tooltip>
                       <template slot-scope="scope">                         
                            <span :class="[scope.row.status ?'green':'red']"  v-text="scope.row.status ?'启用':'停用'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small" >编辑</el-button>
                            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
                            <el-button @click="setting(scope.row)" type="text" size="small" :class="[scope.row.status ?'red':'green']" >{{scope.row.status ?'停用':'启用'}}</el-button>
                        </template>
				</el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.Total">
            </el-pagination>
        </div> -->
        <el-dialog :title="title?'编辑banner':'添加banner'" :visible.sync="show" >
            <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
                <el-form-item label="banner图片："  prop="image_url">
                    <div>
                        <i class="el-icon-info red"></i> 分辨率要求610px*610px，格式要求png、jpg或jpeg，且大小不超过1M；
                    </div>
                    <up-image v-model="form.image_url" :params="{type_id:1}"/>
                </el-form-item>
                <el-form-item label="排序号："  prop="rank">
                    <el-input v-model.number="form.rank" type="number"></el-input>
                </el-form-item>
                <el-form-item label="商品ID："  prop="goods_id">
                    <el-input v-model.number="form.goods_id" type="number"></el-input>
                </el-form-item>
                <el-form-item label="备注："  prop="remark">
                    <el-input type="textarea" v-model="form.remark"></el-input>
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
export default {
  name: "bannerSetting",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      show1: true,
      title: 0,
      form: {
        image_url: "",
        rank: "",
        goods_id: "",
        remark:""
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
        id: ""
      },
      item_name: "",
      item_id: "",

    };
  },
  methods: {
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
        url: "/bg_admin/bg_management/manageBanners",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该banner吗？",
        "/bg_admin/bg_management/deleteBanner",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form = { ...this.form, ...row };
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/addBanner";
      if (this.title) {
        url = "/bg_admin/bg_management/editBanner";
      }
      this.post("form", url, this.form, "show");
    },
    submit1() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add_attr() {
      var val = this.attr.trim();
      if (!val) {
        this.$message.error("请填写属性");
      }
      this.attr_list.push(val);
    },
    handleClose(index) {
      this.attr_list.splice(index, 1);
    }
  },

  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-banner-setting {
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

