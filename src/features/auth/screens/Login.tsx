import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, View } from 'react-native-ui-lib'
import { AuthNavigationProps, AuthRoutes } from 'features/auth/navigator/types'
import { ILoginValues } from 'features/auth/screens/types'
import AppTextInput from 'features/core/components/AppTextInput'
import Screen from 'features/core/components/Screen'

const Login: FC<AuthNavigationProps<'Login'>> = ({ navigation }) => {
  const { control, handleSubmit } = useForm()

  const showSignup = () => {
    navigation.navigate(AuthRoutes.SIGNUP)
  }

  const login: SubmitHandler<ILoginValues> = ({ email, password }) => {
    console.log(email, password)
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
