import { getSongUrl } from "@/api"
import storage from 'good-storage'
import { PLAY_HISTORY_KEY, notify, getSongImg } from '@/utils'

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit, state, dispatch }, rawSong) {
    // 浅拷贝一份 改变引用
    // 1.不污染元数据
    // 2.单曲循环为了触发watch
    const song = Object.assign({}, rawSong)
    if (!song.img) {
      if (song.albumId) {
        song.img = await getSongImg(song.id, song.albumId)
      }
    }
    commit('setCurrentSong', song)
    commit('setPlayingState', true)
    // 历史记录
    const { playHistory } = state
    // 过滤旧的那一项
    const newPlayHistory = playHistory.filter(({ id }) => song.id !== id)
    newPlayHistory.unshift(song)
    commit('setPlayHistory', newPlayHistory)
    storage.set(PLAY_HISTORY_KEY, newPlayHistory)
    // 检查是否能播放
    const canPlay = await checkCanPlay(song.id)
    if (!canPlay) {
      notify(`${song.name}播放失败`)
      // 清空当前歌曲
      dispatch('clearCurrentSong')
    }
  },
  clearCurrentSong({ commit }) {
    commit('setCurrentSong', {})
    commit('setPlayingState', false)
    commit('setCurrentTime', 0)
  },
  clearPlaylist({ commit, dispatch }) {
    commit('setPlaylist', [])
    dispatch('clearCurrentSong')
  },
  clearHistory({ commit }) {
    const history = []
    commit('setPlayHistory', history)
    storage.set(PLAY_HISTORY_KEY, history)
  },
  addToPlaylist({ commit, state }, song) {
    const { playlist } = state
    const copy = playlist.slice()
    if (!copy.find(({ id }) => id === song.id)) {
      copy.unshift(song)
      commit('setPlaylist', copy)
    }
  }
}

async function checkCanPlay(id) {
  const { data } = await getSongUrl(id)
  const [resultSong] = data
  return !!resultSong.url
}
