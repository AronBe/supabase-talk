import {
  UseQueryOptions,
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import {
  FileObject,
  IUploadToStorage,
  PostgrestError,
} from 'features/core/api/types'
import { useToast } from 'features/core/hooks/useToast'
import {
  StorageBucketsType,
  STORAGE_BUCKETS,
} from 'features/core/supabase/constants'
import { supabase } from 'features/core/supabase/supabase'

export const useGetStorage = (
  bucket: StorageBucketsType,
  plantId?: string,
  options?: UseQueryOptions<FileObject[], PostgrestError>
) => {
  const { setToast } = useToast()

  return useQuery<FileObject[], PostgrestError>(
    [bucket, plantId],
    async () => {
      const { data, error } = await supabase.storage.from(bucket).list(plantId)

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

// in seconds
const URL_EXPIRATION = 60 * 60

export const useSignedUrl = (
  bucket: StorageBucketsType,
  imagePath: string,
  options?: UseQueryOptions<string | null, PostgrestError>
) => {
  const { setToast } = useToast()

  return useQuery<string | null, PostgrestError>(
    [bucket, imagePath],
    async () => {
      const { signedURL, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(imagePath, URL_EXPIRATION)

      if (error) {
        throw new Error(error.message)
      }

      return signedURL
    },
    {
      ...options,
      onError: (error) => {
        setToast({ message: error.message, visible: true })
      },
    }
  )
}

export const useUploadToStorage = () => {
  const { setToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation(
    async ({ filePath, file }: IUploadToStorage) => {
      const { error } = await supabase.storage
        .from(STORAGE_BUCKETS.PLANTS)
        .upload(filePath, file)

      if (error) {
        throw new Error(error.message)
      }
    },

    {
      onError: (error: PostgrestError) =>
        setToast({ message: error.message, visible: true }),
      onSuccess: (_data, { bucket, plantId }) =>
        void queryClient.invalidateQueries([bucket, plantId]),
    }
  )
}
