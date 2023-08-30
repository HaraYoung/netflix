import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  faCirclePlus,
  faThumbsUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  IGenres,
  IGenresArr,
  getMoviesGenres,
  getTvGenres,
  IMovie,
  ISearchData,
} from "../api";
import { makeImagePath } from "../utils";
import { TypeContext } from "../context";

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
  min-width: 110px;
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
      color: white;
      &:hover {
        opacity: 0.7;
        transition: 0.3s;
      }
    }
    span > svg {
      color: gray;
      &:hover {
        color: white;
        opacity: 1;
        transition: 0.3s;
      }
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

const SliderCard = ({
  data,
  type,
}: {
  data: ISearchData | IMovie;
  type: string;
}) => {
  const { data: movieGenres } = useQuery<IGenresArr>(
    ["movies", "genres"],
    getMoviesGenres
  );
  const { data: tvGenres } = useQuery<IGenresArr>(
    ["tv", "genres"],
    getTvGenres
  );
  const { setType } = useContext(TypeContext);
  const navigate = useNavigate();
  let wishContent = false;
  const [great, setGreat] = React.useState(false);
  const [wish, setWish] = React.useState(false);
  const onBoxClicked = (movieId: number) => {
    if (!wishContent) navigate(`/movies/${movieId}`);
    setType(type);
  };
  const onClickWishContent = (btn: string) => {
    wishContent = true;
    if (btn === "wish") {
      alert("내가 찜한 콘텐츠에 추가되었습니다!");
    } else {
      alert("좋아요");
    }
  };
  let title = data.title;
  let genreList: IGenres[] | undefined;
  if (type === "search" && "media_type" in data && data.media_type === "tv") {
    title = data.name;
    genreList = tvGenres?.genres;
  } else {
    genreList = movieGenres?.genres;
  }
  let matchingGenres: (IGenres | undefined)[] = [];

  if (data.genre_ids) {
    matchingGenres = data.genre_ids.map((genreId) =>
      genreList?.find((genre) => genre.id === genreId)
    );
  }
  return (
    <Box
      $bgPhoto={makeImagePath(data.poster_path, "w500")}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(data.id)}
      layoutId={data.id + type}
    >
      <div>
        <Info variants={infoVariants}>
          <h4>{title}</h4>
          <div>
            <div>
              <span>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  size="2xs"
                  onClick={() => onClickWishContent("wish")}
                />
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size="2xs"
                  onClick={() => onClickWishContent("great")}
                />
              </span>
              <FontAwesomeIcon icon={faCircleChevronDown} size="2xs" />
            </div>
            <Genres className={window.outerWidth >= 1474 ? "flex" : "float"}>
              {matchingGenres?.map((genre, index) => (
                <li key={index}>
                  {genre ? (index !== 0 ? `◾ ${genre.name}` : genre.name) : null}
                </li>
              ))}
            </Genres>
          </div>
        </Info>
      </div>
    </Box>
  );
};

export default SliderCard;
