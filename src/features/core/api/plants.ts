import { useMutation, useQueryClient } from 'react-query'
import { PlantsType, PostgrestError } from 'features/core/api/types'
import { useToast } from 'features/core/hooks/useToast'
import { useUser } from 'features/core/hooks/useUser'
import { TABLES } from 'features/core/supabase/constants'
import { supabase } from 'features/core/supabase/supabase'
import { NewPlantType } from 'features/main/screens/NewPlant'

export const useAddPlant = () => {
  const { user } = useUser()
  const { setToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation(
    async (newPlant: NewPlantType) => {
      const { data, error } = await supabase
        .from<PlantsType>(TABLES.PLANTS)
        .insert([
          {
            name: newPlant.name,
            watered_interval: newPlant.watered_interval,
            user_id: user?.id,
          },
        ])
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },

    {
      onError: (error: PostgrestError) =>
        setToast({ message: error.message, visible: true }),
      onSuccess: () => void queryClient.invalidateQueries(TABLES.PLANTS),
    }
  )
}
