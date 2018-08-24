import mock from '../mock/mock'

let dev_api = 'http://localhost:8080'
let pro_api = '/pzcatering-web/wxdc/api.do?method='

let _host = process.env.NODE_ENV == 'development' ? dev_api : pro_api

export default _host
