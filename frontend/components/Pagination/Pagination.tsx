import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Pagination.module.scss";
import { Button } from "react-aria-components";

const Pagination = ({ currentPage, maxPages, handleChangePage }) => {
  const onIncrementPage = () => {
    if (currentPage < maxPages) {
      handleChangePage(currentPage + 1);
    }
  };

  const onDecrementPage = () => {
    if (currentPage > 1) {
      handleChangePage(currentPage - 1);
    }
  };

  return (
    <>
      {currentPage > 0 && maxPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Button
            isDisabled={currentPage === 1}
            aria-label="prev"
            onPress={onDecrementPage}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <span
            className={styles.page}
          >{`Seite ${currentPage} / ${maxPages}`}</span>
          <Button
            isDisabled={currentPage === maxPages}
            aria-label="next"
            onPress={onIncrementPage}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      )}
    </>
  );
};

export default Pagination;
