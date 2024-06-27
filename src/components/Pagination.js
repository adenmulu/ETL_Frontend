import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
