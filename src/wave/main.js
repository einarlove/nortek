/* global Dashboard, noise, PVector */

const pixelRatio = window.devicePixelRatio || 1
const dashboard = new Dashboard()

// Setup canvas
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const updateCanvasDimensions = () => {
  canvas.width = window.innerWidth * pixelRatio
  canvas.height = window.innerHeight * pixelRatio
}

const mapRange = (value, in_min, in_max, out_min, out_max) => (
  (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
)

const mouse = {
  velocity: new PVector(),
  location: new PVector(),
  pressed: false,

  setup() {
    canvas.addEventListener('mousedown', () => mouse.pressed = true)
    canvas.addEventListener('mouseup', () => mouse.pressed = false)

    canvas.addEventListener('mousemove', ({ layerX, layerY}) => {
      const newLocation = new PVector(layerX, layerY).mult(pixelRatio)

      if (mouse.location) {
        mouse.velocity = PVector.sub(newLocation, mouse.location)
      }

      mouse.location = newLocation
    })
  }
}

function setup () {
  updateCanvasDimensions()
  window.addEventListener('resize', updateCanvasDimensions)
  mouse.setup()
}

const update = () => {
  noise.seed(Math.random())
}

const draw = () => {
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const size = 1
  const padding = size / 10

  for (let x = 0; x < canvas.width; x += size) {
    for (let y = 0; y < canvas.height; y += size) {

      // const value = noise.perlin2(x / 1600, y / 1600)
      const value = noise.simplex2(x / 3, y / 3)
      const color = Math.floor(mapRange(value, -1, 1, 0, 255))
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`
      ctx.fillRect(x, y, size, size)

      // ctx.save()
      // const length = size - (padding * 2)
      // const angle = mapRange(value, -1, 1, 0, Math.PI * 2)

      // ctx.translate(x + (size / 2), y + (size / 2))
      // ctx.rotate(angle)

      // ctx.strokeStyle = '#555'
      // ctx.lineWidth = 3
      // ctx.beginPath()
      // ctx.moveTo(-(length / 2) , 0)
      // ctx.lineTo(length / 2, 0)
      // ctx.stroke()

      // ctx.restore()
    }
  }
}


setup()
requestAnimationFrame(function loop() {
  update()
  draw()
  // requestAnimationFrame(loop)
})
