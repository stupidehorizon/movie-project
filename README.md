# nodejs练习项目

本项目作为初学node的入门项目。参考了慕课网的视频教程和评论区同学[cllgeek](https://github.com/cllgeek) 的源码，自己理了一遍，修改了错误，添加了详细的备注，更方便初学者看懂。
## 项目展示
![](https://github.com/stupidehorizon/movie-project/blob/master/project.gif)

## 安装方式
- clone 到本地
- 命令行启动mongodb数据库 此处省略端口设置 -port mongodb将设为默认端口
```javascript
λ mongod -dbpath D:\MongoDB-data\data\db
```
- 启动服务器
```javascript
λ node app
```
## 使用框架和类库

本项目使用node作为后台开发语言，并以express4.X为类库，mongodb为数据库开发的。
node库使用相关类库

- express4.x
- ejs
- mongoose
- underscore
- path
- body-parser
- es6(因为nodejs从6.X版本开始就支持93%的es6特性了,所以没有用到babel转码)

前端使用相关类库

- bootstrap
- jquery

## master分支项目介绍

本分支主要有4个页面，分别为：首页，列表页，新增录入页，详情页面。处理逻辑有新增，修改，删除操作。

## 运行安装(tips)
clone或者直接下载本代码库后，需要安装node，mongodb环境，之后再项目根目录下运行npm install 安装应用到的类库。

* 关于mongodb的安装可以参照[这里](http://www.imooc.com/article/14770)
* 如果你不想安装mongodb,可以上https://mlab.com/ 注册申请一个500M的免费mongodb数据库,很方便.

* 持续更新,后续前端会采用react。
