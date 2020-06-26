---
id: controller
title: 路由 Controller
---
在`Mkbug.js`中为开发者提供了非常强大的路由接入层管理工具，只要继承`BaseController`即可自动帮助开发者生成路由，并支持多种不同方式满足开发者对不同类型`URI`的需要。同时为开发者提供拦截器，以及响应时长计算。方便开发者对请求接入的管理。

> *Notice：`BaseController`模块期初只是为了满足部分`PHP`和`Java`开发人员的需要，但是当时早在2018年，`Nodejs`对新语法的支持还不是很好。到2019年初才正式应用于项目，大大降低了路由管理的工作量，并提供了`PHP`和`Java`非常熟悉的`OOP`声明式风格。*

## BaseController
`BaseController`是`Mkbug.js`最为核心的基本接口，用于生成请求接入路由和提供对路由进行基本的控制。帮助开发者更好的管理接入层路由信息，避免混乱和出错。

## 如何使用`BaseController`？
最简单的办法就是在`src`目录的`controller`目录创建一个`JS`文件，定义一个类，并继承至`BaseController`:
```js
  // src/controller/xxx.js
  const { BaseController } = require('mkbugjs');

  module.exports = class HelloWorld extends BaseController {
    getAction () {
      return 'Hello World';
    }
  }
```

此时，当我们启动程序，会发现日志下发会把生成的路由信息打印出来：
![](/img/router-controller1.png)

我们可以清楚的看到`Mkbug.js`帮助我们生成了一个接口名字叫`/helloworld`。通过浏览器访问可以看到以下结果：
```js
  $ curl -XGET http://localhost:3001/helloworld
  Hello World
```

这个时候服务器端会产生日志，基本的日志信息包含请求响应时长，返回状态和访问路径：
![](/img/router-controller3.png)

> *Notice：我们有两种方式修改日志输出格式，第一种：自己实现`BaseController`的`after`接口。第二种方法，实现一个继承至`BaseController`的基类，然后所有路由接入层`Controller`都继承至这个新的基类。*
> *Notice：类的方法名必须以`HTTP`协议的`Methods`名开头，`Action`结尾，这样才会被识别为路由信息，具体信息见后面。*

## 请求接入层
`Mkbug.js`通过目录名，类名和方法名生成`API`路由信息，并为开发者提供了多种路由生成方案，可以满足绝大多数对路由规则不同的需求。

> *Notice：由于`URI`是不区分大小写的，因此所有的路由信息都会转为小写地址。*

### 目录名和类名生成路由规则
对于`URI`通常存在带参`URI`和不带参`URI`。而`Mkbug.js`则使用目前较为流行的规则即以`_`开头的会被生成为带参路由。如下：
```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── _params
              ├── index.js
  ├── index.js 

  // src/controller/_parans/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class ParamsTest1 extends BaseController {
    getAction () {
      return 'Hello World';
    }
  }
```
启动程序以后可以看到生成的路由信息，请求对应地址`http://localhost:3001/helloworld/paramstest1`可以看到日志输出：

![](/img/router-controller4.png)

浏览器请求结果：
```js
  $ curl -XGET http://localhost:3001/helloworld/paramstest1
  Hello World
```


### 文件名生成路由规则
通常情况下，文件名是被忽略的。而是以类名去生成路由信息，这可以满足绝大多数情况的需求，但是某些情况下，可能这个模块下只需要一个`Controller`就够了。显然，创建一个目录是不必的。因此`Mkbug.js`在发现文件名以`_`开头的时候会作为带参路由的一部分配置到路由中。

```js
  // 目录结构
  ├── src 
      ├── controller 
          ├── _params
              ├── index.js
              ├── _id.js
          ├── pathtest
              ├── index.js
  ├── index.js 

  // src/controller/_parans/_id.js
  const { BaseController } = require('mkbugjs');

  module.exports = class IdTest extends BaseController {
    getAction () {
      return 'Hello ! this message from IdTest';
    }
  }
  // src/controller/pathtest/index.js
  const { BaseController } = require('mkbugjs');

  module.exports = class HelloWorld extends BaseController {
    getTestAction () {
      return 'Hello! this message from pathtest/hellowrold!';
    }
  }
```
启动程序以后可以看到生成的路由信息，请求对应地址`http://localhost:3001/helloworld/idtest`可以看到日志输出：
![](/img/router-controller6.png)

浏览器请求结果：
```js
  $ curl -XGET http://localhost:3001/helloworld/idtest
  Hello ! this message from IdTest
```

我们看到`src/controller/pathtest/index.js`的文件名并不在路由信息中，这是因为`Mkbug.js`是通常情况下忽略文件名，而是以类名为路由信息的。
```js
  $ curl -XGET http://localhost:3001/pathtest/helloworld/test
  Hello! this message from pathtest/hellowrold!
```

### 类方法名生成规则
在上例中，我们看到`src/controller/pathtest/index.js`中实现的方法名为`getTestAction`，而生成的路由信息也变成了`http://localhost:3001/pathtest/HelloWorld/test`。

> *Notice：因为`Controller`的方法名是非常关键的配置信息，类的方法名必须以`HTTP`协议的`Methods`名开头`Action`结尾，这样才会被识别为路由信息。如果在`Methods`和`Action`之间没有其它单词，则没有对应的路径。就像上面的例子一样。*

> *Notice：`http`协议目前支持9个方法，当然，实际上不同浏览器还有更多的方法。但是为了保持与标准同步，`Mkbug.js`支持9种方法，分别是：`GET`,`HEAD`,`POST`,`PUT`,`DELETE`,`CONNECT`,'`OPTIONS`,`TRACE`,`PATCH`。*

比如:
```js
  // src/controller/methods.js
  const { BaseController } = require('mkbugjs');

  module.exports = class Methods extends BaseController {
    getTestAction () {
      return 'getTestAction';
    }

    headTestAction () {
      return 'headTestAction';
    }

    postTestAction () {
      return 'postTestAction';
    }

    putTestAction () {
      return 'putTestAction';
    }

    deleteTestAction () {
      return 'deleteTestAction';
    }

    connectTestAction () {
      return 'connectTestAction';
    }

    optionsTestAction () {
      return 'optionsTestAction';
    }

    patchTestAction () {
      return 'patchTestAction';
    }

    traceTestAction () {
      return 'traceTestAction';
    }

    warnTestAction () {
      return 'warnTestAction';
    }
  }
```

运行日志会记录产生的路由信息：
![](/img/router-controller9.png)

> *Notice：通过`CURL`工具可以拿到对应的返回信息，这里就不一一列举了。当然有一些方法是不会有返回值的。所以即使你返回了信息也拿不到，比如`HEAD`。*

## 返回请求响应

`Mkbug.js`默认返回`JSON`对象，`HTTP STATUS`为`200`。但是开发者肯定是有自己的需要的。因此`Mkbug.js`为开发者提供了必须的自定义接口。

### 响应状态
通常由于业务逻辑需要，开发者需要自定义返回的`HTTP STATUS`。而`this.status`可以用于之定义返回的请求状态：
```js
  // src/controller/status.js
  const { BaseController } = require('mkbugjs');

  module.exports = class StatusTest extends BaseController {
    getTestAction () {
      this.status = 401
      return 'getTestAction';
    }
  }
```
执行结果如下：
```sh
  $ curl -w "  status=%{http_code}" localhost:3001/statustest/test
  getTestAction  status=401
```

### 请求参数
请求参数是我们在熟悉不过的了。在`Mkbug.js`为我们提供了`this.query`&`this.params`&`this.body`分别取路由参数，查询参数和请求体参数。
```js
  // index.js
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/') // 请求url前缀
    .use(bodyParser.urlencoded({ extended: true }))
    // 由于默认express是不支持解析请求体的，所以需要中间件支持。
    .use(bodyParser.json()) 
    .start(3001)

  // src/controller/_id.js
  const { BaseController } = require('mkbugjs');

  module.exports = class QueryParamsBody extends BaseController {
    postTestAction () {
      return 'getTestAction Query.id = ' + 
        this.query.id + ' Params.id = ' + 
        this.params.id + ' Body.id = ' + 
        this.body.id;
    }
  }
```

执行结果如下：
```sh
  $ curl -H "Content-Type:application/json" \
  -XPOST http://localhost:3001/paramsData/test?id=queryData \
  -d '{"id":"bodyData"}'
  
  postTestAction Query.id = queryData Params.id = paramsData Body.id = bodyData
```

### 响应类型
`Mkbug.js`为开发者提供了`this.type`接口，用于设置返回的数据类型，通过设置`this.type`就会改变`headers`的`content-type`从而让浏览器以对应的方式处理返回内容，下面是一个文件下载的例子：
```js
  // src/controller/_id.js
  const { BaseController } = require('mkbugjs');
  const fs = require('fs');

  module.exports = class file extends BaseController {
    getTestAction () {
      this.type = 'application/octet-stream'
      // 返回启动文件index.js内容
      return fs.readFileSync('./index.js') 
    }
  }
```
执行结果如下：
```sh
  $ curl -XGET -v localhost:3001/file/test

  Note: Unnecessary use of -X or --request, GET is already inferred.
  *   Trying ::1...
  * TCP_NODELAY set
  * Connected to localhost (::1) port 3001 (#0)
  > GET /file/test HTTP/1.1
  > Host: localhost:3001
  > User-Agent: curl/7.64.1
  > Accept: */*
  > 
  < HTTP/1.1 200 OK
  < X-Powered-By: Express
  < Content-Type: application/octet-stream
  < Date: Sat, 20 Jun 2020 09:10:24 GMT
  < Connection: keep-alive
  < Content-Length: 281
  < 
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  const { Mkbug } = require('mkbugjs');

  new Mkbug(app)
    .create('/') // 请求url前缀
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .start(3001)* Closing connection 0
```

### 高级接口
为了满足高级开发人员的特殊需求，`Mkbug.js`直接暴露了`Express.js`的`req`和`res`接口满足开发者的更高级需求。

> *Notice: 是不是用`Mkbug.js`使开发变得简单了许多？*