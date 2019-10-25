<template>
        <div class="tailor-home">
           <el-breadcrumb separator="/" style="margin-bottom:20px;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>账号信息</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :model="form" ref="form" :rules="formRules">
                <div style="line-height:45px;">
                    <!-- <span class="title" v-text="userInfo.truename"></span>，您好。欢迎进入紫雷定制电商管理后台！ -->
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
                <div>
                    <div class="title" style="margin-bottom:20px;">基本信息</div>
                    <div style="width:800px">
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
                        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="truename">
                            <span v-show="visibletruename">
                                <span class="content" v-text="userInfo.truename?userInfo.truename:'暂未设置'"></span>
                                <el-button @click="visibletruename = false">修改</el-button>
                            </span>
                            <span v-show="!visibletruename">
                                <span class="content">
                                    <el-input v-model="form.truename" placeholder="请输入姓名" maxlength="8"></el-input>
                                </span>
                                <el-button @click="modify('truename')">保存</el-button>
                                <el-button @click="cancel('truename')">取消</el-button>
                            </span>
                        </el-form-item>
                        <el-form-item label="账号：" :label-width="formLabelWidth"  prop="mobilephone">
                             <span >
                                <span class="content" v-text="userInfo.mobilephone"></span>
                                <el-button @click="visiblemobilephone = true">修改</el-button>
                            </span>
                        </el-form-item>
                        <!-- <el-form-item label="账号：" :label-width="formLabelWidth"  prop="mobilephone">
                             <span v-show="visiblemobilephone">
                                <span class="content" v-text="userInfo.mobilephone"></span>
                                <el-button @click="visiblemobilephone = false">修改</el-button>
                            </span>
                            <span v-show="!visiblemobilephone">
                                <span class="content">
                                    <el-input v-model="form.mobilephone" maxlength="11" placeholder="请输入手机号"></el-input>
                                </span>
                                <el-button @click="modify('mobilephone')">保存</el-button>
                                <el-button @click="cancel('mobilephone')">取消</el-button>
                            </span>
                        </el-form-item> -->
                        <el-form-item label="密码：" :label-width="formLabelWidth">
                             <span>
                                <span class="content">***********</span>
                                <el-button @click="changePwdVisible = true">修改</el-button>
                            </span>
                        </el-form-item>
                        <!-- <el-form-item label="角色：" :label-width="formLabelWidth">
                            <span class="content" v-text="userInfo.role_id == 201?'超级管理员':userInfo.role_id == 202?'管理员':'员工'"></span>
                        </el-form-item> -->
                        <el-form-item label="店铺门头照片：" :label-width="formLabelWidth">
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="营业执照：" :label-width="formLabelWidth">
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>
                <!-- <div>
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
                        <el-form-item label="旺旺：" :label-width="formLabelWidth" prop="aliwangwang">
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
                        </el-form-item>
                     
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
                </div> -->
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
            <el-dialog title="修改密码" :visible.sync="changePwdVisible" width="500px" class="chang-pwd">
                <el-form :model="pwdform" :rules="pwdRules" ref="pwdform">
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
                        <span @click="show" class="toggle-change-pwd">忘记旧密码？</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="changePwdVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changePwd">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改密码" :visible.sync="changePwdVisible1" width="500px" class="chang-pwd">
                <el-form :model="pwdMform">
                    <el-form-item label="图形码：" :label-width="formLabelWidth">
                        <div style="display:flex;">
                            <el-input v-model="pwdform.name" style="width:200px"></el-input>
                            <img src="../../static/images/expire.png" alt="" class="img-code">
                        </div>
                    </el-form-item>
                    <el-form-item label="手机号码：" :label-width="formLabelWidth">
                        <el-input maxlength="11"  v-model="form.name" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" :label-width="formLabelWidth">
                        <div style="display:flex;">
                            <el-input v-model="form.name" style="width:200px" ></el-input>
                            <el-button type="text" class="sms-code">发送验证码</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="新密码：" :label-width="formLabelWidth">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" :label-width="formLabelWidth">
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <span @click="show1" class="toggle-change-pwd">手机不在身边？</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="changePwdVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="changePwd1">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="账号修改" :visible.sync="visiblemobilephone" width="500px" class="chang-pwd">
                <el-form :model="pwdMform">
                    <el-form-item label="登录密码：" :label-width="formLabelWidth">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="新手机号码：" :label-width="formLabelWidth">
                        <el-input maxlength="11"  v-model="form.name" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="图形码：" :label-width="formLabelWidth">
                        <div style="display:flex;">
                            <el-input v-model="pwdform.name" style="width:200px"></el-input>
                            <img src="../../static/images/expire.png" alt="" class="img-code">
                        </div>
                    </el-form-item>
                    <el-form-item label="验证码：" :label-width="formLabelWidth">
                        <div style="display:flex;">
                            <el-input v-model="form.name" style="width:200px" ></el-input>
                            <el-button type="text" class="sms-code">发送验证码</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visiblemobilephone = false">取 消</el-button>
                    <el-button type="primary" @click="change_accout">确 定</el-button>
                </div>
            </el-dialog>

        </div>
</template>

<script>
import rechargeMixin from "@/mixins/recharge";
import { mapGetters } from "vuex";
import md5 from "md5";
export default {
  name: "accountInfo",
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
    return {
      visibletruename: true,
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
        truename: "",
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
      pwdMform: {},
      formLabelWidth: "120px",
      formRules: {
        qq: [{ validator: validate, message: "请输入qq", trigger: "blur" }],
        aliwangwang: [
          { validator: validate, message: "请输入阿里旺旺", trigger: "blur" }
        ],
        email: [
          { validator: validate, message: "请输入邮箱", trigger: "blur" }
        ],
        truename: [
          { validator: validate, message: "请输入姓名", trigger: "blur" }
        ],
        mobilephone: [
          { validator: validate, message: "请输入手机号", trigger: "blur" }
        ]
      },
      changePwdVisible1:false
    };
  },
  created() {
    // this.fetchUserInfo();
  },
  methods: {
      show(){
          this.changePwdVisible = false;
          this.changePwdVisible1 = true;
      },
      show1(){
          this.changePwdVisible1 = false;
          this.changePwdVisible = true;
      },
    cancel(item) {
      this.$refs.form.clearValidate([item]);
      this["visible" + item] = true;
    },
    fetchUserInfo() {
      this.$http.get("/index/getEcommerceManagerInfo").then(({ data }) => {
        this.form = data.manager;
      });
    },
    modify(item) {
      var data = {};
      data[item] = this.form[item];
      this.$refs.form.validateField(item, error => {
        if (!error) {
          this.$post("/index/modifyEcommerceManagerInfo", data).then(res => {
            this.$message(res.msg);
            if (res.code == 0) {
              var setData = this.$store.state.user.user;
              setData[item] = this.form[item];
              this.$store.commit("SET_USER", setData);
              this["visible" + item] = true;
            }
          });
        }
      });
    },
    changePwd() {
      this.$refs["pwdform"].validate(valid => {
        if (valid) {
          if (this.pwdVisible) {
            var obj = {};
            obj.oldpass = md5(this.pwdform.oldpass);
            obj.newpass = md5(this.pwdform.newpass);
            this.$post("index/editPassword", obj).then(res => {
              this.$message(res.Message);
              if (res.Success === 1) {
                this.changePwdVisible = false;
                location = "/ecommerce_shop?newui";
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // width: 100px;
    // height: 100px;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  .img-code{
      width: 100px;
      height: 36px;
      background-color: #409eff;
  }
}
</style>

