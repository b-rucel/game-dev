const canvas = document.getElementById("animate");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Circle class to hold properties
class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; // velocity x
    this.dy = dy; // velocity y
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

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
  }
}

// Create circles array
const circles = [];
const numCircles = 500;

for (let i = 0; i < numCircles; i++) {
  const radius = 30;
  const x = Math.random() * (canvas.width - 2 * radius) + radius;
  const y = Math.random() * (canvas.height - 2 * radius) + radius;
  const dx = (Math.random() - 0.5) * 4; // velocity between -2 and 2
  const dy = (Math.random() - 0.5) * 4;

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `rgb(${r}, ${g}, ${b})`;
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
