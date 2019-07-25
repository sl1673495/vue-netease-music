import { getSongUrl } from '@/api/song'
import storage from 'good-storage'
import { HISTORY_KEY } from '@/utils/config'

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit, state }, song) {
    const { data } = await getSongUrl(song.id)
    const [resultSong] = data
    const canPlay = !!resultSong.url
    if (canPlay) {
      commit('setCurrentSong', {
        ...song,
        url: resultSong.url
      })

      // 历史记录
      const { playHistory } = state
      const playHistoryCopy = playHistory.slice()
      const findedIndex = playHistoryCopy.findIndex(({ id }) => song.id === id)
      if (findedIndex !== -1) {
        // 删除旧那一项, 插入到最前面
        playHistoryCopy.splice(findedIndex, 1)
      }
      playHistoryCopy.unshift(song)
      commit('setPlayHistory', playHistoryCopy)
      storage.set(HISTORY_KEY, playHistoryCopy)
    } else {
      alert('暂时无法播放')
    }
  },
  clearCurrentSong({ commit }) {
    commit('setCurrentSong', {})
    commit('setPlayingState', false)
  },
  clearHistory({ commit }) {
    const history = []
    commit('setPlayHistory', history)
    storage.set(HISTORY_KEY, history)
  }
}
