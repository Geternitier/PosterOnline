<script setup lang="ts">

import {useUserStore} from "@/stores/user";

defineProps({
  pageIndex: String
})

const user = useUserStore()

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
  </el-menu>
</template>

<style scoped>

</style>