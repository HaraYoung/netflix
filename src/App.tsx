import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Routes/Home";
import TvProgram from "./Routes/TvProgram";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tv" element={<TvProgram />} />
      </Routes>
    </>
  );
}

export default App;
