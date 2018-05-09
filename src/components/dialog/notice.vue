<template>
  <div class="dialog" @click="handleCloseNotice">
    <div class="bg"></div>
    <div class="dialog-content">
      <h3 class="title">{{ options.title }}</h3>
      <ul class="text">
        <li v-for="item in options.list" :keys="item.id">
          {{ item.type }} - {{ item.text }}
        </li>
      </ul>
      <div class="btn-group">
        <div class="btn" :style="'backgroundColor:' + themeColor"
          @click="handleCloseNotice">我知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Object
  },
  computed: {
    themeColor () {
      return sessionStorage.getItem('themeColor')
    }
  },
  methods: {
    handleCloseNotice () {
      this.$emit('handleCloseNotice')
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
  width: 50%;
  text-align: center;
  margin-bottom: 10px;
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
