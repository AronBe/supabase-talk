import { StorageBucketsType } from 'features/core/supabase/constants'
import { definitions } from 'features/core/supabase/types'

export type WateringType = definitions['watering']

export type PlantsType = definitions['plants']

export interface PostgrestError {
  message: string
  details: string
  hint: string
  code: string
}

export interface IAddWatering {
  id: PlantsType['id']
  date?: WateringType['watering_date']
}

// supabase type
export interface Bucket {
  id: string
  name: string
  owner: string
  created_at: string
  updated_at: string
}

// supabase type
export interface FileObject {
  name: string
  bucket_id: string
  owner: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: {}
  buckets: Bucket
}

export interface StorageFile {
  uri: string
  name: string
  type?: string
}

export interface IUploadToStorage {
  filePath: string
  file: StorageFile
  plantId: string
  bucket: StorageBucketsType
}
