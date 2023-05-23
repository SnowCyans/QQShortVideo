<template>
    <!-- 导航栏组件 -->
    <levelNavBar :logOut="true" :account="musicData"></levelNavBar>
    <accountInfo :myUser="true" :account="musicData"></accountInfo>
    <!-- 底部栏组件 -->
    <bottomBar></bottomBar>
</template>

<script setup>
import levelNavBar from '../components/levelNavBar.vue'
import accountInfo from '../components/accountInfo.vue'
import bottomBar from '../components/bottomBar.vue'
import { useVideoStore } from '../store/videos'
import { storeToRefs } from 'pinia';

let videoStore = useVideoStore()
// 使pinia里state变成响应式数据
let { musicData } = storeToRefs(videoStore)
console.log(musicData);

</script>

<style scoped></style>
