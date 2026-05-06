const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "client")));

// Sample flight data
const flights = [
  {
    id: 1,
    airline: "IndiGo",
    source: "Delhi",
    destination: "Mumbai",
    price: 4500,
    duration: "2h 10m"
  },
  {
    id: 2,
    airline: "Air India",
    source: "Delhi",
    destination: "Bangalore",
    price: 6200,
    duration: "3h 00m"
  },
  {
    id: 3,
    airline: "SpiceJet",
    source: "Mumbai",
    destination: "Hyderabad",
    price: 3900,
    duration: "1h 45m"
  }
];

// Search flights
app.get("/api/flights", (req, res) => {

  const { source, destination } = req.query;

  const result = flights.filter(flight => {
    return (
      flight.source.toLowerCase() === source.toLowerCase() &&
      flight.destination.toLowerCase() === destination.toLowerCase()
    );
  });

  res.json(result);
});

// Booking endpoint
app.post("/api/book", (req, res) => {

  const booking = req.body;

  console.log("New Booking:", booking);

  res.json({
    success: true,
    message: "Flight booked successfully"
  });
});

// Home route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
