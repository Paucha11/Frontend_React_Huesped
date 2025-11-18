// Importamos React y los hooks necesarios desde la biblioteca
import React, { useState, useEffect } from "react";

/**
 * Componente EmployeeForm
 * -----------------------
 * Este componente se utiliza para crear o editar empleados.
 * Puede funcionar en dos modos:
 *  - Modo "crear": cuando no hay empleado seleccionado (employeeToEdit = null)
 *  - Modo "editar": cuando se recibe un empleado con sus datos
 *
 * Props:
 *  - employeeToEdit: objeto con los datos del empleado a editar (puede ser null)
 *  - onSaveComplete: función callback que se ejecuta cuando se guarda correctamente
 */
function HuespedForm({ huespedToEdit, onSaveComplete }) {

  // -------------------- ESTADOS --------------------
  // Cada campo del formulario tiene su propio estado local controlado.
  // Esto permite reflejar en tiempo real lo que el usuario escribe.
  const [id_huesped, setIdHuesped] = useState("");
  const [nombre_huesped, setNombreHuesped] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [procedencia, setProcedencia] = useState("");
  const [metodo_pagoFV, setMetodoPagoFV] = useState("");


  // -------------------- EFECTO DE SINCRONIZACIÓN --------------------
  // Este useEffect se ejecuta cada vez que cambia la prop employeeToEdit.
  // Si existe un empleado para editar, los campos se llenan con sus datos.
  // Si no existe (modo creación), se limpian los campos del formulario.
  useEffect(() => {
    if (huespedToEdit) {
      // Precargar datos del empleado seleccionado
      setNombreHuesped(huespedToEdit.nombre_huesped);
      setFechaNacimiento(huespedToEdit.fecha_nacimiento);
      setTelefono(huespedToEdit.telefono);
      setDireccion(huespedToEdit.direccion);
      setCorreo(huespedToEdit.correo);
      setProcedencia(huespedToEdit.procedencia);
      setMetodoPagoFV(huespedToEdit.metodo_pagoFV);
      
    } else {
      // Limpiar el formulario para crear uno nuevo
      setIdHuesped("");
      setNombreHuesped("");
      setFechaNacimiento("");
      setTelefono("");
      setDireccion("");
      setCorreo("");
      setProcedencia("");
      setMetodoPagoFV("");
    }
  }, [huespedToEdit]); // Se vuelve a ejecutar si cambia employeeToEdit

  // -------------------- MANEJO DEL ENVÍO --------------------
  // Esta función controla lo que ocurre al enviar el formulario.
  // Se encarga de crear o actualizar el empleado según corresponda.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    // Construimos un objeto con los datos del formulario
    const newHuesped = { id_huesped, nombre_huesped, fecha_nacimiento, telefono, direccion, correo, procedencia, metodo_pagoFV };

    // Determinamos si el formulario está en modo edición o creación
    const method = huespedToEdit ? "PUT" : "POST";
    const url = huespedToEdit
      ? `http://localhost:3000/api/empleados/${huespedToEdit._id}` // Actualizar
      : "http://localhost:3000/api/empleados"; // Crear nuevo

    // -------------------- PETICIÓN FETCH --------------------
    // Enviamos los datos al backend (Node.js / Express)
    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(newHuesped), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then((data) => {
        // Mostramos un mensaje al usuario
        alert(
          huespedToEdit
            ? `Huesped ${data.nombre_huesped} actualizado`
            : `Huesped ${data.nombre_huesped} creado`
        );

        // Notificamos al componente padre (por ejemplo, para refrescar la lista de empleados)
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  // -------------------- RENDERIZADO DEL FORMULARIO --------------------
  // Se muestran los campos de entrada controlados y un botón dinámico.
  // El texto del botón y el título cambian según si se está creando o editando un empleado.
  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h2>{huespedToEdit ? "Editar Huesped" : "Agregar Huesped"}</h2>

      {/* Campo de texto: ID */}
      <input
        type="number"
        placeholder="ID"
        value={id_huesped}
        onChange={(e) => setIdHuesped(e.target.value)}
        readOnly
      />

      {/* Campo de texto: Nombre */}
      <input
        type="text"
        placeholder="Nombre Completo"
        value={nombre_huesped}
        onChange={(e) => setNombreHuesped(e.target.value)}
        required
      />
        {/* Campo de fecha: Fecha de Nacimiento */} 
        <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={fecha_nacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        required
      />      
      {/* Campo de texto: Telefono */}
      <input
        type="text"
        placeholder="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      {/* Campo de texto: Direccion */}
      <input
        type="text"
        placeholder="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      {/* Campo de texto: Correo */}
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      {/* Campo de texto: Procedencia */}
      <input
        type="text"
        placeholder="Procedencia"
        value={procedencia}
        onChange={(e) => setProcedencia(e.target.value)}
        required
      />
      {/* Campo de texto: Metodo de Pago */}
      <input
        type="text"
        placeholder="Metodo de Pago"
        value={metodo_pagoFV}
        onChange={(e) => setMetodoPagoFV(e.target.value)}
        required
      />

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {huespedToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser importado en otros archivos
export default HuespedForm;