// Importamos React y los hooks necesarios
import React, { useEffect, useState } from "react";

/**
 * Componente EmployeeList
 * -----------------------
 * Muestra la lista de empleados obtenidos desde la API del backend.
 * Permite eliminar empleados y notificar al componente padre cuando se desea editar uno.
 *
 * Props:
 *  - onEdit: función callback que recibe el empleado seleccionado para editar.
 */
function HuespedList({ onEdit }) {
  // -------------------- ESTADO --------------------
  // employees almacena el listado de empleados cargados desde la API.
  const [huespedes, setHuespedes] = useState([]);

  // -------------------- FUNCIÓN DE CARGA --------------------
  // Esta función obtiene la lista completa de empleados desde el backend.
  const fetchHuespedes = () => {
    fetch("http://localhost:3000/api/huesped") // URL de la API
      .then((res) => res.json()) // Convertimos la respuesta a JSON
      .then((data) => setHuespedes(data)) // Guardamos los empleados en el estado
      .catch((err) => console.error("Error:", err)); // Mostramos errores si ocurren
  };

  // -------------------- useEffect --------------------
  // Este efecto se ejecuta una sola vez al montar el componente ([] como dependencia vacía)
  // Llama a fetchEmployees() para cargar los datos iniciales desde la API.
  useEffect(() => {
    fetchHuespedes();
  }, []);

  // -------------------- FUNCIÓN ELIMINAR --------------------
  // handleDelete recibe el ID del empleado a eliminar.
  // Pide confirmación al usuario y, si acepta, envía la solicitud DELETE al backend.
  const handleDelete = (id_huesped) => {
    // Confirmación para evitar eliminaciones accidentales
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;

    // Petición DELETE al servidor
    fetch(`http://localhost:3000/api/huesped/${id_huesped}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Huesped eliminado"); // Mensaje de confirmación
        fetchHuespedes(); // Recargamos la lista para reflejar el cambio
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  // -------------------- RENDERIZADO --------------------
  // Muestra un mensaje si no hay empleados o una tabla si existen registros.
  return (
    <div>
      <h2>Lista de Huéspedes</h2>

      {/* Si no hay empleados, mostrar un mensaje */}
      {huespedes.length === 0 ? (
        <p>No hay huespedes registrados.</p>
      ) : (
        // Si hay empleados, renderizamos una tabla HTML sencilla
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>id_huesped</th>
              <th>nombre_huesped</th>
              <th>fecha_nacimiento</th> 
              <th>telefono</th>
              <th>direccion</th>
              <th>correo</th>
              <th>procedencia</th>
              <th>metodo_pagoFV</th>
            </tr>
          </thead>

          <tbody>
            {/* Recorremos el arreglo de empleados */}
            {huespedes.map((emp) => (
              // Cada fila debe tener una key única (usamos emp._id o emp.id)
              <tr key={emp.id_huesped || emp.id_huesped}>
                <td>{emp.nombre_huesped}</td>
                <td>{emp.fecha_nacimiento}</td> 
                <td>{emp.telefono}</td>             
                <td>{emp.direccion}</td>
                <td>{emp.correo}</td>
                <td>{emp.procedencia}</td>
                <td>{emp.metodo_pagoFV}</td>
                <td>
                  {/* Botón Editar: llama a onEdit pasando el empleado seleccionado */}
                  <button onClick={() => onEdit(emp)}>Editar</button>

                  {/* Botón Eliminar: llama a handleDelete con el ID del empleado */}
                  <button
                    onClick={() => handleDelete(emp._id || emp.id)}
                    style={{ marginLeft: "10px" }} // Espacio visual entre botones
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exportamos el componente para que pueda usarse en App.js u otros componentes
export default HuespedList;