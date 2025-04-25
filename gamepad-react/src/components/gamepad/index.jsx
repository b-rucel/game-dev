import { useState, useEffect } from "react"

export default function Gamepad() {
  const [gamepad, setGamepad] = useState(null)
  const [controllerType, setControllerType] = useState(null)
  const [buttonStates, setButtonStates] = useState([])

  const getButtonLabel = (index) => {
    if (controllerType === 'playstation') {
      switch(index) {
        case 0: return '×';
        case 1: return '○';
        case 2: return '□';
        case 3: return '△';
        case 4: return 'L1';
        case 5: return 'R1';
        case 6: return 'L2';
        case 7: return 'R2';
        case 8: return 'Share';
        case 9: return 'Options';
        case 10: return 'L3';
        case 11: return 'R3';
        case 12: return 'DPad Up';
        case 13: return 'DPad Down';
        case 14: return 'DPad Left';
        case 15: return 'DPad Right';
        case 16: return 'PS Button';
        case 17: return 'Touch Pad';
        default: return `Button ${index}`;
      }
    } else if (controllerType === 'xbox') {
      switch(index) {
        case 0: return 'A';
        case 1: return 'B';
        case 2: return 'X';
        case 3: return 'Y';
        case 4: return 'LB';
        case 5: return 'RB';
        case 6: return 'LT';
        case 7: return 'RT';
        case 8: return 'View';
        case 9: return 'Menu';
        case 10: return 'LS';
        case 11: return 'RS';
        case 12: return 'DPad Up';
        case 13: return 'DPad Down';
        case 14: return 'DPad Left';
        case 15: return 'DPad Right';
        case 16: return 'Xbox';
        default: return `Button ${index}`;
      }
    }
    return `Button ${index}`;
  }

  function handleGamepadConnected(e) {
    setGamepad(e.gamepad)
    setButtonStates(new Array(e.gamepad.buttons.length).fill(false))

    const id = e.gamepad.id.toLowerCase()
    if (id.includes('playstation') || id.includes('ps')) {
      setControllerType('playstation')
    } else if (id.includes('xbox') || id.includes('microsoft')) {
      setControllerType('xbox')
    }
  }

  function handleGamepadDisconnected(e) {
    setGamepad(null)
    setControllerType(null)
    setButtonStates([])
  }

  useEffect(() => {
    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

    const pollGamepad = () => {
      if (gamepad) {
        const gamepads = navigator.getGamepads()
        const currentGamepad = gamepads[gamepad.index]
        
        if (currentGamepad) {
          setButtonStates(currentGamepad.buttons.map(button => button.pressed))
        }
      }
    }

    const pollInterval = setInterval(pollGamepad, 50) // Poll every 50ms

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
      clearInterval(pollInterval)
    }
  }, [gamepad])

  return (
    <div className="space-y-4">
      <div>
        <p>Gamepad: {gamepad ? gamepad.id : 'None'}</p>
        <p>Controller Type: {controllerType}</p>
      </div>

      {buttonStates.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {buttonStates.map((pressed, index) => (
            <div
              key={index}
              className={`p-4 rounded border ${pressed ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              {getButtonLabel(index)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
