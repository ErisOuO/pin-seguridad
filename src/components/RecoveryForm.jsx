import { useState } from "react";

export default function RecoverForm({ onEmailSent }) {
  const [usuario, setUsuario] = useState("");
  const [msg, setMsg] = useState("");

  const handleRecover = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/recovery-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario }),
      });

      const data = await res.json();
      setMsg(data.error || "Código enviado a tu correo.");

      if (data.success) {
        onEmailSent(usuario);
      }
    } catch (err) {
      console.error(err);
      setMsg("Error al solicitar recuperación.");
    }
  };

  return (
    <form onSubmit={handleRecover}>
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          className="form-control"
          placeholder="Ingresa tu usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary w-100 mb-3">Enviar código</button>

      {msg && <div className="alert alert-info text-center">{msg}</div>}
    </form>
  );
}
