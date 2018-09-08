
let dev_api = 'http://192.168.1.121/pzcatering-web/wxdc/api.do?method=';

let pro_api = '/pzcatering-web/wxdc/api.do?method=';

let _host = process.env.NODE_ENV == 'development' ? dev_api : pro_api;

export default _host
