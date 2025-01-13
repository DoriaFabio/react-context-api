import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
// import axios from 'axios'
import HomePage from './pages/HomePage'
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import DefaultLayout from './pages/DefaultLayout'
import Blog from './pages/post'
import PostPage from './pages/PostPage'
import AddPost from './pages/AddPost'
// import { GlobalContext } from './context/GlobalContext'
import { AlertProvider } from './context/AlertContext'
import { PostProvider } from './context/PostContext'

function App() {
  const [tagsList] = useState([]);

  return (
    // <GlobalContext.Provider value={{ tagsList }}>
    <AlertProvider>
      <PostProvider value={tagsList}>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path='/' Component={HomePage} />
              <Route path='/about' Component={AboutUs} />
              <Route path='/contact' Component={Contact} />
              <Route path='/posts'>
                <Route index Component={Blog}></Route>
                <Route path=':id' Component={PostPage}></Route>
                <Route path='create' Component={AddPost}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AlertProvider>
    // </GlobalContext.Provider> 
  )
}

export default App;
