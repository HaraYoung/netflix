import React from "react";
import { motion, useScroll } from "framer-motion";
import { useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { IGetMovieDetails, getMovieDetail } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";

const BoxContainer = styled(motion.div)`
  background-color: #181818;
  width: 65vw;
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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 50%;
`;
const BoxContent = styled.div``;
const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
`;

const MovieBox = ({ movieId }: { movieId: string }) => {
  const moviePathMatch = useMatch(`/movies/:movieId`);
  const { scrollY } = useScroll();

  const { data: movie, isLoading } = useQuery<IGetMovieDetails>(
    ["movies", "details"], // params.movieId를 의존성 배열에 추가
    () => getMovieDetail(movieId),
    {
      enabled: !!movieId, // params.movieId가 존재할 때만 실행
    }
  );
  return (
    <>
      {movie && (
        <BoxContainer layoutId={movieId} style={{ top: scrollY.get() + 100 }}>
          <BoxBgImg $bgPhoto={makeImagePath(movie?.backdrop_path)} />
          <BoxContent>
            <Title>{movie.title}</Title>
          </BoxContent>
        </BoxContainer>
      )}
    </>
  );
};

export default MovieBox;
