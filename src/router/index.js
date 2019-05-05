import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Admin from '@/components/Admin.vue'
import User from '@/components/User.vue'
//import HelloWorld from '@/components/HelloWorld'
const Map = resolve => require(['../components/Map.vue'],resolve)
const Map2 = resolve => require(['../components/Map2.vue'],resolve)
const Manageuser = resolve => require(['../components/Manageuser.vue'],resolve)
const Managesources = resolve => require(['../components/Managesources.vue'],resolve)
const Addsources = resolve => require(['../components/Addsources.vue'],resolve)
const Manageskills = resolve => require(['../components/Manageskills.vue'],resolve)
const Changeskills = resolve => require(['../components/Changeskills.vue'],resolve)
const Getskills = resolve => require(['../components/Getskills.vue'],resolve)
const Skillsdetail = resolve => require(['../components/SkillsDetail.vue'],resolve)
const Getsources = resolve => require(['../components/Getsources.vue'],resolve)
const Listensources = resolve => require(['../components/Listensources.vue'],resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login 
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/admin',
      name: '管理员',
      component: Admin,
      children: [
	{
	  path: 'map',
	  name: '地图',
	  component: Map
	},
	{
	  path: 'map2',
	  name: '电子围栏',
	  component: Map2
	},
	{
	  path: 'manageuser',
	  name: '用户信息管理',
	  component: Manageuser
	},
	{
	  path: 'managesources',
	  name: '音频信息管理',
	  component: Managesources
	},
	{
	  path: 'addsources',
	  name: '添加资源',
	  component: Addsources
	},
	{
	  path: 'manageskills',
	  name: '管理技巧',
	  component: Manageskills
	},
	{
	  path: 'changeskills',
	  name: '新增修改技巧',
	  component: Changeskills
	}
      ]
    },
    {
      path: '/user',
      name: '用户',
      component: User
    },
    {
      path: '/getskills',
      name: 'getskills',
      component: Getskills
    },
    {
      path: '/skillsdetail',
      name: 'skillsdetail',
      component: Skillsdetail
    },
    {
      path: '/getsources',
      name: 'getsources',
      component: Getsources
    },
    {
      path: '/listensources',
      name: 'listensources',
      component: Listensources
    }
  ]
})
