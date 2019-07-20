import { getSongUrl } from '@/api/song'

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit }, song) {
    const { data } = await getSongUrl(song.id)
    const [resultSong] = data
    commit('setCurrentSong', {
      ...song,
      url: resultSong.url
    })
    commit('setPlayingState', true)
  }
}