<script setup lang="ts">
import {ref} from "vue";

const originList = [
  {key: 'babala', image: 'src/assets/2022Concert/babala.png'},
  {key: 'shenhe', image: 'src/assets/2022Concert/shenhe.png'},
  {key: 'wanye', image: 'src/assets/2022Concert/wanye.png'},
  {key: 'yunjin', image: 'src/assets/2022Concert/yunjin.png'}
]

const imageList = ref([
  {key: 'babala', image: 'src/assets/2022Concert/babala.png'},
  {key: 'shenhe', image: 'src/assets/2022Concert/shenhe.png'},
  {key: 'wanye', image: 'src/assets/2022Concert/wanye.png'},
  {key: 'yunjin', image: 'src/assets/2022Concert/yunjin.png'}
])

const blank = {key: 'blank', image: 'src/assets/blank.png'}

const start = ref(null)
const end = ref(null)

function dragStart ($event, key) {
  start.value = key
  console.log("Start value turns to"+start.value)
}

function dragEnter ($event, key) {
  if(key===start.value){
    return
  }
  end.value = key
  console.log("enter "+end.value)
  console.log("End value turns to "+end.value)
}

function dragLeave ($event, key) {
  if(key === start.value){
    return
  }
  console.log("leave "+end.value)
  end.value = null
  console.log("End value turns to null")
}

function dragEnd ($event, key) {
  if(key === start.value){
    return
  }
  if(start.value !== end.value && end.value !== null){
    let from = imageList.value.findIndex(i => i.key === start.value)
    let to = imageList.value.findIndex(i => i.key === end.value)
    let origin = imageList.value[from]
    imageList.value[from] = imageList.value[to]
    imageList.value[to] = origin
    console.log(start.value+" switch with "+end.value)
  }
}

</script>

<template>
  <div class="container">
    <div class="image_box"
         draggable="true"
         @dragover.prevent
         @dragstart="dragStart($event, imageList[0].key)"
         @dragenter="dragEnter($event, imageList[0].key)"
         @dragleave="dragLeave($event, imageList[0].key)"
         @dragend="dragEnd">
      <img :src='imageList[0].image' :alt=imageList[0].key>
    </div>
    <div class="image_box"
         draggable="true"
         @dragover.prevent
         @dragstart="dragStart($event, imageList[1].key)"
         @dragenter="dragEnter($event, imageList[1].key)"
         @dragleave="dragLeave($event, imageList[1].key)"
         @dragend="dragEnd">
      <img :src=imageList[1].image :alt=imageList[1].key>
    </div>
    <div class="image_box"
         draggable="true"
         @dragover.prevent
         @dragstart="dragStart($event, imageList[2].key)"
         @dragenter="dragEnter($event, imageList[2].key)"
         @dragleave="dragLeave($event, imageList[2].key)"
         @dragend="dragEnd">
      <img :src=imageList[2].image :alt=imageList[2].key>
    </div>
    <div class="image_box"
         draggable="true"
         @dragover.prevent
         @dragstart="dragStart($event, imageList[3].key)"
         @dragenter="dragEnter($event, imageList[3].key)"
         @dragleave="dragLeave($event, imageList[3].key)"
         @dragend="dragEnd">
      <img :src=imageList[3].image :alt=imageList[3].key>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  margin: 20px;
  max-width: 3860px;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  background-color: aliceblue;
}
.image_box {
  width: 25%;
  margin: 5px;
  padding-top: 15vh;
  height: 0;
}
.image_box img {
  width: 100%;
}
</style>