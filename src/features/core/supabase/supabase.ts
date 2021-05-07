import AsyncStorage from '@react-native-community/async-storage'
import { createClient } from '@supabase/supabase-js'
import { config } from 'config'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    localStorage: AsyncStorage,
  }
)
