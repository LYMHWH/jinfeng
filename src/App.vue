<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  created() {
    this.fetchUserInfo();
    // let init_go_easy =  async(params) =>{
    //   let appkey = await this.$q({
    //     url: "/bg_admin/Goeasy/getAppkey"
    //   }).then(res => {
    //     return res;
    //   });
    //   var goEasy = new GoEasy({ appkey: appkey });
    //   // 订阅普通后台消息通知
    //   goEasy.subscribe({
    //     channel: "bg_notice_channel",
    //     onMessage: msg => {
    //       this.$notify.info({
    //         title: "消息",
    //         message: msg,
    //         duration: 0
    //       });
    //     }
    //   });
    // }
    // init_go_easy();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER"
    }),
    fetchUserInfo() {
      this.$q({
        url: "/bg_admin/account/index"
      }).then(res => {
        this.setUserInfo(res);
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.pagination {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
}
.red {
  color: red !important;
}
.green {
  color: green !important;
}
</style>

