<template>
  <div>
    <div class="head">
      <img src="../../static/images/head.jpg" style="width: 100%;height: 250px;">
      <div class="xf">听力训练网站</div>
    </div>
    <ul class="nav">
      <router-link tag="li" v-for="(item,index) in navList" :key="index" :to="{path: item.path,query: {stype: item.stype}}">
	{{item.name}}
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
	navList: [{name: '首页',path: '/user'},{name: 'cet4',path: '/getsources',stype: 'cet4'},{name: 'cet6',path: '/getsources',stype: 'cet6'},{name: 'news',path: '/getsources',stype: 'news'},{name: 'skills',path: '/getskills'}]
      }
    }
  }
</script>

<style lang="scss" scoped>
.head {
  positon: relative;
  height: 250px;
  .xf {
    position: absolute;
    top: 70px;
    left: calc(50% - 400px);
    font-size: 20px;
    color: white;
  }
}
.nav {
  height: 40px;
  display: flex;
  flex-dirction: row;
  text-align: center;
  background-color: #E8E8E8;
  width: 100%;
  justify-content: center;
  li {
    padding: 10px 50px;
    list-style-type: none;
  }
  li:hover {
    background-color: #E0E0E0;
  }
}
</style>
