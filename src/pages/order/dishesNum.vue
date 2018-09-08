<template>
  <span class="badge" v-if="dishesCount > 0">{{dishesCount}}</span>
</template>

<script>
  export default {
    props: {
      dishsno: String, // 要统计数量的菜品编码
      rcid: Number // 要统计数量的菜品类别
    },
    computed: {
      dishesCount() {
        let shopCart = this.$store.state.order.shopCart;
        let dishesCount = 0;
        if (shopCart.categories[String(this.rcid)]) {
          this._.forIn(shopCart.categories[this.rcid], (dish, dishKey) => {
            this._.forIn(dish, units => {
              this._.forIn(units, practice => {
                // 如果传入的菜品编码，则只统计指定编码的菜品数量
                if (this.dishsno) {
                  let dishsno = dishKey.split(",")[0];
                  if (dishsno == this.dishsno) {
                    dishesCount += practice.count;
                  }
                } else {
                  dishesCount += practice.count;
                }
              });
            });
          });
        }
        return dishesCount;
      }
    }
  }
</script>
