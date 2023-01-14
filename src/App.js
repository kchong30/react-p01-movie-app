import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/Navbar'
import Favourites from './components/Favourites'
import AddFavourites from './components/AddFavourites'
import RemoveFavourites from './components/RemoveFavourites'
import About from './components/About'
import MovieFrame from './components/MovieFrame'
import MovieDetail from './components/MovieDetail'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const API_URL_NOWPLAYING = 'https://api.themoviedb.org/3/movie/now_playing?api_key=11296ae346038f3e5c0456fab6069a1e&language=en-US&page=1&region=CA%7CUS%26with_release_type%3D2%7C3'
const API_URL_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?api_key=11296ae346038f3e5c0456fab6069a1e&language=en-US&page=1&region=CA%7CUS%26with_release_type%3D2%7C3'

const App = () => {

  const [moviesList, setMoviesList] = useState([]);
  const [favouritesList, setFavouritesList] = useState([]);
  
  useEffect(() => {
    fetch(API_URL_NOWPLAYING)
    .then ((res)=>res.json())
    .then(data=>{
      data.results.sort((a,b) => parseFloat(b.popularity) - parseFloat(a.popularity))
      setMoviesList(data.results.slice(0,12))
    })
  }, [])

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavouritesList(movieFavourites);
		}
	}, []);


  const fetchPopular = () => ( 
    fetch(API_URL_NOWPLAYING)
    .then ((res)=>res.json())
    .then(data=>{
      data.results.sort((a,b) => parseFloat(b.popularity) - parseFloat(a.popularity))
      setMoviesList(data.results.slice(0,12))
    }))
  

  const fetchHighRated = () =>  ( 
    fetch(API_URL_NOWPLAYING)
    .then ((res)=>res.json())
    .then(data=>{
      data.results.sort((a,b) => parseFloat(b.vote_average) - parseFloat(a.vote_average))
      setMoviesList(data.results.slice(0,12))
    }))

  const fetchNowPlaying = () =>  ( 
    fetch(API_URL_NOWPLAYING)
    .then ((res)=>res.json())
    .then(data=>{
      //function to reassemble the date attribute into a string value that can be compared and sorted (ie, change 2022-07-08 into 20220708)
      data.results.sort(function (a,b) {
        var A = a.release_date.split("-");
        var B = b.release_date.split("-");
        var strA = [A[0], A[1], A[2]].join("-");
        var strB = [B[0], B[1], B[2]].join("-");
        return strB.localeCompare(strA);
      });
      setMoviesList(data.results.slice(0,12))
    }))

  const fetchComingSoon = () => ( 
    fetch(API_URL_UPCOMING)
    .then ((res)=>res.json())
    .then(data=>{
      //function to reassemble the date attribute into a string value that can be compared and sorted (ie, change 2022-07-08 into 20220708)
      data.results.sort(function (a,b) {
        var A = a.release_date.split("-");
        var B = b.release_date.split("-");
        var strA = [A[0], A[1], A[2]].join("-");
        var strB = [B[0], B[1], B[2]].join("-");
        return strA.localeCompare(strB);
      });
      setMoviesList(data.results.slice(0,12))
    }))

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
    if (favouritesList.filter(e=>e.id===movie.id).length == 0){
      const newFavouriteList = [...favouritesList, movie];
      setFavouritesList(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favouritesList.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavouritesList(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
  };

	return (
    <Router>
      <div className='app'>
        <NavBar />

          <Routes>
            <Route path = "/" exact element={
            <div>
                <Container style ={{marginTop:"20px"}}>
                  <Row>
                    <button onClick = {fetchPopular}>Show Me What's Popular (Most Popular Movies In Theatres)</button>
                    <button onClick = {fetchHighRated}>Show Me The Best Movies (Highest Rated Movies In Theatres)</button>
                    <button onClick = {fetchNowPlaying}>Show Me What's New (Recent Releases)</button>
                    <button onClick = {fetchComingSoon}>Show Me What's Coming Soon (Coming to Theatres)</button>
                  </Row>
                </Container>
              <Container fluid style={{margin:"20px", marginLeft:"-5px", backgroundColor:" #050505"}}>
                  <MovieFrame 
                    movies={moviesList}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites}
                    handleRemoveFavouritesClick={removeFavouriteMovie}
                    removeFavouriteComponent={RemoveFavourites}
                    favourites={favouritesList}
                  />
              </Container>
            </div>
            }/>
            <Route path = "/about" exact element={
            <About/>
            } 
            />
            <Route path = "/favourites" exact element={
              <Container fluid style={{backgroundColor:" #050505", marginTop:"30px"}}>
                  <Favourites
                    movies = {favouritesList}
                    handleRemoveFavouritesClick={removeFavouriteMovie}
                    removeFavouriteComponent={RemoveFavourites}
                  />
              </Container>}
            />
            <Route path = "/movie/:id" element = {
              <Container style = {{display:"flex", justifyContent:"center"}} >
                <MovieDetail
                  handleFavouritesClick={addFavouriteMovie}
                  favouriteComponent={AddFavourites}
                  handleRemoveFavouritesClick={removeFavouriteMovie}
                  removeFavouriteComponent={RemoveFavourites}
                  favourites={favouritesList} 
                />
              </Container>} 
            />
          </Routes>
        </div>
    </Router>
	);
};

export default App;
