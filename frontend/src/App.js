import logo from './logo.svg';
import './App.css';
import { Route, Routes, Switch } from 'react-router-dom';
import React from 'react';
import AsignTable from './components/AsignTable.js';

function App() {
  return (
    <>
      <Routes>
        <Route  path='/asigntable' element={<AsignTable />} />
      </Routes>
    </>
  );
}

export default App;
