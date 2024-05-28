import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import React from 'react'

export default function NavBar() {

    const [categories, setCategories] = useState([{id: -1, name: "DEFAULT"}]);
    const [postList, setPostList] = useState([{id: -1, title: "", body: "", created_on: "", last_modified: "", categories: -1}])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/blogapi/posts/")
        .then(response => {
            setPostList(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    let searchRef = React.createRef()

    useEffect(() => {
        axios.get('http://localhost:8000/blogapi/categories/')
        .then(response => {
            setCategories(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    function navCategories() {
        return (
            categories.map((category) => {
                let url = "/category/" + category.id
                return <li><a className="dropdown-item" aria-current="page" href={url}>{category.name}</a></li>
            })
        );
    }



    function searchPost(e) {
        let searchText = searchRef.current.value
        searchText = encodeURIComponent(searchText)
        e.preventDefault()

        axios.get("http://localhost:8000/blogapi/posts/?title=" + searchText)
        .then((response) => {
            let data = response.data[0]
            console.log(data)
            navigate("/posts/" + data.id)
            window.location.reload()
        })
        .catch(error => {
            const alertTrigger = document.getElementById('btntest')
            const alert = document.getElementById("search-alert")
            alert.classList.remove("d-none")
            console.log(error)
        })
    }

    return (
        <>
            <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Aadi's Blog</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="navbar-nav me-auto mb-2 mt-2">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                            <a class="nav-link" href="/about">About</a>
                            <a class="nav-link" href="/contact">Contact</a>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Blog Posts
                                </a>
                                <ul class="dropdown-menu">{navCategories()}</ul>
                            </li>
                        </div>
                        <form class="d-flex" role="search" onSubmit={searchPost}>
                            <input class="form-control me-2" ref={searchRef} type="search" enterKeyHint="go" placeholder="Search" list="postList" aria-label="Search"></input>
                            <datalist id="postList">
                                {
                                    postList.map((post) => {
                                        return <option value={post.title}/>
                                    })
                                }
                            </datalist>
                            <button class="btn btn-success" id="btntest" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div id="search-alert" class="alert alert-warning alert-dismissible fade show d-none" role="alert">
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
    )
}