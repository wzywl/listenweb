<template>
  <div class="register_page">
    <div class="register">
      <h3>注册</h3>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" class="register_form">
	<el-form-item prop="username">
	  <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
	</el-form-item>
	<el-form-item prop="password">
	  <el-input v-model="registerForm.password" placeholder="密码" type="password"></el-input>
	</el-form-item>
	<el-form-item prop="repassword">
	  <el-input v-model="registerForm.repassword" placeholder="确认密码" type="password"></el-input>
	</el-form-item>
	<el-form-item prop="email">
	  <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" class="sub_btn" @click="submitForm('registerForm')">注册</el-button>
	</el-form-item>
      </el-form>
      <div class="login">
        <p @click="jump('/login')">立即登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import md5 from 'js-md5'
 export default {
  data() {
    var validatepassword = (rule,value,callback) => {
      if(value === "") {
	callback(new Error('请输入密码'));
      }
      else {
	if(this.registerForm.repassword !== '') {
	  this.$refs.registerForm.validateField('repassword')
	}
	callback()
      }
    }
    var validaterepassword = (rule,value,callback) => {
      if(value === '') {
	callback(new Error('请在此输入密码'))
      }
      else if(value !== this.registerForm.password) {
	callback(new Error('两次输入密码不一致'))
      }
      else {
	callback()
      }
    }
    var validateemail = (rule,value,callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if(value === '') {
	callback(new Error('请输入邮箱'))
      }
      else {
	if(reg.test(value)) {
	  callback()
	}
	else {
	  callback(new Error('邮箱格式不正确'))
	}
      }
    }
    return {
      registerForm: {
	username: '',
	password: '',
	email: '',
	usertype: 'user'
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
	    validator: validatepassword,
	    trigger: 'blur'
	  }
	],
	repassword: [
	  {
	    validator: validaterepassword,
	    trigger: 'blur'
	  }
	],
	email: [
	  {
	    validator: validateemail,
	    trigger: 'blur'
	  }
	]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
	if(valid) {
	  this.$axios.post('http://192.168.137.128:3000/register',{
	    username: this.registerForm.username,
	    password: md5(this.registerForm.password),
	    email: this.registerForm.email,
	    usertype: this.registerForm.usertype
	  }).then(response => {
	    if(response.data.status == 1) {
	      this.$message({
		showClose: true,
		message: response.data.result,
		type: 'success'
	      })
	      setTimeout(() => {
		this.$router.push('/login')
	      },1000)
	    }
	    else {
	      this.$message({ 
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
.register_page {
  background-image: url("../../static/images/bg.png");
  background-size: 100% 100%;
  height: 100%;
}
h3 {
  text-align: center;
}
.register {
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
.login {
  float: right;
  color: #00BFFF;
}
.login p {
  margin: 0px;
}
</style>
