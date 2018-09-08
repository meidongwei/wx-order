<template>
  <router-view/>
</template>

<script>
  export default {
    created () {
      // 1、获取用户信息
      this.getUserInfo();
    },
    methods: {
      // 建立websocket连接
      initWebSocket() {
        this.$store.dispatch("initWebSocket").then(websocket => {
          if (websocket) {
            websocket.onopen = () => {
              console.log("websocket连接成功");
              //this.searchTableStatus();
            };
            websocket.onmessage = (e) => {
              console.log("接收服务器消息：" + e.data);
              let msg = JSON.parse(e.data);
              // 菜品加减菜
              if(msg.type == 'init') { // 连接加入，初始化当前桌台及菜品
                this.initTableinfo(msg.data);
              } else if (msg.type == 'add_dish' || msg.type == 'del_pack') {
                this.addDishes(msg.data);
              } else if (msg.type == 'clear_cart') { // 清空购物车
                this.$store.commit("setShopCart", {categories: {}});
              } else if (msg.type == 'select_member') { // 选择就人数
                this.$store.commit("setMember", msg.data.member);
              }
            };
            websocket.onclose = (e) => {
              console.log("websocket连接断开");
              setTimeout(() => {
                this.$store.dispatch("initWebSocket");
              }, 5000)
            };
          }
        });
      },
      // 获取用户数据
      getUserInfo () {
        this.$ajax.silentGet('getWxUserinfo').then(result => {
          if (result) {
            // 1、设置当前桌台信息
            this.$store.commit("setTableinfo", result.res);
            // 2、建立websocket连接
            this.initWebSocket();
            // 3、获取门店菜品，备注，公告等基础信息
            this.$ajax.silentGet('syncDishes', {omsognid: result.res.omsognid, tableno: result.res.tableno}).then(result => {
              if (result) {
                this.$store.commit("setBaseDatas", result.res);
              }
            })
          }
        })
      },
      // 扫码进入后发送查询桌态消息
      searchTableStatus() {
        if (location.hash == '#/loading') {
          let msg = {
            type: 2,
            data: {}
          };
          this.$store.dispatch("sendWsMsg", msg);
        }
      },
      // 处理服务器发来的桌台状态消息
      handleTableStatusMsg(data) {
        let status = data.status;
        //当前桌台状态, 0:无订单 1:有订单
        if (status == "1") {
          // 拉取门店订单
          let msg = {
            type: 3,
            data: {}
          };
          this.$store.dispatch("sendWsMsg", msg);
        } else {
          // 桌台无订单直接跳转至欢迎页
          this.$router.push("start");
        }
      },
      // 初始化就餐人数及购物车菜品信息
      initTableinfo(data) {
        // 就餐人数
        this.$store.commit("setMember", data.member);
        // 购物车菜品
        this.$store.commit("setShopCart", data);
      },
      // 微信端加减菜
      addDishes(data) {
        this.$store.commit("setShopCart", data);
        // 显示加减菜头像框
        let newDish = data.newDish;
        if (newDish) {
          // 只在 order 页面显示
          if (this.$route.name === 'order') {
            this.$avatarToast(newDish.headimgurl, newDish.nickname, this.dishes[newDish.dishesid].name, newDish.count);
          }
        }
      },
    },
    computed: {
      dishes: function () {
        return this.$store.state.order.baseDatas.dishs;
      }
    }
  }
</script>
