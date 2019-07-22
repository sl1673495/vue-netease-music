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
  setPlaylist(state, list) {
    state.playlist = list
  }
}
