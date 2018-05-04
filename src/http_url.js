let localhostDev = false
let _host= localhostDev ?
  'http://localhost:8080' :
  '/pzcatering-web/wxdc/api.do?method='


// websocket 地址
let tableid = sessionStorage.getItem('tableid')
const wsurl = 'wss://' + location.hostname
  + '/pzcatering-web/ws/dish.do?' + tableid
// const wsurl = 'ws:192.168.1.119:8081/pzcatering-web/ws/dish.do?1'


let httpUrl = {
  'getWxUserinfo': _host + 'getWxUserinfo',

  'getWsurl': wsurl
}
export default httpUrl
