import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import {
  faCirclePlus,
  faThumbsUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getMovies,
  IGetMoviesGenres,
  getMoviesGenres,
  IMovie,
} from "../api";
import { useNavigate } from "react-router-dom";

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 2em;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  z-index: 100;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  .flex {
    display: flex;
  }
  .float {
    width: 100%;
    li {
      float: left;
    }
  }
`;
const Info = styled(motion.div)`
  background-color: #181818;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 98px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 1)
  );
  h4 {
    font-size: 0.4em;
    padding-top: 0.9em;
    padding-left: 0.5em;
  }
  div > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.1em;
    svg {
      padding: 0 0.2em;
    }
  }
`;
const Genres = styled.ul`
  li {
    font-size: 0.2em;
    padding: 0.2em;
    &:first-child {
      padding-left: 1.5em;
    }
  }
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.5,
    transition: {
      delay: 0.5,
      type: "tween",
      duaration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "tween",
      duaration: 0.3,
    },
  },
};

const SliderCard = ({ movie }: { movie: IMovie }) => {
  const { data: genres } = useQuery<IGetMoviesGenres>(
    ["movies", "genres"],
    getMoviesGenres
  );
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => navigate(`/movies/${movieId}`);

  return (
    <Box
      $bgPhoto={makeImagePath(movie.poster_path, "w500")}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(movie.id)}
      layoutId={movie.title}
    >
      <div>
        <Info variants={infoVariants}>
          <h4>{movie.title}</h4>
          <div>
            <div>
              <span>
                <FontAwesomeIcon icon={faCirclePlus} size="2xs" />
                <FontAwesomeIcon icon={faThumbsUp} size="2xs" />
              </span>
              <FontAwesomeIcon icon={faCircleChevronDown} size="2xs" />
            </div>
            <Genres className={window.outerWidth >= 1068 ? "flex" : "float"}>
              {genres?.genres
                .filter((item) => movie.genre_ids.includes(item.id))
                .map((v, i) => (
                  <li key={i}>{i !== 0 ? `◾ ${v.name}` : v.name}</li>
                ))}
            </Genres>
          </div>
        </Info>
      </div>
    </Box>
  );
};

export default SliderCard;
