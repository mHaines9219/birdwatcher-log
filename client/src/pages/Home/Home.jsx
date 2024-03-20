import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

// import required modules
import { FreeMode, Navigation } from 'swiper/modules';

export default function Home({ setBirds, birds }) {
  Home.propTypes = {
    birds: PropTypes.array.isRequired,
    setBirds: PropTypes.func.isRequired,
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Fetch birds data
    axios
      .get('http://localhost:5001/birds')
      .then((res) => {
        console.log(res.data.birds);
        setBirds(res.data.birds);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });

    // Cleanup resize listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogout = () => {
    navigate('/login');
  };
  if (!isLoaded) {
    return (
      <>
        {' '}
        <h1 className="welcome-header">BIRD JOURNAL</h1>
        <div className="swiper-wrapper">
          <div className="spinner">Loading...</div>
        </div>
      </>
    ); // This is where you show the spinner
  }
  return (
    <>
      <div className="main-header">
        <div className="header-center">
          <h1 className="welcome-header">BIRD JOURNAL</h1>
        </div>
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="swiper-wrapper">
        <Swiper
          slidesPerView={isMobile ? 2 : 3} // Conditional based on isMobile state
          spaceBetween={30}
          className="mySwiper"
          freeMode={true}
          speed={500}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, FreeMode]}
          style={{
            '--swiper-pagination-color': '#FFBA08',
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '16px',
            '--swiper-pagination-bullet-horizontal-gap': '6px',
          }}
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
      </div>

      <div className="log-btn-wrapper">
        <Link id="log-btn" to={'/birds/create'}>
          Log a Bird Sighting
        </Link>
      </div>
    </>
  );
}
