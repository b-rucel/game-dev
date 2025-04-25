import { useState, useEffect } from "react"
import controller from './xbox.svg'
import './styles.css'

export default function Gamepad() {
  const [gamepad, setGamepad] = useState(null)
  const [controllerType, setControllerType] = useState(null)
  const [buttonStates, setButtonStates] = useState([])

  const getButtonLabel = (index) => {
    if (controllerType === 'playstation') {
      switch(index) {
        case 0: return 'x';
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
    <div className="lg:block space-y-4">
      {!gamepad ? (
        <div className="p-4 text-center border rounded-lg bg-muted/5">
          <div className="p-8 flex flex-col items-center justify-center space-y-4 bg-[#caf0f8] rounded-lg dark:bg-gray-700">
            <img 
              src={controller} 
              alt="Game Controller"
              width={144}
              height={144}
              className="mx-auto animate-pulse relative transform translate-y-0 drop-shadow-[0_20px_20px_rgba(0,0,0,0.45)]" 
            />
            <h2 className="text-2xl font-semibold text-foreground">No Controller Connected</h2>
            <p className="text-muted-foreground max-w-sm">
              Connect your gamepad and press any button to start testing. Supports PlayStation and Xbox controllers.
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Turn on controller</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
                <span>Press any button</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="p-6 rounded-lg bg-gradient-to-br from-muted/5 to-muted/10 border border-primary/10 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-primary/5">
            <div className="flex items-center justify-between flex-col md:flex-row">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground !m-0">Connected Controller</h2>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{gamepad.id}</p>
              </div>
              <div className="my-8 relative px-4 py-2 rounded bg-primary/10 text-primary border border-primary/20 font-medium shadow-sm transition-transform duration-200 hover:scale-105 animate-slow-pulse">
                <span className="absolute top-[-7px] right-[-13px] flex h-3 w-3 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                </span>
                {controllerType === 'playstation' ? (
                  <span className="flex items-center gap-2">
                    <span className="text-blue-500">PlayStation</span>
                    <span className="text-xs opacity-50">●</span>
                    <span className="text-xs uppercase tracking-wider opacity-75">Connected</span>
                  </span>
                ) : controllerType === 'xbox' ? (
                  <span className="flex items-center gap-2">
                    <span className="text-green-500">Xbox</span>
                    <span className="text-xs opacity-50">●</span>
                    <span className="text-xs uppercase tracking-wider opacity-75">Connected</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Generic</span>
                    <span className="text-xs opacity-50">●</span>
                    <span className="text-xs uppercase tracking-wider opacity-75">Connected</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {buttonStates.length > 0 && (
            <div className="p-6 rounded-lg bg-muted/5 border">
              <h3 className="text-lg font-medium mb-4">Button States</h3>
              <div className="grid grid-cols-4 gap-4">
                {buttonStates.map((pressed, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-colors duration-100 ${pressed ? 'bg-[#caf0f8] text-primary-foreground shadow-lg scale-95' : 'bg-background hover:bg-muted/5'}`}
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold">{getButtonLabel(index)}</div>
                      <div className="text-xs mt-1 text-muted-foreground hidden md:block">{pressed ? 'Pressed' : 'Released'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
