<script setup lang="ts">

import {h, reactive, ref} from "vue";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import axios from "axios";
import {useUserStore} from "@/stores/user";

const user = useUserStore();
const router = useRouter();
const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [
    {required: true, message: '此字段为必填项', trigger: 'change'},
    {min: 4, max: 16, message: '用户名长度不符合要求(4-16)', trigger: 'change'},
    {pattern: /^[a-zA-Z\d_]*$/, message: '用户名只能包含字母,数字,下划线', trigger: 'change'}],
  password: [
    {required: true, message: '此字段为必填项', trigger: 'change' },
    {min: 8, max: 24, message: '密码长度不符合要求(8-24)', trigger: 'change'},
    {pattern: /^[\x21-\x7e]*$/, message: '密码只能包含字母,数字和符号', trigger: 'change'},
    {pattern: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
     message: '密码未达到复杂性要求:密码必须包含大小写字母和数字', trigger: 'change'}]
})

const submitForm = async (formEL) => {
  if (!formEL) return
  await formEL.validate(async (valid) => {
    if (!valid) return
    try {
      const response = await axios.post(
          'http://localhost:8080/api/users/login',
          {
            username: ruleForm.username,
            password: ruleForm.password
          })
      user.update(
        response.data.username,
        response.data.name,
        response.data.phone,
        response.data.status
      )
    } catch (error) {
      console.log(error)
      ElNotification({
        offset: 70,
        title: '登录错误',
        message: h('i', { style: 'color: teal' }, error.response?.data.msg)
      })
      return
    }

    user.username = '1234'
    user.name = '神高达'
    user.phone = '15026997548'
    user.status = true

    ElNotification({
      offset: 70,
      title: '登录成功'
    })
    await router.push('/')
  })
}

</script>

<template>
  <el-form class="demo-ruleForm"
           ref="ruleFormRef"
           :model="ruleForm"
           :rules="rules"
           label-width="120px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" autocomplete="off" type="password" show-password/>
    </el-form-item>
    <el-row justify="center">
      <el-col :span="12" style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" >
            登录
          </el-button>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button @click="this.$router.push('/register')">
            注册
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>

</style>