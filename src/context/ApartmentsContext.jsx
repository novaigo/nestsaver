import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

const initialState = {
  apartments: [],
  isLoading: false,
  currentApartment: {},
  error: "",
};

const BASE_URL = "https://apartments-5fbs.onrender.com";

const ApartmentsContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "apartments/loaded":
      return {
        ...state,
        isLoading: false,
        apartments: action.payload,
      };

    case "apartment/loaded":
      return { ...state, isLoading: false, currentApartment: action.payload };

    case "apartment/created":
      return {
        ...state,
        isLoading: false,
        apartments: [...state.apartments, action.payload],
        currentApartment: action.payload,
      };

    case "apartment/deleted":
      return {
        ...state,
        isLoading: false,
        apartments: state.apartments.filter(
          (apartments) => apartments.id !== action.payload
        ),
        currentApartment: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function ApartmentsProvider({ children }) {
  const [{ apartments, isLoading, currentApartment, error }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchApartments() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/apartments`);
        const data = await res.json();
        dispatch({ type: "apartments/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading apartments...",
        });
      }
    }
    fetchApartments();
  }, []);

  async function createApartment(newApartment) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/apartments`, {
        method: "POST",
        body: JSON.stringify(newApartment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      dispatch({ type: "apartment/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the apartment",
      });
    }
  }

  async function deleteApartment(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/apartments/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "apartment/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the apartment...",
      });
    }
  }

  const getApartment = useCallback(
    async function getApartment(id) {
      if (id === currentApartment.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/apartments/${id}`);
        const data = await res.json();
        dispatch({ type: "apartment/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading this apartment",
        });
      }
    },
    [currentApartment.id]
  );

  return (
    <ApartmentsContext.Provider
      value={{
        apartments,
        isLoading,
        currentApartment,
        error,
        createApartment,
        deleteApartment,
        getApartment,
      }}
    >
      {children}
    </ApartmentsContext.Provider>
  );
}

function useApartments() {
  const context = useContext(ApartmentsContext);
  if (context === undefined)
    throw new Error(
      "ApartmentsContext was used outside the ApartmentsProvider"
    );
  return context;
}

export { ApartmentsProvider, useApartments };
