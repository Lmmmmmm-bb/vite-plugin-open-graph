import { describe, expect, it } from 'vitest'
import { camelcase } from '../src/utils'

describe('camelcase function', () => {
  it('lowercase name', () => {
    expect(camelcase('hi')).toEqual('hi')
    expect(camelcase('name')).toEqual('name')
  })

  it('camelcase name', () => {
    expect(camelcase('helloWorld')).toEqual('hello:world')
    // EXCEPTION_FIELD include siteName
    expect(camelcase('secureUrl')).toEqual('secure_url')
    expect(camelcase('siteName')).toEqual('site_name')
  })

  it('empty string', () => {
    expect(camelcase('')).toEqual('')
  })
})
