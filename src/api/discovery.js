import { request } from '@/utils/axios'

export const getBanner = () => request.get('/banner?type=0')

export const getNewSongs = () => request.get('/personalized/newsong')