
// import './InteractiveMap.css'

// // Fix the default icon issue with React-Leaflet
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const InteractiveMap = () => {
//   const aaupPosition = [32.4598, 35.3008]; // Coordinates for Arab American University

//   return (
//     <MapContainer center={aaupPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={aaupPosition}>
//         <Popup>
//           Arab American University <br /> Jenin, Palestine.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default InteractiveMap;

import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import './InteractiveMap.css';

// Fix the default icon issue with React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const InteractiveMap = () => {
  const aaupPosition = [32.4598, 35.3008]; // Coordinates for Arab American University

  // Custom marker icon using react-icons
  const customMarkerIcon = L.divIcon({
    html: renderToString(<FaMapMarkerAlt style={{ color:"rgb(67, 147, 167) " , fontSize: "30px" }} />),
    className: "",
  });

  return (
    <MapContainer center={aaupPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={aaupPosition} icon={customMarkerIcon}>
        <Popup>
          Arab American University <br /> Jenin, Palestine.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default InteractiveMap;
