音乐播放器虽然烂大街了，但是作为前端没自己撸一个一直是个遗憾，而且偶然间发现 pc 端 web 版的网易云音乐做的实在是太简陋了，社区仿 pc 客户端的网易云也不多见，为了弥补这个遗憾，就用 vue 全家桶模仿 mac 客户端的 ui 实现了一个，欢迎提出意见和 star~

### [预览地址](http://shanshihao.cn)

### [源码地址](https://github.com/sl1673495/vue-netease-music)

### 进度

- mv 页（3.0 新增）
  - 评论区
  - 推荐 mv
- cd 页 (2.0 新增)
  - 歌词
  - 评论区
  - 推荐歌单
  - 推荐歌曲
- 搜索建议
  - 搜索联想
  - 热词搜索
- 搜索详情
  - 歌曲
  - 歌单
  - MV
- 播放（版权歌曲无法播放)
- 发现页
  - banner 图
  - 最新歌曲
  - 推荐歌单
- 播放列表
- 播放记录
- 全部歌单
- 歌单详情
  - 音乐列表
  - 评论区
- 最新音乐
- 主题换肤功能
- 登录(网易云 uid 登录)
  - 获取用户信息
  - 获取收藏歌单

### 后端接口

https://binaryify.github.io/NeteaseCloudMusicApi

### 技术栈

- Vue 全家桶 Vue-CLI3 create 出来的。
- ui 库用了魔改样式的 element-ui
- 歌词滚动部分用了黄轶老大的 better-scroll（贼爽）
- 主题换肤用的 css 变量替换。
- ES 6 / 7 （JavaScript 语言的下一代标准）
- Sass（CSS 预处理器）
- postcss-pxtorem（自动处理 rem，妈妈再也不用担心屏幕太大太小了）

### Screenshots

![首页](https://user-images.githubusercontent.com/23615778/62509203-da358580-b83c-11e9-97b3-367fb06a8347.png)

![歌单列表](https://user-images.githubusercontent.com/23615778/62509204-dace1c00-b83c-11e9-8d3f-0bcb93e3aab7.png)

![歌单详情](https://user-images.githubusercontent.com/23615778/62509201-d99cef00-b83c-11e9-8e4b-b122b8b94468.png)

![音乐播放](https://user-images.githubusercontent.com/23615778/62509202-da358580-b83c-11e9-98e1-530e5741ff56.png)

### 安装与使用

```
npm i
npm run dev
```
