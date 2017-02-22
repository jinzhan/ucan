# 文档
该项目依赖[fis3](http://fis.baidu.com/), 这是一个非常容易上手的前端集成框架。详细命令请[查看这里](http://fis.baidu.com/fis3/docs/api/command.html)。

## 部署步骤

第1步: 安装fis3

	npm install -g fis3

第2步: 安装fis全局插件

    # hook类
    npm install -g fis3-hook-commonjs

    # parser类
    npm install -g fis-parser-sass
    npm install -g fis-parser-less
    npm install -g fis-parser-template
    npm install -g fis-parser-babel-5.x

    # preprocessor类
    npm install -g fis-preprocessor-js-require-file
    npm install -g fis-preprocessor-js-require-css

    # postprocessor类
    npm install -g fis-postprocessor-autoprefixer

    # postpackager类
    npm install -g fis3-postpackager-loader

    # optimizer类
    npm install -g fis3-optimizer-html-compress

    # deploy类
    npm install -g fis3-deploy-skip-packed


## 如何运行
开启fis服务器

	fis3 server start

发布

	fis3 release

	fis3 release prod-debug # 本地查看发布产品库状态
    fis3 release prod # 发布产品库

    fis3 release rd # 发布到指定机器（需要上次发的那个远程recevier.php脚本）
	fis3 release rd-debug # 发布到指定机器调试


## 目录说明
项目的目录树如下：

    ┌─components
    ├─mock
    ├─lib
    ├─modules
    │  ├─app
    │  ├─css
    │  ├─lib
    │  ├─ui
    │  └─util
    └─test

根目录下存放html文件。

- components fis 组件的目录
- lib 存放一些不打包的js库
- modules 项目的组件
	- app 项目用到的js
	- css 项目用到的css
	- lib 第三方js
	- ui UI 组件
	- util 工具组件
- mock 模拟数据, 远程模拟数据配置