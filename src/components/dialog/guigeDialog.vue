<template>
  <div>
    <a class="btn btn-primary btn-circle btn-xs" @click="openDialog">选规格</a>
    <MyDialog :title="dish.name" ref="dialogRef">
      <template slot="body">
        <div class="guige-body">
          <div class="guige-box">
            <p class="guige-box-title">选规格</p>
            <div class="guige-box-con">
              <a class="btn btn-circle5" :class="norm.duid == item.duid ? 'btn-line-primary' : 'btn-line-default'"
                 v-for="item in dish.norms" v-if="!item.isguqing" @click="selectNorm(item)">{{item.name}}</a>
            </div>
          </div>
          <div class="guige-box" v-if="dish.cooks.length > 0">
            <p class="guige-box-title">选做法</p>
            <div class="guige-box-con">
              <a class="btn btn-circle5" :class="practice.id == item.id ? 'btn-line-primary' : 'btn-line-default'" v-if="guqingPractices.indexOf(item.id) == -1"
                 v-for="item in dish.cooks" @click="selectPractice(item)">{{item.name}}<span class="tip">+￥{{item.aprice}}</span></a>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="guige-footer">
          <div class="guige-footer-left">
            <span class="fonticon fonticon-orange">会</span>
            <span class="new-price">￥{{norm.memberprice.toFixed(2)}}</span>
            <del class="old-price">￥{{norm.orgprice.toFixed(2)}}</del>
          </div>
          <div class="guige-footer-right">
            <a class="btn btn-primary btn-circle btn-sm" v-if="!isSelected" @click="addToCart">加入购物车</a>
            <CartControl :dishsno="dish.dishsno" :rcid="dish.recccid" :duid="norm.duid" :practiceid="practice.id" v-else/>
          </div>
        </div>
      </template>
    </MyDialog>
  </div>
</template>

<script>
  import MyDialog from '@/components/dialog/dialog'
  import CartControl from '@/components/cart-control'
  export default {
    components: {MyDialog, CartControl},
    props: {
      dish: Object
    },
    data () {
      return {
        norm: {}, // 当前选中的单位
        practice: {id: 0}, // 当前选中的做法
      }
    },
    methods: {
      openDialog () {
        this.$refs.dialogRef.show()
      },
      // 选择规格
      selectNorm(norm) {
        this.norm = norm;
      },
      // 选择做法
      selectPractice(practice) {
        this.practice = practice;
      },
      // 点击添加至购物车
      addToCart() {
        let msg = {
          type: 'add_dish',
          data: {
            packageflag: 0,
            dishesid: this.dish.dishsno,
            rcid: this.dish.recccid,
            duid: this.norm.duid,
            practiceid: this.practice.id,
            count: 1,
          }
        };
        this.$store.dispatch("sendWsMsg", msg);
      }
    },
    created() {
      // 设置默认选中单位
      this._.forEach(this.dish.norms, norm => {
        if (!norm.isguqing) {
          this.norm = norm;
          return false;
        }
      });

      // 设置默认选中做法
      this._.forEach(this.dish.cooks, practice => {
        if (this.guqingPractices.indexOf(practice.id) == -1) {
          this.practice = practice;
          return false;
        }
      })
    },
    computed: {
      // 当前规格做法的菜品是否选择过
      isSelected() {
        let isSelected = false;
        let category = this.$store.state.order.shopCart.categories[this.dish.recccid];
        this._.forIn(category, (dish, k) => {
          if (k.split(",")[0] == this.dish.dishsno) {
            let duid = String(this.norm.duid);
            if (dish[duid] && dish[duid][String(this.practice.id)]) {
              isSelected = true;
              return false;
            }
          }
        });
        return isSelected;
      },
      // 当前沽清的做法
      guqingPractices() {
        return this.$store.state.order.baseDatas.guqingDishes.practice;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .guige-body {
    padding: 15px 0;
    .guige-box {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .guige-box-title {
        color: #aaaaaa;
        font-size: 14px;
        margin-bottom: 5px;
        width: 88%;
      }
      .guige-box-con {
        width: 88%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .btn {
          margin-right: 5px;
          margin-bottom: 5px;
          width: 82px;
          box-sizing: border-box;
          position: relative;
          .tip {
            position: absolute;
            right: 3px;
            top: 0;
            font-size: 8px;
          }
        }
      }
    }
  }

  .guige-footer {
    border-top: 1px solid #eeeeee;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .guige-footer-left {
      display: flex;
      align-items: center;
      .new-price {
        color: red;
        margin-left: 8px;
        font-size: 18px;
      }
      .old-price {
        color: #acacac;
        margin-left: 8px;
        font-size: 14px;
      }
    }

  }
</style>
