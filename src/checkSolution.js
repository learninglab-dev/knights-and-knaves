export default function checkSolution(input, solution) {
  console.log(input)
  console.log(input.A)
  console.log(solution)
  const names = Object.keys(solution)
  for (const name of names) {
    if (solution[name] !== input[name]) {
      return false
    }
  }
  return true
}
