import { request } from '@/utils'

export const getListDetail = params =>
  request.get('/playlist/detail', { params })
