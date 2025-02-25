import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function Pagination({ currentPage, totalPosts, postsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage); // ceil => 1.1111 => 2 , 1.9999 = 2
  // 101/10 => 10.1 => floor => 10 , ceil => 11

  const renderPageNumber = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages); // 1 2 3 4 5 ... 10
      } else if (currentPage >= totalPages - 3) {
        // 7
        pages.push(1); // 1 ... 6 7 8 9 10
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
      >
        <ChevronLeftIcon className="pagination-icon" />
      </button>

      {renderPageNumber().map((page, index) => (
        <button
          key={index}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          } ${page === "..." ? "ellipsis" : ""}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
      >
        <ChevronRightIcon className="pagination-icon" />
      </button>
    </div>
  );
}

export default Pagination;
