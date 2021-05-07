import Config from 'react-native-config'

interface IConfig {
  supabaseUrl: string
  supabaseAnonKey: string
}

export const config: IConfig = {
  supabaseUrl: Config.SUPABASE_URL as string,
  supabaseAnonKey: Config.SUPABASE_ANON_KEY as string,
}
