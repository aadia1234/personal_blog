import { createRef, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Parser from 'html-react-parser'
import django from "../api/axios.js"
import "../stylesheets/PostView.css"
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { URLS } from '../api/constants.js'

export default function PostView() {

    const [post, setPost] = useState({id: -1, title: "", banner: "", body: "", created_on: "", last_modified: "", category: -1})
    const [comments, setComments] = useState([{id: -1, author: "", body: "", created_on: "", post: -1}])
    const [newComment, setNewComment] = useState(false)
    const [validated, setValidated] = useState(false)
    const [nameRef, commentRef] = [createRef(), createRef()]
    const { postID } = useParams()
    const recaptcha = createRef()
    const [REACT_APP_SITE_KEY, REACT_APP_SECRET_KEY] = ["6LebG-opAAAAAGvPpV4IlgeBuIPXq_79lgATAIsr", "6LebG-opAAAAAB8XCDmKKT7rYyUo32PDw3TCPvfV"]
    let postDate = new Date(post.last_modified)

    useEffect(() => {
        django.get(URLS.POSTS + postID)
        .then((response) => setPost(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        django.get(URLS.COMMENT_BY_POST + postID)
        .then((response) => { setComments(response.data); setNewComment(false) })
        .catch((error) => console.log(error));
    }, [newComment]);

    async function postData() {
        let [author, body, post] = [nameRef.current.value, commentRef.current.value, postID]
        let json = {author, body, post}
        console.log(json)
        let response = await django.post(URLS.COMMENTS, json)
        return response.data
    }

    function submitComment(event) {
        let captchaValue = recaptcha.current.getValue()
        let form = event.currentTarget

        if (captchaValue && form.checkValidity()) {
            postData()
            .then((data) => {
                comments.push(data)
                setNewComment(true)
                setValidated(false)
            })
            .catch((error) => console.log(error))
        } else {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
    }

    function getComments() {
        return (
            comments.map((comment) => {
                return <div key={comment.id}>
                    <div className="comment-container">
                        <h5><strong>{comment.author}</strong></h5>
                        <p>{(new Date(comment.created_on)).toDateString()}</p>
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
            <div className="text-bg-dark">
                <img src={post.banner} width="100%"/>
            </div>
            <div className="mt-5 text-center">
                <h1>{post.title}</h1>
                <h6>Last Modified: {postDate.toDateString()}</h6>
            </div>
            <div className="body-text mb-5">{Parser(post.body)}</div>
        </>
    );
}