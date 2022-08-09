<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="resourceIds" prop="resourceIds">
        <el-input v-model="dataForm.resourceIds" placeholder="resourceIds" />
      </el-form-item>
      <el-form-item label="clientSecret" prop="clientSecret">
        <el-input v-model="dataForm.clientSecret" placeholder="clientSecret" />
      </el-form-item>
      <el-form-item label="scope" prop="scope">
        <el-input v-model="dataForm.scope" placeholder="scope" />
      </el-form-item>
      <el-form-item label="authorizedGrantTypes" prop="authorizedGrantTypes">
        <el-input v-model="dataForm.authorizedGrantTypes" placeholder="authorizedGrantTypes" />
      </el-form-item>
      <el-form-item label="webServerRedirectUri" prop="webServerRedirectUri">
        <el-input v-model="dataForm.webServerRedirectUri" placeholder="webServerRedirectUri" />
      </el-form-item>
      <el-form-item label="authorities" prop="authorities">
        <el-input v-model="dataForm.authorities" placeholder="authorities" />
      </el-form-item>
      <el-form-item label="accessTokenValidity" prop="accessTokenValidity">
        <el-input v-model="dataForm.accessTokenValidity" placeholder="accessTokenValidity" />
      </el-form-item>
      <el-form-item label="refreshTokenValidity" prop="refreshTokenValidity">
        <el-input v-model="dataForm.refreshTokenValidity" placeholder="refreshTokenValidity" />
      </el-form-item>
      <el-form-item label="additionalInformation" prop="additionalInformation">
        <el-input v-model="dataForm.additionalInformation" placeholder="additionalInformation" />
      </el-form-item>
      <el-form-item label="autoapprove" prop="autoapprove">
        <el-input v-model="dataForm.autoapprove" placeholder="autoapprove" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="canSubmit" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/admin/oauthclientdetails'

export default {
  data() {
    return {
      visible: false,
      canSubmit: false,
      dataForm: {
        clientId: 0,
        resourceIds: '',

        clientSecret: '',

        scope: '',

        authorizedGrantTypes: '',

        webServerRedirectUri: '',

        authorities: '',

        accessTokenValidity: '',

        refreshTokenValidity: '',

        additionalInformation: '',

        autoapprove: ''

      },
      dataRule: {
        resourceIds: [
          { required: true, message: 'resourceIds不能为空', trigger: 'blur' }
        ],

        clientSecret: [
          { required: true, message: 'clientSecret不能为空', trigger: 'blur' }
        ],

        scope: [
          { required: true, message: 'scope不能为空', trigger: 'blur' }
        ],

        authorizedGrantTypes: [
          { required: true, message: 'authorizedGrantTypes不能为空', trigger: 'blur' }
        ],

        webServerRedirectUri: [
          { required: true, message: 'webServerRedirectUri不能为空', trigger: 'blur' }
        ],

        authorities: [
          { required: true, message: 'authorities不能为空', trigger: 'blur' }
        ],

        accessTokenValidity: [
          { required: true, message: 'accessTokenValidity不能为空', trigger: 'blur' }
        ],

        refreshTokenValidity: [
          { required: true, message: 'refreshTokenValidity不能为空', trigger: 'blur' }
        ],

        additionalInformation: [
          { required: true, message: 'additionalInformation不能为空', trigger: 'blur' }
        ],

        autoapprove: [
          { required: true, message: 'autoapprove不能为空', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    init(id) {
      console.log(id)
      this.dataForm.clientId = id || ''
      this.visible = true
      this.canSubmit = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.clientId) {
          getObj(this.dataForm.clientId).then(response => {
            this.dataForm = response.data
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.canSubmit = false
          if (this.dataForm.clientId) {
            putObj(this.dataForm).then(data => {
              this.$notify.success('修改成功')
              this.visible = false
              this.$emit('refreshDataList')
            }).catch(() => {
              this.canSubmit = true
            })
          } else {
            addObj(this.dataForm).then(data => {
              this.$notify.success('添加成功')
              this.visible = false
              this.$emit('refreshDataList')
            }).catch(() => {
              this.canSubmit = true
            })
          }
        }
      })
    }
  }
}
</script>
