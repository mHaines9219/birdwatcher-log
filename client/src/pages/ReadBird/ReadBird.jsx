import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ReadBird({ setBirds, birds }) {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/birds/details/${id}`)
      .then((res) => {
        setBirds(res.data.birdById); // Set the single bird's details
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Add id as a dependency

  return (
    <>
      <div>
        {birds.name}
        {birds.updatedAt}
      </div>
    </>
  ); // Display property of the single bird
}
