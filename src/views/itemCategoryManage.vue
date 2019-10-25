<template>
  <div class="tailor-item-category-manage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品类目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns">
      <el-form :model="queryParams" :inline="true" label-width="120px">
        <el-form-item>
          <el-button @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        :data="tableData.Rows"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- <el-table-column
                        type="index"
                        width="50">
        </el-table-column>-->
        <el-table-column prop="name" label="类目">
          <template slot-scope="scope">
            <div style="text-align:left;" v-if="scope.row.level_id ==1">{{scope.row.name}}</div>
            <div style="text-align:left;" v-else-if="scope.row.level_id ==2">
              <span style="margin-left:20px;">|--</span>
              {{scope.row.name}}
            </div>
            <div style="text-align:left;" v-else>
              <span style="margin-left:40px;">|--</span>
              {{scope.row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="attrs" label="属性" show-overflow-tooltip></el-table-column>
        <el-table-column prop="image" label="类目宣传图" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.image" alt style="width:50px;height:50px;">
          </template>
        </el-table-column>
        <el-table-column prop="rank" label="排序" show-overflow-tooltip>
          <!-- <template slot-scope="scope">                         
                            <span  v-text="scope.row.is_es_open =='1' ?'未锁定':'已锁定'" :style="{color:scope.row.is_es_open =='1'?'':'red'}"></span>
          </template>-->
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="add1(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.level_id !=3"
              class="green"
            >添加子类目</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="red">删除</el-button>
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
    </div>-->
    <el-dialog :title="title" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
        <el-form-item label="父类目：">
          <div>根类目</div>
        </el-form-item>
        <el-form-item label="类目名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="rank">
          <el-input type="number" v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="商品ID：" prop="goods_id">
          <el-input v-model="form.goods_id"></el-input>
        </el-form-item>
        <el-form-item label="类目宣传图：" prop="image">
          <div style="display:flex;line-height:1.5;margin-bottom:10px;position:relative">
            <span style="margin-right:5px;">
              <i class="el-icon-info red"></i>
            </span>
            <span>分辨率要求690px*320px，格式要求png、jpg或jpeg，且大小不超过1M；
              <el-button
                type="text"
                @mouseenter.native="img_show = true"
                @mouseleave.native="img_show = false"
              >查看示例</el-button>
              <img v-show="img_show" src="../../static/images/eg1.jpg"  alt="" srcset="" style="position:absolute;display:none;width:285px;">
            </span>
          </div>
          <up-image v-model="form.image"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="show1">
      <el-form :model="form1" :rules="formRules1" ref="form1" label-width="120px">
        <el-form-item label="父类目：">
          <div>{{curr_item.name}}</div>
        </el-form-item>
        <el-form-item label="类目名称：" prop="name">
          <el-input v-model="form1.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="rank">
          <el-input type="number" v-model="form1.rank"></el-input>
        </el-form-item>
        <el-form-item label="属性：" prop="attrs">
          <div style="display:flex;">
            <el-input v-model="attr"></el-input>
            <el-button @click="add_attr">添加</el-button>
          </div>
          <div>
            <el-tag
              style="margin-right:10px;"
              v-for="(tag,index) in form1.attrs"
              :key="index"
              closable
              @close="handleClose(index)"
            >{{tag.id?tag.attr_name:tag}}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="类目宣传图：" prop="image">
            <div style="display:flex;line-height:1.5;margin-bottom:10px;position:relative">
            <span style="margin-right:5px;">
              <i class="el-icon-info red"></i>
            </span>
            <span>分辨率要求160px*160px，格式要求png、jpg或jpeg，且大小不超过1M；
              <el-button
                type="text"
                @mouseenter.native="img_show = true"
                @mouseleave.native="img_show = false"
              >查看示例</el-button>
              <img v-show="img_show" src="../../static/images/eg2.jpg"  alt="" srcset="" style="position:absolute;display:none;width:285px;">
            </span>
          </div>
          <up-image v-model="form1.image"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show1 = false">取 消</el-button>
        <el-button type="primary" @click="submit1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="show2">
      <el-form :model="form2" :rules="formRules2" ref="form2" label-width="120px">
        <el-form-item label="父类目：">
          <div>{{curr_item.name}}</div>
        </el-form-item>
        <el-form-item label="类目名称：" prop="name">
          <el-input v-model="form2.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="rank">
          <el-input v-model="form2.rank" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
import { sub } from "@/utils/submit";

export default {
  name: "order",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    return {
    img_show:false,
      show: false,
      show1: false,
      show2: false,
      img_data: {
        type_id: 2
      },
      form: {
        name: "",
        rank: null,
        parent_id: 0,
        image: "",
        goods_id:""
      },
      formRules: {
        name: [{ required: true, message: "请输入类目名称", trigger: "blur" }],
        rank: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      form1: {
        name: "",
        rank: null,
        parent_id: 1,
        image: "",
        attrs: []
      },
      formRules1: {
        name: [{ required: true, message: "请输入类目名称", trigger: "blur" }],
        rank: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      form2: {
        name: "",
        rank: null,
        parent_id: 2,
        image: ""
      },
      formRules2: {
        name: [{ required: true, message: "请输入类目名称", trigger: "blur" }],
        rank: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      attr: "",
      imageUrl: "",
      x_token: {
        "X-Token": ""
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1
      },
      tableData: {
        Rows: []
      },
      curr_item: {},
      title: ""
    };
  },
  methods: {
    edit(row) {
      this.title = "编辑";
      this.$q({
        url: "/bg_admin/bg_management/getGoodsCategoryDetail",
        params: { id: row.id }
      }).then(res => {
        if (res.level_id == 1) {
          this.form = res;
          this.show = true;
        } else if (res.level_id == 2) {
          this.form1 = res;
          this.show1 = true;
        } else {
          this.form2 = res;
          this.show2 = true;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      var { result } = res;
      this.imageUrl = result.oks.file[0].file_url;
    },
    beforeAvatarUpload(file) {
      this.x_token["X-Token"] = localStorage.getItem("token");
      return true;
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/manageGoodsCategories"
      }).then(res => {
        var arr = [];
        var arr1 = res.sort((a,b)=>{
            if(a.rank > b.rank){
                return 1;
            }else if(a.rank <b.rank){
                return -1;
            }else{
                return 0;
            }
        })
        
        arr1.forEach(element => {
          arr.push(element);
          if (element.child && element.child.length) {
              element.child = element.child.sort((a,b)=>{
                    if(a.rank > b.rank){
                        return 1;
                    }else if(a.rank <b.rank){
                        return -1;
                    }else{
                        return 0;
                    }
                })
            element.child.forEach(v => {
              arr.push(v);
              if (v.child && v.child.length) {
                v.child = v.child.sort((a,b)=>{
                    if(a.rank > b.rank){
                        return 1;
                    }else if(a.rank <b.rank){
                        return -1;
                    }else{
                        return 0;
                    }
                })   
                v.child.forEach(item => {
                  arr.push(item);
                });
              }
            });
          }
        });
        this.tableData.Rows = arr;
        // this.tableData.Total = arr.length;
      });
    },

    add() {
      this.title = "添加";
      this.form = {};
      this.show = true;
    },
    add1(val) {
      this.title = "添加";
      this.curr_item = val;
      this.attr ='';
      if (val.parent_id == 0) {
        this.form1 = {
        name: "",
        rank: null,
        parent_id: 1,
        image: "",
        attrs: []
      };
        this.show1 = true;
        this.form1.parent_id = val.id;
      } else {
        this.form2 = {};
        this.form2.parent_id = val.id;
        this.show2 = true;
      }
    },
    del(row) {
      this.delete(
        '"您确认删除该类目？"',
        "/bg_admin/bg_management/deleteGoodsCategory",
        { id: row.id }
      );
    },
    submit() {
      var url = "/bg_admin/bg_management/addGoodsCategory";
      if (this.title == "编辑") {
        url = "/bg_admin/bg_management/editGoodsCategory";
      }
      var data = Object.assign({}, this.form);
      data.attrs = data.attrs;
      data.rank = Number(data.rank);
      sub("form", url, data, "show", this);
    },
    submit1() {
      var url = "/bg_admin/bg_management/addGoodsCategory";
      if (this.title == "编辑") {
        url = "/bg_admin/bg_management/editGoodsCategory";
      }
      var data = Object.assign({}, this.form1);
      data.attrs = data.attrs;
      data.rank = Number(data.rank);
      sub("form1", url, data, "show1", this);
    },
    submit2() {
      var url = "/bg_admin/bg_management/addGoodsCategory";
      if (this.title == "编辑") {
        url = "/bg_admin/bg_management/editGoodsCategory";
      }
      var data = Object.assign({}, this.form2);
      data.attrs = data.attrs;
      data.rank = Number(data.rank);
      sub("form2", url, data, "show2", this);
    },
    add_attr() {
      var val = this.attr.trim();
      if (!val) {
        this.$message.error("请填写属性");
        return;
      }
      this.form1.attrs.push(val);
      this.attr ='';
    },
    handleClose(index) {
      this.form1.attrs.splice(index, 1);
    }
  },

  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-item-category-manage {
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

