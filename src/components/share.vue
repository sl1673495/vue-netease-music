<template>
  <!-- 分享 -->
  <el-popover
    :content="shareText"
    @after-leave="onSharePromptHide"
    placement="top"
    trigger="hover"
    width="180"
  >
    <Icon
      :data-clipboard-text="shareUrl"
      :size="20"
      @click="onSharePromptClick"
      class="mode-item"
      ref="shareIcon"
      slot="reference"
      type="share"
    />
  </el-popover>
</template>

<script type="text/ecmascript-6">
import Clipboard from "clipboard"

const defaultShareText = "点击生成链接到剪贴板"
export default {
  props: ["shareUrl"],
  mounted() {
    this.initShareIcon()
  },
  data() {
    return {
      shareText: defaultShareText
    }
  },
  methods: {
    initShareIcon() {
      new Clipboard(this.$refs.shareIcon.$el)
    },
    onSharePromptClick() {
      this.shareText = "生成链接成功！"
    },
    onSharePromptHide() {
      this.shareText = defaultShareText
    }
  }
}
</script>
