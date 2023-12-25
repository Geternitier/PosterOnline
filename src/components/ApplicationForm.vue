<script setup lang="ts">

import {reactive, ref} from "vue";
import {
  ElNotification,
  type FormInstance, genFileId, type UploadInstance,
  type UploadProps,
  type UploadRawFile
} from "element-plus";
import axios from "axios";
import {SERVER_ADDR} from "@/config";
import verifyFileSize from "@/utils/file"
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

const router = useRouter()
const poster = ref()
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  date: Date,
  department: '',
  description: ''
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
  description: [
    {required: true, message: '请填写描述信息', trigger: 'change'},
    {min: 10, max: 100, message: '描述长度不符合要求(10-100)', trigger: 'change'}
  ]
})

const user = useUserStore()

const submitForm = async (formEL: FormInstance | undefined) => {
  if (!formEL) return
  await formEL.validate(async (valid) => {
    if (!valid) return
    try {
      const date = formatDate(new Date(ruleForm.date))
      formData.append('name', ruleForm.name)
      formData.append('date', date)
      formData.append('department', ruleForm.department)
      formData.append('username', user.username)
      formData.append('description', ruleForm.description)
      console.log(date)
      await axios.post(
          SERVER_ADDR + "/api/application",
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
      return
    }
    ElNotification({
      offset: 70,
      title: '提交成功'
    })
    await router.push('/')
  })
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以+1
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
                      format="YYYY-MM-DD"
                      placeholder="选择日期"/>
    </el-form-item>
    <el-form-item label="部门/组织" prop="department">
      <el-input v-model="ruleForm.department" type="text"/>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ruleForm.description" :rows="3" type="textarea"/>
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