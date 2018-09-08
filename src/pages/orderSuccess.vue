<template>
  <div>
    <div class="order-header">
      <div class="header-img"></div>
      <h2>
        <span>A101</span>下单成功~
      </h2>
      <p>正在为您烹饪美食，客官请稍等...</p>
    </div>
    <div class="segment">
      <div class="title">
        <div>已点菜品</div>
        <div>您点了<span>7</span>道菜</div>
      </div>
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
      <div class="content-total">
        合计：<span>9999</span>
      </div>
    </div>
    <FooterBtnGroup text1="继续加菜" text2="结账"
      @submit1="gotoIndex" @submit2="gotoPay"/>
  </div>
</template>

<script>
import FooterBtnGroup from '@/components/base/footerBtnGroup'
export default {
  components: { FooterBtnGroup },
  methods: {
    gotoIndex () {
      this.$router.push({name: 'index'})
    },
    gotoPay () {
      this.$router.push({name: 'pay'})
    }
  }
}
</script>

<style lang="scss" scoped>
.order-header {
  height: 30vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .header-img {
    height: 80px;
    width: 80px;
    background-color: #fd6d52;
    margin-bottom: 10px;
  }
}

.order-header h2 {
  font-weight: normal;
  font-size: 20px;
}
.order-header h2 span {
  color: #fd6d52;
}
.order-header p {
  font-size: 14px;
  color: #919191;
}





.segment .title {
  display: flex;
  justify-content: space-between;
}


.content-total {
  padding: 10px 15px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 100px;
}

.content-total span {
  color: #f04722;
}
</style>
