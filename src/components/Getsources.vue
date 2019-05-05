<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <div style="flex: 0 0 auto;">
      <headtop></headtop>
    </div>
    <div style="flex: 1 0 auto;margin-top: 20px;margin-left: 240px;">
      <ul>
	<li v-for="(item,index) in productList" :key="index" @click="tzsources(item.sid)">{{item.salt}}</li>
      </ul>
    </div>
    <div style="flex 0 0 auto;">
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
	productList: []
      }
    },
    methods: {
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getsourcesinfodetail',{
	  params: {
	    stype: this.$route.query.stype
	  }
	}).then(response => {
	  this.productList = response.data.result
	})
      },
      tzsources(sid) {
	this.$router.push({path: '/listensources',query: {sid: sid}})
      }
    },
    mounted() {
      this.getinfo()
    },
    components: {
      headtop,
      foot
    },
    watch: {
      "$route": "getinfo"
    }
  }
</script>
