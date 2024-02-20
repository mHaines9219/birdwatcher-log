import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
      <div>
        {currentBird.name}
        {currentBird.updatedAt}
        <Link to={`/birds/details/update/${id}`}>Edit</Link>
        <Link to={`/birds/details/delete/${id}`}>Delete</Link>
        <Link to={`/`}>Home</Link>
      </div>
    </>
  ); // Display property of the single bird
}
