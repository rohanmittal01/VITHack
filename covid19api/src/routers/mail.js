const express = require("express");
const router = new express.Router();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohanvithack@gmail.com",
    pass: "vithack1"
  },
});

router.post("/mail", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var message = req.body
  var mailOptions = {
    from: "rohanvithack@gmail.com",
    to: 'rohanmittal01@gmail.com',
    subject: "Download Deceased Persons Data/Graph",
    html:
      '<body style="padding: 20px; background-color: green; color: white;font-family: Helvetica; text-align: center">Hey there, <b>' +
      "</b><br><br><h2>Please find the graph attached below <b>" +
      "</b></h2><br>Best Regards,<br>Team Cliche</body>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send({ error, message });
    } else {
      console.log("Email sent: " + info.response);
      res.status(201).send("Email sent successfully!");
    }
  });
});

module.exports = router;