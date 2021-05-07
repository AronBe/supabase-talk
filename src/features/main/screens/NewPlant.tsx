import LottieView from 'lottie-react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Text, View } from 'react-native-ui-lib'
import { useAddPlant } from 'features/core/api/plants'
import { PlantsType } from 'features/core/api/types'
// eslint-disable-next-line import/extensions
import newPlantAnimation from 'features/core/assets/newPlantAnimation.json'
import AppTextInput from 'features/core/components/AppTextInput'
import Screen from 'features/core/components/Screen'
import { MainNavigationProps } from 'features/main/navigator/types'

export type NewPlantType = Pick<PlantsType, 'name' | 'watered_interval'>

const defaultValues = { name: '', watered_interval: undefined }

const NewPlant: FC<MainNavigationProps<'NewPlant'>> = () => {
  const lottieRef = useRef<LottieView>(null)
  const { handleSubmit, control, reset: formReset } = useForm<NewPlantType>({
    defaultValues,
  })
  const [showLottie, setShowLottie] = useState(false)
  const { mutate, isSuccess } = useAddPlant()

  useEffect(() => {
    if (isSuccess) {
      formReset()
      setShowLottie(true)
    }
  }, [formReset, isSuccess])

  useEffect(() => {
    const lottie = lottieRef.current
    if (showLottie) {
      lottie?.play()
    }

    return () => {
      lottie?.reset()
    }
  }, [showLottie])

  const handleAddPlant: SubmitHandler<NewPlantType> = (newPlant) =>
    mutate(newPlant)

  return (
    <Screen>
      <View flex center>
        <Text text50BO>New plant</Text>
        <AppTextInput control={control} name="name" label="Plant name" />
        <AppTextInput
          control={control}
          name="watered_interval"
          label="How often to water in days"
        />
        <Button
          label="Add"
          onPress={() => void handleSubmit(handleAddPlant)()}
        />
        {showLottie && (
          <LottieView
            source={newPlantAnimation}
            ref={lottieRef}
            onAnimationFinish={() => setShowLottie(false)}
            loop={false}
          />
        )}
      </View>
    </Screen>
  )
}

export default NewPlant
