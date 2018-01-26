const NMAP = ['-1,-1', '-1,0', '-1,1', '0,-1', '0,0', '0,1', '1,-1', '1,0', '1,1']
const join = (a, b) => {
  const [aX, aY] = a.split(',').map(Number)
  const [bX, bY] = b.split(',').map(Number)
  return [aX + bX, aY + bY].join(',')
}

const life = (state) => {
  return state
    .reduce((cells, cell) => [...cells, ...NMAP.map(n => join(cell, n))], [])
    .reduce((next, cell, i, cells) => {
      if (cells.indexOf(cell) !== i) return next
      let count = 0
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue
          const [x, y] = cell.split(',').map(Number)
          if (state.indexOf(`${x + dx},${y + dy}`) > -1) {
            count++
          }
        }
      }
      // const countb = NMAP.reduce((a, n) => n !== ('0,0') && state.indexOf(join(cell, n)) > -1 ? a + 1 : a, 0)
      return count === 3 || count === 2 && state.indexOf(cell) > -1 ? [...next, cell] : next
    }, [])
}

export default life
