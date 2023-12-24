<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import AuditComponent from "@/components/AuditComponent.vue";

const user = useUserStore()
</script>

<template>
  <el-container>
    <el-header  style="position: fixed; width: 100%">
      <MenuComponent page-index="/audit"/>
    </el-header>
    <el-main style="margin-top: 10vh">
      <AuditComponent v-if="user.username!==''"/>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>