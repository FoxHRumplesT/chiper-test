import { FC } from "react";
import styles from './pagination.module.css';

interface PaginationProps {
  currentPage: number;
  perPage: number;
  casesCount: number;
  onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  perPage,
  casesCount,
  onChangePage,
}) => {
  const totalPages = () => {
    return Math.ceil(casesCount / perPage);
  };

  const pagesToShow = () => {
    if (totalPages() >= 3) {
      return currentPage === 1
        ? [currentPage, 2, 3]
        : currentPage === totalPages()
        ? [currentPage - 2, currentPage - 1, currentPage]
        : [currentPage - 1, currentPage, currentPage + 1];
    } else {
      const x = [];
      for (let index = 1; index <= totalPages(); index++) {
        x.push(index);
      }
      return x;
    }
  };

  return (
    <div className={`pagination ${styles["pagination"]}`}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => onChangePage(1)}
          >
            <a className="page-link" href="#">
              First
            </a>
          </li>
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => onChangePage(currentPage - 1)}
          >
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          {pagesToShow().map((p) => (
            <li
              key={`p-${p}`}
              className={`page-item ${currentPage === p ? "disabled" : ""}`}
              onClick={() => onChangePage(p)}
            >
              <a className="page-link" href="#">
                {p}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages() ? "disabled" : ""
            }`}
            onClick={() => onChangePage(currentPage + 1)}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages() ? "disabled" : ""
            }`}
            onClick={() => onChangePage(totalPages())}
          >
            <a className="page-link" href="#">
              Last
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
