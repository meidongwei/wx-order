<template>
  <div style="display:flex;">
    <div class="menu-wrapper" ref="menuRef">
      <ul>
        <li v-for="(item, index) in foodsList" :key="item.id"
          :class="{'current': currentIndex === index}">
          <a @click="selectMenu(index, $event)">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsRef">
      <div>
        <div class="foods-list-hook" v-for="item in foodsList" :key="item.title">
          <p class="foods-item-title">{{ item.title }}</p>
          <ul class="foods-item-con">
            <li v-for="(food, index) in item.list" :key="index">
              <span>
                <div class="control">
                  <cart-control :food="food" @drop="drop"></cart-control>
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shopcart">
      <shop-cart :selectFoods="selectFoods" ref="shopcartRef">
      </shop-cart>
    </div>
  </div>
</template>

<script>
import ShopCart from './shop-cart'
import axios from 'axios'
import httpUrl from '@/http_url'
import BScroll from 'better-scroll'
import CartControl from '@/components/cart-control'
export default {
  components: {
    ShopCart,
    CartControl
  },
  data () {
    return {
      // food: {},
      listHeight: [],
      // 计算当前滚动的 Y 值
      scrollY: 0,
      foodsList: [
        {
          id: 1,
          title: '热销',
          list: [
            {
              name: '宫保鸡丁',
              count: 0,
              price: 20
            },
            {
              name: '鱼香肉丝',
              count: 0,
              price: 20
            },
            {
              name: '尖椒炒肉',
              count: 0,
              price: 20
            },
            {
              name: '牛肉馅饼',
              count: 0,
              price: 20
            },
            {
              name: '南瓜粥',
              count: 0,
              price: 20
            }
          ]
        },
        {
          id: 2,
          title: '折扣',
          list: [
            {
              name: '手撕包菜',
              count: 0,
              price: 20
            },
            {
              name: '西红柿炒鸡蛋',
              count: 0,
              price: 20
            },
            {
              name: '炒土豆丝',
              count: 0,
              price: 20
            },
            {
              name: '拍黄瓜',
              count: 0,
              price: 20
            },
            {
              name: '八宝酱菜',
              count: 0,
              price: 20
            },
            {
              name: '扁豆焖面',
              count: 0,
              price: 20
            },
          ]
        },
        {
          id: 3,
          title: '果拼果汁',
          list: [
            {
              name: '鲜榨哈密瓜汁',
              count: 0,
              price: 20
            },
            {
              name: '鲜榨橙汁',
              count: 0,
              price: 20
            },
            {
              name: '西瓜苹果拼盘',
              count: 0,
              price: 20
            },
            {
              name: '西瓜香蕉拼盘',
              count: 0,
              price: 20
            },
            {
              name: '香蕉菠萝拼盘',
              count: 0,
              price: 20
            },
            {
              name: '菠萝哈密瓜拼盘',
              count: 0,
              price: 20
            },
          ]
        },
        {
          id: 4,
          title: '零食',
          list: [
            {
              name: '香脆兰花豆',
              count: 0,
              price: 20
            },
            {
              name: '美味锅巴',
              count: 0,
              price: 20
            },
            {
              name: '卫龙辣条',
              count: 0,
              price: 20
            },
            {
              name: '大白兔奶糖',
              count: 0,
              price: 20
            },
            {
              name: '零食大杂烩',
              count: 0,
              price: 20
            }
          ]
        },
        {
          id: 5,
          title: '主食',
          list: [
            {
              name: '香葱大饼',
              count: 0,
              price: 20
            },
            {
              name: '白米饭',
              count: 0,
              price: 20
            },
            {
              name: '南瓜粥',
              count: 0,
              price: 20
            },
            {
              name: '北瓜粥',
              count: 0,
              price: 20
            },
            {
              name: '小米粥',
              count: 0,
              price: 20
            },
            {
              name: '紫菜蛋汤',
              count: 0,
              price: 20
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        // 落到这个区间 或者 最后一个(无 h2)
        if ((this.scrollY >= h1 && this.scrollY < h2) || !h2) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let select = []
      // 之前一直错，可能是 this 指向问题，不用箭头函数
      this.foodsList.forEach((good) => {
        good.list.forEach((food) => {
          if (food.count) {
            select.push(food)
          }
        })
      })
      return select
    }
  },
  created () {
  },
  mounted () {
    this._initScroll()
    this._calcHeight()
  },
  methods: {
    drop (target) {
      // 性能优化，异步异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcartRef.drop(target)
      })
    },
    // better-scroll 默认会阻止浏览器的原生 click 事件。
    // 当设置为 true，better-scroll 会派发一个 click 事件
    // 我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
    selectMenu (index, event) {
      // 解决PC端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsRef.getElementsByClassName('foods-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 100)
    },
    // 初始化 BScroll
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuRef, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsRef, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.floor(pos.y))
      })
    },
    // 计算右侧每一大项的高度
    _calcHeight () {
      let foodList = this.$refs.foodsRef.getElementsByClassName('foods-list-hook')
      let height = 0
      this.listHeight.push(height)

      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    }

  }
}
</script>

<style scoped>
/* 左侧按钮模块 */
.menu-wrapper {
  height: calc(100vh - 60px);
  width: 100px;
  overflow: hidden;
}
.menu-wrapper ul li {
  padding: 0;
  border-bottom: 1px solid #f2f2f2;
}
.menu-wrapper ul li a {
  display: block;
  padding: 18px 10px;
  font-size: 14px;
}
.current {
  background-color: #d5d5d5;
}

/* 右侧食物模块 */
.foods-wrapper {
  height: calc(100vh - 50px);
  flex: 1;
  overflow: hidden;
  background-color: #ebebeb;
  border-left: 1px solid #f1f1f1;
}
.foods-item-title {
  padding: 5px 10px;
  font-size: 14px;
}
.foods-item-con li {
  padding: 30px 10px;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: flex-end;
}

/* 购物车样式 */
.shopcart {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
