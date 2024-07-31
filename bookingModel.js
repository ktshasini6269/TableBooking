const mongoose = require('mongoose')

const bookingModel = mongoose.Schema({
   hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'hotel',
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      required:[true,'User Id is Required'],
      ref: 'user'
   },
   hotelName: {
      type: String,
      required: [true, "Hotel Name is required"]
   },
   customerName:{
      type : String,
      required: [true, 'Name is required'],
   },
   customerPhone: {
      type: Number,
      required: [true, 'Phone is required'],
   },
   customerAddress: {
      type: String,
      required: [true, 'Address is required'],
   },
   noOfGuest: {
      type: Number,
      default: 1,
   },
   tabletype: {
      type:String,
      required: [true, "type is required"]
   },
   dateTime: {
      type: String,
      required:  [true, 'datetime is required'],
   },
   message:{
      type: String,
   },
},{
   timestamp: true,
   strict: false ,
})

const bookingSchema = mongoose.model("bookings", bookingModel);

module.exports = bookingSchema;