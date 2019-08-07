import { request } from "@/utils";

export const getSearchHot = () => request.get('/search/hot')

export const getSearchSuggest = (keywords) => request.get('/search/suggest', { params: { keywords } })

export const getSearch = (params) => request.get(`/search`, { params })