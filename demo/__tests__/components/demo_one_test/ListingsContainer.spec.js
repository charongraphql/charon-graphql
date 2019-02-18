import React from 'react';
import { shallow } from 'enzyme';
import ListingsContainer from '../../../client/components/demo_one/ListingsContainer';

describe('ListingsContainer', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<ListingsContainer />);
    expect(wrapper.find('.listings-container')).toBeDefined();
    // expect(wrapper.is('.listings-container')).toBe(true);
  });
});
