import { createRef, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Parser from 'html-react-parser'
import django from "../api/axios.js"
import "../stylesheets/PostView.css"

export default function PostView() {

    const [post, setPost] = useState({id: -1, title: "", banner: "", body: "", created_on: "", last_modified: "", category: -1})
    const [comments, setComments] = useState([{id: -1, author: "", body: "", created_on: "", post: -1}])
    const [newComment, setNewComment] = useState(false)
    const [nameRef, commentRef] = [createRef(), createRef()]
    const { postID } = useParams()
    const recaptcha = createRef()
    const [REACT_APP_SITE_KEY, REACT_APP_SECRET_KEY] = ["6LebG-opAAAAAGvPpV4IlgeBuIPXq_79lgATAIsr", "6LebG-opAAAAAB8XCDmKKT7rYyUo32PDw3TCPvfV"]
    
    let postDate = new Date(post.last_modified)

    useEffect(() => {
        django.get('posts/' + postID)
        .then((response) => setPost(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        django.get('comments/?post=' + postID)
        .then((response) => { setComments(response.data); setNewComment(false) })
        .catch((error) => console.log(error));
    }, [newComment]);

    async function postData() {
        let [author, body, post] = [nameRef.current.value, commentRef.current.value, postID]
        let json = {author, body, post}
        let response = await django.post("comments/", json)
        return response.data
    }

    function submitComment(event) {
        let captchaValue = recaptcha.current.getValue()
        if (captchaValue) {
            postData()
            .then((data) => {comments.push(data); setNewComment(true); })
            .catch((error) => console.log(error))
        } else {
            alert("Please Fill out the Captcha!")
        }
        
    }

    function getComments() {
        return (
            comments.map((comment) => {
                let commentDate = new Date(comment.created_on)
                return <div key={comment.id}>
                    <div className="comment-container">
                        <h5><strong>{comment.author}</strong></h5>
                        <p>{commentDate.toDateString()}</p>
                        <br/>
                        <p>{comment.body}</p>
                    </div>
                    <hr className="mx-5"/>
                </div>
            })
        )
    }

    return (
        <>
            <div className="banner text-bg-dark">
                <img src={post.banner} width="100%" height="750px"/>
            </div>
            <div className="banner-text mt-5 text-center">
                <h1>{post.title}</h1>
                <h6>Last Modified: {postDate.toDateString()}</h6>
            </div>
            <div className="body-text">
                {Parser(post.body)}
            </div>
            <hr className="pb-5"/>
            <div className="mb-5 pb-5 comments">
                <h3 className="m-5 text-center">Comments</h3>
                <br/>
                <div className="comments-text pb-3">
                    {getComments()}
                </div>
                <hr className="mt-5"/>
                <div className="new-comment m-5 py-5 needs-validation" noValidate>
                    <form>
                        <h3 className="mb-5 text-center">Leave a Comment</h3>
                        <br/>
                        <div className="form-floating mb-3 has-validation">
                            <input type="text" ref={nameRef} className="form-control" id="nameInput" placeholder="Name" required/>
                            <label htmlFor="nameInput">Name</label>
                            <div className="invalid-feedback">Please enter your name!</div>
                        </div>
                        <div className="form-floating mb-3 has-validation">
                            <textarea className="form-control" ref={commentRef} id="commentInput" placeholder="Comment" required></textarea>
                            <label htmlFor="commentInput">Comment</label>
                            <div className="invalid-feedback">You can't enter an empty comment!</div>
                        </div>
                        <br/>
                        <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY}/>
                        <br/><br/>
                        <button type="button" className="btn btn-primary" onClick={submitComment}>Submit</button>
                    </form>
                </div>
                <hr/>
            </div>
        </>
    );
}