// const express = require("express");
// const twilio = require("twilio");

// const app = express();
// app.use(express.json());

// const accountSid = 'AC022707a9f062a7e07a245e8b52b8ff67';
// const authToken = 'ac4163774c06856169f123cf732eeded';
// const client = twilio(accountSid, authToken);

// app.post("/api/send_sms", (req, res) => {
// console.log("Request Body:", req.body);
//   const { phoneNumber, message } = req.body;

//   client.messages
//     .create({
//       body: req.body.body,
//       from: req.body.from, // Your Twilio number
//       to: req.body.to,
//     })
//     .then((message) => {
//       res.json({ success: true, messageSid: message.sid });
//     })
//     .catch((error) => {
//       res.json({ success: false, error: error.message });
//     });
// });

// app.listen(8000, () => {
//   console.log("Backend running on port 8000");
// });

const express = require('express');
const cors = require('cors');  // Import cors package
const twilio = require('twilio');
const app = express();

// Enable CORS for all origins (or specify your frontend URL)
app.use(cors());  // This allows all origins

// Body parser
app.use(express.json());

const client = twilio('AC022707a9f062a7e07a245e8b52b8ff67', 'ac4163774c06856169f123cf732eeded');  // Twilio credentials

app.post('/api/send_sms', async (req, res) => {
  try {
    const message = await client.messages.create({
      body: req.body.body,
      from: req.body.from,
      to: req.body.to
    });
    res.status(200).json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Error sending SMS' });
  }
});

app.listen(8000, () => {
  console.log('Backend running on port 8000');
});
