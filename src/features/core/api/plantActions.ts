import { useMutation, useQueryClient } from 'react-query'
import {
  IAddWatering,
  PostgrestError,
  WateringType,
} from 'features/core/api/types'
import { useToast } from 'features/core/hooks/useToast'
import { TABLES } from 'features/core/supabase/constants'
import { supabase } from 'features/core/supabase/supabase'

export const useAddWatering = () => {
  const { setToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, date }: IAddWatering) => {
      const { data, error } = await supabase
        .from<WateringType>(TABLES.WATERING)
        .insert([{ plant_id: id, watering_date: date }])
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },

    {
      onError: (error: PostgrestError) =>
        setToast({ message: error.message, visible: true }),
      onSuccess: () => {
        void queryClient.invalidateQueries(TABLES.WATERING)
        void queryClient.invalidateQueries(TABLES.PLANTS)
      },
    }
  )
}
