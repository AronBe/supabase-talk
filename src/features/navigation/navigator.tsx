import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import AuthStack from 'features/auth/navigator/navigator'
import { useUser } from 'features/core/hooks/useUser'
import MainStack from 'features/main/navigator/navigator'

enum RootRoutes {
  AUTH = 'RootRoutes.Auth',
  MAIN = 'RootRoutes.Main',
}

const Stack = createStackNavigator()

const Navigator = () => {
  const { user } = useUser()

  const onReady = () => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 500)
  }

  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator headerMode="none">
        {user ? (
          <Stack.Screen name={RootRoutes.MAIN} component={MainStack} />
        ) : (
          <Stack.Screen name={RootRoutes.AUTH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
