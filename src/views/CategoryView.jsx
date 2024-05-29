import { useEffect, useState } from 'react'
import django from "../api/axios.js";
import { useParams } from 'react-router-dom';


export default function CategoryPostsView(props) {

    const [posts, setPosts] = useState([{id: null, title: null, banner: null, body: null, created_on: null, last_modified: null, category: null}]);
    const [category, setCategory] = useState({id: null, name: null})
    const { categoryID } = useParams()
    const isHome = props.home
    const cardStyle = { minWidth: "250px", maxWidth: "350px", minHeight: "500px", margin: "auto" }

    useEffect(() => {
        let url = "posts/"
        url = !isHome ? url + "?category=" + categoryID : url
        django.get(url)
        .then(response => { setPosts(response.data) })
        .catch(error => { console.log(error); });
    }, [isHome]);

    useEffect(() => {
        django.get("categories/" + categoryID)
        .then((response) => setCategory(response.data))
        .catch((error) => console.log(error))
    }, [isHome])

    function postsView(size) {
        return (
            posts.map((post) => {
                let date = new Date(post.last_modified)
                return <div className="col my-4" key={post.id}>
                    <div className="card h-100" style={cardStyle}>
                        <img src={post.banner} className="card-img-top" height="200px" alt="..."></img>
                        <div className="card-body position-relative">
                            <h5 className="card-title">{post.title}</h5>
                            {/* <p className="card-text text-truncate">{getPostContent("<p>Hello</p><a href='http://w3c.org'>W3C</a>")}</p> */}
                            <a href={"/posts/" + post.id} className="position-absolute bottom-0 mb-3 btn btn-primary">Read</a>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last Updated: {date.toDateString()}</small>
                        </div>
                    </div>
                </div>
            }).slice(0, size)
        )
    }

    function title() {
        const title = isHome ? "Welcome to My Blog!" : category.name

        return (
            <>
                <h1>{title}</h1>
                {isHome ? <h6>Here's the list of the most recent posts I've made</h6> : null}
            </>
        )
    }

    return (
        <>
            <div className="m-5 p-4 text-center">{title()}</div>
            <hr/>
            <div className="row row-cols-1 row-cols-md-3 my-5 pb-5 mx-3">{postsView(isHome? 3 : posts.size)}</div>
        </>
    );
}