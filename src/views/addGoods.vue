<template>
    <div class="tailor-add-goods">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="form" ref="form"  :inline="true" label-width="130px" :rules="form_rule">
                <div class="info-container">
                    <div style="float:right;margin-right:200px;">
                      <el-form-item label="包含产品类型：" prop="product_cate_ids">
                        <el-checkbox-group  v-model="form.product_cate_ids">
                          <el-checkbox v-for="(v,i) in productTypeList" :label="v.id" :key="i">{{v.name}}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                    <div style="width:1200px;">
                        <div>
                            <el-form-item label="商品类目："  prop="first_cate_id">
                                <el-select v-model="form.first_cate_id" placeholder="请选择" @change="getCates1">
                                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in list4" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label=""  prop="cate_id">
                                    <el-select v-model="form.cate_id" placeholder="请选择" @change="getCateAttrs">
                                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in list5" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>    
                        <div>
                            <el-form-item label="商品标题：" prop="main_title">
                                <el-input v-model="form.main_title" placeholder="请输入商品标题" maxlength="50"></el-input>
                            </el-form-item>
                        </div>    
                        <div>
                            <el-form-item label="商品卖点："  prop="sub_title">
                                <el-input v-model="form.sub_title" placeholder="请输入商品卖点"  maxlength="50"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="款式号："  prop="style_num">
                                <el-input v-model="form.style_num" placeholder="请输入款式号"  maxlength="50"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="选择面料："  required>
                                <div style="margin-bottom:20px;">
                                    <el-button type="primary" @click="choose">选择</el-button>
                                </div>
                                    <div v-for="(item,index) in checkList2" :key="index" class="fir">
                                        <div class="label">{{index}}：</div>
                                        <img :src="v.fabric_photos?v.fabric_photos[0]:''" alt="" v-for="(v,i) in item" :key="i" class="item-img" />
                                    </div>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <el-form-item label="设置款式价格："  required>
                                <el-table ref="multipleTable" border :data="form.grades" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 800px" >
                                        <!-- <el-table-column
                                        prop="title"
                                        label="档次"
                                        >
                                        </el-table-column> -->
                                        <el-table-column
                                        prop="price"
                                        label="原价（非必填）"
                                        show-overflow-tooltip>
                                           <template slot-scope="scope">
                                                <el-input type="number" v-model.number="scope.row.price"></el-input>
                                                <span>元</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="sale_price"
                                        label="售价（必填）"
                                        show-overflow-tooltip>
                                           <template slot-scope="scope">
                                                <el-input type="number" v-model.number="scope.row.sale_price" :id="`grade${scope.$index}`"></el-input>
                                                <span>元</span>
                                            </template>
                                        </el-table-column>
                                </el-table>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="个性化定制：" prop="personal_ids">
                            <el-checkbox-group v-model="form.personal_ids">
                                <el-checkbox v-for="(item,index) in list" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="选择尺码模板："  prop="size_template_id">
                            <el-select v-model="form.size_template_id" placeholder="请选择尺码模板">
                                <el-option :label="item.template_name" :value="item.id" v-for="(item,index) in list8" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>    
                    <div>
                        <el-form-item label="商品图片："  prop="images">
                            <div>
                                <i class="el-icon-info red"></i> 第一张为主图，可左右拖动，分辨率要求750px*750px，格式要求gif、png、jpg或jpeg，且大小不超过1M；
                            </div>
							<muti-image  :data="{ type_id: 5 }" v-model="form.images" :limit="200" />
                        </el-form-item>
                    </div>     
                    <div>
                        <el-form-item label="商品详情："  prop="desc">
                            <div>
                                <i class="el-icon-info red"></i> 为了保证显示效果，商品描述图片宽度要求为750px，格式要求gif、png、jpg或jpeg，且大小不超过1M；
                            </div>
							<upload  :params="{ type_id: 5 }" v-model="form.desc" :limit="200"/>
                        </el-form-item>
                    </div>     
                    <div>
                        <el-form-item label="运费设置："  prop="tt" required>
                            <el-radio-group v-model="form.tt" @change="tt_change">
                                <el-radio :label="1">包邮</el-radio>
                                <el-radio :label="2">不包邮</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="tid" v-show="form.tt ===2" :rules="form.tt ===2?form_rule.t_id:[{
      required: false, message: '请选择运费模板', trigger: 'change'
    }]">
                            <el-select v-model="form.tid" placeholder="请选择运费模板">
                                <el-option :label="item.mname" :value="item.id" v-for="(item,index) in list7" :key="index"></el-option>
                            </el-select>
                            <el-button @click="add1">添加运费模板</el-button>
                        </el-form-item>
                    </div>
                    <div v-for="(item,index) in list6" :key="index">
                        <el-form-item :label="item.attr_name+'：'" :prop="`attr_${item.id}`"  :rules="[{required: true,message: '请输入属性值', trigger: 'blur'}]">
                            <el-input v-model="form[`attr_${item.id}`]" placeholder="请输入属性值"></el-input>
                        </el-form-item>
                    </div>    
                  

                </div>
                <div class="sub-btns">
                    <el-form-item label=" " prop="">
                        <el-button  @click="staging">暂存</el-button> 
                        <el-button type="primary" @click="submit">提交</el-button> 
                    </el-form-item>
                </div> 
            </el-form>
        </div>
        <el-dialog
            title="面料选择"
            :visible.sync="show"
            :before-close="handleClose">
                <el-form :model="form1" :inline="true" label-width="100px">
                    <el-form-item :label="item.item_name+'：'" :prop="item.filed" v-for="(item,index) in list1" :key="index" v-if="item.type_id === 1">
                        <el-select v-model="form1[item.filed]" placeholder="请选择" @change="getFabrics">
                            <el-option label="全部" :value="0"></el-option>
                            <el-option :label="v.item_value" :value="v.id" v-for="(v,i) in item.item_values"  :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <div style="border-bottom:1px solid #ddd;padding-bottom:20px;">
                         <el-radio-group v-model="radio2">
                            <el-radio :label="1">全选</el-radio>
                            <el-radio :label="0">反选</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="opt-list">
                        <el-checkbox-group v-model="checkList1">
                            <el-checkbox :label="item.id" class="checkbox" v-for="(item,index) in list2" :key="index">
                                <div class="item">
                                    <img :src="item.fabric_photos?item.fabric_photos[0]:''"  />
                                    <div>
                                        <div>面料号：<span>{{item.fabric_num}}</span></div>      
                                        <div>颜色：<span>{{item.color}}</span></div>      
                                        <div>成分：<span>{{item.components}}</span></div>      
                                        <div>纱支：<span>{{item.yarn_count}}</span></div>      
                                    </div>
                                </div>
                            </el-checkbox>
                        </el-checkbox-group>
                       
                    </div>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import mutiImage from "@/components/Upload/mutiImage";
import upload from "@/components/Upload/upload";
export default {
  name: "addGoods",
  mixins: [mixin],
  components: {
    mutiImage,
    upload
  },
  data() {
    return {
      checkList1: [],
      checkList: [],
      checkList2: [],
      queryParams: {},
      show: false,
      tableData: {
        list: []
      },
      form: {
        first_cate_id: "",
        cate_id: "",
        main_title: "",
        sub_title: "",
        style_num: "",
        fabric_ids: [],
        grades: [{ price: "", sale_price: "" }],
        personal_ids: [],
        images: [],
        desc: [],
        attrs: [],
        old_price: "",
        price: "",
        tt: 1,
        tid: 0,
        size_template_id: "",
        product_cate_ids: [] //包含产品类型
        //   freight:'',
      },
      id: "",
      form_rule: {
        product_cate_ids: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        first_cate_id: [
          { required: true, message: "请选择商品类目", trigger: "change" }
        ],
        size_template_id: [
          { required: true, message: "请选择尺码模板", trigger: "change" }
        ],
        cate_id: [
          { required: true, message: "请选择二级商品类目", trigger: "change" }
        ],
        t_id: [
          { required: true, message: "请选择运费模板", trigger: "change" }
        ],
        main_title: [
          { required: true, message: "请输入商品标题", trigger: "blur" }
        ],
        sub_title: [
          { required: true, message: "请输入商品标题", trigger: "blur" }
        ],
        style_num: [
          { required: true, message: "请输入款式号", trigger: "blur" }
        ],
        fabric_ids: [
          {
            type: "array",
            required: true,
            message: "请选择面料",
            trigger: "change"
          }
        ],
        grades: [
          {
            type: "array",
            required: true,
            message: "请设置款式价格",
            trigger: "change"
          }
        ],
        personal_ids: [
          {
            type: "array",
            required: true,
            message: "请选择个性化定制",
            trigger: "change"
          }
        ],
        images: [
          {
            type: "array",
            required: true,
            message: "请上传商品图片",
            trigger: ["change", "blur"]
          }
        ],
        desc: [
          {
            type: "array",
            required: true,
            message: "请上传商品详情",
            trigger: ["change", "blur"]
          }
        ]
      },
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      list8: [],
      order_status_list: [],
      form1: {
        cate: 0,
        series: 0,
        grade: 0,
        attr: 0,
        color: 0,
        pattern: 0
      },
      radio2: "",
      productTypeList: []
    };
  },
  watch: {
    radio2(val) {
      if (val === 1) {
        this.checkList1 = this.list2.map(v => {
          return v.id;
        });
      } else {
        if (this.checkList1.length === 0) {
          this.checkList1 = this.list2.map(v => {
            return v.id;
          });
        } else if (this.checkList1.length === this.list2.length) {
          this.checkList1 = [];
        } else {
          var arr1 = Array.prototype.slice.call(this.list2);
          this.checkList1.forEach(el => {
            for (let index = 0; index < arr1.length; index++) {
              const element = arr1[index];
              element.id === el && arr1.splice(index, 1);
              break;
            }
          });
          this.checkList1 = arr1.map(v => {
            return v.id;
          });
        }
      }
    }
  },
  methods: {
    getProductCates() {
      this.$q({
        url: "/bg_admin/product_category/getProductCates"
      }).then(res => {
        this.productTypeList = res;
      });
    },
    getSizeTemplates() {
      this.$q({
        url: "/bg_admin/goods/getSizeTemplates"
      }).then(res => {
        this.list8 = res;
      });
    },
    tt_change(val) {
      if (val === 1) {
        this.form.tid = 0;
      } else {
        this.form.tid = "";
      }
    },
    getTemplates() {
      this.$q({
        url: "/bg_admin/goods/getTemplates"
      }).then(res => {
        this.list7 = res;
      });
    },

    process_fabrics_data(res) {
      var obj = {};
      var arr = res.fabrics.map(v => {
        v.fabric_photos = JSON.parse(v.fabric_photos);
        return v;
      });
      this.checkList1 = arr.map(v => {
        return v.fabric_id;
      });
      this.form.fabric_ids = this.checkList1;
      arr.forEach(v => {
        if (obj[v.grade_value]) {
          obj[v.grade_value].push(v);
        } else {
          obj[v.grade_value] = [];
          obj[v.grade_value].push(v);
        }
      });
      this.checkList2 = obj;
      //   for (const key in obj) {
      //     if (obj.hasOwnProperty(key)) {
      //       const element = obj[key];
      //       this.form.grades.push({
      //         title: key,
      //         grade_id: element[0].grade_id,
      //         sale_price: element[0].sale_price,
      //         price: element[0].price
      //       });
      //     }
      //   }
    },
    submit1() {
      var obj = {};
      this.form.fabric_ids = this.checkList1;
      var arr = [];
      this.checkList1.forEach(v => {
        this.list2.forEach(el => {
          if (v == el.id) {
            arr.push(el);
          }
        });
      });

      arr.forEach(v => {
        if (obj[v.grade_value]) {
          obj[v.grade_value].push(v);
        } else {
          obj[v.grade_value] = [];
          obj[v.grade_value].push(v);
        }
      });
      this.checkList2 = obj;
      // this.form.grades=[];
      //   for (const key in obj) {
      //     if (obj.hasOwnProperty(key)) {
      //       const element = obj[key];
      //         this.form.grades.push({
      //           title: key,
      //           grade_id: element[0].grade_id,
      //           sale_price: "",
      //           price: ""
      //         });
      //     }
      //   }
      this.show = false;
    },
    handleClose() {
      this.show = false;
    },
    order_status_query() {},
    getFabrics() {
      this.$q({
        url: "/bg_admin/goods/getFabrics",
        params: this.form1
      }).then(res => {
        this.list2 = res.map(v => {
          v.fabric_photos = JSON.parse(v.fabric_photos);
          return v;
        });
      });
    },
    getFabricItem() {
      this.$q({
        url: "/bg_admin/fabric/getFabricItem"
      }).then(res => {
        this.list1 = this.transform_filed(res);
      });
    },
    choose() {
      this.show = true;
    },
    transform_filed(arr) {
      return arr.map(v => {
        switch (v.item_name) {
          case "分类":
            v.filed = "cate";
            break;

          case "系列":
            v.filed = "series";
            break;

          case "面料档次":
            v.filed = "grade";
            break;

          case "属性":
            v.filed = "attr";
            break;

          case "颜色":
            v.filed = "color";
            break;

          case "花型":
            v.filed = "pattern";
            break;

          //   case '成分':
          //       v.filed = 'cate'
          //       break;

          //   case '标签':
          //       v.filed = 'cate'
          //       break;

          default:
            break;
        }
        return v;
      });
    },
    cancel() {
      this.$router.push({ path: "/goodsList" });
    },
    process_data() {
      var data = Object.assign({}, this.form);
      var keys = Object.keys(data);
      keys.forEach(v => {
        if (v.startsWith("attr_")) {
          var id = v.substr(5);
          this.list6.forEach((val, i) => {
            if (val.id == id) {
              this.list6[i]["value"] = data[v];
            }
          });
        }
      });

      data.fabric_ids = data.fabric_ids;
      data.old_price = data.grades[0].price;
      data.price = data.grades[0].sale_price;
      // data.grades = JSON.stringify(data.grades);
      data.personal_ids = data.personal_ids;
      data.images = data.images;
      data.desc = data.desc;
      data.attrs = this.list6;
      data.product_cate_ids = data.product_cate_ids;
      return data;
    },
    validateField(item) {
      return new Promise((r, j) => {
        this.$refs["form"].validateField(item, err => {
          if (err) {
            j(err);
          } else {
            r();
          }
        });
      });
    },
    add1() {
      Promise.all([
        this.validateField("first_cate_id"),
        this.validateField("cate_id"),
        this.validateField("main_title")
      ])
        .then((r, j) => {
          this.$confirm("是否暂存商品信息？", "提示", {
            type: "warning"
          }).then(() => {
            var data = this.process_data();
            this.$q({
              url: "/bg_admin/goods/tmpSaveGoods",
              data,
              method: "post"
            }).then(res => {
              this.$message.success("操作成功");
              setTimeout(() => {
                this.$router.push({ path: "/addFreight" });
              }, 2000);
            });
          });
        })
        .catch(err => {
          this.$message.error("请先选择商品类目和商品标题");
        });
    },
    staging() {
      Promise.all([
        this.validateField("first_cate_id"),
        this.validateField("cate_id"),
        this.validateField("main_title")
      ])
        .then((r, j) => {
          this.$confirm("是否暂存商品信息？", "提示", {
            type: "warning"
          }).then(() => {
            var data = this.process_data();
            this.$q({
              url: "/bg_admin/goods/tmpSaveGoods",
              data,
              method: "post"
            }).then(res => {
              this.$message.success("操作成功");
              setTimeout(() => {
                this.$router.push({ path: "/goodsList" });
              }, 2000);
            });
          });
        })
        .catch(err => {
          this.$message.error("请先选择商品类目和商品标题");
        });
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (!this.form.fabric_ids.length) {
            this.$message.error("请选择面料");
            return;
          }
          for (let index = 0; index < this.form.grades.length; index++) {
            const element = this.form.grades[index];
            if (!element.sale_price) {
              this.$message.error("请填写售价");
              document.querySelector(`#grade${index}`).focus();
              return;
            } else {
              if (element.price && element.price * 1 < element.sale_price * 1) {
                this.$message.error("售价必须小于原价");
                document.querySelector(`#grade${index}`).focus();
                return;
              }
            }
          }

          var data = this.process_data();

          this.$q({
            url: "/bg_admin/goods/addGoods",
            data,
            method: "post"
          }).then(res => {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push({ path: "/goodsList" });
            }, 2000);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getPersonalization() {
      this.$q({
        url: "/bg_admin/goods/getPersonalization"
      }).then(res => {
        this.list = res;
      });
    },
    getCates1(val) {
      this.$q({
        url: "/bg_admin/goods/getCates",
        params: { parent_id: val }
      }).then(res => {
        this.list5 = res;
      });
    },
    getCates(parent_id) {
      this.$q({
        url: "/bg_admin/goods/getCates",
        params: { parent_id: parent_id }
      }).then(res => {
        this.list4 = res;
      });
    },
    getCateAttrs(cate_id) {
      this.$q({
        url: "/bg_admin/goods/getCateAttrs",
        params: { cate_id: cate_id }
      }).then(res => {
        this.list6 = res;
        this.list6.forEach((v, i) => {
          this.$set(this.form, `attr_${v.id}`, "");
        });
      });
    },

    query() {
      this.$q({
        url: "/bg_admin/goods/getGoodsDetail",
        params: { id: this.id }
      }).then(res => {
        this.form.first_cate_id = res.cate_id1;
        this.getCates1(this.form.first_cate_id);
        this.form.cate_id = res.cate_id2;
        this.getCateAttrs(this.form.cate_id);
        this.form.main_title = res.main_title;
        this.form.sub_title = res.sub_title;
        this.form.style_num = res.style_num;

        this.process_fabrics_data(res);

        this.form.personal_ids = res.personals.map(v => {
          return v.id;
        });
        this.form.images = res.images.map(v => {
          return v.image_url;
        });
        this.form.desc = JSON.parse(res.description);
        res.attrs.forEach(v => {
          this.form[`attr_${v.id}`] = v.attr_value;
        });
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getFabrics();
    this.getFabricItem();
    this.getPersonalization();
    this.getCates(0);
    this.getTemplates();
    this.getSizeTemplates();
    this.getProductCates();
    // this.query();
  }
};
</script>
<style lang="scss">
.tailor-add-goods {
  .red {
    color: red;
  }
  .el-input {
    width: 200px;
  }
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .el-dialog {
    width: 850px;
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
  .opt-list {
    padding: 20px 0;
    overflow: hidden;
    height: 376px;
    box-sizing: border-box;
    overflow-y: auto;
    .checkbox {
      background-color: #f5f5ff;
      display: inline-block;
      width: 370px;
      padding: 20px 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      float: left;
      margin-left: 0 !important;
      margin: 0 20px 20px 0;
    }
    .item {
      display: flex;
      align-items: center;
      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 225px;
      }
    }
    img {
      width: 100px;
      height: 100px;
      margin-right: 15px;
    }
  }
  .item-img {
    width: 100px;
    height: 100px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .fir {
    display: flex;
    .label {
      //   min-width: 100px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>

