import React from 'react';
import { shallow } from 'enzyme';
import ListingCreator from '../../../client/components/demo_one/ListingCreator';

describe('ListingCreator', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<ListingCreator />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
});
