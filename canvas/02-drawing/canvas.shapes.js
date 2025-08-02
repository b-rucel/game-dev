const canvas = document.getElementById("shapes");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a fancy background gradient
const bgGradient = ctx.createRadialGradient(
  canvas.width / 2,
  canvas.height / 2,
  10,
  canvas.width / 2,
  canvas.height / 2,
  canvas.width / 1.5,
);
bgGradient.addColorStop(0, "#1a1c2c");
bgGradient.addColorStop(0.4, "#29153d");
bgGradient.addColorStop(1, "#1a1c2c");

// Fill background
ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add some ambient particles
for (let i = 0; i < 50; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 2;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
  ctx.fill();
}

// Configuration for shape placement
const startX = canvas.width * 0.15;
const startY = canvas.height * 0.3;
const gap = canvas.width * 0.2;

// Glowing Crystal Rectangle
ctx.save();
const rectGradient = ctx.createLinearGradient(
  startX,
  startY,
  startX + 120,
  startY + 120,
);
rectGradient.addColorStop(0, "#ff6b6b");
rectGradient.addColorStop(1, "#ee0979");

ctx.shadowColor = "#ff6b6b";
ctx.shadowBlur = 20;
ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.lineTo(startX + 120, startY + 20);
ctx.lineTo(startX + 100, startY + 120);
ctx.lineTo(startX - 20, startY + 100);
ctx.closePath();
ctx.fillStyle = rectGradient;
ctx.fill();
ctx.strokeStyle = "#fff";
ctx.lineWidth = 2;
ctx.stroke();
ctx.restore();

// Cosmic Circle with Rings
ctx.save();
const circleX = startX + gap;
const circleY = startY + 60;
const circleGradient = ctx.createRadialGradient(
  circleX,
  circleY,
  0,
  circleX,
  circleY,
  60,
);
circleGradient.addColorStop(0, "#4facfe");
circleGradient.addColorStop(1, "#00f2fe");

ctx.shadowColor = "#4facfe";
ctx.shadowBlur = 15;

// Draw rings
for (let i = 5; i > 0; i--) {
  ctx.beginPath();
  ctx.arc(circleX, circleY, 60 - i * 8, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${i * 0.15})`;
  ctx.lineWidth = 2;
  ctx.stroke();
}

ctx.beginPath();
ctx.arc(circleX, circleY, 40, 0, Math.PI * 2);
ctx.fillStyle = circleGradient;
ctx.fill();
ctx.restore();

// Prismatic Triangle
ctx.save();
const triangleX = startX + 2 * gap;
const triangleY = startY;
const triangleGradient = ctx.createLinearGradient(
  triangleX,
  triangleY,
  triangleX + 100,
  triangleY + 120,
);
triangleGradient.addColorStop(0, "#fa709a");
triangleGradient.addColorStop(1, "#fee140");

ctx.shadowColor = "#fa709a";
ctx.shadowBlur = 15;

ctx.beginPath();
ctx.moveTo(triangleX + 50, triangleY);
ctx.lineTo(triangleX + 100, triangleY + 120);
ctx.lineTo(triangleX, triangleY + 120);
ctx.closePath();

// Add inner glow effect
ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
ctx.lineWidth = 4;
ctx.stroke();

ctx.fillStyle = triangleGradient;
ctx.fill();
ctx.restore();

// Mystical Pentagon
ctx.save();
const pentX = startX + 3 * gap + 50;
const pentY = startY + 60;
const radius = 50;

const pentagonGradient = ctx.createRadialGradient(
  pentX,
  pentY,
  0,
  pentX,
  pentY,
  radius,
);
pentagonGradient.addColorStop(0, "#667eea");
pentagonGradient.addColorStop(1, "#764ba2");

ctx.shadowColor = "#667eea";
ctx.shadowBlur = 15;

ctx.beginPath();
for (let i = 0; i < 5; i++) {
  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
  const x = pentX + radius * Math.cos(angle);
  const y = pentY + radius * Math.sin(angle);
  if (i === 0) ctx.moveTo(x, y);
  else ctx.lineTo(x, y);
}
ctx.closePath();

// Create geometric pattern inside
for (let i = 0; i < 5; i++) {
  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
  const x = pentX + radius * 0.5 * Math.cos(angle);
  const y = pentY + radius * 0.5 * Math.sin(angle);
  ctx.moveTo(pentX, pentY);
  ctx.lineTo(x, y);
}

ctx.fillStyle = pentagonGradient;
ctx.fill();
ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
ctx.lineWidth = 2;
ctx.stroke();
ctx.restore();
