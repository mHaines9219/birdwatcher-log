import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateBird from './pages/CreateBird/CreateBird';
import ReadBird from './pages/ReadBird/ReadBird';
import DeleteBird from './pages/DeleteBird/DeleteBird';
import UpdateBird from './pages/UpdateBird/UpdateBird';
import Home from './pages/Home/Home';
import './index.css';

export default function App() {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home birds={birds} setBirds={setBirds} />} />
      <Route path="/birds/create" element={<CreateBird />} />
      <Route
        path="/birds/details/:id"
        element={<ReadBird birds={birds} setBirds={setBirds} />}
      />
      <Route path="/birds/details/delete/:id" element={<DeleteBird />} />
      <Route path="/birds/details/update/:id" element={<UpdateBird />} />
    </Routes>
  );
}
