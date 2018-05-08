<template>
  <div>
    <div style="height:80px;width:80px;background-color:#8e651a;"></div>
    <h2>A101 下单成功</h2>
    <p>正在为您烹饪美食，客官请稍等...</p>
    <div>
      <div>已点菜品   您点了7道菜</div>
      <ul>
        <li>蒸羊羔儿</li>
        <li>蒸龙虾</li>
        <li>蒸熊掌</li>
      </ul>
      <div>合计：9999元</div>
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
