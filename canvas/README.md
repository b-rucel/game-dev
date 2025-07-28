
# collection of code for canvas

## 01-basics

basic usage example

creating canvas element from dom element
context of 2d
set background color
draw simple shapes
add text


## 02-drawing

drawing gorilla

creates a canvas element and gets 2d context

sets up canvas transformations with translate and scale for positioning
draws the gorilla's body as a filled path with multiple line segments
adds left and right legs as separate filled paths
renders arms using quadratic curves with thick strokes
creates facial mask with filled arcs for the face and muzzle areas
draws eyes, nostrils, and mouth using arcs, lines, and quadratic curves


## 03-animate

animating bouncing circles

creates a full-window canvas element
implements Circle class with position, velocity, radius and color properties 
handles circle drawing and position updates with boundary collision detection
animate function clears canvas, updates and redraws all circles each frame
uses requestAnimationFrame for smooth animation of 500 bouncing circles

## 04-interactivity

interactive circle growth based on mouse proximity

creates a full-window canvas element
extends Circle class with maxRadius (80) and minRadius (5) properties
tracks mouse position and calculates distance to each circle
circles grow when mouse is within 50 pixels of their position
circles shrink back to original size when mouse moves away
uses slower velocities (half speed) compared to animate version
features 1000 circles with colorful palette from predefined array


