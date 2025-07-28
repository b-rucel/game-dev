const canvas = document.getElementById("interactivity");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: 0,
  y: 0,
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// const colors = []
const colors = ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1","#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"]

// Circle class to hold properties
class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx / 2; // velocity x
    this.dy = dy / 2; // velocity y
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    // ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fill();
  }

  maxRadius = 80;
  minRadius = 5;

  update(canvas) {
    // Bounce off edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Update position
    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      // this.color = "red";
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
      // this.color = "rgb(255, 255, 255)";
    }
  }
}

// Create circles array
const circles = [];
const numCircles = 1000;

for (let i = 0; i < numCircles; i++) {
  const radius = 30;
  const x = Math.random() * (canvas.width - 2 * radius) + radius;
  const y = Math.random() * (canvas.height - 2 * radius) + radius;
  const dx = (Math.random() - 0.5) * 4; // velocity between -2 and 2
  const dy = (Math.random() - 0.5) * 4;

  const color = colors[Math.floor(Math.random() * colors.length)];
  circles.push(new Circle(x, y, radius, dx, dy, color));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let circle of circles) {
    circle.update(canvas);
    circle.draw(ctx);
  }

  requestAnimationFrame(animate);
}

animate();
