<template>
  <div class="price666">
    <span :style="'fontSize:' + size1 + 'px'">
      {{ firstPrice }}
    </span>
    <span v-show="!isShow">.</span>
    <span :style="'fontSize:' + size2 + 'px'">
      {{ endPrice }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // 接受一个 string 类型的金额
    data: {
      type: String,
      default: '00.0'
    },
    // 金额 整数 部分字号大小
    size1: {
      type: String,
      default: '15'
    },
    // 金额 小数 部分字号大小
    size2: {
      type: String,
      default: '11'
    }
  },
  computed: {
    // 获取金额 整数 部分
    firstPrice () {
      return this.data.split('.')[0]
    },
    // 获取金额 小数 部分
    endPrice () {
      return this.data.split('.')[1]
    },
    // 当传进来的金额为整数时，isShow 返回 true，即不显示小数点
    isShow () {
      return this.data.split('.').length === 1
    }
  }
}
</script>

<style lang="scss" scoped>
.price666 {
  display: flex;
  align-items: baseline;
}
</style>
