# 从零开始搭建一个能运行在浏览器的简易框架(RequireJS和Vue)

习惯了用vue官方的脚手架工具做开发，但并不知道这个自动化工具是怎么样生成的，最近公司新开的一个小项目，索性就拿它来练手了，废话不多说，干！

1. 首先我们需要新建一个html文件，用来当做浏览器我们网页的入口,我们暂且给他取名叫**index.html**吧!


``` html
<!--/index.html-->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        
    </body>
</html>
```

2. 接下来我们的需求是要在浏览器中引入模块加载器动态加载js模块（而不是同步阻塞加载js模块），这里我们需要引入一个叫[**RequireJS**](https://requirejs.org/)的JavaScript文件模块加载器来满足我们的需求。我们修改 **步骤1** 的**index.html**文件，在他的*head*标签内引入requirejs，并且在require.js加载完成后给他指定*data-main*属性，来告诉require.js来加载哪个js文件，这里我们新建一个**scripts**目录，并且在**scripts**目录下新建一个require.config.js的文件，此时我们的目录结构为

```
├── index.html                                  // 入口文件
├── scripts                                     // 脚本存放目录
│   ├── require.config.js                                 // requirejs引入后需要加载的文件
```

``` html
<!--/index.html-->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        +<script data-main="scripts/require.config.js" src="https://cdn.bootcss.com/require.js/2.3.6/require.js"></script>
    </head>
    <body>
        
    </body>
</html>
```

3. 这个时候我们需要对reqireJS做一些配置

```javascript
// scripts/require.config.js

require.config({
    baseUrl: "/scripts", //reqireJS解析的基准路径，define引入的基准根路径 指向breakfast_share的下一级
    paths: {
        "vue": 'lib/vue/vue',
        "css": 'lib/require-css',
        "text": 'lib/require-text',
    }
})
require(["/scripts/app.js"]);
```

此时我们的目录结构为

```
├── index.html                                  // 入口文件
│── scripts                                     // 脚本存放目录
│   ├── require.config.js                       // requirejs引入后需要加载的配置文件
│   ├── app.js                                  // 启动组件js
│   ├── src                                     // 应用源码目录
│   │   ├── components                          // 应用公共组件存放目录
│   │   │   ├── hello                           // hello组件目录
│   │   │   │   ├── hello.js                    // hello组件行为
│   │   │   │   ├── hello.html                  // hello组件结构
│   │   │   │   ├── hello.css                   // hello组件样式
│   ├── lib                                     // 框架外部依赖库目录
│   │   ├── require-css.js                      // A RequireJS CSS loader plugin to allow CSS requires and optimization
│   │   ├── require-text.js                     // require() text files
│   │   ├── vue                                 // vue全家桶存放目录
│   │   │   ├── vue.js                          // VueJs源码文件
```

这里新增了这么多文件，看起来很方啊，我这里有引导链接，需要自己去了解就行了
- [require-css.js](https://github.com/guybedford/require-css)一个用来引入CSS和优化CSS的RequireJS CSS模块加载器
- [require-text.js](https://www.npmjs.com/package/require-text)一个用来引入文本文件的RequireJS模块加载器
- [vue.js](https://cn.vuejs.org/)Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

4. 接下来我们看看app.js里面有些啥

```javascript
// scripts/app.js

define([
    "vue",
    "src/components/hello/hello"
], function(vue, vmComponentHello) {
    new vue({
        el: "#root",
        render: function (createElement) {
            return createElement(vmComponentHello)
        }
    })
});
```

这里表明**app.js**需要*vue*这个依赖，待这个依赖加载成功后，会执行define函数参数的第二个回调函数，该回调函数的参数根据define第一个参数的引入顺序决定，在这个案例中引入了vue依赖后,并且引入了一个名叫hello的组件，然后通过*new*关键字创建了一个vue的实例，并把这个实例挂在到了id为root的DOM节点上了。

先看看hello组件的代码
``` html
<!-- scripts/src/components/hello.html -->
<div>
    {{title}}
</div>
```

``` javascript
define([
    'vue',
    'text!./hello.html',
    'css!./hello.css'
], function(vue, template) {
    'use strict';
    var vm = vue.extend({
        template: template,
        data() {
            return {
                title: 'hello world'
            }
        }
    });
    return vm;
});
```

然后我们需要修改*index.html*文件，给他的body标签中新增一个id为root的div标签

``` html
<!--/index.html-->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script data-main="scripts/require.config.js" src="https://cdn.bootcss.com/require.js/2.3.6/require.js"></script>
    </head>
    <body>
        +<div id="root"></div>
    </body>
</html>
```

最后大功告成，我们应该在开启web服务器访问index.html文件时看到了页面上的"hello world"

总结：我们了解了RequireJS的作用和基本用法，通过它的模块加载器加载了组件的html和css,实现了前端的模块化。


