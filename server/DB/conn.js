const mongoose = require("mongoose");

const uri = process.env.DATABASE;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("connection failed " + err);
  });
