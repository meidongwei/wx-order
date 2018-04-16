<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease"
        @click.stop.prevent="decrease($event)"
        v-show="food.count > 0">
        <i class="iconfont icon-jian-xianxingyuankuang"></i>
      </div>
    </transition>

    <div class="num" v-show="food.count > 0">{{ food.count }}</div>

    <div class="add" @click.stop.prevent="add($event)">
      <i class="iconfont icon-jia-yuankuang"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {}
  },
  props: {
    // 操作哪个商品
    food: {
      type: Object
    }
  },
  methods: {
    decrease (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }

      if (this.food.count) {
        this.food.count--
      }
    },
    add (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }

      // 修改对象的一个不存在的属性时（this.food.count = 1），DOM 不会更新
      // 需要使用 Vue.set()
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }

      // 将当前 dom 传递出去，用来做小球飞入效果
      this.$emit('drop', event.target)
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
  color: #5ED14F;
  display: inline-block;
}
.cart-control .num {
  display: inline-block;
  padding: 6px;
  font-size: 16px;
  text-align: center;
  color: #93999f;
  vertical-align: top;
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
