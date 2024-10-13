import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => (
  <Pagination>
    <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
    <Pagination.Item active>{currentPage}</Pagination.Item>
    <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
  </Pagination>
);

export default PaginationComponent;
