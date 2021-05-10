import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors, Image, View } from 'react-native-ui-lib'
import { useSignedUrl } from 'features/core/api/storage'
import { FileObject } from 'features/core/api/types'
import { StorageBucketsType } from 'features/core/supabase/constants'

interface IProps {
  bucket: StorageBucketsType
  item: FileObject
  plantId: number
}

const GalleryImage = ({ item, bucket, plantId }: IProps) => {
  const filePath = `${plantId}/${item.name}`
  const { data, isLoading } = useSignedUrl(bucket, filePath)
  const [showLoader, setShowLoader] = useState(true)

  return (
    <View center>
      {(isLoading || showLoader) && (
        <View absV absH>
          <ActivityIndicator color={Colors.green10} />
        </View>
      )}
      {data && (
        <Image
          onLoadEnd={() => setShowLoader(false)}
          source={{ uri: data }}
          height={100}
          width={100}
        />
      )}
    </View>
  )
}

export default GalleryImage
