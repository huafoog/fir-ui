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
              :data="dataList"
              border
              v-loading="dataListLoading">
          <el-table-column
                  prop="clientId"
                  header-align="center"
                  align="center"
                  label="clientId">
          </el-table-column>
          <el-table-column
                  prop="resourceIds"
                  header-align="center"
                  align="center"
                  label="resourceIds">
          </el-table-column>
          <el-table-column
                  prop="clientSecret"
                  header-align="center"
                  align="center"
                  label="clientSecret">
          </el-table-column>
          <el-table-column
                  prop="scope"
                  header-align="center"
                  align="center"
                  label="scope">
          </el-table-column>
          <el-table-column
                  prop="authorizedGrantTypes"
                  header-align="center"
                  align="center"
                  label="authorizedGrantTypes">
          </el-table-column>
          <el-table-column
                  prop="webServerRedirectUri"
                  header-align="center"
                  align="center"
                  label="webServerRedirectUri">
          </el-table-column>
          <el-table-column
                  prop="authorities"
                  header-align="center"
                  align="center"
                  label="authorities">
          </el-table-column>
          <el-table-column
                  prop="accessTokenValidity"
                  header-align="center"
                  align="center"
                  label="accessTokenValidity">
          </el-table-column>
          <el-table-column
                  prop="refreshTokenValidity"
                  header-align="center"
                  align="center"
                  label="refreshTokenValidity">
          </el-table-column>
          <el-table-column
                  prop="additionalInformation"
                  header-align="center"
                  align="center"
                  label="additionalInformation">
          </el-table-column>
          <el-table-column
                  prop="autoapprove"
                  header-align="center"
                  align="center"
                  label="autoapprove">
          </el-table-column>
        <el-table-column
                header-align="center"
                align="center"
                label="操作">
          <template slot-scope="scope">
                                    <el-button type="text" size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row.clientId)">修改</el-button>
            <el-button type="text" size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.clientId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pd-t-20">
        <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="totalPage"
                background
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>




      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></table-form>
    </basic-container>
  </div>
</template>

<script>
  import {fetchList, delObj} from '@/api/admin/oauthclientdetails'
  import TableForm from './form'
  export default {
    data () {
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
    components: {
      TableForm
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
       getDataList () {
        this.dataListLoading = true
        fetchList(Object.assign({
          current: this.pageIndex,
          size: this.pageSize
        })).then(response => {
          this.dataList = response.data.records
          this.totalPage = response.data.total
        })
        this.dataListLoading = false
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm('是否确认删除ID为' + id, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(id)
        }).then(data => {
          this.$message.success('删除成功')
          this.getDataList()
        })
      }
    }
  }
</script>
