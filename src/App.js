import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countries from "./Countries";
import Header from "./Header";
import Filter from "./Filter";
import Country from "./Country";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={
          <>
            
            <Countries/>
          </>
        } />
        <Route path="/Countries/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
