import React from "react";
import "./ShowOnMap.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function ShowOnMap({ address }) {
  function handleCoordinates(address) {
    const latLng = [
      address.geometry.location.lat,
      address.geometry.location.lng,
    ];

    return latLng;
  }
  return (
    <MapContainer center={handleCoordinates(address)} zoom={16}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={handleCoordinates(address)} />
    </MapContainer>
  );
}
