import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Text, View } from 'react-native-ui-lib'
import { AuthNavigationProps } from 'features/auth/navigator/types'
import { ISignupValues } from 'features/auth/screens/types'
import AppTextInput from 'features/core/components/AppTextInput'
import Screen from 'features/core/components/Screen'
import { useToast } from 'features/core/hooks/useToast'
import { supabase } from 'features/core/supabase/supabase'

const Signup: FC<AuthNavigationProps<'Signup'>> = () => {
  const { control, handleSubmit } = useForm<ISignupValues>()
  const { setToast } = useToast()

  const signup: SubmitHandler<ISignupValues> = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setToast({ message: error.message, visible: true })
    }
  }

  return (
    <Screen>
      <View flex center>
        <Text text50BO>Signup</Text>
        <AppTextInput
          control={control}
          name="email"
          label="Email"
          inputProps={{ keyboardType: 'email-address' }}
        />
        <AppTextInput
          control={control}
          name="password"
          label="Password"
          inputProps={{ secureTextEntry: true }}
        />
        <Button label="Sign up" onPress={() => void handleSubmit(signup)()} />
      </View>
    </Screen>
  )
}

export default Signup
