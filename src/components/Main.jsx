
import React, { useEffect, useState } from 'react'
import requests from '../Requests'

function Main() {
    const [movies,setMovies] = useState([])
    const movie = movies[Math.floor(Math.random() * movies.length)]
    const url = requests.requestPopular;

    useEffect(() =>{
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setMovies(data.results);
        })
       
    },[url])
    
    const slicedText = (str,limit) =>{
        if (str?.length > limit) {
            return str.slice(0,limit) + "..."
        }else{
            return str;
        }
    }

  return (
    <main>
        <div  className='main'>
            <div className='gradient'></div>
                <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
                <div className='movie-info'>
                    <h1 className='main-movie-title'>{movie?.original_title}</h1>
                <p className='release-date'>{movie?.release_date}</p>
                <p className='overview'>{slicedText(movie?.overview,150)}</p>
            </div>
        </div>
    </main>
  )
}

export default Main