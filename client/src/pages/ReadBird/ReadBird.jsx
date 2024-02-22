import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ReadBird.css';
export default function ReadBird() {
  const { id } = useParams();
  const [currentBird, setCurrentBird] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5001/birds/details/${id}`)
      .then((res) => {
        setCurrentBird(res.data.birdById); // Set the single bird's details
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Add id as a dependency

  return (
    <>
      <div className="top-page">
        <Link to={`/`}>Home</Link>
        <h1 id="read-header">BIRD DETAILS</h1>
      </div>
      <div className="read-page-wrapper">
        <div className="read-page-container">
          <div className="left-grid-col">
            <span id="photo">PHOTO</span>
          </div>
          <div className="right-grid-col">
            <div className="bird-detail-header-wrapper">
              <span className="bird-detail-header-span">NAME</span>
              <div id="bird-name">{currentBird.name}</div>
            </div>
            <div className="bird-detail-header-wrapper">
              <span className="bird-detail-header-span">SCIENTIFIC NAME</span>
              <div id="bird-sci-name">{currentBird.scientificName}</div>
            </div>
            <div className="bird-detail-header-wrapper">
              <span className="bird-detail-header-span">NOTES</span>
              <div id="bird-notes">{currentBird.notes}</div>
            </div>
            <div className="link-container">
              <Link to={`/birds/details/update/${id}`}>Edit</Link>
              <Link to={`/birds/details/delete/${id}`}>Delete</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ); // Display property of the single bird
}
