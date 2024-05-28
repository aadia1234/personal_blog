import { useEffect, useState } from 'react'
import axios from 'axios';


export default function LatestsPostsView() {

    const [posts, setPosts] = useState([{id: -1, title: "", banner: "", body: "", created_on: "", last_modified: "", category: -1}]);
    const cardStyle = {
        minWidth: "250px",
        maxWidth: "350px",
        minHeight: "500px",
        margin: "auto"
    }
    useEffect(() => {
        axios.get('http://localhost:8000/blogapi/posts/')
        .then(response => {
            let data = response.data
            setPosts([data[0], data[1], data[2]])
        })
        .catch(error => { console.log(error) });
    }, []);

    function latestPosts() {
        return (
            posts.map((post) => {
                let date = new Date(post.last_modified)
                return <div class="col my-4">
                    <div class="card h-100" style={cardStyle}>
                        <img src={post.banner} class="card-img-top" height="200px" alt="..."></img>
                        <div class="card-body position-relative">
                            <h5 class="card-title">{post.title}</h5>
                            <p class="card-text text-truncate">{post.body}</p>
                            <a href={"/posts/" + post.id} class="position-absolute bottom-0 mb-3 btn btn-primary">Read</a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Last Updated: {date.toDateString()}</small>
                        </div>
                    </div>
                </div>
            })
        );
    }

    return (
        <>
            <div class="row row-cols-1 row-cols-md-3 my-5 pb-5 mx-3">
                {latestPosts()}
            </div>            
        </>
    );
}