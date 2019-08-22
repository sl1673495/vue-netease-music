<template>
  <div class="theme">
    <el-popover
      placement="top"
      v-model="visible"
      width="230"
    >
      <div class="themes">
        <div
          :key="index"
          @click="changeTheme(themeKey)"
          class="theme-item"
          v-for="(themeValue, themeKey, index) in themeMap"
        >
          <div
            :style="themeValue.style"
            class="theme-icon"
          ></div>
          <p>{{themeValue.title}}</p>
        </div>
      </div>
      <Icon
        :backdrop="true"
        slot="reference"
        type="skin"
      />
    </el-popover>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from "good-storage"
import variables from "@/style/themes/variables"
import variablesWhite from "@/style/themes/variables-white"
import variablesRed from "@/style/themes/variables-red"

const THEME_KEY = "__theme__"
const themes = {
  white: "white",
  dark: "dark",
  red: "red"
}
export default {
  created() {
    this.themeMap = {
      [themes.dark]: {
        title: "深色",
        file: variables,
        style: {
          backgroundColor: "#202020"
        }
      },
      [themes.white]: {
        title: "浅色",
        file: variablesWhite,
        style: {
          backgroundColor: "#F6F6F6",
          border: "1px solid #EBEAEA"
        }
      },
      [themes.red]: {
        title: "红色",
        file: variablesRed,
        style: {
          backgroundColor: "#D33A31"
        }
      }
    }
    // 默认浅色
    this.changeTheme(storage.get(THEME_KEY, themes.white))
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
      Object.keys(theme).forEach(key => {
        const value = theme[key]
        document.documentElement.style.setProperty(key, value)
      })
    }
  },
  components: {}
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
