<template>
    <div class="bottom">
        <van-tabbar @change="handleChange" route v-model="active" active-color="#7EE9F2" :border="false"
            inactive-color="#dee1e6">
            <van-tabbar-item to="/" icon="home-o"></van-tabbar-item>
            <van-tabbar-item icon="replay"></van-tabbar-item>
            <van-tabbar-item icon="add-o"></van-tabbar-item>
            <van-tabbar-item icon="friends-o"></van-tabbar-item>
            <van-tabbar-item to="/my" icon="contact"></van-tabbar-item>
        </van-tabbar>
    </div>
    <login @logigClose="logigClose" :loginShow="loginShow" :playsData="props.playsData"></login>
</template>

<script setup>
import login from '../components/login.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 路由
const router = useRouter()

// 定义数据
let active = ref(0)
let loginShow = ref(false)

let props = defineProps({
    playsData: Object
})

// 自定义事件 子组件向父组件传递数据
function logigClose(e) {
    loginShow.value = e
}

// 点击对应底部标签触发
function handleChange(e) {
    if (e === 1) {
        location.reload()
    } else if (e === 2) {
        console.log('发布视频');
    } else if (e === 3) {
        console.log('朋友');
    }
    else if (e === 4) {
        //点击我的底部导航栏跳转至我的页面 在路由文件里做跳转判断
        router.push({
            path: '/my'
        })
        // 如果未登录的话显示登录组件
        if (localStorage.getItem('Qy') === null) {
            loginShow.value = true
        }
    }
}

</script>

<style scoped lang="less">
.bottom {
    position: fixed;
    left: 0;
    width: 100%;
}

:deep(.van-tabbar) {
    background-color: black;
    height: 55px;
}

:deep(.van-tabbar-item) {
    background-color: black;
    height: 55px;
}

:deep(.van-icon) {
    font-size: 20px;
}

:deep(.van-tabbar-item__text) {
    font-size: 14px;
}

:deep(.van-icon-add-o) {
    font-size: 26px;
    color: #fff;
}
</style>
