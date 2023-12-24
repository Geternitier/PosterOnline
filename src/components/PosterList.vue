<script setup lang="tsx">
import {Poster, usePosterStore} from "@/stores/poster";
import {ElButton, ElNotification} from "element-plus";
import {ref} from "vue";
defineProps<{
  index: string
}>()

const posters = usePosterStore()
const dialogVisible = ref(false)
const UrlOnShow = ref('')
function clickImg(poster: Poster){
  UrlOnShow.value = poster.url
  dialogVisible.value = true
}

function handleClose(){
  dialogVisible.value = false
}

function pass(poster: Poster){
  ElNotification({
    offset: 70,
    title: '通过：'+poster.name
  })
  posters.update(index)
}

function kickBack(poster: Poster){
  ElNotification({
    offset: 70,
    title: '撤回：'+poster.name
  })
  posters.update(index)
}

</script>
<template>
  <el-table
      :data="posters.posters"
      style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-row style="max-height: 150px">
          <el-col :span="12" style="padding-left: 20px">
            <el-row style="margin-bottom: 20px">{{props.row.description}}</el-row>
            <el-row>
              <el-button type="primary" v-if="index==='未审核'||index==='已撤回'" @click="pass(props.row)">通过</el-button>
              <el-button v-if="index==='已审核'||index==='未审核'" @click="kickBack(props.row)">撤回</el-button>
            </el-row>
          </el-col>
          <div style="flex-grow: 1" />
          <el-col :span="6" class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="props.row.url"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                fit="fit"
                @click="clickImg(props.row)"
            />
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column label="发布日期" prop="date"/>
    <el-table-column label="海报名称" prop="name"/>
    <el-table-column label="部门/组织" prop="department"/>
  </el-table>
  <el-dialog
      v-model="dialogVisible" title="海报展示" :before-close="handleClose">
    <el-image :src="UrlOnShow"
              style="display: flex;justify-content: center;align-items: center;height: 100%;"/>
  </el-dialog>
</template>

<style scoped>

</style>