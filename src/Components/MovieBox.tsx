import React, { useContext } from "react";
import { motion, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCirclePlus,
  faPlay,
  faCircleXmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { IGetMovieDetail, getMovieDetailKo, getMovieDetailEn } from "../api";
import { makeImagePath } from "../utils";
import TypeContext from "../context";

const BoxContainer = styled(motion.div)`
  background-color: #181818;
  width: 80vw;
  height: 80vh;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 999;
  border-radius: 15px;
`;
const BoxBgImg = styled.div<{ $bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(24, 24, 24, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 50%;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;
const ExitIcon = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: 0.5s;
  }
`;
const BoxContent = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  left: 5%;
  img {
    width: 250px;
  }
`;
const Title = styled.div`
  div {
    &:first-child {
      font-size: 1.7em;
      font-weight: bold;
    }
    &:last-child {
      font-size: 1.2em;
      margin-top: 0.5em;
      margin-left: 0.2em;
    }
  }
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 0.7em;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
      transition: 0.5s;
    }
  }
  .player {
    background-color: white;
    padding: 6px 15px;
    border-radius: 4px;
    span,
    svg {
      color: black;
    }
    svg {
      padding-right: 5px;
    }
  }
`;
const GenreContainer = styled.div`
  margin: 1.5em 0;
`;
const Genre = styled.span`
  padding: 0.2em 0.4em;
  background-color: white;
  color: black;
  margin: 0 0.2em;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bolder;
`;
const MovieInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 1em 0;
  margin-left: 0.2em;
`;
const VoteAverage = styled.div`
  font-weight: bold;
  background-color: rgba(128, 128, 128, 0.8);
  padding: 0.4em;
  border-radius: 4px;
  svg {
    margin-right: 0.3em;
    color: yellow;
  }
`;
const ReleaseDate = styled.div`
  font-weight: bold;
  background-color: rgba(128, 128, 128, 0.8);
  color: white;
  padding: 0.4em;
  border-radius: 4px;
`;
const RunTime = styled.div`
  font-weight: bold;
  background-color: rgba(128, 128, 128, 0.8);
  color: white;
  padding: 0.4em;
  border-radius: 4px;
`;
const Tagline = styled.div`
  margin: 0.5em 0;
  font-size: 18px;
  span {
    padding: 0 0.1em;
    background-color: rgba(128, 128, 128, 1);
    margin-right: 0.5em;
  }
`;
const Overview = styled.div`
  line-height: 1.2;
  word-break: keep-all;
  margin-top: 1em;
`;
const PosterImg = styled.div`
  margin: 1em;
  img {
    border-radius: 10px;
  }
`;

const MovieBox = ({ movieId }: { movieId: string }) => {
  const [isVideo, setIsVideo] = React.useState(false);
  const { scrollY } = useScroll();

  const { data: movie_ko, isLoading: isLoading_ko } = useQuery<IGetMovieDetail>(
    ["movies_ko", "details_ko"],
    () => getMovieDetailKo(movieId),
    {
      enabled: !!movieId,
    }
  );

  //한국어 tagline, overview가 없는 경우 사용할 영문 데이터
  const { data: movie_en } = useQuery<IGetMovieDetail>(
    ["movies_en", "details_en"],
    () => getMovieDetailEn(movieId),
    {
      enabled: !!movieId,
    }
  );

  const navigate = useNavigate();
  const { type, setType } = useContext(TypeContext);
  const onOverlayClick = () => {
    navigate("/");
    setType("");
  };

  const movieIdMatch = useMatch(`/movies/${movieId}`);

  return (
    <>
      {isLoading_ko ? (
        <div>Loading..</div>
      ) : (
        movieIdMatch &&
        movie_ko && (
          //youtube api연결 시 사용할 영역
          <BoxContainer
            style={{ top: scrollY.get() + 100 }}
            layoutId={movieId + type}
            transition={{ delay: 0.3 }}
          >
            <BoxBgImg $bgPhoto={makeImagePath(movie_ko.backdrop_path)} />
            <ExitIcon>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="2xl"
                onClick={onOverlayClick}
              />
            </ExitIcon>
            {isVideo ? (
              <IconBox>
                <div className="player">
                  <FontAwesomeIcon icon={faPlay} size="lg" />
                  <span>재생</span>
                </div>
              </IconBox>
            ) : (
              <BoxContent>
                <div>
                  <Title>
                    <div>{movie_ko.title}</div>
                    <div>{movie_ko.original_title}</div>
                  </Title>
                  <GenreContainer>
                    {movie_ko.genres.map((item) => (
                      <Genre key={item.id}>{item.name}</Genre>
                    ))}
                  </GenreContainer>
                  <MovieInfoContainer>
                    <IconBox>
                      <span>
                        <FontAwesomeIcon icon={faCirclePlus} size="lg" />
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faThumbsUp} size="lg" />
                      </span>
                    </IconBox>
                    <ReleaseDate>{movie_ko.release_date}</ReleaseDate>
                    <VoteAverage>
                      <FontAwesomeIcon icon={faStar} />
                      {movie_ko.vote_average.toFixed(1)}
                    </VoteAverage>
                    <RunTime>{movie_ko.runtime}분</RunTime>
                  </MovieInfoContainer>
                  <Tagline>
                    <span></span>
                    {movie_ko.tagline ? movie_ko.tagline : movie_en?.tagline}
                  </Tagline>
                  <Overview>
                    {movie_ko.overview ? movie_ko.overview : movie_en?.overview}
                  </Overview>
                </div>
                <PosterImg>
                  <img src={makeImagePath(movie_ko.poster_path)} alt="poster" />
                </PosterImg>
              </BoxContent>
            )}
          </BoxContainer>
        )
      )}
    </>
  );
};

export default MovieBox;
