import LinkContainer from '../components/LinkContainer';
import { Link } from 'react-router-dom';
// import { posts } from "../content/posts";
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import PostCard from "../components/PostCard"
import { AuthContext } from '../providers/AuthProvider';
import ImgMediaCard from '../components/ImgMediaCard';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/material';

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
        // <div className="home-container">
        //     <main>
        //         <div className="title">
        //             <h1>Efi'z Blog</h1>
        //             {isAuthenticated && <Link to="/add">
        //                 <button>Create new post</button>
        //             </Link>}
        //         </div>
        //     {postsData.map(item => {
        //         return <ImgMediaCard {...item} />
        //     })}
        //     </main>
        //     {/* <right>
        //         {Links.map(item => {
        //             return <LinkContainer {...item} />
        //         })}
        //     </right> */}
        // </div>

        <Box sx={{ flexGrow: 1 }}>
            
            <h1>Efi'z Blog</h1>
                {isAuthenticated && <Link to="/add">
                    <Button  variant="contained">Create new post</Button>
                </Link>}

            <Grid
                container
                // spacing={0.5}
                // columns={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
                // sx={{ display: 'flex', flexGrow: 1 }}
                margin={1}
                rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >

                {postsData.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index} marginTop={2} >
                            <ImgMediaCard {...item} />
                            {/* <div> test</div> */}
                        </Grid>
                    );
                })}

            </Grid>
        </Box>
    )
}

export default Home