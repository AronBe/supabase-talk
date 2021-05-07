import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { MainRoutes, MainRoutesProp } from 'features/main/navigator/types'
import Dashboard from 'features/main/screens/Dashboard'
import NewPlant from 'features/main/screens/NewPlant'
import PlantDetail from 'features/main/screens/PlantDetail'

const Stack = createStackNavigator<MainRoutesProp>()

const MainStack = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name={MainRoutes.DASHBOARD}
      component={Dashboard}
      options={{ title: 'Dashboard' }}
    />

    <Stack.Screen
      name={MainRoutes.PLANT_DETAIL}
      component={PlantDetail}
      options={{ title: 'Plant Detail' }}
    />
    <Stack.Screen
      name={MainRoutes.NEW_PLANT}
      component={NewPlant}
      options={{ title: 'Add Plant' }}
    />
  </Stack.Navigator>
)

export default MainStack
