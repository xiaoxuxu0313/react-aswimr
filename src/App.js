import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './component/Header';
import Pagination from './component/Pagination';
import MovieList from './component/MovieList';
import MovieCardDetails from './component/MovieCardDetails';
import { TABS, CATEGORIES } from './constants';
import { fetchMoviesByCategory } from './api';
import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  //note: [],not {}
  const [currentTab, setCurrentTab] = useState(TABS.HOME);
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES.POPULAR.value
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(999);
  const [movieList, setMovieList] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState(null);

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  const handleCategoryChange = (categoryName) => {
    setCurrentCategory(categoryName);
  };

  useEffect(() => {
    fetchMoviesByCategory(currentCategory, currentPage).then((data) => {
      setMovieList(data.results);
      setTotalPage(data.total_pages);
    });
  }, [currentCategory, currentPage]);

  //注意写箭头函数的格式
  const handlePrevClick = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage === totalPage) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMovieTitleClick = (movieId) => {
    setActiveMovieId(movieId);
  };

  const isHomeTab = () => {
    const isHome = currentTab === TABS.HOME;
    if (activeMovieId) {
      return false;
    } else {
      return isHome;
    }
  };

  const isMovieCardDetails = () => {
    if (activeMovieId) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <Header activeTab={currentTab} onTabClick={handleTabClick} />

      {isHomeTab() && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          category={currentCategory}
          onChange={handleCategoryChange}
        />
      )}

      {isMovieCardDetails() || (
        <MovieList movieList={movieList} onTitleClick={handleMovieTitleClick} />
      )}
      {isMovieCardDetails() && <MovieCardDetails moiveId={activeMovieId} />}
    </div>
  );
}
