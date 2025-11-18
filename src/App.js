import React, { useState } from "react";
import HuespedForm from "./components/HuespedForm";
import HuespedList from "./components/HuespedList";
import "./App.css";

function App() {
  const [selectedHuesped, setSelectedHuesped] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = huesped => setSelectedHuesped(huesped);

  const handleSaveComplete = () => {
    setSelectedHuesped(null);
    setRefresh(!refresh); // Fuerza refresco
  };

  return (
    <div className="App">
      <h1>Gestión de Huéspedes</h1>
      <HuespedForm huespedToEdit={selectedHuesped} onSaveComplete={handleSaveComplete} />
      <HuespedList onEdit={handleEdit} refresh={refresh} />
    </div>
  );
}

export default App;
