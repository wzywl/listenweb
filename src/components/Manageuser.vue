<template>
  <div class="table_width">
    <el-row>
      <el-col :span="2" style="float: right;">
	<el-button type="primary" @click="addvisible=true,addf=true,editf=false,resetf=true,disabledchange=false,resetform('addform')">新增</el-button>
      </el-col>
    </el-row>
    <el-table border :data="productList">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="用户邮箱"></el-table-column>
      <el-table-column prop="usertype" label="用户类型"></el-table-column>
      <el-table-column label="操作">
	<template slot-scope="scope">
	  <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
	  <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
	</template>
      </el-table-column>
    </el-table>
    <!-- 新增页面-->
    <el-dialog title="新增/编辑" :visible.sync="addvisible">
      <el-form :model="addform" :rules="addformrules" ref="addform" label-width="100px">
	<el-form-item prop="addusername" label="用户名">
	  <el-input :disabled="disabledchange" v-model="addform.addusername" placeholder="请输入用户名"></el-input>
	</el-form-item>
	<el-form-item prop="addpassword" label="密码">
	  <el-input v-model="addform.addpassword" type="password" placeholder="请输入密码"></el-input>
	</el-form-item>
	<el-form-item prop="addemail" label="邮箱">
	  <el-input v-model="addform.addemail" placeholder="请输入邮箱"></el-input>
	</el-form-item>
	<el-form-item label="用户类型" prop="addusertype">
	  <el-radio-group v-model="addform.addusertype">
	    <el-radio label="admin"></el-radio>
	    <el-radio label="user"></el-radio>
	  </el-radio-group>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" v-if="addf" @click="submitform('addform')">新增</el-button>
	  <el-button type="primary" v-if="editf" @click="editform('addform')">修改</el-button>
	  <el-button v-if="resetf" @click="resetform('addform')">重置</el-button>
	</el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增页面结束 -->
    <div class="block">
      <el-pagination 
	@current-change="handleCurrentChange"
	layout="prev,pager,next,jumper"
	:page-count="pagecount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
  export default {
    data() {
      return {
	productList: [],
	pageindex: 1,
	pagesize: 6,
	pagecount: 1,
	addvisible: false,
	addf: false,
	editf: false,
	resetf: false,
	disabledchange: false,
	addform: {
	  addusername: '',
	  addpassword: '',
	  addemail: '',
	  addusertype: ''
	},
	addformrules: {
	  addusername: [
	    {
	      required: true,
	      message: '请输入用户名',
	      trigger: 'blur'
	    }
	  ],
	  addpassword: [
	    {
	      required: true,
	      message: '请输入密码',
	      trigger: 'blur'
	    }
	  ],
	  addemail: [
	    {
	      required: true,
	      message: '请输入邮箱',
	      trigger: 'blur'
	    }
	  ],
	  addusertype: [
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
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getuserinfo',{
	  params: {
	    username: getCookie('username'),
	    token: getCookie('token'),
	    pageindex: this.pageindex,
	    pagesize: this.pagesize
	  }
	}).then(response => {
	  this.productList = response.data.result
	  this.pagecount = response.data.pagecount
	}).catch(error => {})
      },
      handleEdit(row) {
	this.addvisible = true
	this.addf = false
	this.editf = true
	this.resetf = false
	this.disabledchange = true
	this.$axios.get('http://192.168.137.128:3000/getuserinfodetail',{
	  params: {
	    username: row.username,
	    token: getCookie('token')
	  }
	}).then(response => {
	  this.addform.addusername = response.data.result[0].username
	  this.addform.addpassword = response.data.result[0].password
	  this.addform.addemail = response.data.result[0].email
	  this.addform.addusertype = response.data.result[0].usertype
	})
      },
      handleDelete(row) {
	this.$confirm('是否删除','提示', {
	  confirmButtonText: '确定',
	  cancelButtonText: '取消'
	}).then(() => {
	  this.$axios.get('http://192.168.137.128:3000/deleteuserinfo',{
	    params: {
	      token: getCookie('token'),
	      username: getCookie('username'),
	      dusername: row.username
	    }
	  }).then(response => {
	    this.$message({
	      message: response.data.result,
	      type: 'success'
	    })
	    this.getinfo()
	  }).catch(error => {})
	}).catch(() => {})
      },
      handleCurrentChange(val) {
	this.pageindex = val
	this.getinfo()
      },
      submitform(formname) {
	this.$refs[formname].validate((valid) => {
	  if(valid) {
	    this.$axios.post('http://192.168.137.128:3000/register',{
	      username: this.addform.addusername,
	      password: md5(this.addform.addpassword),
	      email: this.addform.addemail,
	      usertype: this.addform.addusertype
	    }).then(response => {
	      if(response.data.status === 1) {
		this.$message({
		  message: response.data.result,
		  type: 'success'
		})
		this.getinfo()
		this.resetform('addform')
		this.addvisible = false
	      }
	      else {
		this.$message({
		  message: response.data.result,
		  type: 'warning'
		})
	      }
	    })
	  }
	})
      },
      editform(formname) {
	this.$refs[formname].validate((valid) => {
	  if(valid) {
	    this.$axios.post('http://192.168.137.128:3000/edituserinfo',{
	      username: this.addform.addusername,
	      password: md5(this.addform.addpassword),
	      email: this.addform.addemail,
	      usertype: this.addform.addusertype
	    }).then(response => {
	      if(response.data.status === 1) {
		this.$message({
		  message: response.data.result,
		  type: 'success'
		})
		this.getinfo()
		this.resetform('addform')
		this.addvisible = false
	      }
	    })
	  }
	})
      },
      resetform(formname) {
	if(this.$refs[formname] !== undefined) {
	  this.$refs[formname].resetFields()
	}
      }
    },
    mounted() {
      this.getinfo()
    }
  }
</script>

<style scoped>
.table_width {
  width: 100%; 
}
.el-table {
  width: 100%;
}
.block {
  text-align: center;
  margin-top: 10px;
}
.el-row {
  padding: 10px 0px;
}
.left {
  padding-left: 5px; 
}
</style>
