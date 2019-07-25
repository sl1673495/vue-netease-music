export default {
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setPlayingState(state, playing) {
    state.playing = playing
  },
  setPlaylistShow(state, show) {
    state.isPlaylistShow = show
  },
  setPlaylistPromptShow(state, show) {
    state.isPlaylistPromptShow = show
  },
  setPlaylist(state, payload) {
    const {data, showPrompt = true} = payload
    state.playlist = data
    // 弹出提示
    if (showPrompt) {
      state.isPlaylistPromptShow = true
      setTimeout(() => {
        state.isPlaylistPromptShow = false
      }, 2000);
    }
  },
  setPlayHistory(state, history) {
    state.playHistory = history
  }
}
