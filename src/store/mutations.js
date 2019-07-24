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
  setPlaylist(state, list) {
    state.playlist = list
    state.isPlaylistPromptShow = true
    setTimeout(() => {
      state.isPlaylistPromptShow = false
    }, 2000);
  },
}
