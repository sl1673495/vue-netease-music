<template>
  <!-- 分享 -->
  <Icon
    :data-clipboard-text="shareUrl"
    :size="20"
    @click="onSharePromptClick"
    class="mode-item"
    ref="shareIcon"
    slot="reference"
    type="share"
  />
</template>

<script type="text/ecmascript-6">
import Clipboard from "clipboard"
import { confirm } from "@/base/confirm"

export default {
  props: ["shareUrl"],
  mounted() {
    this.initShareIcon()
  },
  methods: {
    initShareIcon() {
      new Clipboard(this.$refs.shareIcon.$el)
    },
    onSharePromptClick() {
      confirm("分享链接已经复制到剪贴板，快去和小伙伴一起听歌吧！")
    }
  }
}
</script>
