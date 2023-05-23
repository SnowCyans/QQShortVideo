<template>
    <!-- 导航栏组件 -->
    <navBar v-if="workFlag !== true" @changeTabs="changeTabs" @chatFlag="chatFlag" :homeFlag="true">
    </navBar>

    <!-- 播放视频 -->
    <div class="content">
        <van-swipe :initial-swipe="playsData.swipeIndex" @drag-end="dragEnd" @drag-start="dragStart"
            :show-indicators="false" style="height: 100%;" vertical :lazy-render="true">
            <van-swipe-item v-for="(item, i) in props.playsData.videos" :key="i">
                <div class="videos" @touchstart="touchStart" @touchend="touchEnd">
                    <img @click.stop="videoPlay(i)" v-show="item.imgFlag" :src="item.bgImg" class="videos" alt="">
                    <video v-show="item.imgFlag !== true" @click.stop="videoPlay(i)" :muted="playMuted" preload="auto"
                        ref="videos" id="videos" :class="item.sizeFlag ? 'videosize' : 'videos'" :src="item.videoUrl" loop>
                        当前设备不支持该视频播放
                    </video>
                </div>

                <!-- 播放与暂停按钮 -->
                <div v-if="playShow" @click="videoPlay(i)" class="conPlay">
                    <van-icon name="play" color="#fff" size="50" />
                </div>
                <!-- 右侧边栏 -->
                <div class="right-info">
                    <img @click.stop="jump()" :src="item.imgUrl" alt="">
                    <!-- 未关注显示 -->
                    <div @click="handleAddCol()" v-if="userColl" class="addCol">
                        <van-icon name="plus" size="14" color="#fff" />
                    </div>
                    <div>
                        <van-icon @click.stop="handleLike(i)" name="like" size="30"
                            :color="item.likeFlag && userItem ? '#f9476f' : '#fff'" />
                        <p>{{ item.likeTotal }}</p>
                    </div>
                    <div>
                        <van-icon @click.stop="handleChat()" name="chat" size="30" color="#fff" />
                        <p>{{ chatCount }}</p>
                    </div>
                    <div>
                        <van-icon @click.stop="handlecollection(i)" name="star" size="30"
                            :color="item.collectionFlag && userItem ? '#ffb701' : '#fff'" />
                        <p>{{ item.collTotal }}</p>
                    </div>
                    <div>
                        <van-icon @click.stop="handleShare()" name="share" size="30" color="#fff" />
                        <p>66</p>
                    </div>
                </div>

                <!-- 简介 -->
                <div class="video-text">
                    <div class="title">
                        <h4 @click.stop="jump()">@{{ item.name }}</h4>
                        <i>{{ item.time }}</i>
                    </div>
                    <p>{{ item.text }}</p>
                </div>

                <!-- 静音 -->
                <div v-if="playMuted" @click.stop="handleMuted()" class="muted">
                    <van-icon name="volume" size="28" />
                    <div class="moutedslash"></div>
                    <div class="moutedslashs"></div>
                </div>

                <!-- 模板 -->
                <div v-else class="temp">
                    <img :src="item.imgUrl" :class="playShow ? '' : 'roteActive'" alt="">
                </div>
            </van-swipe-item>
        </van-swipe>

    </div>
    <!-- 评论窗口 -->
    <van-action-sheet v-model:show="chatShow" :overlay="false" title="评论">
        <div class="chatContent" v-for="(item, i) in chatArr" :key="i">
            <img :src="item.chatImg" alt="">
            <div>
                <i>{{ item.name }}</i>
                <span v-if="item.flag || playsData.flag">作者</span>
                <p v-if="item.chatTextShow" style="color: gray;">！[该评论已被隐藏]</p>
                <p v-else>{{ item.chatText }}</p>
            </div>
            <div>
                <van-icon @click="handleChatLike(item)" :name="item.chatLikeShow ? 'like' : 'like-o'" size="16"
                    :color="item.chatLikeShow ? '#f9476f' : ''" />
                &nbsp;&nbsp;
                <van-icon @click="item.chatTextShow = !item.chatTextShow" :name="item.chatTextShow ? 'eye' : 'closed-eye'"
                    size="16" />
            </div>
        </div>
        <div class="chatSplit"></div>
        <div class="chatValue">
            <div>
                <van-icon name="photo-o" @click="showToast('暂未开放')" />
                <input type="text" @keyup.enter="publish()" v-model.trim="chatText" placeholder="善语结善缘，恶言伤人心">
                <div @click="publish()">
                    <p>发送</p>
                </div>
            </div>
        </div>
    </van-action-sheet>

    <!-- 分享组件 -->
    <van-share-sheet @select="select" v-model:show="shareShow" :overlay="false" title="立即分享" :options="options" />

    <!-- 底部内容作者作品组件显示 -->
    <div v-if="workFlag" class="workBottom">
        <input type="text" @keyup.enter="publish()" placeholder="善语结善缘，恶言伤人心" v-model.trim="chatText">
        <van-icon name="guide-o" @click="publish()" color="#fff" />
    </div>
</template>

<script setup>
import navBar from '../components/navBar.vue'
import { ref, getCurrentInstance, computed, watch } from 'vue';
import { showToast } from 'vant'
import { useRouter } from 'vue-router';
import { useVideoStore } from '../store/videos'
import { storeToRefs } from 'pinia';

// 定义数据
let dbClick = ref(false)      //判断是否是双击
let playShow = ref(true)      //控制视频播放与暂停
let playMuted = ref(true)     //控制是否静音
let playIndex = ref(-1)        //切换视频后当前视频的索引
let shareShow = ref(false);   //显示或隐藏分享面板
const options = [             //分享面板数据
    [
        { name: '微信', icon: 'wechat' },
        { name: 'QQ', icon: 'qq' },
        { name: '复制链接', icon: 'link' },
    ],
];
let chatShow = ref(false)     //显示或隐藏评论窗口
let chatIndex = ref(0)        //当前视频的评论索引
let chatText = ref('')        //评论内容
let isFlag = ref(false)       //是否是当前用户评论

// 手势滑动数据(左右滑动)
let touchStartX = ref(0)
let touchStartY = ref(0)
let delta = ref(50)

// 获取当前组件实例
let { proxy } = getCurrentInstance()

// 路由
let router = useRouter()

// 获取pinia里的数据
let videoStore = useVideoStore()
// 使pinia里state变成响应式数据
let { musicData } = storeToRefs(videoStore)

let props = defineProps({
    playsData: {
        type: Object,
        required: true
    },
    workFlag: {
        type: Boolean,
        default: false
    }
})

// 监听
watch(() => (props.playsData.isPlay), (newValue) => {
    // 如果为null不做操作
    if (newValue === null) {
        return
    }
    // 如果是false代表打开登录组件 暂停视频 
    else if (newValue === false) {
        console.log(chatIndex.value);
        proxy.$refs.videos[chatIndex.value].pause()
    }
    // 如果是true代表关闭登录组件 继续播放视频
    else if (newValue === true) {
        proxy.$refs.videos[chatIndex.value].play()
    }
})

// 计算属性
//未登录直接不显示 是当前用户的作品也不显示关注图标 如已登录但是未关注作者显示
let userColl = computed(() => {
    return props.playsData.collectionFlag !== true && props.playsData.flag !== true || localStorage.getItem('Qy') === null
})
// 是否登录
let userItem = computed(() => {
    return localStorage.getItem('Qy') !== null
})
// 当前视频的评论
let chatArr = computed(() => {
    let arr = []
    videoStore.playsData.videos.forEach((item, i) => {
        if (i == chatIndex.value) {
            item.chat.forEach((item) => {
                return arr.push(item)
            })
        }

    })
    return arr
})
// 当前视频的评论总数
let chatCount = computed(() => {
    return videoStore.playsData.videos[chatIndex.value].chat.length
})

// 方法(事件)
// 播放或暂停视频
function videoPlay(i) {
    // 如果评论或分享面板开启中就只关闭它们
    if (chatShow.value === true || shareShow.value === true) {
        chatShow.value = false
        shareShow.value = false
    } else {
        let timer = null
        clearTimeout(timer)
        dbClick.value = !dbClick.value
        timer = setTimeout(() => {
            // 单机
            if (dbClick.value === true) {
                // 播放视频
                if (playShow.value === true) {
                    proxy.$refs.videos[i].play()
                    playShow.value = false
                } else {
                    proxy.$refs.videos[i].pause()
                    playShow.value = true

                }
            } else {
                //    双击
                playShow.value = false
                playMuted.value = false
                if (props.playsData.videos[chatIndex.value].likeFlag === false) {
                    showToast({
                        icon: 'like',
                        message: '已点赞'
                    })
                    videoStore.$patch(() => {
                        props.playsData.videos[chatIndex.value].likeFlag = true
                    })
                }

            }
            dbClick.value = false
        }, 300)
    }


}
// 点击解除静音
const handleMuted = () => {
    playMuted.value = false
    playShow.value = false
}
// 触摸开始(左右滑动)
function touchStart(e) {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY;
}
// 触摸结束(左右滑动)
function touchEnd(e) {
    let deltaX = e.changedTouches[0].clientX - touchStartX.value
    let deltaY = e.changedTouches[0].clientY - touchStartY.value
    // X轴的滑动距离大于 delta，此次事件是以X轴移动为主（左滑或者右滑）；
    if (Math.abs(deltaX) > delta.value && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX >= 0) {
            console.log("右滑")
            playShow.value = false
            if (videoStore.playsData.navIndex !== 0) {
                videoStore.$patch(() => {
                    videoStore.playsData.navIndex--
                })
            } else {
                showToast('前面没有咯~')
            }
        } else {
            console.log('左滑');
            playShow.value = false
            if (videoStore.playsData.navIndex !== 3) {
                videoStore.playsData.navIndex++
            } else {
                //跳转到作者页面
                router.push({
                    path: '/authorHome',
                    query: {
                        dataObj: JSON.stringify(props.playsData)
                    }
                })
            }
        }
    } else {
        // console.log("可能是误触")
    }
}
// 自定义事件(子组件传回来的值)
function changeTabs(flag) {
    playShow.value = flag
}
// 上下滑动开始触发
function dragStart(e) {
    proxy.$refs.videos[e.index].pause()
    playShow.value = false
}
// 上下滑动结束触发
function dragEnd(e) {
    proxy.$refs.videos[e.index].play()
    playIndex.value = e.index
    chatIndex.value = e.index  //当前视频的评论索引
    videoStore.$patch(() => {
        props.playsData.backHomeIndex = e.index
    })
}
// 点击+号关注
const handleAddCol = () => {
    playShow.value = false
    if (localStorage.getItem('Qy') !== null) {
        videoStore.$patch(() => {
            props.playsData.collectionFlag = true
            props.playsData.fanTotal++
        })
        showToast('关注成功')
    } else {
        showToast('登录后才可以关注')
    }
}
// 跳转至作者详情页
function jump() {
    if (props.workFlag) {
        router.go(-1)
    } else {
        router.push({
            path: '/authorHome',
            query: {
                dataObj: JSON.stringify(props.playsData)
            }
        })
    }
}
// 是否喜欢
const handleLike = (i) => {
    playShow.value = false
    if (localStorage.getItem('Qy') !== null) {
        if (props.playsData.videos[i].likeFlag) {
            videoStore.$patch(() => {
                props.playsData.videos[i].likeFlag = false
                props.playsData.videos[i].likeTotal--
            })
        } else {
            videoStore.$patch(() => {
                props.playsData.videos[i].likeFlag = true
                props.playsData.videos[i].likeTotal++
            })
        }
    } else {
        showToast('登录后才可以点赞哦~')
    }

}
// 点击评论图标
const handleChat = () => {
    playShow.value = false
    chatShow.value = !chatShow.value
}
// 是否收藏
function handlecollection(i) {
    playShow.value = false
    if (localStorage.getItem('Qy') !== null) {
        if (props.playsData.videos[i].collectionFlag) {
            videoStore.$patch(() => {
                props.playsData.videos[i].collectionFlag = false
                props.playsData.videos[i].collTotal--
            })
            showToast('已取消')
        } else {
            videoStore.$patch(() => {
                props.playsData.videos[i].collectionFlag = true
                props.playsData.videos[i].collTotal++
            })
            showToast('已收藏')
        }
    } else {
        showToast('登录后才可以收藏哦~')
    }

}
// 自定义事件 切换到音乐类触发
const chatFlag = (e) => {
    isFlag.value = e
    if (localStorage.getItem('Qy') !== null) {
        videoStore.$patch(() => {
            props.playsData.flag = e
        })
    } return

}
// 发布评论
const publish = () => {
    if (localStorage.getItem('Qy') !== null) {
        if (chatText.value !== '') {
            let { name, img } = musicData.value
            let chat = {
                name: name,
                chatImg: img,
                chatLikeShow: false,
                chatTextShow: false,
                chatText: chatText.value
            }
            videoStore.addChatData(chat, chatIndex.value)
            showToast('评论成功')
            chatText.value = ''
        } else {

            showToast('内容不可为空哦~')
        }
    } else {
        chatText.value = ''
        showToast('登录后才可以评论哦~')
    }
}
// 评论点赞
const handleChatLike = (item) => {
    if (localStorage.getItem('Qy') !== null) {
        item.chatLikeShow = !item.chatLikeShow
    } else {
        showToast('登录后才可以点赞评论哦~')
    }
}
// 点击分享图标
const handleShare = () => {
    playShow.value = false
    shareShow.value = !shareShow.value
}
// 复制链接
const select = (e) => {
    if (localStorage.getItem('Qy') !== null) {
        if (e.name === '复制链接') {
            let qwe = 'https://snowcyans.github.io/QQShortVideo/#/'
            navigator.clipboard.writeText(qwe)
            showToast('复制成功')
            shareShow.value = false
        } else {
            showToast('暂未开放')
        }
    } else {
        showToast('登录后才可以分享哦~')
    }
}

</script>

<style scoped lang="less">
.content {
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}

.videos {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.videosize {
    width: 100%;
    height: 100%;
    object-fit: contain;


}

// 控制播放
.conPlay {
    position: absolute;
    top: 0;
    left: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

// 右侧边栏
.right-info {
    position: absolute;
    right: 10px;
    top: 28%;
    height: 300px;
    display: flex;
    flex-direction: column; //设置排列方向为纵向
    align-items: center;
    justify-content: space-between;

    img {
        border: 3px solid #fff;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        object-fit: cover;
    }

    .addCol {
        position: absolute;
        top: 15%;
        left: 35%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background-color: #f9476f;
        text-align: center;

        :deep(.van-icon-plus) {
            vertical-align: 15%;
        }
    }

    p {
        font-size: 12px;
        color: #fff;
        margin: 0;
        text-align: center;
    }

}

// 评论窗口内样式
.chatContent {
    padding: 10px 15px 20px;
    // margin-bottom: 40px;
    display: flex;
    justify-content: space-between;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    div {
        padding-left: 10px;
        font-size: 12px;

        span {
            margin-left: 5px;
            display: inline-block;
            width: 33px;
            height: 19px;
            line-height: 19px;
            border-radius: 5px;
            color: #fff;
            transform: scale(0.9);
            text-align: center;
            background-color: #f9476f;
        }

        p {
            width: 230px;
            font-size: 14px;
            word-wrap: break-word; //强制换行
        }
    }
}

.chatSplit {
    margin-bottom: 50px;
}

// 发布评论
.chatValue {
    text-align: center;
    background-color: #ffffff;
    padding: 8px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    div {
        height: 50px;
        background-color: #f2f2f2;
        border-radius: 25px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        input {
            width: 240px;
            height: 30px;
            border: 0;
            background-color: #f2f2f2;
            font-size: 16px;
        }

        // placeholder颜色
        input::-webkit-input-placeholder {
            color: #aab2bd;
            font-size: 16px;
        }

        div {
            background-color: #f9476f;
            width: 60px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            font-size: 16px;
            color: #fff;
            text-align: center;
        }
    }
}

// 视频介绍
.video-text {
    position: absolute;
    left: 10px;
    bottom: 12%;
    color: #fff;
    font-size: 16px;

    .title {
        display: flex;
        align-items: baseline; //第一行文字基线对齐

        h4 {
            margin: 0 10px 10px 0;
        }

        i {
            color: gray;
        }
    }


    p {
        margin: 0;
        width: 250px;
        overflow: hidden;
        font-size: 14px;
        font-family: cursive; //草书字体
        word-wrap: break-word; //强制换行
    }
}

// 静音
.muted {
    position: absolute;
    bottom: 12%;
    right: 15px;
    width: 50px;
    height: 50px;
    line-height: 56px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;

    :deep(.van-icon-volume) {
        vertical-align: 4%;
    }

    // 静音图标空白符
    .moutedslash {
        position: absolute;
        left: -8px;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        line-height: 100px;
        width: 2px;
        height: 30px;
        transform: rotate(140deg);
        background-color: #fff;
    }

    // 静音图标斜线
    .moutedslashs {
        position: absolute;
        left: -4px;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        line-height: 100px;
        width: 2px;
        height: 33px;
        transform: rotate(140deg);
        background-color: #000000;
    }
}

// 模板
.temp {
    position: absolute;
    bottom: 12%;
    right: 15px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        animation: rotateImg 8s linear 0s infinite forwards;
        animation-play-state: paused;
    }
}

.workBottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    input {
        // 透明背景
        background-color: rgba(0, 0, 0, 0, 1);
        border: 0;
        margin-right: 5px;
        color: #fff;
        font-size: 16px;
        width: 75%;
        padding: 8px 0;
    }

    input::-webkit-input-placeholder {
        color: #bababa;
        font-size: 14px;
    }

    :deep(.van-icon-guide-o) {
        vertical-align: middle;
    }
}

/* 旋转动画 */
@keyframes rotateImg {
    0% {
        transform: rotateZ(0);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

/* 开启图片旋转动画 */
.roteActive {
    animation-play-state: running !important;
}
</style>
