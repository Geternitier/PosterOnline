<script setup lang="ts">
import {useUserStore} from "@/stores/user";

const user = useUserStore()
</script>

<template>
  <el-container>
    <el-header  style="position: fixed; width: 100%">
      <MenuComponent page-index="/audit"/>
    </el-header>
    <el-main style="margin-top: 10vh">
      <HelloWorld msg="Hello World!" v-if="user.username===''"/>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>