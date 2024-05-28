import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function CategoryPostsView() {

    const [posts, setPosts] = useState([{id: -1, title: "", body: "", created_on: "", last_modified: "", category: -1}]);
    const { categoryID } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8000/blogapi/posts/?category=' + categoryID)
        .then(response => {
            console.log(response.data)
            setPosts(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    function postsView() {
        return (
            posts.map((post) => {
                let date = new Date(post.last_modified)
                return <div class="col my-5 py-5">
                    <div class="card h-100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTJ9PiXYRPBIWO2maHbR9UZHFId3Jj0aDTYR6uXROOA&s" class="card-img-top" alt="..."></img>
                        <div class="card-body">
                            <h5 class="card-title">{post.title}</h5>
                            <p class="card-text text-truncate">{post.body}</p>
                            <a href={"/posts/" + post.id} class="btn btn-primary">Read</a>
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
            <div class="m-5 p-4 text-center">
                <h1>{posts[0].category}</h1>
            </div>
            <hr/>
            <div class="post-grid">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {postsView()}
                </div>
            </div>
        </>
    );
}