import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { render, wait, cleanup } from 'react-testing-library';
import toJSON from 'enzyme-to-json';
import ListingCreator from '../../../client/components/demo_one/ListingCreator';
import {
  getAuthorsQuery,
  addListingMutation,
  getListingsQuery,
} from '../../../client/queries/queries';

describe('ListingCreator', () => {
  let wrapper;
  const mocks = [
    {
      request: {
        query: getAuthorsQuery,
      },
      result: {
        data: {
          authors: { id: '1', name: 's' },
        },
      },
    },
  ];
  // beforeEach(() => {
  //   wrapper = shallow(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <ListingCreator />
  //     </MockedProvider>,
  //   );
  // });

  // afterEach(() => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  test('should render loading state initially', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListingCreator />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
    // this way does work with enzyme mount, but could get data to render
    // expect(toJSON(wrapper.find('ListingCreator'))).toMatchSnapshot();
  });

  test('renders data', async () => {
    const { queryByText, container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListingCreator />
      </MockedProvider>,
    );
    console.log(queryByText);
    await waitUntilLoadingIsFinished(queryByText);

    expect(container).toMatchSnapshot();
  });

  // test.skip('should render authors', () => {
  //   // console.log(wrapper.debug());
  //   wrapper.find('select').simulate('change', { target: { value: 'chang' } });
  //   console.log(wrapper);
  //   expect(
  //     wrapper
  //       .find('select')
  //       .props()
  //       .value(),
  //   ).toBe('chang');
  // });
});
