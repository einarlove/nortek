'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global Dashboard, PVector */

var pixelRatio = window.devicePixelRatio || 1;
var dashboard = new Dashboard();

// Setup canvas
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var updateCanvasDimensions = function updateCanvasDimensions() {
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
};

var Ball = function () {
  function Ball(radius) {
    _classCallCheck(this, Ball);

    this.velocity = new PVector();
    this.acceleration = new PVector();
    this.location = new PVector();

    this.location.set(canvas.width / 2, canvas.height / 2);

    this.radius = radius;
    this.mass = Math.PI * this.radius * this.radius;
  }

  _createClass(Ball, [{
    key: 'update',
    value: function update() {
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.set(0, 0);
    }
  }, {
    key: 'applyForce',
    value: function applyForce(force) {
      this.acceleration.add(PVector.div(force, this.mass));
    }
  }, {
    key: 'draw',
    value: function draw() {
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }]);

  return Ball;
}();

var mouse = void 0,
    ball = void 0,
    gravity = void 0,
    wind = void 0,
    wallFriction = void 0;
var balls = [];

function setup() {
  updateCanvasDimensions();

  gravity = new PVector(0, 50);
  wind = new PVector(4, 0);
  wallFriction = new PVector(1.2, 1.2);
  balls.push(new Ball(20), new Ball(40), new Ball(5), new Ball(100));

  mouse = {
    velocity: new PVector(),
    location: new PVector(),
    pressed: false
  };

  canvas.addEventListener('mousedown', function () {
    return mouse.pressed = true;
  });
  canvas.addEventListener('mouseup', function () {
    return mouse.pressed = false;
  });

  canvas.addEventListener('mousemove', function (_ref) {
    var layerX = _ref.layerX,
        layerY = _ref.layerY;

    var newLocation = new PVector(layerX, layerY).mult(pixelRatio);

    if (mouse.location) {
      mouse.velocity = PVector.sub(newLocation, mouse.location);
    }

    mouse.location = newLocation;
  });

  window.addEventListener('resize', updateCanvasDimensions);
}

var update = function update() {
  balls.forEach(function (ball) {
    ball.applyForce(gravity);

    if (mouse.pressed) {
      ball.applyForce(wind);
    }

    ball.update();

    if (ball.location.x - ball.radius <= 0) {
      ball.location.x = ball.radius;
      ball.velocity.x *= -1;
    }

    if (ball.location.x + ball.radius >= canvas.width) {
      ball.location.x = canvas.width - ball.radius;
      ball.velocity.x *= -1;
    }

    if (ball.location.y - ball.radius <= 0) {
      ball.location.y = ball.radius;
      ball.velocity.y *= -1;
    }

    if (ball.location.y + ball.radius >= canvas.height) {
      ball.location.y = canvas.height - ball.radius;
      ball.velocity.y *= -1;
    }
  });
};

var draw = function draw() {
  ctx.fillStyle = '#EEE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  balls.forEach(function (ball) {
    return ball.draw();
  });
};

setup();
requestAnimationFrame(function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
});