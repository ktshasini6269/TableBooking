import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

const Register = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: ""
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(data)
      if (data.name === "" || data.email === "" || data.password === "") {
         alert("Please fill all fields");
      } else {
         try {
            await axios.post('http://localhost:8000/api/user/register', data);
            alert('Record submitted');
            navigate('/login');
         } catch (error) {
            alert("Invalid credentials");
         }
      }
   }

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
         <Container  component="main" >
            
            <Box
               sx={{
                  marginTop: 8,
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign up
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     fullWidth
                     id="name"
                     label="Customer Full Name/Organization Name"
                     name="name"
                     value={data.name}
                     onChange={handleChange}
                     autoComplete="name"
                     autoFocus
                  />
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
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     name='type'
                     value={data.type}
                     label="type"
                     onChange={handleChange}
                  >
                     <MenuItem value={'Customer'}>Customer</MenuItem>
                     <MenuItem value={"Organization"}>Organization</MenuItem>
                  </Select>
                  <Box mt={2}>
                     <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ width: '200px' }}
                     >
                        Sign Up
                     </Button>
                  </Box>
                  <Grid container>
                     <Grid item>Have an account?
                        <Link style={{ color: "blue" }} to={'/login'} variant="body2">
                           {" Sign In"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>

      </>
   )
}

export default Register
