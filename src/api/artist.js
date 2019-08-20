import { request } from '@/utils'

export const getArtists = id => request.get(`/artists?id=${id}`)
