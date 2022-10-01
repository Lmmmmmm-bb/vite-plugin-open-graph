import { describe, expect, it } from 'vitest'
import { camelcase } from '../src/transform'

describe('camelcase function', () => {
  it('lowercase name', () => {
    expect(camelcase('hi')).toEqual('hi')
    expect(camelcase('name')).toEqual('name')
  })

  it('camelcase name', () => {
    expect(camelcase('helloWorld')).toEqual('hello:world')
    expect(camelcase('siteName')).toEqual('site:name')
  })

  it('empty string', () => {
    expect(camelcase('')).toEqual('')
  })
})
