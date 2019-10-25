<template>
        <div class="tailor-home">
            <el-breadcrumb separator="/" style="margin-bottom:20px;">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :model="form" ref="form" :rules="formRules">
                <div style="line-height:45px;">
                    <span class="title" v-text="userInfo.nickname+'，'"></span>您好。欢迎进入云特校服管理后台！请点击左侧菜单选择所需功能！
                </div>
                <!-- <div style="margin-top:20px;">
                    <div class="title" style="margin-bottom:20px;">财务信息</div>
                    <el-form-item label="账户余额：" :label-width="formLabelWidth">
                        <span  class="content">
                            <span v-text="userInfo.money" style="color:#014691;font-size:30px;"></span>
                            <span>元</span>
                            </span>
                         <el-button @click="rechargeVisible = true">充值</el-button>
                    </el-form-item>
                </div> -->
                <div style="margin-top:20px;">
                    <div class="title" style="margin-bottom:20px;">基本信息</div>
                    <div style="width:600px">
                        <!-- <el-form-item label="公司名称：" :label-width="formLabelWidth">
                            <span v-show="visible1">
                                <span class="content">深圳市紫雷科技有限公司</span>
                                <el-button @click="visible1 = false">修改</el-button>
                            </span>
                            <span v-show="!visible1">
                                <span class="content">
                                    <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
                                </span>
                                <el-button >保存</el-button>
                                <el-button @click="visible1 = true">取消</el-button>
                            </span>
                        </el-form-item> -->
                        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="nickname">
                            <span v-show="visiblenickname">
                                <span class="content" v-text="userInfo.nickname?userInfo.nickname:'暂未设置'"></span>
                                <el-button @click="visiblenickname = false">修改</el-button>
                            </span>
                            <span v-show="!visiblenickname">
                                <span class="content">
                                    <el-input v-model="form.nickname" placeholder="请输入姓名" maxlength="8"></el-input>
                                </span>
                                <el-button @click="modify('nickname')">保存</el-button>
                                <el-button @click="cancel('nickname')">取消</el-button>
                            </span>
                        </el-form-item>
                        <el-form-item label="手机号码：" :label-width="formLabelWidth"  prop="mobilephone">
                             <span>
                                <span class="content" v-text="userInfo.mobilephone"></span>
                                <el-button @click="visiblemobilephone = true">修改</el-button>
                            </span>
                             <!-- <span v-show="visiblemobilephone">
                                <span class="content" v-text="userInfo.mobilephone"></span>
                                <el-button @click="visiblemobilephone = false">修改</el-button>
                            </span> -->
                            <!-- <span v-show="!visiblemobilephone">
                                <span class="content">
                                    <el-input v-model="form.mobilephone" maxlength="11" placeholder="请输入手机号"></el-input>
                                </span>
                                <el-button @click="modify('mobilephone')">保存</el-button>
                                <el-button @click="cancel('mobilephone')">取消</el-button>
                            </span> -->
                        </el-form-item>
                        <el-form-item label="密码：" :label-width="formLabelWidth">
                             <span>
                                <span class="content">***********</span>
                                <el-button @click="changePwdVisible = true">修改</el-button>
                            </span>
                        </el-form-item>
                        <el-form-item label="角色：" :label-width="formLabelWidth">
                            <span class="content" v-text="userInfo.role_id == 101?'超级管理员':userInfo.role_id == 102?'管理员':'员工'"></span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class="title" style="margin-bottom:20px;">联系方式</div>
                    <div style="width:600px">
                        <el-form-item label="QQ：" :label-width="formLabelWidth" prop="qq">
                            <span v-show="visibleqq">
                                <span class="content" v-text="userInfo.qq?userInfo.qq:'暂未设置'"></span>
                                <el-button @click="visibleqq = false">修改</el-button>
                            </span>
                            <span v-show="!visibleqq">
                                <span class="content">
                                    <el-input v-model="form.qq" placeholder="请输入qq"></el-input>
                                </span>
                                <el-button @click="modify('qq')">保存</el-button>
                                <el-button @click="cancel('qq')">取消</el-button>
                            </span>
                        </el-form-item>
                        <!-- <el-form-item label="旺旺：" :label-width="formLabelWidth" prop="aliwangwang">
                             <span v-show="visiblealiwangwang">
                                <span class="content" v-text="userInfo.aliwangwang?userInfo.aliwangwang:'暂未设置'"></span>
                                <el-button @click="visiblealiwangwang = false">修改</el-button>
                            </span>
                            <span v-show="!visiblealiwangwang">
                                <span class="content">
                                    <el-input v-model="form.aliwangwang" placeholder="请输入阿里旺旺"></el-input>
                                </span>
                                <el-button @click="modify('aliwangwang')">保存</el-button>
                                <el-button @click="cancel('aliwangwang')">取消</el-button>
                            </span>
                        </el-form-item> -->

                        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
                             <span v-show="visibleemail">
                                <span class="content" v-text="userInfo.email?userInfo.email:'暂未设置'"></span>
                                <el-button @click="visibleemail = false">修改</el-button>
                            </span>
                            <span v-show="!visibleemail">
                                <span class="content">
                                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                                </span>
                                <el-button @click="modify('email')">保存</el-button>
                                <el-button @click="cancel('email')">取消</el-button>
                            </span>
                        </el-form-item>
                     
                    </div>
                </div>
            </el-form>
            <!-- <el-dialog title="充值" :visible.sync="rechargeVisible" width="400px">
                <el-form :model="rechargeForm" :rules="rechargeRules" ref="rechargeForm">
                    <el-form-item label="支付方式："  prop="recharge_type" :label-width="formLabelWidth">
                        <el-radio v-model="rechargeForm.recharge_type" label="2">微信</el-radio>
                        <el-radio v-model="rechargeForm.recharge_type" label="1">支付宝</el-radio>
                    </el-form-item>
                    <el-form-item label="充值金额："  prop="recharge_amount" :label-width="formLabelWidth">
                        <el-input v-model.number="rechargeForm.recharge_amount" type="number" style=" width:155px"></el-input><span style="margin-left:5px;">元</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="rechargeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="recharge">确 定</el-button>
                </div>
            </el-dialog> -->
            <el-dialog title="修改手机号" :visible.sync="visiblemobilephone" width="500px" class="chang-pwd">
                <el-form :model="pwdform2"  :rules="pwdRules2" ref="pwdform2">
                     <el-form-item label="老手机号：" :label-width="formLabelWidth">
                         <div>{{userInfo.mobilephone}}</div>
                      </el-form-item>   
                    <el-form-item label="图形码：" :label-width="formLabelWidth" prop="captcha_code">
                    <div style="display:flex;">
                       <el-input v-model="pwdform2.captcha_code"></el-input>
                       <img  :src="img_code" alt="" class="img-code" @click="getImgCode">
                    </div>
                    </el-form-item>
                    <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="mobilephone">
                        <el-input maxlength="11"  v-model.number="pwdform2.mobilephone" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" :label-width="formLabelWidth" prop="sms_code">
                         <div style="display:flex;">
                            <el-input v-model="pwdform2.sms_code" ></el-input>
                               <el-button type="text" @click="getCode1">{{codeDelay2 ? codeDelay2 + '秒后重发' : '获取验证码'}}</el-button>
                        </div>   
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visiblemobilephone = false">取 消</el-button>
                    <el-button type="primary" @click="change_phone">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改密码" :visible.sync="changePwdVisible" width="500px" class="chang-pwd">
                <el-form :model="pwdform" v-show="pwdVisible" :rules="pwdRules" ref="pwdform">
                    <el-form-item label="旧密码：" :label-width="formLabelWidth" prop="oldpass">
                        <el-input v-model="pwdform.oldpass" type="password" ></el-input>
                    </el-form-item>
                    <el-form-item prop="newpass" label="新密码：" :label-width="formLabelWidth">
                        <el-input v-model="pwdform.newpass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="againPass" label="确认密码：" :label-width="formLabelWidth">
                        <el-input v-model="pwdform.againPass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <span @click="pwdVisible=false" class="toggle-change-pwd">忘记旧密码？</span>
                    </el-form-item>
                </el-form>
                <el-form :model="pwdform1" v-show="!pwdVisible"  :rules="pwdRules1" ref="pwdform1">
                    <el-form-item label="图形码：" :label-width="formLabelWidth" prop="captcha_code">
                    <div style="display:flex;">
                       <el-input v-model="pwdform1.captcha_code"></el-input>
                       <img  :src="img_code" alt="" class="img-code" @click="getImgCode">
                    </div>
                    </el-form-item>
                    <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="mobilephone">
                        <el-input maxlength="11"  v-model.number="pwdform1.mobilephone" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" :label-width="formLabelWidth" prop="sms_code">
                         <div style="display:flex;">
                            <el-input v-model="pwdform1.sms_code" ></el-input>
                               <el-button type="text" @click="getCode">{{codeDelay1 ? codeDelay1 + '秒后重发' : '获取验证码'}}</el-button>
                        </div>   
                    </el-form-item>
                    <el-form-item label="新密码：" :label-width="formLabelWidth" prop="password">
                        <el-input v-model="pwdform1.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="re_password">
                        <el-input v-model="pwdform1.re_password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <span @click="pwdVisible=true" class="toggle-change-pwd">手机不在身边？</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="changePwdVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changePwd">确 定</el-button>
                </div>
            </el-dialog>

            <!-- <el-dialog title="微信充值" :visible.sync="rechargeCodeVisible" width="420px">
                <div>待付金额：{{recharge_data.payment_amount}} 元 </div>
                <img :src="this.img" alt="" style="width:200px;height:200px;margin:10px auto;display:block;">
            </el-dialog> -->
        </div>
</template>

<script>
import rechargeMixin from "@/mixins/recharge";
import { mapGetters, mapMutations } from "vuex";
import md5 from "md5";
export default {
  name: "home",
  mixins: [rechargeMixin],
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdform.againPass !== "") {
          this.$refs.pwdform.validateField("againPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdform.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能输入空"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdform1.re_password !== "") {
          this.$refs.pwdform1.validateField("re_password");
        }
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdform1.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      visiblenickname: true,
      visiblemobilephone: false,
      visiblealiwangwang: true,
      visibleemail: true,
      visibleqq: true,
      changePwdVisible: false,
      pwdVisible: true,
      form: {
        qq: "",
        aliwangwang: "",
        email: "",
        nickname: "",
        mobilephone: ""
      },
      pwdform: {
        oldpass: "",
        newpass: "",
        againPass: ""
      },
      pwdRules: {
        oldpass: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newpass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        againPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      pwdform1: {
        mobilephone: "",
        sms_code: "",
        password: "",
        re_password: "",
        captcha_code: ""
      },
      pwdRules1: {
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        sms_code: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        captcha_code: [
          { required: true, message: "请输入图形码", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            validator: validatePass3,
            trigger: "blur"
          }
        ],
        re_password: [
          {
            required: true,
            validator: validatePass4,
            trigger: "blur"
          }
        ]
      },
      pwdform2: {
        mobilephone: "",
        sms_code: "",
        captcha_code: ""
      },
      pwdRules2: {
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        sms_code: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        captcha_code: [
          { required: true, message: "请输入图形码", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      formRules: {
        qq: [{ validator: validate, message: "请输入qq", trigger: "blur" }],
        aliwangwang: [
          { validator: validate, message: "请输入阿里旺旺", trigger: "blur" }
        ],
        email: [
          { validator: validate, message: "请输入邮箱", trigger: "blur" }
        ],
        nickname: [
          { validator: validate, message: "请输入姓名", trigger: "blur" }
        ],
        mobilephone: [
          { validator: validate, message: "请输入手机号", trigger: "blur" }
        ]
      },
      codeDelay1: 0,
      codeDelay2: 0,
      img_code: ""
    };
  },
  created() {
    this.fetchUserInfo();
    this.getImgCode();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER"
    }),
    getImgCode() {
      this.$q({
        url: "/bg_admin/index/getcaptcha"
      }).then(data => {
        this.img_code = data.data;
      });
    },
    getCode1() {
      if (this.codeDelay2) return;
      if (!/^1[0-9]{10}$/.test(this.pwdform2.mobilephone)) {
        this.$message({
          message: "手机号码不正确！",
          duration: 2000
        });
        return;
      }
      if (!this.pwdform2.captcha_code) {
        this.$message({
          message: "请输入图形验证码！",
          duration: 2000
        });
        return;
      }
      this.$q({
        method: "POST",
        url: "/bg_admin/account/sendEditMobilephoneSMScode",
        data: this.pwdform2
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
      if (!/^1[0-9]{10}$/.test(this.pwdform1.mobilephone)) {
        this.$message({
          message: "手机号码不正确！",
          duration: 2000
        });
        return;
      }
      if (!this.pwdform1.captcha_code) {
        this.$message({
          message: "请输入图形验证码！",
          duration: 2000
        });
        return;
      }
      this.$q({
        method: "POST",
        url: "/bg_admin/account/sendEditPassSMScode",
        data: this.pwdform1
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
    cancel(item) {
      this.$refs.form.clearValidate([item]);
      this["visible" + item] = true;
    },
    fetchUserInfo() {
      this.$q({
        url: "/bg_admin/account/index"
      }).then(res => {
        this.setUserInfo(res);
      });
    },
    modify(item) {
      var url = null;
      if (item == "qq") {
        url = "/bg_admin/account/editQQ";
      }
      if (item == "email") {
        url = "/bg_admin/account/editEmail";
      }
      if (item == "nickname") {
        url = "/bg_admin/account/editnickname";
      }
      var data = {};
      data[item] = this.form[item];
      this.$refs.form.validateField(item, error => {
        if (!error) {
          this.$q({
            method: "post",
            url,
            data
          }).then(res => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            var setData = this.$store.state.user.user;
            setData[item] = this.form[item];
            this.$store.commit("SET_USER", setData);
            this["visible" + item] = true;
          });
        }
      });
    },
    change_phone() {
      this.$refs["pwdform2"].validate(valid => {
        if (valid) {
          this.$q({
            method: "post",
            url: "/bg_admin/account/editMobilephone",
            data: this.pwdform2
          }).then(res => {
            this.$message({
              message: "修改手机号成功",
              type: "success"
            });
            var setData = this.$store.state.user.user;
            setData['mobilephone'] = this.pwdform2['mobilephone'];
            this.$store.commit("SET_USER", setData);
            this.visiblemobilephone = false;
            this.pwdform2 = {
              mobilephone: "",
              sms_code: "",
              captcha_code: ""
            };
            // this.$router.push({ path: "/login" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changePwd() {
      if (this.pwdVisible) {
        this.$refs["pwdform"].validate(valid => {
          if (valid) {
            var obj = {};
            obj.oldpass = md5(this.pwdform.oldpass);
            obj.newpass = md5(this.pwdform.newpass);
            this.$q({
              method: "post",
              url: "/bg_admin/account/editPassword",
              data: obj
            }).then(res => {
              this.$message({
                message: "修改密码成功",
                type: "success"
              });
              this.changePwdVisible = false;
              // this.$router.push({ path: "/login" });
              this.pwdform = {
                oldpass: "",
                newpass: "",
                againPass: ""
              };
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs["pwdform1"].validate(valid => {
          if (valid) {
            this.$q({
              method: "post",
              url: "/bg_admin/account/editPasswordBySMScode",
              data: this.pwdform1
            }).then(res => {
              this.changePwdVisible = false;
              this.$message({
                message: "修改密码成功",
                type: "success"
              });
              this.pwdform1 = {
                mobilephone: "",
                sms_code: "",
                password: "",
                re_password: "",
                captcha_code: ""
              };
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.tailor-home {
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    width: 200px;
    display: inline-block;
  }
  .toggle-change-pwd {
    cursor: pointer;
  }
  .chang-pwd {
    .el-input {
      width: 300px;
    }
  }
  .img-code {
    margin-left: 10px;
    width: 120px;
    height: 36px;
    background-color: #409eff;
  }
}
</style>

