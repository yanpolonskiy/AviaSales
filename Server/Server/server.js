const express = require("express");
const cors = require('cors');
const { data } = require("./data/Tickets");
onStart = () => {
  console.log("TicketsServer has started on http://127.0.0.1:9091/");
};

let app = express();
app.use(cors());
app.options('*', cors());
app.get("/Tickets", function(req, res) {
  res.send(data.tickets);
});

app.listen(9091, onStart);
