import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Rocket, Palette, Gauge, Moon, Sun, Gamepad2 } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import './App.css'

const ControllerImage = ({ type, opacity = 1, size = "w-full" }) => (
  <div className="flex flex-col items-center" style={{ opacity }}>
    <img
      src={`/${type}.svg`}
      alt={`${type} Controller`}
      className={`${size} object-contain`}
    />
    <Badge variant="secondary" className="mt-2">
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  </div>
);

function App() {
  const { theme, setTheme } = useTheme()
  const [gamepad, setGamepad] = useState(null)
  const [controllerType, setControllerType] = useState(null)

  useEffect(() => {
    const handleGamepadConnected = (e) => {
      setGamepad(e.gamepad)
      // Check gamepad.id for controller type
      const id = e.gamepad.id.toLowerCase()
      if (id.includes('playstation') || id.includes('ps')) {
        setControllerType('playstation')
      } else if (id.includes('xbox') || id.includes('microsoft')) {
        setControllerType('xbox')
      }
    }

    const handleGamepadDisconnected = () => {
      setGamepad(null)
      setControllerType(null)
    }

    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <div className="max-w-4xl w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Gamepad Tester</CardTitle>
            <CardDescription>
              {gamepad ? 
                `Connected: ${gamepad.id}` :
                'Connect your controller to see it visualized below.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {!gamepad ? (
                <>
                  <ControllerImage type="playstation" opacity={0.3} />
                  <ControllerImage type="xbox" opacity={0.3} />
                </>
              ) : (
                <div className="animate-fade-in">
                  <ControllerImage type={controllerType === 'playstation' ? 'playstation' : 'xbox'} />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-muted-foreground text-sm">
              Inspired by <a href="https://www.onlinemictest.com/controller-tester/" target="_blank" rel="noopener noreferrer" className="underline">onlinemictest.com/controller-tester</a> and <a href="https://hardwaretester.com/gamepad" target="_blank" rel="noopener noreferrer" className="underline">hardwaretester.com/gamepad</a>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default App
