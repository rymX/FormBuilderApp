const express = require("express");
const router = express.Router();

const Page = require("../models/Page");
// create a Page
router.post("/", (req, res) => {
  Page.find({ link: req.body.link })
    .exec()
    .then((rows) => {
      if (rows.length >= 1) {
        return res.status(409).json({ message: "link_unavailable" });
      } else {
       
        const page = new Page({
          title: req.body.title,
          link: req.body.link,
          description: req.body.description,
        });
        page
          .save()
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((error) => {
            return res.status(500).json({ error: error });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: error });
    });
});
// read all the  Pages
router.get("/", (req, res) => {
  Page.find()
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});
// get single page
router.get("/link/:link", (req, res) => {
  
  Page.find({ link: req.params.link })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).json(result);
      } else return res.status(401).json({ message: "page does not exist" });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

//update page
router.patch("/", (req, res) => {
  Page.findByIdAndUpdate(req.body.pageid, {
    form: req.body.formid,
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
