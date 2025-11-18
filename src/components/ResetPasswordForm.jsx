import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordForm({ usuario, onReset }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (p1 !== p2) {
      setMsg("Las contraseñas no coinciden");
      return;
    }

    const res = await fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario,              // <-- CORRECTO
        nuevaContrasena: p1,  // <-- CORRECTO
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg(data.error);
      return;
    }

    // Llamamos al callback para regresar al login
    onReset();
  };

  return (
    <form onSubmit={handleReset}>
      <div className="mb-3 position-relative">
        <label className="form-label">Nueva contraseña</label>
        <input
          className="form-control"
          type={show ? "text" : "password"}
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="position-absolute"
          style={{
            right: "10px",
            top: "38px",
            background: "none",
            border: "none",
          }}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Repetir contraseña</label>
        <input
          className="form-control"
          type={show ? "text" : "password"}
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-success w-100 mb-3">
        Restablecer contraseña
      </button>

      {msg && (
        <div className="alert alert-danger text-center">{msg}</div>
      )}
    </form>
  );
}
