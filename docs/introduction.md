---
id: introduction
title: Introduction
sidebar_label: Introduction
---
`Mkbug.js`提供多种接口来帮助开发者快速进行`Nodejs Web`应用的快速开发，基于`Express.js`成熟稳定的底层实现。使之可以成为企业级应用技术选型的选择之一。

## 介绍
`Mkbug.js`通过`ES6`的`Class`提供了`OOP`风格的接口，且免配置路由，业务层，数据层，配置管理等企业级架构约束。帮助开发者快速建议易于维护的应用架构。通过`Plugin`机制实现对工具类的自动注入，以及中间件`BaseMiddleware`的抽象接口，使开发中间件和使用中间件的难度大大降低。

使用风格上更容易被`Java`开发者和`PHP`开发者接受。
> *Notice: 因为并不需要开发者自己手动去实例化这些类，因此`Mkbug.js`又称为声明式框架。*
#### 较于`Egg.js`
`Mkbug.js`与`Egg.js`区别很大，`Egg.js`是基于`Koa.js`进行了封装，并提供了自己强大的生态链，各种工具插件，可以帮助企业快速搭建`Nodejs`应用。而`Mkbug.js`并没有提供自己的生态，也不需要提供。`Mkbug.js`提供了完全兼容`Express.js`中间件的接口，且使用方法与之完全相同。其次`Express.js`的生态已经非常强大了，不需要我再造轮子了。

因此`Express.js`开发者可以无缝迁移到`Mkbug.js`。享受`Mkbug.js`带来的更多便利。
#### 较于`Thinkjs`
相比较于`Thinkjs`，虽然有异曲同工之妙。但是`Mkbug.js`提供了更为完备的机制去免去各种配置。且提供`Express.js`原始接口的暴露，可以方便开发者自行扩展。

而`Thinkjs`由于其封装方式，需要依赖于`Thinkjs`的扩展接口和指定的配置文件，具有一定学习成本。同时出现问题很难定位。这也是我过去使用过程中困惑的地方。

#### Mkbug.js VS Egg.js VS Thinkjs
| 项目 | Mkbug.js | Egg.js | Think.js |
| ---- | ---- | ---- | ---- |
| Nodejs | Nodejs 10+ | Nodejs 8+ | Nodejs 6+ |
| 底层框架 | Express.js | Koa.js | Koa.js |
| 路由管理 | 自动 | 手动 | 自动 |
| 逻辑层管理 | 自动 | 无 | 无 |
| 数据层管理 | 自动 | 无 | 无 |
| 插件管理 | 自动 | 手动 | 手动 |
| 中间件管理 | 手动+自动 | 手动 | 手动 |
| 配置信息管理 | 自动 | 无 | 无 |
| JS扩展 | 原生 | 原生 | Babel |
| 代码风格 | OOP声明式 | 原生 | 原生 |
| 响应耗时 | 有 | 无 | 无 |
| 页面渲染 | 兼容expressjs渲染中间件 | egg页面渲染中间件 | 兼容koa页面渲染中间件 |
| 扩展能力 | 兼容expressjs中间件 | egg生态中间件 | 兼容koa页面渲染中间件 |
| 维护团队 | 个人 | 阿里 | 个人 |

## 目录结构
通常一个`Mkbug.js`的项目目录如下：
```
  ├── scripts // 环境配置脚本或者其他启动脚本
  ├── src // 项目根目录, Mkbug.js 通常默认会扫描该目录，并自动根据该目录下指定目录的文件进行配置
      ├── controller // 请求接入层，继承BaseController的类会自动生成路由信息
      ├── logic // 用于实现业务逻辑，只有继承BaseLogic的类才会被自动注入
      ├── model // 用于数据层逻辑，只有继承BaseModel的类才能自动注入
      ├── config // 配置信息，以.conf为扩展名，会自动被Config类识别，并加载
      ├── plugin // 工具类与中间件，需要继承BaseUtil或BaseMiddleware
  ├── index.js // 启动文件实例化Mkbug对象，
```

> *Notice：当然作为企业级服务应用，还会有其它文件夹和文件存在，这里就不一一阐述了。*

## 应用架构图
![](/img/at.png)
> *Notice: 基于`Mkbug.js`的应用，并不需要自己配置路由，只要继承了`BaseController`即可自动生成路由。实现`BaseLogic`的类会自动被注入到`Controller`类中。通过`this.Logics`访问，也可以通过`this.getLogic`访问。当然同样`BaseModel`的实现类也会被自动注入到`Model`中。这样就对请求接入层，业务逻辑层，数据操作层进行了隔离与封装。易于后期维护。*

## 架构约束
在`Mkbug.js`中，我们建议开发者通过继承`BaseController`，来设置路由，当然，由于`Mkbug.js`支持`Express.js`原始接口因此，开发人员也可以直接通过`app.use`去设置。

但是并不建议开发者去那样用，`Mkbug.js`为开发者提供了更好的框架约束，通过`Mkbug.js`的构建能力，对各个模块进行隔离，去帮助开发者构建易于维护的应用结构。

通过`BaseModel`去实现数据逻辑层的实现，会自动注入到继承了`BaseLogic`的对象中。也就是意味着开发者只能在逻辑层进行数据存储的操作。而不能直接在接入层(`Controller`)中直接操作数据。

而通过`BaseLogic`去实现业务逻辑，作为请求接入层和数据逻辑层的中间媒介，这么做的好处第一是避免一个`Controller`过于复杂。满足单一职能原则。再者让我们的代码结构更加清晰，从而更易于维护。