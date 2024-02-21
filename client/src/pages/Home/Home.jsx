import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Home.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

export default function Home({ setBirds, birds }) {
  Home.propTypes = {
    birds: PropTypes.array.isRequired,
    setBirds: PropTypes.func.isRequired,
  };

  useEffect(() => {
    axios
      .get('http://localhost:5001/birds')
      .then((res) => {
        console.log(res.data.birds);
        setBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="welcome-header">Bird Journal</h1>
      <br></br>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {birds.map((bird, index) => (
          <SwiperSlide className="swiper-card" key={index}>
            <Link className="card-link" to={`/birds/details/${bird._id}`}>
              <h3 className="bird-name-header">{bird.name}</h3>
              <h5 className="bird-sci-name">{bird.scientificName}</h5>
              <p className="bird-date">
                {new Date(bird.createdAt).toLocaleDateString('en-US')}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <Link to={'/birds/create'}>Log a Bird Sighting</Link>
      </div>
    </>
  );
}
