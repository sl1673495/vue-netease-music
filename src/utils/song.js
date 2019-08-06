import { getAlbum } from '@/api/album'

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

export async function createSongWithImg(song) {
  const basicSong = createSong(song)
  const { id, albumId } = song
  const { songs } = await getAlbum(albumId)
  const {
    al: { picUrl }
  } = songs.find(({ id: songId }) => songId === id) || {}
  return {
    ...basicSong,
    img: picUrl
  }
}

export function genArtistisText(artists) {
  return (artists || []).map(({ name }) => name).join('/')
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}