import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function SearchedMovie() {
    const {name} = useParams()
    const [searchedMovies, setSearchedMovies] = useState([])
    const navigate = useNavigate()
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${name}&language=en-US&page=1`
    useEffect(() =>{
      try {
        fetch(url)
        .then((responce)=> responce.json())
        .then((data) => {
          setSearchedMovies(data.results)
        })
      } catch (error) {
        console.log(error);
      }
        
    },[url])

    const handleClick = (id,type) =>{
      if (type === "movie") {
        navigate(`/movie/${id}`)
      }
      if(type === "tv"){
        navigate(`/tv/${id}`)
      }
    }

  return (
    <motion.div 
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    className="searched-container">
    <h1>{name}</h1>
      {searchedMovies.length > 0 ? 
      <section className='searched-movies'>
        {searchedMovies.map((movie) =>{
          const searchedImageURL = movie.backdrop_path?`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
            return <section key={movie.id} className='searched-movie' onClick={() => handleClick(movie.id,movie.media_type)}> 
              <img src={searchedImageURL} alt={movie.title} />
              <div className='movie-hover'>
                  <p className='searched-movie-title'>{movie?.title}{movie?.name}</p>
                </div>
            </section>
          })}
      </section> : <h2>NO Results Found !</h2>
      }
      
      
    </motion.div>
  )
}

export default SearchedMovie