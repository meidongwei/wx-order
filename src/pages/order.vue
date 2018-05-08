<template>
  <div>
    <div class="order-header">
      <div class="header-img"></div>
      <h2><span>A101</span> 下单成功~</h2>
      <p>正在为您烹饪美食，客官请稍等...</p>
    </div>
    <div class="order-content">
      <div class="content-top">
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
      <div class="content-total">合计：<span>9999</span></div>
    </div>
    <div class="footer">
      <a class="btn-circle" href="javascript:;">继续加菜</a>
      <a href="javascript:;">结账</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.order-header {
  height: 30vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.order-header .header-img {
  height: 80px;
  width: 80px;
  background-color: #fd6d52;
  margin-bottom: 10px;
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





.order-content .content-top {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
}
.order-content .content-top div:first-child {
  color: #fd6d52;
}
.order-content .content-top div span {
  color: #fd6d52;
}
.order-content ul {
  position: relative;
}
.order-content ul::before {
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
.order-content ul li {
  padding: 10px 15px;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.order-content ul li span:nth-child(1) {
  width: 40%;
}
.order-content ul li span:nth-child(2) {
  width: 20%;
}
.order-content ul li span:nth-child(3) {
  width: 40%;
  text-align: right;
}
.order-content ul li::after {
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
.content-total {
  padding: 10px 15px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 100px;
}
.content-total span {
  color: #fd6d52;
}




.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  box-shadow: 1px 1px 10px #e7e7e7;
}
.footer a {
  background-color: #fd6d52;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.footer a.btn-circle {
  background-color: #fff;
  color: #fd6d52;
}
</style>
