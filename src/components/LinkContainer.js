import { Link } from "react-router-dom"

const LinkContainer = (props) => {
    return (
    <div className="link-container">
        <ul>
            <h1><u>{props.title}</u></h1>
            {props.links.map(content => {
                return <Link to="/home"><li>Link</li></Link>
            })}
        </ul>

    </div>
    )
}


export default LinkContainer