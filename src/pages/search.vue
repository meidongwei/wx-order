<template>
  <div class="search">
    <div class="search-header">
      <input type="text" v-model="search" placeholder="请输入菜品名称">
      <a class="btn btn-white">搜索</a>
    </div>
    <div class="search-list">
      <div v-for="item in showList">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      showList: [],
    }
  },
  computed: {
    dishes () {
      return this.$store.state.order.baseDatas.dishs
    }
  },
  watch: {
    search: function (val) {
      this.showList = []
      if (this.search === '') {
        this.showList = []
      } else {
        this._.forIn(this.dishes, v => {
          if (v.name.includes(this.search)) {
            this.showList.push(v)
          }
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  .search-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 1px #d5d5d5;
    input {
      box-sizing: border-box;
      font-size: 18px;
      padding: 0 15px;
      border: none;
      height: 100%;
      width: 75%;
    }
    .btn {
      width: 25%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
  .search-list {
    padding-top: 80px;
  }
}
</style>
