<template>
    <!-- 背景图片 -->
    <div class="lenavBg">
        <img :src="props.account.img" alt="">
    </div>
    <!-- 导航栏 -->
    <div class="topNav">
        <div><van-icon @click="backHome()" name="arrow-left" size="20px" color="#c8d2d6" /></div>
        <p class="blank"></p>
        <div><van-icon name="search" size="20px" color="#c8d2d6" /></div>
        <div v-if="props.logOut" @click="show = true"><van-icon name="ellipsis" size="20" color="#c8d2d6" /></div>
        <div v-else><van-icon name="ellipsis" size="20px" color="#c8d2d6" /></div>
    </div>
    <div class="author">
        <img :src="props.account.img" alt="">
        <div>
            <p>{{ props.account.videos[0].name }}</p>
            <span>Q音号：{{ props.account.num }}</span>
        </div>
        <div v-if="props.logOut" @click="show = true" class="switch">
            <van-icon name="play" size="12" />
        </div>
    </div>

    <!-- 退出登录弹出层 -->
    <div>
        <van-popup v-model:show="show" position="bottom" round :close-on-popstate="true" :style="{ height: '23%' }">
            <div class="logout">
                <div>
                    <img :src="account.img" alt="">
                    <div>
                        <p>{{ account.name }}
                        <p class="ptwo">{{ account.likeTotal }}获赞 • {{ account.fanTotal }}粉丝</p>
                        </p>
                    </div>
                    <van-radio-group v-model="checked" checked-color="#f9476f">
                        <van-radio :name="checked"></van-radio>
                    </van-radio-group>
                </div>
                <div @click="toggle()">
                    <div><van-icon name="plus" color="#70707a" size="24px" /></div>
                    <p>退出登录或切换账号</p>
                    <span></span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useVideoStore } from '../store/videos'

let videoStore = useVideoStore()

let router = useRouter() // 路由

// 定义数据
let show = ref(false)
let checked = ref(true)

// 接收父组件传来的值
const props = defineProps({
    logOut: {
        type: Boolean,
        default: false
    },
    // 父组件传来的数据
    account: {
        type: Object,
        required: true
    }
})

// 返回主页
const backHome = () => {
    videoStore.$patch(() => {
        // 将轮播索引切换到进入页面时的值
        videoStore.playsData.swipeIndex = videoStore.playsData.backHomeIndex
    })
    router.go(-1)
}

// 切换账号
const toggle = () => {
    localStorage.removeItem('Qy')
    show.value = false
    location.reload()
}
</script>

<style scoped lang="less">
.lenavBg {
    width: 100%;
    height: 230px;

    img {
        width: 100%;
        height: 230px;
        object-fit: cover;
        background-color: black;
    }
}

.topNav {
    position: absolute;
    top: 15px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    div {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        background: rgba(159, 149, 149, 0.6);

        :deep(.van-icon) {
            vertical-align: 0%;
        }
    }

    .blank {
        width: 200px;
        border-radius: 0;
    }

}

// 退出登录
:deep(.van-popup--bottom) {
    background-color: #151724;
}

.logout {
    width: 100%;
    color: #fff;

    div {
        padding: 0 10px;
        width: 94%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }

        p {
            font-size: 20px;
        }

        .ptwo {
            font-size: 14px;
            font-family: cursive;
            color: #7a7c88;
            margin: 0;
        }

        :deep(.van-radio-group) {
            text-align: right;
            width: 30px;
        }
    }

    &>div:nth-child(2) {

        div {
            width: 25px;
            height: 42px;
            line-height: 35px;
            border-radius: 100%;
            background-color: #3b3b43;
            text-align: center;
        }

        :deep(.van-icon-plus) {
            margin-left: 1px;
        }

        p {
            margin-left: 10px;
            width: 280px;
            font-size: 16px;
            font-family: cursive;
        }

        span {
            display: block;
            width: 170px;
        }
    }
}



.author {
    position: absolute;
    top: 105px;
    left: 15px;
    display: flex;
    align-items: center;


    img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #fff;
    }

    div {
        margin-left: 15px;

        p {
            margin: 0;
            font-size: 16px;
            color: #fff;
            // margin-bottom: 5px;
        }

        span {
            font-size: 12px;
            color: #c1c1c1;
        }
    }

    .switch {
        position: absolute;
        top: 26%;
        left: 65%;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        background: rgba(93, 86, 86, 0.6);

        .van-icon-play {
            color: #fff;
            transform: rotate(90deg);
            vertical-align: 17%;

        }
    }
}
</style>
