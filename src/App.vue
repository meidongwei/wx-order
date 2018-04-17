<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* -webkit-overflow-scrolling: touch; */
* {
  font-family: PingFangSC-Regular, sans-serif,
    "Helvetica Neue",Helvetica,Arial,
    "Microsoft Yahei","Hiragino Sans GB",
    "Heiti SC","WenQuanYi Micro Hei";
  padding: 0;
  margin: 0;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
ul li {
  list-style: none;
}
</style>
