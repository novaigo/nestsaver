import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useGeolocation } from "../hooks/useGeolocation";
import { useApartments } from "../context/ApartmentsContext";

import Button from "./Button";

function Map() {
  const { apartments } = useApartments();

  const [mapPosition, setMapPosition] = useState([48.2083889, 16.3715917]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={14}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=LmywxfKdtxRzlcXUFoPdz7b49LFGD80hYb2wqI5m3Dir79Hv8Aim81f2lsIMw72o"
          attribution=""
        />
        {apartments.map((apartment) => (
          <Marker
            position={[apartment.position.lat, apartment.position.lng]}
            key={apartment.id}
          >
            <Popup>
              {apartment.budget} €/mo, {apartment.address}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
