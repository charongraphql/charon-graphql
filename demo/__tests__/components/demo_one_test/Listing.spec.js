import React from 'react';
import { shallow, mount } from 'enzyme';
import Listing from '../../../client/components/demo_one/Listing';

describe('Listing', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Listing />).find('.listing')).toBeDefined();
    expect(shallow(<Listing />).is('.listing')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Listing />).find('.listing')).toHaveLength(1);
  });
  it('renders title of listing', () => {
    const listing = {
      title: 'Trampoline',
      author: 'Chang',
      listing_id: 1,
      index: 1,
      deleteListing: () => {}
    };

    const wrapper = shallow(
      <Listing
        title={listing.title}
        author={listing.author}
        listing_id={listing.listing_id}
        index={listing.index}
        deleteListing={listing.deleteListing}
      />
    );
    expect(wrapper.contains(<h3>Trampoline</h3>)).toBeTruthy();
  });
});
