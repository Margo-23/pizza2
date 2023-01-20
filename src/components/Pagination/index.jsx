import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination({setCurrentPage, countItems}) {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={e=>setCurrentPage(e.selected+1)}
    pageRangeDisplayed={8}
    pageCount={2}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}

export default Pagination