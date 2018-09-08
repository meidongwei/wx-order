<template>
  <div class="footerBtnBox">
    <a class="btn" :class="[{'btn-primary': type1 === '1'},
      {'btn-white': type1 === '2'}, {'btn-default': type1 === '3'}]"
      v-if="show1" @click="submit1">
      {{ text1 }}
    </a>
    <a class="btn" :class="[{'btn-primary': type2 === '1'},
      {'btn-white': type2 === '2'}, {'btn-default': type2 === '3'}]"
      v-if="show2" @click="submit2">
      {{ text2 }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    type1: {
      type: String,
      default: '2'
    },
    type2: {
      type: String,
      default: '1'
    },
    text1: {
      type: String,
      default: '取消'
    },
    text2: {
      type: String,
      default: '确定'
    },
    show1: {
      type: Boolean,
      default: true
    },
    show2: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    submit1 () {
      this.$emit('submit1')
    },
    submit2 () {
      this.$emit('submit2')
    }
  }
}
</script>

<style lang="scss" scoped>
.footerBtnBox {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  box-shadow: 1px 1px 10px #e7e7e7;
  .btn {
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
