<template>
    <videocom :playsData="playsData"></videocom>
    <!-- 底部栏组件 -->
    <bottomBar :playsData="playsData"></bottomBar>
</template>

<script setup>
import videocom from '../components/videocom.vue'
import bottomBar from '../components/bottomBar.vue'
import { useVideoStore } from '../store/videos'
import { storeToRefs } from 'pinia';


// 获取pinia里的数据
let videoStore = useVideoStore()
// 使pinia里state变成响应式数据
let { playsData } = storeToRefs(videoStore)


</script>

<style scoped lang="less"></style>
