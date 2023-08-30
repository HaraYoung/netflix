import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { ISearchResult, getSearch } from "../api";
import SliderCard from "../Components/SliderCard";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5em;
`;

const Row = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 20px; 
  grid-template-columns: repeat(6, 1fr);
  width: 93%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 0.5em;
`;

const Search = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const keyword = queryParams.get("keyword") || "";
  const { data: searchData, isLoading } = useQuery<ISearchResult>(
    ["search"],
    () => getSearch(keyword)
  );
  return (
    <SearchContainer>
      <Row>
        {searchData?.results.map((data) => (
          <SliderCard data={data} key={data.id + "search"} type="search" />
        ))}
      </Row>
    </SearchContainer>
  );
};

export default Search;
