import React from 'react';

const Pagination = props => (
  <nav>
    <button type="button" className="pagination-button">
      ⇦
    </button>
    <span>1 of 3</span>
    <button type="button" className="pagination-button">
      ⇨
    </button>
  </nav>
);

export default Pagination;
