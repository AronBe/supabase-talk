import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors, Image, View } from 'react-native-ui-lib'
import { FileObject } from 'features/core/api/types'
import { StorageBucketsType } from 'features/core/supabase/constants'

interface IProps {
  bucket: StorageBucketsType
  item: FileObject
  plantId: number
}

const GalleryImage = ({ item, bucket, plantId }: IProps) => {
  const [showLoader, setShowLoader] = useState(true)
  const filePath = `${plantId}/${item.name}`
  console.log(filePath, bucket)
  const dataPlaceholder = ''

  return (
    <View center>
      {showLoader && (
        <View absV absH>
          <ActivityIndicator color={Colors.green10} />
        </View>
      )}
      {dataPlaceholder && (
        <Image
          onLoadEnd={() => setShowLoader(false)}
          source={{ uri: dataPlaceholder }}
          height={100}
          width={100}
        />
      )}
    </View>
  )
}

export default GalleryImage
