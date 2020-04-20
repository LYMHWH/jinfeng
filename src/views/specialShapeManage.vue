<template>
  <div class="tailor-cityPartnerManage">
    <el-breadcrumb separator="/" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>特殊体型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tree
      class="filter-tree"
      :data="data"
      ode-key="id"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      ref="tree"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <span style="padding-left: 4px;">{{node.label}}</span>
        </span>
        <span class="btn">
          <el-button
            type="text"
            size="mini"
            style="color:green;"
            @click="() => append(node,data)">添加特征
          </el-button>
          <el-button
            type="text"
            size="mini"
            style="color:#ccc;"
            @click="() => compile(node, data)">修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            style="color:red;"
            @click="() => remove(node, data)">删除
          </el-button>
          <el-button
            v-if="data.is_leaf == '1'"
            type="text"
            size="mini"
            @click="() => configBtn(node, data)">添加部位
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="添加部位" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="部位名称：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入部位名称"></el-input>
        </el-form-item>
        <el-form-item label="部位编码：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入部位编码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title?'修改':'添加特征'" :visible.sync="show">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="部位名称：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入部位名称"></el-input>
        </el-form-item>
        <el-form-item label="部位编码：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入部位编码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "cityPartnerManage",
  mixins: [mixin],
   components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      title: 0,
      formRules: {
        styleName: [
          { required: true, message: "请输入着装风格", trigger: "blur" }
        ],
      },
      form: {
        styleName: "",
      },
      formLabelWidth: "70px",
      queryParams: {
        size: 10,
        page: 1,
        skey:"",
      },
      tableData:{
        count: 0,
        data:[]
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
    };
  },
  methods: {
    query_submit() {
      this.queryParams.page = 1;
      this.query();
    },
    setting(row) {
      var data = { id: row.id, is_locked: 1 };
      if (row.is_locked === 1) {
        data.is_locked = 0;
      }
      this.$q({
        method: "post",
        url: "/bg_admin/bg_management/set_city_user_status",
        data
      }).then(res => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    query() {
      this.$q({
        url: "/bg_admin/bg_management/city_user_list",
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
        "确定要删除吗？",
        "/bg_admin/bg_management/del_city_user",
        { id: row.id }
      );
    },
    edit(row) {
      this.title = 1;
      this.form.id = row.id;
      this.form.styleName = row.styleName;
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/bg_management/add_city_user";
      if (this.title) {
        url = "/bg_admin/bg_management/edit_city_user";
      }
      this.post("form", url, this.form, "show");
    },
    checkStudent(row) {
      this.$router.push({ path: "/studentManage",query:{id:row.id} });
    },
    handleDragStart(node, ev) {
      // console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log("tree drop: ", dropNode.label, dropType);
      // console.log(this.data);
    },
    allowDrop(draggingNode, dropNode, type) {
      //判断能否被放置
      if (dropNode.data.is_leaf == "1") {
        return type !== "inner";
      } else if (dropNode.data.is_leaf === "0") {
        return false;
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      //判断能否被拖动
      return draggingNode.data.is_leaf.indexOf("0") === -1;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    append(node, data) {
      this.form1 = {};
      this.form1.parent_id = data.id;
      this.form1.level_id = data.level_id + 1;
      this.show1 = true;
      this.title1 = 0;
    },
    compile(node, data) {
      //点击编辑
      if(data.is_leaf == '1'){//叶子节点
        // console.log(data)
        data.branch === 3 ? (this.checkList = ["1", "2"]) : data.branch ? (this.checkList = [String(data.branch)]) : (this.checkList = []);
        this.form1 = {};
        this.form1 = {
          id: data.id,
          cate_name: data.name
        };
        this.item_ids = data.data_item_ids.map(Number);
        this.special_ids = data.special_shape_ids.map(Number);
        this.style_ids = data.wearing_style_ids.map(Number);
        this.taohao_codes = (data.cate_code && data.cate_code.split(',')) || []
        this.title1 = 1;
        this.show1 = true;
      } else {//非叶子节点
        this.form = {};
        this.form = {
          id: data.id,
          cate_name: data.name
        };
        this.title = 1;
        this.show = true;
      }
    },
    remove(node, data) {
      //删除
      this.delete(
        "确定要删除该深度设计流程吗？此操作是不可恢复的！",
        "/customized_mall/fast.management/deleteCustomzied",
        {
          id: data.id
        }
      );
    },
    configBtn(node, data) {
      if (node.parent && node.parent.parent && node.parent.parent.data) {
        const cateId1 = node.parent.parent.data.id || node.parent.data.id
        sessionStorage.setItem("configPersonalizedProcessId", data.id);
        sessionStorage.setItem("configPersonalizedProcessId1", cateId1);
        this.$router.push({
          path: "/configPersonalizedProcess",
          query: { id: data.id, name: data.name, cate_id1: cateId1 }
        });
      }
    },
  },

  created() {
    this.query();
  }
};
</script>
<style lang="scss">
.tailor-cityPartnerManage {
  .btns {
    margin-bottom: 20px;
  }
  .title {
    height: 40px;
    line-height: 40px;
  }
  .el-dialog {
    width: 810px;
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

