export default function chooseRoles(names) {
  const rolesList = ['K', 'N', 'D', 'M']
  const initialAssignment = Object.fromEntries(Object.values(names).map(name => [name, rolesList[Math.floor(Math.random() * 4)]]))
  let numMonks = 0
  Object.values(initialAssignment).forEach(role => {
    if (role === 'M') {
      numMonks++
    }
  })
  if (numMonks >= names.length/2) {
    return chooseRoles(names)
  }
  return initialAssignment
}
