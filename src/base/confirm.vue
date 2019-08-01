<template>
  <el-dialog
    :visible.sync="visible"
    :width="$utils.toRem(320)"
    :modal="false"
  >
    <div slot="title">
      提示
    </div>
    <div class="login-body">
      {{text}}
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="confirmAndClose"
        class="confirm-btn"
      >确认
      </el-button>
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
const Confirm = {
  name: 'Confirm',
  props: ['visible', 'text', 'onConfirm'],
  methods: {
    confirmAndClose() {
      this.onConfirm()
      this.visible = false
    }
  }
}

export default Confirm

// 命令式调用
export const confim = function (text, onConfirm = () => { }) {
  const ConfirmCtor = Vue.extend(Confirm)

  // 单例减少开销
  let instanceCache
  const getInstance = () => {
    if (!instanceCache) {
      instanceCache = new ConfirmCtor({
        propsData: {
          text,
          onConfirm,
        }
      })
      // 生成dom
      instanceCache.$mount()
      document.body.appendChild(instanceCache.$el)
    } else {
      // 更新属性
      instanceCache.text = text
      instanceCache.onConfirm = onConfirm
    }
    return instanceCache
  }
  const instance = getInstance()
  // 确保更新的prop渲染到dom
  // 确保动画效果
  Vue.nextTick(() => {
    instance.visible = true
  })
}
</script>

<style lang="scss" scoped>
.confirm-btn {
  width: 100%;
}
</style>
