import { useState, useEffect } from "react";
import "./ManageSpaces.css";
import { getParkingLots, createParkingLot, deleteParkingLot } from "../../services/parkingService";

export default function ManageSpaces() {

  const [spaces, setSpaces] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [twoWheeler, setTwoWheeler] = useState("");
  const [fourWheeler, setFourWheeler] = useState("");

useEffect(() => {
  getParkingLots()
    .then((res) => {
      setSpaces(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const addSpace = () => {

  if (!name || !price || !location) {
    alert("Fill all fields");
    return;
  }

  const data = {
    name: name,
    location: location,
    pricePerHour: Number(price),
    twoWheelerSlots: Number(twoWheeler),
    fourWheelerSlots: Number(fourWheeler)
  };

  createParkingLot(data)
    .then((res) => {

      setSpaces([...spaces, res.data]);

      setName("");
      setLocation("");
      setPrice("");
      setTwoWheeler("");
      setFourWheeler("");

    })
    .catch((err) => {
      console.log("Add Error:", err);
    });

};

const deleteSpace = (id) => {

  deleteParkingLot(id)
    .then(() => {

      const updated = spaces.filter((space) => space.id !== id);
      setSpaces(updated);

    })
    .catch((err) => {
      console.log("Delete Error:", err);
    });

};

  return (
    <div className="manage-container">

      <h1>Manage Parking Spaces</h1>

      {/* Add Parking Form */}

      <div className="space-form">

        <input
          placeholder="Parking Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Price per hour (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Two Wheeler Slots"
          value={twoWheeler}
          onChange={(e) => setTwoWheeler(e.target.value)}
        />

        <input
          placeholder="Four Wheeler Slots"
          value={fourWheeler}
          onChange={(e) => setFourWheeler(e.target.value)}
        />

        <button onClick={addSpace}>
          Add Parking Space
        </button>

      </div>

      {/* Parking List */}

      <h2>Your Parking Spaces</h2>

      <div className="space-list">

        {spaces.length === 0 && (
          <p className="empty">No parking spaces added yet</p>
        )}

        {spaces.map((space) => (

          <div className="space-card" key={space.id}>

            <h3>{space.name}</h3>

            <p>Price: ₹{space.pricePerHour} / hour</p>

<p>🛵 Two Wheeler Slots: {space.twoWheelerSlots}</p>

<p>🚗 Four Wheeler Slots: {space.fourWheelerSlots}</p>

            <button
              className="delete-btn"
              onClick={() => deleteSpace(space.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}