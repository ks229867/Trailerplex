import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function TV() {
    const { id}  = useParams()
    const [details,setDetails] = useState({})
    const [isError,setIsError] = useState(false)
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos`
    const navigate = useNavigate()
    useEffect(() =>{
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setDetails(data)
        })
    },[url])

    const handleTrailer = () =>{
        const getTrailer = (details.videos.results.find(vid => vid.name === 'Official Trailer'|| vid.name ==='official trailer'))||(details.videos.results[0])
        if(!getTrailer){
            setIsError(true)
        }else{
            navigate(`/trailer/${getTrailer.key}`)
        }
    }

    setTimeout(function(){
        document.getElementById("no-trailer").remove()
    },3000)

  return (
    <>
        <motion.div
        animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
         className='movie-section'>
            <div className='movie-left'>
                <div className='movie-poster'>
                    <img src={`https://image.tmdb.org/t/p/original/${details.poster_path}`} alt={details.original_title} />
                </div>
            </div>
            <div className='movie-right'>
                <h1>{details.original_name}</h1>
                <div className='movie-info'>
                    <span>First Air: {details.first_air_date}</span>
                    <span>{details.original_language}</span>
                    <span>{details.number_of_seasons} seasons</span>
                    </div>
                <p>{details.overview}</p>
                <button className='trailer-button' onClick={handleTrailer}>Watch Trailer</button>
                {isError && <h4 id='no-trailer' className='not-trailer'>Sorry No Trailer !</h4>}
            </div>
        </motion.div>
    </>
    
  )
}

export default TV