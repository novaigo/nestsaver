import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

import { useApartments } from "../context/ApartmentsContext";
import styles from "./Apartment.module.css";

function Apartment() {
  const { id } = useParams();
  const { getApartment, currentApartment } = useApartments();

  useEffect(
    function () {
      getApartment(id);
    },
    [id, getApartment]
  );

  const {
    address,
    budget,
    bedrooms,
    balcony,
    apartmentCondition,
    apartmentSize,
    utilitiesCost,
    deposit,
    notes,
    parking,
    publicTransport,
    petsAllowed,
    grocery,
    userRating,
  } = currentApartment;

  return (
    <div className={styles.apartment}>
      <div className={styles.row}>
        <h1>
          <span className={styles.monthlyPrice}>{budget}</span>
          <span className={styles.monthlyPriceCur}>€/mo</span>
        </h1>
      </div>
      <div className={styles.row}>
        <h3>{address}</h3>
      </div>
      <div className={styles.apartmentInner}>
        <div className={styles.apartmentContent}>
          <p> Bedrooms </p>
          <h3>{bedrooms} bd.</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Area </p>
          <h3>{apartmentSize ? `${apartmentSize} m²` : "-"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Balcony </p>
          <h3>{balcony ? "Yes" : "No"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Parking </p>
          <h3>{parking ? "Yes" : "No"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Condition </p>
          <h3>{apartmentCondition}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Pet friendly </p>
          <h3>{petsAllowed ? "Yes" : "No"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Grocery nearby </p>
          <h3>{grocery ? "Yes" : "No"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p> Public Transport </p>
          <h3>{publicTransport ? "Yes" : "No"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p>Utility costs</p>
          <h3>{utilitiesCost ? `${utilitiesCost} €/mo` : "-"}</h3>
        </div>
        <div className={styles.apartmentContent}>
          <p>Required deposit</p>
          <h3>{deposit ? `${deposit} €` : "-"}</h3>
        </div>
      </div>
      {notes && <div className={styles.notesContent}>{notes}</div>}
      <div className={styles.back}>
        <h2>{userRating || 0}/ 10</h2>
        <BackButton />
      </div>
    </div>
  );
}

export default Apartment;
