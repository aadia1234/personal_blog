import { createRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import "../stylesheets/PostView.css"
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function PostView() {

    const [post, setPost] = useState({id: -1, title: "", banner: "", body: "", created_on: "", last_modified: "", category: -1});
    const [comments, setComments] = useState([{id: -1, author: "", body: "", created_on: "", post: -1}])
    const { postID } = useParams();
    const [nameRef, commentRef] = [React.createRef(), React.createRef(), React.createRef()]
    const [newComment, setNewComment] = useState(false)
    const recaptcha = createRef()

    const REACT_APP_SITE_KEY = "6LebG-opAAAAAGvPpV4IlgeBuIPXq_79lgATAIsr"
    const REACT_APP_SECRET_KEY = "6LebG-opAAAAAB8XCDmKKT7rYyUo32PDw3TCPvfV"

    useEffect(() => {
        axios.get('http://localhost:8000/blogapi/posts/' + postID)
        .then(response => { setPost(response.data) })
        .catch(error => { console.log(error); });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/blogapi/comments/?post=' + postID)
        .then(response => { setComments(response.data); setNewComment(false) })
        .catch(error => { console.log(error); });
    }, [newComment]);

    const postData = async() => {
        let author = nameRef.current.value
        let body = commentRef.current.value
        let post = postID
        let json = {author, body, post}
        const response = await axios.post("http://localhost:8000/blogapi/comments/", json)
        return response.data
    }

    let postDate = new Date(post.last_modified)

    async function submitComment(event) {
        let captchaValue = recaptcha.current.getValue()
        if (captchaValue) {
            postData()
            .then(data => {comments.push(data); setNewComment(true); })
            .catch(error => {console.log(error);})
        } else {
            alert("Please Fill out the Captcha!")
        }
        
    }

    function getComments() {
        return (
            comments.map((comment) => {
                let commentDate = new Date(comment.created_on)
                return <>
                    <div class="comment-container">
                        <h5><strong>{comment.author}</strong></h5>
                        <p>{commentDate.toDateString()}</p>
                        <br/>
                        <p>{comment.body}</p>
                    </div>
                    <hr class="mx-5"/>
                </>
            })
        )
    }

    return (
        <>
            <div class="banner text-bg-dark">
                <img src={post.banner} width="100%" height="750px"/>
                <div class="banner-text">
                    <h1>{post.title}</h1>
                    <h7>Last Modified: {postDate.toDateString()}</h7>
                </div>
            </div>
            {/* <div class="rect-break"/> */}
            <div class="body-text">
                <p>{post.body}</p>
            </div>
            <hr class="pb-5"/>
            <div class="mb-5 pb-5 comments">
                <h3 class="m-5 text-center">Comments</h3>
                <br/>
                <div class="comments-text pb-3">
                    {getComments()}
                </div>
                <hr class="mt-5"/>
                <div class="new-comment m-5 py-5 needs-validation" novalidate>
                    <form>
                        <h3 class="mb-5 text-center">Leave a Comment</h3>
                        <br/>
                        <div class="form-floating mb-3 has-validation">
                            <input type="text" ref={nameRef} class="form-control" id="nameInput" placeholder="Name" required/>
                            <label for="nameInput">Name</label>
                            <div class="invalid-feedback">Please enter your name!</div>
                        </div>
                        <div class="form-floating mb-3 has-validation">
                            <textarea class="form-control" ref={commentRef} id="commentInput" placeholder="Comment" required></textarea>
                            <label for="commentInput">Comment</label>
                            <div class="invalid-feedback">You can't enter an empty comment!</div>
                        </div>
                        <br/>
                        <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY}/>
                        <br/><br/>
                        <button type="button" class="btn btn-primary" onClick={submitComment}>Submit</button>
                    </form>
                </div>
                <hr/>
            </div>
        </>
    );
}