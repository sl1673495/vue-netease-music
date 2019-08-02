import { request } from '@/utils'

export const getAlbum = id => request.get(`/album?id=${id}`)