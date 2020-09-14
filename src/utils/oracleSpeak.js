import { validateQ } from './validateQ'

export const oracleSpeak = (mb1, mb2, connective, nots) => {
  const validatedMb1 = validateQ(mb1)
  if (!validatedMb1) {
    return 'invalid'
  }
  const p = [mb1.predicate, mb1.names? mb1.names : mb1.number ? [mb1.quantifier, mb1.number] : [mb1.quantifier]]
  const negations = nots[1] ? nots[2] ? 'BOTH' : 'ONE' : nots[2] ? 'TWO' : 'NEITHER'
  if (!connective) {
    if (negations === 'ONE') {
      return {
        1: p,
        c: 'NOT'
      }
    }
    return p
  }
  const validatedMb2 = validateQ(mb2)
  if (!validatedMb2) {
    return 'invalid'
  }
  const q = [mb2.predicate, mb2.names? mb2.names : mb2.number ? [mb2.quantifier, mb2.number] : [mb2.quantifier]]
  switch (negations) {
  case 'NEITHER':
    return {
      1: p,
      2: q,
      c: connective
    }
  case 'BOTH':
    return {
      1: {
        1: p,
        c: 'NOT'
      },
      2: {
        1: q,
        c: 'NOT'
      },
      c: connective
    }
  case 'ONE':
    return {
      1: {
        1: p,
        c: 'NOT'
      },
      2: q,
      c: connective
    }
  case 'TWO':
    return {
      1: p,
      2: {
        1: q,
        c: 'NOT'
      },
      c: connective
    }
  default:
    return
  }
}
