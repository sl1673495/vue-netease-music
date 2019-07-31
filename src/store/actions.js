import { getSongUrl } from '@/api/song'
import storage from 'good-storage'
import { HISTORY_KEY } from '@/utils/config'

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit, state, dispatch }, song) {

    commit('setCurrentSong', {
      ...song,
      url: genSongPlayUrl(song.id)
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
    commit('setPlayingState', true)
    storage.set(HISTORY_KEY, playHistoryCopy)
    // 检查是否能播放
    const canPlay = await checkCanPlay(song.id)
    if (!canPlay) {
      alert('播放失败')
      dispatch('clearCurrentSong')
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
  },
  addToPlaylist({ commit, state }, song) {
    const { playlist } = state
    const copy = playlist.slice()
    if (!copy.find(({ id }) => id === song.id)) {
      copy.unshift(song)
      commit('setPlaylist', { data: copy })
    }
  }
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

async function checkCanPlay(id) {
  const { data } = await getSongUrl(id)
  const [resultSong] = data
  return !!resultSong.url
}
