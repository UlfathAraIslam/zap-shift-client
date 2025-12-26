import React, { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

/* =========================
   FIX LEAFLET ICON ISSUE
========================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* =========================
   MAP CONTROLLER COMPONENT
   (Handles zoom + move)
========================= */
const FlyToDistrict = ({ target }) => {
  const map = useMap();

  if (target) {
    map.flyTo([target.latitude, target.longitude], 11, {
      duration: 1.5,
    });
  }

  return null;
};

const BangladeshMap = ({ serviceCenters = [] }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const markerRefs = useRef({});

  const bangladeshPosition = [23.685, 90.3563];

  /* =========================
     SEARCH HANDLER
  ========================= */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const found = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(value.toLowerCase())
    );

    if (found) {
      setSelectedDistrict(found);

      // Open popup automatically
      setTimeout(() => {
        markerRefs.current[found.district]?.openPopup();
      }, 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* =========================
         SEARCH BOX
      ========================= */}
      <input
        type="text"
        placeholder="Search district (e.g. Dhaka, Sylhet)"
        className="input input-bordered w-full"
        value={searchText}
        onChange={handleSearch}
      />

      <div className="rounded-xl overflow-hidden shadow-lg border">
        <MapContainer
          center={bangladeshPosition}
          zoom={14}
          scrollWheelZoom={true}
          className="h-[800px] w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* MOVE MAP TO SEARCHED DISTRICT */}
          <FlyToDistrict target={selectedDistrict} />

          {/* =========================
             DISTRICT MARKERS
          ========================= */}
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              ref={(ref) =>
                (markerRefs.current[center.district] = ref)
              }
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold">{center.district}</h3>
                  <p>Region: {center.region}</p>
                  <p className="mt-1">
                    <span className="font-semibold">Covered Areas:</span>
                    <br />
                    {center.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
