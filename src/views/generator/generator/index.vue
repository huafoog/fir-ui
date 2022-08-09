<template>
  <div class="app-container">
    <el-card class="m-20">
      <el-select v-model="name" placeholder="请选择" @change="dsChange">
        <el-option
          v-for="item in selectList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </el-card>
    <el-card class="m-20">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="表名" prop="tableName" />
        <el-table-column label="描述" prop="tableComment" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="gen(scope.row)">生成</el-button>
          </template>

        </el-table-column>
      </el-table>
      <div class="pd-t-20">
        <el-pagination
          :total="pageInfo.total"
          :page-size.sync="pageInfo.size"
          :current-page.sync="pageInfo.current"
          layout="prev, pager, next"
        />
      </div>
      <Form v-if="isShow" :show.sync="isShow" :init-params="initParams" />
      <Preview v-if="isPreview" :show.sync="isPreview" :init-params="initPreviewParams" />
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/generator/genDatasourceConf'
import { page } from '@/api/generator/generator'
import Form from './form.vue'
import Preview from './preview.vue'
export default {
  components: { Form, Preview },
  data() {
    return {
      list: null,
      isPreview: false,
      selectList: [],
      isShow: false,
      initParams: {
      },
      initPreviewParams: {

      },
      name: '',
      pageInfo: {
        total: 0,
        size: 10,
        current: 1
      },
      listLoading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.listLoading = true
      const result = await list()
      this.selectList = result.data
      this.listLoading = false
    },
    async getData(params) {
      const config = { headers: { 'ds': params.name }}
      const res = await page({ ...this.pageInfo, ...params }, config)
      this.list = res.data.records
    },
    dsChange(name) {
      this.getData({ name: name })
    },
    gen(row) {
      this.initParams = {
        name: this.name,
        tableName: row.tableName,
        cb: (res) => {
          this.isPreview = true
          this.initPreviewParams = {
            data: res.data
          }
        }
      }
      this.isShow = true
    }
  }
}
</script>
