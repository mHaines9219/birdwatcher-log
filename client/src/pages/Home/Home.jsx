import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
export default function Home() {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5001/birds')
      .then((res) => {
        setBirds(res.data.birds);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {birds.map((bird, index) => (
        <div key={index}>
          <Link to={`/bird/${bird._id}`}>{bird.name}</Link>
        </div>
      ))}
    </>
  );
}
