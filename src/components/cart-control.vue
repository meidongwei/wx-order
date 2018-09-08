<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease" v-show="dishesCount > 0"
           @click.stop.prevent="handleAdd(-1)">
        <i class="iconfont icon-jian-xianxingyuankuang text-primary"
           :class="isBig ? 'iconfont-size-big' : 'iconfont-size-small'"></i>
      </div>
    </transition>

    <div class="num" v-show="dishesCount > 0">
      {{ dishesCount }}
    </div>

    <div class="add" @click.stop.prevent="handleAdd(1)">
      <i class="iconfont icon-jia-yuankuang text-primary"
         :class="[isBig ? 'iconfont-size-big' : 'iconfont-size-small', (dishesCount >= maxNum || !isAddEnable || this.isPack) ? 'text-default' : 'text-primary']"></i>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: {
      dishsno: {
        type: String,
        default: "0"
      },
      rcid: {
        type: Number,
        default: 0
      },
      duid: {
        type: Number,
        default: 0
      },
      practiceid: {
        type: Number,
        default: 0
      },
      // 大图模式下，加减号尺寸相对变大，默认：false-小尺寸
      isBig: {
        type: Boolean,
        default: false
      },
      // 当前所点套餐明细菜
      packDish: {
        type: Object
      },
      maxNum: {
        type: Number,
        default: 999
      },
      // 加菜按钮是否可用
      isAddEnable: {
        type: Boolean,
        default: true
      },
      isPack: {
        type: Boolean, // 当前菜是否为有辅菜的套餐（套餐不可加菜）
        default: false
      },
      dishKey: {
        type: String, // 服务器购物车缓存中菜品key
      }
    },
    methods: {
      handleAdd (count) {
        // 以下三种情况不允许加菜：
        // 1、菜品超过最大可点数量
        // 2、显式禁用加菜按钮（明细菜所在辅菜组满足点选规则）
        // 3、当前菜品是辅菜的套餐
        if ((this.dishesCount >= this.maxNum || !this.isAddEnable || this.isPack) && count > 0) {
          return;
        }

        // 有辅菜的套餐减菜（即删除当前已点套餐）
        if (this.isPack && count < 0) {
          let msg = {
            type: 'del_pack',
            data: {
              rcid: this.rcid,
              dishesid: this.dishsno,
              dishKey: this.dishKey,
              count: count,
            }
          };
          this.$store.dispatch("sendWsMsg", msg);
          return;
        }

        // 点单品菜
        if (!this.packDish) {
          let msg = {
            type: 'add_dish',
            data: {
              packageflag: 0,
              dishesid: this.dishsno,
              rcid: this.rcid,
              duid: this.duid,
              practiceid: this.practiceid,
              count: count,
            }
          };
          this.$store.dispatch("sendWsMsg", msg);
        } else {
          // 点套餐明细
          this.$emit("add", this.packDish, count);
        }
      }
    },
    computed: {
      dishesCount() {
        try {
          if (this.isPack) {
            return 1;
          }
          if (!this.packDish) {
            let state = this.$store.state.order;
            let dishKey = this.dishsno + "," + state.openid;
            return state.shopCart.categories[String(this.rcid)][dishKey][String(this.duid)][String(this.practiceid)].count;
          } else {
            return this.packDish.number;
          }
        } catch (e) {
          return 0;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cart-control {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .add, .decrease {
      display: inline-block;
      .iconfont-size-big {
        font-size: 28px;
      }
      .iconfont-size-small {
        font-size: 26px;
      }
    }
    .num {
      font-size: 17px;
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .move-enter-active,
    .move-leave-active {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: all .3s;
    }
    .move-enter-active i,
    .move-leave-active i {
      transform: rotate(0);
      transition: all .3s;
    }
    .move-enter,
    .move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      transition: all .3s;
    }
    .move-enter i,
    .move-leave-to i {
      transform: rotate(360deg);
      transition: all .3s;
    }
  }
</style>
