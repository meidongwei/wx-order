<template>
  <div class="taocan">
    <div class="taocan-header">
      <div class="taocan-img">
        <DishesImage :src="dish.image"/>
      </div>
      <div class="taocan-title">
        <span>{{dish.name}}</span>
        <img src="../assets/images/bz.png">
      </div>
    </div>
    <div class="taocan-main">
      <div class="taocan-main-title">
        <span>套餐主菜</span>
      </div>
      <ul>
        <li v-for="item in dish.setmeals.maindish">
          <div class="taocan-item-img">
            <DishesImage :src="(dishes[item.dishsno] || {}).dishimg"/>
          </div>
          <div class="taocan-item-text">{{item.name | dishName}}</div>
          <div class="taocan-item-num">{{item.number}}{{item.name | normName}}</div>
        </li>
      </ul>
    </div>
    <div class="taocan-other">
      <!-- 套餐必选辅菜组 -->
      <div class="taocan-other-box" v-for="mandatory in dish.setmeals.mandatory">
        <div class="taocan-other-box-title">
          <span>
            请选择{{mandatory.title}}
            <span class="text-red">{{mandatory.selnum}}份</span>
          </span>
        </div>
        <div class="taocan-other-box-select">
          <span style="color:#bbbbbb;font-size:9px;" v-for="item in mandatory.items" v-if="item.number > 0">
            已选：{{item.name | dishName}}x{{item.number}}{{item.name | normName}}
          </span>
        </div>
        <div class="taocan-other-box-con">
          <div class="taocan-cell" :class="item.number ? 'taocan-cell-acitve' : ''" v-for="item in mandatory.items">
            <div class="taocan-cell-img">
              <DishesImage :src="(dishes[item.dishsno] || {}).dishimg"/>
            </div>
            <div class="taocan-cell-title">{{item.name}}</div>
            <div class="taocan-cell-footer">
              <div class="taocan-cell-left text-red">
                <div v-if="item.aprice > 0">
                  <span>加￥</span>
                  <span>{{item.aprice.toFixed(2)}}</span>
                </div>
              </div>
              <div class="taocan-cell-right">
                <CartControl :packDish="item" :maxNum="item.maxnum" :isAddEnable="mandatory.isEnable"
                             :dishsno="item.dishsno" :duid="item.duid" :practiceid="item.practiceid" @add="orderPackDish"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 套餐可选辅菜组 -->
      <div class="taocan-other-box" v-if="dish.setmeals.optional.length > 0">
        <div class="taocan-other-box-title">
          <span>请选择{{dish.setmeals.optional[0].title}}</span>
        </div>
        <div class="taocan-other-box-select">
          <span style="color:#bbbbbb;font-size:9px;" v-for="item in dish.setmeals.optional" v-if="item.number > 0">
            已选：{{item.name | dishName}}x{{item.number}}{{item.name | normName}}
          </span>
        </div>
        <div class="taocan-other-box-con">
          <div class="taocan-cell" :class="item.number ? 'taocan-cell-acitve' : ''" v-for="item in dish.setmeals.optional">
            <div class="taocan-cell-img">
              <DishesImage :src="(dishes[item.dishsno] || {}).dishimg"/>
            </div>
            <div class="taocan-cell-title">{{item.name}}</div>
            <div class="taocan-cell-footer">
              <div class="taocan-cell-left text-red">
                <div v-if="item.aprice > 0">
                  <span>加￥</span>
                  <span>{{item.aprice.toFixed(2)}}</span>
                </div>
              </div>
              <div class="taocan-cell-right">
                <CartControl :packDish="item" :maxNum="item.maxnum"
                             :dishsno="item.dishsno" :duid="item.duid" :practiceid="item.practiceid" @add="orderPackDish"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="taocan-other-box">
        <div class="taocan-other-box-title">
          <span>套餐简介</span>
        </div>
        <div class="taocan-other-box-con">
          <p>{{dish.describ}}</p>
        </div>
      </div>
    </div>
    <div class="taocan-footer">
      <div class="taocan-footer-left">
        <template v-if="totalAmount.tprice < totalAmount.price">
          <div class="taocan-footer-left-price1 text-red">
            <span>特</span>
            <span>￥</span>
            <Price :data="totalAmount.tprice.toFixed(2)"/>
          </div>
        </template>
        <template v-else-if="totalAmount.memberprice < totalAmount.price">
          <div class="taocan-footer-left-price1 text-red">
            <span>会</span>
            <span>￥</span>
            <Price :data="totalAmount.memberprice.toFixed(2)"/>
          </div>
        </template>
        <div class="taocan-footer-left-price2" :class="totalAmount.tprice < totalAmount.price ? 'delete' : ''">
          <span v-if="totalAmount.tprice < totalAmount.price || totalAmount.memberprice < totalAmount.price">原</span>
          <span>￥</span>
          <Price :data="String(totalAmount.price.toFixed(2))"/>
        </div>
      </div>
      <div class="taocan-footer-right">
        <a class="btn" :class="isCanAddToCart ? 'btn-primary' : 'btn-default'" @click="addToCart">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  import CartControl from '@/components/cart-control'
  import DishesImage from './order/dishesImage'
  import {mapState} from 'vuex'
  import Price from '@/components/base/price'
  export default {
    components: {CartControl, DishesImage, Price},
    data () {
      return {
        dish: null, // 当前所点套餐数据
      }
    },
    created () {
      this.dish = this._.cloneDeep(this.$route.params.dish);
      // 初始化每个必选辅菜组,isEnable表示当前组是否可继续点菜（即未满足点选规则）
      this._.forEach(this.dish.setmeals.mandatory, mandatory => {
        this.$set(mandatory, "isEnable", true);
      });
    },
    computed: {
      ...mapState({
        dishes: state => state.order.baseDatas.dishs,
      }),
      // 当前所点套餐总价
      totalAmount() {
        let price = this.dish.setmeals.orgprice; // 原价
        let memberprice = this.dish.setmeals.memberprice; // 会员价
        let tprice = this.dish.setmeals.price; // 特价
        this._.forEach(this.dish.setmeals.mandatory, mandatory => {
          this._.forEach(mandatory.items, item => {
            if (item.number) {
              price += item.number * item.aprice;
              memberprice += item.number * item.aprice;
              tprice += item.number * item.aprice;
            }
          })
        });
        return {price, memberprice, tprice};
      },
      // 当前套餐是否可入购物车（即所有菜品满足点选规则）
      isCanAddToCart() {
        let isCanAddToCart = true;
        this._.forEach(this.dish.setmeals.mandatory, mandatory => {
          // 如果存在一个组可以继续点菜，即未满足点选规则
          if (mandatory.isEnable) {
            isCanAddToCart = false;
            return false;
          }
        });
        return isCanAddToCart;
      }
    },
    methods: {
      // 套餐明细菜
      orderPackDish(item, count) {
        if (!item.number) {
          this.$set(item, "number", 0);
        }
        item.number += count;
        this.checkGroupRules();
      },
      // 判断每个必选组是否满足点选规则
      checkGroupRules() {
        this._.forEach(this.dish.setmeals.mandatory, mandatory => {
          let selnum = 0;
          this._.forEach(mandatory.items, item => {
            if (item.number) {
              selnum += item.number;
            }
          });
          if (selnum >= mandatory.selnum) {
            mandatory.isEnable = false;
          } else {
            mandatory.isEnable = true;
          }
        });
      },
      // 点击加入购物车
      addToCart() {
        // 判断当前套餐是否可入购物车
        if (this.isCanAddToCart) {
          // 组装已点选的辅菜
          let packitems = {
            mandatory: this._.cloneDeep(this.dish.setmeals.mandatory),
            optional: this._.filter(this.dish.setmeals.optional, function (item) {
              return item.number && item.number > 0;
            })
          };
          this._.forEach(packitems.mandatory, mandatory => {
            mandatory.items = this._.filter(mandatory.items, function (item) {
              return item.number && item.number > 0;
            });
          });

          let msg = {
            type: 'add_dish',
            data: {
              packageflag: 1,
              dishesid: this.dish.dishsno,
              rcid: this.dish.recccid,
              duid: this.dish.duid,
              practiceid: 0,
              count: 1,
              packitems: packitems
            }
          };
          this.$store.dispatch("sendWsMsg", msg);
          this.$router.push("order");
        }
      }
    },
    filters: {
      dishName(name) {
        return name.split("/")[0];
      },
      normName(name) {
        return name.split("/")[1];
      }
    }
  }
</script>

<style lang="scss" scoped>
  // ********** 套餐页面 **********
  .taocan {
    padding-bottom: 50px;

    .taocan-header {
      width: 100%;
      border-bottom: 1px solid #f5f5f5;

      .taocan-img {
        height: 200px;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
      }

      .taocan-title {
        height: 40px;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        color: #333333;

        img {
          width: 26px;
        }
      }
    }

    .taocan-main {
      margin-bottom: 15px;

      .taocan-main-title {
        padding: 10px 0;

        span {
          padding: 0 15px;
          border-left: 4px solid #EC9000;
          font-size: 13px;
          color: #666666;
        }
      }

      ul {
        li {
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 20px;

          .taocan-item-img {
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            img {
              height: 88%;
            }
          }

          .taocan-item-text {
            width: 70%;
            font-size: 14px;
          }

          .taocan-item-num {
            width: 10%;
          }
        }
      }
    }

    .taocan-other {
      .taocan-other-box {
        .taocan-other-box-title {
          padding: 5px 0;

          >span {
            padding: 0 15px;
            border-left: 4px solid #EC9000;
            font-size: 14px;
            color: #666666;
          }
        }

        .taocan-other-box-select {
          display: flex;
          flex-direction: column;
          padding: 5px 15px;
        }

        .taocan-other-box-con {
          padding: 5px 15px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          .taocan-cell {
            width: 46%;
            border: 1px solid #e7e7e7;
            border-radius: 5px;
            margin-bottom: 20px;

            .taocan-cell-img {
              height: 90px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 8px;

              img {
                height: 100%;
              }
            }

            .taocan-cell-title {
              font-size: 14px;
              color: #333333;
              padding-left: 8px;
            }

            .taocan-cell-footer {
              display: flex;
              align-items: center;
              height: 30px;
              padding: 0 8px;

              .taocan-cell-left {
                width: 50%;
                display: flex;
                align-items: baseline;

                span:nth-child(1) {
                  font-size: 11px;
                }
              }

              .taocan-cell-right {
                width: 50%;
              }
            }
          }

          .taocan-cell.taocan-cell-acitve {
            border: 1px solid red;
          }

          >p {
            color: #999999;
            font-size: 13px;
            margin-bottom: 10px;
          }
        }
      }
    }

    .taocan-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-color: #fff;
      border-top: 1px solid #f5f5f5;
      display: flex;

      .taocan-footer-left {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 15px;

        .taocan-footer-left-price1 {
          display: flex;
          align-items: baseline;
          margin-right: 10px;

          span:nth-child(1) {
            font-size: 11px;
          }

          span:nth-child(2) {
            font-size: 11px;
          }
        }

        .taocan-footer-left-price2 {
          display: flex;
          align-items: baseline;
          color: #808080;

          span:nth-child(1) {
            font-size: 11px;
          }

          span:nth-child(2) {
            font-size: 11px;
          }
        }
      }

      .taocan-footer-right {
        width: 115px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;

        .btn {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
