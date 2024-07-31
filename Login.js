import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  console.log(data,"data")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      alert("Please fill all fields")
    } else {
      await axios.post("http://localhost:8000/api/user/login", data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            const { user } = isLoggedIn
            switch (user.type) {
              case "Admin":
                navigate("/adminhome")
                window.location.reload()
                break;
              case "Customer":
                navigate("/userhome")
                window.location.reload()
                break;
              case "Organization":
                navigate("/userhome")
                window.location.reload()
                break;
              default:
                navigate("/userhome")
                break;
            }
          } else {
            alert(res.data.message)
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate("/login");
        });
    }


  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/'}>Book Table</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <Link to={'/'}>Home</Link>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* login form here */}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
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
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ width: '200px' }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item>forgot password?
                <Link style={{ color: "red" }} to={'/forgotpassword'} variant="body2">
                  {" Click here"}
                </Link>
              </Grid>
              <Grid item>Don't have an account?
                <Link style={{ color: "red" }} to={'/register'} variant="body2">
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </>
  )
}

export default Login
