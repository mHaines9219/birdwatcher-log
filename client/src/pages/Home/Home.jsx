import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Home({ setBirds, birds }) {
  Home.propTypes = {
    birds: PropTypes.array.isRequired,
    setBirds: PropTypes.func.isRequired,
  };

  useEffect(() => {
    axios
      .get('http://localhost:5001/birds')
      .then((res) => {
        setBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Bird Journal</h1>
      <br></br>
      {birds.map((bird, index) => (
        <div key={index}>
          <Link to={`/birds/details/${bird._id}`}>{bird.name}</Link>
        </div>
      ))}

      <div>
        <Link to={'/birds/create'}>Log a Bird Sighting</Link>
      </div>
    </>
  );
}
