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
        <el-form-item label="部位名称：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入部位名称"></el-input>
        </el-form-item>
        <el-form-item label="部位编码：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入部位编码"></el-input>
        </el-form-item>
        <el-form-item label="所属产品类型：" prop="styleName">
          <el-checkbox-group  v-model="checkList">
            <el-checkbox v-for="(v,i) in sizeList" :label="v.item_id" :key="i">{{v.item_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title1?'修改特征':'添加特征'" :visible.sync="show1" width="500px">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
        <el-form-item label="特征名称：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入特征名称"></el-input>
        </el-form-item>
        <el-form-item label="特征编码：" prop="styleName">
          <el-input style="width:300px;" v-model="form.styleName" placeholder="请输入特征编码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show1 = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
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
      data: [
        {
          "id":23,"name":"西服","cate_code":null,"branch":1,"level_id":1,"price":"","is_quota":1,"is_leaf":"0",
          "children":[
            {"id":2,"name":"两件套","cate_code":null,"branch":1,"level_id":2,"is_quota":1,"is_leaf":"0",
            "children":[
              {"id":5,"name":"粘合衬","branch":1,"level_id":3,"is_quota":1,"is_leaf":"1",},
              {"id":31,"name":"半麻衬","branch":1,"level_id":3,"is_quota":1,"is_leaf":"1",},
              {"id":32,"name":"全麻衬","branch":1,"level_id":3,"is_quota":1,"is_leaf":"1",},
              {"id":56,"name":"测试","branch":1,"level_id":3,"is_quota":1,"is_leaf":"1",}
            ]}
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      },
      sizeList: [],
      checkList: [],
    };
  },
  methods: {
    getSizeItems(){
      this.$q({
        url:'/bg_admin/size/getSizeItems'
      }).then(res=>{
        this.sizeList=res;
      })
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
    //添加特征
    append(node, data) {
      this.form1 = {};
      // this.form1.parent_id = data.id;
      // this.form1.level_id = data.level_id + 1;
      this.show1 = true;
      this.title1 = 0;
    },
    //点击修改
    modify(node, data) {
      if(data.is_leaf == '1'){//叶子节点
        // console.log(data)
        // data.branch === 3 ? (this.checkList = ["1", "2"]) : data.branch ? (this.checkList = [String(data.branch)]) : (this.checkList = []);
        // this.form1 = {};
        // this.form1 = {
        //   id: data.id,
        //   cate_name: data.name
        // };
        // this.item_ids = data.data_item_ids.map(Number);
        // this.special_ids = data.special_shape_ids.map(Number);
        // this.style_ids = data.wearing_style_ids.map(Number);
        // this.taohao_codes = (data.cate_code && data.cate_code.split(',')) || []
        this.title1 = 1;
        this.show1 = true;
      } else {//非叶子节点
        this.form = {};
        // this.form = {
        //   id: data.id,
        //   cate_name: data.name
        // };
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
    //添加部位
    addParts(node, data) {
      this.title = 0;
      this.show = true;
    },
  },

  created() {
    this.query();
    this.getSizeItems();
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

