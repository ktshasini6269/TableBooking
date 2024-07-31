import React, { useState, useEffect, useContext } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { UserContext } from '../../App';
import { Button } from 'react-bootstrap';

const AllBookings = () => {
  const user = useContext(UserContext)
  const type = user.type
  const [allBookings, setAllBookings] = useState([])

  const getAllBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/allbooking', {
        params: { type }, // Correctly specifying the query parameter
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.data.success) {
        setAllBookings(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBookings();
  }, [])

  const handleApprove = async (bookingId, status) => {
    try {
      const res = await axios.post('http://localhost:8000/api/user/approve', { bookingId, status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (res.data.success) {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = async (bookingId, status) => {
    try {
      const res = await axios.post('http://localhost:8000/api/user/reject', { bookingId, status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (res.data.success) {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th className='text-center' scope='col'>Booking ID</th>
            <th className='text-center' scope='col'>Hotel Name</th>
            <th className='text-center' scope='col'>Customer Phone</th>
            <th className='text-center' scope='col'>No. of Guest</th>
            <th className='text-center' scope='col'>Table Type</th>
            <th className='text-center' scope='col'>Date and Time</th>
            <th className='text-center' scope='col'>Booking Status</th>
            {type === "Organization" ? <th className='text-center' scope='col'>Action</th> : <></>}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {allBookings && allBookings.map((booking) => {
            return (
              <tr key={booking._id}>
                <th className='text-center'>{booking._id}</th>
                <td className='text-center'>{booking.hotelName}</td>
                <td className='text-center'>{booking.customerPhone}</td>
                <td className='text-center'>{booking.noOfGuest}</td>
                <td className='text-center'>{booking.tabletype}</td>
                <td className='text-center'>{booking.dateTime}</td>
                <td className='text-center'>{booking.status}</td>
                {type === "Organization" ? <td>{booking.status === 'rejected' ? <Button className='text-center' size='sm' variant='outline-success' onClick={() => handleApprove(booking._id, 'booked')}>Approve</Button> : <Button className='text-center' variant='outline-danger' size='sm' onClick={() => handleReject(booking._id, 'rejected')}>Reject</Button>}</td> : <></>}
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
      <p>You have booked for {allBookings.length} tables in the App.</p>
    </div>
  )
}

export default AllBookings
