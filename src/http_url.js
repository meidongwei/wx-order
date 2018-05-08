let localhostDev = true
let _host= localhostDev ?
  'http://localhost:8080' :
  '/pzcatering-web/wxdc/api.do?method='

let httpUrl = {
  'getWxUserinfo': _host + 'getWxUserinfo',
  'getWsurl': 'wss://' + location.hostname + '/pzcatering-web/ws/dish.do?'
}
export default httpUrl
