import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "bootstrap5-autocomplete";
import django from "../api/axios.js";
import {
  Alert,
  Container,
  Form,
  NavDropdown,
  Navbar,
  Nav,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { URLS } from "../api/constants.js";
import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const [categories, setCategories] = useState([{ id: -1, name: "DEFAULT" }]);
  const [posts, setPosts] = useState([
    {
      id: -1,
      title: "",
      body: "",
      created_on: "",
      last_modified: "",
      categories: -1,
    },
  ]);
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const navigate = useNavigate();
  let searchRef = createRef();

  const searchAlertStyle = {
    position: "fixed",
    width: "100%",
    zIndex: 1,
  };

  useEffect(() => {
    new Autocomplete(searchRef.current, {
      onSelectItem: searchPost,
      fullWidth: true,
    });
  }, [posts]);

  useEffect(() => {
    django
      .get(URLS.POSTS)
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    django
      .get(URLS.CATEGORIES)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  function navCategories() {
    return categories.map((category) => {
      return (
        <NavDropdown.Item
          key={category.id}
          href={URLS.CATEGORY + category.id}
        >
          {category.name}
        </NavDropdown.Item>
      );
    });
  }

  function searchPost(event) {
    let searchText = encodeURIComponent(searchRef.current.value);
    try {
      event.preventDefault();
    } catch (error) {
      console.log(error);
    }

    django
      .get(URLS.POST_BY_TITLE + searchText)
      .then((response) => {
        navigate(URLS.POSTS + response.data[0].id);
        window.location.reload();
      })
      .catch((error) => {
        setShowSearchAlert(true);
        console.log(error);
      });
  }

  const isCollapsed = useMediaQuery({ query: "(max-width: 970px)" });

  return (
    <>
      <style>{".autocomplete-menu { margin-top: 37px; }"}</style>
      {/* need to fix variant to data-bs-theme */}
      <Navbar sticky="top" bg="primary" key="lg" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Aadi's Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Offcanvas
            id="navbar"
            aria-labelledby="navbar"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="navbar">Aadi's Blog</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="navbar-collapse" id="navbar">
              <Nav className="me-auto mb-2 mt-2">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">
                  About
                </Nav.Link>
                <Nav.Link href="/contact">
                  Contact
                </Nav.Link>
                <NavDropdown title="Blog Posts">{navCategories()}</NavDropdown>
              </Nav>
              <Form
                className="d-flex"
                onSubmit={searchPost}
                style={{ width: isCollapsed ? "100%" : "450px" }}
              >
                <Form.Control
                  ref={searchRef}
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  data-datalist="postList"
                />
                <datalist id="postList">
                  {posts.map((post) => {
                    return <option key={post.id}>{post.title}</option>;
                  })}
                </datalist>
                <Button variant="success" type="submit">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Alert
        style={searchAlertStyle}
        variant="warning"
        show={showSearchAlert}
        onClose={() => setShowSearchAlert(false)}
        dismissible
      >
        <strong>Uh-oh!</strong> Unable to find a post with that title
      </Alert>
    </>
  );
}
