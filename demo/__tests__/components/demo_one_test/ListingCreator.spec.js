import React from 'react';
import { shallow, mount } from 'enzyme';
// import { MockedProvider } from 'react-apollo/test-utils'; cant find lib for
import ListingCreator from '../../../client/components/demo_one/ListingCreator';

describe('ListingCreator', () => {
  test('should render a <div />', () => {
    const wrapper = shallow(<ListingCreator />);
    expect(wrapper.find('div')).toHaveLength(0);
  });

  test('sets title state to input value on change', () => {
    const wrapper = shallow(<ListingCreator />);
    console.log(wrapper.debug());
    wrapper.find('div').simulate('change', { target: { value: 'chang' } });
    expect(2).toBe(2);
    wrapper.unmount();
  });
});
