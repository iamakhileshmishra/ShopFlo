// src/components/Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Home = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings?page=${currentPage}&limit=4`
        );
        setListings(response.data);
        setTotalPages(response.headers["x-total-pages"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* Left side for an image (adjust width and height accordingly) */}
      <div style={{ width: "50%", minHeight: "300px", background: "#f0f0f0" }}>
        <MapContainer
          center={[48.8589633, 2.1822227]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {listings.map((listing, index) => (
            <Marker position={[listing.latitude, listing.longitude]}>
              <Popup>{listing.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Right side for cards */}
      <div style={{ width: "50%", display: "flex", flexWrap: "wrap" }}>
        {listings.map((listing, index) => (
          <div key={listing.id} style={{ padding: "10px", width: "50%" }}>
            <Link
              to={`/listing/${listing.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                  minHeight: "150px",
                }}
              >
                <img
                  src={listing.imageURL}
                  alt="img"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    marginBottom: "10px",
                  }}
                ></img>
                <h2>{listing.name}</h2>
                <p>{listing.description}</p>
                <p>Price: ${listing.price}</p>
              </div>
            </Link>
          </div>
        ))}

        <div style={{ width: "100%", textAlign: "center" }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
