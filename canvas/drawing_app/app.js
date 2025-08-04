document.addEventListener("DOMContentLoaded", function () {
  console.log('DOMContentLoaded');







  // Handle window resize
  window.addEventListener("resize", () => {
    // Re-initialize canvas to match new display size
    // Note: This will clear the canvas
    // initCanvas();
    console.log('Window resized');
  });
});