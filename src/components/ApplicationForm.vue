<script setup lang="ts">

import {useRouter} from "vue-router";
import {reactive, ref} from "vue";

const router = useRouter();
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  association: '',
  date: '',
  place: '',
  description: ''
})

const onSubmit = () => {
  console.log('submit!')
}

</script>

<template>
  <el-form :model="ruleForm"
           ref="ruleFormRef"
           label-width="120px"
           class="demo-ruleForm">
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name" type="text"/>
    </el-form-item>
  </el-form>

</template>

<style scoped>

</style>