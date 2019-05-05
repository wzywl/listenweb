<template>
  <div>
    <div class="table_width">
      <el-row>
	<el-col :span="2" style="float: right;">
	  <el-button type="primary" @click="addsources">新增</el-button>
	</el-col>
      </el-row>
      <el-table border :data="productList" style="margin-top: 20px;">
	<el-table-column prop="salt" label="文件名称"></el-table-column>
	<el-table-column prop="stype" label="文件所属"></el-table-column>
	<el-table-column label="操作">
	  <template slot-scope="scope">
	    <el-button @click="handleCheck(scope.row)" type="primary">查看</el-button>
	    <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
	    <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
	  </template>
	</el-table-column>
      </el-table>
    </div>
    <el-dialog title="查看/编辑" :visible.sync="checkvisible">
      <el-form :model="editform" :rules="editform" ref="editform">
	<el-form-item prop="scorrect" label="正确答案" label-width="80px">
	  <el-input type="textarea" :rows="6" :disabled="disabledchange" v-model="editform.scorrect" placeholder="请输入内容"></el-input>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" v-if="editf" @click="submitform('editform')">保存</el-button>
	</el-form-item>
      </el-form>
    </el-dialog>
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
  export default {
    data() {
      return {
	checkvisible: false,
	disabledchange: false,
	editf: false,
	productList: [],
	pageindex: 1,
	pagesize: 6,
	pagecount: 1,
	editform: {
	  scorrect: '',
	  sid: ''
	},
	editformrules: {
	  scorrect: [
	    {
	      required: true,
	      message: '请输入正确答案',
	      trigger: 'blur'
	    }
	  ]
	}
      }
    },
    methods: {
      handleCurrentChange(val) {
	this.pageindex = val
	this.getinfo()
      },
      addsources(){
	this.$router.push('/admin/addsources')
      },
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getsourcesinfo',{
	  params: {
	    username: getCookie('username'),
	    token: getCookie('token'),
	    pageindex: this.pageindex,
	    pagesize: this.pagesize
	  }
	}).then(response => {
	  this.productList = response.data.result
	})
      },
      handleCheck(row) {
	this.checkvisible = true
	this.disabledchange = true
	this.editf = false
	this.editform.scorrect = row.scorrect
      },
      handleEdit(row) {
	this.editform.scorrect = row.scorrect
	this.checkvisible = true
	this.disabledchange = false
	this.editf = true
	this.editform.sid = row.sid
      },
      handleDelete(row) {
	this.$confirm('是否删除','提示',{
	  confirmButtonText: '确定',
	  cancelButtonText: '取消'
	}).then(() => {
	  this.$axios.get('http://192.168.137.128:3000/deletesources',{
	    params: {
	      token: getCookie('token'),
	      username: getCookie('username'),
	      sid: row.sid,
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
      submitform(formname) {
	this.$refs[formname].validate((valid) => {
	  if(valid) {
	    this.$axios.get('http://192.168.137.128:3000/editscorrect',{
	      params: {
		scorrect: this.editform.scorrect,
		sid: this.editform.sid
	      }
	    }).then(response => {
	      this.$message({
		showClose: true,
		message: response.data.result,
		type: 'success'
	      })
	      this.checkvisible = false
	      this.getinfo()
	    })
	  }
	})
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
.block {
  text-align: center;
  margin-top: 10px;
}
</style>
