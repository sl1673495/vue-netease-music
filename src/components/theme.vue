<template>
  <div class="theme">
    <el-popover
      popper-class="popover-wrap"
      placement="top"
      width="160"
      v-model="visible"
    >
      <div class="themes">
        <div
          :key="index"
          class="theme-item"
          v-for="(themeValue, themeKey, index) in themeMap"
          @click="changeTheme(themeValue.file)"
        >
          <div
            :style="themeValue.style"
            class="theme-icon"
          ></div>
          <p>{{themeValue.title}}</p>
        </div>
      </div>
      <Icon
        slot="reference"
        type="skin"
      />
    </el-popover>

  </div>
</template>

<script type="text/ecmascript-6">
import variables from '@/style/themes/variables'
import variablesWhite from '@/style/themes/variables-white'

export default {
  created() {
    this.changeTheme(variables)
    this.themeMap = {
      'dark': {
        title: '深色',
        file: variables,
        style: {
          backgroundColor: '#202020',
        }
      },
      'white': {
        title: '浅色',
        file: variablesWhite,
        style: {
          backgroundColor: '#F6F6F6',
          border: '1px solid #EBEAEA'
        }
      },
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    changeTheme(theme) {
      Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(key, theme[key])
      })
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: var(--playlist-bgcolor) !important;
}
.popover-wrap {
  background: var(--playlist-bgcolor) !important;
  border: none !important;
  @include box-shadow;
}

.themes {
  @include flex-center();

  .theme-item {
    @include flex-center();
    flex-direction: column;
    margin: 0 8px;
    cursor: pointer;

    .theme-icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
}
</style>
