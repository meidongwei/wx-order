<template>
  <div class="dialog" v-if="isShow" @click="close(false)" @touchmove.prevent>
    <div class="dialog-box" @click.stop>
      <slot name="header">
        <div class="dialog-header">
          <h3>{{ title }}</h3>
          <a class="icon-close" v-if="!hideCloseIcon" @click="close">✕</a>
        </div>
      </slot>
      <slot name="body">
        <div class="dialog-body">
          一些文本
        </div>
      </slot>
      <slot name="footer">
        <div class="dialog-footer">
          <a class="btn btn-primary btn-circle" @click="close">我知道了</a>
        </div>
      </slot>
    </div>
    <div class="dialog-x">
      X
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    hideCloseIcon: { // 隐藏”x“按钮，默认false不隐藏
      type: Boolean,
      default: false
    },
    allowBgClose: { // 允许点击背景关闭窗口，默认true允许
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    close (val) {
      if (val === this.allowBgClose) {
        return
      }
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0,0,0,.5);
  z-index: 999;
  .dialog-box {
    box-sizing: border-box;
    width: 80%;
    border-radius: 3px;
    background: #fff;
    position: relative;
    .dialog-header {
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        padding: 10px 15px;
        font-size: 16px;
      }
      .icon-close {
        padding: 10px 15px;
        color: #aaaaaa;
      }
    }
    .dialog-body {
      padding: 15px 15px 10px 15px;
      font-size: 14px;
      color: #555;
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
      padding: 10px 15px;
    }
  }
  .dialog-x {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    color: #fff;
  }
}
</style>
