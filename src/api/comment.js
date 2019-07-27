import { request } from '@/utils/axios'

// 歌曲评论
export const getSongComment = params => request.get(`/comment/music`, { params })

// 热门评论
export const getHotComment = params => request.get(`/comment/hot`, { params })