<template>
  <div>
    <div class="success-header">
      <div class="header-img"></div>
      <h2><span>A101</span> 支付成功~</h2>
      <p>客官走好，下次再来啊～</p>
    </div>
    <div class="success-content">
      <div class="redTop"></div>
      <div class="order-box">
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
            <span>订单号</span>
            <span>2018042543789562</span>
          </li>
          <li>
            <span>结账时间</span>
            <span>12:35 2018-04-24</span>
          </li>
          <li>
            <span>会员优惠</span>
            <span>8</span>
          </li>
          <li>
            <span>积分支付</span>
            <span>100</span>
          </li>
          <li>
            <span>预存支付</span>
            <span>10</span>
          </li>
          <li>
            <span>微信支付</span>
            <span>77.5</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="paySuccess-footer">
      <a class="btn-circle" href="javascript:;">开发票</a>
      <a href="javascript:;">订单详情</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.success-header {
  height: 30vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.success-header .header-img {
  height: 80px;
  width: 80px;
  background-color: #fd6d52;
  margin-bottom: 10px;
}
.success-header h2 {
  font-weight: normal;
  font-size: 20px;
}
.success-header h2 span {
  color: #fd6d52;
}
.success-header p {
  font-size: 14px;
  color: #919191;
}



.success-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.success-content .redTop {
  border-top: 5px solid #fd6d52;
  border-bottom: 5px solid #e02300;
  width: 84%;
  border-radius: 5px;
}
.success-content .order-box {
  position: absolute;
  top: 7px;
  width: 80%;
  background-color: #fff;
  box-shadow: 1px 1px 10px #d5d5d5;
}
.order-box ul li {
  padding: 10px 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.order-box ul li::after {
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




.paySuccess-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  box-shadow: 1px 1px 10px #e7e7e7;
}
.paySuccess-footer a {
  background-color: #fd6d52;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.paySuccess-footer a.btn-circle {
  background-color: #fff;
  color: #fd6d52;
}
</style>
