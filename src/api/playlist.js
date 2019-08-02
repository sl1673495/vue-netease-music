import { request, requestWithoutLoading } from '@/utils'

// 获取歌单
export const getPlaylists = (params) => request.get('/top/playlist', { params })
// 精品歌单
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })
// 获取相似歌单
export const getSimiPlaylists = (id, option) => requestWithoutLoading.get(`/simi/playlist?id=${id}`, option)