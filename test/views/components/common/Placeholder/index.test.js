/* global describe, it */
import React from 'react'
import { create } from 'react-test-renderer'

import Placeholder from 'src/components/common/Placeholder'

describe('Placeholder', () => {
  it('should be rendered correctly', () => {
    const tree = create(
      <Placeholder />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
