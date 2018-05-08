<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #fd6d52 */
* {
  font-family: '-apple-system', "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
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
a {
  text-decoration: none;
}




.bg {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.segment {
  margin-bottom: 5px;
}
.segment .title {
  padding: 5px 10px;
  font-size: 14px;
  color: #585858;
}
.segment ul {
  position: relative;
}
.segment ul::after {
  content: '';
  height: 1px;
  background-color: #eeeeee;
  transform: scaleY(.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.segment ul li {
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.segment ul li::after {
  content: '';
  height: 1px;
  background-color: #eeeeee;
  transform: scaleY(.5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.segment ul li span:nth-child(1) {
  width: 40%;
}
.segment ul li span:nth-child(2) {
  width: 20%;
}
.segment ul li span:nth-child(3) {
  width: 40%;
  text-align: right;
}



.seg-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  box-shadow: 1px 1px 10px #e7e7e7;
}
.seg-footer a {
  background-color: #fd6d52;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}





</style>
