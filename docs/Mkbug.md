---
id: mkbug
title: 应用 Mkbug
---
`Mkbug.js`为开发者提供了统一的`OOP`风格的启动入口，并且暴露了`Express.js`底层接口，开发者可以很容易的使用。

> *Notice：`Mkbug`模块并不是`Mkbug.js`的第一个模块，但是这是我2016年离开`IBM`写的第一个模块，并应用于实际项目，主要是便于统一`Node.js`的风格，让项目的启动代码更加简洁和优雅。创建统一风格的`Express.js`程序。*

## 创建一个应用
为了简化开发者的工作量和繁琐的配置。`Mkbug.js`为开发者提供了便利的实例化应用入口。仅仅几行代码就可以完成。而`OOP`风格让代码变得更加简洁易于维护。

```js
  // index.js
  const express = require('express');
  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/')
    .start(3001)

  // src/controller/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class HelloWorld extends BaseController {
    getAction () {
      return 'Hello World';
    }
  }
```

## 自定义路由前缀
如果是前后分离架构，或者微服务架构，开发者通常希望在接口请求前面加一个前缀。而在`Mkbug.js`加前缀是非常简单的。
```js
  new Mkbug(app)
    .create('/前缀')
    .start(3001)
```
这样所有的请求路径都会加上在这里设置的前缀。

## 更改默认源码路径
`Mkbug.js`默认是读取`/src`目录的对应文件夹，初始化系统。但是并不能排除某些开发者有其它更好的想法。所以我们可以像这样修改默认的目录。
```js
  new Mkbug(app, { path: '/你希望的目录' })
    .create('/前缀')
    .start(3001)
```

## 中间件
`Mkbug.js`可以无差别使用所有`Express.js`中间件。而且非常简单。
```js
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/api') // 请求url前缀
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .start(3001)
```

> *Notice：是不是非常简单？*