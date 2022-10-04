import type { BasicOptions, ExtraOptions, TwitterOptions } from './types/index'

export { BasicOptions, ExtraOptions, TwitterOptions }

export interface Options {
  basic: BasicOptions
  extra?: ExtraOptions
  twitter?: TwitterOptions
}
