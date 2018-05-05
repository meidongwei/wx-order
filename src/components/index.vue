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

    <!-- 头像提示组件会挂在到 id 为 cc 的 dom 中 -->
    <div id="cc" style="display:flex;">

      <!-- 左侧列表 -->
      <div class="menu-wrapper" ref="menuRef">
        <ul>
          <li v-for="(value, key, index) in foodsList" :key="key"
            :class="{'current': currentIndex === index}">
            <a @click="selectMenu(index, $event)">
              {{ value.title }}
            </a>
            <div class="totalCount"
              v-show="IsShowCount(value.list)">
              {{ value.list | handleGetSum }}
            </div>
          </li>
        </ul>
      </div>

      <!-- 右侧列表 -->
      <div class="foods-wrapper" ref="foodsRef">
        <div>
          <div class="foods-list-hook"
            v-for="(value, key) in foodsList" :key="key">
            <p class="foods-item-title">{{ value.title }}</p>
            <ul class="foods-item-con">
              <li v-for="(val, k) in value.list" :key="k">
                <div :class="key === '1' ? 'big-show' : 'small-show' ">
                  <div class="food-left">
                    <span>暂无图片</span>
                    <img src="/pzcatering-web/images/daxia.jpeg">
                  </div>
                  <div class="food-right">
                    <h4>{{ val.name }}</h4>
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
                      	￥{{ val.price }}
                    </p>
                  </div>
                </div>
                <!-- 减 num 加 -->
                <div class="control">
                  <cart-control :food="{
                      count: val.count,
                      dishesid: k,
                      rcid: key
                    }"
                    @add="add" @decrease="decrease">
                  </cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <div class="shopcart">
        <shop-cart :selectFoods="categoriesComputed" ref="shopcartRef"
          :foodsList="foodsList" :persons="persons"
          @isShowShopCart="isShowShopCartMethod"
          @handleAdd="add" @handleDecrease="decrease"
          @empty="empty">
        </shop-cart>
      </div>

    </div>

    <!-- 筛选菜品面板 -->
    <GeneralCart :isShowGeneralCart="isShowGeneralCart"
      :dishesOfPerson="dishesOfPerson" @close="close"
      @handleAdd="add" @handleDecrease="decrease">
    </GeneralCart>

  </div>
</template>

<script>
import ShopCart from './shop-cart'
import axios from 'axios'
import httpUrl from '@/http_url'
import BScroll from 'better-scroll'
import CartControl from '@/components/cart-control'
import GeneralCart from '@/components/general-cart'
export default {
  components: {
    ShopCart,
    CartControl,
    GeneralCart
  },
  data () {
    return {
      dishesOfPerson: [],
      isShowShopCart: false,
      isShowGeneralCart: false,
      res: {
        // data: {
        //   categories: {
        //     1: {
        //       '1,1': {count: 2},
        //       '2,2': {count: 3}
        //     },
        //     2: {
        //       '6,1': {count: 1},
        //       '6,2': {count: 1}
        //     }
        //   },
        //   persons: {
        //     '1': {headimgurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELImyOUmrVjSb9ic27KVibGasR3xuMRmZGbO4VYueopgOACYwuI2jgGX7w6aaXYPf5G9uqmLniczGnvQ/132'},
        //     '2': {headimgurl: 'https://user-gold-cdn.xitu.io/2018/5/3/1632417db7b0efd0?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'}
        //   }
        // }
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
      foodsList: {
        1: {
          title: '热销',
          list: {
            1: {
              name: '蒸羊羔儿',
              count: 0,
              price: 20
            },
            2: {
              name: '蒸熊掌',
              count: 0,
              price: 20
            },
            3: {
              name: '蒸鹿尾儿',
              count: 0,
              price: 20
            },
            4: {
              name: '烧花鸭',
              count: 0,
              price: 20
            },
            5: {
              name: '烧雏鸡',
              count: 0,
              price: 20
            }
          }
        },
        2: {
          title: '折扣',
          list: {
            6: {
              name: '烧子鹅',
              count: 0,
              price: 20
            },
            7: {
              name: '炉猪',
              count: 0,
              price: 20
            },
            8: {
              name: '炉鸭',
              count: 0,
              price: 20
            },
            9: {
              name: '酱鸡',
              count: 0,
              price: 20
            },
            10: {
              name: '腊肉',
              count: 0,
              price: 20
            },
            11: {
              name: '松花',
              count: 0,
              price: 20
            },
          }
        },
        3: {
          title: '果拼果汁',
          list: {
            12: {
              name: '小肚儿',
              count: 0,
              price: 20
            },
            13: {
              name: '酱肉',
              count: 0,
              price: 20
            },
            14: {
              name: '香肠',
              count: 0,
              price: 20
            },
            15: {
              name: '什锦酥盘儿',
              count: 0,
              price: 20
            },
            16: {
              name: '熏鸡白脸儿',
              count: 0,
              price: 20
            },
            17: {
              name: '清蒸八宝猪',
              count: 0,
              price: 20
            },
          }
        },
        4: {
          title: '零食',
          list: {
            18: {
              name: '江米酿鸭子',
              count: 0,
              price: 20
            },
            19: {
              name: '罐儿野鸡',
              count: 0,
              price: 20
            },
            20: {
              name: '罐儿鹌鹑',
              count: 0,
              price: 20
            },
            21: {
              name: '卤什件儿',
              count: 0,
              price: 20
            },
            22: {
              name: '卤子鹅',
              count: 0,
              price: 20
            }
          }
        },
        5: {
          title: '主食',
          list: {
            23: {
              name: '山鸡',
              count: 0,
              price: 20
            },
            24: {
              name: '兔脯',
              count: 0,
              price: 20
            },
            25: {
              name: '莱蟒',
              count: 0,
              price: 20
            },
            26: {
              name: '银鱼',
              count: 0,
              price: 20
            },
            27: {
              name: '清蒸哈什蚂',
              count: 0,
              price: 20
            },
            28: {
              name: '烩鸭腰儿',
              count: 0,
              price: 20
            }
          }
        }
      }
    }
  },
  filters: {
    // 监听菜品类别中所有菜品的数量,
    // 返回菜品数量的和
    handleGetSum (list) {
      let n = 0
      for (let key in list) {
        n += list[key].count
      }
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

    // 传给 shop-cart
    categoriesComputed () {
      // 当一个人清空购物车时, 服务器返回 res: {type:1},
      // 所以要判断 res 中是否有 data
      if (this.res.data) {
        // for (let rcid in this.res.data.categories) {
        //   // 当一个人点的菜数量为0时, 就删除此项
        //   for (let key in this.res.data.categories[rcid]) {
        //     if (this.res.data.categories[rcid][key].count === 0) {
        //       delete this.res.data.categories[rcid][key]
        //     }
        //   }
        // }
        return this.res.data.categories
      }
    },

    // 传给 shop-cart
    persons () {
      // 当一个人清空购物车时, 服务器返回 res: {type:1},
      // 所以要判断 res 中是否有 data
      if (this.res.data) {
        return this.res.data.persons
      }
    },

    // 监听 scrollY < 200 时, 显示大图模块
    isShowSellerHeader () {
      if (this.scrollY < 200) {
        return true
      } else {
        return false
      }
    },

  },
  created () {
    this.initWebSocket()
  },
  mounted () {
    this._initScroll()
    this._calcHeight()
  },
  methods: {
    // shop-cart 组件显示或隐藏时, 通知父组件 index.vue
    isShowShopCartMethod (data) {
      this.isShowShopCart = data
    },

    // 是否显示左侧栏目菜品数量
    IsShowCount (list) {
      let n = 0
      for (let key in list) {
        n += list[key].count
      }
      return n > 0 ? true : false
    },

    add (data) {
      if (this.isShowShopCart) {
        // 购物车订单页点击+
        this.websocketsend(JSON.stringify(data))
      } else if (this.isShowGeneralCart) {
        // 筛选菜品页上点击+
        this.websocketsend(JSON.stringify(data))
        // 更新 dishesOfPerson
        this.dishesOfPerson.forEach(dish => {
          if (dish.food.openid === data.data.openid) {
            dish.food.count += 1
          }
        })
      } else {
        // 主页上点击+
        data.data.openid = sessionStorage.getItem('openid')
        this.websocketsend(JSON.stringify(data))
      }
    },

    decrease (data) {
      if (this.isShowShopCart) {
        this.websocketsend(JSON.stringify(data))
      } else if (this.isShowGeneralCart) {
        this.websocketsend(JSON.stringify(data))
        // 更新 dishesOfPerson
        this.dishesOfPerson.forEach((dish, index) => {
          if (dish.food.openid === data.data.openid) {
            dish.food.count -= 1
            if (dish.food.count === 0) {
              this.dishesOfPerson.splice(index, 1)
            }
          }
        })
      } else {
        // -------------------------
        // 判断当前这个菜有几个人点
        let arr = []
        for (let rcid in this.categoriesComputed) {
          let keys = Object.keys(this.categoriesComputed[rcid])
          keys.forEach(item => {
            arr.push(Number(item.split(",")[0]))
          })
        }
        let tmpArr = arr.filter((item) => {
          return item === Number(data.data.dishesid)
        })

        // tmpArr 长度大于 1 为多人点菜, 否则为单人点的菜
        if (tmpArr.length > 1) {
          let dishesid = Number(data.data.dishesid)
          this.handleDishesOfPerson(dishesid)
          this.isShowGeneralCart = true
        } else {
          let rcid = Number(data.data.rcid)
          for (let key in this.categoriesComputed[rcid]) {
            let dishesid = key.split(",")[0]
            let openid = key.split(",")[1]
            if (dishesid === Number(data.data.dishesid)) {
              data.data.openid = openid
            }
          }
          this.websocketsend(JSON.stringify(data))
        }
        // -------------------------
      }
    },

    // 找到所有点当前这个菜的所有人
    handleDishesOfPerson (val) {
      this.dishesOfPerson.splice(0, this.dishesOfPerson.length)
      for (let rcid in this.categoriesComputed) {
        for (let key in this.categoriesComputed[rcid]) {
          let dishesid = Number(key.split(",")[0])
          let openid = key.split(",")[1]
          if (dishesid === val) {
            let food = {}
            food.count = this.categoriesComputed[rcid][key].count
            food.dishesid = val
            food.rcid = rcid
            food.openid = openid

            let obj = {}
            obj.food = food
            obj.name = this.foodsList[rcid].list[dishesid].name
            obj.headimgurl = this.res.data.persons[openid].headimgurl

            this.dishesOfPerson.push(obj)
          }
        }
      }
    },

    // 清空购物车（账单页）
    empty (data) {
      this.websocketsend(JSON.stringify(data))
    },

    // 初始化 weosocket
    initWebSocket () {
      let tableid = sessionStorage.getItem('tableid')
      let wsurl = httpUrl.getWsurl + tableid
      // let wsurl = 'ws:192.168.1.119:8081/pzcatering-web/ws/dish.do?1'
      this.websock = new WebSocket(wsurl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },

    // 接收数据
    websocketonmessage (e) {
      this.res = JSON.parse(e.data)
      console.log("接收数据：")
      console.log(this.res)

      // type:0 同步, type:1 清空
      if (this.res.type === 0) {

        // 同步所有菜品数据
        this.clearAllDishesCount()
        if (this.res.data) {
          for (let rcid in this.res.data.categories) {
            for (let key in this.res.data.categories[rcid]) {
              let dishesid = key.split(",")[0]
              let count = this.res.data.categories[rcid][key].count
              this.foodsList[rcid].list[dishesid].count += count
            }
          }

          // 如果有 newDish, 则弹窗头像提示框
          if (this.res.data.newDish) {
            let rcid = this.res.data.newDish.rcid
            let dishesid = this.res.data.newDish.dishesid
            this.dishesName = this.foodsList[rcid].list[dishesid].name
            this.avatarUrl = this.res.data.newDish.headimgurl
            this.dishesCount = this.res.data.newDish.count
            this.$notice(this.avatarUrl, this.dishesName, this.dishesCount)
          }
        }

      } else if (this.res.type === 1) {
        this.clearAllDishesCount()
      }

    },

    // 所有菜品数量清0
    clearAllDishesCount () {
      for (let key in this.foodsList) {
        for (let k in this.foodsList[key].list) {
          this.foodsList[key].list[k].count = 0
        }
      }
    },

    // 发送数据
    websocketsend (data) {
      this.websock.send(data)
      console.log("发送数据：")
      console.log(data)
    },

    // 通信错误
    websocketonerror (e) {
      setTimeout(() => {
        this.initWebSocket()
      }, 5000)
    },

    // 关闭
    websocketclose (e) {
      setTimeout(() => {
        this.initWebSocket()
      }, 5000)
    },

    // 点击左侧类别, 右侧滑动到对应位置
    selectMenu (index, event) {
      // better-scroll 默认会阻止浏览器的原生 click 事件。
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
    },

    // 关闭 general-cart
    close () {
      this.isShowGeneralCart = false
    }

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
  position: absolute;
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
