import Mock from 'mockjs'
// function getLogoImg () {
// 	return Mock.Random.image('100x100', Mock.Random.hex())
// }
Mock.mock(/getWxUserinfo/, {
  'errcode': 0,
  'errmsg': 'error',
  'res|1': [
    {
      'nickname': 'Arif',
      'headimgurl': 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELImyOUmrVjSb9ic27KVibGasR3xuMRmZGbO4VYueopgOACYwuI2jgGX7w6aaXYPf5G9uqmLniczGnvQ/132',
      'tableid': '8',
      'openid': '1'
    },
    {
      'nickname': 'Bob',
      'headimgurl': 'https://user-gold-cdn.xitu.io/2018/5/3/1632417db7b0efd0?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
      'tableid': '8',
      'openid': '2'
    }
  ]
})
