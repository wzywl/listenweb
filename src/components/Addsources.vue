<template>
  <div>
    <el-form ref="addform" :model="addform" :rules="addformrules" label-width="80px">
      <el-form-item label="文件名" prop="name">
	<el-input v-model="addform.name" style="width: 280px;" placeholder="请输入文件名"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="correct">
	<el-input v-model="addform.correct" type="textarea" style="width: 400px;" :rows="6" placeholder="请输入答案"></el-input>
      </el-form-item>
      <el-form-item label="文件所属" prop="type">
	<el-select v-model="addform.type" placeholder="请选择文件所属">
	  <el-option v-for="(item,index) in sourcestype" :key="index" :label="item.name" :value="item.value"></el-option>
	</el-select>
      </el-form-item>
      <el-form-item label="上传文件" prop="file">
	<el-upload
	  action="1"
	  accept="audio/mp3"
	  :before-upload="beforeupload">
	    <el-button type="primary">点击上传</el-button>
	</el-upload>
      </el-form-item>
      <el-form-item>
	<el-button type="primary" @click="submitform('addform')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  var formData = new FormData()
  export default {
    data() {
      return {
	addform: {
	  name: '',
	  correct: '',
	  type: '',
	  file: false
	},
	addformrules: {
	  name: [
	    { required: true,message: '请输入文件名',trigger: 'blur'},
	    { min: 1, max: 20,message: '长度在1-20之间',trigger: 'blur'}
	  ],
	  correct: [
	    { required: true,message: '请输入正确答案',trigger: 'blur'}
	  ],
	  type: [
	    { required: true,message: '请选择文件所属',trigger: 'change'}
	  ]
	},
	sourcestype: [
	  { name: 'cet4',value: 'cet4'},
	  { name: 'cet6',value: 'cet6'},
	  { name: 'news',value: 'news'}
	]
      }
    },
    methods: {
      beforeupload(file) {
	const ismp3 = file.type === 'audio/mp3'
	if(!ismp3) {
	  this.$message.error('只能上传mp3格式')
	  return false
	}
	else {
	  this.addform.file = true
	  formData.append('file',file)
	  return false
	}
      },
      submitform(formname) {
	if(this.addform.file == false) {
	  this.$message({
	    showClose: true,
	    message: '请上传文件',
	    type: 'warning'
	  })
	}
	this.$refs[formname].validate((valid) => {
	  if(valid) {
	    formData.append('correct',this.addform.correct)
	    formData.append('type',this.addform.type)
	    formData.append('name',this.addform.name)
	    let config = {
	      headers: {
		'Content-Type': 'multipart/form-data'
	      }
	    }
	    this.$axios.post('http://192.168.137.128:3000/addsources',formData,config).then(response => {
	      if(response.data.status === 1) {
		this.$message({
		  showClose: true,
		  message: response.data.result,
		  type: 'success'
		})
		this.$router.push('/admin/managesources')
		this.resetform('addform')
		formData = new FormData()
	      }
	      else {
		this.$message({
		  showClose: true,
		  message: response.data.result,
		  type: 'warning'
		})
	      }
	      this.resetform('addform')
	      formData = new FormData()
	    })
	  }
	})
      },
      resetform(formname) {
	if(this.$refs[formname] !== undefined) {
	  this.$refs[formname].resetFields()
	}
      }
    }
  }
</script>
