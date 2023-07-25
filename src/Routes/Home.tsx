import React from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { IGetMoviesResult, getMovies, getMovieTopRated } from "../api";
import { makeImagePath } from "../utils";
import TypeContext from "../context";

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
  .info-btn {
    width: 15%;
    padding: 0.5em;
    margin-top: 1.5em;
    font-size: 14px;
    background-color: rgba(128, 128, 128, 0.8);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: rgba(128, 128, 128, 0.3);
    }
    svg {
      margin-right: 0.5em;
    }
  }
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
  line-height: 1.2;
  word-break: keep-all;
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
  const { data: popular } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getMovies
  );
  const { data: topRated } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getMovieTopRated
  );

  const [type, setType] = React.useState("");

  const typeContextValue = {
    type,
    setType,
  };
  const navigate = useNavigate();

  const onOverlayClick = () => {
    navigate("/");
    setType("");
  };

  const onClickMainInfo = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setType("nowPlaying");
  };
  const moviePathMatch = useMatch(`/movies/:movieId`);

  const params = useParams();
  const movieId = params.movieId || "";

  return (
    <TypeContext.Provider value={typeContextValue}>
      <Wrapper>
        {nowPlayingLoading ? (
          <div>Loading...</div>
        ) : (
          nowPlaying && (
            <>
              <Banner
                $bgPhoto={makeImagePath(
                  nowPlaying.results[0].backdrop_path ||
                    nowPlaying.results[0].poster_path ||
                    ""
                )}
              >
                <Title>{nowPlaying.results[0].title}</Title>
                <Overview>{nowPlaying.results[0].overview}</Overview>
                <motion.button
                  className="info-btn"
                  onClick={() => onClickMainInfo(nowPlaying.results[0].id)}
                  layoutId={nowPlaying.results[0].id + "nowPlaying"}
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  상세 정보
                </motion.button>
              </Banner>
              {nowPlaying && (
                <SliderArea>
                  <CategoryTitle>현재 상영중인 영화</CategoryTitle>
                  <Slider movieData={nowPlaying} type="nowPlaying" />
                </SliderArea>
              )}
              {popular && (
                <SliderArea>
                  <CategoryTitle>인기 영화</CategoryTitle>
                  <Slider movieData={popular} type="popular" />
                </SliderArea>
              )}
              {topRated && (
                <SliderArea>
                  <CategoryTitle>평점 높은 영화</CategoryTitle>
                  <Slider movieData={topRated} type="topRated" />
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
          )
        )}
      </Wrapper>
    </TypeContext.Provider>
  );
};

export default Home;
