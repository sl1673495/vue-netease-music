import { request } from "@/utils/axios";

export const getSearchHot = () => request.get('/search/hot')

export const getSearchSuggest = (keywords) => request.get('/search/suggest', {params: { keywords } })
