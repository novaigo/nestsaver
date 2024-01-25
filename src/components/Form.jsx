import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useApartments } from "../context/ApartmentsContext";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import WelcomeMessage from "./WelcomeMessage";
import StarRating from "./StarRating";

const BASE_URL = "https://api.geoapify.com/v1/geocode/";
const API_KEY = "ad408383da304cc4b24b773402982715";

const options = {
  method: "GET",
};

const initalState = {
  isLoadingGeocoding: false,
  geocodingError: "",
  address: "",
  street: "",
  district: "",
  apartmentSize: "",
  budget: "",
  apartmentCondition: "New",
  bedrooms: 1,
  utilitiesCost: "",
  deposit: "",
  leaseDuration: 12,
  notes: "",
  publicTransport: false,
  parking: false,
  balcony: false,
  petsAllowed: false,
  grocery: false,
  userRating: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "app/field":
      return { ...state, [action.field]: action.payload };
    case "app/loading":
      return { ...state, isLoadingGeocoding: action.payload };
    case "app/error":
      return { ...state, geocodingError: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function Form() {
  const [
    {
      isLoadingGeocoding,
      geocodingError,
      address,
      street,
      district,
      apartmentSize,
      budget,
      apartmentCondition,
      bedrooms,
      utilitiesCost,
      deposit,
      leaseDuration,
      notes,
      publicTransport,
      parking,
      balcony,
      petsAllowed,
      grocery,
      userRating,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createApartment } = useApartments();

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchAddress() {
        try {
          dispatch({ type: "app/loading", payload: true });
          dispatch({ type: "app/error", payload: "" });

          const res = await fetch(
            `${BASE_URL}reverse?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`,
            options
          );

          if (!res.ok) return;

          const data = await res.json();

          if (!data.features)
            throw new Error(
              `That doesn't seem to be a valid address! Click somewhere else!`
            );

          dispatch({
            type: "app/field",
            field: "address",
            payload: data.features[0]?.properties.formatted || "",
          });
          dispatch({
            type: "app/field",
            field: "street",
            payload: data.features[0]?.properties.address_line1 || "",
          });
          dispatch({
            type: "app/field",
            field: "district",
            payload: data.features[0]?.properties.district || "",
          });
        } catch (err) {
          dispatch({ type: "app/error", payload: err.message });
        } finally {
          dispatch({ type: "app/loading", payload: false });
        }
      }
      fetchAddress();
    },
    [lat, lng]
  );

  function handleFieldChange(field, payload) {
    dispatch({ type: "app/field", field, payload });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!address || !budget) return;

    const newApartment = {
      address,
      street,
      district,
      bedrooms,
      apartmentSize,
      apartmentCondition,
      budget,
      utilitiesCost,
      deposit,
      leaseDuration,
      notes,
      userRating,
      publicTransport,
      parking,
      balcony,
      petsAllowed,
      grocery,
      position: { lat, lng },
    };
    await createApartment(newApartment);
    navigate("/app/apartments");
  }

  if (!lat & !lng)
    return (
      <WelcomeMessage message="Start by clicking on map to nest your first apartment" />
    );

  if (geocodingError) return <WelcomeMessage message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.column}>
        <div className={styles.row}>
          <label htmlFor="address">*Address</label>
          <input
            className={styles.formInput}
            id="address"
            onChange={(e) => handleFieldChange("address", e.target.value)}
            value={address}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="budget">*Rent (€/mo)</label>
          <input
            required
            className={styles.formInput}
            id="monthlyCost"
            onChange={(e) => handleFieldChange("budget", e.target.value)}
            value={budget}
          />
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.rowup}>
          <div className={styles.halfrow}>
            <label htmlFor="size">Condition</label>
            <select
              className={styles.formInput}
              id="apartmentCondition"
              onChange={(e) =>
                handleFieldChange("apartmentCondition", e.target.value)
              }
              value={apartmentCondition}
            >
              <option value="New">New</option>
              <option value="Fair">Fair</option>
              <option value="Revitalize">Revitalize</option>
            </select>
          </div>
          <div className={styles.halfrow}>
            <label htmlFor="leaseDuration">Bedrooms</label>
            <select
              className={styles.formInput}
              id="numberOfBedrooms"
              onChange={(e) => handleFieldChange("bedrooms", e.target.value)}
              value={bedrooms}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
        <div className={styles.rowup}>
          <div className={styles.halfrow}>
            <label htmlFor="size">
              Apartment Size (m<sup>2</sup>)
            </label>
            <input
              className={styles.formInput}
              id="apartmentSize"
              onChange={(e) =>
                handleFieldChange("apartmentSize", e.target.value)
              }
              value={apartmentSize}
            />
          </div>
          <div className={styles.halfrow}>
            <label htmlFor="leaseDuration">Lease Duration (mo)</label>
            <input
              className={styles.formInput}
              id="leaseDuration"
              onChange={(e) =>
                handleFieldChange("leaseDuration", e.target.value)
              }
              value={leaseDuration}
            />
          </div>
        </div>
        <div className={styles.rowup}>
          <div className={styles.halfrow}>
            <label htmlFor="utilitiesCost">Utility cost (€/mo)</label>
            <input
              className={styles.formInput}
              id="utilitiesCost"
              onChange={(e) =>
                handleFieldChange("utilitiesCost", e.target.value)
              }
              value={utilitiesCost}
            />
          </div>
          <div className={styles.halfrow}>
            <label htmlFor="deposit">Deposit (€)</label>
            <input
              className={styles.formInput}
              id="depositAmount"
              onChange={(e) => handleFieldChange("deposit", e.target.value)}
              value={deposit}
            />
          </div>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.row}>
          <label htmlFor="address">Your rating:</label>
          <div className={styles.yourRating}>
            <StarRating
              onSetRating={(rating) => handleFieldChange("userRating", rating)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="notes">Personal Notes</label>
          <textarea
            className={styles.formInput}
            id="notes"
            rows="1"
            onChange={(e) => handleFieldChange("notes", e.target.value)}
            value={notes}
          />
        </div>
        <div className={styles.checkboxup}>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="parking"
                onChange={(e) => handleFieldChange("parking", e.target.checked)}
                checked={parking}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="grocery"
                onChange={(e) => handleFieldChange("grocery", e.target.checked)}
                checked={grocery}
              />
              <label htmlFor="grocery">Grocery</label>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="balcony"
                onChange={(e) => handleFieldChange("balcony", e.target.checked)}
                checked={balcony}
              />
              <label htmlFor="balcony">Balcony</label>
            </div>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="petsAllowed"
                onChange={(e) =>
                  handleFieldChange("petsAllowed", e.target.checked)
                }
                checked={petsAllowed}
              />
              <label htmlFor="petsAllowed">Pets</label>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="publicTransport"
                onChange={(e) =>
                  handleFieldChange("publicTransport", e.target.checked)
                }
                checked={publicTransport}
              />
              <label htmlFor="publicTransport">Public Transport</label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.btn}>
          <BackButton />
          <Button type="nest" onClick={handleSubmit}>
            Nest
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
