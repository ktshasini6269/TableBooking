import axios from 'axios';
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddTable = ({userId}) => {

   const [hoteldata, setHoteldata] = useState({
      address: '', phone: '', img_url: ['', ''], type: '', price: '', additionalInformation: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (name.startsWith('img')) {
         const index = parseInt(name.replace('img', ''), 10) - 1; // Extract the index from the 'imgX' name
         const updatedImages = [...hoteldata.img_url]; // Create a copy of the current images array
         updatedImages[index] = value; // Update the URL at the appropriate index
         setHoteldata({ ...hoteldata, img_url: updatedImages }); // Use 'img_url' instead of 'images'
      } else {
         setHoteldata({ ...hoteldata, [name]: value });
      }
   };

   const handleSelectChange = (event) => {
      setHoteldata({ ...hoteldata, type: event.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
         hotelAddress: hoteldata.address,
         hotelPhone: hoteldata.phone,
         hotelImages: hoteldata.img_url,
         tableType: hoteldata.type,
         price: hoteldata.price,
         additionalInformation: hoteldata.additionalInformation,
      };
      try {
         const response = await axios.post(`http://localhost:8000/api/user/addtable/${userId}`, data, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
         });
         if (response.data.success) {
            alert(response.data.message);
            setHoteldata({
               address: '',
               phone: '',
               img_url: ['', ''],
               type: '',
               price: '',
               additionalInformation: '',
            });
         } else {
            alert('Table addition failed');
         }
      } catch (error) {
         if (error.response) {
            alert(`Error: ${error.response.data.message}`);
         } else if (error.request) {
            alert('Error: No response received from the server');
         } else {
            alert('Error: Request failed');
         }
      }
   };

   return (
      <div className='d-flex justify-content-center align-item-center'>
         <form onSubmit={handleSubmit} className='w-50 text-center border border-3 rounded-3 p-3 m-3'>

            <div className="form-outline mb-4">
               <label className="form-label" htmlFor="address">Hotel Address</label>
               <input name="address" onChange={handleChange} value={hoteldata.address} type="text" id="address" className="form-control border border-2" />
            </div>

            <div className="form-outline mb-4">
               <label className="form-label" htmlFor="phone">Hotel Phone</label>
               <input name='phone' onChange={handleChange} value={hoteldata.phone} type="number" id="phone" className="form-control border border-2" />
            </div>

            <div className="form-outline mb-4">
               <label className="form-label" htmlFor="img1">Hotel/Table Image</label>
               <input name='img1' onChange={handleChange} value={hoteldata.img_url[0]} placeholder="img1 url" type="text" className="form-control border border-2" />
               <input name='img2' onChange={handleChange} value={hoteldata.img_url[1]} placeholder="img2 url" type="text" className="form-control border border-2 my-2" />
            </div>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
               <InputLabel id="demo-select-small-label">Table Type</InputLabel>
               <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={hoteldata.type}
                  label="Table Type"
                  onChange={handleSelectChange}
               >
                  <MenuItem value={'Bar'}>Bar</MenuItem>
                  <MenuItem value={'Cousine'}>Cousine</MenuItem>
                  <MenuItem value={'Delux'}>Delux</MenuItem>
               </Select>
            </FormControl>

            <div className="form-outline mb-4">
               <label className="form-label" htmlFor="price">Table Price (per person)</label>
               <input name='price' onChange={handleChange} value={hoteldata.price} type="number" id="price" className="form-control border border-2" />
            </div>
            <div className="form-outline mb-4">
               <label className="form-label" htmlFor="form6Example7">Additional Information</label>
               <textarea name='additionalInformation' onChange={handleChange} value={hoteldata.additionalInformation} className="form-control border border-2" id="form6Example7" rows="4"></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Add Hotel</button>
         </form>
      </div>
   );
};

export default AddTable
