// Import the mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Connect to the MongoDB database named 'youtubeBackend' on the local machine
mongoose
  .connect('mongodb://localhost:27017/youtubeBackend') // Connection string: protocol://host:port/databaseName
  .then(() => console.log('DB connection successful!')) // Log success message if connected
  .catch(err => {
    console.log(err); // Log any connection errors
  });
