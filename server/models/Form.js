const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema({
  inputs: [
    {
      key: String,
      name: String,
    }
  ],
  title: String,
  page: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
    }
  ],
});
module.exports = mongoose.model("Form", formSchema);


// fields: [
//     {
//       name: String,
//       type: {
//         type: { type: String }
//       },
//       registrationEnabled: Boolean,
//       checkinEnabled: Boolean
//     }
//   ]