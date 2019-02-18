import React from 'react';
import { shallow, mount } from 'enzyme';
import Listing from '../../../client/components/demo_one/Listing';

describe('Listing', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<Listing />).find('.listing')).toBeDefined();
    expect(shallow(<Listing />).is('.listing')).toBe(true);
  });

  test('should mount in a full DOM', () => {
    expect(mount(<Listing />).find('.listing')).toHaveLength(1);
  });

  test('renders title of listing', () => {
    const listing = {
      title: 'Trampoline',
      author: 'Chang',
      listing_id: 1,
      index: 1,
      deleteListing: () => {},
    };

    const wrapper = shallow(
      <Listing
        title={listing.title}
        author={listing.author}
        listing_id={listing.listing_id}
        index={listing.index}
        deleteListing={listing.deleteListing}
      />,
    );
    expect(wrapper.contains(<h3>Trampoline</h3>)).toBeTruthy();
  });

  test('successfully calls the onClick handler', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Listing deleteListing={mockOnClick} />);
    wrapper.find('button').simulate('click');
    expect(mockOnClick.mock.calls).toHaveLength(1);
  });
});
