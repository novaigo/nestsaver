import { useState } from "react";

import { useApartments } from "../context/ApartmentsContext";
import ApartmentItem from "./ApartmentItem";
import styles from "./ApartmentList.module.css";
import WelcomeMessage from "./WelcomeMessage";
import Pagination from "./Pagination";

const APARTMENTS_PER_PAGE = 5;

function ApartmentList() {
  const { apartments } = useApartments();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = APARTMENTS_PER_PAGE;

  const indexOfLastApartment = (currentPage + 1) * itemsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - itemsPerPage;

  const currentApartments = apartments.slice(
    indexOfFirstApartment,
    indexOfLastApartment
  );

  const totalPageCount = Math.ceil(apartments.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!apartments.length)
    return (
      <WelcomeMessage message="Click on the map to nest your first apartment!" />
    );

  return (
    <>
      <ul className={styles.apartmentList}>
        {currentApartments.map((apartment) => (
          <ApartmentItem apartment={apartment} key={apartment.id} />
        ))}
      </ul>
      <Pagination pageCount={totalPageCount} onPageChange={handlePageChange} />
    </>
  );
}

export default ApartmentList;
