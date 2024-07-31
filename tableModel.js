const mongoose = require("mongoose");

const tableModel = mongoose.Schema({
   hotelInfo: {
      type: Object,
      required:[ true,'hotel info is required'],
   },
   hotelAddress: {
      type: String,
      required: [true, "address is required"], 
   },
   hotelPhone: {
      type: Number,
      required: [true, "phone is required"],
   },
   hotelImages: [],
   tableType: {
      type: String,
      required: [true, 'type is important']
   },
   price:{
      type : Number,
      required: [true, 'price required']
   },
   additionalInformation: {
      type: String,
   },
});

const tableSchema = mongoose.model("tables", tableModel);

module.exports = tableSchema;
