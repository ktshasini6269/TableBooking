import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../Images/p1.jpg'
import p2 from '../../Images/p2.webp'
import p3 from '../../Images/p3.jpg'
import p4 from '../../Images/p4.png'
import axios from 'axios';

const Home = () => {
   const [index, setIndex] = useState(0);
   const [allTables, setAllTables] = useState([])
   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   const getallTables = async () => {
      try {
         const res = await axios.get('http://localhost:8000/api/user/getalltables')
         setAllTables(res.data.data)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getallTables()
   }, [])
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

         <div className='home-body'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
               <Carousel.Item>
                  <img
                     src={p1}
                     alt="First slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p2}
                     alt="Second slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p3}
                     alt="Third slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p4}
                     alt="Fourth slide"
                  />
               </Carousel.Item>
            </Carousel>
         </div>


         <div className="home-contents">
            <h2 className='text-center p-3'>Tables to Book from</h2>
            <Container className='card-container'>
               {allTables && allTables.length > 0 ? (
                  allTables.map((table, i) => {
                     return (
                        <div class="card">
                           <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                              <img src={table.hotelImages[0]} class="img-fluid" />
                           </div>
                           <div class="card-body">
                              <h5 class="card-title"><b>Hotel Name: </b>{table.hotelInfo.name}</h5>
                              <p class="card-text"><b>Address: </b>{table.hotelAddress}</p>
                              <p class="card-text"><b>Phone: </b>{table.hotelPhone}</p>
                              <p className="card-text"><b>Hotel Information: </b>{table.additionalInformation}</p>
                              <Button><Link to={'/login'}>Book Now</Link></Button>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <p>No hotels found.</p>
               )}
            </Container>
         </div>

      </>
   )
}

export default Home