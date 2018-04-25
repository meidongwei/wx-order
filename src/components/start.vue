<template>
  <div class="start-wrapper">

    <div class="bg"></div>

    <div class="start-container">

      <div class="header">
        <div class="logo-con">
          <img class="store" src="../assets/tt.jpeg" alt="">
          <h2 style="color:#fff;">台卡: {{ tableid }}</h2>
        </div>
        <div class="more">
          <a href="javascript:;" class="avatar">
            <img :src="headimgurl" alt="">
            <!-- <img src="../assets/avatar.png" alt=""> -->
          </a>
        </div>
      </div>

      <div class="welcome">
        欢迎光临, {{ nickname }}, 您几位？
      </div>

      <div class="con">
        <div class="linkNum"
          v-for="(item, index) in list" :key="index">
          <router-link :to="{ name: 'index' }">
          {{ item.id }}
        </router-link>
        </div>
      </div>

      <div class="footer">
        <a class="btn-primary-circle active" href="javascript:;">堂食</a>
        <a class="btn-primary-circle" href="javascript:;">打包外卖</a>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  data () {
    return {
      nickname: '',
      headimgurl: '',
      tableid: '',
      list: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        },
        {
          id: 9
        },
        {
          id: 10
        },
        {
          id: 11
        },
        {
          id: 12
        },
        {
          id: 13
        },
        {
          id: 14
        },
        {
          id: 15
        }
      ]
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户数据
    getUserInfo () {
      axios.get(httpUrl.getWxUserinfo)
      .then(res => {
        if (res.data.errcode === 0) {
          // 拿到用户信息存入 sessionStorage
          if (typeof(Storage) !== "undefined") {
            this.nickname = res.data.res.nickname
            this.headimgurl = res.data.res.headimgurl
            this.tableid = res.data.res.tableid
            sessionStorage.nickname = this.nickname
            sessionStorage.headimgurl = this.headimgurl
            sessionStorage.tableid = this.tableid
          } else {
          	console.log("抱歉，您的浏览器不支持 web 存储")
          }
        } else {
          console.log(res.data.errmsg)
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
  .start-wrapper {
    height: 100vh;
    width: 100vw;
    background: url('../assets/tt.jpeg') no-repeat center center;
    box-sizing: border-box;
  }
  .bg {
    height: 100%;
    width: 100%;
    /*opacity: 0.8;*/
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
  .start-container .header .more {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #fd6d52;
    border-radius: 100%;
    height: 40px;
    width: 40px;
    box-shadow: 1px 1px 5px #000000;
    overflow: hidden;
  }
  .more .avatar img {
    width: 100%;
  }
  .start-container .store {
    width: 80px;
    height: 80px;
    border-radius: 50px;
    border: 5px solid #dbdbdb;
  }

  .welcome {
    color: #fff;
    text-align: center;
    /* margin-top: 20px; */
    margin-bottom: 40px;
  }

  .con {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
  }
  .linkNum {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .linkNum a {
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
  .active {
    background-color: #fd6d52;
    border: 1px solid #fd6d52;
  }












</style>
