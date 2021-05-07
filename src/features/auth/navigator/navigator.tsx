import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AuthRoutesProp, AuthRoutes } from 'features/auth/navigator/types'
import Login from 'features/auth/screens/Login'
import Signup from 'features/auth/screens/Signup'

const Stack = createStackNavigator<AuthRoutesProp>()

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={AuthRoutes.LOGIN} component={Login} />
    <Stack.Screen name={AuthRoutes.SIGNUP} component={Signup} />
  </Stack.Navigator>
)

export default AuthStack
