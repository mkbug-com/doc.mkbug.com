---
id: base-controller
title: 接口 BaseController
---
请求接入层抽象接口。

## 接口 BaseController
接入层的抽象接口
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
无

## 方法 super()
父类的构造函数，如果派生新的基类必须执行。
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
无

## 属性 req
用于获取`Express.js`的`Request`对象
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`Express.Request`: `Express.js`的`Request`对象

## 属性 res
用于获取`Express.js`的`Response`对象
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`Express.Response`: `Express.js`的`Response`对象

## 属性 query
用于获取请求中`URL`中的`Query`参数
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`Object`: 请求的`URL`中的`Query`参数对象

## 属性 body
用于获取请求中的请求体
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`Object`: 请求中的`Body`请求体对象

## 属性 params
用于请求`URL`传参的参数
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`Object`: 请求的`URL`中的`Params`请求体对象

## 属性 status
用于响应的状态码
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`Number`: 请求响应的状态码，默认`200`

## 属性 type
用于响应的状态码
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| 无 | 无 | 无 | 无 | 无 |
### 返回
`String`: 返回的数据类型，同`content-type`

## 属性 set
用于设置响应header信息
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `key` | `header`中的字段名 | `String` | 是 | 无 |
| `value` | `header`中的字段名 | `String` | 是 | 无 |
### 返回
无

## 属性 get
用于获取响应header信息
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `key` | `header`中的字段名 | `String` | 是 | 无 |
### 返回
`String`: 返回`header`中指定的数据

## 接口 before
请求进入时触发的拦截器
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `request` | 请求抽象接口 | `Object` | 必填 | `Express.Request` |
| `response` | 响应抽象接口 | `Object` | 必填 | `Express.Response` |
### 返回
`NULL`: 正常返回<br/>
### 异常
`MkbugError`: 拒绝请求，返回`405`, `Method not allowed!`，或用户初始化`MkbugError`对象指定的`Status`和返回体。

## 接口 {method}{Name}Action
请求响应方法<br/>
`method`: `get|head|post|put|delete|connect|options|patch|trace`<br/>
`Name`: `api`名称
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `request` | 请求抽象接口 | `Object` | 必填 | `Express.Request` |
| `response` | 响应抽象接口 | `Object` | 必填 | `Express.Response` |
### 返回
`String|Buffer|Object|Number`: 正常返回内容<br/>
### 异常
`MkbugError`: 拒绝请求，返回`405`, `Method not allowed!`，或用户初始化`MkbugError`对象指定的`Status`和返回体。

## 接口 after
请求返回完成时触发的拦截器
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `duration` | 请求响应时长(ms) | `Number` | 必填 | `0` |
| `status` | 请求响应的`HTTP CODE` | `Number` | 必填 | `200` |
| `originalUrl` | 请求地址 | `String` | 必填 | 无 |
| `request` | 请求抽象接口 | `Object` | 必填 | `Express.Request` |
| `response` | 响应抽象接口 | `Object` | 必填 | `Express.Response` |
### 返回
无
