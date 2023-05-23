<template>
    <div class="navtop-content">
        <van-icon @click="showToast('暂未开放')" name="apps-o" size="22" color="#fff" />

        <!-- 如果位于首页显示这个 -->
        <div v-if="homeFlag">
            <i @click="handleTabs(i)" v-for="(item, i) in navData" :key="i"
                :class="i === videoStore.playsData.navIndex ? 'activeColor' : ''">{{
                    item
                }}</i>
        </div>

        <van-icon @click="showToast('暂未开放')" name="setting-o" size="22" color="#fff" />
    </div>
    <div></div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useVideoStore } from '../store/videos'
import { showToast } from 'vant';


// 定义数据
const navData = reactive(['音乐类', '风景类', '看剧类', '推荐'])

// 子组件接收父组件传来的值
const props = defineProps({
    homeFlag: Boolean
})
// 子组件向父组件传值
const emits = defineEmits(['changeTabs', 'chatFlag'])

// 获取store里的数据
let videoStore = useVideoStore()
videoStore.handleRecom() //触发actions

// 监听视频分类的值做出相应操作
watch(() => (videoStore.playsData.navIndex), (newValue) => {
    videoStore.$patch(() => {
        // 推荐
        if (newValue === 3) {
            videoStore.playsData = videoStore.recomData
        } else if (newValue === 2) { //看剧类
            videoStore.playsData = videoStore.dramaData
        } else if (newValue === 1) { //风景类
            videoStore.playsData = videoStore.landscapeData
        } else if (newValue === 0) { //音乐类
            videoStore.playsData = videoStore.musicData
            emits('chatFlag', true)
        } else {
            console.log('没有咯');
        }
        videoStore.playsData.navIndex = newValue
    })

}, { deep: true })



function handleTabs(i) {
    emits('changeTabs', true)  //将当前点击的标签传给父组件
    videoStore.$patch(() => {
        if (i === 3) {
            console.log('推荐');
            videoStore.playsData = videoStore.recomData
        } else if (i === 2) {
            console.log('看剧类');
            videoStore.playsData = videoStore.dramaData
        } else if (i === 1) {
            console.log('风景类');
            videoStore.playsData = videoStore.landscapeData
        }
        else {
            console.log('音乐类');
            videoStore.playsData = videoStore.musicData
            emits('chatFlag', true)
        }
    })

    videoStore.$patch(() => {
        videoStore.playsData.navIndex = i
    })
}

</script>

<style scoped lang="less">
.navtop-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    opacity: 0.7;
    width: 95%;
    height: 50px;

    div {
        width: 68%;
        display: flex;
        justify-content: space-between;

        i {
            font-family: cursive;
            color: #fff;
            font-size: 16px;
        }
    }


}

// 选中样式
.activeColor {
    color: #7EE9F2 !important;
    transform: scale(1.2);
    font-weight: 800;
}
</style>
