<template>
  <div class="start-wrapper">

    <div class="bg"></div>

    <div class="start-container">

      <div class="header">
        <div class="logo-con">
          <img class="store" :src="tableimgurl">
          <p>台卡: {{ tableid }}</p>
        </div>
        <div class="more">
          <a href="javascript:;" class="avatar">
            <img :src="headimgurl">
          </a>
        </div>
      </div>

      <div class="welcome">
        <p class="nickname">{{ nickname }}</p>
        <p>欢迎光临, 客观您几位呢</p>
      </div>

      <div class="con">
        <div class="peopleNum" v-for="(item, index) in peopleList" :key="item.id">
          <a href="javascript:;" :class="{'p-active': index === nowCountIndex}"
            :style="index === nowCountIndex ? ('backgroundColor:' + themeColor) : ''"
            @click="selectCount(index)">
            {{ item.id }}
          </a>
        </div>
      </div>

      <div class="footer">
        <div v-for="(item, index) in typeList" :key="item.id">
          <a href="javascript:;" class="btn-primary-circle"
            :style="index === nowTypeIndex ? ('backgroundColor:' + themeColor + ';border: 1px solid ' + themeColor) : ''"
            @click="selectType(index)">
            {{ item.name }}
          </a>
        </div>
      </div>

      <div class="loading" v-show="isShowLoading">
        <img :src="fruitUrl">
        请稍等...
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import httpUrl from '@/http_url'
import fruitUrl from '@/assets/fruits-lemon.gif'
export default {
  data () {
    return {
      themeColor: '#fd6d52', // 主题颜色
      nowCountIndex: 0, // 选择几位
      nowTypeIndex: 0, // 选择堂食或打包
      isShowLoading: false, // 加载中
      fruitUrl: fruitUrl,
      // 用户信息
      openid: '',
      nickname: '',
      headimgurl: '',
      tableid: '', // 台卡号
      tableimgurl: '/pzcatering-web/images/daxia.jpeg',
      typeList: [
        { id: 1, name: '堂食' },
        { id: 2, name: '打包外卖' },
      ],
      peopleList: [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
        { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
        { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }
      ]
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {

    // 获取用户数据
    getUserInfo () {
      this.isShowLoading = true
      axios.get(httpUrl.getWxUserinfo).then(res => {
        this.isShowLoading = false
        if (res.data.errcode === 0) {
          this.nickname = res.data.res.nickname
          this.headimgurl = res.data.res.headimgurl
          this.tableid = res.data.res.tableid
          this.openid = res.data.res.openid

          // 存入 sessionStorage
          if (typeof(Storage) !== "undefined") {
            sessionStorage.nickname = this.nickname
            sessionStorage.headimgurl = this.headimgurl
            sessionStorage.tableid = this.tableid
            sessionStorage.openid = this.openid
            sessionStorage.themeColor = this.themeColor
          } else {
          	console.log("抱歉，您的浏览器不支持 web 存储")
          }
        } else {
          console.log(res.data.errmsg)
        }
      }).catch(err => console.log(err))
    },

    // 选择就餐人数
    selectCount (index) {
      this.nowCountIndex = index
    },

    // 选择堂食/外带
    selectType (index) {
      this.nowTypeIndex = index
      setTimeout(() => {
        this.$router.push({name: 'index'})
      }, 1000)
    }

  }
}
</script>

<style scoped>
.start-wrapper {
  height: 100vh;
  width: 100vw;
  background: url('/pzcatering-web/images/daxia.jpeg') no-repeat center center;
  box-sizing: border-box;
}
.bg {
  height: 100vh;
  width: 100vw;
  background: -webkit-linear-gradient(rgba(255,0,0,0), #000000); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgba(255,0,0,0), #000000); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgba(255,0,0,0), #000000); /* Firefox 3.6 - 15 */
  background: linear-gradient(rgba(255,0,0,0), #000000);
}
.start-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.start-container .header {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.start-container .header .logo-con {
  text-align: center;
}
.start-container .header .logo-con p {
  color: #fff;
  font-size: 20px;
}
.start-container .header .more {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #fff;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  overflow: hidden;
}
.more .avatar img {
  width: 100%;
}
.start-container .store {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 1px solid #fff;
}

.welcome {
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
}
.welcome .nickname {
  font-size: 18px;
  margin-bottom: 5px;
}

.con {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}
.peopleNum {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.peopleNum a {
  color: #282828;
  font-size: 14px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;
  margin-bottom: 15px;
}
.peopleNum a.p-active {
  color: #fff;
}

.footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-primary-circle {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  border-radius: 50px;
  border: 1px solid #fff;
  width: 80px;
  text-align: center;
}
.btn-primary-circle:first-child {
  margin-right: 10px;
}
/* .active {
  background-color: #fd6d52;
  border: 1px solid #fd6d52;
} */

.loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #c6c6c6;
  font-size: 14px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
