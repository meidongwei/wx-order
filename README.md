# wx-order

## 去掉小球动画功能
shop-cart.vue
  line 29 注释
  line 68 注释
  line 73 注释
  line 138~140 注释

index.vue
  line 51 删除掉 @drop="drop"
  line 348~353 注释

cart-control.vue
  line 70~71 注释


## 数据结构
// 多用户
{
	type: 0,
	data: [
		{
			"headimgurl": "http://www.baidu.com.jpg",
			"dishes": [
				{
					dishesid: 1,
					count: 3
				}
			]
		},
		{
			"headimgurl": "http://www.baidu.com.jpg",
			"dishes": [
				{
					dishesid: 1,
					count: 3
				}
			]
		}
	]
}




{
	type:1,
	data:{
		newDish:{
			dishesid:1,
			count:1,
			"headimgurl":"http://www.baidu.com.jpg"
		},
		allDishes:[{
			"headimgurl":"http://www.baidu.com.jpg",
			"dishes":[{
				dishesid:1,
				count:3
			}]
		},{
			"headimgurl":"http://www.baidu.com.jpg",
			"dishes":[{
				dishesid:1,
				count:3
			}]
		}]
	}
}


#fd6d52
