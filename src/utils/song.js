export function createSong(song) {
  const {
    id,
    name,
    img,
    artists,
    duration
  } = song

  return {
    id,
    name,
    img,
    artists,
    artistsText: genArtistis(artists),
    duration,
    durationSecond: duration / 1000,
  }
}

export function genArtistis(artists) {
  return (artists || []).map(({ name }) => name).join("/");
}