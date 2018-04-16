let localhostDev = false
let _host= localhostDev ?
  'http://localhost:8080' :
  'http://192.168.1.151:8081/pzcatering-web/crmwx/api.do?method='
let httpUrl = {
  'getData': _host + 'getWxUserinfo'
};
export default httpUrl
