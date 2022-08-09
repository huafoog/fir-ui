<template>
  <el-dialog title="基本信息" :visible.sync="showDialog" width="80%">
    <el-tabs @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in list" :key="index" :label="item">{{ item }}</el-tab-pane>
    </el-tabs>
    <div class="content">
      <pre>
        <span class="btn-pre-copy" @click="copy()">{{ text }}</span>
        {{ htmlText }}
        </pre>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button type="primary" @click="down">下 载</el-button>
    </div>
  </el-dialog>
</template>
<script>
import dialogMixin from '@/mixins/dialogMixin'
export default {
  mixins: [dialogMixin],
  data() {
    return {
      text: '复制代码',
      form: {
        author: '',
        comments: '',
        dsName: '',
        moduleName: '',
        packageName: '',
        tableName: '',
        tablePrefix: ''
      },
      htmlText: '',
      list: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.list = Object.keys(this.initParams.data)
    this.htmlText = this.initParams.data[this.list[0]]
  },
  methods: {
    async preview() {
    },
    down() {

    },
    handleClick(item) {
      this.text = '复制代码'
      this.htmlText = this.initParams.data[item.label]
    },
    copy() {
      this.text = '复制成功'
      var textarea = document.createElement('textarea') // 创建input对象
      textarea.value = this.htmlText // 设置复制内容
      document.body.appendChild(textarea) // 添加临时实例
      textarea.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(textarea) // 删除临时实例
    }
  }
}
</script>
<style>

.content pre{
    position: relative;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
}
pre .btn-pre-copy{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    color: hsla(0,0%,54.9%,.8);
    transition: color .1s;
}

</style>
