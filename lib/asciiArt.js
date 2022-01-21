import { readFileSync } from 'fs'

export const goalieAA = {
  standby: {
    0: fetchAsciiArt('./ascii-art/standby/standby1.txt'),
    1: fetchAsciiArt('./ascii-art/standby/standby2.txt'),
    2: fetchAsciiArt('./ascii-art/standby/standby3.txt'),
    3: fetchAsciiArt('./ascii-art/standby/standby4.txt')
  },
  goal: {
    1: fetchAsciiArt('./ascii-art/goal/goal1.txt'),
    2: fetchAsciiArt('./ascii-art/goal/goal2.txt'),
    3: fetchAsciiArt('./ascii-art/goal/goal3.txt'),
    4: fetchAsciiArt('./ascii-art/goal/goal4.txt')
  },
  save: {
    1: fetchAsciiArt('./ascii-art/save/save1.txt'),
    2: fetchAsciiArt('./ascii-art/save/save2.txt'),
    3: fetchAsciiArt('./ascii-art/save/save3.txt'),
    4: fetchAsciiArt('./ascii-art/save/save4.txt')
  }
}

export const gameResultAA = {
  win: fetchAsciiArt('./ascii-art/result/win.txt'),
  lose: fetchAsciiArt('./ascii-art/result/lose.txt')
}

function fetchAsciiArt(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), 'utf-8')
}
