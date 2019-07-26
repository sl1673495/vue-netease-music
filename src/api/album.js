import { request } from '@/utils/axios'

export const getAlbum = id => request.get(`/album?id=${id}`)