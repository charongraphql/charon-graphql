import React, { useState, useEffect } from 'react';
import ListingCreator from './ListingCreator';
import ListingsContainer from './ListingsContainer';

const CharonsList = () => (
  <div className="charons-list">
    <ListingCreator />
    <ListingsContainer />
  </div>
);

export default CharonsList;
