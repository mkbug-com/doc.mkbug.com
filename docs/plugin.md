---
id: plugin
title: 插件 Plugin
---
`Mkbug.js`主要提供了两个类型的`Plugin`，一种是工具类`BaseUtil`，主要用于帮助开发者使用`OOP`声明式风格去管理工具函数。另一种是`BaseMiddleware`,即中间件，由于开发`Express.js`需要对高阶函数，闭包，请求上下文还是有一定要求的。所以，`BaseMiddleware`对其进行了封装，降低中间件的开发难度，抛出`MkbugError`会自动返回。

> *Notice：`Express.js`和`Koa.js`有一点不同，且让开发者头疼的事情，就是必须要显示的响应用户请求，否则客户端连接会一直挂起。这也是很多初学者容易造成的错误。而`Mkbug.js`在路由层和中间件层都进行了处理，让开发者忽略这些开发细节。全身心投入到业务开发中去，同时也提供了高级接口，开发者也可以开发更高级的中间件。*

## 工具类`Plugin`
`Mkbug.js`会默认从`src/plugin`目录内加载各种插件。而继承于`BaseUtil`的插件会自动实例化到`Utils`模块中，

> *Notice：`Utils`模块只能被`BaseController`，`BaseLogic`，`BaseModel`的派生类通过`this.Utils`或者`this.getUtils(path)`访问。*

### 使用`BaseUtil`
```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── index.js
      ├── plugin
          ├── index.js
  ├── index.js 

  // src/plugin/index.js
  const { BaseUtil } = require('mkbugjs');

  module.exports = class TestUtil extends BaseUtil {
    sayHello (name) {
      return `Hello ${name}`
    }
  }


  // src/controller/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class Util extends BaseController {
    getAction () {
      return this.Utils.TestUtil.sayHello('World')
    }

    getTestAction () {
      return this.getUtils('TestUtil').sayHello('World') + ' from getUtils'
    }
  }
```
启动后可以看到日志显示注入了对应的工具类：
![](/img/util1.png)

当使用`curl`请求接口的时候可以拿到如下结果：
```js
  $ curl -XGET http://localhost:3001/api/util
  Hello World

  $ curl -XGET http://localhost:3001/api/util/test
  Hello World from getUtils
```
### 模块化工具类
提供两种访问工具插件对象的方式是因为如果项目过于复杂，可能会存在分模块的情况，而`Mkbug.js`提供了以目录为模块的方式进行自动模块化实例工具类的功能。
```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── index.js
      ├── plugin
          ├── index.js
          ├── DemoUtil
              ├── index.js
  ├── index.js 

  // src/plugin/index.js
  const { BaseUtil } = require('mkbugjs');

  module.exports = class TestUtil extends BaseUtil {
    sayHello (name) {
      return `Hello ${name}`
    }
  }

  // src/plugin/DemoUtil/index.js
  const { BaseUtil } = require('mkbugjs');

  module.exports = class TestUtil extends BaseUtil {
    sayHello (name) {
      return `Hello ${name} from DemoUtil`
    }
  }

  // src/controller/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class Util extends BaseController {
    getAction () {
      return this.getUtils('DateUtil.TestUtil').sayHello('World')
    }
  }
```
当使用`curl`请求接口的时候可以拿到如下结果：
```js
  $ curl -XGET http://localhost:3001/api/util
  Hello World from DemoUtil
```

> *Notice：为了避免开发者因为自动注入忘记了对应的工具类对象的访问路径，在`Mkbug.js`的日志中都清晰的显示了所有注入内容，方便开发者进行开发。*

## 中间件类`Plugin`
`Mkbug.js`会默认从`src/plugin`扫描继承于`BaseMiddleware`的插件并自动设置成中间件，并作用于当前的跟路径。

`BaseMiddleware`提供一个`exec`接口，该接口主要用于实现中间件的业务逻辑，并提供了`res`和`req`接口。当我们需要拦截请求，只需要抛出`MkbugError`异常即可。否则会执行下一步路由。

```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── index.js
      ├── plugin
          ├── index.js
          ├── index1.js
          ├── index2.js
  ├── index.js 

  // src/plugin/index.js
  const { BaseMiddleware, MkbugError } = require('mkbugjs');

  module.exports = class TestMiddleware1 extends BaseMiddleware {
    exec (req, res) {
      if (req.query.test === '1') {
        throw new MkbugError(200, 'Reject from TestMiddleware1')
      }
    }
  }

  // src/plugin/index1.js
  const { BaseMiddleware, MkbugError } = require('mkbugjs');

  module.exports = class TestMiddleware2 extends BaseMiddleware {
    exec (req, res) {
      if (req.query.test === '2') {
        throw new MkbugError(401, 'Reject from TestMiddleware2')
      }
    }
  }

  // src/plugin/index3.js
  const { BaseMiddleware } = require('mkbugjs');

  module.exports = class TestMiddleware3 extends BaseMiddleware {
    exec (req, res) {
      console.log('Reject from TestMiddleware3')
    }
  }

  // src/controller/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class MiddleWare extends BaseController {
    getAction () {
      return 'Hello World'
    }
  }
```
这里我们创建了`3`个中间件，其中`2`个对请求中`query.test`等于`1`和`2`进行了拦截，分别返回`200`状态和`401`状态。

我们先测试第一个中间件：
```sh
  $ curl -w " status=%{http_code}" localhost:3001/api/MiddleWare?test=1
  {"msg":"Reject from TestMiddleware1"} status=200
```
这里正常返回了状态为`200`的响应，并拿到了`MkbugError`内的内容。接下来我们测试第二个中间件：
```sh
  $ curl -w " status=%{http_code}" localhost:3001/api/MiddleWare?test=2
  {"msg":"Reject from TestMiddleware2"} status=401
```
在这里我们可以看到通过`MkbugError`自定义返回的`http`请求的`status`和内容。而如果在中间件中什么也不做的话，就是第三个中间件：

```sh
  $ curl -w " status=%{http_code}" localhost:3001/api/MiddleWare
  Hello World status=200
```
可以看到对应的路由接口数据被正常返回。

> *Notice：`Mkbug.js`为开发者提供了非常完备的中间件抽象，可以大大降低开发者在中间件的开发难度。*

> *Notice：`Mkbug.js`的中间件插件是不保障顺序的。*