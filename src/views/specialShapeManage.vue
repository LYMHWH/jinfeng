<template>
  <div class="tailor-specialShapeManage">
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
            v-if="data.level_id == '2'"
            type="text"
            size="mini"
            style="color:green;"
            @click="() => append(node,data)">添加特征
          </el-button>
          <el-button
            v-if="data.level_id == '2' || data.level_id == '3'"
            type="text"
            size="mini"
            style="color:#333;"
            @click="() => modify(node, data)">修改
          </el-button>
          <el-button
            v-if="data.level_id == '2' || data.level_id == '3'"
            type="text"
            size="mini"
            style="color:red;"
            @click="() => remove(node, data)">删除
          </el-button>
          <el-button
            v-if="data.level_id == '1'"
            type="text"
            size="mini"
            @click="() => addParts(node, data)">添加部位
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="title?'修改部位':'添加部位'" :visible.sync="show" width="520px">
      <el-form :model="form" :rules="formRules" ref="form" label-width="140px">
        <el-form-item label="部位名称：" prop="shape_name">
          <el-input style="width:300px;" v-model="form.shape_name" placeholder="请输入部位名称"></el-input>
        </el-form-item>
        <el-form-item label="部位编码：" prop="shape_code">
          <el-input style="width:300px;" v-model="form.shape_code" placeholder="请输入部位编码"></el-input>
        </el-form-item>
        <el-form-item label="所属产品类型：" prop="cate_ids">
          <el-checkbox-group  v-model="form.cate_ids">
            <el-checkbox v-for="(v,i) in productTypeList" :label="v.id" :key="i">{{v.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title1?'修改特征':'添加特征'" :visible.sync="show1" width="500px">
      <el-form :model="form1" :rules="formRules1" ref="form1" label-width="100px">
        <el-form-item label="特征名称：" prop="special_name">
          <el-input style="width:300px;" v-model="form1.special_name" placeholder="请输入特征名称"></el-input>
        </el-form-item>
        <el-form-item label="特征编码：" prop="special_code">
          <el-input style="width:300px;" v-model="form1.special_code" placeholder="请输入特征编码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show1 = false">取 消</el-button>
        <el-button type="primary" @click="submit1">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins/tableMixin";
import upImage from "@/components/Upload/upImage";
export default {
  name: "specialShapeManage",
  mixins: [mixin],
  components: {
    upImage: upImage
  },
  data() {
    return {
      show: false,
      show1: false,
      title: 0,
      title1: 0,
      formRules: {
        shape_name: [
          { required: true, message: "请输入部位名称", trigger: "blur" }
        ],
        shape_code: [
          { required: true, message: "请输入部位编码", trigger: "blur" }
        ],
        cate_ids: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ]
      },
      form: {
        shape_name: "",
        shape_code: "",
        cate_ids: []
      },
      form1: {
        special_name: "",
        special_code: "",
        shape_id: ""
      },
      formRules1: {
        special_name: [
          { required: true, message: "请输入特征名称", trigger: "blur" }
        ],
        special_code: [
          { required: true, message: "请输入特征编码", trigger: "blur" }
        ]
      },
      queryParams: {
        size: 10,
        page: 1,
        skey: ""
      },
      tableData: {
        count: 0,
        data: []
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      productTypeList: [],
      checkList: []
    };
  },
  methods: {
    getProductCates() {
      this.$q({
        url: "/bg_admin/product_category/getProductCates"
      }).then(res => {
        this.productTypeList = res;
      });
    },
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
        url: "/bg_admin/special_shape/manageShape"
      }).then(res => {
        this.data = [];
        this.data.push(res);
      });
    },
    add() {
      this.clean(this.form);
      this.title = 0;
      this.show = true;
    },
    del(row) {
      this.delete("确定要删除吗？", "/bg_admin/bg_management/del_city_user", {
        id: row.id
      });
    },
    edit(row) {
      this.title = 1;
      this.form.id = row.id;
      this.form.name = row.name;
      this.show = true;
    },
    submit() {
      var url = "/bg_admin/special_shape/addShape";
      if (this.title) {
        url = "/bg_admin/special_shape/editShape";
      }
      this.post("form", url, this.form, "show");
    },
    submit1() {
      var url = "/bg_admin/special_shape/addSpecial";
      if (this.title1) {
        url = "/bg_admin/special_shape/editSpecial";
      }
      this.post("form1", url, this.form1, "show1");
    },
    checkStudent(row) {
      this.$router.push({ path: "/studentManage", query: { id: row.id } });
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
    //添加特征
    append(node, data) {
      console.log(data);
      this.form1 = {
        special_name: "",
        special_code: "",
        shape_id: data.id
      };
      this.show1 = true;
      this.title1 = 0;
    },
    //点击修改
    modify(node, data) {
      if (data.is_leaf == "1") {
        //叶子节点
        this.form1 = {
          id: data.id,
          special_name: data.name,
          special_code: data.code,
          shape_id: node.parent.data.id
        };
        this.title1 = 1;
        this.show1 = true;
      } else {
        //非叶子节点
        this.form = {
          id: data.id,
          shape_name: data.name,
          shape_code: data.code,
          cate_ids: data.cate_ids.map(Number)
        };
        this.title = 1;
        this.show = true;
      }
    },
    remove(node, data) {
      //删除
      var url = "/bg_admin/special_shape/deleteShape";
      if (data.is_leaf == "1") {
        //叶子节点
        url = "/bg_admin/special_shape/deleteSpecial";
      }
      this.delete("确定要删除吗？此操作是不可恢复的！", url, {
        id: data.id
      });
    },
    //添加部位
    addParts(node, data) {
      this.title = 0;
      this.show = true;
      this.form = {
        shape_name: "",
        shape_code: "",
        cate_ids: []
      };
    }
  },

  created() {
    this.query();
    this.getProductCates();
  }
};
</script>
<style lang="scss">
.tailor-specialShapeManage {
  .custom-tree-node {
    // flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    height: 40px;
  }
  .el-tree-node__content {
    height: 40px;
  }
  .red {
    color: red;
  }

  .el-checkbox {
    margin-left: 0;
    margin-right: 30px;
  }
  .custom-tree-node {
    font-size: 14px;
    .btn {
      margin-left: 50px;
    }
  }
  .el-tree-node__content {
    height: 30px;
  }
}
</style>

