import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auto } from '@popperjs/core';
import { useNavigate } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import LinearProgress from '@mui/material/LinearProgress';



export default function SignUp() {
  const navigate = useNavigate()
  const { logIn } = React.useContext(AuthContext);

  const backLink = `${process.env.REACT_APP_BACK_API}/signup`

  const handleSignup = async (data) => {
    try {
      const res = await fetch(backLink, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin  
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {

        logIn()
        navigate("/")
      }
      else {
        setLoading(false)

      }

    } catch (error) {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true)

    const validPassword = isValidPass(data.get('password'))

    const payload = {
      username: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),

    }

    if (!isValidEmail(payload.username)) {
      setMessage("Invalid email")
      setLoading(false)

    }
    else if (validPassword !== "") {
      setMessage(validPassword)
      setLoading(false)
    }
    else {
      setMessage("")
      handleSignup(payload)
    }
  };

  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPass(pass) {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = pass.length;
    const uppercasePassword = uppercaseRegExp.test(pass);
    const lowercasePassword = lowercaseRegExp.test(pass);
    const digitsPassword = digitsRegExp.test(pass);
    const specialCharPassword = specialCharRegExp.test(pass);
    const minLengthPassword = minLengthRegExp.test(pass);
    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "Password is empty";
    } else if (!uppercasePassword) {
      errMsg = "Password with At least one Uppercase";
    } else if (!lowercasePassword) {
      errMsg = "Password with At least one Lowercase";
    } else if (!digitsPassword) {
      errMsg = "Password with At least one digit";
    } else if (!specialCharPassword) {
      errMsg = "Password with At least one Special Characters";
    } else if (!minLengthPassword) {
      errMsg = "Password with At least minumum 8 characters";
    } else {
      errMsg = "";
    }

    return errMsg
  }


  return (
    <Container component="signup-container" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginLeft: auto,
          marginRight: auto,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 380,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: 'red' }}>
                {message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loading && <LinearProgress />}
    </Container>
  );
}