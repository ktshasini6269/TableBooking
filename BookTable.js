import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import { Slider, InputNumber } from 'antd';

const BookTable = () => {
  const [inputValue, setInputValue] = useState(1);
  const [alltables, setAllTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  const [bookingDetails, setBookingDetails] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    noOfGuest: 1,
    dateTime: '',
    message: ''
  })

  const handleChanage = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  }

  const handlePositionChange = (newValue) => {
    setInputValue(newValue);
    setBookingDetails({ ...bookingDetails, noOfGuest: inputValue })
  };

  const getAllTables = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/getalltables');
      setAllTables(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTables();
  }, []);

  const openModal = (hotelId) => {
    setSelectedHotelId(hotelId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotelId(null);
  };

  const bookingTable = async (hotelId, tabletype) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/user/booktable/${hotelId}`, {...bookingDetails, tabletype}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })

      if (res.data.success) {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className='card-container'>
      {alltables && alltables.length > 0 ? (
        alltables.map((table, i) => {
          return (
            <div className="card" key={i}>
              <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={table.hotelImages[0]} className="img-fluid" alt='images' />
              </div>
              <div className="card-body">
                <h4 className="card-title"><b>{table.hotelInfo.name}</b></h4>
                <div className='d-flex my-3'>
                  <div className=''>
                    <p className="card-text"><b>Address: </b>{table.hotelAddress}</p>
                    <p className="card-text"><b>Phone: </b>{table.hotelPhone}</p>
                  </div>
                  <div className='mx-3'>
                    <p className="card-text"><b>Type: </b>{table.tableType}</p>
                    <p className="card-text"><b>Price: </b>{table.price}(per person)</p>
                  </div>
                </div>
                <p style={{ width: '100%', wordBreak: 'break-all' }} className="card-text"><b>More Information: </b>{table.additionalInformation}</p>

              </div>
              <Button
                variant='outline-info'
                type="button"
                onClick={() => openModal(table._id)}
                style={{ width: '100px', margin: '10px' }}
              >
                Book Now
              </Button>
              {/* Only show the modal if the selectedHotelId matches the current table's ID */}
              <div className={`modal fade ${showModal && selectedHotelId === table._id ? 'show' : ''}`} style={{ display: showModal && selectedHotelId === table._id ? 'block' : 'none' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Booking for the {table.hotelInfo.name}</h5>
                      <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <p>Booking for {table.tableType}</p>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="name" className="col-form-label">Customer Name:</label>
                          <input name='customerName' onChange={handleChanage} value={bookingDetails.customerName} required type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone" className="col-form-label">Customer Phone:</label>
                          <input name='customerPhone' onChange={handleChanage} value={bookingDetails.customerPhone} required type="text" className="form-control" id="phone" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="col-form-label">Customer Address:</label>
                          <input name='customerAddress' onChange={handleChanage} value={bookingDetails.customerAddress} required type="text" className="form-control" id="address" />
                        </div>
                        <label className="form-label" htmlFor="customRange1">No. of Guest</label>
                        <div className="range">
                          <Slider
                            min={1}
                            max={20}
                            onChange={handlePositionChange}
                            value={typeof inputValue === 'number' ? inputValue : 0}
                          />
                          <InputNumber
                            min={1}
                            max={20}
                            style={{
                              margin: '0 16px',
                            }}
                            value={inputValue}
                            onChange={handlePositionChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="datetime" className="col-form-label">Date and Time:</label>
                          <input name='dateTime' onChange={handleChanage} value={bookingDetails.dateTime} required type="datetime-local" className="form-control" id="datetime" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="message-text" className="col-form-label">Message:</label>
                          <textarea name='message' onChange={handleChanage} value={bookingDetails.message} className="form-control" id="message-text"></textarea>
                        </div>
                        <Button style={{ float: 'right' }} className="btn btn-secondary" onClick={closeModal}>Close</Button>
                        <Button style={{ float: 'right' }} onClick={() => bookingTable(table.hotelInfo._id, table.tableType)} type="submit" className="btn btn-primary mx-2">Book Now</Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}
            </div>
          );
        })
      ) : (
        <p>No hotels found.</p>
      )}
    </Container>
  );
};

export default BookTable;
