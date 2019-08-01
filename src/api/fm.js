import { request } from '@/utils/axios'

export const getFm = () => request.get('/personal_fm')