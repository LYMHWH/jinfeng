<template>
    <div class="tailor-logistics-company-manage">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户组管理</el-breadcrumb-item>
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
                    prop="title"
                    label="用户组名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="group_id"
                    label="用户组ID"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="rules"
                    label="权限"
                    show-overflow-tooltip>
                      <template slot-scope="scope">                         
                          <span v-text="scope.row.rules && scope.row.rules != '[]'  ? scope.row.rules:''"></span>
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
					fixed="right"
					label="操作"
                    width="200"
					>
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small" >编辑</el-button>
                            <el-button @click="allot(scope.row)" type="text" size="small">分配权限</el-button>
                            <el-button @click="setting(scope.row)" type="text" size="small" :class="[scope.row.status_id ?'red':'green']" >{{scope.row.status_id ?'停用':'启用'}}</el-button>
                            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
                        </template>
				</el-table-column>
            </el-table>
        </div>
        <div class="pagination">
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
                <el-form-item label="用户组类型："  prop="">
                    <span>超级管理后台</span>
                </el-form-item>
                <el-form-item label="用户组名称："  prop="title">
                    <el-input v-model="form.title" placeholder="请输入用户组名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">确定添加</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="title1" :visible.sync="show1" >
            <el-form :model="form1" :rules="formRules1" ref="form1" label-width="130px">
                <el-tree
                    ref="tree"
                    :data="list"
                    :props="defaultProps"
                     node-key="id"
                     :default-checked-keys="checked_keys"
                    show-checkbox
                    @check-change="handleCheckChange">
                </el-tree>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show1 = false">取 消</el-button>
                <el-button type="primary" @click="submit1">确定分配</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "gruopManage",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
        defaultProps:{
            children:"child",
            label:"title"
        },
      show: false,
      show1: false,
      checked_keys:[],
      title: 0,
      title1: '为超级管理员分配权限',
      form: {
        title: "",
      },
      formRules: {
        title: [
          { required: true, message: "请输入用户组名称", trigger: "blur" }
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
      },
      item_name: "",
      item_id: "",
      tableData:{
          data:[],
          count:0
      },
      list:[],
      curr_item:null
    };
  },
  methods: {
       handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      getAuths(){
          this.$q({
              url:"/bg_admin/bg_management/manageAuths"
          }).then(res=>{
            this.list=res;
          })
      },
    allot(row){
        this.curr_item = row;
        if(row.rules){
            this.checked_keys = row.rules.split(',');
        }else{
            this.checked_keys = [];
        }
        
        this.show1 =true;
        this.$nextTick(()=>{
            this.$refs.tree.setCheckedKeys(this.checked_keys); 
        })
    },
    setting(row) {
      var data = { id: row.id, status_id: 1 };
      if (row.status_id === 1) {
        data.status_id = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/setGroupStatus",
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
        url: "/bg_admin/bg_management/manageGroups",
        params: this.queryParams
      }).then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.clean(this.form);
      this.form.item_id = this.item_id;
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete(
        "您确认删除该分组？",
        "/bg_admin/bg_management/deleteGroup",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form = { ...this.form, ...row };
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/addGroup";
      if (this.title) {
        url = "/bg_admin/bg_management/editGroup";
      }
      this.post("form", url, this.form, "show");
    },
    submit1() {
         var data ={};
         data.id = this.curr_item.id;
         data.auth_ids = this.$refs.tree.getCheckedNodes().map(v=>{
             return v.id;
         })
        data.auth_ids =JSON.stringify( data.auth_ids) ;
         this.$q({
             method:'post',
             url:'/bg_admin/bg_management/allotAuthsToGroup',
             data:data,
         }).then(res=>{
             this.query();
             this.$message.success('操作成功');
             this.show1 = false;
            this.$refs.tree.setCheckedKeys([]);
         })
    //   this.$refs["form1"].validate(valid => {
    //     if (valid) {
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
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
    this.getAuths();
  }
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
}
</style>

