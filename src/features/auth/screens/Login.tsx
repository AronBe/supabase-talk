import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, View } from 'react-native-ui-lib'
import { AuthNavigationProps, AuthRoutes } from 'features/auth/navigator/types'
import { ILoginValues } from 'features/auth/screens/types'
import AppTextInput from 'features/core/components/AppTextInput'
import Screen from 'features/core/components/Screen'
import { useToast } from 'features/core/hooks/useToast'
import { supabase } from 'features/core/supabase/supabase'

const Login: FC<AuthNavigationProps<'Login'>> = ({ navigation }) => {
  const { control, handleSubmit } = useForm()
  const { setToast } = useToast()

  const showSignup = () => {
    navigation.navigate(AuthRoutes.SIGNUP)
  }

  const login: SubmitHandler<ILoginValues> = async ({ email, password }) => {
    const { error } = await supabase.auth.signIn({ email, password })

    if (error) {
      return setToast({ message: error.message, visible: true })
    }
  }

  return (
    <Screen>
      <View flex center>
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
        <Button
          label="Login"
          onPress={() => void handleSubmit(login)()}
          marginV-s2
        />

        <Button link label="Signup" onPress={showSignup} green10 marginV-s1 />
      </View>
    </Screen>
  )
}

export default Login
