import { Dimensions, Platform } from 'react-native'

export const isAndroid = () => Platform.OS === 'android'

export const isIOS = () => Platform.OS === 'ios'

export const screenWidth = Dimensions.get('screen').width

export const screenHeight = Dimensions.get('screen').height
