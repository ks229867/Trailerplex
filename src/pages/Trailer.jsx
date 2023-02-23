import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

function Trailer() {
    const {info} = useParams()
  return (
    <motion.div
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    >
        <section className='trailer'>
            <div className="youtube-container">
                <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${info}`}
                allow=" autoplay; picture-in-picture"
                allowFullScreen
                title="trailer"
                />
            </div>
        </section>
    </motion.div>
  )
}

export default Trailer