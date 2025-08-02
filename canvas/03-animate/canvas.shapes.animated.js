
// animated shapes
const canvas = document.getElementById("shapes");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation parameters
let time = 0;
let animationFrameId;

// Configuration for shape placement
const startX = canvas.width * 0.15;
const startY = canvas.height * 0.3;
const gap = canvas.width * 0.2;

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  // Add some animated particles
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = (Math.random() * canvas.height + time) % canvas.height;
    const radius = Math.random() * 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
    ctx.fill();
  }

  // Crystal Rectangle - Rotating and Scaling
  ctx.save();
  const rectScale = 1 + Math.sin(time * 0.002) * 0.1; // Pulsing scale
  const rectRotation = time * 0.001; // Rotation angle

  ctx.translate(startX + 60, startY + 60);
  ctx.rotate(rectRotation);
  ctx.scale(rectScale, rectScale);
  ctx.translate(-(startX + 60), -(startY + 60));

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

  // Cosmic Circle with Orbiting Rings
  ctx.save();
  const circleX = startX + gap;
  const circleY = startY + 60;
  const circleScale = 1 + Math.sin(time * 0.003) * 0.1;

  const circleGradient = ctx.createRadialGradient(
    circleX,
    circleY,
    0,
    circleX,
    circleY,
    60 * circleScale,
  );
  circleGradient.addColorStop(0, "#4facfe");
  circleGradient.addColorStop(1, "#00f2fe");

  ctx.shadowColor = "#4facfe";
  ctx.shadowBlur = 15;

  // Animated rings
  for (let i = 5; i > 0; i--) {
    ctx.beginPath();
    ctx.arc(
      circleX,
      circleY,
      (60 - i * 8) * circleScale,
      time * 0.002 + i,
      Math.PI * 2 + time * 0.002 + i,
    );
    ctx.strokeStyle = `rgba(255, 255, 255, ${i * 0.15})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(circleX, circleY, 40 * circleScale, 0, Math.PI * 2);
  ctx.fillStyle = circleGradient;
  ctx.fill();
  ctx.restore();

  // Prismatic Triangle - Floating Effect
  ctx.save();
  const triangleX = startX + 2 * gap;
  const triangleY = startY + Math.sin(time * 0.002) * 20; // Floating motion

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

  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = triangleGradient;
  ctx.fill();
  ctx.restore();

  // Mystical Pentagon - Spinning with Inner Pattern
  ctx.save();
  const pentX = startX + 3 * gap + 50;
  const pentY = startY + 60;
  const radius = 50;

  ctx.translate(pentX, pentY);
  ctx.rotate(time * 0.001);
  ctx.translate(-pentX, -pentY);

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

  // Main pentagon shape
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = pentX + radius * Math.cos(angle);
    const y = pentY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  // Animated inner pattern
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2 + time * 0.002;
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

  // Update animation
  time += 16; // Approximately 60 FPS
  animationFrameId = requestAnimationFrame(draw);
}

// Start animation
draw();

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Clean up animation when needed
function cleanup() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
}

