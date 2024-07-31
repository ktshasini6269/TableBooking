import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllHotels = () => {
   const [allhotels, setAllHotels] = useState([])

   const getAllHotels = async () => {
      try {
         const res = await axios.get('http://localhost:8000/api/user/getallhotels')
         setAllHotels(res.data.data)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getAllHotels()
   }, [])

   return (
      <Container className='card-container'>
         {allhotels && allhotels.length > 0 ? (
            allhotels.map((hotel, i) => {
               return (
                  <div class="card">
                     <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img alt='images' src={hotel.hotelImages[0]} class="img-fluid" />
                     </div>
                     <div class="card-body">
                        <h5 class="card-title"><b>Hotel Name: </b>{hotel.hotelName}</h5>
                        <p class="card-text"><b>Address: </b>{hotel.hotelAddress}</p>
                        <p class="card-text"><b>Phone: </b>{hotel.hotelPhone}</p>
                        <Button><Link to={'/login'}>Book Now</Link></Button>
                     </div>
                  </div>
               );
            })
         ) : (
            <p>No hotels found.</p>
         )}
      </Container>
   )
}

export default AllHotels
