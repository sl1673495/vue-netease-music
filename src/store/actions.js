import {getSongUrl} from '@/api/song'

export default {
  async getCurrentSong({commit}, song) {
    const {data} = await getSongUrl(song.id)
    const [resultSong] = data
    commit('setCurrentSong', {
      ...song,
      url: resultSong.url
    })
    commit('setPlayingState', true)
  }
}