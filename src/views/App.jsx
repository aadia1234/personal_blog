import { useEffect, useState } from "react";
// import reactLogo freact
import PostView from "./PostView";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import CategoryPostsView from "./CategoryView";
import "../stylesheets/App.css";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  function imgSrc() {
    return darkMode
      ? "https://cdn-icons-png.flaticon.com/512/180/180700.png"
      : "https://cdn-icons-png.flaticon.com/512/1779/1779906.png";
  }

  return (
    <>
      <div className="blog-body">
        <NavBar />
        <div className="blog-content">
          <Routes>
            <Route exact path="/" element={<CategoryPostsView home={true} />} />
            <Route
              exact
              path="/category/:categoryID"
              element={<CategoryPostsView home={false} />}
            />
            <Route exact path="/posts/:postID" element={<PostView />} />
          </Routes>
        </div>
        <footer>
          <Navbar bg="body-secondary">
            <Container fluid>
              <Nav className="me-auto">
                <Nav.Link href="/">Copyright © 2024 Aadi Anand</Nav.Link>
              </Nav>
              <img
                className="d-flex mx-3"
                src={imgSrc()}
                width="30px"
                role="button"
                onClick={() => setDarkMode(!darkMode)}
              />
            </Container>
          </Navbar>
        </footer>
      </div>
    </>
  );
}
