<template>
    <!-- 内容 -->
    <div class="myContent">
        <div class="mydata">
            <div v-if="account.isUser">
                <p>{{ account.videos.length }}作品</p>
                <p>{{ userLikeCount }}获赞</p>
                <p>{{ account.collTotal }}关注</p>
                <p>66粉丝</p>
            </div>
            <div v-else>
                <p>{{ account.videos.length }}作品</p>
                <p>{{ likeCountTotal }}获赞</p>
                <p>66关注</p>
                <p>{{ videoStore.playsData.fanTotal }}粉丝</p>
            </div>
            <div>
                <p><van-icon :name="account.sex ? 'fire-o' : 'flower-o'" :color="account.sex ? '#2b80c9' : '#f9476f'"
                        size="16px" /> <span>
                        {{ account.age }}岁
                    </span>
                </p>
                <p>{{ account.address }}</p>
                <p>{{ account.school }}</p>
            </div>
        </div>
        <!-- 当前登录用户显示的内容 -->
        <div v-if="isWork">
            <div>
                <van-tabs @change="tabsChange" v-model:active="active" :swipeable="true" line-width="60px"
                    background="#151724" color="#f9476f" title-active-color="#fff" title-inactive-color="#8b8e97">
                    <van-tab title="作品">
                        <div class="myWork">
                            <div v-for="(item, i) in account.videos" :key="i">
                                <img v-show="item.imgFlag" :src="item.bgImg" alt="">
                                <video v-show="item.imgFlag !== true" preload="metadata" class="videos"
                                    :src="item.videoUrl"></video>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="私密">
                        <div class="mytabstwo">
                            <h6>没有私密作品或相册</h6>
                            <p>设为私密的作品和上传的相册会展示在这里，并且只有你能看到</p>
                        </div>
                    </van-tab>
                    <van-tab title="收藏">
                        <div class="myWork">
                            <div v-for="(item, i) in videoStore.collData" :key="i">
                                <img v-show="item.imgFlag" :src="item.bgImg" alt="">
                                <video v-show="item.imgFlag !== true" preload="metadata" class="videos"
                                    :src="item.videoUrl"></video>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="喜欢">
                        <div class="myWork">
                            <div v-for="(item, i) in videoStore.likeData" :key="i">
                                <img v-show="item.imgFlag" :src="item.bgImg" alt="">
                                <video v-show="item.imgFlag !== true" preload="metadata" class="videos"
                                    :src="item.videoUrl"></video>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <!-- 作者显示的内容 -->
        <div v-else>
            <div class="follw">
                <!-- 已关注显示 -->
                <div class="concerned" v-if="folData">
                    <p @click="folShow = true">已关注 <van-icon name="play" /></p>
                    <p @click="showToast('暂未开放')">私信</p>
                </div>
                <!-- 未关注显示 -->
                <div v-if="noColl" class="noconcerned">
                    <p @click="handleFol()">+关注</p>
                </div>
                <!-- 关注设置弹出层 -->
                <van-popup v-model:show="folShow" closeable close-icon="close" round close-on-popstate position="bottom"
                    :style="{ height: '34%' }">
                    <div class="popTitle">
                        <h3>{{ account.videos[0].name }}</h3>
                        <span>{{ account.num }}</span>
                    </div>
                    <div class="pop">
                        <div>
                            <h6>特别关注</h6>
                            <span class="popspan">作品优先推荐，更新及时提示</span>
                            <van-switch v-model="checked" size="20" active-color="#66dca0" />
                        </div>
                        <div @click="cancelFol()" class="cancel">
                            <h6>取消关注</h6>
                            <!-- 右侧样式 -->
                            <div>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </van-popup>
            </div>
            <!-- 作品 -->
            <div class="myWork">
                <div v-for="(item, i) in account.videos" :key="i">
                    <video @click="handleWork(i)" preload="metadata" class="videos" :src="item.videoUrl"></video>
                    <div class="placeTop">
                        置顶
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { useVideoStore } from '../store/videos';
import { useRouter } from 'vue-router'

// 定义数据
let active = ref(0)
let folShow = ref(false)  //关注设置弹出层
let checked = ref(false)  //特别关注

// 路由
let router = useRouter()


//获取pinia里的数据
let videoStore = useVideoStore()

// 接收父组件传来的值
let props = defineProps({
    // 判断是用户还是作者
    myUser: {
        type: Boolean,
        default: false
    },
    // 父组件传入的数据
    account: {
        type: Object,
        required: true
    }
})
// 用计算属性去筛选
let account = computed(() => {
    return props.account
})
// 是当前用户且已登录显示
let isWork = computed(() => {
    return props.account.isUser && localStorage.getItem('Qy') !== null
})
// 已关注当前作者且已登录
let folData = computed(() => {
    return videoStore.playsData.collectionFlag && localStorage.getItem('Qy') !== null
})
// 未关注作者或未登录显示
let noColl = computed(() => {
    return videoStore.playsData.collectionFlag !== true || localStorage.getItem('Qy') === null
})

// 当前作者的总点赞数
let likeCountTotal = computed(() => {
    return videoStore.playsData.videos.reduce((total, item) => total += item.likeTotal, 0)
})
// 登录用户的总点赞数
let userLikeCount = computed(() => {
    return props.account.videos.reduce((total, item) => total += item.likeTotal, 0)
})

// 点击关注 修改父组件传来的值
const handleFol = () => {
    if (localStorage.getItem('Qy') !== null) {
        videoStore.$patch(() => {
            videoStore.playsData.collectionFlag = true
            videoStore.playsData.fanTotal++
        })
    } else {
        showToast('登录后才可以关注')
    }

}

// 取消关注 修改父组件传来的值
const cancelFol = () => {
    videoStore.$patch(() => {
        videoStore.playsData.collectionFlag = false
        videoStore.playsData.fanTotal--
        videoStore.musicData.collTotal--
    })
    folShow.value = false
}

// 激活的标签改变时触发
function tabsChange(e) {
    if (e === 2) {
        // 收藏的
        videoStore.handleColl()
    } else if (e === 3) {
        // 喜欢的
        videoStore.handleLike()
    }
}

// 点击作品跳转到作者作品页
const handleWork = (i) => {
    // 将当前点击视频的索引赋值给swipeIndex
    videoStore.$patch(() => {
        props.account.swipeIndex = i
    })
    router.push({
        path: '/authorWork',
        query: {
            workData: JSON.stringify(props.account)
        }
    })
}
</script>

<style scoped lang="less">
.myContent {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: -15px;
    background-color: #151724;
    border-radius: 10px;

    .mydata {
        width: 240px;

        div {
            display: flex;
            justify-content: space-evenly;

            p {

                font-size: 14px;
                color: #dfe2e8;
                font-family: cursive;
            }

        }

        &>div:nth-child(2) {
            padding: 0 0 0 10px;
            width: 260px;
            justify-content: flex-start;

            p {
                margin-right: 15px;
                padding: 5px;
                border-radius: 8px;
                background-color: #383b44;

                .van-icon-fire-o {
                    margin-right: 3px;
                }

                span {
                    margin-left: -6px;
                }
            }
        }
    }

    :deep(.van-tab__text) {
        font-size: 16px;
        font-family: cursive;
    }

    // 所有视频样式
    .myWork {
        display: flex;
        flex-wrap: wrap;

        img {
            width: 125px;
            height: 160px;
            object-fit: cover;
        }

        .videos {
            width: 124px;
            height: 160px;
            object-fit: cover;
            margin-bottom: -6px;
            background-color: #3b3b43;
            border-bottom: 1px solid #151724;
            border-right: 1px solid #151724;
        }
    }



    .mytabstwo {
        h6 {
            color: #fff;
            text-align: center;
            margin-bottom: 20px;
        }

        p {
            width: 250px;
            font-size: 14px;
            color: #dfe2e8;
            margin: 0 0 0 60px;
            text-align: center;
        }
    }

}

// 作者显示的内容
// 置顶
.placeTop {
    position: absolute;
    top: 27.5%;
    left: 3%;
    width: 35px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #f8cf11;
    border-radius: 5px;
    font-size: 12px;
}

.follw {
    padding: 0 15px;

    // 已关注
    .concerned {
        width: 100%;
        display: flex;
        justify-content: space-around;

        p {
            width: 47%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-radius: 10px;
            color: #c8cfc3;
            font-size: 18px;
            background-color: #3b3b43;

            .van-icon-play {
                transform: rotate(90deg);
                color: #fff;
            }
        }
    }

    // 弹出层
    :deep(.van-popup--bottom) {
        background-color: #f3f3f3;
    }

    .popTitle {
        padding: 15px 20px;
        display: flex;
        flex-direction: column;

        h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
        }

        span {
            font-size: 12px;
            color: gray;
        }
    }

    .pop {
        margin: 10px 15px;
        border-radius: 10px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;

        div {
            margin: 10px 8px 10px 13px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            h6 {
                margin: 0;
            }

            .popspan {
                position: absolute;
                top: 55%;
                left: 7.5%;
                font-size: 12px;
                color: gray;
            }
        }

        // 取消关注
        .cancel {
            color: #fc2b55;

            div {
                margin-right: 10px;
                width: 23px;
                height: 23px;
                border-radius: 50%;
                background-color: #fc2b55;

                p {
                    width: 3px;
                    height: 15px;
                    text-align: center;
                    margin: 0;
                    transform: rotate(90deg);
                    margin-left: 10px;
                    background-color: #fff;
                }
            }
        }
    }

    // 未关注
    .noconcerned {

        p {
            margin: 10px 0 25px 0;
            border-radius: 20px;
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 18px;
            text-align: center;
            color: #fff;
            background-color: #fc2b55;

        }
    }
}
</style>
