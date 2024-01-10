<script setup lang="ts">
import {usePosterStore} from "@/stores/poster";
import {SERVER_ADDR} from "@/config";
import PosterOnShow from "@/components/PosterOnShow.vue";
import {ref} from "vue";

const posters = usePosterStore()

const imageList = ref([
  {key: 'babala', image: 'src/assets/2022Concert/babala.png'},
  {key: 'shenhe', image: 'src/assets/2022Concert/shenhe.png'},
  {key: 'wanye', image: 'src/assets/2022Concert/wanye.png'},
  {key: 'yunjin', image: 'src/assets/2022Concert/yunjin.png'}
])

</script>

<template>
  <el-row style="min-height: 80vh">
    <el-col :span="6" style="max-height: 80vh">
      <el-button style="padding: 20px" @click="posters.update('已审核')">更新海报列表</el-button>
      <el-divider/>
      <el-scrollbar style="height: 100%; max-height: 69vh" >
        <el-card v-for="poster in posters.posters" style="padding: 10px; width: 100%;margin-bottom: 5px">
          <el-col>
            <el-image :src="SERVER_ADDR+'/api/'+poster.filepath" style="width: 100%"/>
            <el-text style="padding: 5px">{{poster.name}}</el-text>
            <el-row><el-text style="padding: 5px">{{poster.date}}</el-text></el-row>
            <el-text style="padding: 5px">{{poster.department}}</el-text>
          </el-col>
        </el-card>
      </el-scrollbar>
    </el-col>
    <el-col :span="18">
      <PosterOnShow/>
    </el-col>
  </el-row>
</template>

<style scoped>
</style>