import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ButtonProps, Colors, ThemeManager } from 'react-native-ui-lib'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContextProvider } from 'features/core/hooks/useToast'
import { UserContextProvider } from 'features/core/hooks/useUser'
import Navigator from 'features/navigation/navigator'
import 'react-native-gesture-handler'

ThemeManager.setComponentTheme('Button', (props: ButtonProps) => ({
  color: props.link ? Colors.green10 : 'white',
  backgroundColor: Colors.green10,
}))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})

export const App = () => (
  <SafeAreaProvider>
    <UserContextProvider>
      <ToastContextProvider>
        <QueryClientProvider client={queryClient}>
          <Navigator />
        </QueryClientProvider>
      </ToastContextProvider>
    </UserContextProvider>
  </SafeAreaProvider>
)
