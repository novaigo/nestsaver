import { useState } from "react";

import styles from "./Pagination.module.css";
import Button from "./Button";

function Pagination({ pageCount, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(0);

  function handleBackward() {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
      onPageChange(currentPage - 1);
    }
  }

  function handleForward() {
    if (currentPage < pageCount - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className={styles.pagination}>
      {currentPage > 0 && (
        <Button type="pagination" onClick={handleBackward}>
          <img src="../../public/img/ArrowBackward.svg " />
        </Button>
      )}
      {currentPage < pageCount - 1 && (
        <Button type="pagination" onClick={handleForward}>
          <img src="../../public/img/ArrowForward.svg" />
        </Button>
      )}
    </div>
  );
}

export default Pagination;
