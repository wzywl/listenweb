<template>
  <div>
    <div id="test">

    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {}
    }
  },
  methods: {
    initData() {
      var option = {
	title: {
	  text: '数据测试'
	},
	tooltip: {
	  trigger: 'axis'
	},
	legend: {
	  data: ['餐厅预订','会议室预订','公寓申请','门禁用户数量','办公室房租缴费','办公室水电缴费','公寓房租缴费','公寓水电缴费']
	}
      }
    }
  mounted() {
    this.myChart = echarts.init(document.getElementById('test'))
    this.initData()
  }
</script>
