<template>
  <div>
    <transition name="fold">
      <div class="shopcart-list" v-show="isShowGeneralCart">
        <div class="list-header">
          <h1 class="title">你想筛选哪个菜？</h1>
          <span class="empty" @click="hideList">关闭</span>
        </div>

        <div class="list-content" ref="listContentRef">
          <div>
            <ul>
              <li class="food" v-for="item in dishesOfPerson">
                <span class="headimgurl">
                  <img :src="item.headimgurl">
                </span>
                <span>{{ item.name }}</span>
                <div>
                  <cart-control :food="item.food"
                    @add="add" @decrease="decrease">
                  </cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </transition>

    <!-- 模糊背景 -->
    <div class="background" @click="hideList"
      v-show="isShowGeneralCart"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '@/components/cart-control'
export default {
  components: {
    CartControl
  },
  data () {
    return {
    }
  },
  props: {
    dishesOfPerson: {
      type: Array
    },
    isShowGeneralCart: {
      type: Boolean
    }
  },
  computed: {
  },
  created () {
  },
  watch: {
    dishesOfPerson: function (val) {
      if (val.length === 0) {
        this.hideList()
      }
    },
    isShowGeneralCart: function (val) {
      if (val) {
        // 初始化 better-scroll
        if (this.isShowGeneralCart) {
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
    hideList () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.shopcart-list {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translate3d(0, 0, 0);
  z-index: 1;
}
.shopcart-list.fold-enter-active,
.shopcart-list.fold-leave-active {
  transition: all 0.5s;
}
.shopcart-list.fold-enter,
.shopcart-list.fold-leave-to {
  transform: translate3d(0, 100%, 0);
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
  /* overflow: scroll;
  -webkit-overflow-scrolling: touch; */
  overflow: hidden;
}
.shopcart-list .list-content ul {
  padding-bottom: 30px;
}
.list-content .food {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  box-sizing: border-box;
  position: relative;
}
.list-content .headimgurl {
  width: 35px;
  height: 35px;
}
.list-content .headimgurl img {
  width: 100%;
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
/* 模糊背景 */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7, 17, 27, 0.6);
}
</style>
