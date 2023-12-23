<script setup lang="ts">

import {reactive, ref} from "vue";
import {
  ElNotification,
  type FormInstance, genFileId, type UploadInstance,
  type UploadProps,
  type UploadRawFile,
  type UploadUserFile
} from "element-plus";
import {useRouter} from "vue-router";
import axios from "axios";
import {SERVER_ADDR} from "@/config";
import verifyFileSize from "~/utils/file"
import {useUserStore} from "@/stores/user";

const poster = ref()
const router = useRouter();
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  date: '',
  department: ''
})

const rules = reactive({
  name: [
    {required: true, message: '此字段为必填项', trigger: 'change'},
    {min: 4, max: 32, message: '名称长度不符合要求(4-32)', trigger: 'change'},
    {pattern: /^[\u4e00-\u9fa5a-zA-Z\d]*$/, message: '名称只能包含中文、字母和数字', trigger: 'change'}],
  date: [
    {required: true, trigger: 'change'}
  ],
  department: [
    {required: true, message: '此字段为必填项', trigger: 'change'},
    {min: 2, max: 16, message: '部门名称长度不符合要求(2-16)', trigger: 'change'},
    {pattern: /^[\u4e00-\u9fa5\d]*$/, message: '部门名称只能包含中文和数字', trigger: 'change'}],
  poster: [
    {required: true, message: '请上传海报', trigger: 'change'}
  ]
})

const user = useUserStore()

const submitForm = async (formEL: FormInstance | undefined) => {
  if (!formEL) return
  await formEL.validate(async (valid) => {
    if (!valid) return
    try {
      formData.append('name', ruleForm.name)
      formData.append('date', ruleForm.date)
      formData.append('department', ruleForm.department)
      formData.append('username', user.username)
      await axios.post(
          SERVER_ADDR + "/api/users/application",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    } catch (error) {
      console.log(error)
      ElNotification({
        offset: 70,
        title: '提交错误'
      })
    }
  })
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

let formData = new FormData()

const handleExceed: UploadProps['onExceed'] = (files) => {
  poster.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  poster.value!.handleStart(file)
}

function handleChange(uploadFile, uploadFiles){
  if(!verifyFileSize(uploadFile)){
    if(poster.value){
      formData = new FormData()
      poster.value.clearFiles()
      ElNotification({
        offset: 70,
        title: '上传错误'
      })
      return
    }
  }
  console.log(uploadFile)
  formData.append("file", uploadFile.raw)

}

</script>

<template>
  <el-form class="demo-ruleForm"
           ref="ruleFormRef"
           :model="ruleForm"
           :rules="rules"
           label-width="120px">
    <el-form-item label="海报名称" prop="name">
      <el-input v-model="ruleForm.name" type="text"/>
    </el-form-item>
    <el-form-item label="活动时间" prop="date">
      <el-date-picker v-model="ruleForm.date"
                      type="date"
                      placeholder="选择日期"/>
    </el-form-item>
    <el-form-item label="部门/组织" prop="department">
      <el-input v-model="ruleForm.department" type="text"/>
    </el-form-item>
    <el-form-item label="海报" prop="poster">
      <el-upload
        ref="poster"
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        list-type="picture"
        :limit="1"
        :auto-upload=false
      >
        <el-button type="primary">选取图片</el-button>
        <template #tip>
          <div class="el-upload__tip">
            小于10MB
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-row justify="center">
      <el-col :span="12" style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" >
            提交
          </el-button>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button @click="this.$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>

</style>