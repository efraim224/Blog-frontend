import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import LinearProgress from '@mui/material/LinearProgress';


export default function Login() {

  const { logIn } = React.useContext(AuthContext);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const backLink = `${process.env.REACT_APP_BACK_API}/login`
  const handleLogin = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(backLink, data)
      if (res.status === 200) {
        logIn();
        navigate("/")
      }
      else {
        setMessage("Invalid username or password")
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setMessage("Invalid username or password")
    }
  }

  const [message, setMessage] = React.useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get('email'),
      password: data.get('password'),
    }

    handleLogin(payload)
  };

  const [loading, setLoading] = React.useState(false);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography sx={{ color: 'red' }}>
            {message}
          </Typography>

          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
        {loading && <LinearProgress />}
    </Container>
  );
}