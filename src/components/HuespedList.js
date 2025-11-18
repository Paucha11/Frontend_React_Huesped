import React, { useEffect, useState } from "react";

function HuespedList({ onEdit, refresh }) {
  const [huespedes, setHuespedes] = useState([]);

  const fetchHuespedes = () => {
    fetch("http://localhost:3000/api/huesped")
      .then(res => res.json())
      .then(data => setHuespedes(data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    fetchHuespedes();
  }, [refresh]);

  const handleDelete = (id_huesped) => {
    if (!window.confirm("¿Seguro que deseas eliminar este huésped?")) return;
    fetch(`http://localhost:3000/api/huesped/${id_huesped}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        alert("Huésped eliminado");
        fetchHuespedes();
      })
      .catch(err => console.error("Error al eliminar:", err));
  };

  return (
    <div>
      <h2>Lista de Huéspedes</h2>
      {huespedes.length === 0 ? (
        <p>No hay huéspedes registrados.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Fecha de Nacimiento</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th>Procedencia</th>
              <th>Método de Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {huespedes.map(emp => (
              <tr key={emp.id_huesped}>
                <td>{emp.id_huesped}</td>
                <td>{emp.nombre_huesped}</td>
                <td>{emp.fecha_nacimiento}</td>
                <td>{emp.telefono}</td>
                <td>{emp.direccion}</td>
                <td>{emp.correo}</td>
                <td>{emp.procedencia}</td>
                <td>{emp.metodo_pagoFV}</td>
                <td>
                  <button onClick={() => onEdit(emp)}>Editar</button>
                  <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(emp.id_huesped)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HuespedList;
