<template>
  <li class="food">
    <div class="headimgurl">
      <img :src="shopCartData.persons[dish.openid].headimgurl">
    </div>
    <div class="info">
      <div class="info-title">
        {{dish.name}}
        <a>详情</a>
      </div>
      <div class="des">{{dish.remark}}</div>
      <div class="info-des">
        牛排7分熟牛排7分熟牛排7分熟牛排7分熟
      </div>
    </div>
    <div class="beizhu">
      <img src="../../assets/images/bz.png" @click="editDish">
    </div>
    <div class="price">
      <div class="price1">
        <span>特</span>
        <span>￥</span>
        <Price :data="String((dish.price + dish.aprice).toFixed(2))"/>
      </div>
      <div class="price2 delete">
        <span>原</span>
        <span>￥</span>
        <span>{{ (dish.price + dish.aprice).toFixed(2) }}</span>
      </div>
    </div>
    <div class="control">
      <CartControl :dishsno="dish.dishsno" :rcid="dish.rcid" :duid="dish.duid" :practiceid="dish.practiceid"
                   :dishKey="dish.dishKey" :isPack="dish.hasPackitems"/>
    </div>
  </li>
</template>

<script>
  import CartControl from '@/components/cart-control'
  import DishesNum from '@/pages/order/dishesNum'
  import Price from '@/components/base/price'
  import {mapState} from 'vuex'

  export default {
    components: {CartControl, DishesNum, Price},
    props: {
      dish: Object
    },
    data() {
      return {}
    },
    methods: {
      editDish() {

      }
    },
    computed: {
      ...mapState({
        member: state => state.order.member, // 就餐人数
        categories: function (state) {
          let categories = {};
          this._.forEach(state.order.baseDatas.dish_kinds, c => {
            categories[String(c.id)] = {name: c.name};
          });
          return categories;
        },
        shopCartData: state => state.order.shopCart, // 购物车菜品原始数据
      }),
    },
  }
</script>
