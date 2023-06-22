import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { IGetMoviesResult, getMovies } from "../api";
import { makeImagePath } from "../utils";

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

const Slider = styled.div`
  position: relative;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 2em;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 10 },
};

const offset = 6;
const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1; //메인 화면 데이터 제외
      const maxIndex = Math.floor(totalMovies / offset) - 1; //index는 0부터 시작
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Banner
              onClick={incraseIndex}
              $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Title>현재 상영중인 영화</Title>
            <Slider>
              <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
                <Row
                  key={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5 }}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset) //페이지 네이션과 같은 처리
                    .map((movie) => (
                      <Box
                        key={movie.id}
                        $bgPhoto={makeImagePath(movie.poster_path, "w500")}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
