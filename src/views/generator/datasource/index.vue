<template>
  <div class="app-container">
    <el-card class="m-20">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="m-20">
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
      >
        <el-table-column
          prop="id"
          header-align="center"
          align="center"
          label="主键"
        />
        <el-table-column
          prop="name"
          header-align="center"
          align="center"
          label="别名"
        />
        <el-table-column
          prop="url"
          header-align="center"
          align="center"
          label="jdbcurl"
        />
        <el-table-column
          prop="username"
          header-align="center"
          align="center"
          label="用户名"
        />
        <el-table-column
          prop="password"
          header-align="center"
          align="center"
          label="密码"
        />
        <el-table-column
          prop="createTime"
          header-align="center"
          align="center"
          label="创建时间"
        />
        <el-table-column
          prop="updateTime"
          header-align="center"
          align="center"
          label="更新"
        />
        <el-table-column
          prop="delFlag"
          header-align="center"
          align="center"
          label="删除标记"
        />
        <el-table-column
          prop="tenantId"
          header-align="center"
          align="center"
          label="租户ID"
        />
        <el-table-column
          prop="dsType"
          header-align="center"
          align="center"
          label="数据库类型"
        />
        <el-table-column
          prop="confType"
          header-align="center"
          align="center"
          label="配置类型"
        />
        <el-table-column
          prop="dsName"
          header-align="center"
          align="center"
          label="数据库名称"
        />
        <el-table-column
          prop="instance"
          header-align="center"
          align="center"
          label="实例"
        />
        <el-table-column
          prop="port"
          header-align="center"
          align="center"
          label="端口"
        />
        <el-table-column
          prop="host"
          header-align="center"
          align="center"
          label="主机"
        />
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
            <el-button type="text" size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pd-t-20">
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
        />
      </div>
    </el-card>

    <!-- 弹窗, 新增 / 修改 -->
    <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import { page } from '@/api/generator/genDatasourceConf'
export default {
  components: {
  },
  data() {
    return {
      dataForm: {
        key: ''
      },
      searchForm: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      page(Object.assign({
        current: this.pageIndex,
        size: this.pageSize
      })).then(response => {
        this.dataList = response.data.records
        this.totalPage = response.data.total
      })
      this.dataListLoading = false
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      // this.$confirm('是否确认删除ID为' + id, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(function() {
      //   return delObj(id)
      // }).then(data => {
      //   this.$message.success('删除成功')
      //   this.getDataList()
      // })
    }
  }
}
</script>
