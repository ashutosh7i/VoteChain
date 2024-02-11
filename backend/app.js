// imports
const express = require('express');
const axios = require('axios');
const cors = require("cors");
const { Vonage } = require('@vonage/server-sdk')

//importing database
const voteModel = require("./model/mainModel");
const moment = require("moment")
// initializers
const app = express();

// varialbles
const port = 3000;

let date = moment().format("DD MM YYYY, hh:mm:ss a");

// middlewares
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('Votechain Server OK✅');
});


// Define the POST route for /checkvoteeligible
app.post('/checkvoteeligible', async (req, res) => {
  const { voterid } = req.body;
  console.log(voterid);

  try {
    // Call the API to check eligibility
    const response = await axios.get(`https://ap-south-1.aws.neurelo.com/rest/voters/${voterid}`, {
      headers: {
        'X-API-KEY': nureloHeader, // Assuming nureloHeader is defined elsewhere
      }
    });

    // If the response status is 200, it means the voter ID was found and thus is not eligible
    if (response.status === 200) {
      console.log("Not Eligible");
      res.status(404).send("Not Eligible");
    }
  } catch (error) {
    // If there's an error and the status is 404, it means the voter ID was not found and thus is eligible
    if (error.response && error.response.status === 404) {
      console.log("Eligible");
      res.status(200).send("Eligible");
    } else {
      // If there's an error other than 404, log the error
      console.error("Error occurred while checking eligibility:", error);
      res.status(400).send("Error occurred while checking eligibility");
    }
  }
});

// Define the POST route for /addnewvote
app.post('/addnewvote', async (req, res) => {
  const data = req.body;

  let voterid = data.voter_id;
  let votedto = data.voted_to;
  let timestamp = data.timestamp;
  let mobileNo = data.mobile_no;

  let randomId = generateRandomId(); // Assuming generateRandomId() is defined elsewhere

  var myHeaders = new Headers();
  myHeaders.append("X-API-KEY", "neurelo_9wKFBp874Z5xFw6ZCfvhXfNgr6eiyzu9E6BG0VIub0VQYE160TJz2KJBJ3JiKVLoHAAouuTwJL5lm8/Rilcvsq3AWXWw1PlJvDpeeLy2/Bpa8xIptraJXPTCEJugBiWMCAuD4VrOK4F/NdLB+LyQCU+mEWT9imyiug8jqCjoSSTlKmf9mzy3rbTn352x2ray_gDhnPKv83lyS9wj1wPsTbcuhPF8aK0DtQFSjKx9v/TE=");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      "random_id": `${randomId}`,
      "voter_id": `${voterid}`
    }
  ]);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://ap-south-1.aws.neurelo.com/rest/voters", requestOptions)
    .then(response => response.text())
    .then(async result => {
      console.log(result);
      // Check if the response from Nurelo contains any errors
      const resultObj = JSON.parse(result);
      if (resultObj.errors && resultObj.errors.length > 0) {
        // If there are any errors, don't save to MongoDB and throw an error
        console.log("Error occurred while saving data to Nurelo:", resultObj.errors);
        res.status(500).send("Error occurred while saving data.");
      } else {
        // If there are no errors, save the data to MongoDB
        await voteModel.create({
          time: timestamp,
          randomId: randomId,
          votedto: votedto
        })
        .then((data) => {
          console.log("Data saved to MongoDB successfully");
          sendSMS(mobileNo, `Your vote has been successfully casted on ${date}`);
          res.status(200).send("Data saved successfully");
        })
        .catch((err) => {
          console.log("Error occurred while saving data to MongoDB:", err);
          res.status(500).send("Error occurred while saving data.");
        });
      }
    })
    .catch(error => {
      console.log('error', error);
      res.status(500).send("Error occurred while saving data.");
    });
});

// Define the GET route for /getallvotes
app.get('/getallvotes', async (req, res) => {
  try {
    // Use the MongoDB aggregation framework to group the votes by candidate and count them
    const voteCounts = await voteModel.aggregate([
      {
        $group: {
          _id: "$votedto",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert the array of vote counts to an object
    const voteCountsObj = voteCounts.reduce((obj, item) => {
      obj[item._id] = item.count;
      return obj;
    }, {});

    // Send the vote counts as the response
    res.status(200).json(voteCountsObj);
  } catch (err) {
    console.log("Error occurred while getting votes:", err);
    res.status(500).send("Error occurred while getting votes.");
  }
});


// app.get('/getallvotes', async (req, res) => {
//   const data = {
//   "candidate1" : 1200,
//   "candidate2" : 70,
//   "candidate3" : 4000,
//   }
//   res.status(200).send(data);
// })




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




// Utility functions
function generateRandomId(length = 10) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


async function sendSMS(to,text) {
  const from = "Votechain"
  await vonage.sms.send({to, from, text})
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}
