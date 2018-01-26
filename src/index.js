import life from './life'
const SCALE = 128
const SPEED = 512
const COUNT = 32
let scale = 0
let hue = 0

// let states = [[ '1,0', '3,1', '0,2', '1,2', '4,2', '5,2', '6,2' ]]
let state = [ '1,0', '3,1', '0,2', '1,2', '4,2', '5,2', '6,2' ]

const canvas = document.querySelector('canvas')
const fpsEl = document.querySelector('.fps')
const context = canvas.getContext('2d')

const resize = () => {
  canvas.width = parseInt(window.getComputedStyle(canvas).getPropertyValue('width'))
  canvas.height = parseInt(window.getComputedStyle(canvas).getPropertyValue('height'))
  scale = Math.min(canvas.width, canvas.height) / SCALE
}
window.addEventListener('resize', resize)
resize()

const worldToView = (x, y) => {
  return [canvas.width / 2 + x * scale, canvas.height / 2 + y * scale]
}

let lastCalledTime = new Date().getTime()
let counter = 0
let fpsArray = []
let average = 0

const draw = () => {
  const delta = (new Date().getTime() - lastCalledTime) / 1000
  const fps = Math.ceil((1 / delta))
  lastCalledTime = new Date().getTime()

  if (counter >= 60) {
    average = Math.ceil(fpsArray.reduce(function (a, b) { return a + b }) / fpsArray.length)
    counter = 0
  } else {
    if (fps !== Infinity) {
      fpsArray.push(fps)
    }
    counter++
  }

  context.clearRect(0, 0, canvas.width, canvas.height)

  // states.forEach((state, i) => {
  //   context.fillStyle = `hsla(${(hue + Math.round(i / COUNT * 720)) % 360}, 80%, 50%, ${(i / COUNT)})`
  for (let i = 0; i < state.length; i++) {
    const [x, y] = state[i].split(',').map(Number)
    context.fillRect(...worldToView(x, y), scale, scale)
  }
  // })

  window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

window.setInterval(() => {
  hue = (hue + 1) % 360
  // states = [...states, life(states[states.length - 1])].slice(states.length - COUNT, COUNT)
  state = life(state)
  fpsEl.textContent = `${average} fps (${state.length})`
}, 1000 / SPEED)
