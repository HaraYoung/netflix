import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IGetMoviesResult } from "../api";

import SliderCard from "./SliderCard";
import Popular from "../Components/Popular";

const SliderContainer = styled(motion.div)`
  min-height: 210px;
  position: relative;
`;
const Row = styled(motion.div)<{ offset: number }>`
  display: grid;
  gap: 5px;
  grid-template-columns: ${(props) =>  `repeat(${props.offset}, 1fr)`};
  width: 93%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 0.5em;

  .arrow-area {
    width: 106%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    z-index: 0;
    left: -3%;
    top: 3%;
    svg {
      padding: 2.5em 0.1em;
      cursor: pointer;
      &:hover {
        background-color: rgba(1, 1, 1, 0.5);
      }
    }
  }
`;
const PagesIndex = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: -13%;
  right: 3.5%;
  display: flex;
  justify-content: flex-end;
  .page-border {
    border-bottom: 2px solid white;
  }
`;
const PagesBorder = styled(motion.div)`
  border-bottom: 2px solid #808080;
  padding: 0.5em;
  margin: 0 0.2em;
`;
const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 10 },
};

const Slider = ({
  movieData,
  type,
}: {
  movieData: IGetMoviesResult;
  type: string;
}) => {
  const offset = type === "popular" ? 5 : 6;

  const [page, setPage] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incrasePage = (direction: string) => {
    if (movieData) {
      const totalMovies = movieData.results.length - 1; //메인 화면 데이터 제외
      if (leaving) return;
      toggleLeaving();
      const maxIndex = Math.floor(totalMovies / offset) - 1; //page 0부터 시작
      direction === "right"
        ? setPage((prev) => (prev === maxIndex ? 0 : prev + 1))
        : setPage((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const renderPagesBorder = () => {
    if (movieData) {
      const boxCount = Math.floor((movieData.results.length - 1) / offset);
      // 반복해서 렌더링할 Box 컴포넌트 배열 생성
      const boxes = Array.from({ length: boxCount }, (_, index) => (
        <PagesBorder
          key={index}
          className={index === page ? "page-border" : ""}
        />
      ));
      return boxes;
    }
  };

  return (
    <SliderContainer>
      <PagesIndex>{renderPagesBorder()}</PagesIndex>
      {movieData && (
        <AnimatePresence
          onExitComplete={toggleLeaving}
          initial={false}
          key="slider"
        >
          <Row
            key={page}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            offset={offset}
          >
            <div className="arrow-area">
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="2x"
                onClick={() => incrasePage("left")}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
                onClick={() => incrasePage("right")}
              />
            </div>
            {type === "nowPlaying"
              ? movieData.results
                  .slice(1)
                  .slice(offset * page, offset * page + offset) //페이지 네이션과 같은 처리
                  .map((movie) => (
                    <SliderCard
                      data={movie}
                      key={movie.id + type}
                      type={type}
                    />
                  ))
              : type === "popular"
              ? movieData.results
                  .slice(offset * page, offset * page + offset)
                  .map((movie, idx) => (
                    <Popular
                      data={movie}
                      key={movie.id + type}
                      type={type}
                      idx={idx}
                      page={page}
                    />
                  ))
              : movieData.results
                  .slice(offset * page, offset * page + offset)
                  .map((movie) => (
                    <SliderCard
                      data={movie}
                      key={movie.id + type}
                      type={type}
                    />
                  ))}
          </Row>
        </AnimatePresence>
      )}
    </SliderContainer>
  );
};

export default Slider;
