---
id: config
title: 配置 Config
---
在`Mkbug.js`中为开发者提供了非常强大的配置信息管理接口。只需要在指定目录下创建`conf`文件，即可通过`Config`类将其转化为对象。供系统使用。

> *Notice：`Config`应该说是`Mkbug.js`中最早被落地到产品中的模块。诞生于2015年，当时大多数情况都是通过环境变量去区分，也有些`js`代码去设置这些变量的。但是每次变更都要去修改`shell`脚本或是`js`总是无法避免改动逻辑代码，还会遇到与服务器环境变量冲突的问题，于是写了`Config`模块，延续至今。*

## 创建配置信息
通常我们会将配置文件`*.conf`放到`src/config`目录下。
```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── ConfigTest.js
      ├── config
          ├── index.conf
          ├── index.[process.env.NODE_ENV].conf
  ├── index.js 

  // src/config/index.conf
  TITLE=Mkbug.js

  // src/controller/ConfigTest.js
  const { BaseController, Config } = require('mkbugjs');

  module.exports = class ConfigTest extends BaseController {
    getAction () {
      const conf = new Config('index') // 指定读取的配置名
      return conf
    }
  }
```
当使用`curl`请求接口的时候可以拿到如下结果：
```js
  $ curl -XGET http://localhost:3001/api/configtest
  {"TITLE":"Mkbug.js"}
```

## 不同环境下的配置
通常情况下，我们的系统会在多个虚拟环境运行，比如`测试环境`，`Pre环境`，`生产环境`通常在不同环境我们需要连接不同的数据库，不同的第三方服务。面对不同环境下不同配置`Config`依然可用通过`process.env.NODE_ENV`帮助我们自动屏蔽区别，自动完成对应环境配置信息的加载。

```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── ConfigTest.js
      ├── config
          ├── index.conf // 基础配置信息
          ├── index.dev.conf // `process.env.NODE_ENV = dev`环境下的配置信息
          ├── index.prod.conf // `process.env.NODE_ENV = prod`环境下的配置信息
  ├── index.js 

  // src/config/index.conf
  TITLE=Mkbug.js

  // src/config/index.dev.conf
  TITLE=Mkbug.js DEV

  // src/config/index.prod.conf
  TITLE=Mkbug.js PROD

  // src/controller/ConfigTest.js
  const { BaseController, Config } = require('mkbugjs');

  module.exports = class ConfigTest extends BaseController {
    getAction () {
      const conf = new Config('index')
      return conf
    }
  }
```

当我们以`process.env.NODE_ENV=prod`启动的时候，使用`curl`请求接口返回的数据：
```js
  $ curl -XGET http://localhost:3001/api/configtest
  {"TITLE":"Mkbug.js PROD"}
```

当我们以`process.env.NODE_ENV=dev`启动的时候，使用`curl`请求接口返回的数据：
```js
  $ curl -XGET http://localhost:3001/api/configtest
  {"TITLE":"Mkbug.js DEV"}
```

> *Notice：我们可以通过`process.env.NODE_ENV`来控制`Config`加载的配置信息。因此使用起来非常方便。*

## 配置信息的继承
通常我们一个系统会有多种配置信息，但是不同环境下配置信息有的是完全一样的。那么我们需要在不同环境配置文件重复配置么？答案是不需要。通过前面的例子我们可以清楚的看到指定环境下的配置信息会覆盖基础配置信息。而没有覆盖的部分就会继承下来。比如下面：
```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── ConfigTest.js
      ├── config
          ├── index.conf
          ├── index.dev.conf
  ├── index.js 

  // src/config/index.conf
  TITLE=Mkbug.js
  Content=A OOP style declare Nodejs Web framework base on Express.js

  // src/config/index.dev.conf
  TITLE=Mkbug.js DEV

  // src/controller/ConfigTest.js
  const { BaseController, Config } = require('mkbugjs');

  module.exports = class ConfigTest extends BaseController {
    getAction () {
      const conf = new Config('index')
      return conf
    }
  }
```

当我们以`process.env.NODE_ENV=dev`启动的时候，使用`curl`请求接口返回的数据我们发现，在特定环境下的配置信息会继承没有指定环境的配置信息。
```js
  $ curl -XGET http://localhost:3001/api/configtest
  {"TITLE":"Mkbug.js DEV","Content":"A OOP style declare Nodejs Web framework base on Express.js"}
```

> *Notice：当我们没有指定具体的运行环境的时候，`Config`会默认加载与初始化参数名相同的`conf`文件，比如`index.js`。但是当指定具体的环境（也就是`process.env.NODE_ENV`）后，将会用对应环境下的同名配置文件内容对默认配置内容进行覆盖。*

> *Notice：由于`Config`是实时解析`conf`文件，所以并不建议每次用的时候进行实例化，而是提前实例化后，在不同的地方读取实例化后的对象。比如创建一个配置信息工厂模块。*