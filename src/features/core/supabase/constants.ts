export const TABLES = {
  WATERING: 'watering',
  PLANTS: 'plants',
} as const

export const STORAGE_BUCKETS = {
  PLANTS: 'plants',
} as const

export type StorageBucketsType = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS]
