import { useState, useEffect } from "react";
import "./ManageSpaces.css";

export default function ManageSpaces() {

  const [spaces, setSpaces] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [twoWheeler, setTwoWheeler] = useState("");
  const [fourWheeler, setFourWheeler] = useState("");

  useEffect(() => {
    const savedSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    setSpaces(savedSpaces);
  }, []);

  const addSpace = () => {

    if (!name || !price) return;

    const newSpace = {
      id: Date.now(),
      name,
      price,
      twoWheeler,
      fourWheeler,
      availableTwo: twoWheeler,
      availableFour: fourWheeler
    };

    const updated = [...spaces, newSpace];

    setSpaces(updated);
    localStorage.setItem("spaces", JSON.stringify(updated));

    setName("");
    setPrice("");
    setTwoWheeler("");
    setFourWheeler("");
  };

  const deleteSpace = (id) => {

    const updated = spaces.filter((space) => space.id !== id);

    setSpaces(updated);
    localStorage.setItem("spaces", JSON.stringify(updated));
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

            <p>Price: ₹{space.price} / hour</p>

            <p>🛵 Two Wheeler Slots: {space.availableTwo}/{space.twoWheeler}</p>

            <p>🚗 Four Wheeler Slots: {space.availableFour}/{space.fourWheeler}</p>

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