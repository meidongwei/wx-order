<template>
  <div class="start-container">

    <div class="history-box">
      <a class="history-box-logo bg-primary">
        <img src="../assets/images/history.png">
      </a>
    </div>

    <div class="user-box">
      <div class="user-box-logo">
        <transition name="fadeHello">
          <img class="helloimg" v-show="isShowHello" src="../assets/images/hi.png">
        </transition>
        <transition name="fadeLogo">
          <img class="logoimg" :src="headimgurl" v-show="isShowLogo">
        </transition>
      </div>
      <p class="nickname">{{ nickname }}</p>
      <p class="tableno">桌号：<span>{{ tableno }}</span></p>
      <div class="welcomeimg" v-if="member == 0">
        <transition name="fadeWelcome">
          <img src="../assets/images/welcome.png" v-show="isShowWelcome">
        </transition>
      </div>
    </div>

    <div class="count-box">
      <div class="count-box-item" v-for="num in 15" v-if="member == 0">
        <a @click="selectMember(num)" :class="num == members ? 'bg-primary' : ''">
          <span>{{ num }}</span>
        </a>
      </div>
    </div>

    <div class="type-box">
      <a class="btn btn-circle" @click="selectType" :class="canOrder ? 'btn-primary' : 'btn-default'">
        开始点餐
      </a>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        isShowHello: false, // 显示 hello
        isShowLogo: false, // 显示用户 logo
        isShowWelcome: false, // 显示 欢迎光临
        members: 0, // 就餐人数
      }
    },
    computed: {
      ...mapState({
        member: state => state.order.member, // 就餐人数
        tableno: state => state.order.tableno,
        tablename: state => state.order.tablename,
        nickname: state => state.order.nickname,
        headimgurl: state => state.order.headimgurl,
      }),
      // 是否可以点餐
      canOrder () {
        if (this.member || this.members) {
          return true
        } else {
          return false
        }
      }
    },
    mounted () {
      this.showTransition()
    },
    methods: {
      // 欢迎动画
      showTransition () {
        setTimeout(() => {
          // 0.1s后显示hello
          this.isShowHello = true;

          setTimeout(() => {
            // 2s后隐藏hello
            this.isShowHello = false;
            setTimeout(() => {
              // 0.5s后显示logo
              this.isShowLogo = true
            }, 500)
          }, 2000)

        }, 100);

        setTimeout(() => {
          // 欢迎观临
          this.isShowWelcome = true
        }, 1000)
      },
      // 选择就餐人数
      selectMember (num) {
        this.members = num;
      },
      // 开始点餐
      selectType () {
        if (this.canOrder) {
          if (this.members > 0) {
            let msg = {
              type: 'select_member',
              data: {
                member: this.members,
              }
            };
            this.$store.dispatch("sendWsMsg", msg);
          }
          this.$router.push({name: 'order'});
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .start-container {
    height: 100vh;
    width: 100vw;
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0), #000000), url('../assets/images/start-bg.png') no-repeat center center;
    background: -o-linear-gradient(rgba(0, 0, 0, 0), #000000), url('../assets/images/start-bg.png') no-repeat center center;
    background: -moz-linear-gradient(rgba(0, 0, 0, 0), #000000), url('../assets/images/start-bg.png') no-repeat center center;
    background: linear-gradient(rgba(0, 0, 0, 0), #000000), url('../assets/images/start-bg.png') no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    .history-box {
      height: 18vh;
      display: flex;
      justify-content: flex-end;
      .history-box-logo {
        margin-right: 20px;
        margin-top: 30px;
        height: 32px;
        width: 32px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 19px;
        }
      }
    }
    .user-box {
      box-sizing: border-box;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-bottom: 20px;
      .user-box-logo {
        width: 67px;
        height: 67px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .helloimg {
          width: 63px;
          height: 63px;
        }
        .logoimg {
          width: 67px;
          height: 67px;
          border-radius: 50px;
        }
      }
      .nickname {
        height: 29px;
        font-size: 21px;
        margin-bottom: 28px;
      }
      .tableno {
        margin-bottom: 20px;
        font-size: 15px;
        span {
          font-size: 18px;
        }
      }
      .welcomeimg {
        height: 21px;
        display: flex;
        justify-content: center;
        img {
          width: 60%;
        }
      }
    }
    .count-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      height: 26vh;
      width: 100%;
      padding: 0 50px;
      box-sizing: border-box;
      .count-box-item {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          width: 42px;
          height: 42px;
          border-radius: 50px 50px 10px 50px;
          transform: rotate(45deg);
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            color: #fff;
            font-size: 20px;
            transform: rotate(-45deg);
          }
        }
      }
    }
    .type-box {
      height: 15vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        font-size: 18px;
        width: 112px;
        padding: 10px 0;
      }
    }
  }

  /* 动画效果1 */
  .fadeHello-enter-active,
  .fadeHello-leave-active {
    transition: all .5s;
  }

  .fadeHello-enter,
  .fadeHello-leave-to {
    opacity: 0;
  }

  /* 动画效果2 */
  .fadeLogo-enter-active,
  .fadeLogo-leave-active {
    transition: all .5s;
  }

  .fadeLogo-enter,
  .fadeLogo-leave-to {
    opacity: 0;
  }

  /* 动画效果3 */
  .fadeWelcome-enter-active,
  .fadeWelcome-leave-active {
    transition: all .5s;
  }

  .fadeWelcome-enter,
  .fadeWelcome-leave-to {
    opacity: 0;
  }
</style>
