import React, { useState } from 'react';
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
import Link from 'next/link';

const Search = () => {
  const [search, setSearch] = useState<string>("")

  return (
    <StyledSearch>
      <SearchInput placeholder='Axtarış...' onChange={(e) => setSearch(e.target.value)} value={search} />
      <SearchIcon onClick={() => setSearch('')}>
        <Link href={{
          pathname: '/search',
          query: { search }
        }}>
          <IoSearchOutline size={20} />
        </Link>
      </SearchIcon>
    </StyledSearch>
  )
}

export default Search;


const StyledSearch = styled.div`
  width: 500px;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;

  @media only screen and (max-width: 1024px) {
    width: 400px;
  }
  @media only screen and (max-width: 768px) {
    width: max-content;
    border: none;
  }
  @media only screen and (max-width: 512px) {
    --width-screen: 95%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  padding-left: 1rem;

  @media only screen and (max-width: 768px) {
       display: none;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
  padding: 8px;
  color: #636363;
`;