<template>
    <div class="tailor-banner-setting">
        <el-breadcrumb separator="/" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>尺码字段管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-form :model="queryParams" :inline="true" label-width="120px">
                <el-form-item >
                    <el-button @click="add">添加</el-button>
                </el-form-item>
                 <div style="float:right;">
                    <el-form-item>
                        <el-input placeholder="请输入名称、别名等" v-model="queryParams.item_name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query_submit">搜索</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="table">
            <el-table ref="multipleTable" border :data="tableData.data" :cell-style="cellStyle" :header-cell-style="headerCellStyle" tooltip-effect="dark" style="width: 100%" >
                 <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="item_name"
                    label="字段ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="rank"
                    label="排序号"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="item_name"
                    label="字段名称"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="item_code"
                    label="字段编码"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="item_alias"
                    label="别名"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="字段性别区分"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                                {{scope.row.item_gender_type_id|gender}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="item_unit"
                    label="单位"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="item_unit"
                    label="示例"
                    show-overflow-tooltip>
                      <template slot-scope="scope"><el-button type="text" @click="checkBtn(scope.row)">查看</el-button></template>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
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
                          <el-button @click="rank(scope.row)" type="text" size="small" >更改排序</el-button>
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
        <el-dialog :title="title?'编辑尺码表字段':'添加尺码表字段'" :visible.sync="show" >
            <el-form :model="form" :rules="formRules" ref="form" label-width="140px">
                <el-form-item label="字段名称："  prop="item_name">
                    <el-input v-model="form.item_name" ></el-input>
                </el-form-item>
               <el-form-item label="字段编码："  prop="item_code">
                    <el-input v-model="form.item_code" ></el-input>
                </el-form-item>
                <el-form-item label="字段别名："  prop="item_alias">
                    <el-input v-model="form.item_alias" ></el-input>
                </el-form-item>
                <el-form-item label="字段性别区分：" prop="item_gender_type_id">
                    <el-select  placeholder="请选择" v-model="form.item_gender_type_id">
                        <el-option :label="item.name" :value="item.value" v-for="item in genderList" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位："  prop="item_unit">
                    <el-input v-model="form.item_unit" ></el-input>
                </el-form-item>
                <el-form-item label="示例：">
                  <up-image v-model="form.example_img" :params="{type_id:1}"/>
                  <el-input type="textarea" placeholder="请输入示例描述" v-model="form.example_desc" ></el-input>
                </el-form-item>
                <el-form-item label="备注："  prop="remark">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="更改排序" :visible.sync="show1" >
            <el-form :model="form1" :rules="formRules1" ref="form1" label-width="100px">
                <el-form-item label="字段名称："  prop="">
                    <span>{{form1.item_name}}</span>
                </el-form-item>
               
                <el-form-item label="排序号："  prop="rank">
                    <el-input v-model="form1.rank" ></el-input>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show1 = false">取 消</el-button>
                <el-button type="primary" @click="submit1">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查看" :visible.sync="show2" >
            <div style="text-align:center;">
              <img :src="form2.example_img" />
            </div>
            <div style="text-align:center;margin-top:20px;">{{form2.example_desc}}</div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "bannerSetting",
  mixins: [mixin],
  filters: {
    gender(val) {
      val = Number.parseInt(val);
      switch (val) {
        case 0:
          return "男女都有";
          break;
        case 1:
          return "男式专属";
          break;
        case 2:
          return "女式专属";
          break;
        default:
          return "未知";
          break;
      }
    }
  },
  components: {
    upImage: upImage
  },
  data() {
    return {
      tableData: {
        count: 0,
        data: []
      },
      show: false,
      show1: false,
      show2: false,
      title: 0,
      form: {
        item_name: "",
        item_code: "",
        item_alias: "",
        item_unit: "",
        item_gender_type_id: "",
        example_img: "",
        example_desc: "",
        remark: ""
      },
      formRules: {
        item_name: [
          { required: true, message: "请填写尺码字段名称", trigger: "blur" }
        ],
        item_code: [
          { required: true, message: "请填写字段编码", trigger: "blur" }
        ],
        item_unit: [
          { required: true, message: "请填写尺码字段单位", trigger: "blur" }
        ],
        item_gender_type_id: [
          { required: true, message: "请选择字段性别", trigger: "blur" }
        ]
      },
      genderList: [
        { name: "男女都有", value: 0 },
        { name: "男士专属", value: 1 },
        { name: "女士专属", value: 2 }
      ],
      form1: {
        id: "",
        rank: ""
      },
      formRules1: {
        rank: [{ required: true, message: "请输入排序号", trigger: "blur" }]
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
        item_name: "",
        item_alias: ""
      },
      item_name: "",
      item_id: "",
      form2: {
        example_img: "",
        example_desc: ""
      }
    };
  },
  methods: {
    checkBtn(row) {
      this.form2 = {
        example_img: row.example_img,
        example_desc: row.example_desc
      };
      this.show2 = true;
    },
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    rank(row) {
      this.form1 = { ...this.form1, ...row };
      this.show1 = true;
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
        url: "/bg_admin/size/manageItems",
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
      this.delete("您确认删除该尺码字段吗？", "/bg_admin/size/deleteItem", {
        id: row.id
      });
    },
    edit(row) {
      this.title = 1;
      this.form = { ...this.form, ...row };
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/size/addItem";
      if (this.title) {
        url = "/bg_admin/size/editItem";
      }
      this.post("form", url, this.form, "show");
    },
    submit1() {
      this.post("form1", "/bg_admin/size/sortItem", this.form1, "show1");
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
  .img {
    width: 50px;
    height: 50px;
  }
}
</style>

