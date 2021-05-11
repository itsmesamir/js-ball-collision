const canvas = document.querySelector('canvas');
canvas.width = innerWidth - 50;
canvas.height = innerHeight - 50;
const ctx = canvas.getContext('2d');

let balls;
// Ball class 
function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = 1;
    this.color = color;
    this.velocity = {
        x: calculateRandomValue(-0.2, 0.8) - 0.5,
        y: calculateRandomValue(-0.2, 0.8) - 0.5,
    }
    this.drawBall = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.ballMotion = function(balls) {
        this.drawBall();
        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (calculateDistance(this.x, this.y, balls[i].x, balls[i].y) - (this.radius + balls[i].radius) < 0) {
                collisionDetection(this, balls[i]);
                // console.log("collided.");
            }
        }
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
let calculateDistance = function(x1, y1, x2, y2) {
    let horDistance = x2 - x1;
    let vertDistance = y2 - y1;
    return Math.sqrt(Math.pow(horDistance, 2) + Math.pow(vertDistance, 2));
}
let calculateRandomValue = function(value1, value2) {
    return Math.floor(Math.random() * (value2 - value1 + 1) + value1);
}
let init = function() {
    balls = [];
    for (let ball = 0; ball < ballCount; ball++) {
        let radius = calculateRandomValue(minRadiusOfBall, maxRadiusOfBall);
        let x = calculateRandomValue(radius, canvas.width - radius);
        let y = calculateRandomValue(radius, canvas.height - radius);
        let color = `hsl(${Math.random ()*360}, 60%, 50%)`;
        if (ball !== 0) {
            for (let j = 0; j < balls.length; j++) {
                if (calculateDistance(x, y, balls[j].x, balls[j].y) - (radius + balls[j].radius) < 0) {
                    x = calculateRandomValue(radius, canvas.width - radius);
                    y = calculateRandomValue(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }
        balls.push(new Ball(x, y, radius, color));
    }
}
const animate = function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    balls.forEach(function(ball) {
        ball.ballMotion(balls);
    });
}

window.addEventListener('load', function() {
    init();
    animate();
});