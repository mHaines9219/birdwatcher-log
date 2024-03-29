import { useState } from 'react';
import axios from 'axios';
import './CreateBird.css';
import { Link, useNavigate } from 'react-router-dom';
import HomeIconComp from '../../components/HomeIconComp';
export default function CreateBird() {
  const [birdName, setBirdName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [notes, setNotes] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', birdName);
    formData.append('scientificName', scientificName);
    formData.append('notes', notes);
    formData.append('imageUrl', imageUrl);

    axios
      .post('http://localhost:5001/birds/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('LOOKING FOR RESPONSE ----- >', res);
        navigate('/birds');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate('/birds');
      });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post('http://localhost:5001/birds/create', {
  //       name: birdName,
  //       scientificName: scientificName,
  //       notes: notes,
  //       imageUrl: imageUrl,
  //     })
  //     .then((res) => {
  //       console.log('LOOKING FOR RESPONSE ----- >', res);
  //       navigate('/');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       navigate('/');
  //     });
  // };
  return (
    <>
      <div className="top-page">
        <Link to="/birds">
          <HomeIconComp />
        </Link>
        <h1 id="create-header">Log a Bird Sighting</h1>
      </div>
      <form
        id="create-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          id="birdName"
          type="text"
          placeholder="Bird Name"
          value={birdName}
          onChange={(e) => setBirdName(e.target.value)}
        />
        <input
          id="scientificName"
          type="text"
          placeholder="Scientific Name"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        />
        <textarea
          id="notes"
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <label htmlFor="image-url" id="image-url-wrapper">
          ADD PHOTO
          <input
            type="file"
            id="image-url"
            name="imageUrl"
            style={{ display: 'none' }}
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </label>
        {/* Ensure the button is of type submit to semantically indicate its purpose */}
        <button id="submit-btn" type="submit">
          CREATE
        </button>
      </form>
    </>
  );
}
