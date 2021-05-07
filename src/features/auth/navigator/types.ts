import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export const AuthRoutes = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const

export type AuthRoutesProp = {
  [AuthRoutes.LOGIN]: undefined
  [AuthRoutes.SIGNUP]: undefined
}

export interface AuthNavigationProps<TRouteName extends keyof AuthRoutesProp> {
  navigation: StackNavigationProp<AuthRoutesProp, TRouteName>
  route: RouteProp<AuthRoutesProp, TRouteName>
}
