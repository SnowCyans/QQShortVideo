<template>
    <!-- 头部内容 -->
    <div class="workTop">
        <van-icon @click="router.go(-1)" name="arrow-left" color="#ececec" />
        <div>
            <van-icon name="search" size="20px" color="#838383" />
            <input type="text" placeholder="搜你想看的" />
            <span></span>
            <p>搜索</p>
        </div>
    </div>

    <!-- 视频组件 -->
    <videocom :playsData="workData" :workFlag="true"></videocom>
</template>

<script setup>
import videocom from '../../components/videocom.vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive } from 'vue';


// 路由
let router = useRouter()
let route = useRoute()
let workData = reactive(JSON.parse(route.query.workData))
</script>

<style scoped lang="less">
.workTop {
    position: fixed;
    top: 30px;
    left: 0;
    padding: 0 20px 0 0;
    width: 95%;
    z-index: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    div {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        height: 40px;
        padding: 0 10px 0 5px;
        border-radius: 10px;
        background-color: #333333;

        input {
            font-size: 16px;
            width: 60%;
            height: 30px;
            background-color: #333333;
            border: 0;
            margin-left: 3px;
            color: #fff;
        }

        input::-webkit-input-placeholder {
            color: #bababa;
            font-size: 14px;
        }

        span {
            width: 1px;
            height: 16px;
            background-color: #9b9b9b;
            position: absolute;
            top: 30%;
            right: 23%;
        }

        p {
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            font-size: 14px;
            color: #e6e6e6;
        }

    }
}
</style>
