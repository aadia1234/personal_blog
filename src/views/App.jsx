import { useEffect, useState } from 'react'
// import reactLogo freact 
import PostView from './PostView'
import { Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import CategoryPostsView from './CategoryView';
import "../stylesheets/App.css"
function App() {
  const [darkMode, setDarkMode] = useState(false);

  function imgSrc() {
    return darkMode ? "https://cdn-icons-png.flaticon.com/512/180/180700.png" : "https://cdn-icons-png.flaticon.com/512/1779/1779906.png"
  }

  return (
    <>
    <div className="blog-body">
      <NavBar/>
      <div className="blog-content">
        <Routes>
          <Route exact path="/" element={<CategoryPostsView home={true}/>}/>
          <Route exact path="/category/:categoryID" element={<CategoryPostsView home={false}/>}/>
          <Route exact path="/posts/:postID" element={<PostView/>}/>
        </Routes>
      </div>
      <footer>
        <nav className="navbar bg-body-secondary">
          <div className="container-fluid">
            <div className="navbar-nav me-auto">
              <a className="nav-link " href="/">Copyright © 2024 Aadi Anand</a>
            </div>
            <img className="d-flex mx-3" src={imgSrc()} width="30px" role="button" onClick={() => setDarkMode(!darkMode)}/>
          </div>
        </nav>
      </footer>
    </div>
  </>
  );
}

export default App
