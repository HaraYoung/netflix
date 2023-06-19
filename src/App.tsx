import React from "react";
import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";

import Header from "./Components/Header";
import Home from "./Routes/Home";
import TvProgram from "./Routes/TvProgram";

function App() {
  return (
    <div style={{height: '200vh'}}>
      <Reset />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tv" element={<TvProgram />} />
      </Routes>
    </div>
  );
}

export default App;
