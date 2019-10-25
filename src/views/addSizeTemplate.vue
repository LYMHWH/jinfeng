<template>
    <div class="tailor-personality">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加尺码模板</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form :model="form" ref="form" :rules="form_rule" :label-width="'150px'" :inline="true">
                <div>
                    <!-- <div class="title">基本信息：</div> -->
                    <div>
                        <el-form-item label=" 尺码模板名称：" prop="template_name">
                            <el-input placeholder="请输入 尺码模板名称" v-model="form.template_name"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item  label="尺码字段：" prop="item_ids">
                            <el-checkbox-group  v-model="form.item_ids" @change="fetch_item_ids">
                                <el-checkbox  v-for="(v,i) in list" :label="v.item_id"    :key="i" >{{v.item_name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>  
                    <div>
                        <el-form-item label="尺码值：" prop="attrs">
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
                    <!-- <div class="title">选项设置： <span>
                                <i class="el-icon-info red"></i> 分辨率要求210px*210px，格式要求png、jpg或jpeg，且大小不超过1M；
                            </span></div> -->
                     <div v-for="(item,index) in form.attrs" :key="index"> 
                        <div class="title">{{item+'码字段值设置：'}}</div>
                       <el-table ref="multipleTable" border :data="form.table[index]" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                                <el-table-column
                                prop="item_id"
                                label="尺码模板名称"
                                show-overflow-tooltip>
                                     <template slot-scope="scope">
                                         <div  style="text-align:center;width:100%;">

                                            {{transfer_size_name(scope.row.item_id)}}
                                         </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="默认值"
                                 show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        <el-form-item :prop="'table'+'['+index+']'+'.'+scope.$index+ '.default_value'" :rules='form_rule.default_value'  style="text-align:center;width:100%;margin:0">
                                            <el-input :id="`default_value${index}_${scope.$index}`"  placeholder="请输入默认值" v-model.number="scope.row.default_value"></el-input><span class="table-size">cm</span>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                               
                                <el-table-column
                                label="最小值"
                                show-overflow-tooltip>
                                     <template slot-scope="scope">
                                        <el-form-item :prop="'table'+'['+index+']'+'.'+scope.$index+ '.min_value'" :rules='form_rule.min_value'  style="text-align:center;width:100%;margin:0">
                                            <el-input :id="`min_value${index}_${scope.$index}`"  placeholder="请输入最小值" v-model.number="scope.row.min_value"></el-input><span class="table-size">cm</span>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="最大值"
                                show-overflow-tooltip>
                                     <template slot-scope="scope">
                                        <el-form-item :prop="'table'+'['+index+']'+'.'+scope.$index+ '.max_value'" :rules='form_rule.max_value'  style="text-align:center;width:100%;margin:0">
                                            <el-input :id="`max_value${index}_${scope.$index}`"  placeholder="请输入最大值" v-model.number="scope.row.max_value"></el-input><span class="table-size">cm</span>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                             
                        </el-table>    
                                    
                                
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
  name: "addSizeTemplate",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    // var validate_max_value = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm3.re_password !== "") {
    //       this.$refs.ruleForm3.validateField("re_password");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm3.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      model:{
          rules:{
              default_value:[ { required: true, message: "请输入默认值", trigger: "blur" }]
          }
      },  
    tableData:[{
        name:111,
        age:1231
    }],
      image: "",
      form: {
        template_name: "",
        item_ids: [],
        attrs: [],
        size_infos: "",
        table:[],
      },
      form_rule: {
        template_name: [
          { required: true, message: "请输入模板名称名称", trigger: "blur" }
        ],
        item_ids: [
          { required: true, message: "请选择尺码字段", trigger: "change" }
        ],
        default_value:[ { required: true, message: "请输入默认值", trigger: "blur" }],
        max_value:[ { required: true, message: "请输入最大值", trigger: "blur" }],
        min_value:[ { required: true, message: "请输入最小值", trigger: "blur" }],
        attrs: [
          {
            type: "array",
            required: true,
            message: "请输入个性化定制名称",
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
      index: 0,
      list:[],
      last_item_ids:[],
    };
  },
  methods: {
      fetch_item_ids(v){
          this.fill_table1();
      },
      getSizeItems(){
          this.$q({
              url:'/bg_admin/size/getSizeItems'
          }).then(res=>{
              this.list=res;
          })
      },
    handleAvatarSuccess(res, file) {
      var { result } = res;
      this.form[`photos${this.index}`].push({
        url: result.oks.file[0].file_url,
        name: ""
      });
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("token");
      return true;
    },
    add(item) {
      this.index = item;
    },
    fill_table1(){
        
        var d_list = this.last_item_ids.filter(v=>
            !this.form.item_ids.includes(v)
        );
        var a_list = this.form.item_ids.filter(v=>
            !this.last_item_ids.includes(v)
            );

        var dl = d_list.length;

        this.form.attrs.forEach((v,i)=>{
            if(dl){
                var arr = this.form.table[i].filter(v=>
                    !d_list.includes(v.item_id)
                ); 
                this.$set( this.form.table ,i,arr);            
            }    
            a_list.forEach(val=>{
                this.form.table[i].push({
                    item_id:val,
                    default_value:'',
                    max_value:'',
                    min_value:'',
                }); 
            })
        })
        this.last_item_ids = this.form.item_ids;
    },
    fill_table(){
    this.form.attrs.forEach(v=>{
         var arr =[];
         this.form.item_ids.forEach(val=>{
            arr.push({
                item_id:val,
                default_value:'',
                max_value:'',
                min_value:'',
            })    
         })
         this.form.table.push(arr); 
     })   
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
        this.fill_table();
      this.attr = "";
    },
    handleClose(index) {
      this.form.attrs.splice(index, 1);
      this.form.table.splice(index, 1);
    },
    rmImage(item, i) {
      this.form[`photos${item}`].splice(i, 1);
    },
    transfer_size_name(val){
        val = Number.parseInt(val);
        var array =this.list;
       for (let index = 0; index < array.length; index++) {
           const element = array[index];
           if(element.item_id ===val){
               return element.item_name;
           }
       }
    },
    process_data(obj) {
      var data = {},
        size_infos = [];
      this.form.attrs.forEach((v,i) => {
        size_infos.push({
          size_name: v,
          items: obj.table[i]
        });
      });
      data.template_name = obj.template_name;
      data.item_ids = obj.item_ids;
      data.size_infos = size_infos;
      return data;
    },
    valid_size_infos(){
        var array = [];
        array = array.slice.call(this.form.table);
        
        for (let index = 0; index < array.length; index++) {
            const arr = array[index];

           for (let j = 0; j < arr.length; j++) {
               const el = arr[j];
               var d = el.default_value*1;
               var max= el.max_value*1;
               var min = el.min_value*1;
               if(d>=min&&d<=max){
               }else{
                   this.$message.error('最大值应大于最小值，默认值应在两者之间！');
                   document.querySelector(`#default_value${index}_${j}`).focus();
                   return false;
               } 
           }
        }
        return true;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            if(!this.valid_size_infos()){
                return;
            }
          var data = this.process_data(this.form);
          this.$q({
            url: "/bg_admin/size/addTemplate",
            data,
            method: "post"
          }).then(res => {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push({ path: "/sizeTemplateManage" });
            }, 2000);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     cancel1() {
      this.$router.push({ path: "/sizeTemplateManage" });
    },
  },
  created () {
      this.getSizeItems();
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
      width: 100px;
      margin: 0 20px 20px 0;
      img {
        width: 100px;
        height: 100px;
        display: block;
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
  .opt-setting{
      .el-input__inner{
          border-radius: 0;
      }
  }
  .table-size{
      margin-left: 5px;
  }
}
</style>


