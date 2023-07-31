import React, { useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  faCirclePlus,
  faThumbsUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IGetMoviesGenres, getMoviesGenres, IMovie } from "../api";
import { makeImagePath } from "../utils";
import TypeContext from "../context";

const Box = styled(motion.div)`
  height: 200px;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  display: flex;
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
const Ranking = styled.img`
  width: 17%;
`;
const Poster = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 82.5%;
  height: 100%;
  border-radius: 15px;
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
    font-size: 0.8em;
    padding-top: 0.9em;
    padding-left: 0.5em;
  }
  div > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.1em;
    padding: 0.4em 0;
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
    scale: 1.4,
    zIndex: 200,
    transition: {
      delay: 0.5,
      type: "tween",
      duaration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    zIndex: 100,
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "tween",
      duaration: 0.3,
    },
  },
};

const Popular = ({
  movie,
  type,
  idx,
  page,
}: {
  movie: IMovie;
  type: string;
  idx: number; //슬라이더 번호
  page: number;
}) => {
  const { data: genres } = useQuery<IGetMoviesGenres>(
    ["movies", "genres"],
    getMoviesGenres
  );
  const arrImg = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  const { setType } = useContext(TypeContext);
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setType(type);
  };
  const [sliceRankingImg] = React.useState(page === 0 ? 5 : 10);
  return (
    <Box>
      {arrImg
        .slice(sliceRankingImg - 5, sliceRankingImg)
        .map(
          (item, index) =>
            idx === index &&
            (sliceRankingImg === 10 && index === 4 ? (
                <Ranking
                  src={`img/${item}.svg`}
                  alt="ranking"
                  width="150px"
                  height="95px"
                  key={item}
                  style={{ transform: 'scale(1.2)'}}
                />
            ) : (
              <Ranking
                src={`img/${item}.svg`}
                alt="ranking"
                width="50px"
                height="95px"
                key={item}
              />
            ))
        )}
      <Poster
        $bgPhoto={makeImagePath(movie.poster_path)}
        variants={boxVariants}
        whileHover="hover"
        initial="normal"
        transition={{ type: "tween" }}
        layoutId={movie.id + type}
        onClick={() => onBoxClicked(movie.id)}
      >
        <Info variants={infoVariants}>
          <h4>{movie.title}</h4>
          <div>
            <div>
              <span>
                <FontAwesomeIcon icon={faCirclePlus} size="lg" />
                <FontAwesomeIcon icon={faThumbsUp} size="lg" />
              </span>
              <FontAwesomeIcon icon={faCircleChevronDown} size="lg" />
            </div>
            <Genres className={window.outerWidth >= 1474 ? "flex" : "float"}>
              {genres?.genres
                .filter((item) => movie.genre_ids.includes(item.id))
                .map((v, i) => (
                  <li key={i}>{i !== 0 ? `◾ ${v.name}` : v.name}</li>
                ))}
            </Genres>
          </div>
        </Info>
      </Poster>
    </Box>
  );
};

export default Popular;
