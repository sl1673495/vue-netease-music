export default function lyricParser(lrc) {
  return {
    'lyric': parseLrc(lrc.lrc.lyric || ''),
    'tlyric': parseLrc(lrc.tlyric.lyric || ''),
    'lyricuser': lrc.lyricUser,
    'transuser': lrc.transUser,
  }
}

function parseLrc(lrc) {
  let _lrc = lrc.split('\n');
  let parsedLrc = [{
    time: 0,
    content: '',
  }];
  for (let i = 0; i < _lrc.length; i++) {
    let timeReg = /^\[([0-9][0-9])\:([0-9][0-9].*)](.*)$/i;
    let parsed = timeReg.exec(_lrc[i]);
    if (parsed == null) {
      continue;
    }
    let min = parseInt(parsed[1]);
    let sec = parseFloat(parsed[2]);

    parsedLrc.push({
      'time': sec + min * 60,
      'content': parsed[3],
    });
  }

  return parsedLrc;
}