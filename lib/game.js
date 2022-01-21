import { goalieAA, gameResultAA } from './asciiArt.js'
import { selectDifficulty, selectShotAim } from './prompt.js'
import ansi from 'ansi-escape-sequences'
import { setTimeout } from 'timers/promises'

export default class Game {
  gameStatus = {
    0: 'pending',
    1: 'win',
    2: 'lose'
  }

  savePercentages = {
    easy: 25,
    normal: 40,
    hard: 55,
    extra: 75
  }

  shotResultSymbol = {
    goal: '◯',
    save: 'x'
  }

  difficulty
  gameSettledNum = 3
  nextStandbyAAIndex = 0
  result = this.gameStatus[0]
  selectedShotAim = null
  shotResults = []

  async play() {
    this.difficulty = await selectDifficulty()
    console.log('\nBest of five match!\n\nScore status :\n')
    while (this.result === this.gameStatus[0]) {
      await this.playPerShot()
    }
    console.log(gameResultAA[this.result])
  }

  async playPerShot() {
    this.selectedShotAim = null // reset value
    this.displayStandbyAA()
    this.selectedShotAim = await selectShotAim()
    const shotResult = this.shoot()
    this.recordShotResult(shotResult)
    await this.proceedNextShot(shotResult, this.selectedShotAim)
  }

  async displayStandbyAA() {
    console.log(goalieAA.standby[this.nextStandbyAAIndex % 4])
    this.nextStandbyAAIndex++
    await setTimeout(800) // 1コマ 800ms
    // selectShotAim() の完了まで再帰的に呼び出す
    if (this.selectedShotAim === null) {
      this.eraseStandbyAA()
      this.displayStandbyAA()
    }
  }

  eraseStandbyAA() {
    process.stdout.write(
      (ansi.cursor.previousLine(1) + ansi.erase.inLine(0)).repeat(10)
    )
  }

  recordShotResult(shotResult) {
    this.shotResults.push(this.shotResultSymbol[shotResult])
    if (this.isGameSettled()) {
      this.result =
        this.countGoalNum() === this.gameSettledNum
          ? this.gameStatus[1]
          : this.gameStatus[2]
    }
  }

  async proceedNextShot(shotResult, selectedShotAim) {
    console.log(
      (ansi.cursor.previousLine(1) + ansi.erase.inLine(0)).repeat(11) +
        goalieAA[shotResult][selectedShotAim]
    )
    // 1000ms ショット結果を表示
    const eraser = await setTimeout(
      1000,
      ansi.cursor.previousLine(17) +
        ansi.cursor.horizontalAbsolute(16) +
        ansi.erase.display(0)
    )
    console.log(`${eraser}${this.shotResults.join(' | ')}\n`)
  }

  shoot(savePercentage = this.savePercentages[this.difficulty]) {
    return savePercentage <= Math.floor(Math.random() * 100) ? 'goal' : 'save'
  }

  isGameSettled() {
    return (
      this.countGoalNum() === this.gameSettledNum ||
      this.countSaveNum() === this.gameSettledNum
    )
  }

  countGoalNum() {
    return this.shotResults.filter(
      (result) => result === this.shotResultSymbol.goal
    ).length
  }

  countSaveNum() {
    return this.shotResults.filter(
      (result) => result === this.shotResultSymbol.save
    ).length
  }
}
