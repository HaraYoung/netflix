import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Routes/Home";
import TvProgram from "./Routes/TvProgram";
import MovieBox from "./Components/MovieBox";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movies/:movieId" element={<MovieBox movieId=""/>} />
        </Route>
        <Route path="tv" element={<TvProgram />} />
      </Routes>
    </>
  );
}

export default App;
