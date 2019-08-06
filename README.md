

音乐播放器虽然烂大街了，但是作为前端没自己撸一个一直是个遗憾，而且偶然间发现pc端web版的网易云音乐做的实在是太简陋了，社区仿pc客户端的网易云也不多见，为了弥补这个遗憾，就用vue全家桶模仿mac客户端的ui实现了一个，欢迎提出意见和star~

### [预览地址](http://47.99.213.231:8001/)
### [源码地址](https://github.com/sl1673495/vue-netease-music) 

### 进度 
* 搜索歌曲+播放（版权歌曲无法播放)
* 发现页
  * banner图
  * 最新歌曲
  * 推荐歌单
* 播放列表
* 播放记录
* 全部歌单
* 歌单详情
  * 音乐列表
  * 评论区
* 最新音乐
* cd页
  * 歌词
  * 评论区
  * 推荐歌单
  * 推荐歌曲
* 登录(网易云uid登录)
  * 获取用户信息
  * 获取收藏歌单

* 主题换肤功能

### 后端接口
https://binaryify.github.io/NeteaseCloudMusicApi

### 技术栈
* Vue全家桶 Vue-CLI3 create出来的。
* ui库用了魔改样式的element-ui
* 歌词滚动部分用了黄轶老大的better-scroll（贼爽）
* 主题换肤用的css变量替换。
* ES 6 / 7 （JavaScript 语言的下一代标准）
* Sass（CSS预处理器）
* postcss-pxtorem（自动处理rem，妈妈再也不用担心屏幕太大太小了）

### Screenshots

![首页](https://user-images.githubusercontent.com/23615778/62509203-da358580-b83c-11e9-97b3-367fb06a8347.png)


![歌单列表](https://user-images.githubusercontent.com/23615778/62509204-dace1c00-b83c-11e9-8d3f-0bcb93e3aab7.png)


![歌单详情](https://user-images.githubusercontent.com/23615778/62509201-d99cef00-b83c-11e9-8e4b-b122b8b94468.png)


![音乐播放](https://user-images.githubusercontent.com/23615778/62509202-da358580-b83c-11e9-98e1-530e5741ff56.png)

### 安装与使用 
前端项目
```
npm i
npm run serve
```

后端项目 [地址](https://github.com/Binaryify/NeteaseCloudMusicApi)
clone下来之后执行
```
node app.js
```
默认启动在3000端口，之后就可以访问到接口了。

