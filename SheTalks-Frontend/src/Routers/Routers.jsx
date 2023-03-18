import React from 'react';
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Poster from '../pages/Poster.jsx'
import Post from '../pages/Post.jsx'
import Posts from '../pages/Posts.jsx'
import { Routes, Route } from 'react-router-dom'
import { MyProvider } from '../utils/MyContext.jsx'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import AboutUs from '../pages/AboutUs'
import Events from '../pages/Events'

const Routers = () => {
    return (
    <MyProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Posts' element={<Posts/>}></Route>
          <Route path='/Poster' element={<Poster/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/Post' element={<Post/>}></Route>
          <Route path='/LogIn' element={<LogIn/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/AboutUs' element={<AboutUs/>}></Route>
          <Route path='/Events' element={<Events/>}></Route>
        </Routes>
    </MyProvider>
    );
}

export default Routers;
