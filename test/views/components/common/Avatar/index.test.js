/* global describe, it */
import React from 'react';
import { create } from 'react-test-renderer';

import Avatar from 'src/components/common/Avatar'

describe('Avatar', () => {
  it('should be rendered correctly', () => {
    const tree = create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with avatar should be rendered correctly', () => {
    const tree = create(
      <Avatar
        nickname='Taro yamada'
        avatar='http://lorempixel.com/200/200/cats/'
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
