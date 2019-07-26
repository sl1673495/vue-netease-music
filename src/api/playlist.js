import { request } from '@/utils/axios'

// 获取歌单
export const getPlaylists = (params) => request.get('/top/playlist', { params })
// 精品歌单
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })