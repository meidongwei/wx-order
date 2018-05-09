<template>
  <div class="dialog">
    <div class="bg"></div>
    <div class="dialog-content">
      <h3 class="title">提示</h3>
      <div class="text">
        客官，您还没有点主食，是否需要？
      </div>
      <div class="btn-group">
        <div class="btn btn-circle"
          :style="'color:' + themeColor + ';border:1px solid ' + themeColor"
          @click="handleClosePrompt">不需要</div>
        <div class="btn" :style="'backgroundColor:' + themeColor"
          @click="handleClosePrompt">需要</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    themeColor () {
      return sessionStorage.getItem('themeColor')
    }
  },
  methods: {
    handleClosePrompt () {
      this.$emit('handleClosePrompt')
    }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog .dialog-content {
  box-sizing: border-box;
  width: 80%;
  min-height: 140px;
  border-radius: 3px;
  background: #fff;
  z-index: 50002;
  position: relative;
}
.dialog .dialog-content .title {
  padding: 10px 15px;
  font-size: 16px;
  position: relative;
}
.dialog .dialog-content .title::after {
  content: '';
  height: 1px;
  width: 100%;
  background-color: #ececec;
  transform: scaleY(0.5);
  position: absolute;
  bottom: 0;
  left: 0;
}
.dialog .dialog-content .text {
  padding: 10px 15px;
  font-size: 14px;
  margin-bottom: 15px;
  color: #555;
}
.dialog .dialog-content .btn-group {
  display: flex;
  justify-content: center;
}
.dialog .dialog-content .btn-group .btn {
  padding: 10px 20px;
  border-radius: 20px;
  /* background-color: #fd6d52; */
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}
.dialog .dialog-content .btn-group .btn.btn-circle {
  /* border: 1px solid #fd6d52; */
  background-color: #fff;
  margin-right: 8px;
  /* color: #fd6d52; */
}
.dialog .bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50001;
  background: rgba(0,0,0,.5);
}
</style>
