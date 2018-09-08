import Vue from 'vue'
import ajax from '@/common/axios'

// initial state
const state = {
  websocket: null, // websocket连接对象
  member: 0, // 就餐人数
  omsognid: 0,
  tableno: '',
  tablename: '',
  nickname: '', // 用户昵称
  headimgurl: '', // 用户头像url
  openid: '', // 用户微信openid
  baseDatas: {}, // 总数基础数据
  shopCart: {categories: {}}, // 购物车数据
  showMode: 1, // 菜品显示模式：1-小图，2-大图，3-大图+小图
};

// getters
const getters = {};

// actions
const actions = {
  // 初始化 websocket
  initWebSocket({state, dispatch, commit}) {
    // let hostname = location.hostname;
    let hostname = '192.168.1.121';
    let protocal = location.protocol.indexOf("https") != -1 ? "wss" : "ws";
    let wsurl = protocal + '://' + hostname + '/pzcatering-web/wxdc/webws.do?' + state.omsognid + ";" + state.tableno + ";" + state.openid;
    try {
      let websocket = new WebSocket(wsurl);
      state.websocket = websocket;
      return websocket;
    } catch (e) {
      console.log("websocket连接失败，5s后发起重连");
      setTimeout(() => {
        dispatch("initWebSocket");
      }, 5000);
    }
  },
  // 通过websocket向服务器发送消息
  sendWsMsg({state}, msg) {
    /*
     type:
     add_dish 加减菜
     edit_pack 修改套餐
     del_pack 删除套餐
     clear_cart 清空购物车
     select_member 选择人数
     */
    if (msg.data) {
      // 发送加减菜信息(添加用户id和头像,昵称)
      if (msg.type == 'add_dish' || msg.type == 'del_pack') {
        msg.data.openid = state.openid;
        msg.data.nickname = state.nickname;
        msg.data.headimgurl = state.headimgurl;
      }
    }
    console.log("发送ws消息", JSON.stringify(msg));
    state.websocket.send(JSON.stringify(msg));
  },
};

// mutations
const mutations = {
  // 设置当前桌台id
  setTableinfo(state, table) {
    state.omsognid = table.omsognid;
    state.tableno = table.tableno;
    state.tablename = table.tablename;
    state.nickname = table.nickname;
    state.headimgurl = table.headimgurl;
    state.openid = table.openid;
  },
  // 设置总数基础数据
  setBaseDatas(state, baseDatas) {
    let dishes = baseDatas.dishs;
    let guqingDishes = baseDatas.guqingDishes.dishes;
    Vue._.forIn(guqingDishes, (duids, dishsno) => {
      // 循环当前菜品下沽清的单位，将对应菜品对应单位添加沽清标识
      Vue._.forEach(duids, duid => {
        Vue._.forEach(dishes[dishsno].norms, norm => {
          if (norm.duid == duid) {
            norm.isguqing = true;
          }
        })
      });
    });

    state.baseDatas = baseDatas;
  },
  setShopCart(state, shopCart) {
    state.shopCart = shopCart;
  },
  // 设置就餐人数
  setMember(state, member) {
    state.member = member || 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
