<template>
  <el-dialog title="基本信息" :visible.sync="showDialog">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="表名" :label-width="formLabelWidth">
        <el-input v-model="form.tableName" disabled />
      </el-form-item>
      <el-form-item label="包名" :label-width="formLabelWidth">
        <el-input v-model="form.packageName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="模块名称" :label-width="formLabelWidth">
        <el-input v-model="form.moduleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="表前缀" :label-width="formLabelWidth">
        <el-input v-model="form.tablePrefix" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作者" :label-width="formLabelWidth">
        <el-input v-model="form.author" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.comments" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button type="primary" @click="preview">预 览</el-button>
      <el-button type="primary" @click="down">下 载</el-button>
    </div>
  </el-dialog>
</template>
<script>
import dialogMixin from '@/mixins/dialogMixin'
import { preview, code } from '@/api/generator/generator'
import axios from 'axios'
export default {
  mixins: [dialogMixin],
  data() {
    return {
      isPreview: false,
      form: {
        author: '',
        comments: '',
        name: '',
        moduleName: '',
        packageName: '',
        tableName: '',
        tablePrefix: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    params: function() {
      return this.initParams
    }
  },
  created() {
    this.form.tableName = this.params.tableName
  },
  methods: {
    async preview() {
      const config = { headers: { 'ds': this.params.name }}
      const res = await preview(this.form, config)
      this.initParams.cb(res)
    },
    async down() {
      // await code(this.form)
      // console.log(process.env)
      // const arrays = Object.keys(this.form)
      // let params = '&'
      // for (let index = 0; index < arrays.length; index++) {
      //   const element = arrays[index]
      //   params += element + '=' + this.form[element] + '&'
      // }
      // const url = API_CONFIG.devServer.proxy + '/generator/generator/code' + params
      // window.open(url)
      this.downFile('/generator/generator/code')
    },
    downFile(url) {
      axios.post(url, this.form, { responseType: 'blob', headers: { 'ds': this.params.name }})
        .then(res => {
          const blob = new Blob([res.data])
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = this.form.tableName + `.zip` // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          // const elink = document.createElement('a')
          // elink.download = 'xxx1.xlsx'
          // elink.style.display = 'none'
          // const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          // const href = URL.createObjectURL(blob)
          // elink.href = href
          // document.body.appendChild(elink)
          // elink.click()
          // document.body.removeChild(elink)
          // window.URL.revokeObjectURL(href)
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }
}
</script>
