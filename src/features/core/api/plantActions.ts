import {
  UseQueryOptions,
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import {
  IAddWatering,
  PlantsType,
  PostgrestError,
  WateringType,
} from 'features/core/api/types'
import { useToast } from 'features/core/hooks/useToast'
import { TABLES } from 'features/core/supabase/constants'
import { supabase } from 'features/core/supabase/supabase'

export const useWatering = (
  plantId: number,
  options?: UseQueryOptions<WateringType[], PostgrestError>
) => {
  const { setToast } = useToast()

  return useQuery<WateringType[], PostgrestError>(
    TABLES.WATERING,
    async () => {
      const { data, error } = await supabase
        .from<WateringType>(TABLES.WATERING)
        .select('*')
        .match({ plant_id: String(plantId) })

      if (error) {
        throw new Error(error.message)
      }

      return data ?? []
    },
    {
      ...options,
      onError: (error) => setToast({ message: error.message, visible: true }),
    }
  )
}

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

export const useDeleteWatering = () => {
  const { setToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation(
    async (id: PlantsType['id']) => {
      const { data, error } = await supabase
        .from<WateringType>(TABLES.WATERING)
        .delete()
        .match({ id: String(id) })
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
        setToast({ message: 'Record was deleted', visible: true })
      },
    }
  )
}
