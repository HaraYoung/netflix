import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Routes/Home";
import TvProgram from "./Routes/TvProgram";
import Search from "./Routes/Search";
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
        <Route path="search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
