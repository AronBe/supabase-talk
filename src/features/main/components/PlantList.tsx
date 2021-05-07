import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Button, Colors, ListItem, Text } from 'react-native-ui-lib'
import PlantIcon from 'features/core/assets/PlantIcon'
import { MainRoutes } from 'features/main/navigator/types'

const mockPlants = [
  {
    created_at: '2021-05-07T07:38:24.522607+00:00',
    deleted_at: undefined,
    id: 999,
    last_watering: undefined,
    name: 'Placeholder plant',
    user_id: '5591b83a-9c81-4a07-aa62-ade2fb74b757',
    watered_interval: 3,
  },
]

const PlantList = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { navigate } = useNavigation()

  return (
    <FlatList
      data={mockPlants}
      refreshControl={
        <RefreshControl onRefresh={() => {}} refreshing={false} />
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Swipeable
          renderRightActions={() => (
            <Button
              marginV-s1
              marginR-20
              backgroundColor={Colors.grey70}
              color={Colors.blue30}
              label="Water"
              onPress={() => {}}
            />
          )}
          renderLeftActions={() => (
            <Button
              marginV-s1
              marginL-20
              backgroundColor={Colors.grey70}
              color={Colors.red10}
              onPress={() => {}}
              label="Delete"
            />
          )}
        >
          <ListItem
            onPress={() => navigate(MainRoutes.PLANT_DETAIL, { plant: item })}
          >
            <ListItem.Part left margin-20>
              <PlantIcon />
            </ListItem.Part>
            <ListItem.Part column middle>
              <ListItem.Part>
                <Text text70M>{item.name}</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text text80R grey20>
                  Water every {item.watered_interval} days
                </Text>
              </ListItem.Part>
            </ListItem.Part>
            <ListItem.Part
              column
              right
              marginR-20
              containerStyle={{ width: 150 }}
            >
              <ListItem.Part>
                <Text text70R>Last time watered:</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text text80R grey20>
                  {item.last_watering
                    ? dayjs(item.last_watering).format('D MMM YYYY hh:mma')
                    : 'Not watered yet'}
                </Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Swipeable>
      )}
    />
  )
}

export default PlantList
