import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ReadBird.css';
import HomeIconComp from '../../components/HomeIconComp';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

export default function ReadBird() {
  const { id } = useParams();
  const [currentBird, setCurrentBird] = useState({});

  const navigate = useNavigate();
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

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5001/birds/details/delete/${id}`)
      .then(() => {
        alert('Bird Deleted');
        navigate('/birds');
      })

      .catch((err) => {
        console.log(err);
      });
  }; // Add id as a dependency

  return (
    <>
      <div className="top-page">
        <Link to={`/birds`}>
          <HomeIconComp />
        </Link>
        <h1 id="read-header">BIRD DETAILS</h1>
      </div>
      <div className="read-page-wrapper">
        <div className="read-page-container">
          <div className="left-grid-col">
            <img
              id="photo"
              src={`http://localhost:5001/${currentBird.imageUrl}`}
              alt="Bird"
              style={
                {
                  // width: '100%',
                  // height: '100%',
                  // // objectFit: 'cover',
                }
              }
            />{' '}
          </div>

          <div className="right-side-wrapper">
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
            </div>
            <div className="link-container">
              <Link id="edit-btn" to={`/birds/details/update/${id}`}>
                <EditIcon />
              </Link>
              {/* <Link id="delete-btn" to={`/birds/details/delete/${id}`}>
                <ClearIcon />
              </Link> */}
              <button id="delete-btn" onClick={handleDelete}>
                <ClearIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
