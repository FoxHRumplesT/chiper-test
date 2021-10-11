import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChangePage,
}) => {
  const pagesToShow = () => {
    return currentPage === 1
      ? [currentPage, 2, 3]
      : currentPage === totalPages
      ? [currentPage + 2, currentPage - 1, currentPage]
      : [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="pagination">
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
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => onChangePage(currentPage + 1)}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => onChangePage(totalPages)}
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
