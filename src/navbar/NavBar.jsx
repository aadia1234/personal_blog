import { useEffect, useState } from 'react'
import axios from 'axios';
import "./navbar.css"



export default function NavBar() {

    const [categories, setCategories] = useState([{id: -1, name: "DEFAULT"}]);

    useEffect(() => {
        axios.get('http://localhost:8000/blogapi/categories/')
        .then(response => {
            setCategories(response.data)
            console.log(categories[0].name)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    function navCategories() {
        return (
            categories.map((category) => {
                return <li className="navListItem">{category.name.toUpperCase()}</li>
            })
        );
    }

    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <i class="navIcon fab fa-facebook-square"></i>
                    <i class="navIcon fab fa-twitter-square"></i>
                    <i class="navIcon fab fa-pinterest-square"></i>
                    <i class="navIcon fab fa-instagram-square"></i>
                </div>
                <div className="navbar-center">
                    <ul className="navbar-list">
                        <li className="navListItem">HOME</li>
                        {navCategories()}
                        <li className="navListItem">ABOUT</li>
                        <li className="navListItem">CONTACT</li>

                    </ul>
                </div>
                <div className="navbar-right">
                    <img className="navProfileIcon" src="../src/assets/batman_icon.jpg" width="100"></img>
                </div>
                <div>
                    <i className="navSearchIcon fas fa-search"></i>
                </div>
                <div>
                    <i className="toggleLightDarkMode fa-solid fa-sun"></i>
                </div>
            </div>
            <div className="middle"></div>
            <div className="right"></div>
        </>
    );
}