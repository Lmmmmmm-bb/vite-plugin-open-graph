import type { BasicOptions } from './og'
import type { TwitterOptions } from './twitter'
import type { FacebookOptions } from './facebook'

export { BasicOptions, TwitterOptions, FacebookOptions }

export interface Options {
  basic?: BasicOptions
  twitter?: TwitterOptions
  facebook?: FacebookOptions
}
