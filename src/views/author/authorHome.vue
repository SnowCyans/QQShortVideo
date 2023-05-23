<template>
    <!-- 顶部导航组件 -->
    <levelNavBar :account="authorData"></levelNavBar>
    <!-- 用户信息组件 -->
    <accountInfo :account="authorData"></accountInfo>
</template>

<script setup>
import levelNavBar from '../../components/levelNavBar.vue'
import accountInfo from '../../components/accountInfo.vue'
import { useRoute } from 'vue-router'
import { reactive } from 'vue';

const route = useRoute()  //路由


// 获取上个路由传递来的参数
let authorData = reactive(JSON.parse(route.query.dataObj))
</script>

<style scoped lang="less"></style>
