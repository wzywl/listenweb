<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <div style="flex 0 0 auto;">
      <headtop></headtop>
    </div>
    <div style="flex: 1 0 auto;margin-top: 20px;">
      <h3 style="text-align: center">{{productList.sktitle}}</h3>
      <p style="text-indent: 2em">{{productList.skcontext}}</p>
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
	productList: []
      }
    },
    methods: {
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getskillsinfosel',{
	  params: {
	    skid: this.$route.query.skid
	  }
	}).then(response => {
	  this.productList = response.data.result[0]
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

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .skills {
    flex: 1;
  }
}
</style>
