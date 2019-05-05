<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <div style="flex 0 0 auto;">
      <headtop></headtop>
    </div>
    <div style="flex: 1 0 auto;margin-top: 20px;">
      <audio :src="this.url" controls="controls" style="margin-left: 240px"></audio>
      <div>
	<el-input v-model="scorrect" type="textarea" style="width: 400px;margin-left: 240px;margin-top: 5px;" :rows="6" placeholder="请输入答案"></el-input>
      </div>
      <div style="margin-left: 240px;margin-top: 10px;">
	<el-button type="primary" @click="submit">提交答案</el-button>
	<el-button type="primary" @click="check">查看答案</el-button>
      </div>
    </div>
    <div style="flex: 0 0 auto;">
      <foot></foot>
    </div>
  </div>
</template>

<script>
import headtop from './Head.vue'
import foot from './Footer.vue'
  export default {
    data() {
      return {
	productList: [],
	url: '',
	scorrect: ''
      }
    },
    methods: {
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getlistensources',{
	  params: {
	    sid: this.$route.query.sid
	  }
	}).then(response => {
	  this.productList = response.data.result[0]
	  this.url = 'http://192.168.137.128:3000' + this.productList.surl
	})
      },
      submit() {
	this.$axios.post('http://192.168.137.128:3000/submitscorrect',{
	  sid: this.$route.query.sid,
	  scorrect: this.scorrect
	}).then(response => {
	  if(response.data.status === 1) {
	    this.$message({
	      showClose: true,
	      message: response.data.result,
	      type: 'success'
	    })
	  }
	  else {
	    this.$message({
	      showClose: true,
	      message: response.data.result,
	      type: 'warning'
	    })
	  }
	}).catch(error => {})
      },
      check() {
	this.$axios.get('http://192.168.137.128:3000/checkscorrect',{
	  params: {
	    sid: this.$route.query.sid
	  }
	}).then(response => {
	  this.scorrect = response.data.result[0].scorrect
	}).catch(error => {})
      }
    },
    mounted() {
      this.getinfo()
    },
    components: {
      headtop,
      foot
    }
  }
</script>
