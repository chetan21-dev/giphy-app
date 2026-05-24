import React from "react";

function PaginationBar(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination pagination-sm justify-content-center border-0">
        {pageNumbers.map(number => {
          let classes = "page-item ";
          if (number === props.currentPage) {
            classes += "active";
          }
          return (
            <li className={classes} key={number}>
              <button
                onClick={() => props.pageSelected(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginationBar;
