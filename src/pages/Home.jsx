import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'
import "./home.scss"
import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
     className='home'>
        <Main />
        <Row title="Latest" type="movie" fetchURL={requests.requestLatest} />
        <Row title="Popular Series" type="tv" fetchURL={requests.requestPopularTV} />
        <Row title="Up Coming" type="movie" fetchURL={requests.requestUpcoming} />
        <Row title="Top Rated Series" type="tv" fetchURL={requests.requestTopRatedTV} />
    </motion.div>
  )
}

export default Home