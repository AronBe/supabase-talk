import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { View, Text, Button, ListItem, Colors } from 'react-native-ui-lib'
import { useAddWatering } from 'features/core/api/plantActions'
import { useDeletePlant, useGetPlants } from 'features/core/api/plants'
import PlantIcon from 'features/core/assets/PlantIcon'
import { MainRoutes } from 'features/main/navigator/types'

const PlantList = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { navigate } = useNavigation()

  const { mutate: waterPlant } = useAddWatering()
  const { data: plants, refetch, isFetching } = useGetPlants()
  const { mutate: deletePlant, isLoading } = useDeletePlant()

  return (
    <FlatList
      data={plants}
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isFetching} />
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
              onPress={() => {
                void waterPlant({ id: item.id })
              }}
            />
          )}
          renderLeftActions={() =>
            isLoading ? (
              <View center paddingH-20 marginH-s1>
                <ActivityIndicator />
              </View>
            ) : (
              <Button
                marginV-s1
                marginL-20
                backgroundColor={Colors.grey70}
                color={Colors.red10}
                onPress={() => void deletePlant(item.id)}
                label="Delete"
              />
            )
          }
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
