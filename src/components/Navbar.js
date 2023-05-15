import { Link } from "react-router-dom"

const Navbar = (props) => {
    return (
        <header>
            <ul>
                <div class="topnav">
                    <div class="topnav-left">

                        <li class="menu-item"><Link to="/">Home</Link></li>
                        <li class="menu-item"><Link to="/about">About me</Link></li>
                        <li class="menu-item"><Link to="/contact">Contact</Link></li>
                        </div>
                        <div class="topnav-right">
                        <li class="menu-item"><Link to="/login" class="bar-right">Login</Link></li>
                        </div>
        
                </div>
            </ul>
        </header>
    )
}

export default Navbar