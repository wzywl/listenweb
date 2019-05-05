<template>
  <div class="login_page">
    <div class="login">
      <h3>听力训练</h3>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login_form">
	<el-form-item prop="username">
	  <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
	</el-form-item>
	<el-form-item prop="password">
	  <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
	</el-form-item>
	<el-form-item prop="usertype">
	  <el-radio-group v-model="loginForm.usertype">
	    <el-radio label="user"></el-radio>
	    <el-radio label="admin"></el-radio>
	  </el-radio-group>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" class="sub_btn" @click="submitForm('loginForm')">登录</el-button>
	</el-form-item>
      </el-form>
      <div class="register">
	<p @click="jump('/register')">立即注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import qs from 'qs'
  export default {
    data() {
      return {
	loginForm: {
	  username: '',
	  password: '',
	  usertype: ''
	},
	rules: {
	  username: [
	    {
	      required: true,
	      message: '请输入用户名',
	      trigger: 'blur'
	    }
	  ],
	  password: [
	    {
	      required: true,
	      message: '请输入密码',
	      trigger: 'blur'
	    }
	  ],
	  usertype: [
	    {
	      required: true,
	      message: '请选择用户类型',
	      trigger: 'change'
	    }
	  ]
	}
      }
    },
    methods: {
      submitForm(formName) {
	this.$refs[formName].validate((valid) => {
	  if(valid) {
	    this.$axios.post('http://192.168.137.128:3000/login',{
	      username: this.loginForm.username,
	      password: md5(this.loginForm.password),
	      usertype: this.loginForm.usertype
	    }).then(response => {
	      if(response.data.status === 1) {
		setCookie('token',response.data.token)
		setCookie('username',this.loginForm.username)
		this.$message({
		  showClose: true,
		  message: response.data.result,
		  type: 'success'
		})
		setTimeout(() => {
		  if(this.loginForm.usertype == 'admin') {
		    this.$router.push('/admin')
		  }
		  else {
		    this.$router.push('/user')
		  }
		},1000)
	      }
	      else {
		this.$message({
		  showClose: true,
		  message: response.data.result,
		  type: 'warning'
		})
	      }
	    }).catch(error => {
	      this.$notify({
		title: '错误',
		message: 'network error',
		type: 'error'
	      })
	    })
	  }
	})
      },
      jump(url) {
	this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
.login_page {
  background-image: url("../../static/images/bg.png");
  background-size: 100% 100%;
  height: 100%;
}
h3 {
  text-align: center;
  margin-bottom: 35px;
}
.login {
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  border-radius: 5px;
  background-color: #fff;
  width: 320px;
  padding: 30px;
}
.sub_btn {
  width: 100%;
}
.register {
  float: right;
  color: #00BFFF;
}
.register p {
  margin: 0px;
}
</style>
