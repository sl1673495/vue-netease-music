<template>
  <div class="theme">
    <el-popover
      placement="top"
      width="160"
      v-model="visible"
    >
      <div class="themes">
        <div
          :key="index"
          class="theme-item"
          v-for="(themeValue, themeKey, index) in themeMap"
          @click="changeTheme(themeKey)"
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
import storage from 'good-storage'
import variables from '@/style/themes/variables'
import variablesWhite from '@/style/themes/variables-white'

const THEME_KEY = '__theme__'
export default {
  created() {
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
    this.changeTheme(storage.get(THEME_KEY, 'dark'))
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    changeTheme(themeKey) {
      storage.set(THEME_KEY, themeKey)
      const theme = this.themeMap[themeKey].file
      const themeStyleText = Object.keys(theme).reduce((total, currentKey) => {
        total += `${currentKey}: ${theme[currentKey]};`
        return total
      }, '')
      document.documentElement.style.cssText = themeStyleText;
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
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
