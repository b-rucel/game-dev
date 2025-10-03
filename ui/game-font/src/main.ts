import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>An hour-long Castlevania-like platformer set in the old creepy house full of monsters. Plus some story, NPCs to talk to, coins to collect, etc.<br></p>
    <p></p>
    <p>Some technical details:</p>
    <p>This is what happens when you take Unity Bolt tutorials a bit too far. Since it's done with Bolt (Visual Scripting 1.6.1 to be precise) and me being shit at programming (visual), there are some shortcomings:</p>
    <ul><li>I've no idea how to do rebindable controls with Bolt, not sure if it's even possible. So I made a bunch keys accessible, both for keyboard and gamepad (there's a list in-game)</li><li>No graphic options, since it's a not easy even in C#. I tested it on a monitor with no g-sync, there were no screen tearing. And resolution should be native. You can also go windowed with alt-enter. </li><li>At least there's are separate audio sliders.</li><li>Bolt is overall slower than proper code, so there may be slowdowns on older systems.</li></ul>
    <p></p>
    <p class="scandia">P.S. Here's a bit of a challenge: what is the real name of the blue demon?<br></p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
