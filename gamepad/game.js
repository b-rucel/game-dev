;(function () {
  console.log('IIFE JS Loaded!')


  // const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .01, 20 );
  // camera.position.z = 1;

  // const scene = new THREE.Scene();
  // const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  // const material = new THREE.MeshNormalMaterial();

  // const mesh = new THREE.Mesh( geometry, material );
  // scene.add( mesh );

  // const canvas = document.getElementById('gameCanvas');
  // const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  
  // function animate() {
  //   requestAnimationFrame( animate );
  //   mesh.rotation.x += .01;
  //   mesh.rotation.y += .02;
  //   renderer.render( scene, camera );
  // }
  // animate();






  let loopStarted = false;

  window.addEventListener("gamepadconnected", (evt) => {
    addGamepad(evt.gamepad);
  });
  window.addEventListener("gamepaddisconnected", (evt) => {
    removeGamepad(evt.gamepad);
  });

  function addGamepad(gamepad) {
    console.log('------ addGamepad');

    // main container div for the gamepad UI
    const d = document.createElement("div");
    d.setAttribute("id", `controller${gamepad.index}`);

    // title element showing gamepad ID
    const t = document.createElement("h1");
    t.textContent = `gamepad: ${gamepad.id}`;

    d.append(t);


    // list element for controller buttons
    const b = document.createElement("ul");
    b.className = "buttons";

    // list items for each button (0-15 typically)
    gamepad.buttons.forEach((button, i) => {
      const e = document.createElement("li");
      e.className = "button";
      e.textContent = `Button ${i}`;
      b.append(e);
    });
    d.append(b);


    // container for analog axes (sticks/triggers)
    const a = document.createElement("div");
    a.className = "axes";

    // progress bars for each axis (-1 to 1 range)
    gamepad.axes.forEach((axis, i) => {
      const p = document.createElement("progress");
      p.className = "axis";
      p.setAttribute("max", "2");
      p.setAttribute("value", "1");
      p.textContent = i;
      a.append(p);
    });

    // append axes container to main div
    d.appendChild(a);

    // append main div to document body
    document.body.append(d);

    // start the animation loop
    if (!loopStarted) {
      requestAnimationFrame(updateStatus);
      loopStarted = true;
    }
  }

  function removeGamepad(gamepad) {
    const controller = document.querySelector(`#controller${gamepad.index}`);
    if (controller) {
      controller.remove();
    }
  }

  function updateStatus() {
    for (const gamepad of navigator.getGamepads()) {
      if (!gamepad) continue;

      const d = document.getElementById(`controller${gamepad.index}`);
      const buttonElements = d.getElementsByClassName("button");

      for (const [i, button] of gamepad.buttons.entries()) {
        const el = buttonElements[i];

        const pct = `${Math.round(button.value * 100)}%`;
        el.style.backgroundSize = `${pct} ${pct}`;
        if (button.pressed) {
          el.textContent = `Button ${i} [PRESSED]`;
          el.style.color = "#42f593";
          el.className = "button pressed";
        } else {
          el.textContent = `Button ${i}`;
          el.style.color = "#2e2d33";
          el.className = "button";
        }
      }

      const axisElements = d.getElementsByClassName("axis");
      for (const [i, axis] of gamepad.axes.entries()) {
        const el = axisElements[i];
        el.textContent = `${i}: ${axis.toFixed(4)}`;
        el.setAttribute("value", axis + 1);
      }
    }

    requestAnimationFrame(updateStatus);
  }

  // return public API if needed
  return {
    // add public methods here if required
    isGamepadConnected: () => !!navigator.getGamepads()[0],
  };
})()
