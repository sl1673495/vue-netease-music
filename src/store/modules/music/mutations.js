import { shallowEqual } from '@/utils'
export default {
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setCurrentTime(state, time) {
    state.currentTime = time
  },
  setPlayingState(state, playing) {
    state.playing = playing
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  setPlaylistShow(state, show) {
    state.isPlaylistShow = show
  },
  setPlayerShow(state, show) {
    state.isPlayerShow = show
  },
  setPlaylistPromptShow(state, show) {
    state.isPlaylistPromptShow = show
  },
  setPlaylist(state, playlist) {
    const { isPlaylistShow, playlist: oldPlaylist } = state
    state.playlist = playlist
    // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
    if (!isPlaylistShow && !shallowEqual(oldPlaylist, playlist, 'id')) {
      state.isPlaylistPromptShow = true
      setTimeout(() => {
        state.isPlaylistPromptShow = false
      }, 2000)
    }
  },
  setPlayHistory(state, history) {
    state.playHistory = history
  },
  setMenuShow(state, show) {
    state.isMenuShow = show
  },
}
