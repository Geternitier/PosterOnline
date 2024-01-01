<script setup lang="ts">

import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";

defineProps({
  pageIndex: String
})

const user = useUserStore()
const router = useRouter()
function handleExit(){
  user.reset()
  ElNotification({
    offset: 70,
    title: '退出成功',
    duration: 1500
  })
  router.push("/")
}

</script>

<template>
  <el-menu
      :default-active="pageIndex"
      :ellipsis="false"
      :router=true
      class="el-menu-demo"
      mode="horizontal" >
    <el-menu-item index="/">
      <img alt="NJU" src="@/assets/NJU.jpeg" style="height: 50px;padding-right: 10px"/>
      <h3>PosterOnline</h3>
    </el-menu-item>
    <el-menu-item index="/application" v-if="user.username!==''">申请</el-menu-item>
    <el-menu-item index="/manage" v-if="user.status">管理</el-menu-item>
    <el-menu-item index="/audit" v-if="user.status">审核</el-menu-item>
    <div style="flex-grow: 1" />
    <el-menu-item index="/login" v-if="user.username===''">登录</el-menu-item>
    <el-menu-item index="/register" v-if="user.username===''">注册</el-menu-item>
    <el-menu-item v-if="user.username!==''" @click="handleExit">退出</el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>