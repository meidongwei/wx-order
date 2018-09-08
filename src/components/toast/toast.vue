<template>
  <transition name="fade">
    <div class="toast" v-if="show"
      :class="[{'top': position === 'top'},
      {'bottom': position === 'bottom'},
      {'center': position === 'center'}]">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      position: ''
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  /* ---------- */
  box-sizing: border-box;
  padding: 10px 15px;
  min-width: 160px;
  max-width: 320px;
  max-height: 160px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  word-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  z-index: 999;
}
.center {
  top: 39%;
}
.top {
  top: 10%;
}
.bottom {
  top: 75%;
}

.fade-enter-active,
.fade-leave-active {
  transition: .3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
