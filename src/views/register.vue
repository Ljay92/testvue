<template>
  <div class="lr-content-wrapper register">
    <div class="login-logo" @click="$router.push({ path: '/'})"></div>
     <div class="lr-main" style="height:540px;">
        <div class="box-flex-media-box login-left">
            <div class="flex1">
                <div class="lr-radius">
                    <img src="../assets/images/logon-left.jpg"/>
                </div>
                <router-link :to="{ path: '/' }" class="back-index">{{$lang('返回首页')}}</router-link>
            </div>
            <div class="flex1">
                <div class="lr-main-right reg-wrapper">
                   <h3 class="main-title">{{$lang('欢迎注册VSWORK成为会员')}}</h3>
                   <div class="lr-form-wrap">
                        <el-form ref="form" :model="form" label-width="20" :rules="rules">
                            <el-form-item prop='nickName' label=" " required  v-show="userType=='V'">
                                <el-input v-model="form.nickName" type="text" :placeholder="$lang('昵称')"></el-input>
                            </el-form-item>
                            <VerifyCode ref="VerifyCode" :phone="form.phone"  :code="form.code" :getData="getData" :parentClass="'reg-wrapper'" :type="'register'" ></VerifyCode>
                            <el-form-item prop='password1' label=" " required>
                               <el-input v-model="form.password1" type="password" :placeholder="$lang('请输入密码')"></el-input>
                            </el-form-item>
                            <el-form-item prop='password2' label=" " required>
                               <el-input v-model="form.password2" type="password" :placeholder="$lang('请再次输入密码')" ></el-input>
                            </el-form-item>
                            <el-form-item class="mag-botm-5" label=" " required>
                                <el-checkbox v-model="form.checked">{{$lang('已阅读并同意')}}<a  class="yhxz-a">{{$lang('《VSWORK用户协议》')}}</a></el-checkbox>
                            </el-form-item>
                            <el-form-item>
                               <el-button type="sure" @click="register" :disabled="!(form.checked&&validCode)">{{$lang('注册')}}</el-button>
                            </el-form-item>
                        </el-form>
                   </div>
                   <div class="reg-set-btn">
                        <p>{{$lang('我已注册，现在')}}<router-link :to="{ name: 'login' }">{{$lang('登录')}}</router-link></p>
                   </div>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<style>
.register .el-form-item__content {
  width: 300px;
  display: inline-block;
}
</style>

<script>
import VerifyCode from "@/components/VerifyCode";
import { Register } from "@/apis";
export default {
  components: {
    VerifyCode
  },
  data() {
    return {
      userType: "B", //用户类型
      form: {
          nickName:"",
        phone: "",
        password1: "",
        password2: "",
        checked: false,
        code: ""
      },
      validCode: false,
      rules: {
        password1: [{ validator: this.validatePwd, trigger: "blur" }],
        password2: [{ validator: this.validateCheckpwd, trigger: "blur" }]
      }
    };
  },
  created() {
    this.userType = this.getUserType(this.$route.query);
  },
  methods: {
    validatePwd(rule, value, callback) {
      if (value === "") {
        callback(new Error($lang("密码不能为空")));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error($lang("6-12个字符")));
      } else {
        callback();
      }
    },
    validateCheckpwd(rule, value, callback) {
      if (value === "") {
        callback(new Error($lang("密码不能为空")));
      } else if (value !== this.form.password1) {
        callback(new Error($lang("两次密码不一致")));
      } else {
        callback();
      }
    },
    //获取验证组件的返回值
    getData(data) {
      this.form.phone = data.phone;
      this.form.code = data.code;
      this.validCode = data.valid;
    },
    //获取用户类型
    getUserType(urlQuery) {
      return urlQuery.type;
    },
    async doRegister() {
      let param = {
        phone: this.form.phone,
        password: this.form.password1,
        userType: this.userType,
        code: this.form.code,
          nickName: this.form.nickName,
        type: "register"
      };
      const res = await Register(param);
      if (res.success) {
        if (this.$route.query.type == "V") {
          this.$alert(
            this.$lang("欢迎来到VSWORK协作平台，请通过“个人中心”→“身份验证”尽快完善信息，完成身份验证~"),
            this.$lang("注册成功"),
            {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ name: "login" });
              }
            }
          );
        } else {
          this.$message.success($lang("注册成功！"));
          this.$router.push({ name: "login" });
        }

        conn.registerUser({
          username: param.phone,
          password: param.password,
          nickname: param.phone,
          appKey: WebIM.config.appkey,
          success: function() {
            console.log("%c 注册聊天成功", "color: green");
          },
          error: function() {
            console.log("%c 注册聊天失败", "color: red");
          },
          apiUrl: WebIM.config.apiURL
        });
      } else {
        if (res.code == "1007" || res.code == "1005" || res.code == "1006") {
          this.$refs.VerifyCode.clear(res.code);
        } else if (res.code == "1008") {
          this.$refs.VerifyCode.clear();
        } else {
          this.$refs.VerifyCode.clear();
          this.form = {
            phone: "",
            password1: "",
            password2: "",
            code: ""
          };
        }
        this.$message.error(res.msg);
      }
    },
    register() {
      const me = this;
      this.$refs["form"].validate(valid => {
        if (me.validCode && valid) {
          this.doRegister();
        } else {
          return false;
        }
      });
    }
  }
};
</script>