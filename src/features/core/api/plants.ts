import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { PlantsType, PostgrestError } from 'features/core/api/types'
import { useToast } from 'features/core/hooks/useToast'
import { useUser } from 'features/core/hooks/useUser'
import { TABLES } from 'features/core/supabase/constants'
import { supabase } from 'features/core/supabase/supabase'
import { NewPlantType } from 'features/main/screens/NewPlant'

export const useGetPlants = (
  options?: UseQueryOptions<PlantsType[], PostgrestError>
) => {
  const { setToast } = useToast()

  return useQuery<PlantsType[], PostgrestError>(
    TABLES.PLANTS,
    async () => {
      const { data, error } = await supabase
        .from<PlantsType>(TABLES.PLANTS)
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: true })

      if (error) {
        throw new Error(error.message)
      }

      return data ?? []
    },
    {
      ...options,
      onError: (error) => {
        setToast({ message: error.message, visible: true })
      },
    }
  )
}

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

export const useDeletePlant = () => {
  const { setToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation(
    async (id: PlantsType['id']) => {
      const { data, error } = await supabase
        .from<PlantsType>(TABLES.PLANTS)
        .update({ deleted_at: new Date().toISOString() })
        .match({ id: id.toString() })
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
