const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  values: [
    {
      name: String,
      value: String,
    },
  ],
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
  },
  creationDate: Date,

  userInfo: { type: String, required: true },
});
module.exports = mongoose.model("Entry", EntrySchema);
