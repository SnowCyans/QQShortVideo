import { defineStore } from "pinia";
// import { getCurrentInstance } from "vue";

// pinia中使用defineStore方法来定义store
//第一个参数是模块名
//第二个参数是一个对象,store的配置项,比如配置store内的数据
export const useVideoStore = defineStore("videos", {
  // state是一个函数 必须有返回值
  state() {
    return {
      // 要播放的视频数据
      playsData: {
        num: "666666",
        img: "./image/jyz.jpg",
        sex: false,
        collTotal: 66,
        fanTotal: 66,
        collectionFlag: true,
        age: "22",
        address: "北京",
        school: "北京幼儿园",
        isPlay: null,
        navIndex: 3, //视频类别索引
        swipeIndex: 0, //轮播索引
        backHomeIndex: 0, //切换回主页时赋值给轮播索引
        videos: [
          {
            videoUrl: "./video/fj6.avi",
            imgUrl: "./image/jyz.jpg",
            likeFlag: false,
            collectionFlag: true,
            text: "树是梧桐树，城是南京城 一句梧桐美，种满南京城 #南京 #梧桐树 #向往新生活",
            name: "Q音推荐",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/jyz.jpg",
                chatText: "今天吃什么",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/bldxx.avi",
            imgUrl: "./image/jyz.jpg",
            likeFlag: false,
            collectionFlag: false,
            sizeFlag: true,
            text: "所有的相遇，都是久别重逢 #便利店超新星 #池昌旭 #金裕贞",
            name: "Q音推荐",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/jyz.jpg",
                chatText: "妈妈做的宫爆鸡丁",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/zysh.avi",
            imgUrl: "./image/jyz.jpg",
            likeFlag: false,
            collectionFlag: false,
            sizeFlag: true,
            text: "拥有三项征服者的力量，胜利是必然的 #青钢影 #折一束花",
            name: "Q音推荐",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/jyz.jpg",
                chatText: "妈妈做的孜然羊肉",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
        ],
      },
      //   推荐的视频
      recomData: {},
      //   看剧类视频数据
      dramaData: {
        num: "666666",
        img: "./image/yc.jpg",
        sex: true,
        collTotal: 66,
        fanTotal: 66,
        collectionFlag: false,
        age: "22",
        address: "北京",
        school: "北京幼儿园",
        isPlay: null,
        navIndex: 3,
        swipeIndex: 0,
        backHomeIndex: 0,
        videos: [
          {
            videoUrl: "./video/hw.avi",
            imgUrl: "./image/yc.jpg",
            likeFlag: false,
            collectionFlag: false,
            text: "在亚特兰蒂斯，水将带走眼泪,只有鲜血才能让众神听到呼声! #DC #温子仁 #海王",
            name: "爱好剧",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱好剧",
                chatImg: "./image/yc.jpg",
                chatText: "明天吃什么",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/xtf.avi",
            imgUrl: "./image/yc.jpg",
            likeFlag: false,
            collectionFlag: false,
            text: "说到底，抓人要有证据，没证据的话... #电影 #怒火重案 #谢霆锋",
            name: "爱好剧",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱好剧",
                chatImg: "./image/yc.jpg",
                chatText: "妈妈做的大盘鸡",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/gqq.avi",
            imgUrl: "./image/yc.jpg",
            likeFlag: false,
            collectionFlag: false,
            text: "如果我还是旧厂街卖鱼的那个高启强，安欣，你会不会把我当朋友 结局已定，没有那么多如果... #狂飙 #高启强 #安欣",
            name: "爱好剧",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱好剧",
                chatImg: "./image/yc.jpg",
                chatText: "妈妈做的酱骨头",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
        ],
      },
      //   风景类视频数据
      landscapeData: {
        num: "134679",
        img: "./image/xishi1.jpg",
        sex: false,
        collTotal: 66,
        fanTotal: 66,
        collectionFlag: false,
        age: "22",
        address: "杭州",
        school: "杭州幼儿园",
        isPlay: null,
        navIndex: 3,
        swipeIndex: 0,
        backHomeIndex: 0,
        videos: [
          {
            videoUrl: "./video/tk.avi",
            imgUrl: "./image/xishi1.jpg",
            likeFlag: false,
            collectionFlag: false,
            sizeFlag: true,
            text: "朝霞就像是光洁的玉盘，在云海之中放射它的光芒，晚霞就像是飘逸的丝巾，在风雨之中随意游动! #天空 #晚霞 #朝霞 #下班",
            name: "爱美景",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱美景",
                chatImg: "./image/xishi1.jpg",
                chatText: "后天吃什么",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/fj.avi",
            imgUrl: "./image/xishi1.jpg",
            likeFlag: false,
            collectionFlag: false,
            text: "见山见海见自己 #百丈漈 #山水 #旅游",
            name: "爱美景",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱美景",
                chatImg: "./image/xishi1.jpg",
                chatText: "妈妈做的番茄炒蛋",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/sh.avi",
            imgUrl: "./image/xishi1.jpg",
            likeFlag: true,
            collectionFlag: false,
            sizeFlag: true,
            text: "金融中心-上海 #一线城市 #魔都 #上海",
            name: "爱美景",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱美景",
                chatImg: "./image/xishi1.jpg",
                chatText: "妈妈做的粉皮炒蛋",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/fj3.avi",
            imgUrl: "./image/xishi1.jpg",
            likeFlag: false,
            collectionFlag: false,
            sizeFlag: true,
            text: "美景",
            name: "爱美景",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱美景",
                chatImg: "./image/xishi1.jpg",
                chatText: "妈妈做的尖椒炒蛋",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/fj4.avi",
            imgUrl: "./image/xishi1.jpg",
            likeFlag: false,
            collectionFlag: false,
            text: "桂林山水甲天下 #大好河山 #桂林 #旅游",
            name: "爱美景",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "爱美景",
                chatImg: "./image/xishi1.jpg",
                chatText: "妈妈做的蒜黄炒蛋",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
        ],
      },
      //  音乐类视频数据 也是默认用户
      musicData: {
        name: "QQ",
        flag: false, //是否是当前登录用户的评论
        img: "./image/xishi2.png",
        sex: true,
        num: "010202",
        collTotal: 66,
        fanTotal: 66,
        isUser: true, //是否是当前登录用户
        age: "22",
        address: "鹤壁",
        school: "鹤壁幼儿园",
        isPlay: null,
        navIndex: 3,
        swipeIndex: 0,
        backHomeIndex: 0,
        videos: [
          {
            videoUrl: "./video/fydsj.avi",
            imgUrl: "./image/xishi2.png",
            likeFlag: false,
            collectionFlag: false,
            text: "我丢你🐎，四人抓我也叫送？ #给我发个育的时间 #英雄联盟 #上单",
            name: "QQ",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/xishi2.png",
                chatText: "每天吃什么",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/yjh.avi",
            imgUrl: "./image/xishi2.png",
            likeFlag: false,
            collectionFlag: false,
            sizeFlag: true,
            text: "记忆就像迷雾中的阴影 有些东西，存在于我的视野之上 #英雄联盟 #源计划",
            name: "QQ",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/xishi2.png",
                chatText: "妈妈做的糖醋里脊",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/qg.avi",
            imgUrl: "./image/xishi2.png",
            bgImg: "./image/jyz2.jpg",
            imgFlag: true,
            likeFlag: false,
            collectionFlag: false,
            text: "爱过一场又放不下的人，大概都会有歌里唱的这样的心情吧 #歌曲 #过去 #爱情 ",
            name: "QQ",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/xishi2.png",
                chatText: "妈妈做的京酱肉丝",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
          {
            videoUrl: "./video/pgydyd.avi",
            imgUrl: "./image/xishi2.png",
            likeFlag: false,
            collectionFlag: false,
            text: "狗子：铲屎的没骗我，原来我真是只狗！ #柴犬",
            name: "QQ",
            time: "2023-05-10",
            likeTotal: 66,
            collTotal: 66,
            chat: [
              {
                flag: true,
                name: "Q音推荐",
                chatImg: "./image/xishi2.png",
                chatText: "妈妈做的可乐鸡腿",
                chatLikeShow: false,
                chatTextShow: false,
              },
            ],
          },
        ],
      },
      // 收藏的视频数据
      collData: [],
      // 喜欢的视频数据
      likeData: [],
    };
  },

  actions: {
    // 筛选收藏的视频
    handleColl() {
      let arr = [];
      this.playsData.videos.filter((item) => {
        if (item.collectionFlag) {
          arr.push(item);
        }
      });
      this.dramaData.videos.filter((item) => {
        if (item.collectionFlag) {
          arr.push(item);
        }
      });
      this.landscapeData.videos.filter((item) => {
        if (item.collectionFlag) {
          arr.push(item);
        }
      });
      this.musicData.videos.filter((item) => {
        if (item.collectionFlag) {
          arr.push(item);
        }
      });
      let newArr = Array.from(new Set(arr));
      this.collData = newArr;
    },
    // 筛选喜欢的视频
    handleLike() {
      let arr = [];
      this.playsData.videos.filter((item) => {
        if (item.likeFlag) {
          arr.push(item);
        }
      });
      this.dramaData.videos.filter((item) => {
        if (item.likeFlag) {
          arr.push(item);
        }
      });
      this.landscapeData.videos.filter((item) => {
        if (item.likeFlag) {
          arr.push(item);
        }
      });
      this.musicData.videos.filter((item) => {
        if (item.likeFlag) {
          arr.push(item);
        }
      });
      let newArr = Array.from(new Set(arr));
      this.likeData = newArr;
    },
    // 给推荐标签数据
    handleRecom() {
      this.recomData = this.playsData;
    },
    // 添加评论
    addChatData(item, i) {
      this.playsData.videos[i].chat.push(item);
    },
  },
});
