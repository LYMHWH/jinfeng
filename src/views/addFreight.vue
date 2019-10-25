<template>
    <div class="tailor-add-freight">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/freightManage' }">运费模板管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增运费模板</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form :model="form" ref="form" :rules="form_rule" :label-width="'120px'" :inline="true">
                <div>
                    <div>
                        <el-form-item label="模板名称：" prop="mname">
                            <el-input placeholder="最多可输入10个字" v-model="form.mname" maxlength="11"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item required label="计价方式：" prop="type_id">
                            <el-radio-group v-model="form.type_id">
                                <el-radio :label="1">按件数计费</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                            <div style="display:flex;">
                                <el-form-item label="默认运费：" prop="" required>
                                    <span>起步</span>
                                </el-form-item>
                                <el-form-item label="" prop="default_first">
                                    <el-input placeholder="请输入件数" type="number" v-model.number="form.default_first"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                     <span >件内</span>
                                </el-form-item>
                                 <el-form-item label="" prop="default_first_cost">
                                    <el-input placeholder="请输入价格" type="number" v-model.number="form.default_first_cost"></el-input>
                                </el-form-item>
                                 <el-form-item label="">
                                    <span >元；每增加</span>
                                </el-form-item>
                                <el-form-item label="" prop="default_second">
                                    <el-input placeholder="请输入件数" type="number" v-model.number="form.default_second"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                     <span >件；运费增加</span>
                                </el-form-item>
                                 <el-form-item label="" prop="default_second_cost">
                                    <el-input placeholder="请输入价格" type="number" v-model.number="form.default_second_cost"></el-input>
                                </el-form-item>
                               <el-form-item label="">
                                    <span>元</span>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="指定区域运费：" prop="">
                            <div>
                                <el-radio-group v-model="radio2">
                                    <el-radio :label="1">不指定</el-radio>
                                    <el-radio :label="2">指定</el-radio>
                                </el-radio-group> 
                                <i class="el-icon-info red" style="margin-left:30px;"></i> 除指定地区外，其余地区的运费采用“默认运费”
                            </div>
                                <el-table v-if="radio2===2" ref="multipleTable" border :data="areas" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width:1200px;">
                                        <el-table-column
                                        prop="province"
                                        label="运送到"
                                        width="300px"
                                        >
                                            <template slot-scope="scope">
                                                <div style="display: flex;align-items: center;">
                                                    <span v-if="!scope.row.province.length" class="province">未选择地区</span> 
                                                    <el-tooltip v-else  effect="dark" :content="scope.row.province.join(',')" placement="top">
                                                        <span  class="province">{{scope.row.province.join(',')}}</span>
                                                    </el-tooltip>
                                                    <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                                                 </div>
                                            </template>   
                                        </el-table-column>
                                        <el-table-column
                                        prop="first"
                                        label="首件（件）"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="first_cost"
                                        label="首费（元）"
                                        show-overflow-tooltip>
                                           <template slot-scope="scope">
                                                <el-input type="number" v-model.number="scope.row.first_cost" :id="`first_cost${scope.$index}`"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="second"
                                        label="续件（件）"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="second_cost"
                                        label="续费（元）"
                                        show-overflow-tooltip>
                                           <template slot-scope="scope">
                                                <el-input type="number" v-model.number="scope.row.second_cost" :id="`second_cost${scope.$index}`"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        label="操作"
                                        show-overflow-tooltip>
                                           <template slot-scope="scope">
                                                <el-button
                                                v-if="scope.$index === areas.length-1"
                                                    @click="add(scope.row)"
                                                    type="text"
                                                    size="small"
                                                    class="green"
                                                    >新增</el-button>
                                                <el-button
                                                    @click="del(scope.$index)"
                                                    type="text"
                                                    size="small"
                                                    class="red"
                                                    >删除</el-button>

                                            </template>
                                        </el-table-column>
                                </el-table>

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
        <el-dialog title="选择省份" :visible.sync="show1" >
            <el-form  label-width="70px">
                <el-form-item label="省份：" >
                     <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox @change="s_change(city.area_code)" v-for="city in cities" :label="city.area_code" :key="city.area_code" :disabled="disabled(city.area_code)">{{city.area_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show1 = false">取 消</el-button>
                <el-button type="primary" @click="submit1">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
var f = 0;
export default {
  name: "addFreight",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
    show1:false,
     checkAll: false,
     isIndeterminate: true,
    checkedCities:[],
    cities:[],
    areas:[{
		"province":[], // 省份
		"first":1,               // 首多少件
		"first_cost":'',         // 首费
		"second":1,              // 续件
        "second_cost":'',         // 续费
        "province_code":[],
	    }],
      form: {
        mname: "",
        default_first: "",
        default_first_cost: "",
        default_second: "",
        default_second_cost: "",
        type_id:1,
      },
      form_rule: {
        mname: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
        ],
        default_first: [
          { required: true, message: "请输入件数", trigger: "blur" }
        ],
        default_first_cost: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
        default_second: [
          { required: true, message: "请输入件数", trigger: "blur" }
        ],
        default_second_cost: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
      },
      curr_i:0,
      radio2:2,
      flag:0,
       e_i:0,
       areas_c:[]
    };
  },
  methods: {
       s_change(code){
            var i = this.curr_i
            var arr = this.areas_c = this.areas_c.slice.call(this.areas);
            var ind = arr[i].province_code.findIndex(v=> v ==code);
            ind !==-1&&arr[i].province_code.splice(ind,1);
      },
      disabled(code){
            var array = f< this.cities.length? this.areas :this.areas_c;
            for (let index = 0; index < array.length; index++) {
                const element = array[index].province_code;
                for (let index = 0; index < element.length; index++) {
                    const el = element[index];
                    if(code === el && !this.checkedCities.includes(code)){
                        return true;
                    } 
                }
            }
            f++;
        },
      validate_row(object){
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const element = object[key];
                    if(Array.isArray(element)&&!element.length){
                        return false;
                    }
                    if(key =='second_cost'&& !(/\d+/.test(element))){
                        return false;
                        }
                    if(key !='second_cost' &&!element){
                        return false;
                    }
                }
            }
            return true;
      },
      add(row){
         if(this.validate_row(row)){
             this.areas.push({
                  "province":[], // 省份
                  "first":1,               // 首多少件
                  "first_cost":'',         // 首费
                  "second":1,              // 续件
                  "second_cost":'',         // 续费
                  "province_code":[],
                  })
         } else{
             this.$message.error('请完善当前行信息');
         }
      },
      edit(i){
        this.curr_i = i ;
        this.checkedCities = this.areas[i].province_code;
        this.show1 = true;
      },
      del(i){
           this.$confirm('确定要删除此指定区域运费模板', "提示", {
                type: "warning"
            }).then(() => {
               this.areas.splice(i,1);
               if(!this.areas.length){
                      this.areas.push({
                        "province":[], // 省份
                        "first":1,               // 首多少件
                        "first_cost":'',         // 首费
                        "second":1,              // 续件
                        "second_cost":'',         // 续费
                        "province_code":[],
                        })
               }
            });
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities.map((v)=>{
            return v.area_code;
        }) : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      process_areas_data(array){
          var arr =[];
          array.map(val=>{
                 val.province_code.map(v=>{
                    var obj ={"province_code":v, 
                                "first":val.first,              
                                "first_cost":val.first_cost,        
                                "second":val.second,             
                                "second_cost":val.second_cost,         
                            };
                    arr.push(obj);    
                })
          })
          return arr;
      },
     submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            if( this.radio2 ===2){
                for (let index = 0; index < this.areas.length; index++) {
                    const element = this.areas[index];
                     if(!this.validate_row(element)){
                         this.$message.error(`请完善指定区域运费第${index+1}行信息`);
                         return;
                     }
                } 
               var data = this.process_areas_data(this.areas);
               this.form.areas = data;
            }
          this.$q({
            url: "/bg_admin/bg_management/addTemplate",
            data:this.form,
            method: "post"
          }).then(res => {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push({ path: "/freightManage" });
            }, 2000);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel1() {
       this.$router.push({ path: "/freightManage" });
    },
       fetchProvince() {
          this.$q({
              url:'/bg_admin/index/getAreaList?=440300',
          }).then(res=>{
                this.cities = res;
          })
    },
    submit1(){
        this.areas[this.curr_i].province_code = this.checkedCities;
        this.areas[this.curr_i].province = this.checkedCities.map(v=>{
            for (var index = 0; index < this.cities.length; index++) {
                var element = this.cities[index];
                if(element.area_code == v){
                    return element.area_name;
                }
            }
        });
        this.show1 = false;
        this.checkedCities =[];
    }
  },

  created() {
      this.fetchProvince();
  }
};
</script>
<style lang="scss">
.tailor-add-freight {
    .province{
        display: inline-block;
        width: 240px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
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

