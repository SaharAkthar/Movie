import React from "react";
import _ from "lodash";
import PropType from "prop-types";
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="Pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.PropType = {
  itemsCount: PropType.number.isRequired,
  pageSize: PropType.number.isRequired,
  onPageChange: PropType.number.isRequired,
  currentPage: PropType.func.isRequired,
};
export default Pagination;
