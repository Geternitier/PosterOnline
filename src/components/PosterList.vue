<script setup lang="tsx">
import {Poster, usePosterStore} from "@/stores/poster";
import {ElButton, ElNotification} from "element-plus";
import {computed, ref} from "vue";
import axios from "axios";
import {SERVER_ADDR} from "@/config";
const props = defineProps<{
  index: string
}>()

const posters = usePosterStore()
const dialogVisible = ref(false)
const UrlOnShow = ref('')
function clickImg(poster){
  UrlOnShow.value = SERVER_ADDR+'/api/'+poster.filepath
  dialogVisible.value = true
}

function handleClose(){
  dialogVisible.value = false
}

function pass(poster: Poster){
  const postUrl = SERVER_ADDR+'/api/posters/pass?name='+poster.name
  console.log("POST "+postUrl)
  axios.post(postUrl)
      .then(response => {
        if(response.status === 200){
          console.log(response.data)
          ElNotification({
            offset: 70,
            title: '通过《'+poster.name+'》成功',
            duration: 1500
          })
          posters.update(props.index)
        }
      })
      .catch(error => {
        console.log(error)
        ElNotification({
          offset: 70,
          title: '通过《'+poster.name+'》失败',
          duration: 1500
        })
      })
}

function withdraw(poster: Poster){
  const postUrl = SERVER_ADDR+'/api/posters/withdraw'
  const data = {name: poster.name}
  console.log("POST "+postUrl)
  console.log(data)
  axios.post(postUrl, data)
      .then(response => {
        if(response.status === 200){
          ElNotification({
            offset: 70,
            title: '撤回《'+poster.name+'》成功'
          })
          posters.update(props.index)
          return
        }
      })
      .catch(error => {
        console.log(error)
        ElNotification({
          offset: 70,
          title: '撤回《'+poster.name+'》失败'
        })
      })
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
              <el-button v-if="index==='已审核'||index==='未审核'" @click="withdraw(props.row)">撤回</el-button>
            </el-row>
          </el-col>
          <div style="flex-grow: 1" />
          <el-col :span="6" class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="SERVER_ADDR+'/api/'+props.row.filepath"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :alt="props.row.name"
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