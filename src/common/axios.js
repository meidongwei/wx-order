import axios from "axios";
import baseUrl from "./httpUrl";

// axios全局默认配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 显示提示框
let showToast = (isShowToast, msg, showTime) => {
  let globalToast = document.getElementById("globalToast");
  // 显示loading
  if (globalToast) {
    if (isShowToast) {
      document.getElementById("toastMsg").innerText = msg;
      globalToast.style.display = 'block';

      setTimeout(function () {
        globalToast.style.display = 'none';
      }, showTime || 10000);
    } else {// 隐藏loading
      globalToast.style.display = 'none';
    }
  }
};

let ajax = (api, method, bizContent, showLoading) => {
  if (showLoading) {
    showToast(showLoading, '数据处理中,请稍候...');
  }

  let data = null;
  if (bizContent) {
    let bizStr = JSON.stringify(bizContent);
    data = "bizContent=" + (method == 'post' ? bizStr : encodeURIComponent(bizStr));
  }

  let config = {
    method: method,
    url: method == 'get' ? (baseUrl + api + (data != null ? "&" + data : "")) : baseUrl + api,
    data: data
  };

  return axios(config).then(response => {
    // 隐藏loading
    if (showLoading) {
      showToast(false);
    }
    if (response.status == 200) {
      return response.data;
    } else {
      // 弹出错误提示
      showToast(showLoading, "系统错误，错误码：" + response.status);
    }
  }).then(data => {
    if (data.errcode == 0 || data.errcode == '0') {
      return data;
    } else {
      // 弹出错误提示
      showToast(true, data.msg, 1500);
    }
  }).catch(err => {
    if (err.response) {
      showToast(showLoading, "系统错误，错误码：" + err.response.status);
    } else {
      showToast(showLoading, "无法连接服务器,请检查网络连接");
    }
  });
};

let get = (api, bizContent) => {
  return ajax(api, 'get', bizContent, true);
}

let post = (api, bizContent) => {
  return ajax(api, 'post', bizContent, true);
}

let silentGet = (api, bizContent) => {
  return ajax(api, 'get', bizContent, false);
}

let silentPost = (api, bizContent) => {
  return ajax(api, 'post', bizContent, false);
}

export default {
  get, post, silentGet, silentPost
}
