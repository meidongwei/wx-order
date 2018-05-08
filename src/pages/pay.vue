<template>
  <div class="bg">
    <div class="pay-header">
      <div class="header-top">
        <span>品智一店</span>
        <span>台号：A101</span>
      </div>
      <div class="header-order">
        <h2>195.5</h2>
        <p>订单金额</p>
        <ul v-show="isShowOrder">
          <li>
            <span>蒸羊羔儿</span>
            <span>x2</span>
            <span>62.0</span>
          </li>
          <li>
            <span>蒸龙虾</span>
            <span>x99</span>
            <span>62.0</span>
          </li>
          <li>
            <span>蒸熊掌</span>
            <span>x2</span>
            <span>62.0</span>
          </li>
        </ul>
        <div class="show-list-btn"
          @click="handleShowOrder">
          {{ text }}
        </div>
      </div>
    </div>
    <div class="segment discount">
      <div class="title">优惠方案</div>
      <ul>
        <li>
          <span>菜品优惠</span>
          <span>62.0</span>
        </li>
        <li>
          <span>优惠活动</span>
          <span>62.0</span>
        </li>
      </ul>
    </div>
    <div class="segment paymount">
      <div class="title">请选择支付方式</div>
      <ul>
        <li>
          <span>代金券</span>
          <span>62.0</span>
        </li>
        <li>
          <span>菜品券</span>
          <span>62.0</span>
        </li>
        <li>
          <span>可用积分100，使用100</span>
          <span>123</span>
        </li>
        <li>
          <span>预存余额50</span>
          <span>123</span>
        </li>
      </ul>
    </div>
    <div class="seg-footer">
      <a href="javascript:;"
        @click="goTo">支付87.5</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowOrder: false
    }
  },
  computed: {
    text () {
      return this.isShowOrder ? '点击收起订单' : '点击查看订单'
    }
  },
  methods: {
    handleShowOrder () {
      this.isShowOrder = !this.isShowOrder
    },
    goTo () {
      // 支付成功，跳转到 paySuccess
      // 支付失败，跳转到 payFaile
      if (1) {
        this.$router.push({name: 'paySuccess'})
      } else {
        this.$router.push({name: 'payFaile'})
      }
    }
  }
}
</script>

<style scoped>
.pay-header {
  background-color: #fff;
  margin-bottom: 5px;
}
.pay-header .header-top {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.pay-header .header-top::after {
  content: '';
  height: 1px;
  background-color: #eeeeee;
  transform: scaleY(.5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.header-order h2 {
  font-size: 30px;
  font-weight: normal;
  color: #fd6d52;
  text-align: center;
  margin-top: 15px;
}
.header-order p {
  text-align: center;
  font-size: 16px;
  color: #959595;
  margin-bottom: 5px;
}
.header-order ul {
  position: relative;
}
.header-order ul::after {
  content: '';
  height: 1px;
  background-color: #eeeeee;
  transform: scaleY(.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.header-order ul li {
  padding: 10px 15px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.header-order ul li::after {
  content: '';
  height: 1px;
  background-color: #eeeeee;
  transform: scaleY(.5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.header-order .show-list-btn {
  text-align: center;
  color: #fd6d52;
  font-size: 12px;
  padding: 10px 15px;
}

.discount ul li span:nth-child(1),
.paymount ul li span:nth-child(1) {
  width: 50%;
}
.discount ul li span:nth-child(2),
.paymount ul li span:nth-child(2) {
  width: 50px;
  text-align: right;
}


</style>
