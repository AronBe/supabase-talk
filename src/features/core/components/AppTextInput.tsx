import React from 'react'
import { Control, useController } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { Colors, TextField, View } from 'react-native-ui-lib'

interface IProps {
  control: Control
  name: string
  label: string
  inputProps?: TextInputProps
}

const AppTextInput = ({ control, name, label, inputProps }: IProps) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: '',
  })

  return (
    <View width="100%" paddingH-20>
      <TextField
        value={value}
        placeholder={label}
        onChangeText={onChange}
        autoCapitalize="none"
        floatingPlaceholder
        floatOnFocus
        floatingPlaceholderColor={Colors.green10}
        underlineColor={Colors.green10}
        car
        {...inputProps}
      />
    </View>
  )
}

export default AppTextInput
