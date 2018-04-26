<template>
  <div>

    <!-- 大图模块 -->
    <div v-show="isShowSellerHeader" class="seller-header">
      <div class="desc">
        <div>
          <span>减</span>
          满100减20，满50减10
        </div>
        <div>3个活动</div>
      </div>
    </div>

    <div style="display:flex;">
      <!-- 左侧列表 -->
      <div class="menu-wrapper" ref="menuRef">
        <ul>
          <li v-for="(item, index) in foodsList" :key="item.id"
            :class="{'current': currentIndex === index}">
            <a @click="selectMenu(index, $event)">
              {{ item.title }}
            </a>
            <div class="totalCount"
              v-show="IsShowCount(item.list)">
              {{ item.list | handleGetSum }}
            </div>
          </li>
        </ul>
      </div>

      <!-- 右侧列表 -->
      <div class="foods-wrapper" ref="foodsRef">
        <div>
          <div class="foods-list-hook" v-for="item in foodsList" :key="item.title">
            <p class="foods-item-title">{{ item.title }}</p>
            <ul class="foods-item-con">
              <li v-for="(food, index) in item.list" :key="index">
                <div :class="item.id === 1 ? 'big-show' : 'small-show' ">
                  <div class="food-left">
                    <span>暂无图片</span>
                    <img src="/pzcatering-web/images/daxia.jpeg">
                  </div>
                  <div class="food-right">
                    <h4>{{ food.name }}</h4>
                    <p style="color:#9c9c9c;font-size:10px;">
                      源于澳大利亚进口鸡肉和...
                    </p>
                    <!-- <p style="color:#5b5b5b;font-size:12px;">
                      月售59份<span style="padding-left:5px;">
                        好评率100%</span>
                    </p> -->
                    <p style="color:#5b5b5b;font-size:10px;display:flex;">
                      <span style="background:#ed4f1e;color:#fff;padding:0 2px;border:1px solid #ed4f1e;height:11px;
                      display:flex;justify-content:center;align-items:center;">5折</span>
                      <span style="padding-left:2px;border:1px solid #ed4f1e;height:11px;padding-right:2px;
                      display:flex;justify-content:center;align-items:center;color:#ed4f1e;">
                        每单限1份优惠</span>
                    </p>
                    <p style="color:#f06019;">
                      	￥{{ food.price }}
                    </p>
                  </div>
                </div>
                <!-- 减 num 加 -->
                <div class="control">
                  <cart-control :food="food" :user="user"
                    @add="add" @decrease="decrease"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <div class="shopcart">
        <shop-cart :selectFoods="selectFoods" ref="shopcartRef"
          @handleAdd="add" @handleDecrease="decrease"
          @empty="empty" :user="user">
        </shop-cart>
      </div>
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
      // 用户信息
      user: {
        nickname: '',
        headimgurl: ''
      },
      timeid: 0,
      avatarUrl: '',
      dishesName: '',
      dishesCount: 1,
      websock: null,
      listHeight: [],
      // 计算当前滚动的 Y 值
      scrollY: 0,

      // 菜品数据
      foodsList: [
        {
          id: 1,
          title: '热销',
          list: [
            {
              dishesid: 1,
              name: '蒸羊羔儿',
              count: 0,
              price: 20
            },
            {
              dishesid: 2,
              name: '蒸熊掌',
              count: 0,
              price: 20
            },
            {
              dishesid: 3,
              name: '蒸鹿尾儿',
              count: 0,
              price: 20
            },
            {
              dishesid: 4,
              name: '烧花鸭',
              count: 0,
              price: 20
            },
            {
              dishesid: 5,
              name: '烧雏鸡',
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
              dishesid: 6,
              name: '烧子鹅',
              count: 0,
              price: 20
            },
            {
              dishesid: 7,
              name: '炉猪',
              count: 0,
              price: 20
            },
            {
              dishesid: 8,
              name: '炉鸭',
              count: 0,
              price: 20
            },
            {
              dishesid: 9,
              name: '酱鸡',
              count: 0,
              price: 20
            },
            {
              dishesid: 10,
              name: '腊肉',
              count: 0,
              price: 20
            },
            {
              dishesid: 11,
              name: '松花',
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
              dishesid: 12,
              name: '小肚儿',
              count: 0,
              price: 20
            },
            {
              dishesid: 13,
              name: '酱肉',
              count: 0,
              price: 20
            },
            {
              dishesid: 14,
              name: '香肠',
              count: 0,
              price: 20
            },
            {
              dishesid: 15,
              name: '什锦酥盘儿',
              count: 0,
              price: 20
            },
            {
              dishesid: 16,
              name: '熏鸡白脸儿',
              count: 0,
              price: 20
            },
            {
              dishesid: 17,
              name: '清蒸八宝猪',
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
              dishesid: 18,
              name: '江米酿鸭子',
              count: 0,
              price: 20
            },
            {
              dishesid: 19,
              name: '罐儿野鸡',
              count: 0,
              price: 20
            },
            {
              dishesid: 20,
              name: '罐儿鹌鹑',
              count: 0,
              price: 20
            },
            {
              dishesid: 21,
              name: '卤什件儿',
              count: 0,
              price: 20
            },
            {
              dishesid: 22,
              name: '卤子鹅',
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
              dishesid: 23,
              name: '山鸡',
              count: 0,
              price: 20
            },
            {
              dishesid: 24,
              name: '兔脯',
              count: 0,
              price: 20
            },
            {
              dishesid: 25,
              name: '莱蟒',
              count: 0,
              price: 20
            },
            {
              dishesid: 26,
              name: '银鱼',
              count: 0,
              price: 20
            },
            {
              dishesid: 27,
              name: '清蒸哈什蚂',
              count: 0,
              price: 20
            },
            {
              dishesid: 28,
              name: '烩鸭腰儿',
              count: 0,
              price: 20
            }
          ]
        }
      ]
    }
  },
  filters: {
    // 监听菜品类别中所有菜品的数量,
    // 返回菜品数量的和
    handleGetSum (list) {
      let n = 0
      list.forEach(food => {
        n += food.count
      })
      return n
    }
  },
  computed: {
    // 监听右侧滚动值, 实时显示左侧类别
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

    // 监听 foodsList 的变化,
    // 把已点的菜品信息传给 shop-cart
    selectFoods () {
      let select = []
      this.foodsList.forEach((good) => {
        good.list.forEach((food) => {
          if (food.count) {
            select.push(food)
          }
        })
      })
      return select
    },

    // 监听 scrollY < 200 时, 显示大图模块
    isShowSellerHeader () {
      if (this.scrollY < 200) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    // 获取用户信息, 用于传值给 shop-cart 和 cart-control
    this.user.nickname = sessionStorage.getItem('nickname')
    this.user.headimgurl = sessionStorage.getItem('headimgurl')

    // 初始化 foodsList
    this.initWebSocket()
  },
  mounted () {
    this._initScroll()
    this._calcHeight()
  },
  methods: {

    // 是否显示左侧栏目菜品数量
    IsShowCount (list) {
      let n = 0
      list.forEach(food => {
        n += food.count
      })
      return n > 0 ? true : false
    },

    // websocket
    add (data) {
      this.websocketsend(JSON.stringify(data))
    },
    decrease (data) {
      this.websocketsend(JSON.stringify(data))
    },
    empty (data) {
      this.websocketsend(JSON.stringify(data))
    },

    // 初始化weosocket
    initWebSocket () {
      // let tableid = sessionStorage.getItem('tableid')
      // const wsurl = 'wss://' + location.hostname
      //   + '/pzcatering-web/ws/dish.do?' + tableid
      const wsurl = 'ws:192.168.1.119:8081/pzcatering-web/ws/dish.do?1'

      this.websock = new WebSocket(wsurl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },

    // 接收数据
    websocketonmessage (e) {
      /*
       * type 为 0 时,
       * 新用户进入后要同步服务器信息（其他用户的信息）
       * type 为 1 时,
       * 用户点菜后, 更新全部信息, 显示个人点菜信息提示
       * type 为 2 时,
       * 清空所有菜品数量
       */
      let res = JSON.parse(e.data)

      if (res.type === 0) {

        if (res.data.length !== 0) {

          this.foodsList.forEach(good => {
            good.list.forEach(food => {
              res.data.forEach(item => {
                item.dishes.forEach(dish => {
                  if (food.dishesid === dish.dishesid) {
                    food.count = dish.count
                  }
                })
              })
            })
          })

        }
        console.log('同步成功')

      } else if (res.type === 1) {

        /*
         * type 为 1 时, 包含一个数组一个对象,
         * 数组: res.data.allDishes (所有人点的所有菜品信息)
         * 对象: res.data.newDish (个人的点菜信息)
         */
        this.foodsList.forEach(good => {
          good.list.forEach(food => {

            // 更新全部信息
            food.count = 0
            res.data.allDishes.forEach(item => {
              item.dishes.forEach(dish => {
                if (food.dishesid === dish.dishesid) {
                  food.count += dish.count
                }
              })
            })

            // 显示个人点菜信息提示
            if (food.dishesid === res.data.newDish.dishesid) {
              this.dishesName = food.name
              // if (typeof(Storage) !== "undefined") {
              //   if (sessionStorage.headimgurl) {
              //     this.avatarUrl = sessionStorage.headimgurl
              //   } else {
              //     this.avatarUrl = res.data.newDish.headimgurl
              //     sessionStorage.headimgurl = res.data.newDish.headimgurl
              //   }
              // } else {
              // 	console.log("抱歉，您的浏览器不支持 web 存储")
              // }
              this.avatarUrl = res.data.newDish.headimgurl
              this.dishesCount = res.data.newDish.count
              this.$notice(this.avatarUrl, this.dishesName, this.dishesCount)
            }

          })
        })
        console.log("数据已接收...")

      } else if (res.type === 2) {

        this.foodsList.forEach(good => {
          good.list.forEach(food => {
            food.count = 0
          })
        })
        console.log("数据已清空!")

      }

    },

    // 发送数据
    websocketsend (data) {
      this.websock.send(data)
      console.log("数据发送中...")
    },

    // 通信错误
    websocketonerror (e) {
      setTimeout(() => {
        this.initWebSocket()
      }, 5000)
      console.log("通信发生错误...")
      // console.log(e)
    },

    // 关闭
    websocketclose (e) {
      setTimeout(() => {
        this.initWebSocket()
      }, 5000)
      console.log("连接已关闭...")
      // console.log(e)
    },

    /*
     * better-scroll 默认会阻止浏览器的原生 click 事件。
     * 当设置为 true，better-scroll 会派发一个 click 事件
     * 我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
     */
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

    // 小球掉落动画
    // drop (target) {
    //   // 性能优化，异步异步执行下落动画
    //   this.$nextTick(() => {
    //     this.$refs.shopcartRef.drop(target)
    //   })
    // }

  }
}
</script>

<style scoped>
/* 头部 */
.seller-header {
  height: 200px;
  background-color: #636363;
  background: url('/pzcatering-web/images/daxia.jpeg') no-repeat center center;
  background-size: 100%;
  position: relative;
}
.seller-header .desc {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(33, 33, 33, .5);
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  color: #fff;
}
.seller-header .desc span {
  background-color: #fd6d52;
  padding: 0 2px 2px 2px;
}

/* 左侧按钮模块 */
.menu-wrapper {
  height: calc(100vh - 50px);
  width: 100px;
  overflow: hidden;
  /* overflow: auto; */
  /* -webkit-overflow-scrolling: touch; */
  background-color: #f5f5f5;
}
.menu-wrapper ul li {
  position: relative;
}
.menu-wrapper ul li::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e8e8e8;
  color: #e8e8e8;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.menu-wrapper ul li:first-child::after {
  border: 0;
}
.menu-wrapper ul li a {
  display: block;
  padding: 18px 10px;
  font-size: 14px;
  color: #585858;
}
.current {
  background-color: #fff;

}
.menu-wrapper ul li.current a {
  color: #fd6d52;
}
.totalCount {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 24px;
  height: 16px;
  line-height: 16px;
  border-radius: 12px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background-color: #f01414;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); */
  text-align: center;
}

/* 右侧食物模块 */
.foods-wrapper {
  height: calc(100vh - 50px);
  flex: 1;
  overflow: hidden;
  /* overflow: auto; */
  /* -webkit-overflow-scrolling: touch; */
  background-color: #f5f5f5;
}
.foods-item-title {
  padding: 5px 10px;
  font-size: 14px;
  border-left: 1px solid #dddddd;
  color: #585858;
}
.foods-item-con li {
  padding: 10px;
  background-color: #fff;
  position: relative;
}

/* 小图展示 */
.small-show {
  display: flex;
}

.food-left {
  width: 100px;
  height: 60px;
  background-color: #ececec;
  margin-right: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.food-left span {
  position: fixed;
  z-index: 1;
  color: #d2d2d2;
  font-size: 14px;
}
.food-left img {
  width: 100%;
  height: auto;
  z-index: 2;
}
.control {
  position: absolute;
  bottom: 0;
  right: 10px;
}
.foods-item-con li::after {
  content: '';
  position: absolute;
  left: 10px;
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
.foods-item-con li:first-child::after {
  border: 0;
}

/* 大图展示 */
.big-show .food-left {
  width: 100%;
  height: 153px;
  background-color: #ececec;
  margin-right: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.big-show .food-left span {
  position: fixed;
  z-index: 1;
  color: #d2d2d2;
  font-size: 20px;
}
.big-show .food-left img {
  width: 100%;
  height: auto;
  z-index: 2;
}





/* 购物车样式 */
.shopcart {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}


</style>
