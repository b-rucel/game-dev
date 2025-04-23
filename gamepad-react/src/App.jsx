import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Rocket, Palette, Gauge, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"


function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      {/* Theme Toggle Button - Add this near the top */}
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
              Connect your controller to see it visualized below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <img
                  src="/playstation.svg"
                  alt="PlayStation Controller"
                  className="w-64 h-64 object-contain"
                />
                <Badge variant="secondary" className="mt-2">PlayStation</Badge>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/xbox.svg"
                  alt="Xbox Controller"
                  className="w-64 h-64 object-contain"
                />
                <Badge variant="secondary" className="mt-2">Xbox</Badge>
              </div>
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
