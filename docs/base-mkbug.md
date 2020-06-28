---
id: base-mkbug
title: 类型 Mkbug
---
初始化`Nodejs Web`应用的基础类。

## Class Mkbug()
`Mkbug`的构造函数
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `app` | `Express.js`实例 | `Object` | 必填 | 无 |
| `opts` | 复选参数 | `Object` | 非必填 | `{ path: './src'}` |
### 返回
`Mkbug`: 当前应用的实例

## 方法 create()
初始化应用实例
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `prefix` | `api`请求前缀 | `String` | 非必填 | 无 |
### 返回
`Mkbug`: 当前应用的实例

> *Notice：`create`的调用顺序和`use`的调用顺序直接关系到中间件和路由的执行顺序，和`Express.js`中是一样的。*

## 方法 use()
暴露`Express.js`的`use`接口
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `plugin` | `Express.js`中间件 | `String` | 非必填 | 无 |
### 返回
`Mkbug`: 当前应用的实例

> *Notice：`create`的调用顺序和`use`的调用顺序直接关系到中间件和路由的执行顺序，和`Express.js`中是一样的。*


### 方法 start()
启动服务
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `port` | 服务监听端口号 | `Number` | 必填 | 无 |
| `cb` | 启动后回调函数 | `Function(error)` | 非必填 | 无 |
### 返回
`Mkbug`: 当前应用的实例