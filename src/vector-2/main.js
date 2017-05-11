/* global Dashboard, PVector */

const pixelRatio = window.devicePixelRatio || 1
const dashboard = new Dashboard()

// Setup canvas
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const updateCanvasDimensions = () => {
  canvas.width = window.innerWidth * pixelRatio
  canvas.height = window.innerHeight * pixelRatio
}

class Ball {
  velocity = new PVector()
  acceleration = new PVector()
  location = new PVector()

  constructor(radius) {
    this.location.set(canvas.width / 2, canvas.height / 2)

    this.radius = radius
    this.mass = Math.PI * this.radius * this.radius
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.set(0, 0)
  }

  applyForce(force) {
    this.acceleration.add(PVector.div(force, this.mass))
  }

  draw() {
    ctx.fillStyle = '#333'
    ctx.beginPath()
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

let mouse, ball, gravity, wind, wallFriction
const balls = []

function setup () {
  updateCanvasDimensions()

  gravity = new PVector(0, 50)
  wind = new PVector(4, 0)
  wallFriction = new PVector(1.2, 1.2)
  balls.push(new Ball(20), new Ball(40), new Ball(5), new Ball(100))

  mouse = {
    velocity: new PVector(),
    location: new PVector(),
    pressed: false,
  }

  canvas.addEventListener('mousedown', () => mouse.pressed = true)
  canvas.addEventListener('mouseup', () => mouse.pressed = false)

  canvas.addEventListener('mousemove', ({ layerX, layerY}) => {
    const newLocation = new PVector(layerX, layerY).mult(pixelRatio)

    if (mouse.location) {
      mouse.velocity = PVector.sub(newLocation, mouse.location)
    }

    mouse.location = newLocation
  })

  window.addEventListener('resize', updateCanvasDimensions)
}

const update = () => {
  balls.forEach(ball => {
    ball.applyForce(gravity)

    if (mouse.pressed) {
      ball.applyForce(wind)
    }

    ball.update()

    if (ball.location.x - ball.radius <= 0) {
      ball.location.x = ball.radius
      ball.velocity.x *= -1
    }

    if (ball.location.x + ball.radius >= canvas.width) {
      ball.location.x = canvas.width - ball.radius
      ball.velocity.x *= -1
    }

    if (ball.location.y - ball.radius <= 0) {
      ball.location.y = ball.radius
      ball.velocity.y *= -1
    }

    if (ball.location.y + ball.radius >= canvas.height) {
      ball.location.y = canvas.height - ball.radius
      ball.velocity.y *= -1
    }
  })


}

const draw = () => {
  ctx.fillStyle = '#EEE'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  balls.forEach(ball => ball.draw())
}


setup()
requestAnimationFrame(function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
})
