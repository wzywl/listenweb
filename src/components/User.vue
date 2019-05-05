<template>
  <div>
    <headtop></headtop>
    <h1 class="tip">学习使我快乐</h1>
    <el-carousel style="height: 300px;">
      <el-carousel-item v-for="(item,index) in ImgList" :key="index">
	<img :src="item.imgpath" style="width: 100%;height: 100%;">
      </el-carousel-item>
    </el-carousel>
    <div class="skills">
      <skills></skills>
    </div>
    <div class="foot">
      <foot></foot>
    </div>
  </div>
</template>

<script>
import headtop from './Head.vue'
import skills from './Skills.vue'
import foot from './Footer.vue'
  export default {
    data() {
      return {
	ImgList: [
	  {imgpath: '../../static/images/banner1.jpg'},
	  {imgpath: '../../static/images/banner2.jpg'},
	  {imgpath: '../../static/images/banner3.jpg'},
	  {imgpath: '../../static/images/banner4.jpg'}
	]
      }
    },
    components: {
      headtop,
      skills,
      foot
    }
  }
</script>

<style lang="scss">
.tip {
  margin: 30px 0px;
  text-align: center;
  color: red;
}
.el-carousel__container {
  width: 1000px;
  margin: auto;
  height: 300px;
  position: relative;
}
.skills {
  margin-top: 40px;
  margin-left: 240px;
}
</style>
