import LinkContainer from '../components/LinkContainer';
import { Link } from 'react-router-dom';
// import { posts } from "../content/posts";
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import PostCard from "../components/PostCard"
import { AuthContext } from '../providers/AuthProvider';


const Links = [
    { title: "Popular posts", links: ["asdf", "asdf"] },
    { title: "Hot news", links: ["asdf", "asdf"] }
]

const postsLink = `${process.env.REACT_APP_BACK_API}/posts`

const Home = () => {

    const { isAuthenticated } = useContext(AuthContext);

    const [postsData, setpostsData] = useState([]);
    const getData = async () => {
        const { data } = await axios.get(postsLink);
        setpostsData(data);
    };

    useEffect(() => {
        try {
            getData();
        }
        catch (e) {
        }
    }, []);


    return (
        <div className="home-container">
            <main>
                <div className="title">
                    <h1>Some title for the site</h1>
                    {isAuthenticated && <Link to="/add">
                        <button>Create new post</button>
                    </Link>}
                </div>
                {postsData.map(item => {
                    return <PostCard {...item} />
                })}
            </main>
            <right>
                {Links.map(item => {
                    return <LinkContainer {...item} />
                })}
            </right>
        </div>
    )
}

export default Home