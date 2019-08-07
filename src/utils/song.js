import { getAlbum } from '@/api/album'
import { isDef } from './common';

export function createSong(song) {
  const { id, name, img, artists, duration, albumId, albumName, ...rest } = song

  return {
    id,
    name,
    img,
    artists,
    duration,
    // 专辑
    albumId,
    albumName,
    url: genSongPlayUrl(song.id),
    artistsText: genArtistisText(artists),
    durationSecond: duration / 1000,
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

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}