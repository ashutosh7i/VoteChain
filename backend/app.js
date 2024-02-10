// imports
const express = require('express');
const axios = require('axios');
const cors = require("cors");

// initializers
const app = express();

// varialbles
const port = 3000;
let nureloHeader = "neurelo_9wKFBp874Z5xFw6ZCfvhXZ80n+ruHjJaQaLqwbB+EW6yxXr0R/EqqXUps45WZyFwEKml9GygT2i1qbE3xGIAVc07O2M/1Q+pqEoNNF0S2jtDipFnXklINpnzL+gmecBQoB4ZDC2naJx55u/Idya5MojtcTVSYTI29dU//AINWkfKSPcA4Xj/DhDKBl+bIiXD_X9mG1JiOq39sW3E2/l31BUh3t3O6OE+ryABK2utIbMo=";

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

  try {
    // Call the API to check eligibility
    const response = await axios.get(`https://ap-south-1.aws.neurelo.com/rest/users/${voterid}`, {
      headers: {
        'X-API-KEY': nureloHeader, // Assuming nureloHeader is defined elsewhere
      }
    });

    if (response.data) {
      // If the response data exists, it means the voter ID is eligible
      console.log("Eligible");
      res.status(200).send("Eligible");
    } else {
      console.log("Not Eligible");
      res.status(400).send("Not Eligible");
    }
  } catch (error) {
    // If there's an error, assume the voter ID is not eligible
    console.error("Error occurred while checking eligibility:", error);
    res.status(400).send("Not Eligible");
  }
});

// Define the POST route for /addnewvote
app.post('/addnewvote', async (req, res) => {
  const data = req.body;
  console.log(data);

// Make the POST request using Axios
axios.post('https://ap-south-1.aws.neurelo.com/rest/users', data, {  
  headers: {
    'X-API-KEY': nureloHeader, 
  }
})
.then(response => {
  console.log(response.data);
    // Check if data was successfully saved
    if (response.status === 400) {
      res.status(500).send("Error occurred while saving data.");
    } else {
      // Data saved successfully
      res.status(202).send("Data saved successfully.");
    }
})
.catch(error => {
  console.error("Error occurred while saving data:", error);
  res.status(500).send("Error occurred while saving data.");
});

});


app.get('/getallvotes', async (req, res) => {
  const data = {
  "candidate1" : 12,
  "candidate2" : 7,
  "candidate3" : 4,
  }
  res.status(200).send(data);
})




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
