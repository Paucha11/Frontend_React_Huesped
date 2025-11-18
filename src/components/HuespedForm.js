import React, { useState, useEffect } from "react";

function HuespedForm({ huespedToEdit, onSaveComplete }) {
  const [id_huesped, setIdHuesped] = useState("");
  const [nombre_huesped, setNombreHuesped] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [procedencia, setProcedencia] = useState("");
  const [metodo_pagoFV, setMetodoPagoFV] = useState("");

  useEffect(() => {
    if (huespedToEdit) {
      setIdHuesped(huespedToEdit.id_huesped || "");
      setNombreHuesped(huespedToEdit.nombre_huesped || "");
      setFechaNacimiento(huespedToEdit.fecha_nacimiento || "");
      setTelefono(huespedToEdit.telefono || "");
      setDireccion(huespedToEdit.direccion || "");
      setCorreo(huespedToEdit.correo || "");
      setProcedencia(huespedToEdit.procedencia || "");
      setMetodoPagoFV(huespedToEdit.metodo_pagoFV || "");
    } else {
      setIdHuesped("");
      setNombreHuesped("");
      setFechaNacimiento("");
      setTelefono("");
      setDireccion("");
      setCorreo("");
      setProcedencia("");
      setMetodoPagoFV("");
    }
  }, [huespedToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solo incluir id_huesped cuando editas
    const newHuesped = huespedToEdit
      ? { id_huesped, nombre_huesped, fecha_nacimiento, telefono, direccion, correo, procedencia, metodo_pagoFV }
      : { nombre_huesped, fecha_nacimiento, telefono, direccion, correo, procedencia, metodo_pagoFV };

    const method = huespedToEdit ? "PUT" : "POST";
    const url = huespedToEdit
      ? `http://localhost:3000/api/huesped/${huespedToEdit.id_huesped}`
      : "http://localhost:3000/api/huesped";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHuesped),
    })
      .then((res) => res.json())
      .then(() => {
        alert(huespedToEdit ? "Huésped actualizado" : "Huésped creado");
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{huespedToEdit ? "Editar Huésped" : "Agregar Huésped"}</h2>
      {/* Solo visible en edición */}
      {huespedToEdit && (
        <input
          type="text"
          value={id_huesped}
          readOnly
          style={{ background: "#eee" }}
          placeholder="ID"
        />
      )}
      <input type="text" placeholder="Nombre Completo" value={nombre_huesped} onChange={e => setNombreHuesped(e.target.value)} required />
      <input type="date" placeholder="Fecha de Nacimiento" value={fecha_nacimiento} onChange={e => setFechaNacimiento(e.target.value)} required />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} required />
      <input type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} required />
      <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
      <input type="text" placeholder="Procedencia" value={procedencia} onChange={e => setProcedencia(e.target.value)} required />
      <input type="text" placeholder="Método de Pago" value={metodo_pagoFV} onChange={e => setMetodoPagoFV(e.target.value)} required />
      <button type="submit">{huespedToEdit ? "Actualizar" : "Guardar"}</button>
    </form>
  );
}

export default HuespedForm;
