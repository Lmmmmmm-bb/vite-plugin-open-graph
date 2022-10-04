import { describe, expect, it } from 'vitest'
import { camelcase, toAttrs } from '../src/utils'
import { ogOptions } from './constant'

describe('camelcase function', () => {
  it('lowercase name', () => {
    expect(camelcase('hi')).toEqual('hi')
    expect(camelcase('name')).toEqual('name')
  })

  it('normal name', () => {
    expect(camelcase('helloWorld')).toEqual('hello:world')
    expect(camelcase('localeAlternate')).toEqual('locale:alternate')
    expect(camelcase('playerWidth')).toEqual('player:width')
  })

  it('exception field name', () => {
    expect(camelcase('secureUrl')).toEqual('secure_url')
    expect(camelcase('siteName')).toEqual('site_name')
  })

  it('empty string', () => {
    expect(camelcase('')).toEqual('')
  })
})

describe('toAttrs function', () => {
  it('snapshot', () => {
    const basicOGMetaAttrs = Object.entries(ogOptions.basic ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'og'))
    const twitterOGMetaAttrs = Object.entries(ogOptions.twitter ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'twitter'))

    expect(basicOGMetaAttrs).toMatchSnapshot()
    expect(twitterOGMetaAttrs).toMatchSnapshot()
  })
})
