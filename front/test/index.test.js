/* global describe, it */
import React from 'react';
import { create } from 'react-test-renderer';

describe('example', () => {
  it('should be rendered correctly', () => {
    const tree = create(<span>fuga</span>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
