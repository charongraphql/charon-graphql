import React from 'react';
import { shallow } from '../../enzyme';
import Listing from '../demo_one/Listing';

describe('Listing', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Listing />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
