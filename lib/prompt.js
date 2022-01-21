import Enquirer from 'enquirer'
const { Select } = Enquirer

export async function selectDifficulty() {
  const prompt = new Select({
    name: 'difficulty',
    message: 'Select your difficulty',
    choices: ['Easy', 'Normal', 'Hard', 'Extra']
  })
  const answer = await prompt.run()
  return answer.toLowerCase()
}

export async function selectShotAim() {
  const prompt = new Select({
    name: 'shotAim',
    message: `Where to shoot?`,
    choices: ['【 1 】', '【 2 】', '【 3 】', '【 4 】']
  })
  const answer = await prompt.run()
  return answer.match(/[1-4]/)[0]
}
