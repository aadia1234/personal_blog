import { createRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Autocomplete from "bootstrap5-autocomplete"
import django from '../api/axios.js';
import { Alert } from "react-bootstrap"

export default function NavBar() {

    const [categories, setCategories] = useState([{id: -1, name: "DEFAULT"}]);
    const [posts, setPosts] = useState([{id: -1, title: "", body: "", created_on: "", last_modified: "", categories: -1}])
    const [showSearchAlert, setShowSearchAlert] = useState(false)
    const navigate = useNavigate()
    let searchRef = createRef()

    const searchAlertStyle = {
        position: "absolute",
        width: "100%",
        // marginTop: "100px",
        zIndex: 1
    }

    useEffect(() => { new Autocomplete(searchRef.current, { onSelectItem: searchPost, fullWidth: true}) }, [posts])

    useEffect(() => {
        django.get("posts/")
        .then((response) => { setPosts(response.data) })
        .catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        django.get('categories/')
        .then((response) => setCategories(response.data))
        .catch((error) => console.log(error))
    }, [])

    function navCategories() {
        return (
            categories.map((category) => {
                return <li key={category.id}><a className="dropdown-item" aria-current="page" href={"/category/" + category.id}>{category.name}</a></li>
            })
        );
    }

    function searchPost(event) {
        let searchText = encodeURIComponent(searchRef.current.value)
        try { event.preventDefault() } catch (error) { console.log(error) }

        django.get("posts/?title=" + searchText)
        .then((response) => {
            navigate("posts/" + response.data[0].id)
            window.location.reload()
        })
        .catch((error) => { setShowSearchAlert(true); console.log(error) })
    }

    return (
        <>
        <style>{".autocomplete-menu { margin-top: 37px; }"}</style>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Aadi's Blog</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav me-auto mb-2 mt-2">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/about">About</a>
                            <a className="nav-link" href="/contact">Contact</a>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Blog Posts
                                </a>
                                <ul className="dropdown-menu">{navCategories()}</ul>
                            </li>
                        </div>
                        <form className="d-flex" role="search" onSubmit={searchPost}>
                            <input className="form-control me-2" ref={searchRef} type="search" placeholder="Search" data-datalist="postList" aria-label="Search"></input>
                            <datalist id="postList">{ posts.map((post) => { return <option key={post.id}>{post.title}</option>}) }</datalist>
                            <button className="btn btn-success" id="btntest" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <Alert style={searchAlertStyle} variant="warning" show={showSearchAlert} onClose={() => setShowSearchAlert(false)} dismissible>
              <strong>Uh-oh!</strong> Unable to find a post with that title 
            </Alert>
        </>
    )
}