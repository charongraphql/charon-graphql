import React from 'react';
import { shallow } from 'enzyme';
import ListingsContainer from '../../../client/components/demo_one/ListingsContainer';

describe('ListingsContainer', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<ListingsContainer />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
});
