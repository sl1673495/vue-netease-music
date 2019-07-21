import { request } from '@/utils/axios'

export const getListDetail = params =>
  request.get('/playlist/detail', { params })
