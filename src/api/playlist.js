import {request} from '@/utils/axios'

export const getPlaylists = (params) => request.get('/top/playlist', { params })