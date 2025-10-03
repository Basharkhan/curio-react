// src/components/common/Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null; // No pagination if only 1 page
   
    return (
        <div className="join mt-6 flex justify-center gap-x-2">
            {/* Previous */}
            <button
                className="join-item btn"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
            >
                «
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => (
                <button
                key={i}
                className={`join-item btn ${i === page ? "btn-active text-primary" : ""}`}
                onClick={() => onPageChange(i)}
                >
                {i + 1}
                </button>
            ))}

            {/* Next */}
            <button
                className="join-item btn"
                disabled={page + 1 >= totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                »
            </button>
        </div>
    );
}
