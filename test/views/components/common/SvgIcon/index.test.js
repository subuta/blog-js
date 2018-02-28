/* global describe, it */
import React from 'react'
import { create } from 'react-test-renderer'

import SvgIcon from 'src/components/common/SvgIcon'

describe('SvgIcon', () => {
  it('should be rendered correctly', () => {
    const tree = create(
      <SvgIcon
        className="logo"
        name="logo"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
