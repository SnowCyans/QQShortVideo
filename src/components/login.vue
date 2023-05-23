<template>
    <van-popup v-model:show="props.loginShow" @open="open" position="bottom" :style="{ height: '100%' }">
        <div class="loginPage">
            <!-- 顶部 -->
            <div class="loginTop">
                <van-icon @click="popClose()" name="cross" />
                <van-icon name="setting-o" />
            </div>

            <!-- 登陆方式2 -->
            <div v-if="loginWay">
                <!-- 用户 -->
                <div class="loginWayUser">
                    <h6>登录后，体验完整功能</h6>
                    <p>156****9828</p>
                    <p>认证服务由鹤壁QQ提供</p>
                </div>
                <!-- 登录 -->
                <div class="loginConfirm">
                    <p @click="login()">一键登录</p>
                    <p @click="loginWay = false">账号登录</p>
                    <div>
                        <van-checkbox @change="checkChanges" v-model="checkeds" icon-size="16"
                            checked-color="#fc2b55">已阅读并同意<span>用户协议</span>
                            <i>和</i>
                            <span>隐私政策</span>
                        </van-checkbox>
                    </div>
                </div>
            </div>

            <!-- 登陆方式1 -->
            <div v-else>
                <!-- 用户 -->
                <div class="loginUser">
                    <h6>登录后，体验完整功能</h6>
                    <img src="/image/xishi2.png" alt="">
                    <p>QQ</p>
                </div>
                <!-- 登录 -->
                <div class="loginConfirm">
                    <p @click="login()">已此账号登录</p>
                    <p @click="loginWay = true">切换登录方式</p>
                    <div>
                        <van-checkbox @change="checkChange" v-model="checked" icon-size="16"
                            checked-color="#fc2b55">已阅读并同意<span>用户协议</span>
                            <i>和</i>
                            <span>隐私政策</span>
                        </van-checkbox>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script setup>
import { ref } from 'vue';
import { showToast, closeToast } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { useVideoStore } from '../store/videos'

// 定义数据
let checked = ref(false)
let checkeds = ref(false)
let loginWay = ref(false)

// 路由
const router = useRouter()

// 接收bottomBar组件传来的值
const props = defineProps({
    loginShow: {
        type: Boolean,
        default: false
    },
    playsData: Object
})

// 向父组件传值
let emits = defineEmits(['logigClose'])

// 获取store里的数据
let userStore = useUserStore()
let videoStore = useVideoStore()
// 事件
// 勾选1
function checkChange(e) {
    checked.value = e
}
// 勾选2
function checkChanges(e) {
    checkeds.value = e
}

function login() { // 登录
    if (checked.value === true || checkeds.value === true) {
        showToast({
            type: 'loading',
            message: '登录中',
            onOpened: function () {
                emits('logigClose', false)
                router.push({
                    path: '/'
                })
                // 关闭轻提示
                closeToast()
            }
        })
        // 触发pinia中user模块的actions
        userStore.dataLongTime()

    } else {
        showToast({
            message: '请勾选协议'
        })
    }
}

// 关闭弹出层
function popClose() {
    emits('logigClose', false)
    videoStore.$patch(() => {
        props.playsData.isPlay = true
    })
}

// 弹出层打开后暂停视频播放
function open() {
    // 修改isPlay用来做登录组件打开时候的判断
    videoStore.$patch(() => {
        props.playsData.isPlay = false
    })
}

</script>

<style scoped lang="less">
.loginPage {
    padding: 20px;

    // 顶部
    .loginTop {
        display: flex;
        justify-content: space-between;
    }

    // 登录用户
    .loginUser {
        margin-top: 90px;
        text-align: center;

        h6 {
            font-size: 16px;
            font-family: cursive; //草书字体
        }

        img {
            width: 80px;
            height: 80px;
            margin-top: 10px;
            border-radius: 50%;
            object-fit: cover;
        }

        p {
            font-size: 20px;
            margin: 10px 0 0 0;
        }
    }

    // 切换登录方式
    .loginWayUser {
        margin-top: 90px;
        text-align: center;

        h6 {
            font-size: 14px;
            font-family: cursive; //草书字体
        }

        p {
            font-size: 30px;
            margin: 10px 0 0 0;
        }

        &>p:nth-child(3) {
            color: gray;
            font-size: 12px;
            font-weight: 400;
            transform: scale(0.9);
        }
    }

    // 确认登陆
    .loginConfirm {
        margin-top: 60px;
        text-align: center;

        p {
            width: 270px;
            margin-left: 10%;
            height: 37px;
            line-height: 37px;
            border-radius: 10px;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            background-color: #fc2b55;
            font-family: cursive;
        }

        &>p:nth-child(2) {
            height: 36px;
            color: #000000;
            background-color: #fff;
            border: 1px solid #000;
        }

        div {
            margin-left: 9.5%;

            :deep(.van-checkbox__label) {
                margin-left: -5px;
                font-size: 14px;
                transform: scale(0.9);
                font-family: cursive;
            }

            span {
                margin-left: 3px;
                color: #08467b;
                font-weight: 600;
            }

            i {
                font-style: normal;
            }
        }


    }
}
</style>
