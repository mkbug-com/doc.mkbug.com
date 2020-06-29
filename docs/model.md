---
id: model
title: 数据 Model
---
`Model`层是对数据操作的抽象，一些复杂的应用会更进一步拆分出`Dao`层。对于框架来说，到`Model`层已经足够了。而`Dao`层会根据使用的持久层技术不同而不同，难以抽象。所以在这里就不在做进一步抽象了。

> *Notice：在`Mkbug.js`中，通过实现`BaseModel`接口的逻辑类会自动实例化并自动注入`Logic`中，也同样支持多模块。*

## BaseModel
`BaseLogic`是`Mkbug.js`提供的逻辑层接口。通过在指定目录创建继承至该接口的实现，即可被`Mkbug.js`自动识别。并可以被注入到`Controller`直接使用。而`Mkbug.js`的技术架构内，`Logic`只能被`Controller`访问，提供帮助构建更易于维护和扩展系统的框架级约束。

> *Notice：在实际开发中，我们可能会有非常复杂的模块，需要拆分成多个子模块，所以`Mkbug.js`也提供以目录结构自动生成模块的功能，在应对复杂应用的时候依然得心应手。*

## 目录结构
```js
  ├── src 
      ├── controller 
          ├── Model.js
      ├── logic
          ├── TestLogic.js // class TestLogic
      ├── model
          ├── SubTestModel1.js // class SubTestModel1
          ├── SubTestModel2.js // class SubTestModel2
  ├── index.js 
```
> *Notice：和`BaseController`一样，注入的模块名也是根据类名定义的，类名与文件名需要相同。为了结构清晰，大家还是不要像我这么随便起名字。*

## 实现Logic
`Logic`其实就是普通的对象模块，可以包含各种属性和方法。
```js
  // src/logic/TestLogic.js
  const { BaseLogic } = require('mkbugjs');

  module.exports = class TestLogic extends BaseLogic {
    sayHello1 () {
      return this.getModel('SubTestModel1').sayHello()
    }

    sayHello2 () {
      return this.getModel('SubTestModel2').sayHello()
    }
  }
```

> *Notice：和`Controller`中访问`Logic`模块一样，也可以在`Logic`中通过`Models`和`getModel`访问`Model`模块。*

## 实现Model
`Model`也是普通的对象模块，可以包含各种属性和方法。
```js
  // src/model/SubTestModel1.js
  const { BaseModel } = require('mkbugjs');

  module.exports = class SubTestModel1 extends BaseModel {
    sayHello () {
      return 'Hello from Test1'
    }
  }

  // src/model/SubTestModel2.js
  const { BaseModel } = require('mkbugjs');

  module.exports = class SubTestModel2 extends BaseModel {
    sayHello () {
      return 'Hello from Test2'
    }
  }
```
> *Notice：和`Logic`一样，也不建议在`Model`实现中使用变量属性，因为在`API`接口服务中，会有多个请求同时进行，就会涉及到互斥的问题。*

## 实现Controller
```js
  // src/controller/Model.js
  const { BaseController } = require('mkbugjs');

  module.exports = class Model extends BaseController {
    getTest1Action () {
      return this.getLogic('TestLogic').sayHello1()
    }

    getTest2Action () {
      return this.getLogic('TestLogic').sayHello2()
    }
  }
```

## 运行结果
通过`curl`工具请求三个测试接口：
```js
  $ curl -XGET http://localhost:3001/api/model/test1
  Hello from Test1

  $ curl -XGET http://localhost:3001/api/model/test2
  Hello from Test2
```
> *Notice：出于和`Logic`相同的原因，在`Mkbug.js`的框架约束内，只能在`Logic`中通过特定接口才能对`Model`进行访问。*
