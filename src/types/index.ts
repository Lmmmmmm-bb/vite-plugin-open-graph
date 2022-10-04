import type { BasicOptions, ExtraOptions } from './og'
import type { TwitterOptions } from './twitter'

export { BasicOptions, ExtraOptions, TwitterOptions }

export interface Options {
  basic: BasicOptions
  extra?: ExtraOptions
  twitter?: TwitterOptions
}
