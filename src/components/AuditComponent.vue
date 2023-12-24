<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {usePosterStore} from "@/stores/poster";

const poster = usePosterStore()
const auditIndex = ref("未审核")
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key)
  auditIndex.value = key
  poster.update(key)
}
</script>

<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
          :default-active="auditIndex"
          @open="handleSelect"
          class="el-menu-vertical-demo"
          @select="handleSelect"
      >
        <el-menu-item index="未审核">
          <span>未审核</span>
        </el-menu-item>
        <el-menu-item index="已审核">
          <span>已审核</span>
        </el-menu-item>
        <el-menu-item index="已撤回">
          <span>已撤回</span>
        </el-menu-item>
        <el-menu-item index="已过期">
          <span>已过期</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <PosterList :index="auditIndex" />
    </el-col>
  </el-row>
</template>

<style scoped>

</style>