<template>
    <div class="tailor-banner-setting">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>尺码模板管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item >
                    <el-button @click="add">添加</el-button>
                </el-form-item>
                <el-form-item >
                    <el-upload
                        ref="upload_file"
                        action="/bg_admin/size/uploadSizeTemplate"
                        :show-file-list="false"
                        :headers="x_token"
                        :on-success="handleFileSuccess"
                        :before-upload="beforeFileUpload"
                        :on-error="handleError"
                        name="size_template"
                    >
                        <el-button size="small" type="primary">导入</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item >
                    <el-button type="text" @click="download">下载导入模板</el-button>
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
                    prop="template_name"
                    label="尺码模板名称"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="sizes"
                    label="尺码值"
                    show-overflow-tooltip>
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
        <el-dialog title="导入" :visible.sync="show" width="1000px">
            <el-form :model="form" ref="form" :rules="form_rule" :label-width="'150px'" :inline="true" class="import">
                <el-table ref="multipleTable" border :data="form.table" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                    <el-table-column
                    prop="template_name"
                    label="尺码模板名称（款式号）"
                    show-overflow-tooltip>
                            <!-- <template slot-scope="scope">
                                <div  style="text-align:center;width:100%;">

                                {{transfer_size_name(scope.row.item_id)}}
                                </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                    prop="size_name"
                    label="尺码值（号型分类）"
                    show-overflow-tooltip>
                         
                    </el-table-column>
                    <el-table-column
                    prop="item_name"
                    label="尺码字段（部位）"
                    show-overflow-tooltip>
                         
                    </el-table-column>
                    <el-table-column
                    label="默认值"
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            <el-form-item :prop="'table.'+scope.$index+ '.default_value'" :rules='form_rule.default_value'  style="text-align:center;width:100%;margin:0">
                                <el-input :id="`default_value_${scope.$index}`"  placeholder="请输入默认值" v-model.number="scope.row.default_value" class="table-input"></el-input><span class="table-size">cm</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="最小值"
                    show-overflow-tooltip>
                            <template slot-scope="scope">
                            <el-form-item :prop="'table.'+scope.$index+ '.min_value'" :rules='form_rule.min_value'  style="text-align:center;width:100%;margin:0">
                                <el-input :id="`min_value_${scope.$index}`"  placeholder="请输入最小值" v-model.number="scope.row.min_value" class="table-input"></el-input><span class="table-size">cm</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="最大值"
                    show-overflow-tooltip>
                            <template slot-scope="scope">
                            <el-form-item :prop="'table.'+scope.$index+ '.max_value'" :rules='form_rule.max_value'  style="text-align:center;width:100%;margin:0">
                                <el-input :id="`max_value_${scope.$index}`"  placeholder="请输入最大值" v-model.number="scope.row.max_value" class="table-input"></el-input><span class="table-size">cm</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>    
            </el-form>   
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </div>
        </el-dialog>
         <a :href="download_url" download id="download"></a>
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
         download_url:'',
        tableData:{
            count:0,
            data:[]
        },
      show: false,
      show1: true,
      title: 0,
      form: {
        table:[],
      },
      form_rule: {
        default_value:[ { required: true, message: "请输入默认值", trigger: "blur" }],
        max_value:[ { required: true, message: "请输入最大值", trigger: "blur" }],
        min_value:[ { required: true, message: "请输入最小值", trigger: "blur" }],
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
      },
      item_name: "",
      item_id: "",

    };
  },
  methods: {
    download(){
        this.$q({
            url: "/bg_admin/size/downSizeTemplate",
            method:'POST',
        }).then(res => {
            // this.download_url = 'http://test2.dapangzi.com:60067/'+res;
            this.download_url = res;
            this.$nextTick(()=>{
                document.querySelector('#download').click();
            })
        },rej=>{
            console.log(rej);
        });
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
    handleFileSuccess(res, file) {
        var { result } = res;
        this.form.table =result.map(v=>{
            try {
                v.default_value = parseFloat(v.default_value)?parseFloat(v.default_value).toFixed(1):'0.0';
                v.min_value = parseFloat(v.min_value)?parseFloat(v.min_value).toFixed(1):'0.0';
                v.max_value = parseFloat(v.max_value)?parseFloat(v.max_value).toFixed(1):'0.0';
                return v;
            } catch (error) {
                console.log(error);
            }
        });
        this.show = true;
    },
    beforeFileUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("token");
      return true;
    },
    handleError(err, file, fileList){
        this.$message.error(err);
    },
    query() {
      this.$q({
        url: "/bg_admin/size/manageTemplates",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
        this.$router.push( {path:'/addSizeTemplate'});
    },
    del(row) {
      this.delete(
        "确定要删除吗？删除后，相关的商品需重新编辑上架！",
        "/bg_admin/size/deleteTemplate",
        { id: row.id }
      );
    },
    edit(row) {
      this.$router.push({path:'/editSizeTemplate',query:{id:row.id}});
    },
    valid_size_infos(){
        var arr = [];
        arr = arr.slice.call(this.form.table);
        
        for (let j = 0; j < arr.length; j++) {
            const el = arr[j];
            var d = el.default_value*1;
            var max= el.max_value*1;
            var min = el.min_value*1;
            if(d>=min&&d<=max){
            }else{
                this.$message.error('最大值应大于最小值，默认值应在两者之间！');
                document.querySelector(`#default_value_${j}`).focus();
                return false;
            } 
        }
        return true;
    },
    process_data(obj) {
        var data = {};
        // data.template_data = JSON.stringify(obj.table);
        data.template_data = obj.table;
        return data;
    },
    submit() {
        this.$refs["form"].validate(valid => {
            if (valid) {
                if(!this.valid_size_infos()){
                    return;
                }
            var data = this.process_data(this.form);
            this.$q({
                url: "/bg_admin/size/importSizeTemplate",
                data,
                method: "post"
            }).then(res => {
                this.$message.success("操作成功");
                this.query();
                this.show = false;
            });
            } else {
                console.log("error submit!!");
                return false;
            }
        });
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
  .table-size{
      margin-left: 5px;
  }
  .table-input{
      width: 100px;
  }
  .import {
    height: 376px;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
</style>

