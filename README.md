# wx-order

## 返回的数据

categories: {
  1: {
    '1,abc': {count: 2},
    '1,ccc': {count: 1}
  },
  2: {
    '6,abc': {count: 1},
    '6,ccc': {count: 1}
  }
}

categories: {
  1: {
    '1,abc': {count: 2},
    '2,ccc': {count: 1},
    '3,abc': {count: 1},
    '3,ccc': {count: 1}
  },
  2: {
    '6,ccc': {count: 1}
  }
}

## 修改

1. main.js：mockjs
2. index.vue
<!-- data 中的 res 数据 -->
initWebSocket 方法中的 websocket 接口地址
