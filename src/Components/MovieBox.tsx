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
} from "@fortawesome/free-solid-svg-icons";

import { IGetMovieDetails, getMovieDetail } from "../api";
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
  div:last-child {
    margin: 1em;
    div {
      margin: 0.5em 0;
    }
  }
`;
const Title = styled.h2`
  font-size: 1.7em;
  font-weight: bold;
`;
const Tagline = styled.div`
  font-size: 18px;
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
const Genre = styled.span`
  padding: 0.2em 0.4em;
  background-color: white;
  color: black;
  margin: 0 0.2em;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bolder;
`;
const Overview = styled.div``;

const MovieBox = ({ movieId }: { movieId: string }) => {
  const [isVideo, setIsVideo] = React.useState(false);
  const { scrollY } = useScroll();

  const { data: movie, isLoading } = useQuery<IGetMovieDetails>(
    ["movies", "details"],
    () => getMovieDetail(movieId),
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
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        movieIdMatch &&
        movie && (
          <BoxContainer
            style={{ top: scrollY.get() + 100 }}
            layoutId={movieId + type}
            transition={{ delay: 0.3 }}
          >
            <BoxBgImg $bgPhoto={makeImagePath(movie.backdrop_path)} />
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
                  <Title>{movie.title}</Title>
                  <div>
                    {movie.genres.map((item) => (
                      <Genre key={item.id}>{item.name}</Genre>
                    ))}
                  </div>
                  <div>{movie.release_date}</div>
                  <div>{movie.vote_average}</div>
                  <IconBox>
                    <span>
                      <FontAwesomeIcon icon={faCirclePlus} size="xl" />
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faThumbsUp} size="xl" />
                    </span>
                  </IconBox>
                  <Tagline>{movie.tagline}</Tagline>
                  <Overview>{movie.overview}</Overview>
                </div>
                <div>
                  <img src={makeImagePath(movie.poster_path)} alt="poster" />
                </div>
              </BoxContent>
            )}
          </BoxContainer>
        )
      )}
    </>
  );
};

export default MovieBox;
