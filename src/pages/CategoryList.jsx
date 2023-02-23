import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function CategoryList() {
    const {type} = useParams()
    const [trendingList,setTrendingList] = useState([])
    const navigate = useNavigate()

    const fetchTrending= (url) =>{
        fetch(url).then((responce) => responce.json())
        .then((data) => {
          setTrendingList(data.results)
        })
    }
    useEffect(() =>{
        if(type === 'all'){
            fetchTrending(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
        }else {
             fetchTrending(`https://api.themoviedb.org/3/${type}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        }
    },[type])

    const handleClick = (item) =>{
      if (type ==='movie') {
        navigate(`/movie/${item.id}`)
      }
      if(type === "tv"){
        navigate(`/tv/${item.id}`)
      }
      if(type === "all"){
        if (item.media_type === "tv") {
          navigate(`/tv/${item.id}`)
        }
        if (item.media_type === "movie") {
          navigate(`/movie/${item.id}`)
        }
     }
      
    }
  return (
    <motion.div
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
     className='category-container'>
        <h2>{type}</h2>
        <section className='category-list'>
        {trendingList.map((item) =>{
           return <div className='category-item' key={item.id} onClick={() => handleClick(item)}>
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.original_title} />
                <div className='movie-hover'>
                  <p className='category-movie-title'>{item?.title}{item?.name}</p>
                </div>
            </div>
        })}
        </section>
    </motion.div>
  )
}

export default CategoryList