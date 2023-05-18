import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Back } from '../login/index.jsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/back" element={<Back />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;
