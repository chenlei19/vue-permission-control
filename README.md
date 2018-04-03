## 写在前面  
最近花了1天时间研究了基于vue的前端菜单权限，权限配置应该是做单页面应用都会遇到的问题，网上也有很多关于权限配置的文章，但是大多数也都说得不是很详细。我写个笔记把昨天倒腾的东西记录下，给不清楚怎么做权限的朋友参考。也许还有其他思路和方案，欢迎一起交流。

## Build Setup
```
# Install dependencies
npm install

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
## 用到
- vue
- element
- vue-element-admin
- vuex
- axios

## 基于vue的实现思路
权限配置分为2种：一种是从后台请求过来权限，前端动态配置菜单；另一种是完全由前端配置。这2种本质思路是一样的，我们项目要求用户可以动态修改权限，这样权限只能做在后端，每次登陆的时候后台返回权限信息。在这里我简单的模拟一下，为了方便本例基于vue-element-admin空模板做。  

每一个路由可以配置meta对象，本例是利用meta对象的ID和模拟后台返回的权限ID去比较，过滤出相同的路由。思路其实很简单，实现起来也不难。 

关于菜单：菜单是根据路由自动生成的，如果不需要显示菜单，在meta对象中添加{hidden: true}即可,vue-element-admin模板已经做了判断，过滤掉不需要显示的菜单也很简单，不明白的可以看看源码

实现思路：在实例化路由的时候分2种情况，首先实例化公共路由（也就是所有角色都能看的路由），export出一组异步加载的路由。在登录成功并且拿到后台返回的权限信息后，在vuex里过滤生成一组符合权限的全局路由，然后在路由钩子函数beforeEach中去判断是否是登录，如果是登录操作就使用路由的router.addRoutes()动态添加过滤后匹配的路由。 

## 具体代码实现说明
- utils/menu.js里存放模拟的2组权限数据、菜单名称及ID。这里的返回数据结构可以自行根据项目实际需求更改，在store/modules/permission.js里修改相应的过滤函数即可
- 登录后全局存储过滤后的路由 store/modules/permission.js
- src目录下permission.js做路由拦截，添加过滤后的路由，(同时可设置白名单，过滤其他路径的请求)




