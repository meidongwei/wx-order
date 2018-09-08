<template>
  <div class="shop-cart">
    <!-- 购物车按钮条 -->
    <div class="cart-bar" @click="toggleList">
      <div class="cart-box">
        <div class="cart-box-logo">
          <img src="../assets/images/shopcart-fill.png" v-if="totalCount > 0"/>
          <img src="../assets/images/shopcart-null.png" v-else/>
          <span class="badge" v-if="totalCount > 0">{{totalCount}}</span>
        </div>
        <div style="margin-top:5px;">
          <div class="price text-primary">
            <span>￥</span>
            <span>{{shopCart.consume.toFixed(2)}}</span>
          </div>
          <div class="desc">{{member}}人用餐</div>
        </div>
      </div>
      <div class="cart-btn text-primary" @click.stop="pay">
        <span>{{ payDesc }}</span>
        <!-- <img src="../assets/images/arrow-right.png"> -->
      </div>
    </div>

    <!-- 购物车列表 -->
    <transition name="fold">
      <div class="cart-panel" v-show="isShowShopCart">
        <div class="panel-header">
          <div class="title">
            <img src="../assets/images/back.png">继续添加
          </div>
          <div class="empty" @click="clearShopCart">
            <img src="../assets/images/delete.png">清空购物车
          </div>
        </div>

        <div class="list-content">
          <ul>
            <ShopCartDishes v-for="dish in shopCart.showList" :dish="dish"/>
          </ul>
          <div class="bz-more">
            <img src="../assets/images/bz.png">
            <span>更多要求</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ShopCartDishes from '@/pages/order/shopCartDishes'
  export default {
    components: {ShopCartDishes},
    data () {
      return {
        // 是否显示购物车列表面板
        isShowShopCart: false,
      }
    },
    props: {},
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
        dishes: state => state.order.baseDatas.dishs,
        // 购物车显示数据
        shopCart() {
          // 购物车菜品总价
          let consume = 0;
          // 购物车列表菜品
          let showList = [];

          // 只有当菜品基础数据初始化完成后才组织购物车数据
          if (!this.dishes) {
            return {consume, showList};
          }

          // 生成菜类数据
          this._.forIn(this.shopCartData.categories, (cate, k) => {
            let category = {
              //name: this.categories[k].name,
              dishes: []
            };
            // 组织菜类下菜品数据
            this._.forIn(cate, (dish, dishKey) => {
              let dishsno = dishKey.split(",")[0];
              let openid = dishKey.split(",")[1];
              let dishname = this.dishes[dishsno].name;
              let type = this.dishes[dishsno].type; // 1-单品菜，2-套餐
              let rcid = this.dishes[dishsno].recccid; // 推荐菜类id
              // 组织菜品单位数据
              this._.forIn(dish, (norms, duid) => {
                let price = 0;
                let dnname = '';
                this._.forEach(this.dishes[dishsno].norms, n => {
                  if (n.duid == duid) {
                    price = n.price;
                    dnname = n.name;
                    return false;
                  }
                });
                // 组织菜品做法数据
                this._.forIn(norms, (practice, practiceid) => {
                  let aprice = 0;
                  let practicename = '';
                  this._.forEach(this.dishes[dishsno].cooks, c => {
                    if (c.id == practiceid) {
                      aprice = c.aprice;
                      practicename = c.name;
                      return false;
                    }
                  });
                  let dish = {
                    hasPackitems: practice.packitems ? true : false, // 当前菜品是否是有辅菜组的套餐
                    packitems: practice.packitems, // 套餐辅菜组明细菜
                    type: type, // 1-单品菜，2-套餐
                    dishKey: dishKey, // 服务器购物车缓存中菜品key
                    dishsno: dishsno, // 菜品编码
                    name: dishname, // 菜品名称
                    remark: '菜品备注',
                    rcid: rcid, // 所属菜类id
                    openid: openid, // 用户openid
                    count: practice.count,
                    price: price, // 单位价格
                    duid: Number(duid), // 单位id
                    dnname: dnname, // 单位名称
                    aprice: aprice, // 做法加价
                    practiceid: Number(practiceid), // 做法id
                    practicename: practicename // 做法名称
                  };
                  consume += (price + aprice) * practice.count;
                  //category.dishes.push(dish);
                  showList.push(dish);
                });
              });
            });
            //showList.push(category);
          });
          return {consume, showList};
        }
      }),
      // 已点菜品总数
      totalCount() {
        let totalCount = 0;
        this._.forIn(this.shopCartData.categories, cate => {
          this._.forIn(cate, dish => {
            this._.forIn(dish, norms => {
              this._.forIn(norms, practice => {
                totalCount += practice.count;
              });
            });
          });
        });
        return totalCount;
      },
      // 按钮状态
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
        }
      }
    },
    methods: {
      toggleList () {
        this.isShowShopCart = !this.isShowShopCart;
      },
      // 支付
      pay () {
        if (this.totalPrice <= 0) {
          return
        }
        if (this.payDesc === '选好了') {
          this.isShowShopCart = true;
          return
        }
        if (this.payDesc === '提交订单') {
          this.$router.push({name: 'orderSuccess'});
          return
        }
      },
      // 清空购物车
      clearShopCart () {
        this.$store.dispatch("sendWsMsg", {type: 'clear_cart'});
        this.isShowShopCart = false;
      },
    },
    filters: {
      headimgurl(val) {
        return val.split(",")[1];
      }
    }
  }
</script>

<style lang="scss" scoped>
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
