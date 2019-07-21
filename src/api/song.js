import { request } from '@/utils/axios'

// 获取音乐url
export const getSongUrl = id => request.get(`/song/url?id=${id}`)

// 获取音乐详情
export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)
