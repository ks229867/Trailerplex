import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
function SignUp() {
    const {signUp} = UserAuth()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            signUp(email,password)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <motion.div
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
     className="signup-container">
    <img src='https://assets.nflxext.com/ffe/siteui/vlv3/1ecf18b2-adad-4684-bd9a-acab7f2a875f/6abbb576-106a-4175-a16e-af91cf881736/IN-en-20230116-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt="netflix backfround" />
    <div className='gradient'></div>
    <div className='signup-overlay'>
        <section className='signup-section'>
            <h2>Sign Up</h2>
            <form className='signup-form-control' onSubmit={handleSubmit}>
                <input onChange={(e) => setEmail(e.target.value) } type='email' placeholder='Email' />
                <input onChange={(e) => setPassword(e.target.value) } type='password' placeholder='Password' />
                <button type='submit'>Sign Up</button>
                <div className='signup-underlings'>
                    <p>
                        <input type="checkbox" />
                        Remember me
                    </p>
                    <p>
                        Need Help?
                    </p>
                </div>
                <p>
                    <span>Already subscribed to movieplex?</span>
                    <Link to='/login'>Sign In</Link>
                </p>
            </form>
        </section>
    </div>
        

     </motion.div>
  )
}

export default SignUp