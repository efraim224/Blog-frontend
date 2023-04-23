
const LinkContainer = (props) => {
    return (
    <div className="link-container">
        <ul>
            <h1><u>{props.title}</u></h1>
            {props.links.map(content => {
                return <a href=""><li>Link</li></a>
            })}
        </ul>

    </div>
    )
}

export default LinkContainer