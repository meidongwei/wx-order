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
            <div class="desc">3人用餐（另需5元餐盒费）</div>
          </div>
        </div>
        <div class="right" @click.stop="pay">
          <div class="pay"
            :class="{'payLight': this.totalPrice > 0}">
            {{ payDesc }}
          </div>
        </div>
      </div>

      <!-- 购物车列表 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="isShowShopCart">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>

          <div class="list-content" ref="listContentRef">
            <div>
              <ul v-for="(value, key) in selectFoods">
                <!-- v-if="isShowTitle(value)" -->
                <div class="title" >
                  {{ foodsList[key].title }}
                </div>
                <li class="food" v-for="(val, k) in value">
                  <span class="headimgurl">
                    <img :src="getimgurl(k.split(',')[1])">
                  </span>
                  <span class="name">{{ foodsList[key].list[k.split(",")[0]].name }}</span>
                  <div>
                    <div class="price">
                      <span>￥{{ foodsList[key].list[k.split(",")[0]].price }}</span>
                    </div>

                    <div class="control">
                      <cart-control :food="{
                          count: val.count,
                          dishesid: k.split(',')[0],
                          rcid: key,
                          openid: k.split(',')[1]
                        }"
                        @add="add" @decrease="decrease">
                      </cart-control>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </transition>
    </div>

    <!-- 模糊背景 -->
    <div class="background" @click="hideList"
      v-show="isShowShopCart"></div>
  </div>
</template>

<script>
import CartControl from './cart-control'
import BScroll from 'better-scroll'
export default {
  components: {
    CartControl
  },
  data () {
    return {
      // 购物车列表是否折叠
      isShowShopCart: false
    }
  },
  props: {
    // 加入购物车的商品
    selectFoods: {
      type: Object
    },
    foodsList: {
      type: Object
    },
    persons: {
      type: Object
    }
  },
  computed: {
    // 所选商品总价
    totalPrice () {
      let total = 0
      for (let rcid in this.selectFoods) {
        for (let key in this.selectFoods[rcid]) {
          let dishesid = key.split(',')[0]
          let price = this.foodsList[rcid].list[dishesid].price
          total += this.selectFoods[rcid][key].count * price
        }
      }
      return total
    },
    // 所选商品总数量
    totalCount () {
      let total = 0
      for (let rcid in this.selectFoods) {
        for (let key in this.selectFoods[rcid]) {
          total += this.selectFoods[rcid][key].count
        }
      }
      return total
    },
    // 去结算
    payDesc () {
      if (this.totalPrice <= 0) {
        return '请选菜'
      } else {
        if (this.isShowShopCart) {
          return '提交订单'
        } else {
          return '选好了'
        }
      }
    }
  },
  watch: {
    // 购物车商品数量为0时,关闭购物车列表
    totalCount: function (val) {
      if (val === 0) {
        this.isShowShopCart = false
        this.$emit('isShowShopCart', this.isShowShopCart)
      }
    }
  },
  methods: {
    add (data) {
      this.$emit('handleAdd', data)
    },
    decrease (data) {
      this.$emit('handleDecrease', data)
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.isShowShopCart = !this.isShowShopCart
      this.$emit('isShowShopCart', this.isShowShopCart)

      // 初始化 better-scroll
      if (this.isShowShopCart) {
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
      if (this.totalPrice <= 0) {
        return
      }
      if (this.payDesc === '选好了') {
        this.isShowShopCart = true
        return
      }
      if (this.payDesc === '提交订单') {
        alert('跳转到订单页')
        return
      }
    },
    empty () {
      this.$emit('empty', { type: 1 })
      this.isShowShopCart = false
      this.$emit('isShowShopCart', this.isShowShopCart)
    },
    hideList () {
      this.isShowShopCart = false
      this.$emit('isShowShopCart', this.isShowShopCart)
    },

    getimgurl (openid) {
      for (let opid in this.persons) {
        if (opid === openid) {
          return this.persons[opid].headimgurl
        }
      }
    },

    // isShowTitle (sel) {
    //   let n = 0
    //   for (let key in sel) {
    //     n += sel[key].count
    //   }
    //   if (n > 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }

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
    /* max-height: 300px; */
    /* max-height: calc(100vh - 90px); */
    height: calc(100vh - 90px);
    padding: 0 18px;
    background-color: #fff;
    overflow: hidden;
  }
  .list-content > div {
    padding-bottom: 100px;
  }
  .list-content .title {
    text-align: left;
    font-size: 14px;
    color: #939393;
    padding: 15px 0 5px 0;
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
  .list-content ul {
    margin-bottom: 20px;
    position: relative;
  }
  .list-content .headimgurl {
    width: 35px;
    height: 35px;
  }
  .list-content .headimgurl img {
    width: 100%;
  }
  .list-content ul::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #f5f5f5;
    color: #f5f5f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
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
