import { Map, Range } from 'immutable'

const NMAP = Range(-1, 2).flatMap((x, i, r) => r.map(y => Map({x, y}))).toSet()
const ZERO = Map({x: 0, y: 0})
const join = (a, b) => Map({ x: a.get('x') + b.get('x'), y: a.get('y') + b.get('y') })

const life = (state) => {
  return state.flatMap(cell => NMAP.map(n => join(cell, n))).filter(cell => {
    const count = NMAP.filter(n => !n.equals(ZERO) && state.has(join(cell, n))).size
    return count === 3 || count === 2 && state.has(cell)
  })
}

export default life
