<template>
  <div class="single" @touchstart="touchstart($event)" @touchend="touchend($event)">
    <div class="single-close" @click="gotoOrder">
      点击或下滑
    </div>

    <div class="single-header">
      <div class="single-img">
        <img src="../assets/images/sellout.png">
      </div>
      <div class="single-title">五味小食拼盘餐A</div>
    </div>

    <div class="guige-body">
      <div class="guige-box">
        <p class="guige-box-title">选规格</p>
        <div class="guige-box-con">
          <a class="btn btn-circle5 btn-primary">大份</a>
          <a class="btn btn-circle5 btn-line-default">中份</a>
          <a class="btn btn-circle5 btn-line-default">小份</a>
          <a class="btn btn-circle5 btn-line-default">超小</a>
        </div>
      </div>
      <div class="guige-box">
        <p class="guige-box-title">选做法</p>
        <div class="guige-box-con">
          <a class="btn btn-circle5 btn-line-default">夹心芝士<span class="tip">+￥1</span></a>
        </div>
      </div>
      <div class="guige-box">
        <p class="guige-box-title">菜品特色</p>
        <div class="guige-box-con">
          美味沙拉卷饼是一道美味的中式西餐
        </div>
      </div>
    </div>

    <div class="single-footer">
      <div class="single-footer-left">
        59.0
      </div>
      <div class="single-footer-right">
        <a class="btn btn-primary btn-circle">加入购物车</a>
      </div>
    </div>
  </div>
</template>

<script>
import CartControl from '@/components/cart-control'
export default {
  components: { CartControl },
  methods: {
    gotoOrder () {
      this.$router.push({name: 'order'})
    },
    touchstart (e) {
      this.startY = e.changedTouches[0].pageY
    },
    touchend (e) {
      let startY = e.changedTouches[0].pageY
      if (Math.abs(startY) - Math.abs(this.startY) > 50 && window.scrollY <= 0) {
        this.gotoOrder()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.single {
  padding-bottom: 50px;
  .single-close {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .single-header {
    width: 100%;
    .single-img {
      height: 200px;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
    }
    .single-title {
      height: 40px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .single-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
    display: flex;
    .single-footer-left {
      width: 60%;
    }
    .single-footer-right {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}

  .guige-body {
    padding: 15px 0;
    height: 3000px;
    .guige-box {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .guige-box-title {
        color: #aaaaaa;
        font-size: 14px;
        margin-bottom: 5px;
        width: 88%;
      }
      .guige-box-con {
        width: 88%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .btn {
          margin-right: 5px;
          margin-bottom: 5px;
          box-sizing: border-box;
          position: relative;
          .tip {
            position: absolute;
            right: 3px;
            top: 0;
            font-size: 8px;
          }
        }
      }
    }
  }
</style>
