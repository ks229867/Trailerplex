// import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import{AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

function Row({title, fetchURL, type}) {
  const [movies, setMovies] = useState([])
  const [slideNumber, setSlideNumber] = useState(0)
  const navigate = useNavigate();
  const sliderRef = useRef()

  useEffect(() =>{
      fetch(fetchURL)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results)
        })
  },[fetchURL])

  const slicedMovies = movies.slice(0,12);

  const handleSlider = (direction) =>{
    
    const distance = sliderRef.current.getBoundingClientRect().x -50
      if (direction === "left" && slideNumber > 0) {
          setSlideNumber(slideNumber - 1)
          sliderRef.current.style.transform = `translateX(${230 + distance}px)` 
      }
      if (direction === "right" && slideNumber < 5) {
          setSlideNumber(slideNumber + 1)
          sliderRef.current.style.transform = `translateX(${-230 + distance}px)`
      }
  }
  const handleMovie = (id,type) =>{
    if(type ==='movie'){
      return navigate(`/movie/${id}`)
    }
    if (type === 'tv') {
      return navigate(`/tv/${id}`)
    }
    
  }
  return (
    <div className='row-container'>
        <h2>{title}</h2>
        {type === 'movie' && <div className='row'>
          <AiOutlineLeft className={slideNumber === 0 ?'sideArrow left noClick':'sideArrow left'} onClick={() =>handleSlider("left")} />
          <div id={'slider'} className='row-items' ref={sliderRef}>
          {slicedMovies.map((movie) =>{
            const searchedImageURL = movie.backdrop_path?`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
            return <div className='row-item' key={movie?.id} onClick={() => handleMovie(movie?.id,type)}>
                <img src={searchedImageURL} alt={movie?.title} />
                <div className='row-item-hover'>
                  <p className='hover-movie-title'>{movie?.title}</p>
                 
                </div>
            </div>
          })}
             
          </div>
          <AiOutlineRight className={slideNumber === 5 ?'sideArrow right noClick':'sideArrow right'} onClick={() => handleSlider("right")} />
        </div>}

        {type === "tv" && <div className='row'>
          <AiOutlineLeft className={slideNumber === 0 ?'sideArrow left noClick':'sideArrow left'} onClick={() =>handleSlider("left")} />
          <div id={'slider'} className='row-items' ref={sliderRef}>
          {slicedMovies.map((movie) =>{
            const searchedImageURL = movie.backdrop_path?`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
            return <div className='row-item' key={movie?.id} onClick={() => handleMovie(movie?.id,type)}>
                <img src={searchedImageURL} alt={movie?.name} />
                <div className='row-item-hover'>
                  <p className='hover-movie-title'>{movie?.name}</p>
                </div>
            </div>
          })}
             
          </div>
          <AiOutlineRight className={slideNumber === 5 ?'sideArrow right noClick':'sideArrow right'} onClick={() => handleSlider("right")} />
        </div>}
        
    </div>
  )
}

export default Row