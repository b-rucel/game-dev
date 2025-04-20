# Gamepad Demo

A simple web-based demonstration of the HTML5 Gamepad API that visualizes gamepad inputs in real-time.

## Features

- Auto-detection of gamepad connections and disconnections
- Real-time visualization of:
  - Button states (pressed/released)
  - Analog stick positions
  - Trigger values
- Support for multiple gamepads
- Visual feedback for button pressure sensitivity

## How It Works

1. **Connection**
   - Connect your gamepad via USB or Bluetooth
   - The browser automatically detects the connection
   - A new controller interface appears on screen

2. **Interface Elements**
   - Title shows the gamepad model
   - Buttons are displayed as a list
   - Analog inputs are shown as progress bars
   - Each button shows its pressed state and pressure value
   - Each axis shows its current position (-1.0 to 1.0)

3. **Real-time Updates**
   - Button states update instantly when pressed/released
   - Analog stick positions update continuously
   - Color changes indicate button states
   - Progress bars show analog input positions

## Supported Browsers

- Chrome 21+
- Firefox 29+
- Edge 12+
- Safari 10.1+

## Supported Controllers

Most modern gaming controllers are supported, including:
- Xbox controllers (360/One/Series)
- PlayStation controllers (PS4/PS5)
- Nintendo Switch Pro Controller
- Generic USB/Bluetooth gamepads

## Usage

1. Open the demo in a compatible browser
2. Connect your gamepad
3. Interact with the controller to see real-time updates
4. Multiple controllers can be connected simultaneously

## Technical Details

The demo uses the HTML5 Gamepad API:
- `navigator.getGamepads()` for controller access
- `gamepadconnected` event for plug-and-play detection
- `requestAnimationFrame` for smooth updates
- DOM manipulation for visual feedback

## Troubleshooting

- Make sure your gamepad is properly connected
- Some controllers may need to be turned on before connecting
- Browser must support the Gamepad API
- Try refreshing the page if the gamepad isn't detected

```
GamepadEvent {
  isTrusted: true
  bubbles: false
  cancelBubble: false
  cancelable: true
  composed: false
  currentTarget: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
  defaultPrevented: false
  eventPhase: 0
  gamepad: Gamepad {id: 'Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02fd)', index: 0, connected: true, timestamp: 22786.90000000596, mapping: 'standard', …}
  returnValue: true
  srcElement: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
  target: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
  timeStamp: 22786.90000000596
  type: "gamepadconnected"  
}
```
