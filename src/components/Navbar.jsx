import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import {IoMdNotifications,IoMdArrowDropdown} from 'react-icons/io'
import { useNavigate,NavLink } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchItem,setSearchItem] = useState('')
    const [showSidebar,setShowSidebar] = useState(false)
    const {user, logOut} = UserAuth()
    const navigate = useNavigate();
    window.onscroll = () =>{
        setIsScrolled(window.scrollY === 0 ? false:true)
        return () => (window.onscroll = null);
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/search/${searchItem}`)
        setSearchItem('')
        setIsSearch(false)
    }
 
    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
        setShowSidebar(false)
    }
  return (
    <>
        <nav className={isScrolled?"navbar scrolled":"navbar"}>
        <div className='container'>
        <NavLink className='nav-logo' to={'/'}><h1>MOVIEPLEX</h1></NavLink>
            <div className='nav-left'>
                <NavLink to={'/'}>Homepage</NavLink>
                <NavLink to={'/category/tv'}>Series</NavLink>
                <NavLink to={'/category/movie'}>Movies</NavLink>
                <NavLink to={'/category/all'}>New and Popular</NavLink>
            </div>
            <div className={`${isSearch ? "search-bar show":"search-bar hidden"}`}>
                <form className='form-control' onSubmit={handleSubmit}>
                    <input type='text' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                    <span className='close-search-btn' onClick={() => setIsSearch(false)}>x</span>
                </form>
            </div>
            {user?.email ? <div className='nav-right'>
                <FaSearch className='icon' onClick={() => setIsSearch(true)} />
                <IoMdNotifications className='icon' />
                <img src="https://img.a.transfermarkt.technology/portrait/big/28003-1671435885.jpg?lm=1" alt='Lional Messi' /> 
                <div className='profile'>
                    <IoMdArrowDropdown className='icon' />
                    <div className='options'>
                        <span>Settings</span>
                        <span onClick={handleLogout}>Log Out</span>
                    </div>
                </div>
                    <button className='hamburger-icon' onClick={() => setShowSidebar(true)}>
                        <div className='bar'></div>
                    </button>
             </div>
            :
            <div className='nav-right'>
                <button className='signIn-btn' onClick={() => navigate('/login')}>
                    Sign In
                </button>
                <button className='signUp-btn' onClick={() => navigate('/signUp')}>
                    Sign Up
                </button>
            </div>
            }
            
        </div>
    </nav>
    {showSidebar && <div className='sidebar'>
            <button className='close-icon' onClick={() => setShowSidebar(false)}>
            </button>
            <div className='sidebar-menu'>
                <NavLink to={'/category/tv'}>Series</NavLink>
                <NavLink to={'/category/movie'}>Movies</NavLink>
                <NavLink to={'/category/all'}>New and Popular</NavLink>
                <button>Settings</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
       </div>}
    
    </>
  )
}



export default Navbar