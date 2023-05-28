import PostPreview from "../components/PostPreview"
import LinkContainer from '../components/LinkContainer';
import { Link } from 'react-router-dom';
// import { posts } from "../content/posts";
import { useEffect, useState } from "react";
import axios from 'axios'

const Links = [
    { title: "Popular posts", links: ["asdf", "asdf"] },
    { title: "Hot news", links: ["asdf", "asdf"] }
]

const postsLink = "http://localhost:5000/posts"

const Home = () => {

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
                    <Link to="/add">
                        <button>Create new post</button>
                    </Link>
                </div>
                {postsData.map(item => {
                    return <PostPreview {...item} />
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