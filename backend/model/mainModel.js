//connect to mongodb
const mongoose = require("mongoose")

//database url with  /databaseName
const url = "mongodb://127.0.0.1:27017/voteDatabase";

//connecting to database
try {
    mongoose.connect(url);
    console.log("connected to database");
} catch (error) {
    console.log("database connection failed");
}
//making a Schema
const voteSchema = new mongoose.Schema({
    time: {
        type: String
    },
    randomId: {
        type: String,
        required: true,
    },
    votedto: {
        type: String,
    },
},
    { timestamps: true }
)

//making a model
const voteModel = mongoose.model('voter', voteSchema);

//exporting the model
module.exports = voteModel;