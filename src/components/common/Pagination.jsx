// src/components/common/Pagination.jsx
import React from "react";
import { Pagination as BSPagination } from "react-bootstrap";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // No pagination if only one page

  const handlePrev = () => {
    if (page > 0) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page + 1 < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <BSPagination>
        <BSPagination.Prev onClick={handlePrev} disabled={page === 0}>
          «
        </BSPagination.Prev>

        {[...Array(totalPages)].map((_, i) => (
          <BSPagination.Item
            key={i}
            active={i === page}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </BSPagination.Item>
        ))}

        <BSPagination.Next
          onClick={handleNext}
          disabled={page + 1 >= totalPages}
        >
          »
        </BSPagination.Next>
      </BSPagination>
    </div>
  );
}
