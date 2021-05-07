import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Colors } from 'react-native-ui-lib'

function PlantIcon() {
  return (
    <Svg width={19} height={20} viewBox="0 0 19 20" fill="none">
      <Path
        d="M19 1v2a7 7 0 01-7 7h-1v1h5v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7h5V8a7 7 0 017-7h3zM3.5 0a7.49 7.49 0 016.124 3.169A7.953 7.953 0 008 8v1h-.5A7.5 7.5 0 010 1.5V0h3.5z"
        fill={Colors.green10}
      />
    </Svg>
  )
}

export default PlantIcon
