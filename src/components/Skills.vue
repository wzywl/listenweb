<template>
  <div>
    <div class="title">
      <span v-for="(item,index) in titleList" :key="index" style="margin: 0 20px;text-align: center;">
	<a @mouseenter="check(index)">{{item.type}}</a>
	<span style="margin-top: 10px;margin-left: 20px">|</span>
      </span>
      <div class="main">
	<ul v-if="status1">
	  <li v-for="(item,index) in productList1" :key="index">
	    <a @click="checkdetail(item.skid)">{{item.sktitle}}</a>
	    <span style="float: right;">{{item.skcreatetime}}</span>
	  </li>
	</ul>
	<ul v-if="status2">
	  <li v-for="(item,index) in productList2" :key="index">
	    <a @click="checkdetail(item.skid)">{{item.sktitle}}</a>
	    <span style="float: right;">{{item.skcreatetime}}</span>
	  </li>
	</ul>
	<ul v-if="status3">
	  <li v-for="(item,index) in productList3" :key="index">
	    <a @click="checkdetail(item.skid)">{{item.sktitle}}</a>
	    <span style="float: right;">{{item.skcreatetime}}</span>
	  </li>
	</ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
	titleList: [{type: '听力技巧'},{type: '写作技巧'},{type: '学习技巧'}],
	productList1: [],
	productList2: [],
	productList3: [],
	status1: true,
	status2: false,
	status3: false
      }
    },
    methods: {
      check(index) {
	if(index === 0) {
	  this.status1 = true
	  this.status2 = false
	  this.status3 = false
	}
	else if(index === 1) {
	  this.status1 = false
	  this.status2 = true
	  this.status3 = false

	}
	else {
	  this.status1 = false
	  this.status2 = false
	  this.status3 = true
	}
      },
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getskillsinfou',{
	  params: {}
	}).then(response => {
	  let result = response.data.result
	  for(let i = 0;i < result.length;i++) {
	    if(result[i].sktype === "1") {
	      this.productList1.push(result[i])
	    }
	    else if(result[i].sktype === "2") {
	      this.productList2.push(result[i])
	    }
	    else {
	      this.productList3.push(result[i])
	    }
	  }
	}).catch(error => {})
      },
      checkdetail(id) {
	this.$router.push({path: '/skillsdetail',query: {skid: id}})
      }
    },
    mounted() {
      this.getinfo()
    }
  }
</script>

<style lang="scss" scoped>
.title {
  border-top: #999 solid 2px;
  border-bottom: #999 solid 2px;
  width: 1040px;
  span {
    display: inline-block;
    a {
      color: #3f5ea0;
    }
    a:hover {
      font-weight: bold;
    }
  }
}
.main ul {
  margin-top: 10px;
  padding-bottom: 20px;
  li {
    font-size: 17px;
    margin-top: 15px;
    margin-left: 10px;
    list-style: none; 
  }
}
</style>
