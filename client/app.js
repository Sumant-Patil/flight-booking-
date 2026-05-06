const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

searchBtn.addEventListener("click", async () => {

  const source =
    document.getElementById("source").value;

  const destination =
    document.getElementById("destination").value;

  if(!source || !destination){
    alert("Please fill all fields");
    return;
  }

  results.innerHTML = "Loading flights...";

  try {

    const res = await fetch(
      `/api/flights?source=${source}&destination=${destination}`
    );

    const data = await res.json();

    if(data.length === 0){
      results.innerHTML = "No flights found.";
      return;
    }

    results.innerHTML = "";

    data.forEach(flight => {

      const div = document.createElement("div");

      div.className = "flight-card";

      div.innerHTML = `
        <h2>${flight.airline}</h2>
        <p>${flight.source} → ${flight.destination}</p>
        <p>Duration: ${flight.duration}</p>
        <p>Price: ₹${flight.price}</p>
        <button onclick="bookFlight('${flight.airline}')">
          Book Now
        </button>
      `;

      results.appendChild(div);
    });

  } catch(err){

    console.error(err);

    results.innerHTML = "Error loading flights.";
  }
});

async function bookFlight(airline){

  try {

    const res = await fetch("/api/book", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        airline
      })
    });

    const data = await res.json();

    alert(data.message);

  } catch(err){
    console.error(err);
  }
}
