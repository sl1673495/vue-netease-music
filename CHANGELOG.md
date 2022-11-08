# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.4.2](https://github.com/sl1673495/vue-netease-music/compare/v3.4.1...v3.4.2) (2022-11-08)


### Features

* change api source ([f701796](https://github.com/sl1673495/vue-netease-music/commit/f7017964d6b64577ddc8c1cee3e3931ce03e237a))


### Bug Fixes

* change API ([c0fa705](https://github.com/sl1673495/vue-netease-music/commit/c0fa7058899c8e3121a368fbda4c9c8281913f19))

### [3.4.1](https://github.com/sl1673495/vue-netease-music/compare/v3.4.0...v3.4.1) (2021-02-01)


### Bug Fixes

* 修复 mv 码率切换 ([9ea0271](https://github.com/sl1673495/vue-netease-music/commit/9ea0271116eac2db907a25790cdbd02d10ab5cc8))

## [3.4.0](https://github.com/sl1673495/vue-netease-music/compare/v3.3.0...v3.4.0) (2020-05-12)


### Bug Fixes

* http和https混合资源导致线上无法播放歌曲 ([361df32](https://github.com/sl1673495/vue-netease-music/commit/361df32))
* 去除请求http音乐资源 ([7a13ed4](https://github.com/sl1673495/vue-netease-music/commit/7a13ed4))
* 未播放歌曲请求封面导致undefined请求 ([60935fb](https://github.com/sl1673495/vue-netease-music/commit/60935fb))


### Features

* **servicework:** 增加 workbox-webpack-plugin 预加载异步路由 ([8567da6](https://github.com/sl1673495/vue-netease-music/commit/8567da6))

### [3.3.2](https://github.com/sl1673495/vue-netease-music/compare/v3.3.1...v3.3.2) (2020-03-03)


### Bug Fixes

* http和https混合资源导致线上无法播放歌曲 ([361df32](https://github.com/sl1673495/vue-netease-music/commit/361df32ddc702f254cfeecd11586dc6340808156))
* 去除请求http音乐资源 ([7a13ed4](https://github.com/sl1673495/vue-netease-music/commit/7a13ed4ae52d3fcbe8a4487068ad511502cd9385))

### [3.3.1](https://github.com/sl1673495/vue-netease-music/compare/v3.3.0...v3.3.1) (2020-03-03)


### Bug Fixes

* 未播放歌曲请求封面导致undefined请求 ([60935fb](https://github.com/sl1673495/vue-netease-music/commit/60935fb32465e3a7922d84f5d2019bab18919280))

## [3.3.0](https://github.com/sl1673495/vue-netease-music/compare/v3.2.30...v3.3.0) (2019-12-10)


### Features

* 加入图片懒加载 ([4043f87](https://github.com/sl1673495/vue-netease-music/commit/4043f87))

### [3.2.30](https://github.com/sl1673495/vue-netease-music/compare/v3.2.29...v3.2.30) (2019-12-09)


### Bug Fixes

* 表格页面在黑暗模式下快速滚动 会出现白色背景 ([12aa873](https://github.com/sl1673495/vue-netease-music/commit/12aa873))

### [3.2.29](https://github.com/sl1673495/vue-netease-music/compare/v3.2.28...v3.2.29) (2019-12-02)

### [3.2.28](https://github.com/sl1673495/vue-netease-music/compare/v3.2.27...v3.2.28) (2019-10-12)


### Bug Fixes

* 菜单栏歌单标题溢出时显示错误 ([f86bb5c](https://github.com/sl1673495/vue-netease-music/commit/f86bb5c))

### [3.2.27](https://github.com/sl1673495/vue-netease-music/compare/v3.2.26...v3.2.27) (2019-09-26)


### Bug Fixes

* debounce和throttle改为lodash-es引入 mv页面的route props选项中把id由string转为number ([e07f60e](https://github.com/sl1673495/vue-netease-music/commit/e07f60e))
* 登录接口取消代理 ([9ba4804](https://github.com/sl1673495/vue-netease-music/commit/9ba4804))

### [3.2.26](https://github.com/sl1673495/vue-netease-music/compare/v3.2.25...v3.2.26) (2019-09-09)


### Bug Fixes

* 修复了搜索页面的一些报错，增加了全局loading的vuex状态。 ([403bb23](https://github.com/sl1673495/vue-netease-music/commit/403bb23))

### [3.2.25](https://github.com/sl1673495/vue-netease-music/compare/v3.2.24...v3.2.25) (2019-09-05)


### Bug Fixes

* modal弹框标题显示错误 ([c224df1](https://github.com/sl1673495/vue-netease-music/commit/c224df1))

### [3.2.24](https://github.com/sl1673495/vue-netease-music/compare/v3.2.23...v3.2.24) (2019-09-04)


### Bug Fixes

* 使用代理池修复用户登录被禁用 ([71a7015](https://github.com/sl1673495/vue-netease-music/commit/71a7015))

### [3.2.23](https://github.com/sl1673495/vue-netease-music/compare/v3.2.22...v3.2.23) (2019-09-03)


### Bug Fixes

* 最新音乐点击播放歌曲顺序错误 ([b114f46](https://github.com/sl1673495/vue-netease-music/commit/b114f46))

### [3.2.22](https://github.com/sl1673495/vue-netease-music/compare/v3.2.21...v3.2.22) (2019-09-03)


### Bug Fixes

* 修复音乐卡片在窄屏幕上显示错误 ([8d65562](https://github.com/sl1673495/vue-netease-music/commit/8d65562))

### [3.2.21](https://github.com/sl1673495/vue-netease-music/compare/v3.2.20...v3.2.21) (2019-09-03)


### Bug Fixes

* 去除发现页多余的边距 ([c87f7e4](https://github.com/sl1673495/vue-netease-music/commit/c87f7e4))

### [3.2.20](https://github.com/sl1673495/vue-netease-music/compare/v3.2.19...v3.2.20) (2019-08-29)


### Bug Fixes

* 修复开发环境使用vue.min.js导致无法使用vue dev tools。 ([00366a5](https://github.com/sl1673495/vue-netease-music/commit/00366a5))

### [3.2.19](https://github.com/sl1673495/vue-netease-music/compare/v3.2.18...v3.2.19) (2019-08-27)


### Bug Fixes

* 解决了progress-bar组件rem计算不对。 ([bd931aa](https://github.com/sl1673495/vue-netease-music/commit/bd931aa))

### [3.2.18](https://github.com/sl1673495/vue-netease-music/compare/v3.2.17...v3.2.18) (2019-08-27)


### Bug Fixes

* 修复了toRem的计算方式，修复了左上角按钮图标不对齐的问题。 ([4800ec0](https://github.com/sl1673495/vue-netease-music/commit/4800ec0))

### [3.2.17](https://github.com/sl1673495/vue-netease-music/compare/v3.2.16...v3.2.17) (2019-08-26)


### Features

* 优化了axios loading和错误逻辑。 ([66fc425](https://github.com/sl1673495/vue-netease-music/commit/66fc425))

### [3.2.16](https://github.com/sl1673495/vue-netease-music/compare/v3.2.15...v3.2.16) (2019-08-26)


### Features

* 新增了dev命令 一键启动前后端，调整了播放器底部按钮的最小宽度。 ([53bcd41](https://github.com/sl1673495/vue-netease-music/commit/53bcd41))

### [3.2.15](https://github.com/sl1673495/vue-netease-music/compare/v3.2.14...v3.2.15) (2019-08-23)


### Bug Fixes

* banner图圆角还原mac客户端 ([6e695ad](https://github.com/sl1673495/vue-netease-music/commit/6e695ad))

### [3.2.14](https://github.com/sl1673495/vue-netease-music/compare/v3.2.13...v3.2.14) (2019-08-23)


### Features

* mv页面增加meta title的支持，mv播放器增加rem适配 ([190290c](https://github.com/sl1673495/vue-netease-music/commit/190290c))

### [3.2.13](https://github.com/sl1673495/vue-netease-music/compare/v3.2.12...v3.2.13) (2019-08-23)


### Bug Fixes

* banner图高度没有用rem单位 ([9af7829](https://github.com/sl1673495/vue-netease-music/commit/9af7829))

### [3.2.12](https://github.com/sl1673495/vue-netease-music/compare/v3.2.11...v3.2.12) (2019-08-23)


### Bug Fixes

* 修复红色主题下播放器背景色错误 ([169238c](https://github.com/sl1673495/vue-netease-music/commit/169238c))

### [3.2.11](https://github.com/sl1673495/vue-netease-music/compare/v3.2.10...v3.2.11) (2019-08-23)


### Bug Fixes

* 歌单创建时间未格式化 ([d5b3ec1](https://github.com/sl1673495/vue-netease-music/commit/d5b3ec1))

### [3.2.10](https://github.com/sl1673495/vue-netease-music/compare/v3.2.8...v3.2.10) (2019-08-23)


### Bug Fixes

* 修复搜索页缩小后布局问题 ([20d4679](https://github.com/sl1673495/vue-netease-music/commit/20d4679))
* 调整mv入口icon的大小，删除搜索页部分无用代码 ([7637814](https://github.com/sl1673495/vue-netease-music/commit/7637814))

### [3.2.9](https://github.com/sl1673495/vue-netease-music/compare/v3.2.8...v3.2.9) (2019-08-22)


### Bug Fixes

* 修复搜索页缩小后布局问题 ([20d4679](https://github.com/sl1673495/vue-netease-music/commit/20d4679))

### [3.2.8](https://github.com/sl1673495/vue-netease-music/compare/v3.2.7...v3.2.8) (2019-08-22)


### Bug Fixes

* 修复红色系皮肤导致input样式在别的地方错误 ([9649a8b](https://github.com/sl1673495/vue-netease-music/commit/9649a8b))

### [3.2.7](https://github.com/sl1673495/vue-netease-music/compare/v3.2.6...v3.2.7) (2019-08-22)


### Features

* 新增红色系皮肤，优化了布局，优化了tabs组件高亮逻辑 ([f6543b9](https://github.com/sl1673495/vue-netease-music/commit/f6543b9))

### [3.2.6](https://github.com/sl1673495/vue-netease-music/compare/v3.2.5...v3.2.6) (2019-08-22)


### Features

* 搜索页面优化成子路由模式 优化了tabs组件更加适应路由模式 ([32e28bd](https://github.com/sl1673495/vue-netease-music/commit/32e28bd))

### [3.2.5](https://github.com/sl1673495/vue-netease-music/compare/v3.2.4...v3.2.5) (2019-08-22)


### Features

* 搜索页面tab切换同步到路由 ([cb00327](https://github.com/sl1673495/vue-netease-music/commit/cb00327))

### [3.2.4](https://github.com/sl1673495/vue-netease-music/compare/v3.2.3...v3.2.4) (2019-08-22)


### Bug Fixes

* 首页推荐mv卡片间距 ([eaa264c](https://github.com/sl1673495/vue-netease-music/commit/eaa264c))


### Features

* 最新MV页面新增高级筛选功能 ([d05adb0](https://github.com/sl1673495/vue-netease-music/commit/d05adb0))

### [3.2.3](https://github.com/sl1673495/vue-netease-music/compare/v3.2.2...v3.2.3) (2019-08-21)


### Bug Fixes

* mv卡片默认的margin值导致推荐mv部分显示错误 ([be1222d](https://github.com/sl1673495/vue-netease-music/commit/be1222d))
* 去除了mv-card的默认padding值 ([a2959dc](https://github.com/sl1673495/vue-netease-music/commit/a2959dc))

### [3.2.2](https://github.com/sl1673495/vue-netease-music/compare/v3.2.1...v3.2.2) (2019-08-21)


### Bug Fixes

* mv卡片默认的margin值导致推荐mv部分显示错误 ([e8f2f3f](https://github.com/sl1673495/vue-netease-music/commit/e8f2f3f))

### [3.2.1](https://github.com/sl1673495/vue-netease-music/compare/v3.2.0...v3.2.1) (2019-08-21)


### Features

* 最新MV新增tab选择 ([b9afcb9](https://github.com/sl1673495/vue-netease-music/commit/b9afcb9))

## [3.2.0](https://github.com/sl1673495/vue-netease-music/compare/v3.1.2...v3.2.0) (2019-08-21)


### Features

* 搜索页新增mv和歌单搜索，新增最新MV页面 ([913b56d](https://github.com/sl1673495/vue-netease-music/commit/913b56d))

### [3.1.2](https://github.com/sl1673495/vue-netease-music/compare/v3.1.1...v3.1.2) (2019-08-21)


### Bug Fixes

* 分享功能提取公共组件，优化交互提示 ([f64f0e7](https://github.com/sl1673495/vue-netease-music/commit/f64f0e7))

### [3.1.1](https://github.com/sl1673495/vue-netease-music/compare/v3.1.0...v3.1.1) (2019-08-21)


### Features

* 底部播放栏新增歌曲分享入口 ([24d5645](https://github.com/sl1673495/vue-netease-music/commit/24d5645))

## [3.1.0](https://github.com/sl1673495/vue-netease-music/compare/v3.0.3...v3.1.0) (2019-08-21)


### Features

* 新增分享歌曲功能 ([4737597](https://github.com/sl1673495/vue-netease-music/commit/4737597))

### [3.0.3](https://github.com/sl1673495/vue-netease-music/compare/v3.0.0...v3.0.3) (2019-08-21)


### Bug Fixes

* 修复了pxToRem计算方式，修复progress-bar组件在窗口大小改变后大小错误。 ([c0503d8](https://github.com/sl1673495/vue-netease-music/commit/c0503d8))
* 切换config引入方式，否则打包后读取失败。 ([af40fd5](https://github.com/sl1673495/vue-netease-music/commit/af40fd5))


### Features

* 完善了一些mv入口。 ([2720e4c](https://github.com/sl1673495/vue-netease-music/commit/2720e4c))

### [3.0.2](https://github.com/sl1673495/vue-netease-music/compare/v3.0.1...v3.0.2) (2019-08-20)


### Features

* 完善了一些mv入口。 ([0673e21](https://github.com/sl1673495/vue-netease-music/commit/0673e21))

### [3.0.1](https://github.com/sl1673495/vue-netease-music/compare/v3.0.0...v3.0.1) (2019-08-20)


### Bug Fixes

* fix: 切换config引入方式，否则打包后读取失败。 ([00d9c2e](https://github.com/sl1673495/vue-netease-music/commit/00d9c2e))

## [3.0.0](https://github.com/sl1673495/vue-netease-music/compare/v2.4.16...v3.0.0) (2019-08-20)


### Features

* feat: 新增了mv播放页面。 ([8770216](https://github.com/sl1673495/vue-netease-music/commit/8770216))

### [2.4.16](https://github.com/sl1673495/vue-netease-music/compare/v2.4.15...v2.4.16) (2019-08-16)


### Features

* 加入empty组件 在评论为空的时候显示empty文案 ([f31bc3b](https://github.com/sl1673495/vue-netease-music/commit/f31bc3b))

### [2.4.15](https://github.com/sl1673495/vue-netease-music/compare/v2.4.14...v2.4.15) (2019-08-16)


### Features

* 加入百度统计代码 ([25c5b11](https://github.com/sl1673495/vue-netease-music/commit/25c5b11))

### [2.4.14](https://github.com/sl1673495/vue-netease-music/compare/v2.4.13...v2.4.14) (2019-08-16)


### Features

* 加入meta title，优化axios部分代码 ([2004b9c](https://github.com/sl1673495/vue-netease-music/commit/2004b9c))

### [2.4.13](https://github.com/sl1673495/vue-netease-music/compare/v2.4.12...v2.4.13) (2019-08-15)


### Bug Fixes

* 登录接口报错的时候未能正确提示 ([278145d](https://github.com/sl1673495/vue-netease-music/commit/278145d))

### [2.4.12](https://github.com/sl1673495/vue-netease-music/compare/v2.4.9...v2.4.12) (2019-08-14)


### Bug Fixes

* 优化了song-table组件的样式，搜索结果页面加入了歌曲序号的显示。 ([35fc42e](https://github.com/sl1673495/vue-netease-music/commit/35fc42e))
* 更换js库依赖的cdn源 ([d663c77](https://github.com/sl1673495/vue-netease-music/commit/d663c77))
* 评论组件的点赞样式和底部其他部分保持一致 ([2bbf063](https://github.com/sl1673495/vue-netease-music/commit/2bbf063))

### [2.4.11](https://github.com/sl1673495/vue-netease-music/compare/v2.4.10...v2.4.11) (2019-08-13)


### Bug Fixes

* 更换js库依赖的cdn源 ([884fdb7](https://github.com/sl1673495/vue-netease-music/commit/884fdb7))

### [2.4.10](https://github.com/sl1673495/vue-netease-music/compare/v2.4.9...v2.4.10) (2019-08-12)


### Bug Fixes

* 评论组件的点赞样式和底部其他部分保持一致 ([5f6d7b2](https://github.com/sl1673495/vue-netease-music/commit/5f6d7b2))

### [2.4.9](https://github.com/sl1673495/vue-netease-music/compare/v2.4.8...v2.4.9) (2019-08-09)


### Bug Fixes

* 歌单推荐分页后的滚动交互和其他分页保持一致 ([2e7c708](https://github.com/sl1673495/vue-netease-music/commit/2e7c708))

### [2.4.8](https://github.com/sl1673495/vue-netease-music/compare/v2.4.7...v2.4.8) (2019-08-09)


### Bug Fixes

* 修复：搜索详情关键字改变后未回到第一页 新增：评论页面点赞数量 ([26d69c9](https://github.com/sl1673495/vue-netease-music/commit/26d69c9))

### [2.4.7](https://github.com/sl1673495/vue-netease-music/compare/v2.4.6...v2.4.7) (2019-08-09)


### Bug Fixes

* 修复搜索详情页面歌曲描述未命中高亮词、优化部分没必要的base组件引用 ([f4983ad](https://github.com/sl1673495/vue-netease-music/commit/f4983ad))

### [2.4.6](https://github.com/sl1673495/vue-netease-music/compare/v2.4.5...v2.4.6) (2019-08-07)


### Bug Fixes

* cd页面换歌后评论区未恢复到第一页 ([7e06072](https://github.com/sl1673495/vue-netease-music/commit/7e06072))

### [2.4.5](https://github.com/sl1673495/vue-netease-music/compare/v2.4.4...v2.4.5) (2019-08-07)


### Bug Fixes

* 点击搜索历史记录不生效 ([4643e58](https://github.com/sl1673495/vue-netease-music/commit/4643e58))

### [2.4.4](https://github.com/sl1673495/vue-netease-music/compare/v2.4.3...v2.4.4) (2019-08-07)


### Bug Fixes

* 播放列表里的表格产生滚动条 ([196517d](https://github.com/sl1673495/vue-netease-music/commit/196517d))

### [2.4.3](https://github.com/sl1673495/vue-netease-music/compare/v2.4.2...v2.4.3) (2019-08-07)


### Bug Fixes

* 歌单详情搜索结果后改变id参数 重新获取歌单详情会显示错误 ([b3e6e06](https://github.com/sl1673495/vue-netease-music/commit/b3e6e06))

### [2.4.2](https://github.com/sl1673495/vue-netease-music/compare/v2.4.1...v2.4.2) (2019-08-07)


### Bug Fixes

* 修复dialog组件右上角按钮主题色 ([1e9f45f](https://github.com/sl1673495/vue-netease-music/commit/1e9f45f))

### [2.4.1](https://github.com/sl1673495/vue-netease-music/compare/v2.4.0...v2.4.1) (2019-08-07)


### Bug Fixes

* 优化了pagination组件，修复了一些体验问题 ([e0148b1](https://github.com/sl1673495/vue-netease-music/commit/e0148b1))

## [2.4.0](https://github.com/sl1673495/vue-netease-music/compare/v2.3.0...v2.4.0) (2019-08-07)


### Features

* 新增搜索详情页面，优化song-table组件 ([d7aaa0e](https://github.com/sl1673495/vue-netease-music/commit/d7aaa0e))

## [2.3.0](https://github.com/sl1673495/vue-netease-music/compare/v2.2.2...v2.3.0) (2019-08-06)


### Features

* 搜索结果详情功能初步完成 ([fb58af0](https://github.com/sl1673495/vue-netease-music/commit/fb58af0))

### [2.2.2](https://github.com/sl1673495/vue-netease-music/compare/v2.2.0...v2.2.2) (2019-08-06)


### Bug Fixes

* 增大cd页下滑的高度，修复未播放状态显示异常,优化图标大小 ([e8d2711](https://github.com/sl1673495/vue-netease-music/commit/e8d2711))


### Features

* 优化了间距、图标大小等细节。 ([77015f5](https://github.com/sl1673495/vue-netease-music/commit/77015f5))

### [2.2.1](https://github.com/sl1673495/vue-netease-music/compare/v2.2.0...v2.2.1) (2019-08-05)


### Bug Fixes

* 增大cd页下滑的高度，修复未播放状态显示异常,优化图标大小 ([e8d2711](https://github.com/sl1673495/vue-netease-music/commit/e8d2711))

## [2.2.0](https://github.com/sl1673495/vue-netease-music/compare/v2.1.7...v2.2.0) (2019-08-05)


### Features

* 新增播放模式切换功能 ([fea7da5](https://github.com/sl1673495/vue-netease-music/commit/fea7da5))

### [2.1.7](https://github.com/sl1673495/vue-netease-music/compare/v2.1.6...v2.1.7) (2019-08-05)


### Features

* 使用commitizen管理commit信息 ([9412cd5](https://github.com/sl1673495/vue-netease-music/commit/9412cd5))

### [2.1.6](https://github.com/sl1673495/vue-netease-music/compare/v2.1.5...v2.1.6) (2019-08-05)


### Bug Fixes

* 歌词解析逻辑不完善 ([12946fe](https://github.com/sl1673495/vue-netease-music/commit/12946fe))

### [2.1.5](https://github.com/sl1673495/vue-netease-music/compare/v2.1.4...v2.1.5) (2019-08-04)


### Features

* 增加音量本地存储功能，优化cd页面动画显示逻辑 ([f09a70c](https://github.com/sl1673495/vue-netease-music/commit/f09a70c))

### [2.1.4](https://github.com/sl1673495/vue-netease-music/compare/v2.1.3...v2.1.4) (2019-08-03)


### Features

* 优化READEME、更新进度 ([e0d89e4](https://github.com/sl1673495/vue-netease-music/commit/e0d89e4))

### [2.1.3](https://github.com/sl1673495/vue-netease-music/compare/v2.1.2...v2.1.3) (2019-08-02)


### Features

* 新增回退和前进功能、优化了icon组件的封装。 ([4302169](https://github.com/sl1673495/vue-netease-music/commit/4302169))

### [2.1.2](https://github.com/sl1673495/vue-netease-music/compare/v2.1.1...v2.1.2) (2019-08-02)


### Features

* 路由使用history模式 ([89d4c46](https://github.com/sl1673495/vue-netease-music/commit/89d4c46))

### [2.1.1](https://github.com/sl1673495/vue-netease-music/compare/v2.1.0...v2.1.1) (2019-08-02)


### Bug Fixes

* el-icon-loading颜色错误 ([1b8a33d](https://github.com/sl1673495/vue-netease-music/commit/1b8a33d))

## [2.1.0](https://github.com/sl1673495/vue-netease-music/compare/v2.0.2...v2.1.0) (2019-08-02)


### Features

* 优化了vue、vuex、vue-router依赖外置，去除element-ui打包的全量样式，改为按需。 ([9c05ab1](https://github.com/sl1673495/vue-netease-music/commit/9c05ab1))

### [2.0.2](https://github.com/sl1673495/vue-netease-music/compare/v2.0.1...v2.0.2) (2019-08-02)


### Bug Fixes

* 修复了歌词不显示的问题 ([ce57082](https://github.com/sl1673495/vue-netease-music/commit/ce57082))

### [2.0.1](https://github.com/sl1673495/vue-netease-music/compare/v2.0.0...v2.0.1) (2019-08-01)


### Bug Fixes

* 未播放歌曲拖动进度条 ([86910fc](https://github.com/sl1673495/vue-netease-music/commit/86910fc))

## [2.0.0](https://github.com/sl1673495/vue-netease-music/compare/v1.2.2...v2.0.0) (2019-08-01)


### Features

* 简易登录功能完成 侧边栏开放 ([0e17c7](https://github.com/sl1673495/vue-netease-music/commit/0e17c7))

### [1.2.2](https://github.com/sl1673495/vue-netease-music/compare/v1.2.1...v1.2.2) (2019-08-01)


### Bug Fixes

* notify持续时间 ([ffa96f3](https://github.com/sl1673495/vue-netease-music/commit/ffa96f3))

### [1.2.1](https://github.com/sl1673495/vue-netease-music/compare/v1.2.0...v1.2.1) (2019-08-01)


### Features

* 使用节流处理rem函数 播放页面resize时候refresh better-scroll容器 ([a4e123e](https://github.com/sl1673495/vue-netease-music/commit/a4e123e))

## [1.2.0](https://github.com/sl1673495/vue-netease-music/compare/v1.1.2...v1.2.0) (2019-07-31)

### Features

- 优化自动发布命令交互 ([fe4404c](https://github.com/sl1673495/vue-netease-music/commit/fe4404c))
- 播放页 cd 动画效果 ([75abc9e](https://github.com/sl1673495/vue-netease-music/commit/75abc9e))

### [1.1.2](https://github.com/sl1673495/vue-netease-music/compare/v1.1.1...v1.1.2) (2019-07-31)

### Bug Fixes

- 合并 babelrc 和 babel.config.js, 修复 standard-version 依赖缺失 ([4554ff8](https://github.com/sl1673495/vue-netease-music/commit/4554ff8))

### [1.1.1](https://github.com/sl1673495/vue-netease-music/compare/v1.1.0...v1.1.1) (2019-07-31)

### Bug Fixes

- 修复 eslint error ([2979e1f](https://github.com/sl1673495/vue-netease-music/commit/2979e1f))

## 1.1.0 (2019-07-31)

### Bug Fixes

- package.json 缺少依赖 ([d4500a8](https://github.com/sl1673495/vue-netease-music/commit/d4500a8))
- remove useless variables ([9d45886](https://github.com/sl1673495/vue-netease-music/commit/9d45886))
- request prefix ([c554603](https://github.com/sl1673495/vue-netease-music/commit/c554603))
- safari 下不能播放 ([f51842e](https://github.com/sl1673495/vue-netease-music/commit/f51842e))
- windows 下字体 ([8ebdd88](https://github.com/sl1673495/vue-netease-music/commit/8ebdd88))
- 优化播放失败逻辑 ([a4ebb18](https://github.com/sl1673495/vue-netease-music/commit/a4ebb18))
- 分页改变回滚逻辑出错 ([1f9d33e](https://github.com/sl1673495/vue-netease-music/commit/1f9d33e))
- 切换路由自动收起歌曲详情 ([169a89a](https://github.com/sl1673495/vue-netease-music/commit/169a89a))
- 去除 el-table 的默认动画过渡 ([05c6e36](https://github.com/sl1673495/vue-netease-music/commit/05c6e36))
- 夜间模式分页样式 ([26b58ee](https://github.com/sl1673495/vue-netease-music/commit/26b58ee))
- 搜索加入歌曲逻辑优化 ([282d721](https://github.com/sl1673495/vue-netease-music/commit/282d721))
- 搜索框热词不可点击 ([8b89d64](https://github.com/sl1673495/vue-netease-music/commit/8b89d64))
- 搜索歌曲点击播放 封面获取失败 ([211f23f](https://github.com/sl1673495/vue-netease-music/commit/211f23f))
- 歌单搜索框展示逻辑错误 ([646d614](https://github.com/sl1673495/vue-netease-music/commit/646d614))
- 歌曲从详情页 推荐歌单 icon 图标颜色 ([8a6762c](https://github.com/sl1673495/vue-netease-music/commit/8a6762c))
- 请求错误后的 loading 处理 ([fddff83](https://github.com/sl1673495/vue-netease-music/commit/fddff83))

### Features

- 全部歌单页面 ([f524c86](https://github.com/sl1673495/vue-netease-music/commit/f524c86))
- 最新歌曲页面 ([e0e2aaf](https://github.com/sl1673495/vue-netease-music/commit/e0e2aaf))
- 加入自动化发布流程 ([4f173cd](https://github.com/sl1673495/vue-netease-music/commit/4f173cd))
- 加入自动化部署脚本 ([0e1605f](https://github.com/sl1673495/vue-netease-music/commit/0e1605f))
- 布局完成 ([b5b802c](https://github.com/sl1673495/vue-netease-music/commit/b5b802c))
- 换肤功能 ([1e7b85f](https://github.com/sl1673495/vue-netease-music/commit/1e7b85f))
- 推荐歌单和最新音乐展示 ([56e8df3](https://github.com/sl1673495/vue-netease-music/commit/56e8df3))
- 搜索框功能 ([8f1cb23](https://github.com/sl1673495/vue-netease-music/commit/8f1cb23))
- 播放器初步完成 ([9938aaa](https://github.com/sl1673495/vue-netease-music/commit/9938aaa))
- 播放器进度条完成 ([e94a548](https://github.com/sl1673495/vue-netease-music/commit/e94a548))
- 播放器音量功能 ([55cb450](https://github.com/sl1673495/vue-netease-music/commit/55cb450))
- 新增 github 跳转 ([dfd16c0](https://github.com/sl1673495/vue-netease-music/commit/dfd16c0))
- 歌单详情页 前端搜索功能 ([d8daaf3](https://github.com/sl1673495/vue-netease-music/commit/d8daaf3))
- 歌单详情页评论列表 ([42f264d](https://github.com/sl1673495/vue-netease-music/commit/42f264d))
- 歌单详情页面 ([341cd3b](https://github.com/sl1673495/vue-netease-music/commit/341cd3b))
- 歌曲表格添加搜索高亮支持 ([73471f2](https://github.com/sl1673495/vue-netease-music/commit/73471f2))
- 歌曲表格添加搜索高亮支持 ([652d79f](https://github.com/sl1673495/vue-netease-music/commit/652d79f))
- 歌曲详情页完成 ([7980c44](https://github.com/sl1673495/vue-netease-music/commit/7980c44))
- 歌曲详情页相似推荐 ([a0e160a](https://github.com/sl1673495/vue-netease-music/commit/a0e160a))
- 歌词上下部分透明效果 ([6fea438](https://github.com/sl1673495/vue-netease-music/commit/6fea438))
- 添加 rem 支持 ([524462e](https://github.com/sl1673495/vue-netease-music/commit/524462e))
- 精品歌单功能 ([fa197b6](https://github.com/sl1673495/vue-netease-music/commit/fa197b6))
