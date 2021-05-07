import React, { FC } from 'react'
import { ActionBar, Text, View } from 'react-native-ui-lib'
import Screen from 'features/core/components/Screen'
import { useToast } from 'features/core/hooks/useToast'
import { useUser } from 'features/core/hooks/useUser'
import { supabase } from 'features/core/supabase/supabase'
import PlantList from 'features/main/components/PlantList'
import { MainNavigationProps } from 'features/main/navigator/types'

const Dashboard: FC<MainNavigationProps<'Dashboard'>> = ({ navigation }) => {
  const { user } = useUser()
  const { setToast } = useToast()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setToast({ message: error.message, visible: true })
    }
  }

  return (
    <Screen>
      <View flex>
        <Text text80M marginV-s2 center>
          Welcome: {user?.email}
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
