// import axios from "axios";
// import { useEffect, useState } from "react";
// import PostEditCard from "../components/PostEditCard.js";



// const MyPosts = () => {
//     const myPostsLink = `${process.env.REACT_APP_BACK_API}/myposts`

//     const [postsData, setpostsData] = useState([]);

//     const getUserPosts = async () => {
//         const { data } = await axios.post(myPostsLink, {}, {
//             withCredentials: true,
//         });

//         setpostsData(data);

//     };

//     useEffect(() => {
//         try {
//             getUserPosts();
//         }
//         catch (e) {
//         }
//     }, []);

//     return (
//         <div>
//             {postsData.length > 0 ? <div>
//                 <h1> My posts: </h1>
//                 <div>
//                     {postsData.map(item => {
//                         return <PostEditCard {...item} />
//                     })}

//                 </div>
//             </div > : (<div> You have no posts yet</div>)
//             }
//         </div>

//     )
// }


// export default MyPosts

import axios from "axios";
import { useEffect, useState } from "react";
import PostEditCard from "../components/PostEditCard.js";
import { Box, CircularProgress } from "@mui/material";
import LoadingCircularProgress from "../components/LoadingCircularPorogress.js";

const MyPosts = () => {
    const myPostsLink = `${process.env.REACT_APP_BACK_API}/myposts`

    const [postsData, setpostsData] = useState([]);
    const [loading, setLoading] = useState(true); // new state variable

    const getUserPosts = async () => {
        const { data } = await axios.post(myPostsLink, {}, {
            withCredentials: true,
        });

        setpostsData(data);
        setLoading(false); // after getting posts data, set loading to false
    };

    useEffect(() => {
        try {
            getUserPosts();
        }
        catch (e) {
            setLoading(false); // in case of error, also set loading to false
        }
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>

            {loading ?
                <LoadingCircularProgress /> :
                postsData.length > 0 ?
                    <div>
                        <h1> My posts: </h1>
                        <div>
                            {postsData.map(item => {
                                return <PostEditCard {...item} />
                            })}
                        </div>
                    </div > :
                    <div> You have no posts yet</div>
            }
        </Box>
    )
}

export default MyPosts
