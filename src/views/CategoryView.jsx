import { useEffect, useState } from 'react'
import django from "../api/axios.js";
import { URLS } from '../api/constants.js';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';


export default function CategoryPostsView(props) {

    const [posts, setPosts] = useState([{id: null, title: null, banner: null, body: null, created_on: null, last_modified: null, category: null}]);
    const [category, setCategory] = useState({id: null, name: null})
    const { categoryID } = useParams()
    const isHome = props.home
    const cardStyle = { width: "100%", height: "500px", margin: "auto"}
    const cardTextStyle = {overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", "-webkit-line-clamp": "4", "-webkit-box-orient": "vertical"}
    useEffect(() => {
        django.get(!isHome ? URLS.POSTS_BY_CATEGORY + categoryID : URLS.POSTS)
        .then(response => setPosts(response.data))
        .catch(error => console.log(error))
    }, [isHome]);

    useEffect(() => {
        django.get(URLS.CATEGORIES + categoryID)
        .then((response) => setCategory(response.data))
        .catch((error) => console.log(error))
    }, [isHome])

    function getPostContent(htmlStr) {
        var t = document.createElement("textarea");
        t.innerHTML = htmlStr;
        var tdiv = document.createElement("p");
        tdiv.innerHTML = t.value;
        return tdiv.textContent || tdiv.innerText || "";
    }

    return (
      <>
        <div className="m-5 p-4 text-center">
          <h1>{isHome ? "Welcome to My Blog!" : category.name}</h1>
          {isHome ? (
            <h6>Here's the list of the most recent posts I've made</h6>
          ) : null}
        </div>
        <hr style={{ margin: 0, padding: 0 }} />
        <Container fluid>
          <Row xs={1} md={2} xl={3} xxl={4} className="g-4 my-5 pb-5">
            {posts
              .map((post) => (
                <Col className="my-4 px-5" key={post.id}>
                  <Card style={cardStyle}>
                    <Card.Img
                      src={post.banner}
                      variant="top"
                      height="250vh"
                      className="object-fit-cover"
                    />
                    <Card.Body className="position-relative">
                      <Card.Title className="text-truncate">
                        {post.title}
                      </Card.Title>
                      <Card.Text style={cardTextStyle}>
                        {getPostContent(post.body)}
                      </Card.Text>
                      <Button
                        variant="primary"
                        href={
                          URLS.POSTS + post.id
                        }
                        className="position-absolute bottom-0 mb-3"
                      >
                        Read
                      </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <small>
                        Last Updated:{" "}
                        {new Date(post.last_modified).toDateString()}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
              .slice(0, isHome ? 12 : posts.size)}
          </Row>
        </Container>
      </>
    );
}