---
id: quick-start
title: Quick Start
---
A OOP style declare Nodejs Web framework base on Express.js

## 什么是Mkbug.js
`Mkbug.js`是一个`OOP`风格声明式`Nodejs`框架。只需要声明并继承了对应接口的`Class`即可轻松的开发一个`Nodejs API`应用服务。

## 通过npm安装Mkbugjs
```sh
  // mkbug.js 需要依赖于expressjs和chalk。因此需要同时安装这两个依赖
  $ npm install mkbugjs express chalk -save
```

## 第一个程序：Hello World
所有的计算机编程技术，都是从这个`Hello World`开始的。当然`Mkbug.js`也不例外。
### 创建index.js（也可以叫其它名字）
```js
  const express = require('express');
  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/') // 请求url前缀
    .use(bodyParser.json()) // 使用express中间件
    .start(3001, (err) => { // 启动，同app.listen
    if (!err)
      console.log('Server started!')
    else
      console.error('Server start failed!')
  })
```
> *`Notice`：`Mkbugjs`提供了对`Express.js`现有中间件的完全支持。*
### 执行结果
![](/img/start1.png)

> *`Notice`：`Mkbugjs`是默认取`src`目录的代码生成对应的`Controller`，因此我们下一步就是创建一个`Controller`.*

### 创建第一个Controller
我们只需要在`src/controller`目录下创建一个`index.js`文件并继承`BaseController`类。
```js
  // src/controller/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class HelloWorld extends BaseController {
    getAction () {
      return 'Hello World';
    }
  }
```
### 执行结果
![](/img/start2.png)

> *Notice：`BaseController`是`Mkbugjs`最基本的类，任何在`src/controller`目录下，并继承`BaseController`的类均会自动生成对应的接口.*

![](/img/start3.png)

> *Notice：`Mkbugjs`提供了丰富的`Web`服务器常用的类。只需要继承并实现对应的类，即可实现自动注入。就像`Java`流行的`Spring Boot`或者`PHP`的`Thinkphp`一样。非常简单。*
