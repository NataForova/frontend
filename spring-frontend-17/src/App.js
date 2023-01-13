import './App.css';

import * as React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Main from "./componets/Main";
import UpdateBook from "./componets/UpdateBook";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Main/>}/>
            <Route path='edit/:id' element={<UpdateBook />} />
        </Routes>
      </BrowserRouter>);
}
export default App;
