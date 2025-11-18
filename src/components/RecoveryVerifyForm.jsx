import { useState } from "react";

export default function RecoverVerifyForm({ usuario, onVerified }) {
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://server-wcpl.onrender.com/auth/recovery-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, code: pin }),
      });

      const data = await res.json();
      setMsg(data.error || "");

      if (data.success) {
        onVerified();
      }
    } catch (err) {
      console.error(err);
      setMsg("Error al verificar el código.");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <div className="mb-3">
        <label className="form-label">Código recibido</label>
        <input
          className="form-control"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Ingresa el PIN"
          required
        />
      </div>

      <button className="btn btn-success w-100 mb-3">Verificar código</button>

      {msg && <div className="alert alert-danger text-center">{msg}</div>}
    </form>
  );
}
