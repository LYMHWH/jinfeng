<template>
    <div>
        <img src="../../static/images/bg_image_pt.png" class="bg_img">
        <div class="tailor-shop-layout-header">
           <div class="tailor-shop-layout-title">
               <router-link to="/">
                <img src="../../static/images/logo_white_pt.png" style="height:48px;" alt="">
               </router-link>
               <i class="line"></i>
               <span>云特服饰</span> 
            </div>
       </div>
        <div class="login-form" v-show="show1">
            <div class="title">云特服饰-校服管理后台-登录</div>
            <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="70px" class="demo-ruleForm">
                <el-form-item label="账号：" prop="mobilephone">
                    <el-input v-model="ruleForm1.mobilephone" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="ruleForm1.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                
                <el-form-item label="">
                     <el-button type="text" @click="forget" class="forget">忘记密码？</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button style="width:300px;" type="primary" @click="submitForm">登录</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                </el-form-item>
            </el-form>
            <div class="way">
                <div class="line"></div>
                <div class="w">其他登录</div>
                <div class="line"></div>
            </div>
            <div class="other">
               <el-button type="text" @click="toggle(1)">短信验证码登录</el-button> 
            </div>
        </div>
        <div class="login-form" v-show="show2">
            <div class="title">云特服饰-校服管理后台-忘记密码</div>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                <el-form-item label="图形码：" prop="img_code">
                    <div style="display:flex;">
                        <el-input v-model="ruleForm2.captcha_code" placeholder="请输入图形码"></el-input>
                        <img  :src="img_code" alt="" class="img-code" @click="getImgCode">
                    </div>
                   
                </el-form-item>
                <el-form-item label="手机号：" prop="mobilephone">
                    <el-input type="number" maxlength="11" v-model.number="ruleForm2.mobilephone"  placeholder="请输入手机号"></el-input>
                </el-form-item>
                
                <el-form-item label="验证码：" prop="sms_code">
                     <div style="display:flex;">
                        <el-input v-model="ruleForm2.sms_code" placeholder="请输入验证码"></el-input>
                        <el-button type="text" @click="getCode">{{codeDelay1 ? codeDelay1 + '秒后重发' : '获取验证码'}}</el-button>
                     </div>    
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-form" v-show="show4">
            <div class="title">云特服饰-校服管理后台-登录</div>
            <el-form :model="ruleForm4" status-icon :rules="rules4" ref="ruleForm4" label-width="80px" class="demo-ruleForm">
                <el-form-item label="图形码：" prop="img_code">
                    <div style="display:flex;">
                        <el-input v-model="ruleForm4.captcha_code" placeholder="请输入图形码"></el-input>
                        <img  :src="img_code" alt="" class="img-code" @click="getImgCode">
                    </div>
                   
                </el-form-item>
                <el-form-item label="手机号：" prop="mobilephone">
                    <el-input type="number" maxlength="11" v-model.number="ruleForm4.mobilephone"  placeholder="请输入手机号"></el-input>
                </el-form-item>
                
                <el-form-item label="验证码：" prop="sms_code">
                     <div style="display:flex;">
                        <el-input v-model="ruleForm4.sms_code" placeholder="请输入验证码"></el-input>
                        <el-button type="text" @click="getCode2">{{codeDelay2 ? codeDelay2 + '秒后重发' : '获取验证码'}}</el-button>
                     </div>    
                </el-form-item>
                <el-form-item>
                    <el-button style="width:300px;" type="primary" @click="submitForm4">登录</el-button>
                </el-form-item>
            </el-form>
             <div class="way">
                <div class="line"></div>
                <div class="w">其他登录</div>
                <div class="line"></div>
            </div>
            <div class="other">
               <el-button type="text" @click="toggle(2)">账号密码登录</el-button> 
            </div>
        </div>
        <div class="login-form" v-show="show3">
            <div class="title">云特服饰-校服管理后台-忘记密码</div>
            <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="85px" class="demo-ruleForm">
                <el-form-item label="密码：" prop="password" >
                    <el-input id="password" type="password" v-model="ruleForm3.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="密码强度：" >
                    <div class="pwd_strength" id="pwd-security">
                        <span class="first">低</span><span class="second">中</span><span class="third">高</span>
                    </div>
                </el-form-item>

                <el-form-item label="确认密码：" prop="re_password">
                    <el-input type="password" v-model="ruleForm3.re_password"  placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm3">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
          <div class="tailor-shop-layout-footer">河南云特智能服饰有限公司&nbsp;&nbsp;&nbsp;豫公网安备 37032102000118号&nbsp;&nbsp;&nbsp; <a href="http://www.miitbeian.gov.cn/" style="color: #fff; text-decoration: none;" target="_blank">ICP证：豫ICP备16005251号-3</a></div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm3.re_password !== "") {
          this.$refs.ruleForm3.validateField("re_password");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm3.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm1: {
        mobilephone: "",
        password: ""
      },
      rules1: {
        mobilephone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      ruleForm3: {
        re_password: "",
        password: ""
      },
      rules3: {
        password: [{ validator: validatePass, trigger: "blur" }],
        re_password: [{ validator: validatePass2, trigger: "blur" }]
      },
      ruleForm2: {
        mobilephone: "",
        sms_code: "",
        captcha_code: ""
      },
      rules2: {
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        sms_code: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        captcha_code: [
          { required: true, message: "请输入图形验证码", trigger: "blur" }
        ]
      },
      ruleForm4: {
        mobilephone: "",
        sms_code: "",
        captcha_code: ""
      },
      rules4: {
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        sms_code: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        captcha_code: [
          { required: true, message: "请输入图形验证码", trigger: "blur" }
        ]
      },
      img_code: null,
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      codeDelay1: 0,
      codeDelay2: 0
    };
  },
  created() {},
  mounted() {
    console.log($("#password"));
    $("#password").keyup(function(e) {
      var strongRegex = new RegExp(
        "^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
      );
      var mediumRegex = new RegExp(
        "^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
      );
      var enoughRegex = new RegExp("(?=.{6,}).*", "g");
      if ($(this).val() == "") {
        $("#pwd-security").attr("class", "pwd_strength");
      } else if (strongRegex.test($(this).val())) {
        $("#pwd-security").attr("class", "pwd_strength strong");
      } else if (mediumRegex.test($(this).val())) {
        $("#pwd-security").attr("class", "pwd_strength middle");
      } else if (enoughRegex.test($(this).val())) {
        $("#pwd-security").attr("class", "pwd_strength weak");
      } else {
        $("#pwd-security").attr("class", "pwd_strength weak");
      }
      return true;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.fetchUserInfo(next)
      
  },
  methods: {
       ...mapMutations({
      setUserInfo: "SET_USER"
    }),
     fetchUserInfo(next) {
      this.$q({
        url: "/bg_admin/account/index"
      }).then(res => {
        this.setUserInfo(res);
        next();
      });
    },
    getCode2() {
      if (this.codeDelay2) return;
      if (!/^1[0-9]{10}$/.test(this.ruleForm4.mobilephone)) {
        this.$message({
          message: "手机号码不正确！",
          duration: 2000
        });
        return;
      }
      if (!this.ruleForm4.captcha_code) {
        this.$message({
          message: "请输入图形验证码！",
          duration: 2000
        });
        return;
      }
      this.$q({
        method: "POST",
        url: "/bg_admin/index/sendLoginSMScode",
        data: this.ruleForm4
      }).then(
        data => {
          this.codeDelay2 = 60;
          const codeInt = setInterval(() => {
            this.codeDelay2--;
            if (this.codeDelay2 === 0) {
              clearInterval(codeInt);
            }
          }, 1000);
          this.$message({
            message: "验证码发送成功！",
            duration: 2000
          });
        },
        ({ errcode }) => {
        //   if (errcode === 20003) {
            this.getImgCode();
        //   }
        }
      );
    },
    getCode() {
      if (this.codeDelay1) return;
      if (!/^1[0-9]{10}$/.test(this.ruleForm2.mobilephone)) {
        this.$message({
          message: "手机号码不正确！",
          duration: 2000
        });
        return;
      }
      if (!this.ruleForm2.captcha_code) {
        this.$message({
          message: "请输入图形验证码！",
          duration: 2000
        });
        return;
      }
      this.$q({
        method: "POST",
        url: "/bg_admin/index/sendFindPwdSMScode",
        data: this.ruleForm2
      }).then(
        data => {
          this.codeDelay1 = 60;
          const codeInt = setInterval(() => {
            this.codeDelay1--;
            if (this.codeDelay1 === 0) {
              clearInterval(codeInt);
            }
          }, 1000);
          this.$message({
            message: "验证码发送成功！",
            duration: 2000
          });
        },
        ({ errcode }) => {
        //   if (errcode === 20003) {
            this.getImgCode();
        //   }
        }
      );
    },
    getImgCode() {
      this.$q({
        url: "/bg_admin/index/getcaptcha"
      }).then(data => {
        this.img_code = data.data;
      });
    },
    forget() {
      this.show1 = false;
      this.show2 = true;
      this.getImgCode();
    },
    submitForm() {
      this.$refs["ruleForm1"].validate(valid => {
        if (valid) {
          this.$q({
            method: "post",
            url: "/bg_admin/index/login",
            data: this.ruleForm1
          }).then(res => {
            this.$router.push({
              path: "/home"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2() {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.$q({
            method: "post",
            url: "/bg_admin/index/findPassword",
            data: this.ruleForm2
          }).then(res => {
            this.show2 = false;
            this.show3 = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm4() {
      this.$refs["ruleForm4"].validate(valid => {
        if (valid) {
          this.$q({
            method: "post",
            url: "/bg_admin/index/smslogin",
            data: this.ruleForm4
          }).then(res => {
            this.$router.push({
              path: "/home"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm3() {
      this.$refs["ruleForm3"].validate(valid => {
        if (valid) {
          this.$q({
            method: "post",
            url: "/bg_admin/index/findPassword2",
            data: this.ruleForm3
          }).then(res => {
            this.show3 = false;
            this.show1 = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toggle(p) {
      if (p == 1) {
        this.getImgCode();
        this.show1 = false;
        this.show4 = true;
      } else {
        this.show1 = true;
        this.show4 = false;
      }
    }
  }
};
</script>

<style lang="scss">
.login-form {
  transform: translate(0, 100px);
  margin: 0 auto;
  width: 462px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  .title {
    font-weight: 700;
    font-size: 18px;
    color: #2A2A2A;
    line-height: 52px;
    background: url('../../static/images/login_header_bg.png') no-repeat;
    padding-left: 40px;
  }
  .demo-ruleForm{
      padding: 30px;
  }
  .forget {
    float: right;
  }
  .img-code {
    width: 120px;
    height: 36px;
    margin-left: 10px;
    background-color: #409eff;
  }

  .pwd_strength span {
    display: inline-block;
    width: 100px;
    filter: alpha(opacity=30);
    background-color: black;
    background-color: rgba(0, 0, 0, 0.3);

    padding: 0 !important;
    margin: 1px;
    color: white;
    text-align: center;
  }

  .weak .first,
  .middle .first,
  .strong .first {
    background: #ffce49 none repeat scroll 0 0;
    color: #000;
  }
  .middle .second,
  .strong .second {
    background: #edb622 none repeat scroll 0 0;
    color: #000;
  }
  .strong .third {
    background: #e29a1b none repeat scroll 0 0;
    color: #000;
  }
  .way {
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      width: 100px;
      height: 1px;
      background-color: #333;
    }
    .w {
      margin: 0 30px;
    }
  }
  .other {
    text-align: center;
    margin-top: 30px;
  }
}
  .tailor-shop-layout-header {
    height: 80px !important;
    background-color: #014691;
    padding: 0 50px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
     .tailor-shop-layout-title {
        font-size: 24px;
        display: flex;
        align-items: center;
        .line {
        height: 24px;
        width: 2px;
        background-color: #fff;
        margin: 0 20px;
        }
    }
  }
    .tailor-shop-layout-footer {
    position: fixed;
    text-align: center;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #014691;
    z-index: 99999;
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
  .bg_img{
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    z-index: -1;
  }

</style>


