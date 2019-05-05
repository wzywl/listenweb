<template>
  <div class="table_width">
    <el-row>
      <el-col :span="2" style="float: right;">
	<el-button type="primary" @click="addskills">新增</el-button>
      </el-col>
    </el-row>
    <el-table border :data="productList">
      <el-table-column prop="sktitle" label="标题"></el-table-column>
      <el-table-column prop="sktype" label="所属">
	<template slot-scope="scope">
	  {{sktype|filtersFun(scope.row)}}
	</template>
      </el-table-column>
      <el-table-column prop="skcreatetime" label="创建时间"></el-table-column>
      <el-table-column label="操作">
	<template slot-scope="scope">
	  <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
	  <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
	</template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
	@current-change="handleCurrentChange"
	layout="prev,pager,next,jumper"
	:page-count="pagecount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
	sktype: '',
	productList: [],
	pageindex: 1,
	pagesize: 6,
	pagecount: 1
      }
    },
    filters: {
      filtersFun(val,row) {
	if(row.sktype === "1") {
	  return val = '听力技巧'
	}
	else if(row.sktype === "2") {
	  return val = '写作技巧'
	}
	else {
	  return val = '学习技巧'
	}
      }
    },
    methods: {
      getinfo() {
	this.$axios.get('http://192.168.137.128:3000/getskillsinfo',{
	  params: {
	    username: getCookie('username'),
	    token: getCookie('token'),
	    pageindex: this.pageindex,
	    pagesize: this.pagesize
	  }
	}).then(response => {
	  this.productList = response.data.result
	  this.pagecount = response.data.pagecount
	}).catch(error => {})
      },
      handleCurrentChange(val) {
	this.pageindex = val
	this.getinfo()
      },
      addskills() {
	this.$router.push({path: '/admin/changeskills'})
      },
      handleEdit(row) {
	this.$router.push({path: '/admin/changeskills',query: {skid: row.skid}})
      },
      handleDelete(row) {
	this.$confirm('是否删除','提示', {
	  confirmButtonText: '确定',
	  cancelButtonText: '取消'
	}).then(() => {
	  this.$axios.get('http://192.168.137.128:3000/deleteskills', {
	    params: {
	      token: getCookie('token'),
	      username: getCookie('username'),
	      skid: row.skid
	    }
	  }).then(response => {
	    this.$message({
	      message: response.data.result,
	      type: 'success'
	    })
	    this.getinfo()
	  }).catch(error => {})
	}).catch(() => {})
      }
    },
    mounted() {
      this.getinfo()
    }
  }
</script>

<style lang="scss" scoped>
.table_width {
  width: 100%;
}
.el-table {
  width: 100%;
}
.block {
  text-align: center;
  margin-top: 10px;
}
.el-row {
  padding: 10px 0px;
}
.left {
  padding-left: 5px;
}
</style>
