let localhostDev = false
let _host= localhostDev ?
  'http://localhost:8080' :
  '/pzcatering-web/wxdc/api.do?method='
let httpUrl = {
  'getWxUserinfo': _host + 'getWxUserinfo',


  // 'getWsurl': 'ws:139.129.222.149:13021/pzcatering-web/ws/dish.do?1'

}
export default httpUrl
