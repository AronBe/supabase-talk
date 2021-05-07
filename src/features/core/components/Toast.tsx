import React from 'react'
import { Toast } from 'react-native-ui-lib'
import { useToast } from 'features/core/hooks/useToast'

const AppToast = () => {
  const { toast, setToast } = useToast()
  return (
    <Toast
      position="bottom"
      autoDismiss={3000}
      onDismiss={() => setToast({ visible: false })}
      allowDismiss
      {...toast}
    />
  )
}

export default AppToast
