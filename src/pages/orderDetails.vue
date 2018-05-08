<template>
  <div class="bg">
    <div class="segment">
      <div class="title">订单菜品</div>
      <ul>
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
      <div class="footer">
        合计：195
      </div>
    </div>
    <div class="segment order-info">
      <div class="title">订单信息</div>
      <ul>
        <li>
          <span>台号</span>
          <span>A101</span>
        </li>
        <li>
          <span>人数</span>
          <span>3</span>
        </li>
        <li>
          <span>订单号码</span>
          <span>123123</span>
        </li>
        <li>
          <span>结账时间</span>
          <span>12:35 2018-04-25</span>
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
.segment {
  margin-bottom: 15px;
}
.segment .title {
  padding: 10px 15px;
  color: #fd6d52;
  background-color: #fff;
}
.segment .footer {
  padding: 10px 15px;
  background-color: #fff;
  text-align: right;
}
.order-info ul li span:nth-child(2) {
  width: 70%;
  text-align: right;
}
</style>
