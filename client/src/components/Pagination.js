import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as BtPagination } from 'react-bootstrap';
import { search } from '../helpers/search';
import { useHistory } from 'react-router-dom';

function Pagination({ pagesCount, selectedPage = 1 }) {
  const { addQuery } = search.useQueryBuilder();
  const history = useHistory();

  function redirectTo(query) {
    history.push(history.location.pathname + query);
  }

  function generatePaginationPages() {
    const paginationElements = [
      <BtPagination.First
        disabled={selectedPage === 1}
        key={0}
        onClick={() => {
          redirectTo(`?${addQuery('page', 1)}`);
        }}
      />,
      <BtPagination.Prev
        key={1}
        disabled={selectedPage === 1}
        onClick={() => {
          redirectTo(`?${addQuery('page', selectedPage - 1)}`);
        }}
      />,
    ];

    if (pagesCount <= 9) {
      for (let i = 1; i <= pagesCount; i++) {
        paginationElements.push(
          <BtPagination.Item
            key={i + 1}
            active={i === selectedPage}
            onClick={() => {
              redirectTo(`?${addQuery('page', i)}`);
            }}
          >
            {i}
          </BtPagination.Item>
        );
      }
    } else {
      let fromPaginationNumber = 1;
      let toPaginationNumber = 9;

      if (selectedPage - 5 > 0 && selectedPage + 5 < pagesCount) {
        fromPaginationNumber = selectedPage - 4;
        toPaginationNumber = selectedPage + 4;
      } else if (selectedPage + 5 >= pagesCount) {
        toPaginationNumber = pagesCount;
        fromPaginationNumber = pagesCount - 9;
      }

      for (let i = fromPaginationNumber; i <= toPaginationNumber; i++) {
        paginationElements.push(
          <BtPagination.Item
            key={i + 1}
            active={i === selectedPage}
            onClick={() => {
              redirectTo(`?${addQuery('page', i)}`);
            }}
          >
            {i}
          </BtPagination.Item>
        );
      }
    }

    paginationElements.push(
      <BtPagination.Next
        key={pagesCount + 2}
        disabled={selectedPage >= pagesCount}
        onClick={() => {
          redirectTo(`?${addQuery('page', selectedPage + 1)}`);
        }}
      />,
      <BtPagination.Last
        key={pagesCount + 3}
        disabled={selectedPage >= pagesCount}
        onClick={() => {
          redirectTo(`?${addQuery('page', pagesCount)}`);
        }}
      />
    );

    return paginationElements;
  }

  return <BtPagination>{generatePaginationPages()}</BtPagination>;
}
Pagination.propTypes = {
  pagesCount: PropTypes.number,
  selectedPage: PropTypes.number,
};
export default Pagination;
