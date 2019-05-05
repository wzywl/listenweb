<template>
  <div>
    <el-form ref="changeform" :model="changeform" :rules="changeformrules" label-width="120px">
      <el-form-item label="文章标题" prop="sktitle"> 
	<el-input v-model="changeform.sktitle" style="width: 280px;"></el-input>
      </el-form-item>
      <el-form-item label="文章所属" prop="sktype">
	<el-select v-model="changeform.sktype" placeholder="请选择文章所属">
	  <el-option v-for="(item,index) in skillstype" :key="index" :label="item.name" :value="item.value">
	  </el-option>
	</el-select>
      </el-form-item>
      <el-form-item label="文章详细内容" prop="skcontext">
	<el-input v-model="changeform.skcontext" type="textarea" style="width: 500px;" :rows="9" placeholder="请输入文章详细内容">
	</el-input>
      </el-form-item>
      <el-form-item>
	<el-button type="primary" @click="submitform('changeform')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
	change: '',
	skillstype: [
	  {name: '听力技巧',value: "1"},
	  {name: '写作技巧',value: "2"},
	  {name: '学习技巧',value: "3"}
	],
	changeform: {
	  sktitle: '',
	  sktype: '',
	  skcontext: '',
	  skcreatetime: ''
	},
	changeformrules: {
	  sktitle: [
	    {required: true,message: '请输入文章标题',trigger: 'blur'}
	  ],
	  sktype: [
	    {required: true,message: '请选择文章所属',trigger: 'change'}
	  ],
	  skcontext: [
	    {required: true,message: '请输入文章内容',trigger: 'blur'}
	  ]
	}
      }
    },
    methods: {
      getinfo() {
	if(this.$route.query.skid !== undefined) {
	  this.$axios.get('http://192.168.137.128:3000/getskillsinfosel',{
	    params: {
	      skid: this.$route.query.skid
	    }
	  }).then(response => {
	    this.change = response.data.result[0]
	    this.changeform = this.change
	    this.changeform.sktype = response.data.result[0].sktype
	  }).catch(error => {})
	}
      },
      submitform(formname) {
	this.$refs[formname].validate((valid) => {
	  if(valid) {
	    var d = new Date()
	    var datetime = d.getFullYear() +
	    "-" +
	    (d.getMonth() + 1) +
	    "-" +
	    d.getDate() +
	    " " + 
	    d.getHours() +
	    ":" + 
	    d.getMinutes()
	    this.changeform.skcreatetime = datetime
	    if(this.$route.query.skid == undefined) {
	      this.$axios.post('http://192.168.137.128:3000/addskills',{
		sktitle: this.changeform.sktitle,
		sktype: this.changeform.sktype,
		skcontext: this.changeform.skcontext,
		skcreatetime: this.changeform.skcreatetime
	      }).then(response => {
		this.$message({
		  showClose: true,
		  message: response.data.result,
		  type: 'success'
		})
		this.resetform('changeform')
		this.$router.push('/admin/manageskills')
	      }).catch(error => {})
	    }
	    else {
	      this.$axios.post('http://192.168.137.128:3000/editskills',{
		skid: this.$route.query.skid,
		sktitle: this.changeform.sktitle,
		sktype: this.changeform.sktype,
		skcontext: this.changeform.skcontext,
		skcreatetime: this.changeform.skcreatetime
	      }).then(response => {
		this.$message({
		  showClose: true,
		  message: response.data.result,
		  type: 'success'
		})
		this.resetform('changeform')
		this.$router.push('/admin/manageskills')
	      }).catch(error => {})
	    }
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
