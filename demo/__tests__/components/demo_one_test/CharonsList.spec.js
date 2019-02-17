import React from 'react';
import { shallow } from 'enzyme';
import CharonsList from '../../../client/components/demo_one/CharonsList';

describe('CharonsList', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<CharonsList />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
