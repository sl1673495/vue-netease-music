/**
 * 业务工具方法
 */
import { getAlbum, getMvDetail } from "@/api"
import router from '@/router'
import { isDef, notify } from './common';

export function createSong(song) {
  const { id, name, img, artists, duration, albumId, albumName,mvId, ...rest } = song

  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(song.id),
    artistsText: genArtistisText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件中加上mv链接。
    mvId,
    ...rest
  }
}

export async function getSongImg(id, albumId) {
  if (!isDef(albumId)) {
    throw new Error('need albumId')
  }
  const { songs } = await getAlbum(albumId)
  const {
    al: { picUrl }
  } = songs.find(({ id: songId }) => songId === id) || {}
  return picUrl
}

export function genArtistisText(artists) {
  return (artists || []).map(({ name }) => name).join('/')
}

// 有时候虽然有mvId 但是请求却404 所以跳转前先请求一把
export async function goMvWithCheck(id) {
  try {
    await getMvDetail(id)
    goMv(id)
  } catch (error) {
    notify("mv获取失败")
  }
}

export function goMv(id) {
  router.push(`/mv/${id}`) 
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}