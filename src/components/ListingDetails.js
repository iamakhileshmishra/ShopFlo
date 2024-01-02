// // src/components/ListingDetails.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./ListingDetails.css"; // Import the CSS file

// const ListingDetails = () => {
//   const { id } = useParams();
//   const [listing, setListing] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings/${id}`
//         );
//         setListing(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div className="listing-details-container">
//       {listing && (
//         <div className="listing-details">
//           <img src={listing.imageURL} alt="Listing" className="listing-image" />
//           <div className="listing-info">
//             <h2 className="listing-name">{listing.name}</h2>
//             <p className="listing-description">{listing.description}</p>
//             <p className="listing-price">Price: ${listing.price}</p>
//             <p className="listing-listed-by">Listed By: {listing.listedBy}</p>
//             <p className="listing-location">
//               Location: {listing.latitude}, {listing.longitude}
//             </p>
//             <p className="listing-listed-on">Listed On: {listing.listedOn}</p>
//             <p className="listing-zipcode">Zipcode: {listing.zipcode}</p>
//             <p className="listing-status">Status: {listing.status}</p>
//             <button className="book-now-button">Book Now</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListingDetails;


// src/components/ListingDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./ListingDetails.css";
import "leaflet/dist/leaflet.css"
const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings/${id}`
        );
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
// const position = [51.505, -0.09];
  return (
    <div className="listing-details-container">
      {listing && (
        <div className="listing-details">
          <img src={listing.imageURL} alt="Listing" className="listing-image" />
          <div className="listing-info">
            <h2 className="listing-name">{listing.name}</h2>
            <p className="listing-description">{listing.description}</p>
            <p className="listing-price">Price: ${listing.price}</p>
            <p className="listing-listed-by">Listed By: {listing.listedBy}</p>
            <p className="listing-location">
              Location: {listing.latitude}, {listing.longitude}
            </p>
            <p className="listing-listed-on">Listed On: {listing.listedOn}</p>
            <p className="listing-zipcode">Zipcode: {listing.zipcode}</p>
            <p className="listing-status">Status: {listing.status}</p>
            <button className="book-now-button">Book Now</button>
          </div>
        </div>
      )}

      {/* {listing && (
        <div className="map-container">
          <h3>Location on Map</h3>
          <MapContainer
            center={[listing.latitude, listing.longitude]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[listing.latitude, listing.longitude]}>
              <Popup>{listing.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )} */}
    </div>
  );
};

export default ListingDetails;
