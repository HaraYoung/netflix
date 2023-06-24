import React from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { IGetMoviesResult, getMovies } from "../api";
import { makeImagePath } from "../utils";

import MovieBox from "../Components/MovieBox";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 50px;
`;
const Banner = styled.div<{ $bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 30em;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 1em;
  width: 50%;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const navigate = useNavigate();

  const onOverlayClick = () => navigate("/");

  const moviePathMatch = useMatch(`/movies/:movieId`);

  const params = useParams();
  const movieId = params.movieId || "";

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Banner
              $bgPhoto={makeImagePath(
                data?.results[0].backdrop_path ||
                  data?.results[0].poster_path ||
                  ""
              )}
            >
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Title>현재 상영중인 영화</Title>
            <Slider />
            <AnimatePresence key="movieBox">
              {moviePathMatch && (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <MovieBox movieId={movieId}/>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
