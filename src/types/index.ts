import type { BasicOptions } from './og'
import type { TwitterOptions } from './twitter'

export { BasicOptions, TwitterOptions }

export interface Options {
  basic?: BasicOptions
  twitter?: TwitterOptions
}
