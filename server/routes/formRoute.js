const express = require("express");
const router = express.Router();

const Form = require("../models/Form");
// create a form
router.post("/", (req, res) => {
  console.log(req.body);
  const form = new Form({
    inputs: req.body.inputs,
    title: req.body.title,
  });
  form
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
// read form
router.get("/id/:id", (req, res) => {
  Form.find({ _id: req.params.id })
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

// get all the forms
router.get("/", (req, res) => {
  Form.find()
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

//update form

router.patch("/", (req, res) => {
  Form.findByIdAndUpdate(req.body.formid, {
    $push: { page: req.body.pageid },
  })
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

module.exports = router;
