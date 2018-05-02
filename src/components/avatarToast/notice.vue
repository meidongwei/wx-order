<template>
  <transition name="fade">
    <div class="box" v-show="visible">
      <img :src="avatarUrl">
      <span>{{ content }}</span>
      <span v-if="num > 0">+{{ num }}</span>
      <span v-else>{{ num }}</span>
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
  .box {
    position: absolute;
    left: 5px;
    bottom: 70px;
    background-color: rgba(0,0,0,.8);
    color: #fff;
    border-radius: 3px;
    display: flex;
    padding-right: 5px;
  }
  .box img {
    height: 30px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-right: 5px;
  }
  .box span {
    height: 30px;
    line-height: 30px;
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
