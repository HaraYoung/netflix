import React from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { IGetMoviesResult, getMovies, getMovieTopRated } from "../api";
import { makeImagePath } from "../utils";

import MovieBox from "../Components/MovieBox";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: #181818;
  padding-bottom: 50px;
`;
const Banner = styled.div<{ $bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 30em;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(25, 25, 25, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;
const SliderArea = styled.div`
  position: relative;
`;
const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;
const CategoryTitle = styled.h2`
  font-size: 2em;
  padding: 0.5em;
  margin-top: 1em;
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
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  // const { data : nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", type],
  //   getMovies
  // );
  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getMovieTopRated);

  const navigate = useNavigate();

  const onOverlayClick = () => navigate("/");

  const moviePathMatch = useMatch(`/movies/:movieId`);

  const params = useParams();
  const movieId = params.movieId || "";

  return (
    <>
      <Wrapper>
        {nowPlayingLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Banner
              $bgPhoto={makeImagePath(
                nowPlaying?.results[0].backdrop_path ||
                  nowPlaying?.results[0].poster_path ||
                  ""
              )}
            >
              <Title>{nowPlaying?.results[0].title}</Title>
              <Overview>{nowPlaying?.results[0].overview}</Overview>
            </Banner>
            {nowPlaying && (
              <SliderArea>
                <CategoryTitle>현재 상영중인 영화</CategoryTitle>
                <Slider movieData={nowPlaying} type='nowPlaying'/>
              </SliderArea>
            )}
            <SliderArea>
              <CategoryTitle>인기 영화</CategoryTitle>
              {/* <Slider movieData="popular" /> */}
            </SliderArea>
            {topRated && (
              <SliderArea>
                <CategoryTitle>평점 높은 영화</CategoryTitle>
                <Slider movieData={topRated} type='topRated'/>
              </SliderArea>
            )}

            <AnimatePresence key="movieBox">
              {moviePathMatch && (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <MovieBox movieId={movieId} />
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
