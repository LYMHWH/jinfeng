<template>
    <div class="tailor-logistics-company-manage">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>字体库管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item >
                    <el-button @click="add">添加</el-button>
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
                    prop="font_name"
                    label="字体名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="express_code"
                    label="示例图"
                    show-overflow-tooltip>
                        <template slot-scope="scope">                         
                            <img :src="scope.row.image" alt="" class="img" :preview="scope.$index">
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态"
                    show-overflow-tooltip>
                        <template slot-scope="scope">                         
                            <span :class="[scope.row.status_id ?'green':'red']"  v-text="scope.row.status_id ?'启用':'停用'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="添加时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="update_time"
                    label="更新时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small" >编辑</el-button>
                            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
                            <el-button @click="setting(scope.row)" type="text" size="small" :class="[scope.row.status_id ?'red':'green']" >{{scope.row.status_id ?'停用':'启用'}}</el-button>
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
        <el-dialog :title="title?'编辑':'添加'" :visible.sync="show" >
            <el-form :model="form" :rules="formRules" ref="form" label-width="130px">
                <el-form-item label="字体名称："  prop="font_name">
                    <el-input v-model="form.font_name"></el-input>
                </el-form-item>
                <el-form-item label="选择字体文件："  prop="font_path">
                    <up-file v-model="form.font_path" tip="只能上传TTF文件" accept="ttf"/>
                </el-form-item>
                <!-- <el-form-item label="备注："  prop="remark">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upFile from "@/components/Upload/upFile";
export default {
  name: "fontlibManage",
  mixins: [mixin],
   components: {
    upFile: upFile
  },
  data() {
    return {
      show: false,
      show1: true,
      title: 0,
      form: {
        font_name: "",
        font_path: [],
      },
      init_form: {
        font_name: "",
        font_path: [],
      },
      formRules: {
        font_name: [
          { required: true, message: "请输入字体名称", trigger: "blur" }
        ],
        font_path: [
          {  type: "array", required: true, message: "请上传字体文件",    trigger: ["change", "blur"] }
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
        page: 1,
        id: ""
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
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/font/setFontStatus",
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
        url: "/bg_admin/font/manageFonts",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
        this.$previewRefresh();
      });
    },
    add() {
      this.form.font_name="";
      this.form.id=null;
      this.form.font_path=[];
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该字体吗？",
        "/bg_admin/font/deleteFont",
        { id: row.id }
      );
    },
    getFontDetail(id){
        this.$q({
            url:'/bg_admin/font/getFontDetail',
            params:{id}
        }).then(res=>{
            this.form.id = res.id;
            this.form.font_name = res.font_name;
            this.form.font_path = [{name:res.font_name,file_url:res.path}];
        })
    },
  
    edit(row) {
        this.title = 1;
        this.getFontDetail(row.id);   
        this.show = true;
    },
    process_data(){
        var data={};
        this.form.id&&(data.id=this.form.id);
        data.font_name = this.form.font_name;
        data.font_path = this.form.font_path[0]?this.form.font_path[0].file_url:"";
        return data;
    },
    submit() {
        var url = "/bg_admin/font/addFont";
        if (this.title) {
            url = "/bg_admin/font/editFont";
        }
        var data =  this.process_data();
        this.post("form", url, data, "show");
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
   
  },
  
};
</script>
<style lang="scss">
.tailor-logistics-company-manage {
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
      width: 80px;
      height: 40px;
  }
}
</style>

