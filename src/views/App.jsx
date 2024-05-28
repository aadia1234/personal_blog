import { useEffect, useState } from 'react'
// import reactLogo freact 
import HomeView from './HomeView';
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
    <body>
      <NavBar/>
      <div class="blog-content">
        <Routes>
          <Route exact path="/" element={<HomeView/>}/>
          <Route exact path="/category/:categoryID" element={<CategoryPostsView/>}/>
          <Route exact path="/posts/:postID" element={<PostView/>}/>
        </Routes>
      </div>
      <footer>
        <nav class="navbar bg-body-secondary">
          <div class="container-fluid">
            <div class="navbar-nav me-auto">
              <a class="nav-link " href="/">Copyright © 2024 Aadi Anand</a>
            </div>
            <img class="d-flex mx-3" src={imgSrc()} width="30px" role="button" onClick={() => setDarkMode(!darkMode)}/>
          </div>
        </nav>
      </footer>
    </body>
  </>
  );
}

export default App
