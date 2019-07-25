import storage from 'good-storage'
import { HISTORY_KEY } from '@/utils/config'

export default {
  // 当前播放歌曲
  currentSong: {},
  // 播放状态
  playing: false,
  // 播放列表显示
  isPlaylistShow: false,
  // 播放提示显示
  isPlaylistPromptShow: false,
  // 播放列表数据
  playlist: [],
  // 播放历史数据
  playHistory: storage.get(HISTORY_KEY, []),
}
