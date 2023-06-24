import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import {
  IGetMoviesGenres,
  IGetMoviesResult,
  getMovies,
  getMoviesGenres,
} from "../api";
import { useNavigate } from "react-router-dom";
import SliderCard from "./SliderCard";

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 95%;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 2em 0;
  .arrow-area {
    width: 105%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: -2.5%;
    z-index: 0;
    svg {
      padding: 2.5em 0;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;
const PagesIndex = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  right: 2.5%;
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


const Slider = () => {
  const offset = 6;

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [page, setPage] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incrasePage = (direction: string) => {
    if (data) {
      const totalMovies = data.results.length - 1; //메인 화면 데이터 제외
      if (leaving) return;
      toggleLeaving();
      const maxIndex = Math.floor(totalMovies / offset) - 1; //page 0부터 시작
      direction === "right"
        ? setPage((prev) => (prev === maxIndex ? 0 : prev + 1))
        : setPage((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };


  const renderPagesBorder = () => {
    if (data) {
      const boxCount = Math.floor((data.results.length - 1) / 6);
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
    <motion.div style={{ position: "relative" }}>
      <PagesIndex>{renderPagesBorder()}</PagesIndex>
      {data && (
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
            {data?.results
              .slice(1)
              .slice(offset * page, offset * page + offset) //페이지 네이션과 같은 처리
              .map((movie) => (
                <motion.div key={movie.id}>
                    <SliderCard movie={movie}/>
                </motion.div>
              ))}
          </Row>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Slider;
