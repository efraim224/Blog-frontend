import PostPreview from "../components/PostPreview"
import LinkContainer from '../components/LinkContainer';
import { Link } from 'react-router-dom';
import { posts } from "../content/posts";

const Links = [
    { title: "Popular posts", links: ["asdf", "asdf"] },
    { title: "Hot news", links: ["asdf", "asdf"] }
]

const Home = () => {
    return (
        <div className="home-container">
            <main>
                <div className="title">
                    <h1>Some title for the site</h1>
                    <Link to="/add">
                        <button>Create new post</button>
                    </Link>
                </div>
                {posts.map(item => {
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