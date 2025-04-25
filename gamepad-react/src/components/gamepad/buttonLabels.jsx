import a_btn from './xbox.buttons/a.svg'
import xbox_btn from './xbox.buttons/xbox.svg'

const XboxButtonLabels = {
  0: () => (
    <div className="flex items-center justify-center">
      <img src={a_btn} alt="A" className="w-8 h-8" />
    </div>
  ),
  1: () => 'B',
  2: () => 'X',
  3: () => 'Y',
  4: () => 'LB',
  5: () => 'RB',
  6: () => 'LT',
  7: () => 'RT',
  8: () => 'View',
  9: () => 'Menu',
  10: () => 'LS',
  11: () => 'RS',
  12: () => '⬆️',
  13: () => '⬇️',
  14: () => '⬅️',
  15: () => '➡️',
  16: () => (
    <div className="flex items-center justify-center">
      <img src={xbox_btn} alt="A" className="w-8 h-8" />
    </div>
  )
}

const PlayStationButtonLabels = {
  0: () => 'x',
  1: () => '○',
  2: () => '□',
  3: () => '△',
  4: () => 'L1',
  5: () => 'R1',
  6: () => 'L2',
  7: () => 'R2',
  8: () => 'Share',
  9: () => 'Options',
  10: () => 'L3',
  11: () => 'R3',
  12: () => 'DPad Up',
  13: () => 'DPad Down',
  14: () => 'DPad Left',
  15: () => 'DPad Right',
  16: () => 'PS Button',
  17: () => 'Touch Pad'
}

export const getButtonLabel = (controllerType, index) => {
  if (controllerType === 'playstation') {
    return PlayStationButtonLabels[index]?.() || `Button ${index}`
  } else if (controllerType === 'xbox') {
    return XboxButtonLabels[index]?.() || `Button ${index}`
  }
  return `Button ${index}`
}