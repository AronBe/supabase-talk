import React, { useState, createContext, useContext } from 'react'
import { ToastProps } from 'react-native-ui-lib/typings'

interface IToastContext {
  toast: ToastProps
  setToast: React.Dispatch<React.SetStateAction<ToastProps>>
}

export const ToastContext = createContext({} as IToastContext)

export const ToastContextProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<ToastProps>({})

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastContextProvider.')
  }
  return context
}
