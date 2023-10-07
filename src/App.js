import React from 'react';
import './App.css';

//pages
import Home from './pages/Home';
import Detail from './pages/Detail';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/">
          <Route index element={<Home />} />
          <Route path='/cocktail/:id' element={<Detail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
