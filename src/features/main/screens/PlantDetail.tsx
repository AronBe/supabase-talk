import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { Text, View } from 'react-native-ui-lib'
import Screen from 'features/core/components/Screen'
import PhotoGallery from 'features/main/components/PhotoGallery'
import PlantCalendar from 'features/main/components/PlantCalendar'
import { MainNavigationProps } from 'features/main/navigator/types'

const PlantDetail: FC<MainNavigationProps<'PlantDetail'>> = ({ route }) => {
  const { plant } = route.params

  return (
    <Screen>
      <ScrollView>
        <View center>
          <Text text50BO marginV-s5>
            {plant.name} ({plant.id})
          </Text>
        </View>
        <PhotoGallery plantId={plant.id} />
        <PlantCalendar plantId={plant.id} />
      </ScrollView>
    </Screen>
  )
}

export default PlantDetail
