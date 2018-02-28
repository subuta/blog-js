/* global describe, it */
import React from 'react'
import { create } from 'react-test-renderer'
import moment from 'moment'

import Comment from 'src/components/common/Comment'

describe('Comment', () => {
  it('should be rendered correctly', () => {
    const tree = create(
      <Comment
        comment={{
          text: 'hoge',
          attachment: {
            url: 'http://lorempixel.com/200/200/cats/',
            name: 'hoge.png'
          },
          commentedBy: {
            avatar: 'http://lorempixel.com/200/200/cats/',
            nickname: 'Taro Yamada'
          },
          createdAt: moment('2017/12/01 18:00:00', 'YYYY/MM/DD HH:mm:ss')
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should be rendered correctly without commentedBy', () => {
    const tree = create(
      <Comment
        comment={{
          text: 'hoge',
          attachment: {
            url: 'http://lorempixel.com/200/200/cats/',
            name: 'hoge.png'
          },
          createdAt: moment('2017/12/01 18:00:00', 'YYYY/MM/DD HH:mm:ss')
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
