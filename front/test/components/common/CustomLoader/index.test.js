/* global describe, it */
import React from 'react'
import { create } from 'react-test-renderer'

import CustomLoader from 'src/components/common/CustomLoader'

describe('CustomLoader', () => {
  it('should be rendered correctly with isShow = false', () => {
    const tree = create(
      <CustomLoader />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should be rendered correctly with isShow = true', () => {
    const tree = create(
      <CustomLoader isShow />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should be rendered correctly with label', () => {
    const tree = create(
      <CustomLoader
        label="loading..."
        isShow
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
