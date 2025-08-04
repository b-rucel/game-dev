
document.addEventListener("DOMContentLoaded", function () {
  // Get canvas and context
  const canvas = document.getElementById("drawing");
  const ctx = canvas.getContext("2d");

  // Get UI elements
  const colorPicker = document.getElementById("colorPicker");
  const brushSizeSlider = document.getElementById("brushSize");
  const brushSizeValue = document.getElementById("brushSizeValue");
  const clearButton = document.getElementById("clearCanvas");
  const fullScreenButton = document.getElementById("fullScreen");
  const themeToggleButton = document.getElementById("themeToggle");

  // Drawing state
  let isDrawing = false;
  let currentColor = colorPicker.value;
  let currentBrushSize = parseFloat(brushSizeSlider.value);

  // Initialize canvas
  function initCanvas() {
    // Get the display size of the canvas
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // Set the internal canvas resolution to match display size
    // This prevents coordinate mapping issues
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    // Set up drawi""ng ""context
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  // Update slider appearance and value display
  function updateSlider() {
    const value = parseFloat(brushSizeSlider.value);
    const min = parseFloat(brushSizeSlider.min);
    const max = parseFloat(brushSizeSlider.max);
    const percentage = ((value - min) / (max - min)) * 100;

    // Update the slider background gradient
    brushSizeSlider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;

    // Update the value display with proper decimal formatting
    brushSizeValue.textContent =
      value % 1 === 0 ? value.toString() : value.toFixed(1);
    currentBrushSize = value;
  }

  // Helper function to get accurate coordinates
  function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  // Drawing functions
  function startDrawing(e) {
    isDrawing = true;
    const coords = getCanvasCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  }

  function draw(e) {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentBrushSize;
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
  }

  // Clear canvas function
  function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Toggle fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Toggle theme
  function toggleTheme() {
    const body = document.body;
    const isDark =
      body.style.backgroundColor === "var(--bg-color-dark)" ||
      body.classList.contains("dark-theme");

    if (isDark) {
      body.style.backgroundColor = "var(--bg-color-light)";
      body.style.color = "var(--text-color-light)";
      body.classList.remove("dark-theme");
    } else {
      body.style.backgroundColor = "var(--bg-color-dark)";
      body.style.color = "var(--text-color-dark)";
      body.classList.add("dark-theme");
    }
  }

  // Event listeners

  // Canvas drawing events
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Touch events for mobile
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const touchEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    };
    startDrawing(touchEvent);
  });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const touchEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    };
    draw(touchEvent);
  });

  canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    stopDrawing();
  });

  // Tool events
  colorPicker.addEventListener("change", (e) => {
    currentColor = e.target.value;
  });

  brushSizeSlider.addEventListener("input", updateSlider);
  brushSizeSlider.addEventListener("change", updateSlider);

  // Button events
  clearButton.addEventListener("click", clearCanvas);
  fullScreenButton.addEventListener("click", toggleFullscreen);
  themeToggleButton.addEventListener("click", toggleTheme);

  // Initialize
  // initCanvas();
  updateSlider();

  // Handle window resize
  window.addEventListener("resize", () => {
    // Re-initialize canvas to match new display size
    // Note: This will clear the canvas
    initCanvas();
  });
});
