<template>
  <div class="height">
    <div>
      <el-header>
	<div class="tip_left">
	  欢迎来到听力训练管理系统
	</div>
	<div class="tip_right">
	  <el-dropdown>
	    <i class="el-icon-setting" style="margin-right: 15px;"></i>
	    <el-dropdown-menu slot="dropdown">
	      <el-dropdown-item @click.native="jump('/admin/manageuser')">个人信息</el-dropdown-item>
	      <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
	    </el-dropdown-menu>
	  </el-dropdown>
	  <span>{{username}}</span>
	</div>
      </el-header>
    </div>
    <el-container>
      <el-aside>
	<el-menu :default-active="this.$route.path" router :unique-opened="true">
	  <template v-for="(item,index) in productList">
	    <el-submenu :index="index+''">
	      <template slot="title">
		<span>{{item.name}}</span>
	      </template>
		<el-menu-item v-for="(it,ind) in item.result" :key="ind" :index="it.url">
		  {{it.title}}
		</el-menu-item>
	    </el-submenu>
	  </template>
	</el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
	productList: [
	  {name: '地图测试',result:[{title: '地图轨迹测试',url: '/admin/map'},{title: '电子围栏测试',url: '/admin/map2'}]},
	  {name: '用户信息',result:[{title: '用户信息管理',url: '/admin/manageuser'}]},
	  {name: '资源管理',result:[{title: '音频资源管理',url: '/admin/managesources'}]},
	  {name: '技巧管理',result:[{title: '技巧信息管理',url: '/admin/manageskills'}]}
	],
	username: ''
      }
    },
    methods: {
      //登录
      logout() {
	this.$confirm('确认退出吗?','提示', {
	  confirmButtonText: '确认',
	  cancelButtonText: '取消',
	  type: 'warning'
	}).then(() => {
	  delCookie('token')
	  this.$router.push('/login')
	}).catch(() => {})
      },
      jump(url) {
	this.$router.push(url)
      }
    },
    mounted() {
      this.username = getCookie('username')
    }
  }
</script>
<style scoped>
.height {
  height: 100%;
}
.el-header {
  background-color: #EFF2F7;
  line-height: 60px;
  height: 80px;
}
.el-container {
  height: calc(100% - 61px);
  width: 100%;
}
.el-aside {
  background-color: #D3DCE6;
  height: 100%;
}
.el-submenu.is-active {
  background-color: #D3DCE6;
}
.el-submenu {
  background-color: #D3DCE6;
}
.tip_left {
  float: left;
}
.tip_right {
  float: right;
  margin-right: 40px;
}
.el-main {
  width: 100%;  
}
</style>
