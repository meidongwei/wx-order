<template>
  <transition name="fade">
    <div class="toast-fixed" v-show="visible">
      <div class="toast-box">
        <img :src="avatarUrl">
        <div class="toast-box-info">
          <span>{{ username }}</span>
          <span>{{ text }}</span>
        </div>
        <span class="toast-box-count" v-if="count > 0">+{{ count }}</span>
        <span class="toast-box-count" v-else>{{ count }}</span>
        <div class="triangle-down"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      duration: 1000
    }
  },
  methods: {
    setTimer () {
      setTimeout(() => {
        this.close()
      }, this.duration)
    },
    close () {
      this.visible = false
      setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }, 500)
    }
  },
  mounted () {
    this.setTimer()
  },
}
</script>
<style scoped>
.toast-fixed {
  position: fixed;
  left: 10px;
  bottom: 75px;
}
.toast-box {
  background-color: rgba(0,0,0,.8);
  color: #fff;
  border-radius: 50px;
  display: flex;
  padding: 5px;
  height: 45px;
  box-sizing: border-box;
  position: relative;
}
.toast-box .toast-box-info {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}
.toast-box .toast-box-info span:nth-child(1) {
  font-size: 12px;
  height: 18px;
  line-height: 18px;
}
.toast-box .toast-box-info span:nth-child(2) {
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  color: #c2c3c4;
}
.toast-box .triangle-down {
  position: absolute;
  left: 20px;
  bottom: -8px;
  width: 0;
  height: 0;
  border-left:7px solid transparent;
  border-right:7px solid transparent;
  border-top: 10px solid rgba(0,0,0,.8);
}
.toast-box img {
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
}
.toast-box .toast-box-count {
  height: 30px;
  line-height: 30px;
  font-size: 19px;
  margin-right: 5px;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter {
  transform: translateY(20px);
}


</style>
