import express from "express";

const app = express();

app.listen(5004, () => {
  console.log("server is running on port 5004");
});
