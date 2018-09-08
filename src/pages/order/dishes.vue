<template>
  <!-- 点菜列表菜品 -->
  <li :class="isShowBig ? 'big-show' : 'small-show'">
    <div class="coninfo">
      <div class="food-left">
        <DishesImage src="http://img2.imgtn.bdimg.com/it/u=3314782076,3148103398&fm=200&gp=0.jpg" @click.native="gotoInfo"/>
      </div>
      <div class="food-right">
        <div class="food-right-name">{{dish.name}}</div>
        <div class="food-right-img">
          <img :src="dish.icon">
        </div>
        <div class="food-right-price1 delete">
          <div v-if="price != memberprice || price != tprice">
            <span>原</span>
            <span>￥</span>
            <span>{{this.price}}</span>
          </div>
        </div>
        <div class="food-right-price2">
          <div>
            <span v-if="tprice <= memberprice && tprice < price">特</span>
            <span v-if="memberprice < tprice && memberprice < price">会</span>
            <span>￥</span>
            <!-- 大图模式 -->
            <Price v-if="isShowBig" :data="String(memberprice < tprice ? memberprice : tprice)" size1="25" size2="18"/>
            <!-- 小图模式 -->
            <Price v-else :data="String(memberprice < tprice ? memberprice : tprice)"/>
            <span class="qi">{{this.isShowQi ? '起' : ''}}</span>
          </div>
        </div>
      </div>
      <!-- 是否显示大图模式 -->
      <template v-if="isShowBig">
        <template v-if="tprice <= memberprice && tprice < price">
          <div class="coninfo-tip">特价</div>
        </template>
        <template v-else-if="memberprice < tprice && memberprice < price">
          <div class="coninfo-tip">会员价</div>
        </template>
      </template>
    </div>
    <!-- 菜品控制项：根据当前菜品确定应该显示加减按钮组或选规则或随心配或抢光了其中一种 -->
    <DishesControl :dish="dish"/>
  </li>
</template>

<script>
  import DishesImage from './dishesImage'
  import Price from '@/components/base/price'
  import DishesControl from './dishesControl'
  export default {
    components: {
      DishesImage, Price, DishesControl
    },
    props: {
      dish: Object,
      // 是否在招牌菜类显示：0-否，1-是
      suggest: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        price: -1, // 原价
        memberprice: -1, // 会员价
        tprice: -1, // 特价
        isShowQi: false, // 是否显示xx元“起”
      }
    },
    created() {
      // 单品菜
      if (this.dish.type == 1) {
        // 当前菜品做法加价中最小值
        let aprice = -1;
        // 多规则或多做法
        if (this.dish.norms.length > 1 || this.dish.cooks.length > 1) {
          this.isShowQi = true;
          this._.forEach(this.dish.norms, norm => {
            // 取最小值
            if (norm.price < this.tprice || norm.memberprice < this.memberprice || this.price == -1) {
              this.price = norm.orgprice;
              this.memberprice = norm.memberprice;
              this.tprice = norm.price;
            }
          });
          this._.forEach(this.dish.cooks, cook => {
            if (aprice == -1 || cook.aprice < aprice) {
              aprice = cook.aprice;
            }
          });
        } else { // 单品菜单规格单做法或无做法
          this.price = this.dish.norms[0].orgprice;
          this.memberprice = this.dish.norms[0].memberprice;
          this.tprice = this.dish.norms[0].price;
          if (this.dish.cooks[0]) {
            aprice = this.dish.cooks[0].aprice;
          }
        }
        if (aprice == -1) {
          aprice = 0;
        }
        this.price += aprice;
        this.memberprice += aprice;
        this.tprice += aprice;
      } else { // 套餐
        // 有辅菜组的套餐显示“起”
        if (this.dish.setmeals.mandatory.length > 0 || this.dish.setmeals.optional.length > 0) {
          this.isShowQi = true;
        }
        this.price = this.dish.norms[0].orgprice;
        this.memberprice = this.dish.norms[0].memberprice;
        this.tprice = this.dish.norms[0].price;
      }
    },
    methods: {
      // 到详情页
      gotoInfo () {
        this.$router.push({name: 'singleInfo'})
      },
    },
    computed: {
      // 当前菜品是否显示大图
      isShowBig() {
        // 菜品显示模式：1-小图，2-大图，3-大图+小图
        let showMode = this.$store.state.order.showMode;
        if (showMode == 2) {
          return true;
        } else if (showMode == 3) {
          // 当前菜在招牌菜类显示
          if (this.suggest == 1) {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>
