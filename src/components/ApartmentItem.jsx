import { Link } from "react-router-dom";
import styles from "./ApartmentItem.module.css";
import { useApartments } from "../context/ApartmentsContext";

function ApartmentItem({ apartment }) {
  const { deleteApartment } = useApartments();
  const { street, district, budget, id, position } = apartment;

  function handleClick(e) {
    e.preventDefault();
    deleteApartment(id);
  }

  return (
    <li className={styles.apartmentList}>
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <div className={styles.apartmentListItems}>
          <div>
            <h3>
              {street}, {district}
            </h3>
            <h5 className={styles.budget}>{budget} €/mo</h5>
          </div>
          <div className={styles.btns}>
            <button className={styles.btn} onClick={handleClick}>
              <p className={styles.deleteBtn}>&times;</p>
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ApartmentItem;
