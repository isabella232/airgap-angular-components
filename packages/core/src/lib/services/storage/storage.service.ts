import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { BaseStorage } from './base.storage'

export enum InternalStorageKey {
  SETTINGS_SERIALIZER_ENABLE_V3 = 'SETTINGS_SERIALIZER_ENABLE_V3',
  SETTINGS_SERIALIZER_CHUNK_TIME = 'SETTINGS_SERIALIZER_CHUNK_TIME',
  SETTINGS_SERIALIZER_SINGLE_CHUNK_SIZE = 'SETTINGS_SERIALIZER_SINGLE_CHUNK_SIZE',
  SETTINGS_SERIALIZER_MULTI_CHUNK_SIZE = 'SETTINGS_SERIALIZER_MULTI_CHUNK_SIZE'
}

interface InternalStorageKeyReturnType {
  [InternalStorageKey.SETTINGS_SERIALIZER_ENABLE_V3]: boolean
  [InternalStorageKey.SETTINGS_SERIALIZER_CHUNK_TIME]: number
  [InternalStorageKey.SETTINGS_SERIALIZER_SINGLE_CHUNK_SIZE]: number
  [InternalStorageKey.SETTINGS_SERIALIZER_MULTI_CHUNK_SIZE]: number
}

type InternalStorageKeyReturnDefaults = { [key in InternalStorageKey]: InternalStorageKeyReturnType[key] }

export const defaultValues: InternalStorageKeyReturnDefaults = {
  [InternalStorageKey.SETTINGS_SERIALIZER_ENABLE_V3]: true,
  [InternalStorageKey.SETTINGS_SERIALIZER_CHUNK_TIME]: 200,
  [InternalStorageKey.SETTINGS_SERIALIZER_SINGLE_CHUNK_SIZE]: 500,
  [InternalStorageKey.SETTINGS_SERIALIZER_MULTI_CHUNK_SIZE]: 250
}

@Injectable({
  providedIn: 'root'
})
export class InternalStorageService extends BaseStorage<InternalStorageKey, InternalStorageKeyReturnType> {
  constructor(storage: Storage) {
    super(storage, defaultValues)
  }
}
