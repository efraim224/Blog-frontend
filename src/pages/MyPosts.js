import axios from "axios";
import { useEffect, useState } from "react";
import PostEditCard from "../components/PostEditCard.js";



const MyPosts = () => {
    const myPostsLink = `${process.env.REACT_APP_BACK_API}/myposts`

    const [postsData, setpostsData] = useState([]);

    const getUserPosts = async () => {
        const { data } = await axios.post(myPostsLink, { }, {
            withCredentials: true,
        });

        setpostsData(data);

    };

    useEffect(() => {
        try {
            getUserPosts();
        }
        catch (e) {
        }
    }, []);

    return (
        <div>
            {postsData.map(item => {
                // return <PostEditCard {...item}/>
                return <PostEditCard {...item} />
            })}

        </div>

    )



}


export default MyPosts