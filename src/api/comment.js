import { requestWithoutLoading } from '@/utils'

// 歌曲评论
export const getSongComment = params =>
  requestWithoutLoading.get(`/comment/music`, { params })
// 歌单评论
export const getPlaylistComment = params =>
  requestWithoutLoading.get(`/comment/playlist`, { params })
// 热门评论
export const getHotComment = params =>
  requestWithoutLoading.get(`/comment/hot`, { params })
// mv评论
export const getMvComment = params =>
  requestWithoutLoading.get('/comment/mv', { params })
