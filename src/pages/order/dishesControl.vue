<template>
  <div>
    <div class="control">
      <div class="dishesControl">
        <CartControl :dishsno="dish.dishsno" :rcid="dish.recccid" :duid="dish.norms[0].duid" v-if="controlType == 1"/>
        <GuigeDialog :dish="dish" v-else-if="controlType == 2"/>
        <template v-else-if="controlType == 3">
          <a class="btn btn-primary btn-circle btn-xs" @click="orderPackDish">随心配</a>
          <DishesNum :dishsno="dish.dishsno" :rcid="dish.recccid"/>
        </template>
      </div>
    </div>
    <img v-if="controlType == 4" class="sell-null" src="../../assets/images/null.png">
  </div>
</template>

<script>
  import CartControl from '@/components/cart-control'
  import GuigeDialog from '@/components/dialog/guigeDialog'
  import DishesNum from '@/pages/order/dishesNum'
  export default {
    components: {
      CartControl, GuigeDialog, DishesNum
    },
    props: {
      dish: Object
    },
    computed: {
      // 当前显示的按钮类型：1-加点按钮，2-选择规格，3-选择套餐（随心配），4-已售罄
      controlType() {
        let controlType = 1;

        if (this.dish.norms.length == 1 && this.dish.cooks.length == 0) { // 单规格无做法菜品或套餐
          // type：1-单品菜，2-套餐(且不是只有主菜)
          if (this.dish.type == 2 && (this.dish.setmeals.mandatory.length > 0 || this.dish.setmeals.optional.length > 0)) {
            controlType = 3;
          }
          if (this.dish.norms[0].isguqing) {
            controlType = 4;
          }
        } else { // 多规格或多做法
          controlType = 2;

          // 当前菜品是否所有单位全部沽清
          let isAllNormsGuqing = true;
          this._.forEach(this.dish.norms, norm => {
            if (!norm.isguqing) {
              isAllNormsGuqing = false;
              return false;
            }
          });

          // 当前菜品是否所有做法全部沽清
          let isAllPracticeGuqing = this.dish.cooks.length > 0 ? true : false;
          let practices = this.$store.state.order.baseDatas.guqingDishes.practice;
          this._.forEach(this.dish.cooks, practice => {
            if (practices.indexOf(practice) == -1) {
              isAllPracticeGuqing = false;
              return false;
            }
          });

          if (isAllNormsGuqing || isAllPracticeGuqing) {
            controlType = 4;
          }
        }
        return controlType;
      }
    },
    methods: {
      // 点套餐
      orderPackDish() {
        this.$router.push({name: "taocan", params: {dish: this.dish}});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dishesControl {
    position: relative;
    .badge {
      position: absolute;
      right: 0;
      top: -5px;
    }
  }
</style>
