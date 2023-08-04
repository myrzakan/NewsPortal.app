/* eslint-disable react/no-unescaped-entities */

import React from 'react'

import cls from './Pagination.module.scss'

const Pagination = ({ currentPage, postsPerPage, totalPosts, onPageChange }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  let startPage, endPage
  const maxVisiblePages = 3
  if (totalPages <= maxVisiblePages) {
    startPage = 1
    endPage = totalPages
  } else {
    const maxVisiblePagesHalf = Math.floor(maxVisiblePages / 2)
    if (currentPage <= maxVisiblePagesHalf) {
      startPage = 1
      endPage = maxVisiblePages
    } else if (currentPage + maxVisiblePagesHalf >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1
      endPage = totalPages
    } else {
      startPage = currentPage - maxVisiblePagesHalf
      endPage = currentPage + maxVisiblePagesHalf
    }
  }

  return (
    <div className={cls.pagination}>
      {currentPage !== 1 && (
        <button className={cls.page_arrow} onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </button>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${cls.page_number} ${pageNumber === currentPage ? cls.active : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage !== totalPages && (
        <button className={cls.page_arrow} onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </button>
      )}
    </div>
  )
}

export default Pagination
