---
id: base-mkbugerror
title: 类型 MkbugError
---
`Mkbug.js`内部异常抽象，可以被转化为请求的响应。

## 方法 MkbugError()
异常构造函数
### 参数
| 参数 | 说明 | 类型 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| `status` | 请求响应的`HTTP CODE` | `Number` | 必填 | `200` |
| `responseBody` | 请求响应的信息 | `String` | 必填 | ` ` |
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
