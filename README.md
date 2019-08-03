

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

![歌曲页面](https://user-gold-cdn.xitu.io/2019/7/27/16c3287ffe42afbe?w=2358&h=1342&f=png&s=465847)


![首页](https://user-gold-cdn.xitu.io/2019/7/27/16c3288547b6510b?w=2358&h=1342&f=png&s=2264171)


![歌单](https://user-gold-cdn.xitu.io/2019/7/27/16c328893b837809?w=2358&h=1342&f=png&s=2071408)


![歌单详情](https://user-gold-cdn.xitu.io/2019/7/27/16c3288c0c80d40c?w=2358&h=1440&f=png&s=718362)

### 安装与使用 
前端项目
```
npm i
npm run serve
```

后端项目
```
node app.js
```

