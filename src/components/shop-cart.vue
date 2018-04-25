<template>
  <div class="shop-cart">
    <!-- 购物车 -->
    <div class="content">
      <!-- 主要内容 -->
      <div class="cart" @click="toggleList">
        <div class="left">
          <div class="logo-wrapper" :class="{'logoLight': totalCount > 0}">
            <div class="logo">
              <i class="iconfont icon-caigou"></i>
            </div>
            <div class="totalCount" v-show="totalCount > 0">{{ totalCount }}</div>
          </div>

          <div style="margin-top:5px;">
            <div class="price" :class="{'priceLight':totalCount > 0}">
              ￥{{ totalPrice }}
            </div>
            <div class="desc">另需配送费 {{ deliveryPrice }} 元</div>
          </div>
        </div>
        <div class="right" @click.stop="pay">
          <div class="pay"
            :class="{'payLight': this.totalPrice >= this.minPrice}">
            {{ payDesc }}
          </div>
        </div>
      </div>

      <!-- 小球 -->
      <!-- <shop-cart-balls ref="ball"></shop-cart-balls> -->

      <!-- 购物车列表 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>

          <div class="list-content" ref="listContentRef">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>

                <div>
                  <div class="price">
                    <span>￥{{ food.price * food.count }}</span>
                  </div>

                  <div class="control">
                    <cart-control :food="food" :user="user"
                      @add="add" @decrease="decrease"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!-- 模糊背景 -->
    <div class="background" @click="hideList"
      v-show="listShow"></div>
  </div>
</template>

<script>
// import ShopCartBalls from './shop-cart-balls'
import CartControl from './cart-control'
import BScroll from 'better-scroll'
export default {
  components: {
    // ShopCartBalls,
    CartControl
  },
  data () {
    return {
      // 购物车列表是否折叠
      listShow: false
    }
  },
  props: {
    // 加入购物车的商品
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    // 配送费
    deliveryPrice: {
      type: Number,
      default: 0
    },
    // 起送费
    minPrice: {
      type: Number,
      default: 20
    },
    user: {
      type: Object
    }
  },
  computed: {
    // 所选商品总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 所选商品总数量
    totalCount () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.count
      })
      return total
    },
    // 20元起送 、 还差10元起送 、 去结算
    payDesc () {
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    }
  },
  watch: {
    // 购物车商品数量为0时,关闭购物车列表
    totalCount: function (val) {
      if (val === 0) {
        this.listShow = false
      }
    }
  },
  methods: {
    // drop (target) {
    //   this.$refs.ball.drop(target)
    // },
    add (data) {
      // websocket
      this.$emit('handleAdd', data)
    },
    decrease (data) {
      // websocket
      this.$emit('handleDecrease', data)
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.listShow = !this.listShow
      // 初始化 better-scroll
      if (this.listShow) {
        // setTimeout
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContentRef, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        }, 20)
      }
    },
    // 支付
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
      this.$emit('empty', { type: 2 })
      this.listShow = false
    },
    hideList () {
      this.listShow = false
    }
  }
}
</script>

<style scoped>
  .shop-cart {
    height: 50px;
    text-align: center;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 2;
    box-shadow: 1px 1px 10px #e7e7e7;
  }
  .cart {
    display: flex;
    width: 100%;
    height: 50px;
    font-size: 0;
    background-color: #fff;
  }
  .left {
    flex: 1;
    display: flex;
  }
  .left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    box-sizing: border-box;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    vertical-align: top;
    text-align: center;
    background-color: #e7e7e7;
  }
  .left .logo-wrapper.logoLight {
    background-color: #ff9c8a;
  }
  .left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #d1d1d1;
  }
  .left .logo-wrapper.logoLight .logo {
    background-color: #fd6d52;
  }
  .left .logo-wrapper .logo i {
    font-size: 24px;
    line-height: 44px;
    color: #f2f2f2;
  }
  .left .logo-wrapper.logoLight .logo > i {
    color: #fff;
  }
  .left .logo-wrapper .totalCount {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    border-radius: 12px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background-color: #f01414;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }
  .left .price {
    text-align: left;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 700;
    color: #909090;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  .left .price > .priceLight {
    color: #fff;
  }
  .left .desc {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #909090;
  }
  .right {
    flex: 0 0 105px;
    width: 105px;
    text-align: center;
  }
  .right .pay {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 700;
    color: #d1d1d1;
    background-color: #f2f2f2;
  }
  .right .pay.payLight {
    background-color: #fd6d52;
    color: #fff;
  }

  /* 购物车列表 */
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }
  .shopcart-list.fold-enter-active,
  .shopcart-list.fold-leave-active {
    transition: all 0.5s;
  }
  .shopcart-list.fold-enter,
  .shopcart-list.fold-leave-to {
    transform: translate3d(0, 0, 0);
  }
  .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
  }
  .shopcart-list .list-header .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopcart-list .list-header .empty {
    float: right;
    font-size: 14px;
    color: rgb(0, 160, 220);
  }
  .shopcart-list .list-content {
    max-height: 300px;
    padding: 0 18px;
    background-color: #fff;
    overflow: hidden;
  }
  .shopcart-list .list-content ul {
    padding-bottom: 20px;
  }
  .list-content .food {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    box-sizing: border-box;
    position: relative;
  }
  .list-content .food::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #f5f5f5;
    color: #f5f5f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .list-content .food:first-child::after {
    border: 0;
  }
  .list-content .food > div {
    display: flex;
    align-items: center;
  }
  .list-content .food .name {
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .list-content .food .price {
    font-size: 16px;
    font-weight: 700;
    color: #f04722;
    margin-right: 10px;
  }

  /* 模糊背景 */
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: rgba(7, 17, 27, 0.6);
  }
</style>
