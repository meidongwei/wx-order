<template>
  <div>
    <!-- search -->
    <div class="order-search">
      <a class="btn btn-primary btn-sm btn-circle">
        <img src="../assets/images/search.png">
      </a>
      <a class="btn btn-primary btn-sm btn-circle">
        <img src="../assets/images/history.png">
      </a>
    </div>

    <!-- banner -->
    <div class="order-banner" :class="isFixed ? 'banner-fixed' : ''">
      <BannerImage :src="head_activity.image"/>
      <div class="order-banner-bar" @click="showGonggao">
        <div class="order-banner-bar-left">
          <template v-if="head_activity.activities.length > 0">
            <span class="fonticon fonticon-red" v-if="head_activity.activities[0].type === 1">满</span>
            <span class="fonticon fonticon-red" v-else-if="head_activity.activities[0].type === 2">赠</span>
            <span class="fonticon fonticon-red" v-else-if="head_activity.activities[0].type === 3">特</span>
            <span class="fonticon fonticon-red" v-else-if="head_activity.activities[0].type === 4">折</span>
            <span class="fonticon fonticon-red" v-else-if="head_activity.activities[0].type === 5">惠</span>
            <span class="order-banner-bar-lefttitle">{{ head_activity.activities[0].title }}</span>
          </template>
        </div>
        <div class="order-banner-bar-right">
          <div class="gg-num">
            <span v-if="head_activity.activities">{{ head_activity.activities.length }}个活动</span>
          </div>
          <div class="triangle-box">
            <div class="triangle"></div>
            <div class="triangle2"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:194px;" v-if="isFixed"></div>

    <div class="order-content">

      <!-- 左侧菜品分类 -->
      <div class="menu-wrapper" ref="menuRef" :class="isFixed ? 'menu-fixed' : ''">
        <ul>
          <li class="menu-list-hook" v-for="(item, index) in dish_kinds"
              :class="{'current': currentIndex === index}" @click="selectCategory(index)">
            <a>
              <img :src="currentIndex === index ? hotfill : hotline" v-if="item.suggest == 1">
              <span>{{ item.name }}</span>
            </a>
            <DishesNum :rcid="item.id"/>
          </li>
        </ul>
      </div>
      <div style="width:78px;" v-if="isFixed"></div>

      <!-- 右侧菜品列表 -->
      <div class="foods-wrapper" ref="foodsRef">
        <div>
          <div class="foods-list-hook" v-for="(category, index) in categoryDishesList">
            <div class="foods-item-title">
              <span class="foods-item-title-line"></span>
              <span class="foods-item-title-text">
                {{ category.name }}
              </span>
              <span class="foods-item-title-line"></span>
            </div>
            <ul class="foods-item-con">
              <!-- 菜品 -->
              <Dishes :dish="dish" :suggest="category.suggest" v-for="dish in category.dishes"/>
            </ul>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <div class="shopcart">
        <ShopCart ref="shopcartRef"/>
      </div>
    </div>
    <!-- 筛选菜品面板 -->
    <GeneralCart/>
    <!-- 公告 -->
    <Gonggao ref="gonggaoRef"></Gonggao>
  </div>
</template>

<script>
  import ShopCart from '@/components/shop-cart'
  import GeneralCart from '@/components/general-cart'
  import Gonggao from '@/pages/order/gonggao'
  import DishesNum from './order/dishesNum'
  import Dishes from './order/dishes'
  import {mapState} from 'vuex'
  import hotline from '@/assets/images/hot-line.png'
  import hotfill from '@/assets/images/hot-fill.png'
  import menuline from '@/assets/images/menu-line.png'
  import menufill from '@/assets/images/menu-fill.png'
  import BannerImage from './order/bannerImage'
  export default {
    components: {
      ShopCart, GeneralCart, Gonggao, DishesNum, Dishes, BannerImage
    },
    data () {
      return {
        foodListHeight: [], // 存右侧每一大项高度
        menuListHeight: [], // 存左侧菜类每一项高度
        scrollY: 0, // 计算当前滚动的 Y 值
        isFixed: false, // 浮动状态
        hotline: hotline,
        hotfill: hotfill,
        menuline: menuline,
        menufill: menufill,
      }
    },
    computed: {
      // 监听右侧滚动值, 实时显示左侧类别
      currentIndex () {
        // 滚动值 < 129 时默认选中左侧第一项
        // 129 为 banner 的高度减去 bar 的高度
        if (this.scrollY < 129) {
          return 0
        }
        for (let i = 0; i < this.foodListHeight.length; i++) {
          let h1 = this.foodListHeight[i] + 129;
          let h2 = this.foodListHeight[i + 1] + 129;
          // 落到这个区间 或者 最后一个(无 h2)
          if ((this.scrollY >= h1 && this.scrollY < h2) || !h2) {
            return i
          }
        }
      },
      ...mapState({
        dish_kinds: state => state.order.baseDatas.dish_kinds,
        dishes: state => state.order.baseDatas.dishs,
        head_activity: state => state.order.baseDatas.head_activity || {activities: []},
      }),
      // 菜品数据
      categoryDishesList() {
        let categories = this._.cloneDeep(this.dish_kinds);
        this._.forIn(this.dishes, v => {
          // 微信端显示
          if (v.wxDishs) {
            // 如果当前菜品是招牌菜,将该菜品添加至对应招牌菜类下
            if (v.reccid != 0) {
              let category = this._.find(categories, {id: v.reccid});
              if (category) {
                if (!category.dishes) {
                  category.dishes = [];
                }
                category.dishes.push(v);
              }
            }

            // 当前菜品C端显示类
            let cCategory = this._.find(categories, {id: v.recccid});
            if (cCategory) {
              if (!cCategory.dishes) {
                cCategory.dishes = [];
              }
              cCategory.dishes.push(v);
            }
          }
        });
        return categories;
      },
    },
    watch: {
      // 监听菜品数据的变化，更新菜品数据的高度
      categoryDishesList: function (val) {
        if (val) {
          this.$nextTick(() => {
            this._calcFoodHeight()
          })
        }
      },
      // 监听菜类变化，更新菜类数据的高度
      dish_kinds: function (val) {
        if (val) {
          this.$nextTick(() => {
            this._calcMenuHeight()
          })
        }
      },
      // 监听左侧菜类状态，将选中菜类显示在屏幕中间
      currentIndex: function (val) {
        if (val >= 4 && val <= this.dish_kinds.length - 4) {
          this.$refs.menuRef.scroll(0, this.menuListHeight[val - 4])
        }
      }
    },
    mounted () {
      // 监听 scroll
      this._initScroll();
      // 获取菜品数据的高度
      if (this.categoryDishesList) {
        this._calcFoodHeight()
      }
      // 获取菜类数据的高度
      if (this.dish_kinds) {
        this._calcMenuHeight()
      }
    },
    methods: {
      // 到搜索页面
      gotoSearch () {
        this.$router.push({name: 'search'})
      },
      // 显示 order-banner
      showGonggao () {
        this.$refs.gonggaoRef.show(this.head_activity)
      },
      // 点击左侧类别, 右侧滑动到对应位置
      selectCategory (index) {
        window.scrollTo(0, this.foodListHeight[index] + 129)
      },
      // 监听 scroll
      _initScroll () {
        window.addEventListener('scroll', () => {
          this.scrollY = window.scrollY;
          if (window.scrollY > 129) {
            this.isFixed = true
          } else {
            this.isFixed = false
          }
        })
      },
      // 计算右侧每一大项的高度
      _calcFoodHeight () {
        let foodList = this.$refs.foodsRef.getElementsByClassName('foods-list-hook');
        let height = 0;
        this.foodListHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          // 10 为每一项的下边距
          height += foodList[i].clientHeight + 10;
          this.foodListHeight.push(height)
        }
      },
      // 计算左侧菜类每一项的高度
      _calcMenuHeight () {
        let menuList = this.$refs.menuRef.getElementsByClassName('menu-list-hook');
        let height = 0;
        this.menuListHeight.push(height);
        for (let i = 0; i < menuList.length; i++) {
          height += menuList[i].clientHeight;
          this.menuListHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-search {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 20;
    .btn {
      height: 26px;
      width: 26px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }

  // order-banner
  .order-banner {
    height: 194px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .order-banner-bar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 25px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      color: #858585;
      z-index: 2;
      border-bottom: 1px solid #F4F5F6;
      .order-banner-bar-left {
        display: flex;
        align-items: center;
        .order-banner-bar-lefttitle {
          font-size: 10px;
          display: flex;
          align-items: center;
        }
        .fonticon {
          margin-right: 5px;
        }
      }
      .order-banner-bar-right {
        display: flex;
        .gg-num {
          height: 20px;
          width: 70px;
          text-align: right;
          span {
            font-size: 10px;
          }
        }
        .triangle-box {
          position: relative;
          width: 20px;
          display: flex;
          justify-content: center;
          .triangle {
            width: 0;
            height: 0;
            border-top: 8px solid rgb(180, 180, 180);
            border-right: 8px solid transparent;
            transform: rotate(-135deg);
            position: absolute;
            top: 5px;
          }
          .triangle2 {
            width: 0;
            height: 0;
            border-top: 8px solid #ffffff;
            border-right: 8px solid transparent;
            transform: rotate(-135deg);
            position: absolute;
            top: 3px;
          }
        }
      }
    }
    .order-banner-bar.banner-fixed {
      position: fixed;
      top: 40px;
      width: 100%;
      z-index: 9;
    }
  }

  .banner-fixed {
    position: fixed;
    top: -129px;
    width: 100%;
    z-index: 9;
  }

  /* 主要内容 */
  .order-content {
    display: flex;
    background-color: #f5f5f5;
  }

  /* 左侧菜品分类 */
  .menu-wrapper {
    width: 78px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    padding-bottom: 50px;
    box-sizing: border-box;
    ul {
      li {
        position: relative;
        a {
          height: 56px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          font-size: 11px;
          color: #585858;
          img {
            width: 15px;
            margin-bottom: 5px;
          }
        }
        // 角标数量
        .badge {
          position: absolute;
          right: 3px;
          top: 3px;
        }
      }
      li::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #F4F5F6;
        color: #F4F5F6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      li:first-child::after {
        border: 0;
      }
    }
  }

  .menu-wrapper.menu-fixed {
    position: fixed;
    top: 65px;
    height: calc(100vh - 40px - 25px - 50px);
    z-index: 3;
  }
</style>
