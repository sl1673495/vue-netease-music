import { request, requestWithoutLoading } from '@/utils/axios'

// 歌曲评论
export const getSongComment = (params, option) => requestWithoutLoading.get(`/comment/music`, { params, ...option })

// 热门评论
export const getHotComment = params => request.get(`/comment/hot`, { params })