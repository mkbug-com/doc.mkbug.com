---
id: logic
title: 逻辑 Logic
---
每一个后端应用都会至少分三层即：控制层，逻辑层，数据层。而逻辑层就是实现业务逻辑的抽象层。

> *Notice：在`Mkbug.js`中，通过实现`BaseLogic`接口的逻辑类会自动实例化并自动注入`Controller`中，非常方便。而且支持多模块。*

## BaseLogic
`BaseLogic`是`Mkbug.js`提供的逻辑层接口。通过在指定目录创建继承至该接口的实现，即可被`Mkbug.js`自动识别。并可以被注入到`Controller`直接使用。而`Mkbug.js`的技术架构内，`Logic`只能被`Controller`访问，提供帮助构建更易于维护和扩展系统的框架级约束。

> *Notice：在实际开发中，我们可能会有非常复杂的模块，需要拆分成多个子模块，所以`Mkbug.js`也提供以目录结构自动生成模块的功能，在应对复杂应用的时候依然得心应手。*

## 目录结构
```js
  ├── src 
      ├── controller 
          ├── Logic.js
      ├── logic
          ├── TestLogic.js // class TestLogic
          ├── TestLogic
              ├── SubTestLogic1.js // class SubTestLogic1
              ├── SubTestLogic2.js // class SubTestLogic2
  ├── index.js 
```
> *Notice：和`BaseController`一样，注入的模块名也是根据类名定义的，所以类名与文件名需要相同。为了结构清晰，大家还是不要像我这么随便起名字。*

## 实现Logic
`Logic`其实就是普通的对象模块，可以包含各种属性和方法。
```js
  // src/logic/TestLogic.js
  const { BaseLogic } = require('mkbugjs');

  module.exports = class TestLogic extends BaseLogic {
    sayHello () {
      return 'Hello from TestLogic'
    }
  }

  // src/logic/TestLogic/SubTestLogic1.js
  const { BaseLogic } = require('mkbugjs');

  module.exports = class SubTestLogic1 extends BaseLogic {
    sayHello () {
      return 'Hello from SubTestLogic1'
    }
  }

  // src/logic/TestLogic/SubTestLogic2.js
  const { BaseLogic } = require('mkbugjs');

  module.exports = class SubTestLogic2 extends BaseLogic {
    sayHello () {
      return 'Hello from SubTestLogic2'
    }
  }
```
> *Notice：并不建议在`Logic`实现中使用变量属性，因为在`API`接口服务中，会有多个请求同时进行，就会涉及到互斥的问题。*

## 使用Logic
在`Controller`中，开发者可以通过`Logics`对象和`getLogic`方法两种方式访问逻辑对象，`getLogic`主要是为了复杂模块而设计的，可以通过对象属性路径`path`的方式访问指定属性。
```js
  // src/controller/Logic.js
  const { BaseController } = require('mkbugjs');

  module.exports = class Logic extends BaseController {
    getTest1Action () {
      return this.Logics.TestLogic.sayHello()
    }

    getTest2Action () {
      return this.getLogic('TestLogic.SubTestLogic1').sayHello()
    }

    getTest3Action () {
      return this.getLogic('TestLogic.SubTestLogic2').sayHello()
    }
  }
```

## 运行结果
通过`curl`工具请求三个测试接口：
```js
  $ curl -XGET http://localhost:3001/api/Logic/test1
  Hello from TestLogic

  $ curl -XGET http://localhost:3001/api/Logic/test2
  Hello from SubTestLogic1

  $ curl -XGET http://localhost:3001/api/Logic/test3
  Hello from SubTestLogic2
```
> *Notice：虽然我们可以随意的创建逻辑实现的`js`文件,然后通过`require`导入到对应的`Controller`中，但是这样很容易被不守规矩的开发人员转空子，久而久之系统的结构会变得凌乱，当然我们可以通过`CR`解决这个问题，但是`CR`也是成本。而`Mkbug.js`的`Logic`接口就是为了通过这种框架约束帮助降低这种零碎的开发成本。*