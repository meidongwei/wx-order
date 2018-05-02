<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease"
        @click.stop.prevent="decrease($event)"
        v-show="food.count > 0">
        <i class="iconfont icon-jian-xianxingyuankuang"></i>
      </div>
    </transition>

    <div class="num" v-show="food.count > 0">
      {{ food.count }}
    </div>

    <div class="add" @click.stop.prevent="add($event)">
      <i class="iconfont icon-jia-yuankuang"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openid: 'abc',
      headimgurl: 'kkk'
    }
  },
  props: {
    // 操作哪个商品
    // food: {
    //   count: 20,
    //   dishesid: 1,
    //   rcid: 1
    // }
    food: {
      type: Object
    }
  },
  created () {
    // this.openid = sessionStorage.getItem('openid')
    // this.headimgurl = sessionStorage.getItem('headimgurl')
  },
  methods: {
    decrease (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }
      // let n = parseInt(Math.random()*100)
      // this.openid = this.openid + n
      let data = {
        type: 0,
        data: {
          openid: this.openid,
          headimgurl: this.headimgurl,
          rcid: this.food.rcid,
          dishesid: this.food.dishesid,
          count: -1
        }
      }
      this.$emit('decrease', data)
    },
    add (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }
      // let n = parseInt(Math.random()*100)
      // this.openid = this.openid + n
      let data = {
        type: 0,
        data: {
          openid: this.openid,
          headimgurl: this.headimgurl,
          rcid: this.food.rcid,
          dishesid: this.food.dishesid,
          count: 1
        }
      }
      this.$emit('add', data)
    }

  }
}
</script>

<style scoped>
.cart-control {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-control .decrease,
.cart-control .add {
  display: inline-block;
  padding: 6px;
}
.cart-control .decrease i,
.cart-control .add i {
  font-size: 24px;
  color: #fd6d52;
  display: inline-block;
}
.cart-control .num {
  font-size: 16px;
  width: 20px;
  color: #93999f;
  display: flex;
  justify-content: center;
  align-items: center;
}


.move-enter-active,
.move-leave-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: all .4s;
}
.move-enter-active i,
.move-leave-active i {
  transform: rotate(0);
  transition: all .4s;
}

.move-enter,
.move-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
  transition: all .4s;
}
.move-enter i,
.move-leave-to i {
  transform: rotate(360deg);
  transition: all .4s;
}
</style>
