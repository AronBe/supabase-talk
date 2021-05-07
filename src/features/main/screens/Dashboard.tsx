import React, { FC } from 'react'
import { ActionBar, Text, View } from 'react-native-ui-lib'
import Screen from 'features/core/components/Screen'
import PlantList from 'features/main/components/PlantList'
import { MainNavigationProps } from 'features/main/navigator/types'

const Dashboard: FC<MainNavigationProps<'Dashboard'>> = ({ navigation }) => {
  const logout = () => {}

  return (
    <Screen>
      <View flex>
        <Text text50BO marginV-s5 center>
          Welcome: placeholder
        </Text>
        <Text text70BO marginL-s3>
          Your plants
        </Text>
        <View flex row>
          <PlantList />
        </View>
      </View>
      <ActionBar
        actions={[
          {
            label: 'Add Plant',
            onPress: () => navigation.navigate('NewPlant'),
            labelStyle: { fontSize: 18 },
          },
          { label: 'Logout', onPress: logout, labelStyle: { fontSize: 18 } },
        ]}
      />
    </Screen>
  )
}

export default Dashboard
