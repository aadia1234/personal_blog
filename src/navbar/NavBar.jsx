import "./navbar.css"
 
export default function NavBar() {
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
                        <li className="navListItem">ABOUT</li>
                        <li className="navListItem">CONTACT</li>
                        <li className="navListItem">WRITE</li>

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