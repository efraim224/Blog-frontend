import { Box, CircularProgress, Grid } from "@mui/material"


const LoadingCircularProgress = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>

        <Grid
        
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        >
            <CircularProgress />
        </Grid>
        </Box>
    )
}


export default LoadingCircularProgress;