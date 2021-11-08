const express = require("express");
const router = express.Router();

const Entry = require("../models/Entry");
// create an entry
router.post("/", (req, res) => {
  const entry = new Entry({
    values: req.body.values,
    form: req.body.form,
    page: req.body.page,
    creationDate: req.body.creationDate,
    userInfo: req.body.userInfo,
  });
  entry
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;
