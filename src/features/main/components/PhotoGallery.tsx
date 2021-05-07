import React from 'react'
import { FlatList, Platform } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { Button, Text, View } from 'react-native-ui-lib'
import { PlantsType } from 'features/core/api/types'
import { STORAGE_BUCKETS } from 'features/core/supabase/constants'
import GalleryImage from 'features/main/components/GalleryImage'

const IMAGE_PICKER_CONFIG = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 600,
  maxWidth: 600,
  quality: 0.6,
} as const

const PhotoGallery = ({ plantId }: { plantId: PlantsType['id'] }) => {
  const handleUpload = () => {
    launchImageLibrary(IMAGE_PICKER_CONFIG, (response) => {
      if (response?.uri) {
        const uri =
          Platform.OS === 'android'
            ? response.uri
            : response.uri.replace('file://', '')
        const derivedFileName = uri.split('/').pop()
        const name = response.fileName ?? derivedFileName ?? 'unknown.jpg'
        const file = {
          name,
          uri: response.uri,
          type: response.type,
        }

        const filePath = `${plantId}/${name}`
        console.log(file, filePath)
      }
    })
  }

  return (
    <>
      <View spread row marginH-20>
        <Text text70BO>Gallery</Text>
        <Button link label="Add photo" onPress={handleUpload} />
      </View>
      <FlatList
        data={[]}
        contentContainerStyle={{ height: 100, margin: 20 }}
        horizontal
        keyExtractor={(_item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Button link label="Add your first photo" onPress={handleUpload} />
        )}
        renderItem={({ item }) => (
          <GalleryImage
            item={item}
            bucket={STORAGE_BUCKETS.PLANTS}
            plantId={plantId}
          />
        )}
      />
    </>
  )
}

export default PhotoGallery
