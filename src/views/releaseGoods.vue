<template>
    <div>
        <div>
             <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
            <!-- <tinymce :height="300" v-model="content"/> -->
        </div>
        <el-button @click="geteditor"> get content</el-button>
    </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      editor: null
    };
  },
  methods: {
    geteditor() {
      alert(111);
      console.log(this.editor.getContent());
    }
  },
  mounted() {
    this.editor = UE.getEditor("editor");
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
<style lang="scss">
</style>

