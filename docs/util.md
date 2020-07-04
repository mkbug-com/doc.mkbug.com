---
id: util
title: 工具 Util
---
`Mkbug.js`提供工具类`BaseUtil`，主要用于帮助开发者使用`OOP`声明式风格去管理工具函数。

> *Notice：`Express.js`和`Koa.js`有一点不同，且让开发者头疼的事情，就是必须要显示的响应用户请求，否则客户端连接会一直挂起。这也是很多初学者容易造成的错误。而`Mkbug.js`在路由层和中间件层都进行了处理，让开发者忽略这些开发细节。全身心投入到业务开发中去，同时也提供了高级接口，开发者也可以开发更高级的中间件。*

## 工具类
`Mkbug.js`会默认从`src/plugin`目录内加载各种插件。而继承于`BaseUtil`的插件会自动实例化到`Utils`模块中，

> *Notice：`Utils`模块只能被`BaseController`，`BaseLogic`，`BaseModel`的派生类通过`this.Utils`或者`this.getUtils(path)`访问。*

### 使用`BaseUtil`
```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── Util.js
      ├── plugin
          ├── TestUtil.js
  ├── index.js 

  // src/plugin/TestUtil.js
  const { BaseUtil } = require('mkbugjs');

  module.exports = class TestUtil extends BaseUtil {
    sayHello (name) {
      return `Hello ${name}`
    }
  }

  // src/controller/Util.js
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
          ├── Util.js
      ├── plugin
          ├── TestUtil.js
          ├── DemoUtil
              ├── TestUtil.js
  ├── index.js 

  // src/plugin/TestUtil.js
  const { BaseUtil } = require('mkbugjs');

  module.exports = class TestUtil extends BaseUtil {
    sayHello (name) {
      return `Hello ${name}`
    }
  }

  // src/plugin/DemoUtil/TestUtil.js
  const { BaseUtil } = require('mkbugjs');

  module.exports = class TestUtil extends BaseUtil {
    sayHello (name) {
      return `Hello ${name} from DemoUtil`
    }
  }

  // src/controller/Util.js
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
