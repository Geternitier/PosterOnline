<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import ApplicationForm from "@/components/ApplicationForm.vue";

const user = useUserStore()
</script>

<template>
  <el-container>
    <el-header  style="position: fixed; width: 100%">
      <MenuComponent page-index="/application"/>
    </el-header>
    <el-main style="margin-top: 10vh">
      <el-card shadow="hover" v-if="user.username!==''">
        <ApplicationForm />
      </el-card>
      <Title v-if="user.username===''"/>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>