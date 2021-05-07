import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { PlantsType } from 'features/core/api/types'

export const MainRoutes = {
  DASHBOARD: 'Dashboard',
  NEW_PLANT: 'NewPlant',
  PLANT_DETAIL: 'PlantDetail',
} as const

export type MainRoutesProp = {
  [MainRoutes.DASHBOARD]: undefined
  [MainRoutes.NEW_PLANT]: undefined
  [MainRoutes.PLANT_DETAIL]: {
    plant: PlantsType
  }
}

export interface MainNavigationProps<TRouteName extends keyof MainRoutesProp> {
  navigation: StackNavigationProp<MainRoutesProp, TRouteName>
  route: RouteProp<MainRoutesProp, TRouteName>
}
